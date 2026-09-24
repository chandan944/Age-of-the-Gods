/**
 * Navigation & HUD UI Engine
 * Zero emojis - Pure SVG vector icons and normalized diacritic-insensitive search.
 */

import { TIMELINE_DATA, getAllNodes, findNodeById, normalizeText } from '../data/timelineData.js';
import { audioEngine } from '../engine/audioEngine.js';
import { ICONS } from './icons.js';

export class SacredNavigationUI {
  constructor(zoomEngine, modalViewer) {
    this.zoomEngine = zoomEngine;
    this.modal = modalViewer;
    this.allNodes = getAllNodes(TIMELINE_DATA);

    this.searchQuery = '';
    this.activeCategory = 'all';

    this.initElements();
    this.bindEvents();
    this.renderCategoryIcons();
  }

  initElements() {
    this.searchInput = document.getElementById('search-input');
    this.searchResults = document.getElementById('search-results');
    this.breadcrumbsEl = document.getElementById('breadcrumbs-bar');
    this.categoryTabs = document.querySelectorAll('.category-chip');

    this.btnZoomIn = document.getElementById('btn-zoom-in');
    this.btnZoomOut = document.getElementById('btn-zoom-out');
    this.btnStepBack = document.getElementById('btn-step-back');
    this.btnReset = document.getElementById('btn-reset-view');
    this.btnAudio = document.getElementById('btn-audio-toggle');
    this.audioIcon = document.getElementById('audio-icon');
    this.audioText = document.getElementById('audio-text');
    this.depthBadge = document.getElementById('depth-indicator');

    // Populate HUD Icon SVGs
    if (this.btnZoomIn) this.btnZoomIn.innerHTML = ICONS.zoomIn;
    if (this.btnZoomOut) this.btnZoomOut.innerHTML = ICONS.zoomOut;
    if (this.btnStepBack) {
      this.btnStepBack.innerHTML = `${ICONS.stepBack} <span>Step Back</span>`;
    }
    const btnInspect = document.getElementById('btn-inspect-current');
    if (btnInspect) {
      btnInspect.innerHTML = `${ICONS.inspect} <span>Inspect Lore</span>`;
    }
    if (this.btnReset) {
      this.btnReset.innerHTML = `${ICONS.reset} <span>Reset View</span>`;
    }
    if (this.audioIcon) {
      this.audioIcon.innerHTML = ICONS.volumeOff;
    }
  }

  renderCategoryIcons() {
    this.categoryTabs.forEach(chip => {
      const cat = chip.getAttribute('data-category');
      const label = chip.getAttribute('data-label');
      const iconSvg = ICONS[cat] || ICONS.cosmos;
      chip.innerHTML = `${iconSvg} <span>${label}</span>`;
    });
  }

