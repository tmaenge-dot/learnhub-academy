#!/usr/bin/env python3
"""
Professional Stroke Cropper - GUI tool to crop individual strokes from PDF pages
This will extract the smooth, professional strokes from the reference book
"""

import tkinter as tk
from tkinter import ttk, messagebox
from PIL import Image, ImageTk
import json
from pathlib import Path

class ProfessionalStrokeCropper:
    def __init__(self, root):
        self.root = root
        self.root.title("Professional Stroke Cropper - Extract Book-Quality Strokes")
        self.root.geometry("1400x900")
        
        # Directories
        self.input_dir = Path("/home/oem/Desktop/shorthand-simplified/assets/stroke-images/professional")
        self.output_dir = Path("/home/oem/Desktop/shorthand-simplified/assets/stroke-images/book-quality")
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # State
        self.current_image_path = None
        self.original_image = None
        self.display_image = None
        self.scale_factor = 1.0
        self.crop_start = None
        self.crop_rect = None
        self.saved_crops = []
        
        # Get all PNG files
        self.image_files = sorted(self.input_dir.glob("*.png"))
        self.current_index = 0
        
        self.setup_ui()
        if self.image_files:
            self.load_image(0)
    
    def setup_ui(self):
        # Top controls
        control_frame = ttk.Frame(self.root, padding="10")
        control_frame.pack(side=tk.TOP, fill=tk.X)
        
        # Image navigation
        ttk.Label(control_frame, text="📄 Source Page:").pack(side=tk.LEFT, padx=5)
        self.prev_btn = ttk.Button(control_frame, text="← Previous", command=self.prev_image)
        self.prev_btn.pack(side=tk.LEFT, padx=2)
        
        self.image_label = ttk.Label(control_frame, text="", font=('Arial', 10, 'bold'))
        self.image_label.pack(side=tk.LEFT, padx=10)
        
        self.next_btn = ttk.Button(control_frame, text="Next →", command=self.next_image)
        self.next_btn.pack(side=tk.LEFT, padx=2)
        
        # Separator
        ttk.Separator(control_frame, orient=tk.VERTICAL).pack(side=tk.LEFT, padx=10, fill=tk.Y)
        
        # Stroke naming
        ttk.Label(control_frame, text="✏️  Stroke Name:").pack(side=tk.LEFT, padx=5)
        self.stroke_name_var = tk.StringVar()
        self.stroke_entry = ttk.Entry(control_frame, textvariable=self.stroke_name_var, width=15)
        self.stroke_entry.pack(side=tk.LEFT, padx=5)
        
        # Quick names
        quick_names = ["P", "B", "T", "D", "CH", "J", "F", "V", "TH", "S", "Z", "SH", "K", "G", 
                      "M", "N", "NG", "L", "R", "W", "Y", "H"]
        self.quick_combo = ttk.Combobox(control_frame, values=quick_names, width=8)
        self.quick_combo.pack(side=tk.LEFT, padx=5)
        self.quick_combo.bind('<<ComboboxSelected>>', lambda e: self.stroke_name_var.set(self.quick_combo.get()))
        
        # Save button
        self.save_btn = ttk.Button(control_frame, text="💾 Save Cropped Stroke", 
                                   command=self.save_crop, state=tk.DISABLED)
        self.save_btn.pack(side=tk.LEFT, padx=10)
        
        # Stats
        self.stats_label = ttk.Label(control_frame, text="📊 Saved: 0", font=('Arial', 10))
        self.stats_label.pack(side=tk.RIGHT, padx=10)
        
        # Canvas frame
        canvas_frame = ttk.Frame(self.root)
        canvas_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # Canvas with scrollbars
        self.canvas = tk.Canvas(canvas_frame, bg='#f0f0f0', cursor='cross')
        h_scroll = ttk.Scrollbar(canvas_frame, orient=tk.HORIZONTAL, command=self.canvas.xview)
        v_scroll = ttk.Scrollbar(canvas_frame, orient=tk.VERTICAL, command=self.canvas.yview)
        
        self.canvas.configure(xscrollcommand=h_scroll.set, yscrollcommand=v_scroll.set)
        
        v_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        h_scroll.pack(side=tk.BOTTOM, fill=tk.X)
        self.canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        # Bind mouse events for cropping
        self.canvas.bind("<ButtonPress-1>", self.on_press)
        self.canvas.bind("<B1-Motion>", self.on_drag)
        self.canvas.bind("<ButtonRelease-1>", self.on_release)
        
        # Right sidebar
        sidebar = ttk.Frame(self.root, padding="10")
        sidebar.pack(side=tk.RIGHT, fill=tk.Y)
        
        ttk.Label(sidebar, text="📋 Instructions", font=('Arial', 12, 'bold')).pack(pady=10)
        
        instructions = """
1. Select a source page
        
2. Click and drag to select
   a stroke region
   
3. Enter stroke name
   (e.g., P, B, T, etc.)
   
4. Click Save to extract
   
5. Repeat for all strokes
   
✨ Professional strokes will
   be saved to book-quality
   folder
        """
        ttk.Label(sidebar, text=instructions, justify=tk.LEFT, wraplength=200).pack(pady=10)
        
        # Preview of saved crops
        ttk.Label(sidebar, text="Recent Crops:", font=('Arial', 10, 'bold')).pack(pady=5)
        self.recent_list = tk.Listbox(sidebar, height=15, width=25)
        self.recent_list.pack(pady=5, fill=tk.BOTH, expand=True)
        
        # Clear current crop
        ttk.Button(sidebar, text="Clear Selection", command=self.clear_crop).pack(pady=5)
        
    def load_image(self, index):
        if 0 <= index < len(self.image_files):
            self.current_index = index
            self.current_image_path = self.image_files[index]
            self.original_image = Image.open(self.current_image_path)
            
            # Scale to fit canvas
            canvas_width = self.canvas.winfo_width() or 800
            canvas_height = self.canvas.winfo_height() or 600
            
            img_width, img_height = self.original_image.size
            scale_x = canvas_width / img_width
            scale_y = canvas_height / img_height
            self.scale_factor = min(scale_x, scale_y, 1.0)
            
            new_width = int(img_width * self.scale_factor)
            new_height = int(img_height * self.scale_factor)
            
            self.display_image = self.original_image.resize((new_width, new_height), Image.Resampling.LANCZOS)
            self.photo = ImageTk.PhotoImage(self.display_image)
            
            self.canvas.delete("all")
            self.canvas.create_image(0, 0, anchor=tk.NW, image=self.photo)
            self.canvas.configure(scrollregion=self.canvas.bbox(tk.ALL))
            
            self.image_label.config(text=f"{self.current_image_path.name} ({index+1}/{len(self.image_files)})")
            self.clear_crop()
    
    def prev_image(self):
        if self.current_index > 0:
            self.load_image(self.current_index - 1)
    
    def next_image(self):
        if self.current_index < len(self.image_files) - 1:
            self.load_image(self.current_index + 1)
    
    def on_press(self, event):
        self.crop_start = (self.canvas.canvasx(event.x), self.canvas.canvasy(event.y))
        if self.crop_rect:
            self.canvas.delete(self.crop_rect)
    
    def on_drag(self, event):
        if self.crop_start:
            if self.crop_rect:
                self.canvas.delete(self.crop_rect)
            
            cur_x, cur_y = self.canvas.canvasx(event.x), self.canvas.canvasy(event.y)
            self.crop_rect = self.canvas.create_rectangle(
                self.crop_start[0], self.crop_start[1], cur_x, cur_y,
                outline='red', width=2, dash=(5, 5)
            )
    
    def on_release(self, event):
        if self.crop_start:
            cur_x, cur_y = self.canvas.canvasx(event.x), self.canvas.canvasy(event.y)
            x1, y1 = self.crop_start
            x2, y2 = cur_x, cur_y
            
            # Ensure x1 < x2 and y1 < y2
            self.crop_coords = (min(x1, x2), min(y1, y2), max(x1, x2), max(y1, y2))
            self.save_btn.config(state=tk.NORMAL)
    
    def save_crop(self):
        if not hasattr(self, 'crop_coords'):
            return
        
        stroke_name = self.stroke_name_var.get().strip()
        if not stroke_name:
            messagebox.showwarning("No Name", "Please enter a stroke name!")
            return
        
        # Convert display coordinates to original image coordinates
        x1, y1, x2, y2 = self.crop_coords
        orig_x1 = int(x1 / self.scale_factor)
        orig_y1 = int(y1 / self.scale_factor)
        orig_x2 = int(x2 / self.scale_factor)
        orig_y2 = int(y2 / self.scale_factor)
        
        # Crop from original image
        cropped = self.original_image.crop((orig_x1, orig_y1, orig_x2, orig_y2))
        
        # Save
        output_path = self.output_dir / f"{stroke_name}.png"
        cropped.save(output_path, 'PNG')
        
        self.saved_crops.append(stroke_name)
        self.recent_list.insert(0, f"✅ {stroke_name}")
        self.stats_label.config(text=f"📊 Saved: {len(self.saved_crops)}")
        
        print(f"✅ Saved: {output_path}")
        
        # Clear for next crop
        self.clear_crop()
        self.stroke_name_var.set("")
    
    def clear_crop(self):
        if self.crop_rect:
            self.canvas.delete(self.crop_rect)
        self.crop_rect = None
        self.crop_start = None
        self.save_btn.config(state=tk.DISABLED)

if __name__ == "__main__":
    root = tk.Tk()
    app = ProfessionalStrokeCropper(root)
    root.mainloop()
