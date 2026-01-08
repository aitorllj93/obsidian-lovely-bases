# Lovely Bases

Beautiful, visual bases views for Obsidian. Transform your Obsidian Bases into stunning, interactive visual experiences with smooth animations and intuitive navigation.

## ✨ Features

- **Multiple Base Views**: Choose from a variety of beautiful, customizable views for your Obsidian Bases
- **Smooth Animations**: Powered by Motion (formerly Framer Motion) for fluid, performant animations
- **Obsidian Theme Integration**: Automatically adapts to your Obsidian theme colors
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Customizable**: Each view offers configuration options to suit your needs

## 📦 Installation

### From Obsidian

> **Note**: This plugin is not yet registered in the Obsidian Community Plugins repository. Please use BRAT or manual installation methods below.

1. Open Obsidian Settings
2. Go to **Community plugins**
3. Click **Browse** and search for "Lovely Bases"
4. Click **Install**
5. Enable the plugin in the **Installed plugins** section

### Using BRAT

[BRAT](https://github.com/TfTHacker/obsidian42-brat) (Beta Reviewer's Auto-update Tool) allows you to install and automatically update beta plugins directly from their GitHub repositories.

1. Install and enable the **BRAT** plugin from the Community plugins section
2. Open the Command Palette (`Ctrl/Cmd + P`)
3. Run the command: **BRAT: Add a beta plugin for testing**
4. Enter the repository URL: `aitorllj93/obsidian-lovely-bases`
5. Click **Add Plugin**
6. Go to Settings → Community plugins
7. Find **Lovely Bases** in the list and enable it

BRAT will automatically check for updates and notify you when new versions are available.

### Manual Installation

1. Download the latest release from the [Releases](https://github.com/aitorllj93/obsidian-linear-base/releases) page
2. Extract the files to your vault's `.obsidian/plugins/lovely-bases/` folder
3. Reload Obsidian
4. Enable the plugin in Settings → Community plugins

## 🚀 Usage

1. Open an Obsidian Base in your vault
2. Click on the **View options** button (three dots) in the Base
3. Select your preferred view from the view type dropdown
4. Configure the view settings as needed

## 🎨 Available Views

### Infinite Drag Scroll View

A beautiful, draggable grid interface for navigating through your notes' images with smooth animations and intuitive controls.

#### Features

- **Drag Navigation**: Click and drag to navigate through the grid
- **Wheel Scroll Support**: Use your mouse wheel or trackpad to scroll vertically
- **Multiple Layout Variants**: Choose from different visual styles:
  - **Default**: Clean, uniform grid layout
  - **Masonry**: Staggered layout with alternating heights
  - **Polaroid**: Photo album style with borders and subtle rotations
- **Customizable Image Properties**: Configure which property to use for displaying images (default: `note.cover`)
  - Supports both local file paths and external URLs
  - Local images are automatically resolved to their full paths

#### Configuration

- **Image property to display**: Specify which property contains the image URL (default: `note.cover`)

#### Navigation

- **Drag**: Click and drag to navigate through the grid
- **Scroll**: Use your mouse wheel or trackpad to scroll vertically
- **Click**: Click on any image to open its associated note

## 📋 Requirements

- Obsidian with Bases SDK support (latest version recommended, min 1.9)
- An Obsidian Base

## 🛠️ Development

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8.15.9 or higher)

### Setup

```bash
# Clone the repository
git clone https://github.com/aitorllj93/obsidian-linear-base.git
cd obsidian-linear-base

# Install dependencies
pnpm install

# Build the plugin
pnpm run build

# For development with hot reload
pnpm run dev
```

### Project Structure

```
obsidian-linear-base/
├── src/
│   ├── components/          # React components
│   │   ├── InfiniteDragScroll.tsx
│   │   └── InfiniteDragScrollView.tsx
│   ├── lib/                 # Utility functions
│   ├── main.tsx             # Plugin entry point
│   └── main.css             # Styles (Tailwind CSS)
├── build/                   # Compiled output
├── manifest.json            # Plugin manifest
└── package.json             # Dependencies
```

### Building

```bash
# Production build
pnpm run build

# Development build with watch mode
pnpm run dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Aitor Llamas Jiménez**

- GitHub: [@aitorllj93](https://github.com/aitorllj93)

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Animations powered by [Motion](https://motion.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)

---

Made with ❤️ for the Obsidian community
