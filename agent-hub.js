// ===== AUTO PILOT PAGE — JS =====

document.addEventListener('DOMContentLoaded', () => {

  // ========== TAB SWITCHING ==========
  const tabs = document.querySelectorAll('.ap-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // ========== VIEW TOGGLE: GRID ↔ LIST ==========
  const viewList = document.getElementById('view-list');
  const viewGrid = document.getElementById('view-grid');
  const apContent = document.getElementById('ap-content');
  const apListView = document.getElementById('ap-list-view');

  function switchToGrid() {
    if (!apContent || !apListView) return;
    viewGrid.classList.add('active');
    viewList.classList.remove('active');
    apContent.style.display = '';   // restore flex/column from CSS
    apListView.style.display = 'none';
  }

  function switchToList() {
    if (!apContent || !apListView) return;
    viewList.classList.add('active');
    viewGrid.classList.remove('active');
    apContent.style.display = 'none';
    apListView.style.display = 'flex';
    // animate newly-visible list items
    document.querySelectorAll('.lv-agent-item').forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-8px)';
      setTimeout(() => {
        item.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, 40 + i * 45);
    });
  }

  if (viewGrid) viewGrid.addEventListener('click', switchToGrid);
  if (viewList) viewList.addEventListener('click', switchToList);

  // ========== LIST VIEW: LEFT PANEL AGENT SELECTION ==========
  const agentItems = document.querySelectorAll('.lv-agent-item');
  const detailViews = document.querySelectorAll('.lv-detail-view');

  agentItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Toggle accordion if chevron was clicked, or just expand it when item clicked
      const group = item.closest('.lv-accordion-group');
      if (e.target.closest('.lv-accordion-chevron')) {
        // Just toggle expansion if chevron specifically clicked
        group.classList.toggle('expanded');
      } else {
        // If clicking the item body, expand it and collapse others
        document.querySelectorAll('.lv-accordion-group').forEach(g => {
          if (g !== group) g.classList.remove('expanded');
        });
        group.classList.add('expanded');
      }

      // update active state in left panel
      agentItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // show matching detail panel on the right
      const target = item.dataset.agent;
      detailViews.forEach(view => {
        view.classList.remove('active');
      });
      const matchDetail = document.querySelector(`.lv-detail-view[data-detail="${target}"]`);
      if (matchDetail) matchDetail.classList.add('active');

      // Attempt to render dynamic workflow if available
      renderHubWorkflow(target);
    });
  });

  // Render initial workflow (usually orchestrator)
  setTimeout(() => renderHubWorkflow('orchestrator'), 100);

  // ========== ANIMATE GRID CARDS ON LOAD ==========
  const cards = document.querySelectorAll('.ap-card, .ap-agent-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(8px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 80 + i * 60);
  });

  // ========== TOGGLE SWITCHES — VISUAL FEEDBACK ==========
  const toggles = document.querySelectorAll('.ap-toggle input');
  toggles.forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const card = e.target.closest('.ap-card');
      if (!card) return;
      const label = card.querySelector('.ap-card-toggle-label');
      if (label) label.textContent = e.target.checked ? 'Enabled' : 'Disabled';
      card.style.opacity = e.target.checked ? '1' : '0.6';
    });
  });

  // ========== THREE-DOT MENUS (Dropdowns) ==========
  const menus = document.querySelectorAll('.ap-card-menu');
  menus.forEach(menuBtn => {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.ap-dropdown.show').forEach(d => {
        if (d !== menuBtn.nextElementSibling) d.classList.remove('show');
      });
      const dropdown = menuBtn.nextElementSibling;
      if (dropdown && dropdown.classList.contains('ap-dropdown')) {
        dropdown.classList.toggle('show');
      }
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.ap-dropdown.show').forEach(d => d.classList.remove('show'));
  });

  // ========== CONFIGURE AGENT ==========
  document.querySelectorAll('.view-config').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.ap-card') || btn.closest('.ap-agent-card');
      if (!card) return;
      const title = card.querySelector('.ap-card-title')?.textContent
        || card.querySelector('.ap-agent-name')?.textContent || '';
      const keyMap = {
        'Route': 'route', 'Tour': 'tour', 'Dispatch': 'dispatch',
        'Monitoring': 'monitoring', 'Reporting': 'performance',
        'Contract': 'contract', 'Scheduling': 'scheduling', 'Employee': 'employee'
      };
      let matchKey = 'monitoring';
      for (const [k, v] of Object.entries(keyMap)) {
        if (title.toLowerCase().includes(k.toLowerCase())) { matchKey = v; break; }
      }
      if (typeof openAgentConfig === 'function') openAgentConfig(matchKey);
      const drop = btn.closest('.ap-dropdown');
      if (drop) drop.classList.remove('show');
    });
  });

  // ========== DYNAMIC WORKFLOW RENDERER ==========
  function renderHubWorkflow(agentKey) {
    if (typeof AGENT_PAGE_CONFIGS === 'undefined') return;
    const a = AGENT_PAGE_CONFIGS[agentKey];
    if (!a || !a.workflow || !a.connections) return;

    const wrapEl = document.querySelector(`.lv-detail-view[data-detail="${agentKey}"] .cfg-canvas-wrap`);
    const canvasEl = document.getElementById(`hub-canvas-${agentKey}`);
    const svgEl = document.getElementById(`hub-svg-${agentKey}`);

    // If there is no specific container for this agent, do nothing
    if (!wrapEl || !canvasEl || !svgEl) return;

    // Only render if not already rendered
    if (canvasEl.innerHTML.trim() !== '') return;

    // Load topology data into the global `_canvas` expected by agent-config-page.js
    _canvas.nodes = a.workflow.map(n => ({ ...n }));
    _canvas.connections = (a.connections || []).map(c => [...c]);

    // Check if the original ensureArrowDefs and renderCanvas are available
    if (typeof ensureArrowDefs === 'function' && typeof renderCanvas === 'function') {
      ensureArrowDefs(svgEl);
      renderCanvas(canvasEl, svgEl);

      // Center canvas view initially for better hub display (scale to 0.5 and scroll)
      _canvas.zoom = 0.50; // default zoomed out for the hub
      canvasEl.style.transformOrigin = '0 0';
      canvasEl.style.transform = `scale(${_canvas.zoom})`;
      svgEl.style.transformOrigin = '0 0';
      svgEl.style.transform = `scale(${_canvas.zoom})`;

      const leftOffset = Math.min(..._canvas.nodes.map(n => n.x)) * _canvas.zoom;
      const topOffset = Math.min(..._canvas.nodes.map(n => n.y)) * _canvas.zoom;
      wrapEl.scrollLeft = Math.max(0, leftOffset - 40);
      wrapEl.scrollTop = Math.max(0, topOffset - 40);

      // Add minimal zoom controls right in the specific agent's panel
      const zoomBtn = document.querySelector(`.lv-detail-view[data-detail="${agentKey}"] .lv-canvas-btn:first-child`);
      if (zoomBtn && !zoomBtn.dataset.bound) {
        zoomBtn.dataset.bound = 'true';
        zoomBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          _canvas.zoom = _canvas.zoom >= 1.0 ? 0.5 : 1.0;
          canvasEl.style.transform = `scale(${_canvas.zoom})`;
          svgEl.style.transform = `scale(${_canvas.zoom})`;
        });
      }
    }
  }

});

