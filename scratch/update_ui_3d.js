const fs = require('fs');
const path = require('path');

const filePath = path.resolve('index.html');
let html = fs.readFileSync(filePath, 'utf8');

console.log('Original length:', html.length);

// 1. UPDATE HEADER CSS & ADD SCROLLABLE ROW STYLES
const headerCssOld = `.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px clamp(12px, 3vw, 28px);
  gap: 12px;
  position: relative;
}

.brand-section {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.sacred-monogram {
  width: 36px; height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1.5px solid var(--saffron-bright);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--saffron-bright);
  background: rgba(255,119,0,0.08);
  box-shadow: 0 0 15px var(--saffron-glow);
}

.brand-titles {
  min-width: 0;
}

.site-title {
  font-family: var(--font-serif);
  font-size: clamp(15px, 3.5vw, 19px);
  font-weight: 700;
  color: var(--pure-white);
  letter-spacing: clamp(1px, 1.5vw, 2.5px);
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.site-subtitle {
  font-size: clamp(9px, 2.2vw, 11px);
  color: var(--saffron-bright);
  letter-spacing: clamp(0.5px, 1vw, 1.5px);
  text-transform: uppercase;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.action-btn {
  background: var(--surface-card);
  border: 1px solid var(--border-dark);
  color: var(--text-white);
  padding: 7px 12px;
  min-height: 36px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 600;
  display: flex;
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
  background: rgba(255,119,0,0.15);
}

/* Mobile search toggle button */
#btn-search-toggle {
  display: none;
}`;

const headerCssNew = `/* SINGLE HORIZONTALLY SCROLLABLE HEADER ROW */
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

if (!html.includes(headerCssOld)) {
  console.error('ERROR: headerCssOld not found in html');
  process.exit(1);
}
html = html.replace(headerCssOld, headerCssNew);
console.log('Step 1 complete: Header CSS replaced.');

// 2. REMOVE OBSOLETE BOTTOM-DECK CSS
const bottomDeckCssOld = `/* ===== BOTTOM DECK & TIMELINE SCRUBBER ===== */
.bottom-deck {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px clamp(12px, 3vw, 28px) max(10px, calc(8px + var(--safe-bottom))) clamp(12px, 3vw, 28px);
  background: linear-gradient(0deg, rgba(6,6,8,0.98) 0%, rgba(6,6,8,0.85) 75%, transparent 100%);
  backdrop-filter: blur(14px);
  border-top: 1px solid rgba(255,119,0,0.14);
  gap: 12px;
}

/* Manual Timeline Scrubber Center */
.timeline-scrubber-group {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(14, 14, 22, 0.9);
  border: 1px solid var(--border-dark);
  padding: 6px 14px;
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  flex: 1;
  max-width: 520px;
}

.timeline-step-btn {
  background: rgba(255,119,0,0.08);
  border: 1px solid rgba(255,119,0,0.3);
  color: var(--saffron-bright);
  padding: 5px 12px;
  min-height: 34px;
  min-width: 44px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  touch-action: manipulation;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-step-btn:hover, .timeline-step-btn:active {
  background: rgba(255,119,0,0.22);
  border-color: var(--saffron-bright);
  color: #fff;
}

.timeline-slider {
  -webkit-appearance: none;
  appearance: none;
  flex: 1;
  height: 6px;
  background: rgba(255, 119, 0, 0.25);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}

.timeline-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--saffron-bright);
  box-shadow: 0 0 10px var(--saffron-glow);
  cursor: pointer;
  transition: transform 0.15s ease;
}

.timeline-slider::-webkit-slider-thumb:hover, .timeline-slider::-webkit-slider-thumb:active {
  transform: scale(1.25);
  background: #FFF;
}

.node-counter {
  font-size: 11px;
  color: var(--text-white);
  font-family: var(--font-serif);
  min-width: 100px;
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}

/* Actions Group */
.deck-actions-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary {
  background: var(--surface-card);
  border: 1px solid var(--border-dark);
  color: var(--text-white);
  padding: 6px 12px;
  min-height: 36px;
  border-radius: 20px;
  font-size: 11.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  white-space: nowrap;
  touch-action: manipulation;
}

.btn-secondary:hover:not(:disabled), .btn-secondary:active:not(:disabled) {
  border-color: var(--saffron-bright);
  color: var(--saffron-bright);
  background: rgba(255,119,0,0.12);
}

.btn-primary-lore {
  background: rgba(255,119,0,0.18);
  border: 1.5px solid var(--saffron-bright);
  color: var(--pure-white);
  padding: 6px 16px;
  min-height: 36px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 0 16px var(--saffron-glow);
  touch-action: manipulation;
}

