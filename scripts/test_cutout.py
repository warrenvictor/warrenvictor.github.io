import re
import base64
from PIL import Image, ImageDraw, ImageFilter
import io
import numpy as np

with open('assets/img/Warren Victor Photo.svg', 'r', encoding='utf-8') as f:
    svg_content = f.read()

match = re.search(r'data:image/png;base64,([^"]+)', svg_content)
if match:
    data = base64.b64decode(match.group(1))
    img = Image.open(io.BytesIO(data)).convert("RGBA")
    w, h = img.size
    arr = np.array(img)

    r = arr[:, :, 0].astype(int)
    g = arr[:, :, 1].astype(int)
    b = arr[:, :, 2].astype(int)

    # A pixel is white background if r > 245 and g > 245 and b > 245
    # and difference between max and min channel is small (< 10)
    is_white = (r > 240) & (g > 240) & (b > 240) & ((np.maximum(np.maximum(r, g), b) - np.minimum(np.minimum(r, g), b)) < 12)

    # Create mask image where white pixels are 1 and non-white are 0
    mask_img = Image.fromarray((is_white * 255).astype(np.uint8), mode='L')

    # Now flood fill from corners on mask_img
    # To find only pixels connected to edges, we can create a canvas of zeros
    # and flood fill on mask_img where value is 255
    # PIL ImageDraw.floodfill(image, xy, value, thresh=...)
    # Or in mask_img, invert so non-white is 255, background is 0:
    # Actually ImageDraw.floodfill can fill all 255 connected to (0,0) with a new value 128
    fill_img = mask_img.copy()
    for pt in [(0, 0), (w-1, 0), (0, h//2), (w-1, h//2), (0, h-1), (w-1, h-1)]:
        if fill_img.getpixel(pt) == 255:
            ImageDraw.floodfill(fill_img, pt, 128)

    # All pixels with value 128 are connected background!
    bg_arr = (np.array(fill_img) == 128)
    print("Connected background percentage:", bg_arr.mean())

    # For smooth edges, we can create an alpha channel:
    # 0 where bg_arr is True, 255 where False, with slight feathering at the boundary
    alpha_img = Image.fromarray((~bg_arr * 255).astype(np.uint8), mode='L')
    
    # Slight feathering for clean anti-aliasing
    # Blur slightly then threshold
    alpha_arr = np.array(alpha_img).astype(float)
    
    # Now set the alpha of the original image
    result_img = img.copy()
    result_img.putalpha(Image.fromarray((~bg_arr * 255).astype(np.uint8)))

    # Save preview to scratch
    result_img.save('assets/img/warren-cutout.png')
    print("Saved assets/img/warren-cutout.png")
