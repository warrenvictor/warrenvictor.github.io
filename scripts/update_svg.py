import base64
import io
from PIL import Image

# Optimize the cutout PNG to webp or compact png
cutout = Image.open('assets/img/warren-cutout.png')

buf = io.BytesIO()
cutout.save(buf, format='PNG', optimize=True)
b64_data = base64.b64encode(buf.getvalue()).decode('utf-8')

# Read original SVG template and replace embedded base64
with open('assets/img/Warren Victor Photo.svg', 'r', encoding='utf-8') as f:
    svg_text = f.read()

import re
new_svg = re.sub(r'xlink:href="data:image/png;base64,[^"]+"', f'xlink:href="data:image/png;base64,{b64_data}"', svg_text)

with open('assets/img/Warren Victor Photo.svg', 'w', encoding='utf-8') as f:
    f.write(new_svg)

print("Updated Warren Victor Photo.svg with transparent PNG! File size:", len(new_svg))