.btn-primary-lore:hover, .btn-primary-lore:active {
  background: rgba(255,119,0,0.32);
  box-shadow: 0 0 25px var(--saffron-glow);
  transform: translateY(-1px);
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.hud-btn {
  width: 36px; height: 36px;
  background: var(--surface-card);
  border: 1px solid var(--border-dark);
  border-radius: 50%;
  color: var(--text-white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  touch-action: manipulation;
  font-size: 15px;
}

.hud-btn:hover, .hud-btn:active {
  border-color: var(--saffron-bright);
  color: var(--saffron-bright);
  transform: scale(1.06);
}

.audio-btn {
  background: var(--surface-card);
  border: 1px solid var(--border-dark);
  color: var(--text-muted);
  padding: 6px 12px;
  min-height: 36px;
  border-radius: 20px;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.25s ease;
  white-space: nowrap;
  touch-action: manipulation;
}

.audio-btn.active {
  border-color: var(--saffron-bright);
  color: var(--saffron-bright);
  background: rgba(255,119,0,0.15);
  box-shadow: 0 0 16px var(--saffron-glow);
}`;

const bottomDeckCssNew = `/* Audio button styling */
.audio-btn {
  background: var(--surface-card);
  border: 1px solid var(--border-dark);
  color: var(--text-muted);
  padding: 6px 12px;
  min-height: 34px;
  border-radius: 18px;
  font-size: 11px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.25s ease;
  white-space: nowrap;
  touch-action: manipulation;
}

.audio-btn.active {
  border-color: var(--saffron-bright);
  color: var(--saffron-bright);
  background: rgba(255,119,0,0.15);
  box-shadow: 0 0 14px var(--saffron-glow);
}`;

if (!html.includes(bottomDeckCssOld)) {
  console.error('ERROR: bottomDeckCssOld not found in html');
  process.exit(1);
}
html = html.replace(bottomDeckCssOld, bottomDeckCssNew);
console.log('Step 2 complete: Obsolete bottom-deck CSS removed.');

// 3. REMOVE MOBILE BOTTOM DECK CSS
const mobileDeckCssOld = `  /* Bottom Deck Thumb Layout (2 Tiers on Mobile) */
  .bottom-deck {
    flex-direction: column;
    align-items: stretch;
    padding: 8px 12px max(10px, calc(6px + var(--safe-bottom))) 12px;
    gap: 8px;
  }

  .timeline-scrubber-group {
    width: 100%;
    max-width: 100%;
    padding: 5px 10px;
    gap: 8px;
  }

  .node-counter {
    font-size: 10px;
    min-width: 80px;
    max-width: 105px;
  }

  .deck-actions-group {
    width: 100%;
    justify-content: space-between;
    gap: 6px;
  }

  .btn-primary-lore {
    flex: 1.3;
    justify-content: center;
    min-height: 40px;
    padding: 8px 12px;
    font-size: 12px;
  }

  .btn-secondary {
    min-height: 40px;
    padding: 8px 10px;
  }

  .audio-btn {
    min-height: 40px;
    padding: 8px 10px;
  }

  .hud-btn {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }`;

if (!html.includes(mobileDeckCssOld)) {
  console.error('ERROR: mobileDeckCssOld not found in html');
  process.exit(1);
}
html = html.replace(mobileDeckCssOld, '');
console.log('Step 3 complete: Mobile bottom deck CSS removed.');

// Also clean up line 1228: .timeline-slider { width: 140px; }
html = html.replace('.timeline-slider { width: 140px; }\n  .node-counter { max-width: 120px; }', '');

// 4. REPLACE UI LAYER HTML MARKUP (Remove footer, populate header row)
const uiLayerOld = `  <!-- UI Overlay -->
  <div class="ui-layer">
    <div class="ui-header-group">
      <header class="top-header">
        <div class="brand-section">
          <div class="sacred-monogram">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>
              <line x1="12" y1="3" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="21"/>
              <line x1="3" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="21" y2="12"/>
            </svg>
          </div>
          <div class="brand-titles">
            <h1 class="site-title" id="site-title">सनातन धर्म</h1>
            <span class="site-subtitle" id="site-subtitle">त्रि-आयामी ब्रह्माण्डीय कालक्रम</span>
          </div>
        </div>

        <div class="header-actions">
          <button class="action-btn" id="btn-search-toggle" title="पवित्र पड़ाव खोजें">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span class="btn-text">खोज</span>
          </button>
          <button class="action-btn" id="btn-lang-toggle" title="Switch Language / भाषा बदलें">
            <span style="font-size: 14px; line-height: 1;">🌐</span>
            <span id="lang-btn-text">English</span>
          </button>
          <button class="action-btn highlighted" id="btn-tree-toggle" title="समग्र वंशावली मानचित्र देखें">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4"/></svg>
            <span class="btn-text">वंशावली</span>
          </button>
          <button class="action-btn" id="btn-hero-show" title="परिचय एवं मुख्य चित्र देखें">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            <span class="btn-text">परिचय</span>
          </button>
        </div>

        <div class="search-container" id="search-container">
          <div class="search-bar">
            <span class="search-icon-box">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input type="text" id="search-input" class="search-input" placeholder="देवता, अवतार, युग या वंशावली खोजें..." autocomplete="off" spellcheck="false">
            <button class="search-close-mobile" id="search-close-mobile" title="खोज बंद करें">✕</button>
          </div>
          <div class="search-results-dropdown" id="search-results"></div>
        </div>
      </header>

      <nav class="category-ribbon" aria-label="Category Filters" id="category-ribbon"></nav>

      <div class="breadcrumbs-bar" id="breadcrumbs-bar">
        <span class="breadcrumb-item current" id="breadcrumb-current">सनातन धर्म · परब्रह्मन्</span>
      </div>
    </div>

    <!-- Bottom HUD Deck with Mobile-First Thumb Controls -->
    <footer class="bottom-deck">
      <!-- Tier 1: Timeline Scrubber -->
      <div class="timeline-scrubber-group">
        <button class="timeline-step-btn" id="btn-prev-node" title="पिछला पड़ाव">◄ पूर्व</button>
        <input type="range" id="timeline-slider" min="0" max="76" value="0" class="timeline-slider" title="कालक्रम में आगे या पीछे जाने हेतु स्लाइडर खींचें" />
        <button class="timeline-step-btn" id="btn-next-node" title="अगला पड़ाव">अगला ►</button>
        <span id="timeline-node-counter" class="node-counter">1/77: परब्रह्मन्</span>
      </div>

      <!-- Tier 2: Thumb Actions Bar -->
      <div class="deck-actions-group">
        <button class="btn-secondary" id="btn-step-back" title="मूल स्रोत परब्रह्म पर लौटें">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>
          <span>मूल उद्गम</span>
        </button>

        <button class="btn-primary-lore" id="btn-inspect-current" title="पवित्र आख्यान एवं दर्शन">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          <span>विस्तृत आख्यान</span>
        </button>

        <button class="audio-btn" id="btn-audio-toggle" title="शाश्वत ॐ तानपूरा ध्वनि">
          <span id="audio-icon">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          </span>
          <span id="audio-text">तानपूरा</span>
        </button>

        <div class="zoom-controls">
          <button class="hud-btn" id="btn-zoom-in" title="निकट लाएं">+</button>
          <button class="hud-btn" id="btn-zoom-out" title="दूर ले जाएं">−</button>
        </div>
      </div>
    </footer>
  </div>`;

const uiLayerNew = `  <!-- UI Overlay -->
  <div class="ui-layer">
    <div class="ui-header-group">
      <!-- Single Scrollable Header Row with All Features and Buttons -->
      <header class="top-header" id="main-header-row">
        <!-- Brand -->
        <div class="brand-section" title="सनातन धर्म (Sanātana Dharma)">
          <div class="sacred-monogram">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>
              <line x1="12" y1="3" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="21"/>
              <line x1="3" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="21" y2="12"/>
            </svg>
          </div>
          <div class="brand-titles">
            <h1 class="site-title" id="site-title">सनातन धर्म</h1>
          </div>
        </div>

        <!-- 1. Milestone Navigation: Previous Button -->
        <button class="action-btn header-step-btn" id="btn-prev-node" title="पिछला पड़ाव (Previous Milestone)">◄ पूर्व</button>

        <!-- 2. Current Node Counter Pill (Tap to view details) -->
        <div class="header-counter-pill" id="timeline-node-counter" title="वर्तमान पड़ाव (क्लिक कर विवरण देखें)">1/77: परब्रह्मन्</div>

        <!-- 3. Milestone Navigation: Next Button -->
        <button class="action-btn header-step-btn" id="btn-next-node" title="अगला पड़ाव (Next Milestone)">अगला ►</button>

        <!-- 4. Detailed Lore Drawer Button -->
        <button class="action-btn highlighted" id="btn-inspect-current" title="पवित्र आख्यान एवं दर्शन">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          <span class="btn-text">विस्तृत आख्यान</span>
        </button>

        <!-- 5. Sacred Tree Map Toggle -->
        <button class="action-btn" id="btn-tree-toggle" title="समग्र वंशावली मानचित्र देखें">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4"/></svg>
          <span class="btn-text">वंशावली</span>
        </button>

        <!-- 6. Return to Cosmic Origin (Brahman) -->
        <button class="action-btn" id="btn-step-back" title="मूल स्रोत परब्रह्म पर लौटें">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>
          <span class="btn-text">मूल उद्गम</span>
        </button>

        <!-- 7. 3D Zoom In & Out Controls -->
        <div class="header-zoom-group">
          <button class="zoom-btn" id="btn-zoom-in" title="निकट लाएं (+)">+</button>
          <button class="zoom-btn" id="btn-zoom-out" title="दूर ले जाएं (−)">−</button>
        </div>

        <!-- 8. Sacred Tanpura Drone Audio Toggle -->
        <button class="action-btn audio-btn" id="btn-audio-toggle" title="शाश्वत ॐ तानपूरा ध्वनि">
          <span id="audio-icon">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          </span>
          <span id="audio-text" class="btn-text">तानपूरा</span>
        </button>

        <!-- 9. Search Toggle -->
        <button class="action-btn" id="btn-search-toggle" title="पवित्र पड़ाव खोजें">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span class="btn-text">खोज</span>
        </button>

        <!-- 10. Language Toggle -->
        <button class="action-btn" id="btn-lang-toggle" title="Switch Language / भाषा बदलें">
          <span style="font-size: 13px; line-height: 1;">🌐</span>
          <span id="lang-btn-text" class="btn-text">English</span>
        </button>

        <!-- 11. Hero Intro Splash -->
        <button class="action-btn" id="btn-hero-show" title="परिचय एवं मुख्य चित्र देखें">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
          <span class="btn-text">परिचय</span>
        </button>

        <!-- Expandable Search Overlay Container -->
        <div class="search-container" id="search-container">
          <div class="search-bar">
            <span class="search-icon-box">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
            <input type="text" id="search-input" class="search-input" placeholder="देवता, अवतार, युग या वंशावली खोजें..." autocomplete="off" spellcheck="false">
            <button class="search-close-mobile" id="search-close-mobile" title="खोज बंद करें">✕</button>
          </div>
          <div class="search-results-dropdown" id="search-results"></div>
        </div>
      </header>

      <nav class="category-ribbon" aria-label="Category Filters" id="category-ribbon"></nav>

      <div class="breadcrumbs-bar" id="breadcrumbs-bar">
        <span class="breadcrumb-item current" id="breadcrumb-current">सनातन धर्म · परब्रह्मन्</span>
      </div>
    </div>
  </div>`;

if (!html.includes(uiLayerOld)) {
  console.error('ERROR: uiLayerOld not found in html');
  process.exit(1);
}
html = html.replace(uiLayerOld, uiLayerNew);
console.log('Step 4 complete: UI Layer replaced (footer removed, header row single scrollable line).');

// 5. UPGRADE SacredScene3D WITH TRUE 3D ORBIT, TILT, SCROLL DOWN/UP, ZOOM & PAN
const scene3DOldStart = html.indexOf('class SacredScene3D {');
const scene3DOldEnd = html.indexOf('window.currentLang = \'hi\';');

if (scene3DOldStart === -1 || scene3DOldEnd === -1) {
  console.error('ERROR: SacredScene3D bounds not found in html');
  process.exit(1);
}

const scene3DNew = `class SacredScene3D {
  constructor(container, treeNodes) {
    this.container = container;
    this.treeNodes = treeNodes;
    this.nodeMap = new Map(treeNodes.map(n => [n.id, n]));
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-9999, -9999);
    this.nodeMeshes = new Map();
    this.connectionLines = [];
    this.interactiveObjects = [];
    this.hoveredNode = null;
    this.selectedNode = null;

    this.onNodeClick = null;
    this.onNodeHover = null;
    this.onScrollTravel = null; // Callback when scrolling / panning across the cosmos

    // Target focal center in 3D cosmos (LookAt)
    this.targetLookAt = new THREE.Vector3(0, 140, 0);
    this.currentLookAt = new THREE.Vector3(0, 140, 0);

    // True 3D Spherical Orbit parameters around targetLookAt
    this.orbitRadius = 240;        // Distance to target (zoom level)
    this.targetOrbitRadius = 240;
    this.theta = 0;                // Azimuth angle (radians around Y axis - 360 rotation)
    this.targetTheta = 0;
    this.phi = Math.PI * 0.44;     // Polar inclination (radians from top - vertical tilt)
    this.targetPhi = Math.PI * 0.44;

    // Dragging & Interaction State
    this.isDragging = false;
    this.dragButton = 0;           // 0: left (3D orbit/tilt), 1: middle (pan), 2: right (pan)
    this.prevMouse = { x: 0, y: 0 };
    this.mouseStartPos = { x: 0, y: 0 };
    this.hasMovedSignificantly = false;

    // Multi-touch gestures
    this.touchStartPos = { x: 0, y: 0 };
    this.prevTouchPos = { x: 0, y: 0 };
    this.touchStartTime = 0;
    this.hasTouchMoved = false;
    this.initialPinchDistance = 0;
    this.prevPinchCenter = null;

    this.init();
  }

  init() {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060608);
    this.scene.fog = new THREE.FogExp2(0x060608, 0.00065);

    this.camera = new THREE.PerspectiveCamera(50, w / h, 1, 9000);
    this.camera.position.set(0, 160, 400);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // Lights
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const sun = new THREE.PointLight(0xff7700, 3.5, 4000);
    sun.position.set(80, 200, 300);
    this.scene.add(sun);
    const fill = new THREE.PointLight(0xff9933, 2.5, 4000);
    fill.position.set(-150, -100, -200);
    this.scene.add(fill);
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(0, 400, 500);
    this.scene.add(dir);

    this.buildCosmicParticles();
    this.buildTreeIn3D();
    this.buildCyclicReturnArc();

    // Prevent default context menu so right-drag pan works seamlessly
    this.container.addEventListener('contextmenu', e => e.preventDefault());

    window.addEventListener('resize', () => this.onResize());
    this.container.addEventListener('mousemove', e => this.onMouseMove(e));
    this.container.addEventListener('mousedown', e => this.onMouseDown(e));
    window.addEventListener('mouseup', () => { this.isDragging = false; });
    this.container.addEventListener('click', e => this.onClick(e));
    this.container.addEventListener('wheel', e => this.onWheel(e), { passive: false });

    // Multi-touch controls
    this.container.addEventListener('touchstart', e => this.onTouchStart(e), { passive: false });
    this.container.addEventListener('touchmove', e => this.onTouchMove(e), { passive: false });
    this.container.addEventListener('touchend', e => this.onTouchEnd(e), { passive: false });
    this.container.addEventListener('touchcancel', () => {
      this.isDragging = false;
      this.initialPinchDistance = 0;
      this.prevPinchCenter = null;
    });

    this.clock = new THREE.Clock();
    this.animate();
  }

  buildCosmicParticles() {
    const count = 4500;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3), col = new Float32Array(count * 3);
    const saffron = new THREE.Color(0xff7700), white = new THREE.Color(0xffffff), gold = new THREE.Color(0xffb74d);

    for (let i = 0; i < count; i++) {
      const z = Math.random() * 3800 - 400;
      const r = 80 + Math.random() * 700;
      const a = Math.random() * Math.PI * 2;
      pos[i*3] = Math.cos(a) * r;
      pos[i*3+1] = Math.sin(a) * (r * 0.45) - (z * 0.45);
      pos[i*3+2] = z;

      const c = Math.random() < 0.45 ? saffron : (Math.random() < 0.7 ? gold : white);
      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: 2.2, vertexColors: true, transparent: true, opacity: 0.68, blending: THREE.AdditiveBlending });
    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  buildTreeIn3D() {
    this.treeNodes.forEach(node => {
      const grp = new THREE.Group();
      grp.position.set(node.x, node.y, node.z);
      grp.userData = { nodeData: node };

      // Aura sphere
      const sphereGeo = new THREE.SphereGeometry(6.5, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: node.id === 'brahman' ? 0xffffff : 0xff7700,
        emissive: node.id === 'brahman' ? 0xffbb44 : 0xcc4400,
        emissiveIntensity: 0.65,
        roughness: 0.2,
        metalness: 0.8
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      grp.add(sphereMesh);

      // Outer glowing ring
      const ringGeo = new THREE.TorusGeometry(10.5, 0.45, 16, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xff9933, transparent: true, opacity: 0.75 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      grp.add(ringMesh);

      // Symbol mesh
      let symbolMesh = null;
      if (node.symbol3D === 'chakra') symbolMesh = this.createChakraMesh();
      else if (node.symbol3D === 'lotus') symbolMesh = this.createLotusMesh();
      else symbolMesh = this.createMandalaMesh();
      symbolMesh.scale.set(0.6, 0.6, 0.6);
      grp.add(symbolMesh);

      // Label sprite in Modern Hindi (always faces camera in 3D)
      const title = (node.title_hi || node.title);
      const epoch = (node.epoch_hi || node.epoch);
      const sprite = this.createLabelSprite(title, node.sanskrit, epoch);
      sprite.position.set(0, 18, 0);
      grp.add(sprite);

      this.scene.add(grp);
      this.nodeMeshes.set(node.id, grp);
      this.interactiveObjects.push(sphereMesh);
      sphereMesh.userData = { parentGroup: grp, nodeData: node };

      // Connecting line to parent
      if (node.parentId && this.nodeMap.has(node.parentId)) {
        const parent = this.nodeMap.get(node.parentId);
        const p1 = new THREE.Vector3(parent.x, parent.y, parent.z);
        const p2 = new THREE.Vector3(node.x, node.y, node.z);
        const mid = new THREE.Vector3((p1.x + p2.x) / 2, (p1.y + p2.y) / 2 + 10, (p1.z + p2.z) / 2);
        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        const tubeGeo = new THREE.TubeGeometry(curve, 16, 0.7, 8, false);
        const tubeMat = new THREE.MeshBasicMaterial({ color: 0xff7700, transparent: true, opacity: 0.75 });
        const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
        this.scene.add(tubeMesh);
        this.connectionLines.push(tubeMesh);
      }
    });
  }

  buildCyclicReturnArc() {
    const pStart = new THREE.Vector3(0, -2220, 3260);
    const pEnd = new THREE.Vector3(0, 140, 0);
    const pMid1 = new THREE.Vector3(380, -900, 2400);
    const pMid2 = new THREE.Vector3(380, 200, 1000);
    const curve = new THREE.CubicBezierCurve3(pStart, pMid1, pMid2, pEnd);
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 1.8, 12, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xffb74d,
      emissive: 0xff7700,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true
    });
    const returnMesh = new THREE.Mesh(tubeGeo, tubeMat);
    this.scene.add(returnMesh);

    const coreGeo = new THREE.TubeGeometry(curve, 48, 0.6, 8, false);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 });
    this.scene.add(new THREE.Mesh(coreGeo, coreMat));
  }

  createChakraMesh() {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0xff9933, emissive: 0xff5500, emissiveIntensity: 0.5, metalness: 0.9 });
    g.add(new THREE.Mesh(new THREE.TorusGeometry(10, 0.6, 16, 36), mat));
    for (let i = 0; i < 8; i++) {
      const s = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 19, 6), mat);
      s.rotation.z = (i / 8) * Math.PI * 2;
      g.add(s);
    }
    return g;
  }
  createLotusMesh() {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0xff7700, emissive: 0x992200, roughness: 0.3, side: THREE.DoubleSide });
    for (let i = 0; i < 8; i++) {
      const shape = new THREE.Shape();
      shape.moveTo(0,0);
      shape.quadraticCurveTo(3,6,0,10);
      shape.quadraticCurveTo(-3,6,0,0);
      const p = new THREE.Mesh(new THREE.ShapeGeometry(shape), mat);
      p.rotation.y = (i/8)*Math.PI*2;
      p.rotation.x = Math.PI/4;
      g.add(p);
    }
    return g;
  }
  createMandalaMesh() {
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: 0xff9933, emissive: 0xff5500, emissiveIntensity: 0.4, metalness: 0.8 });
    g.add(new THREE.Mesh(new THREE.TorusGeometry(8, 0.4, 16, 32), mat));
    g.add(new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.3, 16, 32), mat));
    for (let i = 0; i < 12; i++) {
      const s = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 15, 6), mat);
      s.rotation.z = (i / 12) * Math.PI * 2;
      g.add(s);
    }
    return g;
  }

  createLabelSprite(title, sanskrit, epoch) {
    const c = document.createElement('canvas');
    c.width = 720; c.height = 200;
    const ctx = c.getContext('2d');
    ctx.fillStyle = 'rgba(8,8,12,0.92)';
    ctx.strokeStyle = 'rgba(255,119,0,0.85)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(10, 10, 700, 180, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FF7700';
    ctx.fillRect(30, 10, 660, 4);

    if (sanskrit) {
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
    }

    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    const spMat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    const sp = new THREE.Sprite(spMat);
    sp.scale.set(40, 11.1, 1);
    return sp;
  }

  flyToNode(nodeData) {
    this.selectedNode = nodeData;
    this.targetLookAt.set(nodeData.x, nodeData.y, nodeData.z);
    this.targetOrbitRadius = 150; // crisp intimate focus
    this.targetPhi = Math.PI * 0.44;
  }

  onResize() {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  onMouseDown(e) {
    this.isDragging = true;
    this.dragButton = e.button;
    this.prevMouse = { x: e.clientX, y: e.clientY };
    this.mouseStartPos = { x: e.clientX, y: e.clientY };
    this.hasMovedSignificantly = false;
  }

  onMouseMove(e) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (this.isDragging) {
      const dx = e.clientX - this.prevMouse.x;
      const dy = e.clientY - this.prevMouse.y;
      const totalDist = Math.hypot(e.clientX - this.mouseStartPos.x, e.clientY - this.mouseStartPos.y);
      if (totalDist > 6) this.hasMovedSignificantly = true;

      if (this.dragButton === 0 && !e.shiftKey) {
        // Left-click Drag: True 3D Orbit (horizontal 360°) & Tilt (vertical inclination)
        this.targetTheta -= dx * 0.0055;
        this.targetPhi = Math.max(0.08, Math.min(Math.PI - 0.08, this.targetPhi - dy * 0.0055));
      } else {
        // Right-click Drag, Middle-click Drag, or Shift+Left Drag: 3D Pan across every location
        const panSpeed = (this.orbitRadius / 750) * 0.85;
        const vRight = new THREE.Vector3();
        const vUp = new THREE.Vector3();
        this.camera.matrixWorld.extractBasis(vRight, vUp, new THREE.Vector3());

        this.targetLookAt.addScaledVector(vRight, -dx * panSpeed);
        this.targetLookAt.addScaledVector(vUp, dy * panSpeed);

        this.targetLookAt.y = Math.max(-2350, Math.min(250, this.targetLookAt.y));
        this.targetLookAt.z = Math.max(-100, Math.min(3400, this.targetLookAt.z));

        if (this.onScrollTravel) this.onScrollTravel(this.targetLookAt);
      }

      this.prevMouse = { x: e.clientX, y: e.clientY };
    }

    // Raycast hover when not dragging
    if (!this.isDragging) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.interactiveObjects);
      if (intersects.length > 0) {
        const obj = intersects[0].object;
        const nd = obj.userData.nodeData;
        if (this.hoveredNode !== nd) {
          this.hoveredNode = nd;
          this.container.style.cursor = 'pointer';
          if (this.onNodeHover) this.onNodeHover(nd, e);
        }
      } else {
        if (this.hoveredNode) {
          this.hoveredNode = null;
          this.container.style.cursor = 'default';
          if (this.onNodeHover) this.onNodeHover(null, null);
        }
      }
    }
  }

  onClick(e) {
    if (this.hasMovedSignificantly) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects);
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      const nd = obj.userData.nodeData;
      if (this.onNodeClick) this.onNodeClick(nd);
    }
  }

  onWheel(e) {
    if (e.cancelable) e.preventDefault();
    const delta = e.deltaY;

    // 1. If holding Ctrl, Alt, Meta (or trackpad pinch-zoom): ZOOM IN / OUT at current location
    if (e.ctrlKey || e.metaKey || e.altKey) {
      this.targetOrbitRadius = Math.max(50, Math.min(1400, this.targetOrbitRadius + delta * 0.8));
      return;
    }

    // 2. If holding Shift: horizontal 3D pan
    if (e.shiftKey) {
      const vRight = new THREE.Vector3();
      this.camera.matrixWorld.extractBasis(vRight, new THREE.Vector3(), new THREE.Vector3());
      this.targetLookAt.addScaledVector(vRight, delta * 0.5);
      if (this.onScrollTravel) this.onScrollTravel(this.targetLookAt);
      return;
    }

    // 3. Natural Wheel: SCROLL DOWN AND UP across the entire cosmic tree timeline!
    // Scrolling DOWN (delta > 0) travels DOWN the tree:
    // Y descends from +140 down towards -2220, Z advances towards 3260.
    // Scrolling UP (delta < 0) travels back UP towards Brahman origin!
    const travelSpeed = 0.95;
    this.targetLookAt.y = Math.max(-2260, Math.min(180, this.targetLookAt.y - delta * 0.72 * travelSpeed));
    this.targetLookAt.z = Math.max(-50, Math.min(3300, this.targetLookAt.z + delta * 1.02 * travelSpeed));

    if (this.onScrollTravel) {
      this.onScrollTravel(this.targetLookAt);
    }
  }

  onTouchStart(e) {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      this.isDragging = true;
      this.hasTouchMoved = false;
      this.touchStartPos = { x: t.clientX, y: t.clientY };
      this.prevTouchPos = { x: t.clientX, y: t.clientY };
      this.touchStartTime = Date.now();
    } else if (e.touches.length === 2) {
      this.isDragging = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      this.initialPinchDistance = Math.hypot(dx, dy);
      this.prevPinchCenter = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2
      };
    }
  }

  onTouchMove(e) {
    if (e.cancelable) e.preventDefault();
    if (e.touches.length === 1 && this.isDragging) {
      const t = e.touches[0];
      const dx = t.clientX - this.prevTouchPos.x;
      const dy = t.clientY - this.prevTouchPos.y;
      const totalDist = Math.hypot(t.clientX - this.touchStartPos.x, t.clientY - this.touchStartPos.y);
      if (totalDist > 7) this.hasTouchMoved = true;

      // Single-finger touch: 3D Orbit & Tilt
      this.targetTheta -= dx * 0.006;
      this.targetPhi = Math.max(0.08, Math.min(Math.PI - 0.08, this.targetPhi - dy * 0.006));
      this.prevTouchPos = { x: t.clientX, y: t.clientY };
    } else if (e.touches.length === 2) {
      const t0 = e.touches[0], t1 = e.touches[1];
      const dx = t0.clientX - t1.clientX;
      const dy = t0.clientY - t1.clientY;
      const curDist = Math.hypot(dx, dy);

      // 1. Pinch zoom in and out at current location
      if (this.initialPinchDistance > 0) {
        const pinchDelta = (curDist - this.initialPinchDistance) * 1.5;
        this.targetOrbitRadius = Math.max(50, Math.min(1400, this.targetOrbitRadius - pinchDelta));
      }
      this.initialPinchDistance = curDist;

      // 2. Two-finger Pan up/down/left/right across every location
      const curCenter = { x: (t0.clientX + t1.clientX) / 2, y: (t0.clientY + t1.clientY) / 2 };
      if (this.prevPinchCenter) {
        const cdx = curCenter.x - this.prevPinchCenter.x;
        const cdy = curCenter.y - this.prevPinchCenter.y;
        const panSpeed = (this.orbitRadius / 700) * 0.75;
        const vRight = new THREE.Vector3();
        const vUp = new THREE.Vector3();
        this.camera.matrixWorld.extractBasis(vRight, vUp, new THREE.Vector3());
        this.targetLookAt.addScaledVector(vRight, -cdx * panSpeed);
        this.targetLookAt.addScaledVector(vUp, cdy * panSpeed);

        this.targetLookAt.y = Math.max(-2350, Math.min(250, this.targetLookAt.y));
        this.targetLookAt.z = Math.max(-100, Math.min(3400, this.targetLookAt.z));
        if (this.onScrollTravel) this.onScrollTravel(this.targetLookAt);
      }
      this.prevPinchCenter = curCenter;
    }
  }

  onTouchEnd(e) {
    if (!this.hasTouchMoved && (Date.now() - this.touchStartTime < 350)) {
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = ((this.touchStartPos.x - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((this.touchStartPos.y - rect.top) / rect.height) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.interactiveObjects);
      if (intersects.length > 0) {
        const obj = intersects[0].object;
        const nd = obj.userData.nodeData;
        if (this.onNodeClick) this.onNodeClick(nd);
      }
    }
    this.isDragging = false;
    this.initialPinchDistance = 0;
    this.prevPinchCenter = null;
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const dt = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Smooth lerping for orbital parameters
    this.orbitRadius += (this.targetOrbitRadius - this.orbitRadius) * 0.08;
    this.theta += (this.targetTheta - this.theta) * 0.08;
    this.phi += (this.targetPhi - this.phi) * 0.08;
    this.currentLookAt.lerp(this.targetLookAt, 0.06);

    // Compute camera position via spherical coordinates around currentLookAt
    const sinPhi = Math.sin(this.phi);
    const cosPhi = Math.cos(this.phi);
    const sinTheta = Math.sin(this.theta);
    const cosTheta = Math.cos(this.theta);

    const camX = this.currentLookAt.x + this.orbitRadius * sinPhi * sinTheta;
    const camY = this.currentLookAt.y + this.orbitRadius * cosPhi;
    const camZ = this.currentLookAt.z + this.orbitRadius * sinPhi * cosTheta;

    this.camera.position.set(camX, camY, camZ);
    this.camera.lookAt(this.currentLookAt);

    // Rotate node emblems
    this.nodeMeshes.forEach(grp => {
      grp.children.forEach(ch => {
        if (ch.isGroup) ch.rotation.z += 0.015;
      });
    });

    if (this.particles) {
      this.particles.rotation.y = time * 0.008;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// ============================================================
// COMPREHENSIVE BILINGUAL I18N DICTIONARY (Modern Hindi Default)
// ============================================================
`;

html = html.slice(0, scene3DOldStart) + scene3DNew + html.slice(scene3DOldEnd);
console.log('Step 5 complete: SacredScene3D upgraded with true 3D orbit, tilt, scroll, and pan.');

// 6. UPDATE APP INITIALIZATION WIRING
const wiringOld = `    // Function to manually jump to node by index
    function selectNodeByIndex(idx, openModal = false) {
      if (idx < 0) idx = 0;
      if (idx >= TREE_DATA.length) idx = TREE_DATA.length - 1;
      currentNodeIndex = idx;
      const node = TREE_DATA[idx];
      slider.value = idx;
      const isHi = window.currentLang === 'hi';
      const nodeTitle = (isHi && node.title_hi) ? node.title_hi : node.title;
      counter.textContent = \`\${idx + 1}/77: \${nodeTitle}\`;
      const prefix = isHi ? I18N.hi.breadcrumbPrefix : I18N.en.breadcrumbPrefix;
      document.getElementById('breadcrumb-current').textContent = prefix + nodeTitle + (node.sanskrit ? ' (' + node.sanskrit + ')' : '');
      scene3D.flyToNode(node);
      if (openModal) modal.show(node, ALL_NODES_MAP);
    }

    // Manual slider & stepper controls (100% user-directed)
    slider.addEventListener('input', (e) => {
      selectNodeByIndex(parseInt(e.target.value, 10), false);
    });

    btnPrev.addEventListener('click', () => {
      selectNodeByIndex(currentNodeIndex - 1, false);
    });

    btnNext.addEventListener('click', () => {
      selectNodeByIndex(currentNodeIndex + 1, false);
    });`;

const wiringNew = `    // Function to manually jump to node by index
    function selectNodeByIndex(idx, openModal = false) {
      if (idx < 0) idx = 0;
      if (idx >= TREE_DATA.length) idx = TREE_DATA.length - 1;
      currentNodeIndex = idx;
      const node = TREE_DATA[idx];
      if (slider) slider.value = idx;
      const isHi = window.currentLang === 'hi';
      const nodeTitle = (isHi && node.title_hi) ? node.title_hi : node.title;
      if (counter) counter.textContent = \`\${idx + 1}/77: \${nodeTitle}\`;
      const prefix = isHi ? I18N.hi.breadcrumbPrefix : I18N.en.breadcrumbPrefix;
      const bc = document.getElementById('breadcrumb-current');
      if (bc) bc.textContent = prefix + nodeTitle + (node.sanskrit ? ' (' + node.sanskrit + ')' : '');
      scene3D.flyToNode(node);
      if (openModal) modal.show(node, ALL_NODES_MAP);
    }

    // Stepper controls
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        selectNodeByIndex(currentNodeIndex - 1, false);
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        selectNodeByIndex(currentNodeIndex + 1, false);
      });
    }

    if (slider) {
      slider.addEventListener('input', (e) => {
        selectNodeByIndex(parseInt(e.target.value, 10), false);
      });
    }

    // Tap counter pill to open details
    if (counter) {
      counter.addEventListener('click', () => {
        const cur = TREE_DATA[currentNodeIndex];
        if (cur) modal.show(cur, ALL_NODES_MAP);
      });
    }

    // Sync header counter and breadcrumb when scrolling/panning in 3D
    scene3D.onScrollTravel = (focalPoint) => {
      let closestDist = Infinity;
      let closestIdx = 0;
      for (let i = 0; i < TREE_DATA.length; i++) {
        const n = TREE_DATA[i];
        const dy = n.y - focalPoint.y;
        const dz = n.z - focalPoint.z;
        const distSq = dy * dy + dz * dz;
        if (distSq < closestDist) {
          closestDist = distSq;
          closestIdx = i;
        }
      }
      if (closestIdx !== currentNodeIndex) {
        currentNodeIndex = closestIdx;
        const node = TREE_DATA[closestIdx];
        const isHi = window.currentLang === 'hi';
        const nodeTitle = (isHi && node.title_hi) ? node.title_hi : node.title;
        if (counter) counter.textContent = \`\${closestIdx + 1}/77: \${nodeTitle}\`;
        const prefix = isHi ? I18N.hi.breadcrumbPrefix : I18N.en.breadcrumbPrefix;
        const bc = document.getElementById('breadcrumb-current');
        if (bc) bc.textContent = prefix + nodeTitle + (node.sanskrit ? ' (' + node.sanskrit + ')' : '');
      }
    };`;

if (!html.includes(wiringOld)) {
  console.error('ERROR: wiringOld not found in html');
  process.exit(1);
}
html = html.replace(wiringOld, wiringNew);
console.log('Step 6 complete: App initialization wiring updated.');

// 7. UPDATE BOTTOM DECK BUTTON LISTENERS & LANGUAGE TOGGLE UPDATES
const bottomButtonsOld = `    // 9. Bottom Deck Buttons
    document.getElementById('btn-zoom-in').addEventListener('click', () => {
      scene3D.targetCameraPos.z = Math.max(-150, scene3D.targetCameraPos.z - 120);
    });
    document.getElementById('btn-zoom-out').addEventListener('click', () => {
      scene3D.targetCameraPos.z = Math.min(3800, scene3D.targetCameraPos.z + 120);
    });
    document.getElementById('btn-step-back').addEventListener('click', () => {
      selectNodeByIndex(0, false);
    });
    document.getElementById('btn-inspect-current').addEventListener('click', () => {
      const cur = TREE_DATA[currentNodeIndex];
      if (cur) modal.show(cur, ALL_NODES_MAP);
    });`;

const bottomButtonsNew = `    // 9. Header 3D Navigation & Action Buttons
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnStepBack = document.getElementById('btn-step-back');
    const btnInspect = document.getElementById('btn-inspect-current');

    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        scene3D.targetOrbitRadius = Math.max(50, scene3D.targetOrbitRadius - 70);
      });
    }
    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        scene3D.targetOrbitRadius = Math.min(1400, scene3D.targetOrbitRadius + 70);
      });
    }
    if (btnStepBack) {
      btnStepBack.addEventListener('click', () => {
        selectNodeByIndex(0, false);
        scene3D.targetTheta = 0;
        scene3D.targetPhi = Math.PI * 0.44;
      });
    }
    if (btnInspect) {
      btnInspect.addEventListener('click', () => {
        const cur = TREE_DATA[currentNodeIndex];
        if (cur) modal.show(cur, ALL_NODES_MAP);
      });
    }`;

if (!html.includes(bottomButtonsOld)) {
  console.error('ERROR: bottomButtonsOld not found in html');
  process.exit(1);
}
html = html.replace(bottomButtonsOld, bottomButtonsNew);
console.log('Step 7 complete: Header action buttons wired.');

// Update language toggle text targets to match .btn-text
const langUpdateOld = `        // Update bottom HUD
        const btnPrevEl = document.getElementById('btn-prev-node');
        const btnNextEl = document.getElementById('btn-next-node');
        const btnStepBackEl = document.querySelector('#btn-step-back span');
        const btnInspectEl = document.querySelector('#btn-inspect-current span');
        if (btnPrevEl) { btnPrevEl.textContent = dict.prevBtn; btnPrevEl.title = dict.prevTitle; }
        if (btnNextEl) { btnNextEl.textContent = dict.nextBtn; btnNextEl.title = dict.nextTitle; }
        if (btnStepBackEl) { btnStepBackEl.textContent = dict.rootBtn; document.getElementById('btn-step-back').title = dict.rootTitle; }
        if (btnInspectEl) { btnInspectEl.textContent = dict.inspectBtn; document.getElementById('btn-inspect-current').title = dict.inspectTitle; }`;

const langUpdateNew = `        // Update header buttons
        const btnPrevEl = document.getElementById('btn-prev-node');
        const btnNextEl = document.getElementById('btn-next-node');
        const btnStepBackEl = document.querySelector('#btn-step-back .btn-text') || document.querySelector('#btn-step-back span');
        const btnInspectEl = document.querySelector('#btn-inspect-current .btn-text') || document.querySelector('#btn-inspect-current span');
        if (btnPrevEl) { btnPrevEl.textContent = dict.prevBtn; btnPrevEl.title = dict.prevTitle; }
        if (btnNextEl) { btnNextEl.textContent = dict.nextBtn; btnNextEl.title = dict.nextTitle; }
        if (btnStepBackEl) { btnStepBackEl.textContent = dict.rootBtn; const sb = document.getElementById('btn-step-back'); if (sb) sb.title = dict.rootTitle; }
        if (btnInspectEl) { btnInspectEl.textContent = dict.inspectBtn; const ic = document.getElementById('btn-inspect-current'); if (ic) ic.title = dict.inspectTitle; }`;

if (html.includes(langUpdateOld)) {
  html = html.replace(langUpdateOld, langUpdateNew);
  console.log('Step 8 complete: Language toggle updated.');
}

// Write updated content back with LF line endings
fs.writeFileSync(filePath, html, { encoding: 'utf8' });
console.log('Successfully written updated index.html! New length:', html.length);
