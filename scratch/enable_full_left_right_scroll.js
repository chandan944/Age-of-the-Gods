const fs = require('fs');
const path = require('path');

const filePath = path.resolve('index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. ADD HEADER NAV ARROWS & UPDATE HEADER CONTAINER CSS
const oldHeaderGroupCss = `/* ===== HEADER: STRICTLY ONE ROW WITH ONLY 4% HEIGHT ===== */
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

/* Horizontal scroll indicator buttons */
.header-nav-arrow {
  height: 100%;
  width: 22px;
  min-width: 22px;
  background: rgba(14, 14, 22, 0.92);
  border: none;
  border-right: 1px solid rgba(255, 119, 0, 0.25);
  color: var(--saffron-bright);
  font-size: 17px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  padding: 0;
  flex-shrink: 0;
  user-select: none;
}

.header-nav-arrow.right {
  border-right: none;
  border-left: 1px solid rgba(255, 119, 0, 0.25);
}

.header-nav-arrow:hover, .header-nav-arrow:active {
  background: rgba(255, 119, 0, 0.3);
  color: #FFFFFF;
  box-shadow: 0 0 10px var(--saffron-glow);
}`;

if (!html.includes(oldHeaderGroupCss)) {
  console.error('ERROR: oldHeaderGroupCss not found');
  process.exit(1);
}
html = html.replace(oldHeaderGroupCss, newHeaderGroupCss);
console.log('Step 1: Header arrow styles added.');

// 2. ADD ARROW BUTTONS TO HTML STRUCTURE IN UI-HEADER-GROUP
const oldHeaderGroupHtml = `    <div class="ui-header-group">
      <!-- Single Scrollable Header Row with All Features and Buttons -->
      <header class="top-header" id="main-header-row">`;

const newHeaderGroupHtml = `    <div class="ui-header-group">
      <button class="header-nav-arrow left" id="header-scroll-left" title="बाएं स्क्रॉल करें (Scroll Left)">‹</button>
      <!-- Single Scrollable Header Row with All Features and Buttons -->
      <header class="top-header" id="main-header-row">`;

const oldHeaderEndHtml = `      </header>

      <div id="breadcrumbs-bar" style="display:none;"><span id="breadcrumb-current"></span></div>
    </div>`;

const newHeaderEndHtml = `      </header>
      <button class="header-nav-arrow right" id="header-scroll-right" title="दाएं स्क्रॉल करें (Scroll Right)">›</button>

      <div id="breadcrumbs-bar" style="display:none;"><span id="breadcrumb-current"></span></div>
    </div>`;

if (!html.includes(oldHeaderGroupHtml) || !html.includes(oldHeaderEndHtml)) {
  console.error('ERROR: Header group HTML markers not found');
  process.exit(1);
}
html = html.replace(oldHeaderGroupHtml, newHeaderGroupHtml);
html = html.replace(oldHeaderEndHtml, newHeaderEndHtml);
console.log('Step 2: Header scroll arrows added to HTML.');

// 3. UPGRADE SacredScene3D: SEAMLESS LEFT/RIGHT SCROLLING & PANNING IN 3D
const oldMouseMoveCode = `    if (this.isDragging) {
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
    }`;

const newMouseMoveCode = `    if (this.isDragging) {
      const dx = e.clientX - this.prevMouse.x;
      const dy = e.clientY - this.prevMouse.y;
      const totalDist = Math.hypot(e.clientX - this.mouseStartPos.x, e.clientY - this.mouseStartPos.y);
      if (totalDist > 5) this.hasMovedSignificantly = true;

      const panSpeed = (this.orbitRadius / 650) * 0.9;
      const vRight = new THREE.Vector3();
      const vUp = new THREE.Vector3();
      this.camera.matrixWorld.extractBasis(vRight, vUp, new THREE.Vector3());

      // Direct Left/Right and Up/Down pan across the cosmos
      this.targetLookAt.addScaledVector(vRight, -dx * panSpeed);
      this.targetLookAt.addScaledVector(vUp, dy * panSpeed);

      // Subtle natural rotational parallax when scrolling left and right
      this.targetTheta -= dx * 0.0018;
      this.targetPhi = Math.max(0.08, Math.min(Math.PI - 0.08, this.targetPhi - dy * 0.0018));

      this.targetLookAt.x = Math.max(-650, Math.min(650, this.targetLookAt.x));
      this.targetLookAt.y = Math.max(-2350, Math.min(250, this.targetLookAt.y));
      this.targetLookAt.z = Math.max(-100, Math.min(3400, this.targetLookAt.z));

      if (this.onScrollTravel) this.onScrollTravel(this.targetLookAt);
      this.prevMouse = { x: e.clientX, y: e.clientY };
    }`;

if (!html.includes(oldMouseMoveCode)) {
  console.error('ERROR: oldMouseMoveCode not found');
  process.exit(1);
}
html = html.replace(oldMouseMoveCode, newMouseMoveCode);
console.log('Step 3: 3D Mouse drag updated for direct Left/Right scrolling.');

// 4. UPGRADE onWheel FOR DUAL-AXIS SCROLLING (Left/Right & Up/Down)
const oldWheelCode = `  onWheel(e) {
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
  }`;

const newWheelCode = `  onWheel(e) {
    if (e.cancelable) e.preventDefault();

    // 1. Zoom in/out at current location (Ctrl / Meta / Alt / pinch)
    if (e.ctrlKey || e.metaKey || e.altKey) {
      this.targetOrbitRadius = Math.max(50, Math.min(1400, this.targetOrbitRadius + e.deltaY * 0.8));
      return;
    }

    // 2. Scroll Left & Right across the 3D cosmos (Horizontal wheel or Shift + wheel)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      const hDelta = e.shiftKey ? e.deltaY : e.deltaX;
      const vRight = new THREE.Vector3();
      this.camera.matrixWorld.extractBasis(vRight, new THREE.Vector3(), new THREE.Vector3());
      this.targetLookAt.addScaledVector(vRight, hDelta * 0.75);
      this.targetLookAt.x = Math.max(-650, Math.min(650, this.targetLookAt.x));
      if (this.onScrollTravel) this.onScrollTravel(this.targetLookAt);
      return;
    }

    // 3. Scroll Down & Up along the cosmic tree trajectory
    const travelSpeed = 0.95;
    this.targetLookAt.y = Math.max(-2260, Math.min(180, this.targetLookAt.y - e.deltaY * 0.72 * travelSpeed));
    this.targetLookAt.z = Math.max(-50, Math.min(3300, this.targetLookAt.z + e.deltaY * 1.02 * travelSpeed));

    if (this.onScrollTravel) {
      this.onScrollTravel(this.targetLookAt);
    }
  }`;

if (!html.includes(oldWheelCode)) {
  console.error('ERROR: oldWheelCode not found');
  process.exit(1);
}
html = html.replace(oldWheelCode, newWheelCode);
console.log('Step 4: 3D Wheel scroll upgraded with Left/Right sensitivity.');

// 5. UPGRADE onTouchMove FOR DIRECT TOUCH SCROLLING IN ALL DIRECTIONS
const oldTouchCode = `    if (e.touches.length === 1 && this.isDragging) {
      const t = e.touches[0];
      const dx = t.clientX - this.prevTouchPos.x;
      const dy = t.clientY - this.prevTouchPos.y;
      const totalDist = Math.hypot(t.clientX - this.touchStartPos.x, t.clientY - this.touchStartPos.y);
      if (totalDist > 7) this.hasTouchMoved = true;

      // Single-finger touch: 3D Orbit & Tilt
      this.targetTheta -= dx * 0.006;
      this.targetPhi = Math.max(0.08, Math.min(Math.PI - 0.08, this.targetPhi - dy * 0.006));
      this.prevTouchPos = { x: t.clientX, y: t.clientY };
    }`;

const newTouchCode = `    if (e.touches.length === 1 && this.isDragging) {
      const t = e.touches[0];
      const dx = t.clientX - this.prevTouchPos.x;
      const dy = t.clientY - this.prevTouchPos.y;
      const totalDist = Math.hypot(t.clientX - this.touchStartPos.x, t.clientY - this.touchStartPos.y);
      if (totalDist > 6) this.hasTouchMoved = true;

      const panSpeed = (this.orbitRadius / 600) * 0.85;
      const vRight = new THREE.Vector3();
      const vUp = new THREE.Vector3();
      this.camera.matrixWorld.extractBasis(vRight, vUp, new THREE.Vector3());

      // Single touch scrolls directly Left, Right, Up, and Down in 3D
      this.targetLookAt.addScaledVector(vRight, -dx * panSpeed);
      this.targetLookAt.addScaledVector(vUp, dy * panSpeed);

      this.targetTheta -= dx * 0.002;
      this.targetPhi = Math.max(0.08, Math.min(Math.PI - 0.08, this.targetPhi - dy * 0.002));

      this.targetLookAt.x = Math.max(-650, Math.min(650, this.targetLookAt.x));
      this.targetLookAt.y = Math.max(-2350, Math.min(250, this.targetLookAt.y));
      this.targetLookAt.z = Math.max(-100, Math.min(3400, this.targetLookAt.z));

      if (this.onScrollTravel) this.onScrollTravel(this.targetLookAt);
      this.prevTouchPos = { x: t.clientX, y: t.clientY };
    }`;

if (!html.includes(oldTouchCode)) {
  console.error('ERROR: oldTouchCode not found');
  process.exit(1);
}
html = html.replace(oldTouchCode, newTouchCode);
console.log('Step 5: Single-touch drag updated for direct Left/Right scrolling.');

// 6. WIRE UP HEADER ROW MOUSE WHEEL, DRAG-SCROLL, AND ARROWS
const oldWiringMarker = `    // Tap counter pill to open details
    if (counter) {
      counter.addEventListener('click', () => {
        const cur = TREE_DATA[currentNodeIndex];
        if (cur) modal.show(cur, ALL_NODES_MAP);
      });
    }`;

const newWiringCode = `    // Tap counter pill to open details
    if (counter) {
      counter.addEventListener('click', () => {
        const cur = TREE_DATA[currentNodeIndex];
        if (cur) modal.show(cur, ALL_NODES_MAP);
      });
    }

    // Header Row Left & Right Scrolling Wiring
    const headerRow = document.getElementById('main-header-row');
    const btnScrollLeft = document.getElementById('header-scroll-left');
    const btnScrollRight = document.getElementById('header-scroll-right');

    if (btnScrollLeft && headerRow) {
      btnScrollLeft.addEventListener('click', () => {
        headerRow.scrollBy({ left: -220, behavior: 'smooth' });
      });
    }

    if (btnScrollRight && headerRow) {
      btnScrollRight.addEventListener('click', () => {
        headerRow.scrollBy({ left: 220, behavior: 'smooth' });
      });
    }

    // Convert mouse wheel on header to horizontal scroll
    if (headerRow) {
      headerRow.addEventListener('wheel', (e) => {
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (delta !== 0) {
          e.preventDefault();
          headerRow.scrollLeft += delta * 1.3;
        }
      }, { passive: false });

      // Click and drag to scroll header with mouse
      let isHDragging = false;
      let startX = 0;
      let scrollLeft = 0;

      headerRow.addEventListener('mousedown', (e) => {
        if (e.target.closest('button, input, a')) return;
        isHDragging = true;
        startX = e.pageX - headerRow.offsetLeft;
        scrollLeft = headerRow.scrollLeft;
        headerRow.style.cursor = 'grabbing';
      });

      window.addEventListener('mouseup', () => {
        isHDragging = false;
        if (headerRow) headerRow.style.cursor = 'default';
      });

      headerRow.addEventListener('mousemove', (e) => {
        if (!isHDragging) return;
        e.preventDefault();
        const x = e.pageX - headerRow.offsetLeft;
        const walk = (x - startX) * 1.6;
        headerRow.scrollLeft = scrollLeft - walk;
      });
    }`;

if (!html.includes(oldWiringMarker)) {
  console.error('ERROR: oldWiringMarker not found');
  process.exit(1);
}
html = html.replace(oldWiringMarker, newWiringCode);
console.log('Step 6: Header row left/right scroll listeners wired.');

fs.writeFileSync(filePath, html, { encoding: 'utf8' });
console.log('SUCCESS! index.html updated for complete Left & Right scrolling in both Header & 3D Cosmos. New length:', html.length);
