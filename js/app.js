/**
 * Main Application Bootstrap
 * Sanātana Dharma: 3D Fractal Timeline & Sacred Reference
 * Zero emojis - Pure SVG vector icons.
 */

import { SacredScene3D } from './engine/scene3d.js';
import { FractalZoomEngine } from './engine/fractalZoom.js';
import { SacredModalViewer } from './ui/modal.js';
import { SacredNavigationUI } from './ui/navigation.js';
import { ICONS } from './ui/icons.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvasContainer = document.getElementById('canvas-container');
  const modalContainer = document.getElementById('modal-container');
  const hoverTooltip = document.getElementById('hover-tooltip');

  // 1. Initialize 3D Chronological Scene
  const scene3D = new SacredScene3D(canvasContainer);

  // 2. Initialize Detail Modal
  let zoomEngine = null;
  const modal = new SacredModalViewer(modalContainer, (childNode) => {
    if (zoomEngine) {
      zoomEngine.drillDownIntoNode(childNode);
    }
  });

  // 3. Initialize Fractal Zoom Engine
  let navigationUI = null;
  zoomEngine = new FractalZoomEngine(scene3D, (state) => {
    if (navigationUI) {
      navigationUI.updateBreadcrumbs(state);
    }
  });

  // 4. Initialize Navigation & HUD UI
  navigationUI = new SacredNavigationUI(zoomEngine, modal);

  // 5. Connect 3D Node Interactions
  scene3D.onNodeClick = (nodeData) => {
    hoverTooltip.classList.remove('visible');
    const hasChildren = nodeData.children && nodeData.children.length > 0;
    if (hasChildren) {
      zoomEngine.drillDownIntoNode(nodeData);
    } else {
      modal.show(nodeData);
    }
  };

  // Node Hover Tooltip (clean, responsive, no sticky bugs)
  scene3D.onNodeHover = (nodeData, event) => {
    if (nodeData && event) {
      const hintText = nodeData.children && nodeData.children.length > 0 
        ? 'Click to expand sub-events' 
        : 'Click to inspect chronicles';

      hoverTooltip.innerHTML = `
        <div class="tooltip-title">${nodeData.title}</div>
        ${nodeData.sanskrit ? `<div class="tooltip-sanskrit">${nodeData.sanskrit}</div>` : ''}
        <div class="tooltip-hint">${hintText}</div>
      `;
      hoverTooltip.style.left = `${Math.min(window.innerWidth - 240, event.clientX + 16)}px`;
      hoverTooltip.style.top = `${Math.min(window.innerHeight - 100, event.clientY + 16)}px`;
      hoverTooltip.classList.add('visible');
    } else {
      hoverTooltip.classList.remove('visible');
    }
  };

  // Double-click canvas on hovered node opens modal
  canvasContainer.addEventListener('dblclick', () => {
    if (scene3D.hoveredNode) {
      const nodeData = scene3D.hoveredNode.userData.nodeData;
      if (nodeData) {
        hoverTooltip.classList.remove('visible');
        modal.show(nodeData);
      }
    }
  });

  // Inspect active node button
  const inspectBtn = document.getElementById('btn-inspect-current');
  if (inspectBtn) {
    inspectBtn.addEventListener('click', () => {
      hoverTooltip.classList.remove('visible');
      if (zoomEngine.currentNode) {
        modal.show(zoomEngine.currentNode);
      } else {
        modal.show(zoomEngine.currentChildren[0]);
      }
    });
  }

  // Dismiss tooltip on mouse leave
  canvasContainer.addEventListener('mouseleave', () => {
    hoverTooltip.classList.remove('visible');
  });

  // 6. Start the Cosmos at Depth 1
  zoomEngine.start();
  console.log("Sanatana Dharma 3D Timeline Engine Loaded.");
});
