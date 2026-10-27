import React, { useEffect, useState } from "react";

const STORAGE_KEY = "mentorMenteeFontSize";
const VALID_SIZES = ["small", "medium", "large"];
const SCALE = { small: 0.875, medium: 1, large: 1.125 };
const normalizeSize = (value) => VALID_SIZES.includes(value) ? value : "medium";

function getSavedSize() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return normalizeSize(saved);
  } catch {
    return "medium";
  }
}

/*
 * Scale computed typography per element instead of changing the root font size.
 * This also covers Tailwind arbitrary pixel utilities (e.g. text-[13px]) and
 * inline fontSize values. Layout dimensions, padding, gaps and card widths are
 * not scaled by this helper.
 */
function applyTypographyScale(size, root = document) {
  const scale = SCALE[normalizeSize(size)];
  const elements = Array.from(root.querySelectorAll("*"));

  // Capture each element's original computed font size before applying updates.
  for (const element of elements) {
    if (!element.hasAttribute("data-mm-font-base")) {
      const computed = window.getComputedStyle(element).fontSize;
      const pixels = Number.parseFloat(computed);
      if (Number.isFinite(pixels)) {
        element.setAttribute("data-mm-font-base", String(pixels));
      }
    }
  }

  for (const element of elements) {
    const base = Number.parseFloat(element.getAttribute("data-mm-font-base"));
    if (Number.isFinite(base)) {
      element.style.setProperty("font-size", `${base * scale}px`, "important");
    }
  }
}

const applyFontSize = (value) => {
  const size = normalizeSize(value);
  document.documentElement.dataset.fontSize = size;
  try { localStorage.setItem(STORAGE_KEY, size); } catch { /* Storage may be unavailable. */ }
  applyTypographyScale(size);
};

export default function FontSizeSettings({ compact = false, initializerOnly = false }) {
  const [fontSize, setFontSize] = useState(getSavedSize);

  useEffect(() => {
    const initial = getSavedSize();
    document.documentElement.dataset.fontSize = initial;
    applyTypographyScale(initial);

    // Apply the selected typography to content rendered later by React/routes.
    const observer = new MutationObserver((mutations) => {
      const added = [];
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            added.push(node);
          }
        }
      }
      if (added.length) {
        const scale = SCALE[getSavedSize()];
        for (const node of added) {
          const elements = [node, ...node.querySelectorAll("*")];
          for (const element of elements) {
            if (!element.hasAttribute("data-mm-font-base")) {
              const computed = window.getComputedStyle(element).fontSize;
              const pixels = Number.parseFloat(computed);
              if (Number.isFinite(pixels)) {
                element.setAttribute("data-mm-font-base", String(pixels));
              }
            }
            const base = Number.parseFloat(element.getAttribute("data-mm-font-base"));
            if (Number.isFinite(base)) {
              element.style.setProperty("font-size", `${base * scale}px`, "important");
            }
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const syncSize = (event) => {
      const next = event?.detail?.fontSize;
      if (next && VALID_SIZES.includes(next)) setFontSize(next);
    };
    window.addEventListener("mentor-mentee-font-size-change", syncSize);
    return () => {
      observer.disconnect();
      window.removeEventListener("mentor-mentee-font-size-change", syncSize);
    };
  }, []);

  const handleChange = (event) => {
    const next = normalizeSize(event.target.value);
    applyFontSize(next);
    setFontSize(next);
    window.dispatchEvent(new CustomEvent("mentor-mentee-font-size-change", { detail: { fontSize: next } }));
  };

  if (initializerOnly) return null;

  return (
    <label className={`inline-flex items-center gap-2 ${compact ? "" : "rounded-xl border border-slate-200 bg-white px-4 py-3"}`}>
      {!compact && <span className="text-sm font-medium text-slate-700">Font size</span>}
      <select
        aria-label="Application font size"
        title="Change application font size"
        value={fontSize}
        onChange={handleChange}
        className={`rounded-lg border border-slate-200 bg-white text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${compact ? "h-9 max-w-[105px] px-2 text-xs sm:max-w-[120px] sm:text-sm" : "h-10 px-3 text-sm"}`}
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </label>
  );
}
