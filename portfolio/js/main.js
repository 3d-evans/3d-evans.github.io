/* ==========================================================================
   main.js — small, dependency-free enhancements
   1. Current year
   2. Placeholders for missing photo / reel
   3. Reel play overlay
   4. Timeline scrubber (scroll → frame counter + keyframes)
   5. Active nav link
   6. Copy-email button
   7. Reveal on scroll
   ========================================================================== */

(() => {
  "use strict";

  // Timeline length: 240 frames = 10 seconds at 24 fps. Change freely.
  const TOTAL_FRAMES = 240;

  /* 1. Year ---------------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });


  /* 2a. Missing image → show "missing texture" placeholder ---------------- */
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    const markMissing = () => img.classList.add("is-missing");
    if (img.complete && img.naturalWidth === 0) markMissing();
    img.addEventListener("error", markMissing);
  });


  /* 2b + 3. Reel video ----------------------------------------------------- */
  const video = document.querySelector("[data-reel]");
  const playBtn = document.querySelector("[data-reel-play]");
  const player = document.querySelector(".player");

  if (video && player) {
    const sources = video.querySelectorAll("source");
    const lastSource = sources[sources.length - 1];

    const markMissing = () => {
      video.classList.add("is-missing");
      player.classList.add("is-missing");
    };

    // NETWORK_NO_SOURCE (3) = every <source> failed
    if (video.networkState === 3) markMissing();
    if (lastSource) lastSource.addEventListener("error", markMissing);
    video.addEventListener("error", markMissing);

    video.addEventListener("play", () => player.classList.add("is-playing"));

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        player.classList.add("is-playing");
        video.play().catch(() => {});
      });
    }
  } else if (player && playBtn) {
    // Using a Vimeo/YouTube iframe instead → overlay not needed
    playBtn.remove();
    const placeholder = player.querySelector(".player__placeholder");
    if (placeholder && player.querySelector(".player__embed")) placeholder.remove();
  }


  /* 4. Timeline ------------------------------------------------------------ */
  const sections = [...document.querySelectorAll("[data-keyframe]")];
  const keysWrap = document.querySelector("[data-timeline-keys]");
  const progress = document.querySelector("[data-timeline-progress]");
  const playhead = document.querySelector("[data-timeline-playhead]");
  const frameOut = document.querySelector("[data-frame]");
  const track = document.querySelector("[data-timeline-track]");

  const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const pad = (n) => String(n).padStart(4, "0");

  const keys = sections.map((section) => {
    const key = document.createElement("button");
    key.type = "button";
    key.className = "timeline__key";
    key.dataset.label = section.dataset.keyframe;
    key.setAttribute("aria-label", `Jump to ${section.dataset.keyframe}`);
    key.addEventListener("click", () => section.scrollIntoView({ behavior: "smooth" }));
    keysWrap && keysWrap.appendChild(key);
    return { key, section };
  });

  const placeKeys = () => {
    const max = maxScroll();
    keys.forEach(({ key, section }) => {
      const top = section.getBoundingClientRect().top + window.scrollY - 64;
      const p = Math.min(1, Math.max(0, top / max));
      key.style.left = `${p * 100}%`;
      key._pos = p;
    });
  };

  const update = () => {
    const p = Math.min(1, Math.max(0, window.scrollY / maxScroll()));
    if (progress) progress.style.transform = `scaleX(${p})`;
    if (playhead) playhead.style.left = `${p * 100}%`;
    if (frameOut) frameOut.textContent = pad(Math.round(p * (TOTAL_FRAMES - 1)) + 1);

    // active keyframe = last key the playhead has passed
    let active = 0;
    keys.forEach(({ key }, i) => { if (p + 0.001 >= key._pos) active = i; });
    keys.forEach(({ key }, i) => key.classList.toggle("is-active", i === active));
  };

  // Click / drag the track to scrub
  if (track) {
    const scrubTo = (clientX) => {
      const rect = track.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      window.scrollTo({ top: p * maxScroll(), behavior: "auto" });
    };
    let dragging = false;
    track.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".timeline__key")) return;
      dragging = true;
      track.setPointerCapture(e.pointerId);
      scrubTo(e.clientX);
    });
    track.addEventListener("pointermove", (e) => dragging && scrubTo(e.clientX));
    track.addEventListener("pointerup", () => { dragging = false; });
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });

  window.addEventListener("resize", () => { placeKeys(); update(); });
  window.addEventListener("load", () => { placeKeys(); update(); });
  placeKeys();
  update();


  /* 5. Active nav link ----------------------------------------------------- */
  const navLinks = [...document.querySelectorAll(".nav__link")];
  if ("IntersectionObserver" in window && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) =>
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => navObserver.observe(s));
  }


  /* 6. Copy email ---------------------------------------------------------- */
  document.querySelectorAll("[data-copy-email]").forEach((btn) => {
    const original = btn.textContent;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copyEmail);
        btn.textContent = "Copied ✓";
      } catch {
        btn.textContent = btn.dataset.copyEmail;
      }
      setTimeout(() => { btn.textContent = original; }, 1800);
    });
  });


  /* 7. Reveal on scroll ---------------------------------------------------- */
  const revealTargets = document.querySelectorAll(".section-heading, .player, .breakdown, .about__bio, .panel, .contact__main, .socials");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((el) => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }
})();
