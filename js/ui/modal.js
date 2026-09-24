/**
 * Sacred Modal Viewer & Chronicle Drawer
 * Zero emojis - Pure SVG vector icons.
 */

import { ICONS } from './icons.js';

export class SacredModalViewer {
  constructor(containerEl, onSelectChildNode) {
    this.container = containerEl;
    this.onSelectChildNode = onSelectChildNode;
    this.activeNode = null;
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop"></div>
      <aside class="modal-drawer" id="modal-drawer" role="dialog" aria-modal="true">
        <button class="drawer-close-btn" id="drawer-close-btn" aria-label="Close Drawer">
          ${ICONS.close}
        </button>
        <div class="drawer-header" id="drawer-header"></div>
        <div class="drawer-body" id="drawer-body"></div>
      </aside>
    `;

    this.backdrop = document.getElementById('modal-backdrop');
    this.drawer = document.getElementById('modal-drawer');
    this.closeBtn = document.getElementById('drawer-close-btn');
    this.headerEl = document.getElementById('drawer-header');
    this.bodyEl = document.getElementById('drawer-body');

    this.closeBtn.addEventListener('click', () => this.close());
    this.backdrop.addEventListener('click', () => this.close());
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  show(node) {
    this.activeNode = node;

    // Header with Category Icon and Sanskrit subtitle
    const categoryIcon = ICONS[node.category] || ICONS.cosmos;
    this.headerEl.innerHTML = `
      <div class="drawer-tag">
        <span class="category-badge">
          ${categoryIcon}
          <span>${node.category.toUpperCase()}</span>
        </span>
        ${node.epoch ? `<span class="epoch-badge">${node.epoch}</span>` : ''}
      </div>
      <h2 class="drawer-title">${node.title}</h2>
      ${node.sanskrit ? `<div class="drawer-sanskrit">${node.sanskrit}</div>` : ''}
    `;

    let bodyHtml = '';

    // High-Resolution Engraving Artwork
    if (node.image) {
      bodyHtml += `
        <div class="drawer-artwork-frame">
          <img src="${node.image}" alt="${node.title}" class="drawer-image" loading="lazy" />
          <div class="artwork-caption">Sacred Engraving · Black, White & Saffron Tradition</div>
        </div>
      `;
    }

    // Sacred Quote
    if (node.quote) {
      bodyHtml += `
        <div class="drawer-quote">
          <p>${node.quote}</p>
        </div>
      `;
    }

    // Summary
    if (node.summary) {
      bodyHtml += `
        <div class="drawer-summary">
          <p>${node.summary}</p>
        </div>
      `;
    }

    // Detailed Content
    if (node.content) {
      bodyHtml += `
        <div class="drawer-content-text">
          ${node.content}
        </div>
      `;
    }

    // Nested Sub-Events Section (Drill-down)
    if (node.children && node.children.length > 0) {
      bodyHtml += `
        <div class="sub-events-section">
          <h4 class="sub-events-heading">
            <span class="saffron-indicator"></span>
            Nested Chronicles & Sub-Events (${node.children.length})
          </h4>
          <p class="sub-events-hint">Select any chronicle to zoom the 3D cosmos into its coordinate space:</p>
          <div class="sub-events-grid">
            ${node.children.map(child => {
              const childIcon = ICONS[child.category] || ICONS.cosmos;
              return `
                <button class="child-node-card" data-child-id="${child.id}">
                  <div class="card-icon">${childIcon}</div>
                  <div class="card-info">
                    <div class="card-title">${child.title}</div>
                    ${child.sanskrit ? `<div class="card-sanskrit">${child.sanskrit}</div>` : ''}
                  </div>
                  <div class="card-arrow">${ICONS.arrowRight}</div>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    this.bodyEl.innerHTML = bodyHtml;

    // Attach click events to child node buttons
    const childButtons = this.bodyEl.querySelectorAll('.child-node-card');
    childButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const childId = btn.getAttribute('data-child-id');
        const childNode = node.children.find(c => c.id === childId);
        if (childNode && this.onSelectChildNode) {
          this.close();
          this.onSelectChildNode(childNode);
        }
      });
    });

    // Animate open
    this.container.classList.add('active');
    this.drawer.classList.add('open');
    this.backdrop.classList.add('visible');
    document.body.classList.add('modal-open');
  }

  close() {
    this.drawer.classList.remove('open');
    this.backdrop.classList.remove('visible');
    setTimeout(() => {
      this.container.classList.remove('active');
      document.body.classList.remove('modal-open');
    }, 280);
  }
}