  bindEvents() {
    // 1. Accent- and Diacritic-Insensitive Search
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value.trim());
    });

    document.addEventListener('click', (e) => {
      if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
        this.searchResults.classList.remove('active');
      }
    });

    // 2. Category Filter Tabs
    this.categoryTabs.forEach(chip => {
      chip.addEventListener('click', () => {
        this.categoryTabs.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const category = chip.getAttribute('data-category');
        this.filterCategory(category);
      });
    });

    // 3. Zoom Controls
    if (this.btnZoomIn) {
      this.btnZoomIn.addEventListener('click', () => {
        this.zoomEngine.spherical.radius = Math.max(60, this.zoomEngine.spherical.radius - 50);
        this.zoomEngine.updateCameraPosition();
      });
    }

    if (this.btnZoomOut) {
      this.btnZoomOut.addEventListener('click', () => {
        this.zoomEngine.spherical.radius = Math.min(650, this.zoomEngine.spherical.radius + 50);
        this.zoomEngine.updateCameraPosition();
      });
    }

    if (this.btnStepBack) {
      this.btnStepBack.addEventListener('click', () => {
        this.zoomEngine.zoomOut();
      });
    }

    if (this.btnReset) {
      this.btnReset.addEventListener('click', () => {
        this.zoomEngine.start();
        const tooltip = document.getElementById('hover-tooltip');
        if (tooltip) tooltip.classList.remove('visible');
      });
    }

    // 4. Sacred Audio Synthesizer Toggle
    if (this.btnAudio) {
      this.btnAudio.addEventListener('click', () => {
        const playing = audioEngine.toggle();
        if (playing) {
          this.btnAudio.classList.add('active');
          this.audioIcon.innerHTML = ICONS.volumeOn;
          this.audioText.textContent = 'Tanpura Drone: Active';
        } else {
          this.btnAudio.classList.remove('active');
          this.audioIcon.innerHTML = ICONS.volumeOff;
          this.audioText.textContent = 'Tanpura Drone: Off';
        }
      });
    }
  }

  handleSearch(query) {
    if (!query) {
      this.searchResults.classList.remove('active');
      this.searchResults.innerHTML = '';
      return;
    }

    const normQuery = normalizeText(query);

    // Search against normalized title, sanskrit, summary, and category
    const matches = this.allNodes.filter(node => {
      const normTitle = normalizeText(node.title);
      const normSanskrit = normalizeText(node.sanskrit);
      const normSummary = normalizeText(node.summary);
      const normCategory = normalizeText(node.category);

      return (
        normTitle.includes(normQuery) ||
        normSanskrit.includes(normQuery) ||
        normSummary.includes(normQuery) ||
        normCategory.includes(normQuery)
      );
    }).slice(0, 8);

    if (matches.length === 0) {
      this.searchResults.innerHTML = `<div class="search-item empty">No sacred chronicles found for "${query}"</div>`;
      this.searchResults.classList.add('active');
      return;
    }

    this.searchResults.innerHTML = matches.map(node => {
      const iconSvg = ICONS[node.category] || ICONS.cosmos;
      return `
        <div class="search-item" data-id="${node.id}">
          <div class="search-icon-cell">${iconSvg}</div>
          <div class="search-info-cell">
            <div class="search-title">${node.title}</div>
            ${node.sanskrit ? `<div class="search-sanskrit">${node.sanskrit}</div>` : ''}
            <div class="search-category">${node.category.toUpperCase()} ${node.epoch ? `· ${node.epoch}` : ''}</div>
          </div>
        </div>
      `;
    }).join('');

    this.searchResults.classList.add('active');

    // Click search item
    const items = this.searchResults.querySelectorAll('.search-item:not(.empty)');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        const targetNode = findNodeById(id);
        if (targetNode) {
          this.searchResults.classList.remove('active');
          this.searchInput.value = '';
          this.modal.show(targetNode);
        }
      });
    });
  }

  filterCategory(category) {
    this.activeCategory = category;
    if (category === 'all') {
      this.zoomEngine.start();
      return;
    }

    let matching = TIMELINE_DATA.filter(n => n.category === category);
    if (matching.length === 0) {
      matching = this.allNodes.filter(n => n.category === category);
    }

    if (matching.length > 0) {
      this.zoomEngine.scene.renderNodes(matching, null);
      this.zoomEngine.flyCameraTo(new THREE.Vector3(0, 70, 290), new THREE.Vector3(0, 0, 0), 1.0);
    }
  }

  updateBreadcrumbs(state) {
    if (this.depthBadge) {
      this.depthBadge.textContent = `Depth: Level ${state.depth}`;
    }

    if (this.btnStepBack) {
      this.btnStepBack.disabled = !state.canZoomOut;
    }

    let trail = [{ title: "Age of the Gods", id: "root" }];
    state.history.forEach(h => {
      if (h.id !== "root") trail.push(h);
    });
    if (state.currentNode) {
      trail.push(state.currentNode);
    }

    this.breadcrumbsEl.innerHTML = trail.map((item, idx) => `
      <span class="breadcrumb-item ${idx === trail.length - 1 ? 'current' : ''}">
        ${item.title}
      </span>
      ${idx < trail.length - 1 ? '<span class="crumb-separator">/</span>' : ''}
    `).join('');
  }
}
