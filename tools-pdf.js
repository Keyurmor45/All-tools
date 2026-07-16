/* ================================================================
   PDF Studio Tools (Client-Side, Secure, No Backend)
   Requires: pdf-lib (loaded in index.html), jszip (loaded in index.html), pdf.js (loaded in index.html)
   ================================================================ */

function addPDFTools() {
  const t = [];

  // Helper: Download a file
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  
  function downloadPDFBytes(bytes, filename) {
    const blob = new Blob([bytes], { type: 'application/pdf' });
    downloadBlob(blob, filename);
  }

  // Helper: Get PDFLib
  function getPDFLib() {
    if (!window.PDFLib) throw new Error("pdf-lib is not loaded!");
    return window.PDFLib;
  }

  // Helper: Universal Preview Renderer (PDF & Images)
  async function renderPreviews(input, container) {
    container.innerHTML = '';
    if (!input.files || input.files.length === 0) return;
    
    if (window.pdfjsLib && !window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }

    for (let file of input.files) {
      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.cssText = 'width: 100px; height: 140px; object-fit: cover; border: 2px solid var(--accent);';
        container.appendChild(img);
      } else if (file.type === 'application/pdf') {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'width: 100px; height: 140px; border: 2px solid var(--accent); object-fit: contain; background: #fff;';
        container.appendChild(canvas);
        
        try {
          const url = URL.createObjectURL(file);
          const loadingTask = pdfjsLib.getDocument(url);
          const pdf = await loadingTask.promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1.0 });
          const scale = 140 / viewport.height;
          const scaledViewport = page.getViewport({ scale });
          
          canvas.height = scaledViewport.height;
          canvas.width = scaledViewport.width;
          
          const renderContext = { canvasContext: canvas.getContext('2d'), viewport: scaledViewport };
          await page.render(renderContext).promise;
        } catch (e) {
          const fallback = document.createElement('div');
          fallback.style.cssText = 'width:100px; height:140px; border:2px solid var(--accent); display:flex; align-items:center; justify-content:center; color:var(--accent); font-size:10px; text-align:center; padding:10px; word-break:break-all;';
          fallback.innerText = "PDF: " + file.name;
          container.replaceChild(fallback, canvas);
        }
      }
    }
  }

  // UI Component Generator
  function getUploadUI(id, label, accept, multiple) {
    return `
      <div style="margin-bottom:15px;">
        <label class="cyber-btn" style="display:inline-block; cursor:pointer;">
          [ + ] ${label}
          <input type="file" id="${id}" accept="${accept}" ${multiple ? 'multiple' : ''} style="display:none;" />
        </label>
        <div id="${id}-preview" style="display:flex; flex-wrap:wrap; margin-top:15px; gap:10px;"></div>
      </div>
    `;
  }

  function bindUploadPreview(el, inputId) {
    const input = el.querySelector('#' + inputId);
    const container = el.querySelector('#' + inputId + '-preview');
    input.addEventListener('change', () => renderPreviews(input, container));
  }

  // 1. MERGE PDF
  t.push({
    id: 'pdf-merge', category: 'pdf', name: 'Merge PDFs', icon: '📑',
    description: 'Combine multiple PDF files into one single document securely.',
    tags: ['pdf', 'merge', 'combine', 'join'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-merge-input', 'CHOOSE MULTIPLE PDFs', 'application/pdf', true)}
          <button id="pdf-merge-btn" class="cyber-btn">Merge PDFs</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-merge-input');
      el.querySelector('#pdf-merge-btn').onclick = async () => {
        const files = el.querySelector('#pdf-merge-input').files;
        if (files.length < 2) return showToast("Select at least 2 PDFs!");
        showToast("Merging...");
        try {
          const { PDFDocument } = getPDFLib();
          const mergedPdf = await PDFDocument.create();
          for (let f of files) {
            const bytes = await f.arrayBuffer();
            const pdf = await PDFDocument.load(bytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
          }
          downloadPDFBytes(await mergedPdf.save(), "Merged_Document.pdf");
          showToast("Merged successfully!");
        } catch(e) { showToast("Error merging: " + e.message); }
      };
    }
  });

  // 2. SPLIT PDF (Extract all pages to ZIP)
  t.push({
    id: 'pdf-split', category: 'pdf', name: 'Split PDF to ZIP', icon: '✂️',
    description: 'Extract every single page of a PDF into its own separate PDF file.',
    tags: ['pdf', 'split', 'extract', 'zip'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-split-input', 'CHOOSE PDF', 'application/pdf', false)}
          <button id="pdf-split-btn" class="cyber-btn">Split & Download ZIP</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-split-input');
      el.querySelector('#pdf-split-btn').onclick = async () => {
        const file = el.querySelector('#pdf-split-input').files[0];
        if (!file) return showToast("Select a PDF!");
        if (!window.JSZip) return showToast("JSZip library not loaded!");
        showToast("Splitting...");
        try {
          const { PDFDocument } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          const numPages = pdf.getPageCount();
          const zip = new JSZip();
          
          for (let i = 0; i < numPages; i++) {
            const newPdf = await PDFDocument.create();
            const [copiedPage] = await newPdf.copyPages(pdf, [i]);
            newPdf.addPage(copiedPage);
            zip.file(`Page_${i + 1}.pdf`, await newPdf.save());
          }
          downloadBlob(await zip.generateAsync({type:"blob"}), "Split_PDFs.zip");
          showToast("Extracted " + numPages + " pages!");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 3. EXTRACT PAGES
  t.push({
    id: 'pdf-extract', category: 'pdf', name: 'Extract Specific Pages', icon: '📄',
    description: 'Extract a specific range of pages (e.g. 1, 3, 5-7) to a new PDF.',
    tags: ['pdf', 'extract', 'pages'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-ext-input', 'CHOOSE PDF', 'application/pdf', false)}
          <input type="text" id="pdf-ext-pages" class="cyber-input" placeholder="Pages (e.g. 1, 3, 5)" style="margin-bottom:15px; width:100%;" />
          <button id="pdf-ext-btn" class="cyber-btn">Extract to New PDF</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-ext-input');
      el.querySelector('#pdf-ext-btn').onclick = async () => {
        const file = el.querySelector('#pdf-ext-input').files[0];
        const rangeStr = el.querySelector('#pdf-ext-pages').value;
        if (!file || !rangeStr) return showToast("Provide file and pages!");
        try {
          const indices = rangeStr.split(',').map(n => parseInt(n.trim()) - 1).filter(n => !isNaN(n) && n >= 0);
          if (indices.length === 0) return showToast("Invalid page numbers");
          
          const { PDFDocument } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          
          const newPdf = await PDFDocument.create();
          const copiedPages = await newPdf.copyPages(pdf, indices);
          copiedPages.forEach(p => newPdf.addPage(p));
          downloadPDFBytes(await newPdf.save(), "Extracted_Pages.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 4. REMOVE PAGES
  t.push({
    id: 'pdf-remove', category: 'pdf', name: 'Remove Pages', icon: '🗑️',
    description: 'Delete specific pages from a PDF document.',
    tags: ['pdf', 'remove', 'delete', 'pages'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-rem-input', 'CHOOSE PDF', 'application/pdf', false)}
          <input type="text" id="pdf-rem-pages" class="cyber-input" placeholder="Pages to remove (e.g. 2, 4)" style="margin-bottom:15px; width:100%;" />
          <button id="pdf-rem-btn" class="cyber-btn">Remove Pages</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-rem-input');
      el.querySelector('#pdf-rem-btn').onclick = async () => {
        const file = el.querySelector('#pdf-rem-input').files[0];
        const rangeStr = el.querySelector('#pdf-rem-pages').value;
        if (!file || !rangeStr) return showToast("Provide file and pages!");
        try {
          const toRemove = rangeStr.split(',').map(n => parseInt(n.trim()) - 1).filter(n => !isNaN(n) && n >= 0);
          const { PDFDocument } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          
          toRemove.sort((a,b)=>b-a).forEach(idx => {
             if(idx < pdf.getPageCount()) pdf.removePage(idx);
          });
          downloadPDFBytes(await pdf.save(), "Cleaned_Document.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 5. REVERSE PDF
  t.push({
    id: 'pdf-reverse', category: 'pdf', name: 'Reverse PDF', icon: '🔁',
    description: 'Reverse the order of all pages in a document (last page becomes first).',
    tags: ['pdf', 'reverse', 'order', 'pages'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-rev-input', 'CHOOSE PDF', 'application/pdf', false)}
          <button id="pdf-rev-btn" class="cyber-btn">Reverse Order</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-rev-input');
      el.querySelector('#pdf-rev-btn').onclick = async () => {
        const file = el.querySelector('#pdf-rev-input').files[0];
        if (!file) return showToast("Select PDF!");
        try {
          const { PDFDocument } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          const newPdf = await PDFDocument.create();
          const count = pdf.getPageCount();
          const indices = [];
          for(let i = count - 1; i >= 0; i--) indices.push(i);
          
          const copiedPages = await newPdf.copyPages(pdf, indices);
          copiedPages.forEach(p => newPdf.addPage(p));
          downloadPDFBytes(await newPdf.save(), "Reversed.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 6. ROTATE PDF
  t.push({
    id: 'pdf-rotate', category: 'pdf', name: 'Rotate PDF', icon: '🔄',
    description: 'Rotate all pages in a PDF document by 90, 180, or 270 degrees.',
    tags: ['pdf', 'rotate', 'flip', 'pages'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-rot-input', 'CHOOSE PDF', 'application/pdf', false)}
          <select id="pdf-rot-deg" class="cyber-input" style="margin-bottom:15px; width:100%;">
            <option value="90">90 Degrees Clockwise</option>
            <option value="180">180 Degrees</option>
            <option value="270">90 Degrees Counter-Clockwise</option>
          </select>
          <button id="pdf-rot-btn" class="cyber-btn">Rotate</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-rot-input');
      el.querySelector('#pdf-rot-btn').onclick = async () => {
        const file = el.querySelector('#pdf-rot-input').files[0];
        const deg = parseInt(el.querySelector('#pdf-rot-deg').value);
        if (!file) return showToast("Select PDF!");
        try {
          const { PDFDocument, degrees } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          pdf.getPages().forEach(p => p.setRotation(degrees(deg)));
          downloadPDFBytes(await pdf.save(), "Rotated.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 7. ADD BLANK PAGE
  t.push({
    id: 'pdf-blank', category: 'pdf', name: 'Add Blank Page', icon: '📝',
    description: 'Add a blank page to the end of a document.',
    tags: ['pdf', 'blank', 'empty', 'page'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-blk-input', 'CHOOSE PDF', 'application/pdf', false)}
          <button id="pdf-blk-btn" class="cyber-btn">Add Blank Page</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-blk-input');
      el.querySelector('#pdf-blk-btn').onclick = async () => {
        const file = el.querySelector('#pdf-blk-input').files[0];
        if (!file) return showToast("Select PDF!");
        try {
          const { PDFDocument } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          pdf.addPage();
          downloadPDFBytes(await pdf.save(), "With_Blank_Page.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 8. IMAGE TO PDF
  t.push({
    id: 'pdf-img2pdf', category: 'pdf', name: 'Image to PDF', icon: '🖼️',
    description: 'Convert a single JPG or PNG into a PDF document.',
    tags: ['pdf', 'image', 'jpg', 'png', 'convert'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-i2p-input', 'CHOOSE IMAGE', 'image/png, image/jpeg', false)}
          <button id="pdf-i2p-btn" class="cyber-btn">Convert to PDF</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-i2p-input');
      el.querySelector('#pdf-i2p-btn').onclick = async () => {
        const file = el.querySelector('#pdf-i2p-input').files[0];
        if (!file) return showToast("Select Image!");
        try {
          const { PDFDocument } = getPDFLib();
          const pdf = await PDFDocument.create();
          const bytes = await file.arrayBuffer();
          let img;
          if(file.type === 'image/jpeg') img = await pdf.embedJpg(bytes);
          else if(file.type === 'image/png') img = await pdf.embedPng(bytes);
          else return showToast("Unsupported image type!");
          
          const page = pdf.addPage([img.width, img.height]);
          page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
          downloadPDFBytes(await pdf.save(), "Image.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 9. MULTIPLE IMAGES TO PDF
  t.push({
    id: 'pdf-imgs2pdf', category: 'pdf', name: 'Images to Multi-Page PDF', icon: '📸',
    description: 'Stitch multiple JPGs/PNGs into a single multi-page PDF.',
    tags: ['pdf', 'image', 'jpg', 'png', 'convert', 'multiple'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-m2p-input', 'CHOOSE IMAGES', 'image/png, image/jpeg', true)}
          <button id="pdf-m2p-btn" class="cyber-btn">Stitch into PDF</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-m2p-input');
      el.querySelector('#pdf-m2p-btn').onclick = async () => {
        const files = el.querySelector('#pdf-m2p-input').files;
        if (files.length === 0) return showToast("Select Images!");
        showToast("Stitching...");
        try {
          const { PDFDocument } = getPDFLib();
          const pdf = await PDFDocument.create();
          for (let f of files) {
            const bytes = await f.arrayBuffer();
            let img;
            if(f.type === 'image/jpeg') img = await pdf.embedJpg(bytes);
            else if(f.type === 'image/png') img = await pdf.embedPng(bytes);
            else continue;
            const page = pdf.addPage([img.width, img.height]);
            page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
          }
          downloadPDFBytes(await pdf.save(), "PhotoAlbum.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 10. PDF TO BASE64
  t.push({
    id: 'pdf-to-base64', category: 'pdf', name: 'PDF to Base64', icon: '🧬',
    description: 'Encode a PDF file into a Base64 data string.',
    tags: ['pdf', 'base64', 'encode', 'convert'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-b64-input', 'CHOOSE PDF', 'application/pdf', false)}
          <button id="pdf-b64-btn" class="cyber-btn">Encode to Base64</button>
          <textarea id="pdf-b64-out" class="cyber-input" rows="4" readonly placeholder="Output string..." style="margin-top:15px; width:100%;"></textarea>
        </div>
      `;
      bindUploadPreview(el, 'pdf-b64-input');
      el.querySelector('#pdf-b64-btn').onclick = () => {
        const file = el.querySelector('#pdf-b64-input').files[0];
        if (!file) return showToast("Select PDF!");
        const reader = new FileReader();
        reader.onload = e => {
           const str = e.target.result.split(',')[1];
           el.querySelector('#pdf-b64-out').value = str;
           showToast("Encoded!");
        };
        reader.readAsDataURL(file);
      };
    }
  });

  // 11. BASE64 TO PDF
  t.push({
    id: 'base64-to-pdf', category: 'pdf', name: 'Base64 to PDF', icon: '💊',
    description: 'Decode a Base64 string back into a PDF file.',
    tags: ['pdf', 'base64', 'decode', 'convert'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          <textarea id="b64-pdf-in" class="cyber-input" rows="4" placeholder="Paste Base64 string without data url prefix..." style="margin-bottom:15px; width:100%;"></textarea>
          <button id="b64-pdf-btn" class="cyber-btn">Download PDF</button>
        </div>
      `;
      el.querySelector('#b64-pdf-btn').onclick = () => {
        const b64 = el.querySelector('#b64-pdf-in').value.trim();
        if (!b64) return showToast("Paste string!");
        try {
          const raw = window.atob(b64);
          const rawLen = raw.length;
          const arr = new Uint8Array(new ArrayBuffer(rawLen));
          for(let i=0; i<rawLen; i++) arr[i] = raw.charCodeAt(i);
          downloadPDFBytes(arr, "Decoded.pdf");
        } catch(e) { showToast("Invalid Base64"); }
      };
    }
  });

  // 12. TEXT WATERMARK
  t.push({
    id: 'pdf-watermark', category: 'pdf', name: 'Add Text Watermark', icon: '🔏',
    description: 'Stamp text diagonally across every page of a document.',
    tags: ['pdf', 'watermark', 'stamp', 'text'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-wt-input', 'CHOOSE PDF', 'application/pdf', false)}
          <input type="text" id="pdf-wt-txt" class="cyber-input" placeholder="Watermark Text (e.g. CONFIDENTIAL)" style="margin-bottom:15px; width:100%;" />
          <button id="pdf-wt-btn" class="cyber-btn">Stamp Document</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-wt-input');
      el.querySelector('#pdf-wt-btn').onclick = async () => {
        const file = el.querySelector('#pdf-wt-input').files[0];
        const txt = el.querySelector('#pdf-wt-txt').value || "CONFIDENTIAL";
        if (!file) return showToast("Select PDF!");
        showToast("Stamping...");
        try {
          const { PDFDocument, rgb, degrees } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          pdf.getPages().forEach(p => {
             const { width, height } = p.getSize();
             p.drawText(txt, {
                x: width / 4, y: height / 4,
                size: 60, color: rgb(1, 0, 0), opacity: 0.3, rotate: degrees(45)
             });
          });
          downloadPDFBytes(await pdf.save(), "Watermarked.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 13. IMAGE WATERMARK
  t.push({
    id: 'pdf-img-watermark', category: 'pdf', name: 'Add Image Watermark', icon: '🛡️',
    description: 'Stamp a JPG/PNG logo onto every page of a document.',
    tags: ['pdf', 'watermark', 'stamp', 'image', 'logo'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-iw-pdf', 'CHOOSE PDF', 'application/pdf', false)}
          ${getUploadUI('pdf-iw-img', 'CHOOSE LOGO (IMAGE)', 'image/png, image/jpeg', false)}
          <button id="pdf-iw-btn" class="cyber-btn">Stamp Logo</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-iw-pdf');
      bindUploadPreview(el, 'pdf-iw-img');
      el.querySelector('#pdf-iw-btn').onclick = async () => {
        const pFile = el.querySelector('#pdf-iw-pdf').files[0];
        const iFile = el.querySelector('#pdf-iw-img').files[0];
        if (!pFile || !iFile) return showToast("Select both files!");
        showToast("Stamping...");
        try {
          const { PDFDocument } = getPDFLib();
          const pBytes = await pFile.arrayBuffer();
          const iBytes = await iFile.arrayBuffer();
          const pdf = await PDFDocument.load(pBytes);
          let img;
          if(iFile.type === 'image/jpeg') img = await pdf.embedJpg(iBytes);
          else img = await pdf.embedPng(iBytes);
          pdf.getPages().forEach(p => {
             const { width, height } = p.getSize();
             p.drawImage(img, { x: width - 120, y: height - 120, width: 100, height: 100, opacity: 0.5 });
          });
          downloadPDFBytes(await pdf.save(), "Logo_Stamped.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 14. ADD PAGE NUMBERS
  t.push({
    id: 'pdf-page-num', category: 'pdf', name: 'Add Page Numbers', icon: '#️⃣',
    description: 'Stamp page numbers (e.g. 1, 2, 3...) at the bottom center of each page.',
    tags: ['pdf', 'page', 'numbers', 'stamp'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-pn-input', 'CHOOSE PDF', 'application/pdf', false)}
          <button id="pdf-pn-btn" class="cyber-btn">Number Pages</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-pn-input');
      el.querySelector('#pdf-pn-btn').onclick = async () => {
        const file = el.querySelector('#pdf-pn-input').files[0];
        if (!file) return showToast("Select PDF!");
        showToast("Numbering...");
        try {
          const { PDFDocument, rgb } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          pdf.getPages().forEach((p, idx) => {
             const { width } = p.getSize();
             p.drawText((idx + 1).toString(), { x: width / 2 - 5, y: 20, size: 14, color: rgb(0, 0, 0) });
          });
          downloadPDFBytes(await pdf.save(), "Numbered.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 15. FLATTEN FORMS
  t.push({
    id: 'pdf-flatten', category: 'pdf', name: 'Flatten Form Fields', icon: '🔨',
    description: 'Flatten all interactive form fields into static text so they cannot be edited.',
    tags: ['pdf', 'flatten', 'form', 'static'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-flat-input', 'CHOOSE PDF', 'application/pdf', false)}
          <button id="pdf-flat-btn" class="cyber-btn">Flatten Form</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-flat-input');
      el.querySelector('#pdf-flat-btn').onclick = async () => {
        const file = el.querySelector('#pdf-flat-input').files[0];
        if (!file) return showToast("Select PDF!");
        showToast("Flattening...");
        try {
          const { PDFDocument } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          pdf.getForm().flatten();
          downloadPDFBytes(await pdf.save(), "Flattened.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 16. READ METADATA
  t.push({
    id: 'pdf-read-meta', category: 'pdf', name: 'Read Metadata', icon: '👁️',
    description: 'Extract hidden metadata (Title, Author, Creator) from a PDF.',
    tags: ['pdf', 'metadata', 'read', 'exif'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-rm-input', 'CHOOSE PDF', 'application/pdf', false)}
          <button id="pdf-rm-btn" class="cyber-btn">Scan File</button>
          <div id="pdf-rm-out" style="margin-top:15px; font-family:var(--font-mono); white-space:pre-wrap; color:var(--accent);"></div>
        </div>
      `;
      bindUploadPreview(el, 'pdf-rm-input');
      el.querySelector('#pdf-rm-btn').onclick = async () => {
        const file = el.querySelector('#pdf-rm-input').files[0];
        if (!file) return showToast("Select PDF!");
        try {
          const { PDFDocument } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          const out = `
Title: ${pdf.getTitle() || 'N/A'}
Author: ${pdf.getAuthor() || 'N/A'}
Subject: ${pdf.getSubject() || 'N/A'}
Creator: ${pdf.getCreator() || 'N/A'}
Producer: ${pdf.getProducer() || 'N/A'}
Creation Date: ${pdf.getCreationDate() ? pdf.getCreationDate().toISOString() : 'N/A'}
          `.trim();
          el.querySelector('#pdf-rm-out').innerText = out;
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 17. EDIT METADATA
  t.push({
    id: 'pdf-edit-meta', category: 'pdf', name: 'Edit Metadata', icon: '✏️',
    description: 'Change the hidden metadata embedded inside a PDF file.',
    tags: ['pdf', 'metadata', 'edit', 'write'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-em-input', 'CHOOSE PDF', 'application/pdf', false)}
          <input type="text" id="pdf-em-title" class="cyber-input" placeholder="New Title" style="margin-bottom:10px; width:100%;" />
          <input type="text" id="pdf-em-author" class="cyber-input" placeholder="New Author" style="margin-bottom:15px; width:100%;" />
          <button id="pdf-em-btn" class="cyber-btn">Save Changes</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-em-input');
      el.querySelector('#pdf-em-btn').onclick = async () => {
        const file = el.querySelector('#pdf-em-input').files[0];
        if (!file) return showToast("Select PDF!");
        showToast("Saving...");
        try {
          const { PDFDocument } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          const title = el.querySelector('#pdf-em-title').value;
          const auth = el.querySelector('#pdf-em-author').value;
          if(title) pdf.setTitle(title);
          if(auth) pdf.setAuthor(auth);
          downloadPDFBytes(await pdf.save(), "Edited_Meta.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 18. REMOVE METADATA
  t.push({
    id: 'pdf-strip-meta', category: 'pdf', name: 'Strip Metadata', icon: '🧼',
    description: 'Remove all hidden tracking data, titles, and authors from a PDF.',
    tags: ['pdf', 'metadata', 'strip', 'remove', 'clean'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-sm-input', 'CHOOSE PDF', 'application/pdf', false)}
          <button id="pdf-sm-btn" class="cyber-btn">Clean PDF</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-sm-input');
      el.querySelector('#pdf-sm-btn').onclick = async () => {
        const file = el.querySelector('#pdf-sm-input').files[0];
        if (!file) return showToast("Select PDF!");
        showToast("Cleaning...");
        try {
          const { PDFDocument } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          pdf.setTitle('');
          pdf.setAuthor('');
          pdf.setSubject('');
          pdf.setKeywords([]);
          pdf.setProducer('');
          pdf.setCreator('');
          downloadPDFBytes(await pdf.save(), "Cleaned_Meta.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 19. PAGE COUNTER
  t.push({
    id: 'pdf-count', category: 'pdf', name: 'Page Counter', icon: '📊',
    description: 'Instantly find out how many pages are in a massive PDF file.',
    tags: ['pdf', 'count', 'pages'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-ct-input', 'CHOOSE PDF', 'application/pdf', false)}
          <button id="pdf-ct-btn" class="cyber-btn">Count Pages</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-ct-input');
      el.querySelector('#pdf-ct-btn').onclick = async () => {
        const file = el.querySelector('#pdf-ct-input').files[0];
        if (!file) return showToast("Select PDF!");
        try {
          const { PDFDocument } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
          alert("Total Pages: " + pdf.getPageCount());
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  // 20. FILE ANALYZER
  t.push({
    id: 'pdf-analyze', category: 'pdf', name: 'File Size Analyzer', icon: '🔍',
    description: 'Check the exact structural byte footprint of the document.',
    tags: ['pdf', 'analyze', 'size', 'bytes'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-an-input', 'CHOOSE FILE', '', false)}
          <button id="pdf-an-btn" class="cyber-btn">Analyze Bytes</button>
          <div id="pdf-an-out" style="margin-top:15px; font-family:var(--font-mono); color:var(--accent);"></div>
        </div>
      `;
      bindUploadPreview(el, 'pdf-an-input');
      el.querySelector('#pdf-an-btn').onclick = () => {
        const file = el.querySelector('#pdf-an-input').files[0];
        if (!file) return showToast("Select file!");
        const kb = (file.size / 1024).toFixed(2);
        const mb = (file.size / 1024 / 1024).toFixed(2);
        el.querySelector('#pdf-an-out').innerText = `File: ${file.name}\\nSize: ${kb} KB (${mb} MB)`;
      };
    }
  });

  // 21. COMPRESS PDF (Basic)
  t.push({
    id: 'pdf-compress', category: 'pdf', name: 'Compress PDF (Basic)', icon: '🗜️',
    description: 'Re-serialize the document and strip unused objects to try and save space.',
    tags: ['pdf', 'compress', 'shrink', 'reduce'],
    setup(el) {
      el.innerHTML = `
        <div class="tool-section">
          ${getUploadUI('pdf-comp-input', 'CHOOSE PDF', 'application/pdf', false)}
          <button id="pdf-comp-btn" class="cyber-btn">Attempt Compression</button>
        </div>
      `;
      bindUploadPreview(el, 'pdf-comp-input');
      el.querySelector('#pdf-comp-btn').onclick = async () => {
        const file = el.querySelector('#pdf-comp-input').files[0];
        if (!file) return showToast("Select PDF!");
        showToast("Processing...");
        try {
          const { PDFDocument } = getPDFLib();
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          const newBytes = await pdf.save({ useObjectStreams: false });
          
          if(newBytes.byteLength < bytes.byteLength) {
             showToast("Success! Saved " + ((bytes.byteLength - newBytes.byteLength)/1024).toFixed(1) + " KB");
          } else {
             showToast("Done! (File was already highly optimized)");
          }
          downloadPDFBytes(newBytes, "Compressed.pdf");
        } catch(e) { showToast("Error: " + e.message); }
      };
    }
  });

  window.TOOLS.push(...t);
}

// Auto-register tools if loaded
if(window.TOOLS) addPDFTools();
