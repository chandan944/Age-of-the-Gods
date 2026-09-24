const fs = require('fs');
const path = require('path');

const filePath = path.resolve('index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. UPGRADE GOOGLE FONTS LINK (if not already done)
const oldFontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">`;

const newFontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@600;700;900&family=Martel:wght@400;600;700;800;900&family=Noto+Serif+Devanagari:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&family=Rozha+One&family=Yatra+One&display=swap" rel="stylesheet">`;

if (html.includes(oldFontLink)) {
  html = html.replace(oldFontLink, newFontLink);
  console.log('Step 1: Premium Google Fonts link injected.');
} else {
  console.log('Step 1: Google fonts link already updated.');
}

// 2. UPGRADE FONT TOKENS IN :ROOT & GLOBAL STYLES
const oldFontTokens = `  --font-serif: 'Cinzel', Georgia, serif;
  --font-sans: 'Outfit', -apple-system, sans-serif;`;

const newFontTokens = `  /* Ultra-Premium Devanagari & Classical Typography */
  --font-royal: 'Rozha One', 'Noto Serif Devanagari', 'Cinzel', Georgia, serif;
  --font-serif: 'Martel', 'Noto Serif Devanagari', 'Cinzel', Georgia, serif;
  --font-sans: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: 'Cinzel Decorative', 'Rozha One', 'Yatra One', serif;`;

if (html.includes(oldFontTokens)) {
  html = html.replace(oldFontTokens, newFontTokens);
  console.log('Step 2: Premium font tokens updated in :root.');
} else {
  console.log('Step 2: Font tokens already updated.');
}

// 3. APPLY PREMIUM FONTS TO HERO SCREEN
const oldHeroBlock = `.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(30px, 8.5vw, 54px);
  font-weight: 900;
  color: var(--pure-white);
  letter-spacing: clamp(1px, 1.5vw, 4px);
  text-transform: uppercase;
  text-shadow: 0 2px 25px rgba(0,0,0,0.9), 0 0 50px rgba(255,119,0,0.3);
  margin-bottom: 8px;
  line-height: 1.15;
}

.hero-subtitle {
  font-family: var(--font-sans);
  font-size: clamp(12px, 3.2vw, 15px);
  font-weight: 500;
  color: var(--saffron-bright);
  letter-spacing: clamp(0.5px, 1vw, 2px);
  text-transform: uppercase;
  margin-bottom: 12px;
  text-shadow: 0 2px 12px rgba(0,0,0,0.8);
  max-width: 90%;
}

.hero-tagline {
  font-family: var(--font-sans);
  font-size: clamp(12px, 3.2vw, 14px);
  font-weight: 300;
  color: rgba(255,255,255,0.85);
  max-width: 680px;
  line-height: 1.65;
  margin-bottom: clamp(20px, 4vh, 34px);
  padding: 0 8px;
}`;

const newHeroBlock = `.hero-title {
  font-family: var(--font-royal);
  font-size: clamp(32px, 9vw, 58px);
  font-weight: 800;
  color: var(--pure-white);
  letter-spacing: 0.5px;
  text-shadow: 0 2px 25px rgba(0,0,0,0.95), 0 0 50px rgba(255,119,0,0.4);
  margin-bottom: 8px;
  line-height: 1.15;
}

.hero-subtitle {
  font-family: var(--font-sans);
  font-size: clamp(12px, 3.2vw, 15px);
  font-weight: 600;
  color: var(--saffron-bright);
  letter-spacing: 0.8px;
  margin-bottom: 12px;
  text-shadow: 0 2px 12px rgba(0,0,0,0.8);
  max-width: 90%;
}

.hero-tagline {
  font-family: var(--font-serif);
  font-size: clamp(12px, 3.2vw, 14.5px);
  font-weight: 400;
  color: #E2E2D8;
  max-width: 680px;
  line-height: 1.7;
  margin-bottom: clamp(20px, 4vh, 34px);
  padding: 0 8px;
}`;

if (html.includes(oldHeroBlock)) {
  html = html.replace(oldHeroBlock, newHeroBlock);
  console.log('Step 3: Hero screen typography elevated with Rozha One & Martel.');
} else {
  console.error('ERROR: oldHeroBlock not found');
  process.exit(1);
}

// 4. TRANSFORM HEADER TO STRICTLY ONE ROW WITH 4% HEIGHT
const oldHeaderGroupCss = `.ui-header-group {
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(6,6,8,0.96) 0%, rgba(6,6,8,0.8) 75%, transparent 100%);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,119,0,0.14);
  padding-top: var(--safe-top);
  position: relative;
}

/* SINGLE HORIZONTALLY SCROLLABLE HEADER ROW */
.top-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 12px;
  gap: 8px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none; /* Firefox */
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
}

.top-header::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.top-header > * {
  flex-shrink: 0;
  scroll-snap-align: start;
}

.brand-section {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding-right: 4px;
}

.sacred-monogram {
  width: 32px; height: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1.5px solid var(--saffron-bright);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--saffron-bright);
  background: rgba(255,119,0,0.08);
  box-shadow: 0 0 12px var(--saffron-glow);
}

.brand-titles {
  min-width: 0;
}

.site-title {
  font-family: var(--font-serif);
  font-size: 15px;
  font-weight: 700;
  color: var(--pure-white);
  letter-spacing: 1px;
  text-transform: uppercase;
  white-space: nowrap;
}

.action-btn {
  background: var(--surface-card);
  border: 1px solid var(--border-dark);
  color: var(--text-white);
  padding: 6px 12px;
  min-height: 34px;
  border-radius: 18px;
  font-size: 11.5px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
  touch-action: manipulation;
  white-space: nowrap;
}

.action-btn:hover, .action-btn:active {
  border-color: var(--saffron-bright);
  color: var(--saffron-bright);
  background: rgba(255,119,0,0.12);
  box-shadow: 0 0 15px var(--saffron-glow);
}

.action-btn.highlighted {
  border-color: var(--saffron-bright);
  color: var(--saffron-bright);
  background: rgba(255,119,0,0.18);
  box-shadow: 0 0 12px var(--saffron-glow);
}

/* Header Stepper Buttons & Counter Pill */
.header-step-btn {
  padding: 6px 11px;
  min-height: 34px;
  border-radius: 18px;
  font-size: 11px;
  font-weight: 700;
  color: var(--saffron-bright);
  background: rgba(255,119,0,0.1);
  border: 1px solid rgba(255,119,0,0.35);
}

.header-step-btn:hover, .header-step-btn:active {
  background: rgba(255,119,0,0.25);
  border-color: var(--saffron-bright);
  color: #FFFFFF;
  box-shadow: 0 0 12px var(--saffron-glow);
}

.header-counter-pill {
  padding: 6px 12px;
  min-height: 34px;
  border-radius: 18px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-white);
  background: rgba(18, 18, 28, 0.92);
  border: 1px solid var(--border-dark);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.header-counter-pill:hover {
  border-color: var(--saffron-bright);
  color: var(--saffron-bright);
}

/* Header Zoom In & Out Pill Group */
.header-zoom-group {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: var(--surface-card);
  border: 1px solid var(--border-dark);
  border-radius: 18px;
  padding: 2px 4px;
  min-height: 34px;
}

.zoom-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--text-white);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  touch-action: manipulation;
}

.zoom-btn:hover, .zoom-btn:active {
  background: rgba(255,119,0,0.25);
  color: var(--saffron-bright);
}

#btn-search-toggle {
  display: inline-flex;
}`;

const newHeaderGroupCss = `/* ===== HEADER: STRICTLY ONE ROW WITH ONLY 4% HEIGHT ===== */
.ui-header-group {
  pointer-events: auto;
  height: 4vh;
  min-height: 34px;
  max-height: 42px;
  background: linear-gradient(180deg, rgba(8, 8, 12, 0.98) 0%, rgba(6, 6, 8, 0.92) 100%);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 119, 0, 0.24);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.8);
  position: relative;
  display: flex;
  align-items: center;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
}

/* SINGLE HORIZONTALLY SCROLLABLE 4% ROW */
.top-header {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 8px;
  gap: 6px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none; /* Firefox */
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  box-sizing: border-box;
}

.top-header::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.top-header > * {
  flex-shrink: 0;
  scroll-snap-align: start;
}

.brand-section {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding-right: 4px;
}

.sacred-monogram {
  width: 24px; height: 24px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1.2px solid var(--saffron-bright);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--saffron-bright);
  background: rgba(255, 119, 0, 0.12);
  box-shadow: 0 0 8px var(--saffron-glow);
}

.brand-titles {
  min-width: 0;
}

.site-title {
  font-family: var(--font-royal);
  font-size: 13.5px;
  font-weight: 700;
  color: var(--pure-white);
  letter-spacing: 0.6px;
  text-transform: uppercase;
  white-space: nowrap;
}

.action-btn {
  background: var(--surface-card);
  border: 1px solid var(--border-dark);
  color: var(--text-white);
  height: 25px;
  min-height: 25px;
  padding: 0 9px;
  border-radius: 13px;
  font-family: var(--font-sans);
  font-size: 10.5px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  touch-action: manipulation;
  white-space: nowrap;
}

.action-btn:hover, .action-btn:active {
  border-color: var(--saffron-bright);
  color: var(--saffron-bright);
  background: rgba(255,119,0,0.14);
  box-shadow: 0 0 10px var(--saffron-glow);
}

.action-btn.highlighted {
  border-color: var(--saffron-bright);
  color: #FFFFFF;
  background: rgba(255,119,0,0.22);
  box-shadow: 0 0 10px var(--saffron-glow);
}

/* Header Stepper Buttons & Counter Pill */
.header-step-btn {
  height: 25px;
  min-height: 25px;
  padding: 0 8px;
  border-radius: 13px;
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 700;
  color: var(--saffron-bright);
  background: rgba(255,119,0,0.12);
  border: 1px solid rgba(255,119,0,0.35);
}

.header-step-btn:hover, .header-step-btn:active {
  background: rgba(255,119,0,0.28);
  border-color: var(--saffron-bright);
  color: #FFFFFF;
  box-shadow: 0 0 10px var(--saffron-glow);
}

.header-counter-pill {
  height: 25px;
  min-height: 25px;
  padding: 0 9px;
  border-radius: 13px;
  font-family: var(--font-sans);
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text-white);
  background: rgba(18, 18, 28, 0.95);
  border: 1px solid var(--border-dark);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.header-counter-pill:hover {
  border-color: var(--saffron-bright);
  color: var(--saffron-bright);
}

/* Header Zoom In & Out Pill Group */
.header-zoom-group {
  height: 25px;
  min-height: 25px;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: var(--surface-card);
  border: 1px solid var(--border-dark);
  border-radius: 13px;
  padding: 0 4px;
}

.zoom-btn {
  width: 21px;
  height: 21px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--text-white);
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  touch-action: manipulation;
}

.zoom-btn:hover, .zoom-btn:active {
  background: rgba(255,119,0,0.25);
  color: var(--saffron-bright);
}

#btn-search-toggle {
  display: inline-flex;
}

/* INLINE CATEGORY CHIPS IN SINGLE HEADER ROW */
.category-inline-chips {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
}

.category-chip {
  background: rgba(20, 20, 30, 0.75);
  border: 1px solid rgba(255, 119, 0, 0.2);
  color: #B4B4AC;
  height: 24px;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 12px;
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  touch-action: manipulation;
  flex-shrink: 0;
}

.category-chip:hover, .category-chip.active {
  background: rgba(255, 119, 0, 0.22);
  border-color: var(--saffron-bright);
  color: #FFFFFF;
  box-shadow: 0 0 10px rgba(255, 119, 0, 0.35);
}

/* HIDE REDUNDANT STACKED ROWS TO PRESERVE STRICT 4% HEIGHT */
.category-ribbon {
  display: none !important;
}

.breadcrumbs-bar {
  display: none !important;
}`;

if (html.includes(oldHeaderGroupCss)) {
  html = html.replace(oldHeaderGroupCss, newHeaderGroupCss);
  console.log('Step 4: Header CSS updated to strictly 1 row with 4% height.');
} else {
  console.error('ERROR: oldHeaderGroupCss not found');
  process.exit(1);
}

// 5. UPDATE MODAL DRAWER TYPOGRAPHY TO ULTRA-PREMIUM SERIF & SANS
const oldDrawerFont = `.drawer-title {
  font-family: var(--font-serif);
  font-size: 28px;
  font-weight: 700;
  color: var(--pure-white);
  line-height: 1.2;
  margin-bottom: 4px;
}

.drawer-sanskrit {
  font-size: 17px;
  color: var(--saffron-bright);
  margin-bottom: 20px;
}`;

const newDrawerFont = `.drawer-title {
  font-family: var(--font-royal);
  font-size: clamp(24px, 6vw, 30px);
  font-weight: 800;
  color: var(--pure-white);
  line-height: 1.25;
  margin-bottom: 4px;
}

.drawer-sanskrit {
  font-family: var(--font-serif);
  font-size: clamp(14px, 4vw, 17px);
  font-weight: 600;
  color: var(--saffron-bright);
  margin-bottom: 16px;
}`;

if (html.includes(oldDrawerFont)) {
  html = html.replace(oldDrawerFont, newDrawerFont);
}

html = html.replace(
  `.drawer-quote {
  border-left: 3px solid var(--saffron-bright);
  background: rgba(255,119,0,0.08);
  padding: 14px 18px;
  margin-bottom: 22px;
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: #F0E6D2;
}`,
  `.drawer-quote {
  border-left: 3px solid var(--saffron-bright);
  background: rgba(255,119,0,0.08);
  padding: 12px 16px;
  margin-bottom: 20px;
  border-radius: 0 8px 8px 0;
  font-family: var(--font-serif);
  font-size: 13.5px;
  line-height: 1.6;
  color: #F4EAD8;
}`
);

html = html.replace(
  `.drawer-summary {
  font-size: 15px;
  color: var(--text-white);
  line-height: 1.65;
  margin-bottom: 22px;
}`,
  `.drawer-summary {
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 400;
  color: #ECECE6;
  line-height: 1.7;
  margin-bottom: 20px;
}`
);

html = html.replace(
  `.drawer-content-text {
  font-size: 14px;
  color: #C8C8C0;
  line-height: 1.75;
}

.drawer-content-text h3 {
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--pure-white);
  margin: 22px 0 8px 0;
  border-bottom: 1px solid var(--border-dark);
  padding-bottom: 6px;
}

.drawer-content-text h4 {
  font-family: var(--font-serif);`,
  `.drawer-content-text {
  font-family: var(--font-serif);
  font-size: 13.5px;
  color: #D6D6CE;
  line-height: 1.8;
}

.drawer-content-text h3 {
  font-family: var(--font-royal);
  font-size: 17px;
  font-weight: 700;
  color: var(--pure-white);
  margin: 20px 0 8px 0;
  border-bottom: 1px solid rgba(255,119,0,0.25);
  padding-bottom: 5px;
}

.drawer-content-text h4 {
  font-family: var(--font-royal);`
);

console.log('Step 5: Modal drawer typography updated.');

// 6. UPDATE 3D BILLBOARD SPRITE FONTS IN createLabelSprite
const oldCanvasFont = `    if (sanskrit) {
      ctx.font = "italic 22px 'Outfit', 'Martel', sans-serif";
      ctx.fillStyle = '#FF9933';
      ctx.textAlign = 'center';
      ctx.fillText(sanskrit.substring(0, 42), 360, 52);
    }
    ctx.font = "bold 30px 'Yatra One', 'Rozha One', 'Cinzel', serif, sans-serif";
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(title.length > 32 ? title.substring(0, 30) + '...' : title, 360, 106);

    if (epoch) {
      ctx.font = "19px 'Outfit', 'Martel', sans-serif";
      ctx.fillStyle = '#FFB74D';
      ctx.textAlign = 'center';
      ctx.fillText(epoch.substring(0, 44), 360, 152);
    }`;

const newCanvasFont = `    if (sanskrit) {
      ctx.font = "600 22px 'Martel', 'Noto Serif Devanagari', serif";
      ctx.fillStyle = '#FF9933';
      ctx.textAlign = 'center';
      ctx.fillText(sanskrit.substring(0, 42), 360, 52);
    }
    ctx.font = "800 32px 'Rozha One', 'Noto Serif Devanagari', serif";
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(title.length > 32 ? title.substring(0, 30) + '...' : title, 360, 108);

    if (epoch) {
      ctx.font = "500 18px 'Poppins', 'Noto Serif Devanagari', sans-serif";
      ctx.fillStyle = '#FFB74D';
      ctx.textAlign = 'center';
      ctx.fillText(epoch.substring(0, 44), 360, 154);
    }`;

if (html.includes(oldCanvasFont)) {
  html = html.replace(oldCanvasFont, newCanvasFont);
  console.log('Step 6: 3D canvas billboard fonts upgraded to Rozha One, Martel, Poppins.');
}

// 7. PLACE CATEGORY CHIPS DIRECTLY IN SINGLE SCROLLABLE ROW IN HTML
const oldHeaderHtml = `        <!-- 3. Milestone Navigation: Next Button -->
        <button class="action-btn header-step-btn" id="btn-next-node" title="अगला पड़ाव (Next Milestone)">अगला ►</button>

        <!-- 4. Detailed Lore Drawer Button -->`;

const newHeaderHtml = `        <!-- 3. Milestone Navigation: Next Button -->
        <button class="action-btn header-step-btn" id="btn-next-node" title="अगला पड़ाव (Next Milestone)">अगला ►</button>

        <!-- Category Chips Inline in Single 4% Row -->
        <div class="category-inline-chips" id="category-ribbon"></div>

        <!-- 4. Detailed Lore Drawer Button -->`;

if (html.includes(oldHeaderHtml)) {
  html = html.replace(oldHeaderHtml, newHeaderHtml);
}

// Remove the old stacked <nav class="category-ribbon"> and <div class="breadcrumbs-bar">
html = html.replace(`      <nav class="category-ribbon" aria-label="Category Filters" id="category-ribbon"></nav>

      <div class="breadcrumbs-bar" id="breadcrumbs-bar">
        <span class="breadcrumb-item current" id="breadcrumb-current">सनातन धर्म · परब्रह्मन्</span>
      </div>`, `      <div id="breadcrumbs-bar" style="display:none;"><span id="breadcrumb-current"></span></div>`);

console.log('Step 7: Category chips moved directly into single scrollable 4% row.');

fs.writeFileSync(filePath, html, { encoding: 'utf8' });
console.log('SUCCESS! index.html updated with premium typography & 4% single-row header. New length:', html.length);
