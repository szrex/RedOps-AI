import customtkinter as ctk
from PIL import Image
import subprocess
import threading
import webbrowser
import os
import time
import sys

# -------------------------
# CONFIG
# -------------------------

PROJECT_ROOT = r"X:\RedOps-AI"
FRONTEND_DIR = os.path.join(PROJECT_ROOT, "frontend")

BACKEND_CMD = [
    "python",
    "-m",
    "uvicorn",
    "backend.main:app",
    "--app-dir",
    "src"
]

FRONTEND_CMD = ["npm", "run", "dev"]

LOGO_PATH = os.path.join(os.path.dirname(__file__), "logo.png")

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("dark-blue")


class RedOpsLauncher(ctk.CTk):

    def __init__(self):
        super().__init__()

        self.withdraw()  # Hide main window initially

        self.backend_process = None
        self.frontend_process = None

        self.create_splash()

        self.after(2000, self.show_main_window)

    # -------------------------
    # Splash Screen
    # -------------------------
    def create_splash(self):
        self.splash = ctk.CTkToplevel(self)
        self.splash.geometry("400x220")
        self.splash.overrideredirect(True)

        screen_width = self.winfo_screenwidth()
        screen_height = self.winfo_screenheight()

        x = (screen_width // 2) - 200
        y = (screen_height // 2) - 110

        self.splash.geometry(f"+{x}+{y}")

        frame = ctk.CTkFrame(self.splash, corner_radius=15)
        frame.pack(expand=True, fill="both", padx=10, pady=10)

        label = ctk.CTkLabel(
            frame,
            text="RedOps AI",
            font=("Segoe UI", 28, "bold")
        )
        label.pack(expand=True)

    # -------------------------
    # Show Main Window
    # -------------------------
    def show_main_window(self):
        self.splash.destroy()

        self.deiconify()

        self.title("RedOps AI Launcher")
        self.geometry("560x420")
        self.resizable(False, False)

        self.build_ui()

        self.protocol("WM_DELETE_WINDOW", self.on_close)

    # -------------------------
    # UI
    # -------------------------
    def build_ui(self):

        self.main_frame = ctk.CTkFrame(self, corner_radius=15)
        self.main_frame.pack(padx=20, pady=20, fill="both", expand=True)

        if os.path.exists(LOGO_PATH):
            image = ctk.CTkImage(Image.open(LOGO_PATH), size=(260, 80))
            logo_label = ctk.CTkLabel(self.main_frame, image=image, text="")
            logo_label.pack(pady=(30, 10))

        title = ctk.CTkLabel(
            self.main_frame,
            text="RedOps AI",
            font=("Segoe UI", 30, "bold")
        )
        title.pack(pady=(5, 5))

        subtitle = ctk.CTkLabel(
            self.main_frame,
            text="AI-Driven Penetration Testing Framework",
            font=("Segoe UI", 12),
            text_color="gray"
        )
        subtitle.pack(pady=(0, 30))

        self.start_btn = ctk.CTkButton(
            self.main_frame,
            text="Start Framework",
            corner_radius=20,
            height=50,
            font=("Segoe UI", 14, "bold"),
            fg_color="#dc2626",
            hover_color="#b91c1c",
            command=self.start_framework
        )
        self.start_btn.pack(pady=15, ipadx=30)

        self.clear_btn = ctk.CTkButton(
            self.main_frame,
            text="Clear Caches",
            corner_radius=20,
            height=50,
            font=("Segoe UI", 14, "bold"),
            fg_color="#374151",
            hover_color="#4b5563",
            command=self.clear_cache
        )
        self.clear_btn.pack(pady=10, ipadx=30)

        self.status_label = ctk.CTkLabel(
            self.main_frame,
            text="System Ready",
            text_color="#22c55e",
            font=("Segoe UI", 11)
        )
        self.status_label.pack(pady=25)

    # -------------------------
    # Start Framework
    # -------------------------
    def start_framework(self):
        self.start_btn.configure(state="disabled", text="Starting...")
        self.status_label.configure(text="Booting Backend & Frontend...", text_color="orange")

        threading.Thread(target=self._run_servers, daemon=True).start()

    def _run_servers(self):
        try:
            creation_flags = subprocess.CREATE_NO_WINDOW

            self.backend_process = subprocess.Popen(
                BACKEND_CMD,
                cwd=PROJECT_ROOT,
                creationflags=creation_flags
            )

            self.frontend_process = subprocess.Popen(
                FRONTEND_CMD,
                cwd=FRONTEND_DIR,
                creationflags=creation_flags
            )

            time.sleep(5)

            webbrowser.open("http://localhost:5173/")

            self.status_label.configure(text="Framework Running", text_color="#22c55e")
            self.start_btn.configure(text="Framework Running")

        except Exception as e:
            self.status_label.configure(text="Startup Failed", text_color="red")
            print(e)

    # -------------------------
    # Clear Cache
    # -------------------------
    def clear_cache(self):
        try:
            subprocess.Popen(
                ["python", "clean_cache.py"],
                cwd=PROJECT_ROOT,
                creationflags=subprocess.CREATE_NO_WINDOW
            )

            self.status_label.configure(text="Cache Cleared", text_color="#10b981")

        except Exception as e:
            print(e)

    # -------------------------
    # Clean Shutdown
    # -------------------------
    def on_close(self):

        if self.backend_process:
            self.backend_process.terminate()

        if self.frontend_process:
            self.frontend_process.terminate()

        self.destroy()
        sys.exit()


if __name__ == "__main__":
    app = RedOpsLauncher()
    app.mainloop()
