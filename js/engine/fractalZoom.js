/**
 * Fractal Zoom & Timeline Scroll Engine
 * Implements smooth chronological timeline scrolling along the 3D spine
 * and recursive fractal drill-down into sub-events.
 */

import { TIMELINE_DATA, findNodeById } from '../data/timelineData.js';

export class FractalZoomEngine {
  constructor(scene3D, onStateChange) {
    this.scene = scene3D;
    this.onStateChange = onStateChange;

    this.historyStack = [];
    this.currentNode = null;
    this.currentChildren = [...TIMELINE_DATA];
    this.depth = 1;

    // Timeline spine scroll progress (0.0 to 1.0)
    this.timelineProgress = 0.05;
    this.targetTimelineProgress = 0.05;

    // Camera animation state
    this.isTransitioning = false;
    this.currentLookAt = new THREE.Vector3(0, 40, 200);

    // Orbit State
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.spherical = new THREE.Spherical(320, Math.PI / 2.3, 0);

    this.initControls();
  }

  initControls() {
    const dom = this.scene.container;

    // Mouse Drag Orbit
    dom.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    dom.addEventListener('mousemove', (e) => {
      if (this.isDragging && !this.isTransitioning) {
        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;

        this.spherical.theta -= deltaX * 0.005;
        this.spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.spherical.phi - deltaY * 0.005));

        this.updateCameraPosition();
        this.previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });

    // Mouse Wheel: Continuous Timeline Flow & Zoom
    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (this.isTransitioning) return;

      if (this.depth === 1) {
        // At Root level: Scroll travels sequentially along the cosmic timeline path!
        const scrollDelta = e.deltaY * 0.0008;
        this.targetTimelineProgress = Math.max(0.02, Math.min(0.96, this.targetTimelineProgress + scrollDelta));
        this.scrollTimelineTo(this.targetTimelineProgress);
      } else {
        // In a nested sub-event cluster: Wheel zooms in/out locally
        const zoomDelta = e.deltaY * 0.25;
        this.spherical.radius = Math.max(60, Math.min(600, this.spherical.radius + zoomDelta));
        
        // Auto drill-down if very close to hovered node with children
        if (this.spherical.radius < 90 && this.scene.hoveredNode) {
          const node = this.scene.hoveredNode.userData.nodeData;
          if (node && node.children && node.children.length > 0) {
            this.drillDownIntoNode(node);
            return;
          }
        }

        // Auto retreat if zoomed far out
        if (this.spherical.radius > 450 && this.historyStack.length > 0) {
          this.zoomOut();
          return;
        }

        this.updateCameraPosition();
      }
    }, { passive: false });

    // Touch Support
    let touchStartDist = 0;
    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    dom.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1 && !this.isTransitioning) {
        const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
        const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

        if (this.depth === 1) {
          this.targetTimelineProgress = Math.max(0.02, Math.min(0.96, this.targetTimelineProgress - deltaY * 0.0015));
          this.scrollTimelineTo(this.targetTimelineProgress);
        } else {
          this.spherical.theta -= deltaX * 0.006;
          this.spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, this.spherical.phi - deltaY * 0.006));
          this.updateCameraPosition();
        }
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    dom.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  scrollTimelineTo(t) {
    if (!this.scene.spineCurve) return;
    const lookAtPoint = this.scene.spineCurve.getPointAt(t);
    const cameraOffset = new THREE.Vector3(0, 50, 240);
    const camPos = lookAtPoint.clone().add(cameraOffset);

    this.currentLookAt.copy(lookAtPoint);
    this.scene.camera.position.copy(camPos);
    this.scene.camera.lookAt(this.currentLookAt);
  }

  updateCameraPosition() {
    this.scene.camera.position.setFromSpherical(this.spherical).add(this.currentLookAt);
    this.scene.camera.lookAt(this.currentLookAt);
  }

  /**
   * Start at cosmic timeline root
   */
  start() {
    this.depth = 1;
    this.historyStack = [];
    this.currentNode = null;
    this.currentChildren = [...TIMELINE_DATA];
    this.targetTimelineProgress = 0.08;

    this.scene.renderNodes(this.currentChildren, null);
    
    // Position camera at beginning of timeline
    if (this.scene.spineCurve) {
      const p = this.scene.spineCurve.getPointAt(0.08);
      this.flyCameraTo(p.clone().add(new THREE.Vector3(0, 60, 280)), p, 1.2);
    }
    this.notifyState();
  }

  /**
   * Recursive Fractal Zoom into a node
   */
  drillDownIntoNode(node) {
    if (!node.children || node.children.length === 0) {
      return false; // Leaf event
    }

    this.historyStack.push(this.currentNode || { title: "Age of the Gods", id: "root" });
    this.currentNode = node;
    this.currentChildren = node.children;
    this.depth++;

    const nodeGroup = this.scene.nodeMeshes.get(node.id);
    const targetCenter = nodeGroup ? nodeGroup.position.clone() : new THREE.Vector3(0, 0, 0);

    // Blossom child events in 3D around target position
    this.scene.renderNodes(this.currentChildren, targetCenter, Math.max(70, 110 - this.depth * 10));

    const offset = new THREE.Vector3(0, 35, 180);
    const newCamPos = targetCenter.clone().add(offset);
    this.spherical.setFromVector3(offset);

    this.flyCameraTo(newCamPos, targetCenter, 1.4);
    this.notifyState();
    return true;
  }

  /**
   * Step back up one level in the hierarchy
   */
  zoomOut() {
    if (this.historyStack.length === 0) return;

    this.historyStack.pop();
    this.depth = Math.max(1, this.depth - 1);

    if (this.historyStack.length === 0) {
      this.start();
      return;
    }

    const parentNode = this.historyStack[this.historyStack.length - 1];
    this.currentNode = parentNode.id === "root" ? null : parentNode;
    this.currentChildren = parentNode.children || TIMELINE_DATA;

    this.scene.renderNodes(this.currentChildren, null);
    this.flyCameraTo(new THREE.Vector3(0, 70, 280), new THREE.Vector3(0, 0, 0), 1.2);
    this.notifyState();
  }

  flyCameraTo(targetPos, targetLookAt, durationSec = 1.0) {
    this.isTransitioning = true;
    const startPos = this.scene.camera.position.clone();
    const startLook = this.currentLookAt.clone();
    const startTime = performance.now();
    const durationMs = durationSec * 1000;

    const animateFlight = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / durationMs);
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      this.scene.camera.position.lerpVectors(startPos, targetPos, ease);
      this.currentLookAt.lerpVectors(startLook, targetLookAt, ease);
      this.scene.camera.lookAt(this.currentLookAt);

      if (progress < 1.0) {
        requestAnimationFrame(animateFlight);
      } else {
        this.isTransitioning = false;
        this.spherical.setFromVector3(this.scene.camera.position.clone().sub(this.currentLookAt));
      }
    };

    requestAnimationFrame(animateFlight);
  }

  notifyState() {
    if (this.onStateChange) {
      this.onStateChange({
        depth: this.depth,
        currentNode: this.currentNode,
        history: [...this.historyStack],
        hasChildren: this.currentNode ? (this.currentNode.children && this.currentNode.children.length > 0) : true,
        canZoomOut: this.historyStack.length > 0
      });
    }
  }
}
