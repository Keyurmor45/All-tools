import math
import struct
import zlib

def create_png(width, height, draw_func, filename):
    png = bytearray(b'\x89PNG\r\n\x1a\n')

    # IHDR
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    crc = zlib.crc32(b'IHDR' + ihdr_data) & 0xffffffff
    png.extend(struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data + struct.pack('>I', crc))

    # IDAT
    raw_lines = bytearray()
    for y in range(height):
        raw_lines.append(0)  # filter type 0
        for x in range(width):
            r, g, b, a = draw_func(x, y, width, height)
            raw_lines.extend([r, g, b, a])

    compressed = zlib.compress(bytes(raw_lines), level=9)
    crc = zlib.crc32(b'IDAT' + compressed) & 0xffffffff
    png.extend(struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', crc))

    # IEND
    crc = zlib.crc32(b'IEND') & 0xffffffff
    png.extend(struct.pack('>I', 0) + b'IEND' + struct.pack('>I', crc))

    with open(filename, 'wb') as f:
        f.write(png)

def is_inside_star(x, y, width, height):
    cx, cy = width / 2.0, height / 2.0
    dx, dy = x - cx, y - cy
    dist = math.hypot(dx, dy)

    R = width * (175.0 / 512.0)
    r = width * (75.0 / 512.0)

    if dist > R + 2:
        return 0.0
    if dist < r - 2:
        return 1.0

    angle = math.atan2(dy, dx) + math.pi / 2.0
    if angle < 0:
        angle += 2 * math.pi

    seg_angle = math.pi / 8.0
    seg = angle / seg_angle
    seg_idx = int(math.floor(seg))
    t = seg - seg_idx

    if seg_idx % 2 == 0:
        r_boundary = R * (1.0 - t) + r * t
    else:
        r_boundary = r * (1.0 - t) + R * t

    diff = r_boundary - dist
    if diff >= 0.75:
        return 1.0
    elif diff <= -0.75:
        return 0.0
    else:
        return (diff + 0.75) / 1.5

def render_pixel(x, y, width, height):
    alpha_star = is_inside_star(x + 0.5, y + 0.5, width, height)
    r = int(round(204 * alpha_star))
    g = int(round(255 * alpha_star))
    b = 0
    a = 255
    return (r, g, b, a)

if __name__ == '__main__':
    print('Generating icon-192.png...')
    create_png(192, 192, render_pixel, 'icon-192.png')
    print('Generating icon-512.png...')
    create_png(512, 512, render_pixel, 'icon-512.png')
    print('Done!')
