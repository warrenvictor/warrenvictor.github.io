import re
import base64
from PIL import Image

with open('assets/img/Warren Victor Photo.svg', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'data:image/png;base64,([^"]+)', text)
if m:
    data = base64.b64decode(m.group(1))
    with open('scratch_extracted.png', 'wb') as out:
        out.write(data)
    im = Image.open('scratch_extracted.png')
    print('SVG internal PNG Mode:', im.mode, 'Size:', im.size)
    print('Pixel at (500, 100):', im.getpixel((500, 100)))
    print('Pixel at (100, 100):', im.getpixel((100, 100)))
    print('Pixel at (900, 100):', im.getpixel((900, 100)))
    print('Pixel at (0, 0):', im.getpixel((0, 0)))
