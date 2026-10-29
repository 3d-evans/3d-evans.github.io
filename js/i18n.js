/* ==========================================================================
   i18n.js — language switcher (English · Español · 日本語)
   --------------------------------------------------------------------------
   HOW IT WORKS
   - English is written directly in index.html (it's the default + fallback).
   - Any element with  data-i18n="key"  gets its text swapped for the
     matching key below when the visitor picks ES or JA.
   - data-i18n-attr="alt:key"  translates an attribute instead of the text.
   - data-i18n-keyframe="key"  translates the timeline keyframe tooltip.
   - Links can force a language:  https://3d-evans.github.io/?lang=ja
   - A missing key simply falls back to the English in the HTML.

   TO ADD / CHANGE TEXT
   1. Edit the English in index.html.
   2. Edit the same key in  es  and  ja  below.
   ========================================================================== */

(() => {
  "use strict";

  const SUPPORTED = ["en", "es", "ja"];
  const DEFAULT = "en";
  const STORAGE_KEY = "lang";

  const STRINGS = {
    /* English: only strings that are NOT in the HTML (used by scripts) */
    en: {
      "contact.copied": "Copied ✓",
      "kf.intro": "Intro",
      "kf.reel": "Reel",
      "kf.about": "About",
      "kf.contact": "Contact",
    },

    /* ---------------------------------------------------------------- ES */
    es: {
      "meta.title": "Daniel García Evans — Animador 3D",
      "skip": "Saltar al contenido",

      "nav.reel": "Reel",
      "nav.about": "Sobre mí",
      "nav.contact": "Contacto",
      "prefs.theme": "Tema",
      "prefs.lang": "Idioma",

      "status.available": "Disponible para trabajar",
      "hero.eyebrow": 'Portfolio de animación 3D — <span data-year>2026</span>',
      "hero.kana": "",
      "hero.role": "Animador 3D",
      "hero.lede": "Doy vida a personajes fotograma a fotograma: peso, timing y esos pequeños intermedios que hacen que una actuación se sienta real.",
      "hero.ctaReel": "Ver demo reel",
      "hero.ctaContact": "Contactar",
      "hero.portraitAlt": "Retrato de Daniel García Evans",

      "reel.title": "Demo Reel",
      "reel.meta": "Plano 010 · 24 fps",
      "reel.empty": "NO HAY REEL CARGADO",
      "reel.play": "Reproducir reel",

      "breakdown.title": "Desglose de planos",
      "b1.shot": "Título del plano",
      "b1.role": "Animación, layout · Maya",
      "b2.shot": "Título del plano",
      "b2.role": "Mecánica corporal · Rig de [Crédito]",
      "b3.shot": "Título del plano",
      "b3.role": "Actuación / lip-sync · Blender",

      "about.title": "Sobre mí",
      "about.intro": "Hola, soy Daniel: un animador 3D obsesionado con cómo se mueven las cosas.",
      "about.p1": "Me centro en [animación de personajes / mecánica corporal / actuación], estudiando el peso, el timing y el spacing hasta que una pose deja de ser una pose y se convierte en una actuación.",
      "about.p2": "Vivo en España y hablo español, japonés e inglés. Me ilusiona especialmente trabajar con estudios en Japón.",

      "facts.basedLabel": "Ubicación",
      "facts.based": "[Ciudad], España",
      "facts.focusLabel": "Especialidad",
      "facts.focus": "Animación de personajes",
      "facts.openLabel": "Disponible para",
      "facts.open": "Jornada completa · Freelance · Remoto",
      "facts.langsLabel": "Idiomas",
      "facts.langs": "Español, japonés, inglés",

      "panel.toolkit": "Herramientas",
      "tool.animation": "Animación",
      "tool.render": "Render y composición",
      "tool.realtime": "Tiempo real",

      "panel.keyframes": "Fotogramas clave",
      "exp1.what": "Demo reel y portfolio",
      "exp1.where": "Independiente",
      "exp2.what": "[Curso / Grado en Animación 3D]",
      "exp2.where": "[Escuela]",
      "exp3.what": "[Estudio / Prácticas]",
      "exp3.where": "[Empresa]",

      "contact.title": "Contacto",
      "contact.meta": "Último fotograma",
      "contact.kicker": "¿Tienes un plano que necesita cobrar vida?",
      "contact.cv": "Descargar CV",
      "contact.copy": "Copiar email",
      "contact.copied": "Copiado ✓",

      "footer.top": "Volver al fotograma 0001 ↑",

      "kf.intro": "Intro",
      "kf.reel": "Reel",
      "kf.about": "Sobre mí",
      "kf.contact": "Contacto",
    },

    /* ---------------------------------------------------------------- JA */
    ja: {
      "meta.title": "ダニエル・ガルシア・エヴァンス — 3Dアニメーター",
      "skip": "本文へスキップ",

      "nav.reel": "リール",
      "nav.about": "自己紹介",
      "nav.contact": "連絡先",
      "prefs.theme": "テーマ",
      "prefs.lang": "言語",

      "status.available": "お仕事募集中",
      "hero.eyebrow": '3Dアニメーション ポートフォリオ — <span data-year>2026</span>',
      "hero.kana": "ダニエル・ガルシア・エヴァンス",
      "hero.role": "3Dアニメーター",
      "hero.lede": "重さ、タイミング、そして演技にリアリティを与える細かな中割り。一コマずつ、キャラクターに命を吹き込んでいます。",
      "hero.ctaReel": "デモリールを見る",
      "hero.ctaContact": "お問い合わせ",
      "hero.portraitAlt": "ダニエル・ガルシア・エヴァンスのポートレート",

      "reel.title": "デモリール",
      "reel.meta": "ショット 010 · 24 fps",
      "reel.empty": "リールが読み込まれていません",
      "reel.play": "リールを再生",

      "breakdown.title": "ショットブレイクダウン",
      "b1.shot": "ショットタイトル",
      "b1.role": "アニメーション、レイアウト · Maya",
      "b2.shot": "ショットタイトル",
      "b2.role": "ボディメカニクス · リグ：[クレジット]",
      "b3.shot": "ショットタイトル",
      "b3.role": "演技 / リップシンク · Blender",

      "about.title": "自己紹介",
      "about.intro": "こんにちは、ダニエルです。「動き」に夢中な3Dアニメーターです。",
      "about.p1": "[キャラクターアニメーション / ボディメカニクス / 演技] を中心に、重さ・タイミング・スペーシングを追求し、ただのポーズを「演技」に変えることを目指しています。",
      "about.p2": "スペインを拠点に、スペイン語・日本語・英語を話します。特に日本のスタジオで働くことに強い関心を持っています。",

      "facts.basedLabel": "拠点",
      "facts.based": "スペイン・[都市]",
      "facts.focusLabel": "専門",
      "facts.focus": "キャラクターアニメーション",
      "facts.openLabel": "希望形態",
      "facts.open": "正社員 · フリーランス · リモート",
      "facts.langsLabel": "言語",
      "facts.langs": "スペイン語、日本語、英語",

      "panel.toolkit": "使用ツール",
      "tool.animation": "アニメーション",
      "tool.render": "レンダリング & コンポジット",
      "tool.realtime": "リアルタイム",

      "panel.keyframes": "キーフレーム（経歴）",
      "exp1.what": "デモリール & ポートフォリオ",
      "exp1.where": "個人制作",
      "exp2.what": "[3Dアニメーションのコース / 学位]",
      "exp2.where": "[学校名]",
      "exp3.what": "[スタジオ / インターンシップ]",
      "exp3.where": "[会社名]",

      "contact.title": "連絡先",
      "contact.meta": "最終フレーム",
      "contact.kicker": "命を吹き込みたいショットはありませんか？",
      "contact.cv": "履歴書（CV）をダウンロード",
      "contact.copy": "メールをコピー",
      "contact.copied": "コピーしました ✓",

      "footer.top": "フレーム 0001 に戻る ↑",

      "kf.intro": "イントロ",
      "kf.reel": "リール",
      "kf.about": "自己紹介",
      "kf.contact": "連絡先",
    },
  };

  /* ---------------------------------------------------------------------- */

  const root = document.documentElement;
  const select = document.querySelector("[data-lang-select]");
  const originalTitle = document.title;

  // Remember the English (HTML) version of everything we might replace
  const textEls = [...document.querySelectorAll("[data-i18n]")].map((el) => ({
    el, key: el.dataset.i18n, html: el.innerHTML,
  }));

  const attrEls = [];
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (attr && key) attrEls.push({ el, attr, key, value: el.getAttribute(attr) });
    });
  });

  let current = DEFAULT;

  const t = (key, lang = current) => {
    if (STRINGS[lang] && key in STRINGS[lang]) return STRINGS[lang][key];
    return STRINGS.en[key];
  };

  const apply = (lang) => {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT;
    current = lang;
    const dict = lang === "en" ? {} : STRINGS[lang];

    textEls.forEach(({ el, key, html }) => {
      el.innerHTML = key in dict ? dict[key] : html;
    });
    attrEls.forEach(({ el, attr, key, value }) => {
      el.setAttribute(attr, key in dict ? dict[key] : value);
    });
    document.querySelectorAll("[data-i18n-keyframe]").forEach((el) => {
      el.dataset.keyframe = t(el.dataset.i18nKeyframe) || el.dataset.keyframe;
    });

    document.title = dict["meta.title"] || originalTitle;
    root.lang = lang;
    if (select) select.value = lang;

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    // Keep ?lang= in the address bar so the current view can be shared
    try {
      const url = new URL(window.location.href);
      if (lang === DEFAULT) url.searchParams.delete("lang");
      else url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    } catch (e) {}

    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  };

  // Pick the starting language: ?lang= → saved choice → English
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}

  apply(SUPPORTED.includes(fromUrl) ? fromUrl : saved || DEFAULT);

  if (select) select.addEventListener("change", () => apply(select.value));

  // Small API for main.js
  window.i18n = { t: (key) => t(key), get lang() { return current; } };
})();
