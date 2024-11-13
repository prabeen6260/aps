import ultralytics

model = ultralytics.YOLO('yolov8n.yaml') 

# replace with your path
model.train(data='/Users/sathya/Documents/speaky/handsspeak.v2i.yolov8/data.yaml', epochs=100, imgsz=640, device='cpu', project='/Users/sumitbahadur/Mhacks 2024/speaky-mhacks2024/handsspeak.v2i.yolov8')
