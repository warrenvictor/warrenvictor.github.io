import re
import base64
from PIL import Image
import io

with open('assets/img/Warren Victor Photo.svg', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'data:image/png;base64,([^"]+)', content)
if match:
    data = base64.b64decode(match.group(1))
    img = Image.open(io.BytesIO(data))
    print('Format:', img.format, 'Mode:', img.mode, 'Size:', img.size)
    print('Pixel (0,0):', img.getpixel((0,0)))
    print('Pixel (10,10):', img.getpixel((10,10)))
    print('Pixel (50,50):', img.getpixel((50,50)))
