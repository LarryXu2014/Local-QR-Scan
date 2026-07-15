[README.md](https://github.com/user-attachments/files/30064131/README.md)
QR Scan & Open

A lightweight Chrome extension for scanning QR codes from images or the current page and opening decoded links quickly.

This repository is **Chrome extension only**. It contains only the files needed to upload the Chrome extension source to GitHub.

## Table of Contents

- [Download](#download)
- [Features](#features)
- [Installation](#installation)
- [How It Works](#how-it-works)
- [Chrome Support](#chrome-support)
- [File Structure](#file-structure)
- [Packaging for GitHub](#packaging-for-github)
- [Tech Stack](#tech-stack)
- [Privacy](#privacy)

## Download

### Chrome Extension

If you are using this from GitHub, download this repository or the ZIP file.

Then install it in Chrome using Developer Mode.

## Features

- Scan QR codes directly in Chrome.
- Right-click a QR image to scan it.
- Use the keyboard shortcut to scan a selected screen area.
- Decode QR codes locally in the browser.
- Open decoded URLs quickly.
- Uses Chrome Manifest V3.
- Includes popup UI, background script, icons, and the `jsQR` decoder.
- No server or build step required.

## Installation

1. Download or clone this repository.
2. If you downloaded the ZIP, unzip it first.
3. Open Chrome and go to:
   chrome://extensions/

4. Turn on **Developer mode** in the top-right corner.
5. Click **Load unpacked**.
6. Select the folder that is unzipped from the ZIP.
7. Pin **QR Scan & Open** from the Chrome extensions menu if you want quick access.

> Chrome cannot load this source ZIP directly through **Load unpacked**. Unzip it first, then select the unzipped folder.

## How It Works

1. The extension runs locally inside Chrome.
2. QR image data is passed to the local decoder.
3. `jsQR.js` reads the QR code from image pixels.
4. If the decoded result is a URL, the extension can open it in a browser tab.
5. No decoded QR content is sent to a server by this project.
6. press command/control + shit + Y for screen capture for the QR.
## Chrome Support

| Platform | Status |
| --- | --- |
| Google Chrome | Supported |
| Chrome Manifest V3 | Supported |

## File Structure

```text
qr-scan-open-chrome-github/
├── README.md
├── manifest.json
├── background.js
├── popup.html
├── popup.css
├── popup.js
├── jsQR.js
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

## Packaging for GitHub

There is no build step required. This is a static Chrome extension.

To create a release ZIP from inside the extension folder:

```bash
zip -r qr-scan-open-chrome-extension.zip manifest.json background.js popup.html popup.css popup.js jsQR.js icons README.md
```

For a normal GitHub repo upload, you can also upload the files directly instead of uploading a ZIP.

## Tech Stack

- **Extension format:** Chrome Manifest V3
- **QR decoding:** `jsQR.js`
- **UI:** HTML, CSS, JavaScript
- **Build:** No build step required

## Privacy

QR decoding happens locally in Chrome. This project does not require a server and does not intentionally upload decoded QR content anywhere.Privacy Policy
QR Scan & Open is designed to decode QR codes locally in Chrome.

Data collection
This extension does not intentionally collect, sell, or share personal data.

QR code content
QR decoding happens locally in the browser using the included JavaScript decoder. Decoded QR text is not sent to a project-owned server.

Permissions
The extension uses Chrome extension permissions required for QR scanning actions, such as reading selected image data or opening decoded links in a tab.

Third parties
This project does not include analytics or advertising scripts on this GitHub Pages site.

Contact
For support, open an issue in the GitHub repository.

