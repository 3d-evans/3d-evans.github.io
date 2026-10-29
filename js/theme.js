/* ==========================================================================
   theme.js — Blender / Maya / Unreal theme switcher
   --------------------------------------------------------------------------
   - Colours for each theme live in css/styles.css  →  [data-theme="..."]
   - This file swaps the attribute, remembers the choice, and changes the
     little viewport HUD texts so each theme feels like its software.
   ========================================================================== */

(() => {
  "use strict";

  const THEMES = {
    blender: {
      hud: { tl: "User Perspective · (1) Collection | Daniel", br: "Objects 1/1 | Verts 8 | Faces 6" },
      themeColor: "#2a2a2a",
    },
    maya: {
      hud: { tl: "persp · Shading · Lighting · Show", br: "Verts: 8   Edges: 12   Faces: 6" },
      themeColor: "#3c3c3c",
    },
    unreal: {
      hud: { tl: "Perspective · Lit · Show", br: "120.00 FPS · 8.33 ms" },
      themeColor: "#151515",
    },
  };
  const DEFAULT = "blender";

  const root = document.documentElement;
  const select = document.querySelector("[data-theme-select]");
  const metaColor = document.querySelector('meta[name="theme-color"]');

  const apply = (name) => {
    if (!THEMES[name]) name = DEFAULT;
    const theme = THEMES[name];

    root.dataset.theme = name;
    if (select) select.value = name;
    if (metaColor) metaColor.setAttribute("content", theme.themeColor);

    document.querySelectorAll("[data-hud]").forEach((el) => {
      const text = theme.hud[el.dataset.hud];
      if (text) el.textContent = text;
    });

    try { localStorage.setItem("theme", name); } catch (e) {}
  };

  apply(root.dataset.theme || DEFAULT);

  if (select) select.addEventListener("change", () => apply(select.value));
})();
