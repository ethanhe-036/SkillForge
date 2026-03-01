"""Export each slide of a PPTX to JPG using PowerPoint COM automation."""
import os, sys, time
import comtypes.client

pptx_path = os.path.abspath(sys.argv[1])
out_dir = os.path.join(os.path.dirname(pptx_path), "slide_images")
os.makedirs(out_dir, exist_ok=True)

powerpoint = comtypes.client.CreateObject("PowerPoint.Application")
powerpoint.Visible = 1

presentation = powerpoint.Presentations.Open(pptx_path, WithWindow=False)
time.sleep(2)

for i, slide in enumerate(presentation.Slides, 1):
    img_path = os.path.join(out_dir, f"slide-{i:02d}.jpg")
    slide.Export(img_path, "JPG", 1280, 720)
    print(f"Exported: {img_path}")

presentation.Close()
powerpoint.Quit()
print("Done!")
