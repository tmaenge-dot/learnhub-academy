#!/usr/bin/env python3
"""
Interactive stroke cropper using Python with GUI
This will help you manually select and crop each stroke from the reference pages
"""

import os
from pathlib import Path

try:
    from PIL import Image, ImageTk
    import tkinter as tk
    from tkinter import messagebox, filedialog
except ImportError:
    print("Installing required packages...")
    os.system("pip3 install pillow --break-system-packages 2>&1")
    print("\nPlease run the script again after installation.")
    exit(1)

class StrokeCropper:
    def __init__(self, root):
        self.root = root
        self.root.title("Pitman Stroke Cropper")
        self.root.geometry("1400x900")
        
        # Stroke list in order
        self.strokes = [
            'P', 'B', 'T', 'D', 'CH', 'J',  # Straight downstrokes
            'F', 'V', 'ITH', 'THE', 'S', 'Z', 'ISH', 'ZHEE',  # Curved
            'K', 'G',  # Horizontal
            'M', 'N', 'NG', 'L', 'R', 'W', 'Y', 'H'  # Upstrokes & special
        ]
        
        self.current_stroke_index = 0
        self.image_path = None
        self.image = None
        self.photo = None
        self.start_x = None
        self.start_y = None
        self.rect = None
        self.output_dir = Path(__file__).parent.parent / "assets/stroke-images/consonants"
        
        self.setup_ui()
        self.load_default_image()
    
    def setup_ui(self):
        # Top controls
        control_frame = tk.Frame(self.root, bg='#667eea', pady=10)
        control_frame.pack(fill='x')
        
        tk.Label(control_frame, text="Pitman Stroke Cropper", 
                font=('Arial', 16, 'bold'), bg='#667eea', fg='white').pack()
        
        # Buttons
        btn_frame = tk.Frame(self.root, pady=10)
        btn_frame.pack()
        
        tk.Button(btn_frame, text="Load Different Image", command=self.load_image,
                 bg='#667eea', fg='white', padx=10, pady=5).pack(side='left', padx=5)
        tk.Button(btn_frame, text="Previous Stroke", command=self.prev_stroke,
                 bg='#764ba2', fg='white', padx=10, pady=5).pack(side='left', padx=5)
        tk.Button(btn_frame, text="Next Stroke", command=self.next_stroke,
                 bg='#764ba2', fg='white', padx=10, pady=5).pack(side='left', padx=5)
        tk.Button(btn_frame, text="Save Crop", command=self.save_crop,
                 bg='#51cf66', fg='white', padx=10, pady=5, font=('Arial', 10, 'bold')).pack(side='left', padx=5)
        tk.Button(btn_frame, text="Clear Selection", command=self.clear_selection,
                 bg='#ff6b6b', fg='white', padx=10, pady=5).pack(side='left', padx=5)
        
        # Current stroke display
        self.stroke_label = tk.Label(self.root, text="", font=('Arial', 20, 'bold'), 
                                     bg='#f5f5f5', pady=10)
        self.stroke_label.pack(fill='x')
        
        # Instructions
        instructions = tk.Frame(self.root, bg='#fffbea', pady=5)
        instructions.pack(fill='x')
        tk.Label(instructions, text="📝 Click and drag to select stroke area | Use arrow keys or buttons to navigate | Press 'S' to save",
                font=('Arial', 10), bg='#fffbea').pack()
        
        # Canvas for image
        canvas_frame = tk.Frame(self.root)
        canvas_frame.pack(fill='both', expand=True, padx=10, pady=10)
        
        self.canvas = tk.Canvas(canvas_frame, bg='white', cursor='crosshair')
        self.canvas.pack(fill='both', expand=True)
        
        # Coordinates display
        self.coord_label = tk.Label(self.root, text="Coordinates: ", 
                                    font=('Courier', 10), bg='#f5f5f5', pady=5)
        self.coord_label.pack(fill='x')
        
        # Progress
        self.progress_label = tk.Label(self.root, text="", bg='#e3f2fd', pady=5)
        self.progress_label.pack(fill='x')
        
        # Bind events
        self.canvas.bind('<ButtonPress-1>', self.on_press)
        self.canvas.bind('<B1-Motion>', self.on_drag)
        self.canvas.bind('<ButtonRelease-1>', self.on_release)
        self.root.bind('<Left>', lambda e: self.prev_stroke())
        self.root.bind('<Right>', lambda e: self.next_stroke())
        self.root.bind('s', lambda e: self.save_crop())
        self.root.bind('S', lambda e: self.save_crop())
        
        self.update_stroke_display()
    
    def load_default_image(self):
        # Try to load page_9.png by default
        default_path = self.output_dir / "page_9.png"
        if default_path.exists():
            self.image_path = str(default_path)
            self.display_image()
    
    def load_image(self):
        path = filedialog.askopenfilename(
            initialdir=str(self.output_dir),
            title="Select Reference Page",
            filetypes=[("PNG files", "*.png"), ("All files", "*.*")]
        )
        if path:
            self.image_path = path
            self.display_image()
    
    def display_image(self):
        if not self.image_path:
            return
        
        self.image = Image.open(self.image_path)
        
        # Resize to fit canvas while maintaining aspect ratio
        self.root.update()  # Update to get actual canvas size
        canvas_width = max(self.canvas.winfo_width(), 1200)
        canvas_height = max(self.canvas.winfo_height(), 600)
        
        img_ratio = self.image.width / self.image.height
        canvas_ratio = canvas_width / canvas_height
        
        if img_ratio > canvas_ratio:
            new_width = canvas_width
            new_height = int(canvas_width / img_ratio)
        else:
            new_height = canvas_height
            new_width = int(canvas_height * img_ratio)
        
        self.display_img = self.image.resize((new_width, new_height), Image.Resampling.LANCZOS)
        self.photo = ImageTk.PhotoImage(self.display_img)
        
        self.canvas.delete('all')
        self.canvas.create_image(0, 0, anchor='nw', image=self.photo)
        self.canvas.config(scrollregion=self.canvas.bbox('all'))
    
    def on_press(self, event):
        self.start_x = event.x
        self.start_y = event.y
        if self.rect:
            self.canvas.delete(self.rect)
        self.rect = self.canvas.create_rectangle(
            self.start_x, self.start_y, self.start_x, self.start_y,
            outline='#667eea', width=3
        )
    
    def on_drag(self, event):
        if self.rect:
            self.canvas.coords(self.rect, self.start_x, self.start_y, event.x, event.y)
            self.coord_label.config(
                text=f"Coordinates: ({self.start_x}, {self.start_y}) to ({event.x}, {event.y}) | "
                     f"Size: {abs(event.x - self.start_x)}x{abs(event.y - self.start_y)}"
            )
    
    def on_release(self, event):
        self.end_x = event.x
        self.end_y = event.y
    
    def clear_selection(self):
        if self.rect:
            self.canvas.delete(self.rect)
            self.rect = None
        self.coord_label.config(text="Coordinates: ")
    
    def save_crop(self):
        if not hasattr(self, 'end_x') or not self.image:
            messagebox.showwarning("No Selection", "Please select an area first!")
            return
        
        # Calculate actual coordinates on original image
        scale_x = self.image.width / self.display_img.width
        scale_y = self.image.height / self.display_img.height
        
        x1 = int(min(self.start_x, self.end_x) * scale_x)
        y1 = int(min(self.start_y, self.end_y) * scale_y)
        x2 = int(max(self.start_x, self.end_x) * scale_x)
        y2 = int(max(self.start_y, self.end_y) * scale_y)
        
        # Crop from original image
        cropped = self.image.crop((x1, y1, x2, y2))
        
        # Save
        stroke_name = self.strokes[self.current_stroke_index]
        output_path = self.output_dir / f"{stroke_name}.png"
        cropped.save(output_path)
        
        messagebox.showinfo("Saved!", f"Saved {stroke_name}.png\n({cropped.width}x{cropped.height})")
        
        # Auto-advance to next stroke
        self.next_stroke()
    
    def update_stroke_display(self):
        stroke = self.strokes[self.current_stroke_index]
        self.stroke_label.config(
            text=f"Current Stroke: {stroke} ({self.current_stroke_index + 1}/{len(self.strokes)})"
        )
        
        # Check which strokes are done
        done = sum(1 for s in self.strokes if (self.output_dir / f"{s}.png").exists())
        self.progress_label.config(
            text=f"Progress: {done}/{len(self.strokes)} strokes cropped ({'✓ ' if done == len(self.strokes) else ''})"
        )
        
        # Clear previous selection
        self.clear_selection()
    
    def next_stroke(self):
        self.current_stroke_index = (self.current_stroke_index + 1) % len(self.strokes)
        self.update_stroke_display()
    
    def prev_stroke(self):
        self.current_stroke_index = (self.current_stroke_index - 1) % len(self.strokes)
        self.update_stroke_display()

if __name__ == "__main__":
    root = tk.Tk()
    app = StrokeCropper(root)
    root.mainloop()
