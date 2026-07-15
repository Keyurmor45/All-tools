window.TOOLS.push(
  // 1. Merge PDFs
  {
    id: 'pdf-merge',
    name: 'Merge PDFs',
    desc: 'Combine multiple PDF files into a single document entirely in your browser. 100% private.',
    icon: '📚',
    category: 'converter',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <label class="tool-label">Select PDFs to Merge</label>
          <input type="file" id="pdf-merge-input" class="io-input" accept="application/pdf" multiple>
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:15px;">Note: Files are processed locally. Nothing is uploaded to any server.</p>
          
          <div id="pdf-file-list" style="margin-bottom:15px; display:flex; flex-direction:column; gap:5px;"></div>
          
          <button class="btn btn-primary" id="pdf-merge-btn" style="display:none; width:100%;">Merge PDFs</button>
          
          <div id="pdf-merge-loading" style="display:none; margin-top:15px; text-align:center; color:var(--accent-warm);">
             Processing... Please wait.
          </div>
        </div>
      `;
      
      const input = el.querySelector('#pdf-merge-input');
      const fileList = el.querySelector('#pdf-file-list');
      const btn = el.querySelector('#pdf-merge-btn');
      const loading = el.querySelector('#pdf-merge-loading');
      
      let selectedFiles = [];

      input.addEventListener('change', (e) => {
        selectedFiles = Array.from(e.target.files);
        renderFileList();
      });

      function renderFileList() {
        fileList.innerHTML = '';
        if(selectedFiles.length < 2) {
           fileList.innerHTML = '<span style="color:var(--accent-red);">Please select at least 2 PDF files.</span>';
           btn.style.display = 'none';
           return;
        }
        
        btn.style.display = 'block';
        selectedFiles.forEach((file, index) => {
           const div = document.createElement('div');
           div.style.cssText = 'display:flex; justify-content:space-between; padding:10px; background:var(--surface-2); border-radius:4px;';
           div.innerHTML = `
             <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">📄 ${file.name}</span>
             <div>
               <button class="btn" style="padding:2px 8px; font-size:0.8rem;" data-idx="${index}" class="move-up">▲</button>
               <button class="btn" style="padding:2px 8px; font-size:0.8rem;" data-idx="${index}" class="move-down">▼</button>
               <button class="btn" style="padding:2px 8px; font-size:0.8rem; color:var(--accent-red);" data-idx="${index}" class="remove">✕</button>
             </div>
           `;
           
           // Move up
           div.querySelector('button:nth-child(1)').addEventListener('click', () => {
             if(index > 0) {
               [selectedFiles[index-1], selectedFiles[index]] = [selectedFiles[index], selectedFiles[index-1]];
               renderFileList();
             }
           });
           
           // Move down
           div.querySelector('button:nth-child(2)').addEventListener('click', () => {
             if(index < selectedFiles.length - 1) {
               [selectedFiles[index+1], selectedFiles[index]] = [selectedFiles[index], selectedFiles[index+1]];
               renderFileList();
             }
           });

           // Remove
           div.querySelector('button:nth-child(3)').addEventListener('click', () => {
             selectedFiles.splice(index, 1);
             renderFileList();
           });

           fileList.appendChild(div);
        });
      }

      btn.addEventListener('click', async () => {
        if (typeof PDFLib === 'undefined') {
          alert('PDF engine is still loading. Please wait a second and try again.');
          return;
        }
        if (selectedFiles.length < 2) return;
        
        btn.style.display = 'none';
        loading.style.display = 'block';
        
        try {
          const mergedPdf = await PDFLib.PDFDocument.create();
          
          for (const file of selectedFiles) {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
          }
          
          const pdfBytes = await mergedPdf.save();
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Merged_Document.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
        } catch(err) {
          console.error(err);
          alert('Failed to merge PDFs. Make sure they are valid, unencrypted PDF files.');
        } finally {
          btn.style.display = 'block';
          loading.style.display = 'none';
        }
      });
    }
  },

  // 2. Split PDF
  {
    id: 'pdf-split',
    name: 'Split PDF Pages',
    desc: 'Extract specific pages from a PDF. Runs locally, completely private.',
    icon: '✂️',
    category: 'converter',
    setup(el) {
      el.innerHTML = `
        <div class="tool-io">
          <label class="tool-label">Select PDF to Split</label>
          <input type="file" id="pdf-split-input" class="io-input" accept="application/pdf">
          
          <div id="split-controls" style="display:none; margin-top:15px;">
            <label class="tool-label">Pages to Extract (e.g., 1-5, 8, 11-13)</label>
            <input type="text" id="pdf-split-pages" class="io-input" placeholder="1-3, 5" style="margin-bottom:10px;">
            <p id="pdf-page-count" style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:15px;"></p>
            
            <button class="btn btn-primary" id="pdf-split-btn" style="width:100%;">Extract Pages</button>
          </div>
          
          <div id="pdf-split-loading" style="display:none; margin-top:15px; text-align:center; color:var(--accent-warm);">
             Processing... Please wait.
          </div>
        </div>
      `;
      
      const input = el.querySelector('#pdf-split-input');
      const controls = el.querySelector('#split-controls');
      const pagesInput = el.querySelector('#pdf-split-pages');
      const pageCountText = el.querySelector('#pdf-page-count');
      const btn = el.querySelector('#pdf-split-btn');
      const loading = el.querySelector('#pdf-split-loading');
      
      let loadedPdfDoc = null;
      let totalPages = 0;
      let fileBytes = null;
      let fileName = 'Extracted.pdf';

      input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if(!file) return;
        fileName = file.name.replace('.pdf', '_extracted.pdf');
        
        controls.style.display = 'none';
        loading.style.display = 'block';
        
        try {
          if (typeof PDFLib === 'undefined') throw new Error('PDF Engine not loaded');
          fileBytes = await file.arrayBuffer();
          loadedPdfDoc = await PDFLib.PDFDocument.load(fileBytes);
          totalPages = loadedPdfDoc.getPageCount();
          
          pageCountText.textContent = `This document has ${totalPages} pages.`;
          controls.style.display = 'block';
        } catch(err) {
          console.error(err);
          alert('Could not read PDF. It might be encrypted or invalid.');
        } finally {
          loading.style.display = 'none';
        }
      });

      function parsePageRanges(str, maxPages) {
         const pages = new Set();
         const parts = str.split(',').map(s => s.trim());
         for(const part of parts) {
            if(!part) continue;
            if(part.includes('-')) {
               const [start, end] = part.split('-').map(Number);
               if(start && end && start <= end && start >= 1 && end <= maxPages) {
                  for(let i=start; i<=end; i++) pages.add(i-1);
               }
            } else {
               const p = Number(part);
               if(p && p >= 1 && p <= maxPages) pages.add(p-1);
            }
         }
         return Array.from(pages).sort((a,b) => a-b);
      }

      btn.addEventListener('click', async () => {
        if(!loadedPdfDoc) return;
        const pagesToExtract = parsePageRanges(pagesInput.value, totalPages);
        if(pagesToExtract.length === 0) {
           alert('Please enter a valid page range.');
           return;
        }
        
        btn.style.display = 'none';
        loading.style.display = 'block';
        
        try {
          const newPdf = await PDFLib.PDFDocument.create();
          const copiedPages = await newPdf.copyPages(loadedPdfDoc, pagesToExtract);
          copiedPages.forEach((page) => newPdf.addPage(page));
          
          const pdfBytesOut = await newPdf.save();
          const blob = new Blob([pdfBytesOut], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
        } catch(err) {
          console.error(err);
          alert('Failed to split PDF.');
        } finally {
          btn.style.display = 'block';
          loading.style.display = 'none';
        }
      });
    }
  }
);
