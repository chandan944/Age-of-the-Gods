/**
 * Chronological 3D Timeline & Cosmos Engine (Three.js)
 * Implements a sequential chronological cosmic spine,
 * smooth path-based timeline scrolling, rotating sacred emblems,
 * and high-resolution crisp billboard nodes with zero emojis.
 */

export class SacredScene3D {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-9999, -9999);

    this.nodeMeshes = new Map(); // id -> THREE.Group
    this.connectionLines = [];
    this.interactiveObjects = [];
    this.hoveredNode = null;
    this.selectedNode = null;

    this.particleSystem = null;
    this.sacredEmblems = [];
    this.spineCurve = null;
    this.spineMesh = null;
    this.milestoneRings = [];

    // Timeline Path Navigation
    this.timelineProgress = 0.05; // 0.0 to 1.0 along spine
    this.targetTimelineProgress = 0.05;

    this.onNodeClick = null;
    this.onNodeHover = null;

    this.init();
  }

  init() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060608);
    this.scene.fog = new THREE.FogExp2(0x060608, 0.0012);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 4000);
    this.camera.position.set(0, 70, 320);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const saffronSun = new THREE.PointLight(0xff7700, 3.2, 2200);
    saffronSun.position.set(100, 250, 150);
    this.scene.add(saffronSun);

    const goldFill = new THREE.PointLight(0xff9933, 2.2, 2200);
    goldFill.position.set(-150, -100, -300);
    this.scene.add(goldFill);

    const whiteKey = new THREE.DirectionalLight(0xffffff, 1.4);
    whiteKey.position.set(0, 300, 400);
    this.scene.add(whiteKey);

    // 5. Build Background Cosmic Dust Galaxy
    this.buildParticleGalaxy();

    // 6. Build Chronological 3D Spine
    this.buildChronologicalSpine();

    // 7. Event Listeners
    window.addEventListener('resize', () => this.onWindowResize());
    this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.container.addEventListener('click', (e) => this.onClick(e));

    // Animation Loop
    this.clock = new THREE.Clock();
    this.animate();
  }

  buildParticleGalaxy() {
    const count = 3200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const saffron = new THREE.Color(0xff7700);
    const white = new THREE.Color(0xffffff);
    const gold = new THREE.Color(0xffb74d);

    for (let i = 0; i < count; i++) {
      const z = (Math.random() - 0.5) * 2200;
      const radius = 60 + Math.random() * 450;
      const angle = Math.random() * Math.PI * 2;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * (radius * 0.45) + (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = z;

      const r = Math.random();
      const c = r < 0.45 ? saffron : (r < 0.75 ? white : gold);

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  buildChronologicalSpine() {
    // Chronological path extending deep along the Z-axis with gentle serpentine elevation
    const spinePoints = [
      new THREE.Vector3(0, 80, 500),      // Primordial Brahman
      new THREE.Vector3(80, 50, 300),     // Satya Yuga
      new THREE.Vector3(-80, 20, 100),    // Tretā Yuga
      new THREE.Vector3(70, -10, -120),   // Dvāpara Yuga
      new THREE.Vector3(-60, -40, -340),  // Kali Yuga
      new THREE.Vector3(50, -60, -560),   // Creation Lineages
      new THREE.Vector3(-40, -80, -780),  // Scriptural Map
      new THREE.Vector3(30, -100, -1000), // Core Teachings
      new THREE.Vector3(0, -120, -1200)   // Astras & Renewal
    ];

    this.spineCurve = new THREE.CatmullRomCurve3(spinePoints);
    const tubeGeo = new THREE.TubeGeometry(this.spineCurve, 180, 3.2, 12, false);

    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xff7700,
      emissive: 0xff4400,
      emissiveIntensity: 0.5,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: true
    });

    this.spineMesh = new THREE.Mesh(tubeGeo, tubeMat);
    this.scene.add(this.spineMesh);

    // Glowing Conduit Core
    const coreGeo = new THREE.TubeGeometry(this.spineCurve, 120, 1.0, 8, false);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.scene.add(coreMesh);
  }

  createChakraMesh() {
    const group = new THREE.Group();
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xff9933,
      emissive: 0xff5500,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.2
    });

    const rim = new THREE.Mesh(new THREE.TorusGeometry(12, 0.7, 16, 48), goldMat);
    group.add(rim);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 23, 8), goldMat);
      spoke.rotation.z = angle;
      group.add(spoke);
    }

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.8, 1.2, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 }));
    hub.rotation.x = Math.PI / 2;
    group.add(hub);

    group.userData.isRotatingChakra = true;
    return group;
  }

  createTrishulaMesh() {
    const group = new THREE.Group();
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffaa33,
      emissive: 0xff6600,
      emissiveIntensity: 0.4,
      metalness: 0.85
    });

    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 28, 8), goldMat);
    group.add(shaft);

    const centerBlade = new THREE.Mesh(new THREE.ConeGeometry(1.4, 8, 8), goldMat);
    centerBlade.position.y = 16;
    group.add(centerBlade);

    const prongs = new THREE.Mesh(new THREE.TorusGeometry(5, 0.35, 8, 24, Math.PI), goldMat);
    prongs.position.y = 13;
    prongs.rotation.z = Math.PI;
    group.add(prongs);

    return group;
  }

  createLotusMesh() {
    const group = new THREE.Group();
    const saffronMat = new THREE.MeshStandardMaterial({
      color: 0xff7700,
      emissive: 0x992200,
      roughness: 0.3,
      side: THREE.DoubleSide
    });

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const petalShape = new THREE.Shape();
      petalShape.moveTo(0, 0);
      petalShape.quadraticCurveTo(3.5, 7, 0, 12);
      petalShape.quadraticCurveTo(-3.5, 7, 0, 0);

      const petal = new THREE.Mesh(new THREE.ShapeGeometry(petalShape), saffronMat);
      petal.rotation.y = angle;
      petal.rotation.x = Math.PI / 3.8;
      group.add(petal);
    }

    const center = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffaa00 })
    );
    group.add(center);

    return group;
  }

  /**
   * Ultra High-Definition Billboard Label in Black, White, and Saffron
   */
  createLabelSprite(title, sanskrit, timeLabel) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // Sacred Background Card
    ctx.fillStyle = "rgba(10, 10, 14, 0.92)";
    ctx.strokeStyle = "rgba(255, 119, 0, 0.9)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(16, 16, 992, 268, 28);
    ctx.fill();
    ctx.stroke();

    // Top Glowing Saffron Accent
    ctx.fillStyle = "#FF7700";
    ctx.fillRect(48, 16, 928, 6);

    // Sanskrit Subtitle
    if (sanskrit) {
      ctx.font = "italic 30px 'Outfit', sans-serif";
      ctx.fillStyle = "#FF9933";
      ctx.textAlign = "center";
      ctx.fillText(sanskrit, 512, 75);
    }

    // Main Title (No truncation)
    ctx.font = "bold 44px 'Cinzel', serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.fillText(title, 512, 150);

    // Time / Category Pill
    if (timeLabel) {
      ctx.font = "600 24px 'Outfit', sans-serif";
      ctx.fillStyle = "#C8C8C0";
      ctx.fillText(timeLabel, 512, 220);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(65, 19, 1);
    return sprite;
  }

  /**
   * Render nodes chronologically along the 3D Spine or in a sub-cluster
   */
  renderNodes(nodeList, parentCoords = null, radiusSpread = 90) {
    this.clearNodes();

    const count = nodeList.length;
    const isRootChronological = !parentCoords;

    nodeList.forEach((node, index) => {
      const nodeGroup = new THREE.Group();
      let posX = 0, posY = 0, posZ = 0;

      if (isRootChronological && this.spineCurve) {
        // Sample exact position along the chronological spine curve
        const t = Math.max(0.02, Math.min(0.98, index / Math.max(1, count - 1)));
        const pointOnCurve = this.spineCurve.getPointAt(t);

        // Stagger left and right across the spine for supreme readability (just like reference image!)
        const sideOffset = (index % 2 === 0 ? 1 : -1) * 38;
        posX = pointOnCurve.x + sideOffset;
        posY = pointOnCurve.y + 10;
        posZ = pointOnCurve.z;

        // Add a connector ring linking the spine directly to the node
        const connectorCurve = new THREE.LineCurve3(pointOnCurve, new THREE.Vector3(posX, posY, posZ));
        const connector = new THREE.Mesh(
          new THREE.TubeGeometry(connectorCurve, 8, 0.8, 6, false),
          new THREE.MeshBasicMaterial({ color: 0xff7700, transparent: true, opacity: 0.85 })
        );
        this.scene.add(connector);
        this.connectionLines.push(connector);

      } else {
        // Child event: distribute in a luminous radial mandala cluster around parent
        const center = parentCoords || { x: 0, y: 0, z: 0 };
        if (count === 1) {
          posX = center.x;
          posY = center.y;
          posZ = center.z;
        } else {
          const angle = (index / count) * Math.PI * 2;
          posX = center.x + Math.cos(angle) * radiusSpread;
          posY = center.y + Math.sin(angle) * (radiusSpread * 0.6);
          posZ = center.z + (index % 2 === 0 ? 15 : -15);
        }

        // Connective tendril to parent
        if (parentCoords) {
          const lineCurve = new THREE.LineCurve3(
            new THREE.Vector3(parentCoords.x, parentCoords.y, parentCoords.z),
            new THREE.Vector3(posX, posY, posZ)
          );
          const line = new THREE.Mesh(
            new THREE.TubeGeometry(lineCurve, 8, 0.6, 6, false),
            new THREE.MeshBasicMaterial({ color: 0xff9933, transparent: true, opacity: 0.7 })
          );
          this.scene.add(line);
          this.connectionLines.push(line);
        }
      }

      nodeGroup.position.set(posX, posY, posZ);

      // Core Glowing Orb
      const orbMesh = new THREE.Mesh(
        new THREE.SphereGeometry(6, 24, 24),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0xff7700,
          emissiveIntensity: 0.75,
          metalness: 0.7,
          roughness: 0.2
        })
      );
      orbMesh.userData = { nodeId: node.id, nodeData: node };
      nodeGroup.add(orbMesh);
      this.interactiveObjects.push(orbMesh);

      // Milestone Ring Gate
      const ringMesh = new THREE.Mesh(
        new THREE.RingGeometry(8, 9.4, 32),
        new THREE.MeshBasicMaterial({ color: 0xff7700, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
      );
      ringMesh.rotation.x = Math.PI / 2;
      nodeGroup.add(ringMesh);

      // Rotating 3D Emblem if defined
      let emblem = null;
      if (node.symbol3D === 'chakra') {
        emblem = this.createChakraMesh();
        emblem.scale.set(0.5, 0.5, 0.5);
        emblem.position.y = 12;
      } else if (node.symbol3D === 'trishula') {
        emblem = this.createTrishulaMesh();
        emblem.scale.set(0.45, 0.45, 0.45);
        emblem.position.y = 11;
      } else if (node.symbol3D === 'lotus') {
        emblem = this.createLotusMesh();
        emblem.scale.set(0.5, 0.5, 0.5);
        emblem.position.y = 9;
      }
      if (emblem) {
        nodeGroup.add(emblem);
        this.sacredEmblems.push(emblem);
      }

      // High-Definition Billboard Label Card
      const label = this.createLabelSprite(node.title, node.sanskrit, node.timeLabel || node.epoch);
      label.position.set(0, -18, 0);
      nodeGroup.add(label);

      this.scene.add(nodeGroup);
      this.nodeMeshes.set(node.id, nodeGroup);
    });
  }

  clearNodes() {
    this.nodeMeshes.forEach((group) => {
      this.scene.remove(group);
      group.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
    });
    this.nodeMeshes.clear();
    this.interactiveObjects = [];

    this.connectionLines.forEach((line) => {
      this.scene.remove(line);
      if (line.geometry) line.geometry.dispose();
      if (line.material) line.material.dispose();
    });
    this.connectionLines = [];
    this.sacredEmblems = [];
  }

  onMouseMove(e) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects);

    if (intersects.length > 0) {
      const target = intersects[0].object;
      if (this.hoveredNode !== target) {
        if (this.hoveredNode) this.resetNodeHover(this.hoveredNode);
        this.hoveredNode = target;
        this.applyNodeHover(target);
        this.container.style.cursor = 'pointer';
        if (this.onNodeHover) this.onNodeHover(target.userData.nodeData, e);
      }
    } else {
      if (this.hoveredNode) {
        this.resetNodeHover(this.hoveredNode);
        this.hoveredNode = null;
        this.container.style.cursor = 'default';
        if (this.onNodeHover) this.onNodeHover(null, e);
      }
    }
  }

  applyNodeHover(mesh) {
    mesh.material.emissiveIntensity = 1.6;
    mesh.scale.set(1.3, 1.3, 1.3);
  }

  resetNodeHover(mesh) {
    mesh.material.emissiveIntensity = 0.75;
    mesh.scale.set(1.0, 1.0, 1.0);
  }

  onClick(e) {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects);

    if (intersects.length > 0) {
      const target = intersects[0].object;
      const nodeData = target.userData.nodeData;
      if (this.onNodeClick) {
        this.onNodeClick(nodeData, target);
      }
    }
  }

  onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Rotate Galaxy Particles
    if (this.particleSystem) {
      this.particleSystem.rotation.y = elapsedTime * 0.02;
    }

    // Gently pulse the chronological spine
    if (this.spineMesh) {
      this.spineMesh.rotation.z = Math.sin(elapsedTime * 0.25) * 0.03;
    }

    // Animate rotating sacred emblems
    this.sacredEmblems.forEach(emblem => {
      if (emblem.userData && emblem.userData.isRotatingChakra) {
        emblem.rotation.z = elapsedTime * 1.4;
      } else {
        emblem.rotation.y = elapsedTime * 0.7;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }
}
