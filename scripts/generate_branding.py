import math
from PIL import Image, ImageDraw, ImageFont

def create_avatar(out_path):
    size = 1024
    img = Image.new("RGBA", (size, size), (10, 17, 40, 255)) # #0A1128 Deep Navy
    draw = ImageDraw.Draw(img)

    # Subtle radial grid / circular geometry
    center = (size // 2, size // 2)
    for r in range(150, 480, 50):
        draw.ellipse([center[0] - r, center[1] - r, center[0] + r, center[1] + r], outline=(16, 185, 129, 35), width=2)

    # Gold / Emerald Outer Ring
    outer_r = 460
    draw.ellipse([center[0] - outer_r, center[1] - outer_r, center[0] + outer_r, center[1] + outer_r], outline=(245, 158, 11, 200), width=4)

    inner_r = 445
    draw.ellipse([center[0] - inner_r, center[1] - inner_r, center[0] + inner_r, center[1] + inner_r], outline=(16, 185, 129, 150), width=2)

    # Center Shield / Crest
    shield_pts = [
        (512, 220), # top
        (680, 290), # top right
        (650, 560), # mid right
        (512, 730), # bottom point
        (374, 560), # mid left
        (344, 290)  # top left
    ]
    draw.polygon(shield_pts, fill=(16, 29, 53, 230), outline=(16, 185, 129, 240))

    # Inner growth bars / candle bars inside shield
    bars = [
        (420, 520, 450, 600, (16, 185, 129, 220)),
        (465, 430, 495, 600, (16, 185, 129, 240)),
        (510, 360, 540, 600, (52, 211, 153, 255)),
        (555, 300, 585, 600, (245, 158, 11, 240)),
    ]
    for x1, y1, x2, y2, color in bars:
        draw.rectangle([x1, y1, x2, y2], fill=color)

    # Trending line over bars
    trend_pts = [(435, 510), (480, 420), (525, 350), (570, 290), (620, 250)]
    for i in range(len(trend_pts) - 1):
        draw.line([trend_pts[i], trend_pts[i+1]], fill=(255, 255, 255, 255), width=5)

    # Arrow head
    draw.polygon([(620, 240), (635, 250), (615, 265)], fill=(255, 255, 255, 255))

    # Try to load high-res Arial or fallback
    try:
        font_large = ImageFont.truetype("arialbd.ttf", 68)
        font_sub = ImageFont.truetype("arial.ttf", 26)
        font_tiny = ImageFont.truetype("arialbd.ttf", 20)
    except:
        font_large = ImageFont.load_default()
        font_sub = font_large
        font_tiny = font_large

    # Brand text below shield
    draw.text((512, 770), "UWED FIS", fill=(255, 255, 255, 255), font=font_large, anchor="mm")
    draw.text((512, 825), "FINANCE & INVESTMENT SOCIETY", fill=(16, 185, 129, 255), font=font_sub, anchor="mm")
    draw.text((512, 865), "JIDU • EST. 2024", fill=(156, 163, 175, 220), font=font_tiny, anchor="mm")

    img.save(out_path, "PNG")
    print(f"Avatar saved to {out_path}")

def create_banner(out_path):
    w, h = 1200, 675
    img = Image.new("RGBA", (w, h), (10, 17, 40, 255))
    draw = ImageDraw.Draw(img)

    # Background geometric grid
    for x in range(0, w, 60):
        draw.line([(x, 0), (x, h)], fill=(255, 255, 255, 8), width=1)
    for y in range(0, h, 60):
        draw.line([(0, y), (w, y)], fill=(255, 255, 255, 8), width=1)

    # Subtle glowing curves
    draw.arc([100, -100, 1100, 800], 0, 360, fill=(16, 185, 129, 60), width=3)
    draw.arc([200, 0, 1000, 700], 0, 360, fill=(245, 158, 11, 40), width=2)

    try:
        font_title = ImageFont.truetype("arialbd.ttf", 64)
        font_sub = ImageFont.truetype("arialbd.ttf", 28)
        font_tag = ImageFont.truetype("arial.ttf", 22)
    except:
        font_title = ImageFont.load_default()
        font_sub = font_title
        font_tag = font_title

    # Header Tag
    draw.rounded_rectangle([420, 80, 780, 120], radius=12, fill=(16, 185, 129, 30), outline=(16, 185, 129, 120))
    draw.text((600, 100), "UNIVERSITY OF WORLD ECONOMY AND DIPLOMACY", fill=(52, 211, 153, 255), font=font_tag, anchor="mm")

    # Main Title
    draw.text((600, 220), "UWED FINANCE & INVESTMENT", fill=(255, 255, 255, 255), font=font_title, anchor="mm")
    draw.text((600, 290), "SOCIETY (FIS)", fill=(16, 185, 129, 255), font=font_title, anchor="mm")

    # Horizontal Rule
    draw.line([(450, 340), (750, 340)], fill=(245, 158, 11, 200), width=3)

    # Feature badges
    draw.text((600, 380), "Rasmiy Intellektual Bilimlar & Keyslar Boti", fill=(226, 232, 240, 255), font=font_sub, anchor="mm")
    draw.text((600, 430), "• 30+ Moliya Terminlari • Vertex Keyslari (PDF) • DCF Valuation • Bozor Tahlili", fill=(148, 163, 184, 255), font=font_tag, anchor="mm")

    # Bottom footer accent
    draw.rectangle([0, h - 8, w, h], fill=(16, 185, 129, 255))

    img.save(out_path, "PNG")
    print(f"Banner saved to {out_path}")

create_avatar(r"C:\Users\lenovo\Desktop\UWED_FIS_AVATAR.png")
create_banner(r"C:\Users\lenovo\Desktop\uwed-fis-bot\public\uwed_fis_banner.png")
