const fs = require('fs');
const path = require('path');

const filePath = path.resolve('index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. UPDATE CSS BACKGROUND VARS TO INKY JWST DEEP SPACE
html = html.replace(
  `  --bg-primary: #060608;
  --bg-secondary: #0c0c12;`,
  `  --bg-primary: #010103;
  --bg-secondary: #040408;`
);

// 2. LOCATE SacredScene3D IN index.html
const initMarkerOld = `    this.scene = new THREE.Scene();
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
    this.buildCyclicReturnArc();`;

const initMarkerNew = `    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x010103);
    this.scene.fog = new THREE.FogExp2(0x010103, 0.00012);

    this.camera = new THREE.PerspectiveCamera(50, w / h, 1, 10000);
    this.camera.position.set(0, 160, 400);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.container.appendChild(this.renderer.domElement);

    // Deep Space Lighting
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const sun = new THREE.PointLight(0xff7700, 3.6, 4500);
    sun.position.set(80, 200, 300);
    this.scene.add(sun);
    const fill = new THREE.PointLight(0xff9933, 2.5, 4500);
    fill.position.set(-150, -100, -200);
    this.scene.add(fill);
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(0, 400, 500);
    this.scene.add(dir);

    // Build JWST Deep Space Environment
    this.buildDeepSpaceDome();
    this.buildDeepFieldGalaxies();
    this.buildCosmicParticles();
    this.buildTreeIn3D();
    this.buildCyclicReturnArc();`;

if (!html.includes(initMarkerOld)) {
  console.error('ERROR: initMarkerOld not found');
  process.exit(1);
}
html = html.replace(initMarkerOld, initMarkerNew);
console.log('Step 1: SacredScene3D init updated with deep space background and fog.');

// 3. REPLACE buildCosmicParticles & ADD buildDeepSpaceDome + buildDeepFieldGalaxies
const oldParticlesMarker = `  buildCosmicParticles() {
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
  }`;

const newSpaceEnvironmentMethods = `  buildDeepSpaceDome() {
    // Panoramic Skydome mapped with the JWST Deep Space field image
    const loader = new THREE.TextureLoader();
    loader.load('assets/images/deep_space.png', (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 2);
      const skyGeo = new THREE.SphereGeometry(4600, 36, 24);
      const skyMat = new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.BackSide,
        depthWrite: false,
        depthTest: false
      });
      this.skyDome = new THREE.Mesh(skyGeo, skyMat);
      this.scene.add(this.skyDome);
    });
  }

  createJWSTSpikeStarTexture() {
    const c = document.createElement('canvas');
    c.width = 128; c.height = 128;
    const ctx = c.getContext('2d');
    const cx = 64, cy = 64;

    // Glowing core
    const rad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
    rad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    rad.addColorStop(0.18, 'rgba(215, 235, 255, 0.9)');
    rad.addColorStop(0.45, 'rgba(100, 160, 255, 0.3)');
    rad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, 128, 128);

    // JWST 6-point razor diffraction spikes
    const drawSpike = (angle, len, width, alpha) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const spGrad = ctx.createLinearGradient(0, -width/2, 0, width/2);
      spGrad.addColorStop(0, 'rgba(255,255,255,0)');
      spGrad.addColorStop(0.5, \`rgba(215, 240, 255, \${alpha})\`);
      spGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = spGrad;
      ctx.beginPath();
      ctx.moveTo(-len, 0);
      ctx.lineTo(0, width/2);
      ctx.lineTo(len, 0);
      ctx.lineTo(0, -width/2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    for (let i = 0; i < 3; i++) {
      const a = (i * Math.PI) / 3;
      drawSpike(a, 62, 2.6, 0.95);
      drawSpike(a, 42, 4.2, 0.4);
    }
    // Horizontal secondary ray
    drawSpike(Math.PI / 2, 52, 1.8, 0.7);

    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }

  createSpiralGalaxyTexture() {
    const c = document.createElement('canvas');
    c.width = 128; c.height = 128;
    const ctx = c.getContext('2d');
    const cx = 64, cy = 64;

    // Luminous golden nucleus
    const rad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
    rad.addColorStop(0, 'rgba(255, 250, 220, 1)');
    rad.addColorStop(0.18, 'rgba(255, 185, 80, 0.85)');
    rad.addColorStop(0.45, 'rgba(215, 95, 30, 0.32)');
    rad.addColorStop(0.8, 'rgba(140, 40, 15, 0.1)');
    rad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, 128, 128);

    // Tilted edge-on spiral dust disk (matching reference image)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI * 0.22);
    ctx.scale(2.2, 0.45);
    const diskGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 28);
    diskGrad.addColorStop(0, 'rgba(255, 215, 130, 0.75)');
    diskGrad.addColorStop(0.45, 'rgba(240, 120, 45, 0.3)');
    diskGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = diskGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }

  createEllipticalGalaxyTexture() {
    const c = document.createElement('canvas');
    c.width = 128; c.height = 128;
    const ctx = c.getContext('2d');
    const cx = 64, cy = 64;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-Math.PI * 0.15);
    ctx.scale(1.6, 0.75);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 36);
    grad.addColorStop(0, 'rgba(255, 240, 200, 1)');
    grad.addColorStop(0.2, 'rgba(255, 170, 70, 0.8)');
    grad.addColorStop(0.5, 'rgba(210, 80, 25, 0.28)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }

  buildDeepFieldGalaxies() {
    this.deepFieldGroup = new THREE.Group();
    const spikeTex = this.createJWSTSpikeStarTexture();
    const spiralTex = this.createSpiralGalaxyTexture();
    const ellipticalTex = this.createEllipticalGalaxyTexture();

    const spikeMat = new THREE.SpriteMaterial({ map: spikeTex, transparent: true, blending: THREE.AdditiveBlending, opacity: 0.88 });
    const spiralMat = new THREE.SpriteMaterial({ map: spiralTex, transparent: true, blending: THREE.AdditiveBlending, opacity: 0.75 });
    const ellipticalMat = new THREE.SpriteMaterial({ map: ellipticalTex, transparent: true, blending: THREE.AdditiveBlending, opacity: 0.8 });

    // Scatter 75 distinct deep space galaxies with 3D depth and parallax
    for (let i = 0; i < 75; i++) {
      const isSpiral = Math.random() < 0.6;
      const sp = new THREE.Sprite(isSpiral ? spiralMat : ellipticalMat);
      const angle = Math.random() * Math.PI * 2;
      const radius = 250 + Math.random() * 950;
      sp.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2800 - 800,
        Math.random() * 4000 - 600
      );
      const s = 14 + Math.random() * 32;
      sp.scale.set(s, s * (isSpiral ? 0.75 : 0.6), 1);
      this.deepFieldGroup.add(sp);
    }

    // Scatter 45 brilliant JWST diffraction spike stars
    for (let i = 0; i < 45; i++) {
      const sp = new THREE.Sprite(spikeMat);
      const angle = Math.random() * Math.PI * 2;
      const radius = 180 + Math.random() * 1100;
      sp.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2800 - 800,
        Math.random() * 3800 - 500
      );
      const s = 18 + Math.random() * 36;
      sp.scale.set(s, s, 1);
      this.deepFieldGroup.add(sp);
    }

    this.scene.add(this.deepFieldGroup);
  }

  buildCosmicParticles() {
    // 6,500 multi-spectral deep-field redshifted star particles
    const count = 6500;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3), col = new Float32Array(count * 3);

    const cRedshift = new THREE.Color(0xff5522); // Distant redshifted infant galaxies
    const cAmber = new THREE.Color(0xff9933);    // Warm galactic dust
    const cGold = new THREE.Color(0xffcc66);     // Solar type stars
    const cWhite = new THREE.Color(0xffffff);    // Bright foreground stars
    const cBlue = new THREE.Color(0x99ccff);     // High temp O-type stars

    for (let i = 0; i < count; i++) {
      const z = Math.random() * 4400 - 700;
      const r = 50 + Math.random() * 920;
      const a = Math.random() * Math.PI * 2;
      pos[i*3] = Math.cos(a) * r;
      pos[i*3+1] = Math.sin(a) * (r * 0.45) - (z * 0.42);
      pos[i*3+2] = z;

      const rnd = Math.random();
      let c;
      if (rnd < 0.40) c = cRedshift;
      else if (rnd < 0.65) c = cAmber;
      else if (rnd < 0.82) c = cGold;
      else if (rnd < 0.93) c = cWhite;
      else c = cBlue;

      col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size: 2.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending
    });
    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }`;

if (!html.includes(oldParticlesMarker)) {
  console.error('ERROR: oldParticlesMarker not found');
  process.exit(1);
}
html = html.replace(oldParticlesMarker, newSpaceEnvironmentMethods);
console.log('Step 2: buildDeepSpaceDome, buildDeepFieldGalaxies, and astronomical particles added.');

// 4. ANIMATE ROTATION OF SKYDOME & DEEP FIELD GALAXIES
const oldAnimateParticles = `    if (this.particles) {
      this.particles.rotation.y = time * 0.008;
    }`;

const newAnimateParticles = `    if (this.particles) {
      this.particles.rotation.y = time * 0.006;
    }
    if (this.skyDome) {
      this.skyDome.rotation.y += 0.00008;
    }
    if (this.deepFieldGroup) {
      this.deepFieldGroup.rotation.y = time * 0.003;
    }`;

if (!html.includes(oldAnimateParticles)) {
  console.error('ERROR: oldAnimateParticles not found');
  process.exit(1);
}
html = html.replace(oldAnimateParticles, newAnimateParticles);
console.log('Step 3: Animation loop updated with deep space sky rotation.');

fs.writeFileSync(filePath, html, { encoding: 'utf8' });
console.log('SUCCESS! index.html updated with authentic JWST Deep Space environment! New length:', html.length);
