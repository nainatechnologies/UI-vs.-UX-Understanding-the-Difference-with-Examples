# UI vs. UX: Understanding the Difference with Examples
### Built with the BrandX Blogger Template Design System

This project contains the complete blog post **"UI vs. UX: Understanding the Difference with Examples"** styled using the layout, typography, colors, and responsive conventions of the **BrandX Blogger Template** (designed by Templatezy, featured on BTemplates).

---

## 📁 Project Structure

```text
blog 5/
├── index.html                   # Complete standalone responsive web app replicating BrandX
├── style.css                    # BrandX CSS design system, typography, colors & responsive grid
├── script.js                    # Interactive features (Progress bar, Quiz, ScrollSpy, Comments)
├── blogger-post-content.html     # Pre-formatted HTML snippet ready to paste into Blogger Post editor
├── README.md                    # Project documentation & instructions
└── images/
    ├── logo.png                 # Official Naina Technologies Logo
    ├── ui-vs-ux-hero.jpg        # High-res 3D infographic comparing UI vs UX
    ├── ui-ux-iceberg.jpg        # The famous Iceberg Analogy diagram
    └── ui-ux-examples.jpg       # SwiftRide mobile app case study (UI buttons vs UX timeline)
```

---

## 🚀 How to Preview Locally

You can launch a simple local HTTP server with Python or Node.js:

```bash
# Using Python
python -m http.server 8080

# Or using npx
npx serve .
```

Then open your browser at `http://localhost:8080` to experience the full interactive BrandX template.

---

## 📝 How to Use in Google Blogger (Blogspot)

If you are running the **BrandX template** on your Blogger blog:

1. Open your [Blogger Dashboard](https://www.blogger.com).
2. Click **New Post**.
3. In the post editor toolbar, toggle the left button from **Compose view** to **HTML view** (`<>`).
4. Open `blogger-post-content.html` in this folder, copy all contents, and paste them into the editor.
5. Set the Post Title to:
   ```text
   UI vs. UX: Understanding the Difference with Examples
   ```
6. In the right panel, add Labels: `UI Design`, `UX Research`, `Design Systems`, `Case Studies`.
7. Upload the three images in the `images/` directory to your post using Blogger's image uploader, or link them.
8. Click **Publish**!

---

## 🎨 BrandX Design System Highlights

- **Slate & Charcoal Primary Palette**: `#434a54` header, banners, and primary structural accents.
- **BrandX Accent Orange**: `#dd5d24` for callouts, tag badges, and interactive highlights.
- **Typography**: Google Fonts *Raleway* (Headings) and *Lato* (Body text).
- **Post Headings**: Signature BrandX left-border indicator (`border-left: 10px solid #434a54; background: #f0f2f5;`).
- **Interactive Widgets**:
  - Live Reading Progress Bar.
  - Interactive "Is this UI or UX?" Self-Test Quiz with immediate feedback.
  - Social Share Buttons (Facebook, Twitter/X, LinkedIn, WhatsApp, Copy Link).
  - Sticky Table of Contents with ScrollSpy tracking.
  - Working comment submission simulation.
  - Quick-export modal for Blogger HTML and Markdown.
