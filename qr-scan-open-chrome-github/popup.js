// ============================================================
// QR Scan & Open - Popup Script
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Show the correct shortcut key for the platform
  const isMac = navigator.platform.toLowerCase().includes("mac");
  const shortcutEl = document.getElementById("shortcut-key");
  if (shortcutEl) {
    shortcutEl.textContent = isMac ? "\u2318+Shift+Y" : "Ctrl+Shift+Y";
  }

  loadHistory();
  document.getElementById("clear-btn").addEventListener("click", clearHistory);

  // Scan button — triggers screen capture and QR scan from the popup
  const scanBtn = document.getElementById("scan-btn");
  if (scanBtn) {
    scanBtn.addEventListener("click", () => {
      scanBtn.disabled = true;
      scanBtn.textContent = "Scanning...";
      chrome.runtime.sendMessage({ action: "showOverlay" }, () => {
        // The popup will close after sending; restore state just in case
        setTimeout(() => {
          scanBtn.disabled = false;
          scanBtn.textContent = "Select Area to Scan";
        }, 3000);
      });
      // Close popup so the background can capture the tab
      setTimeout(() => window.close(), 200);
    });
  }
});

async function loadHistory() {
  chrome.runtime.sendMessage({ action: "getHistory" }, (history) => {
    renderHistory(history || []);
  });
}

function renderHistory(history) {
  const list = document.getElementById("history-list");

  if (!history.length) {
    list.innerHTML =
      '<p class="empty-state">No scans yet. Right-click a QR code image on any webpage to get started.</p>';
    return;
  }

  list.innerHTML = history
    .map((item) => {
      const typeLabel = {
        url: "URL",
        text: "Text",
        error: "Error",
        "no-qr": "No QR",
      }[item.type] || "Unknown";

      const displayData = item.error
        ? item.error
        : item.data
        ? item.data.length > 120
          ? item.data.slice(0, 120) + "\u2026"
          : item.data
        : "No data";

      const time = formatTime(item.timestamp);

      return `
        <div class="history-item" data-url="${item.type === "url" ? escapeAttr(item.data) : ""}">
          <span class="item-type ${item.type}">${typeLabel}</span>
          <div class="item-data">${escapeHtml(displayData)}</div>
          <div class="item-time">${time}</div>
        </div>
      `;
    })
    .join("");

  // Click to open URL items
  list.querySelectorAll(".history-item").forEach((el) => {
    const url = el.getAttribute("data-url");
    if (url) {
      el.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "openUrl", url });
      });
    }
  });
}

function clearHistory() {
  chrome.runtime.sendMessage({ action: "clearHistory" }, () => {
    renderHistory([]);
  });
}

// ---- Helpers ----

function formatTime(ts) {
  const date = new Date(ts);
  const now = new Date();
  const diff = now - date;

  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return date.toLocaleDateString();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function escapeAttr(text) {
  return text ? text.replace(/"/g, "&quot;") : "";
}
