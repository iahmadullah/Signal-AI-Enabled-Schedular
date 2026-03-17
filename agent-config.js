// ===== AGENT CONFIGURATION SCREEN =====

const AGENT_CONFIGS = {
  contract: {
    name: 'Contract Intelligence Agent', color: '#4CAF50', icon: '📄',
    purpose: 'Converts sales contracts into operational blueprints. Assesses service hours and SLA rules.',
    problems: 'Missed SLA clauses, overstaffing beyond budget, ambiguous post orders.',
    activation: ['New contract uploaded', 'Contract modification event', 'Client SLA dispute'],
    kb: ['CRM Database', 'Client SLAs', 'Legal Compliance Rules'],
    core: [
      { id: 'c1', name: 'Auto-Scan New Contracts', desc: 'Automatically analyze contracts when uploaded for shift requirements', type: 'toggle', enabled: true },
      { id: 'c2', name: 'SLA Extraction Accuracy', desc: 'Confidence threshold for automatically extracting SLA clauses', type: 'slider', min: 50, max: 100, value: 92, unit: '%' }
    ],
    guardrails: [{ id: 'g1', name: 'Max Allowed Legal Risk Score', val: 15, unit: '%' }],
    notifications: [
      { name: 'Contract expiry alert', enabled: true },
      { name: 'SLA Breach risk flag', enabled: true }
    ],
    workflow: [
      { id: 'n1', title: 'Trigger Node', desc: 'PDF/Word Contract Upload', x: 280, y: 60, color: '#4CAF50' },
      { id: 'n2', title: 'Context Extractor', desc: 'Identify clauses, SLAs, billing terms', x: 280, y: 200, color: '#2196F3' },
      { id: 'n3', title: 'SLA Rule Engine', desc: 'Validate SLA conditions', x: 100, y: 340, color: '#FF9800' },
      { id: 'n4', title: 'Shift Generator', desc: 'Build shift templates', x: 460, y: 340, color: '#9C27B0' },
      { id: 'n5', title: 'Draft Review', desc: 'Output to Supervisor for Approval', x: 280, y: 480, color: '#F44336' }
    ],
    connections: [['n1', 'n2'], ['n2', 'n3'], ['n2', 'n4'], ['n3', 'n5'], ['n4', 'n5']]
  },
  route: {
    name: 'Route Optimization Agent', color: '#8B5CF6', icon: '🗺',
    purpose: 'Optimizes patrol and dedicated routes by reducing redundant visits, clustering checkpoints, balancing workload, and avoiding traffic delays.',
    problems: 'High travel times, inconsistent checkpoint coverage, rushed patrols, wasted fuel.',
    activation: ['Shift start', 'Traffic event', 'Manual optimize', 'SLA risk detection'],
    kb: ['Shift Schedule Database', 'Site Risk Profiles', 'Traffic API', 'GPS Tracking', 'SLA Rules'],
    core: [
      { id: 'r1', name: 'Target Visit Reduction', desc: 'Expected percentage drop in excess clustered visits', type: 'slider', min: 0, max: 50, value: 20, unit: '%' },
      { id: 'r2', name: 'Max Cluster Radius', desc: 'Maximum miles between combined visits', type: 'slider', min: 0.5, max: 5, value: 1.5, unit: 'mi' },
      { id: 'r3', name: 'Traffic Sensitivity', desc: 'How aggressively to reroute based on live traffic', type: 'slider', min: 0, max: 100, value: 85, unit: '%' },
      { id: 'r4', name: 'Randomization Level', desc: 'Add entropy to patrol sequences', type: 'toggle', enabled: true }
    ],
    guardrails: [
      { id: 'g1', name: 'Max Daily Driving Hours', val: 6, unit: 'hrs', min: 2, max: 12 },
      { id: 'g2', name: 'Emergency Mode Override', toggle: true, enabled: false }
    ],
    notifications: [
      { name: 'Traffic recalculation alert', enabled: true },
      { name: 'Visit compression alert', enabled: false },
      { name: 'Patrol rebalance alert', enabled: true }
    ],
    workflow: [
      { id: 'n1', title: 'Trigger Node', desc: 'Shift begins / Traffic event', x: 280, y: 40, color: '#8B5CF6' },
      { id: 'n2', title: 'Data Enrichment', desc: 'Pull GPS, Traffic, Risk, SLA Data', x: 280, y: 170, color: '#2196F3' },
      { id: 'n3', title: 'Constraint Validator', desc: 'Check Guardrails (Hours, Fatigue)', x: 280, y: 300, color: '#FF9800' },
      { id: 'n4', title: 'Route Optimization', desc: 'Best patrol path', x: 80, y: 430, color: '#4CAF50' },
      { id: 'n5', title: 'Visit Compression', desc: 'Cluster nearby checkpoints', x: 280, y: 430, color: '#00BCD4' },
      { id: 'n6', title: 'Rebalance Path', desc: 'Distribute load evenly', x: 480, y: 430, color: '#9C27B0' },
      { id: 'n7', title: 'Impact Estimator', desc: 'Calculate ETA, distance, SLA hit rate', x: 280, y: 570, color: '#F44336' },
    ],
    connections: [['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'], ['n3', 'n5'], ['n3', 'n6'], ['n4', 'n7'], ['n5', 'n7'], ['n6', 'n7']],
    sim: {
      before: { visits: 25, eta: '6h 30m', distance: '14.2 mi' },
      after: { visits: 19, eta: '3h 45m', distance: '8.1 mi' }
    }
  },
  scheduling: {
    name: 'Scheduling Optimization Agent', color: '#FFB300', icon: '📅',
    purpose: 'Builds and maintains compliant shift rosters. Minimizes overtime and automatically suggests swaps based on officer qualifications and fatigue.',
    problems: 'Chronic overtime, last-minute call-outs, scheduling conflicts, compliance breaches.',
    activation: ['Weekly roster generation', 'Call-out event', 'Missed clock-in'],
    kb: ['Employee Database', 'Payroll Rules', 'Compliance Constraints (Max Hours)'],
    core: [
      { id: 's1', name: 'Overtime Prevention', desc: 'Aggressively try to zero out overtime hours', type: 'toggle', enabled: true },
      { id: 's2', name: 'Auto-Swap Confidence', desc: 'Confidence required to auto-swap without supervisor review', type: 'slider', min: 50, max: 100, value: 95, unit: '%' }
    ],
    guardrails: [
      { id: 'g1', name: 'Max Weekly Hours per Officer', val: 40, unit: 'hrs', min: 20, max: 60 },
      { id: 'g2', name: 'Minimum Rest Period', val: 10, unit: 'hrs', min: 8, max: 24 }
    ],
    notifications: [
      { name: 'Approaching Overtime alert', enabled: true },
      { name: 'Call-out replacement found', enabled: true }
    ],
    workflow: [
      { id: 'n1', title: 'Trigger Node', desc: 'Roster Generation / Shift GAP', x: 280, y: 50, color: '#FFB300' },
      { id: 'n2', title: 'Eligibility Pool', desc: 'Filter by Certifications & Availability', x: 280, y: 190, color: '#2196F3' },
      { id: 'n3', title: 'Compliance Check', desc: 'Filter out Overtime/Fatigue risks', x: 280, y: 330, color: '#F44336' },
      { id: 'n4', title: 'Recommendation Engine', desc: 'Rank candidates by fit score', x: 280, y: 470, color: '#4CAF50' },
      { id: 'n5', title: 'Assignment Pipeline', desc: 'Auto-assign or send to Draft', x: 280, y: 610, color: '#9C27B0' }
    ],
    connections: [['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'], ['n4', 'n5']]
  }
};

function getAgentConfig(key) {
  if (AGENT_CONFIGS[key]) return AGENT_CONFIGS[key];
  return {
    name: key.charAt(0).toUpperCase() + key.slice(1) + ' Agent',
    icon: '⚙️', color: '#1C1C1E',
    purpose: 'Automates and optimizes operational workflows.',
    problems: 'Inefficient processes, manual overhead.',
    activation: ['Manual trigger', 'Scheduled interval'],
    kb: ['General Data Lake'],
    core: [{ name: 'Active Mode', desc: 'Run autonomously', type: 'toggle', enabled: true }],
    guardrails: [], notifications: [],
    workflow: [
      { id: 'n1', title: 'Initialization', desc: 'Start task', x: 280, y: 60, color: '#1C1C1E' },
      { id: 'n2', title: 'Processing', desc: 'Execute logic', x: 280, y: 200, color: '#2196F3' },
      { id: 'n3', title: 'Output Generation', desc: 'Produce results', x: 280, y: 340, color: '#4CAF50' }
    ],
    connections: [['n1', 'n2'], ['n2', 'n3']]
  };
}

// =========================================
// DRAG-AND-DROP CANVAS ENGINE
// =========================================
let canvasState = {
  nodes: [],
  connections: [],
  connecting: null,   // { fromId, startX, startY } when drawing a connection
  nextId: 1
};

function initCanvas(canvasEl, svgEl, agentData) {
  canvasState.nodes = agentData.workflow.map(n => ({ ...n }));
  canvasState.connections = (agentData.connections || []).map(c => [...c]);
  canvasState.nextId = canvasState.nodes.length + 1;
  renderCanvas(canvasEl, svgEl);
}

function renderCanvas(canvasEl, svgEl) {
  canvasEl.innerHTML = '';
  svgEl.innerHTML = '';

  // Draw connection lines
  canvasState.connections.forEach(([fromId, toId]) => {
    const from = canvasState.nodes.find(n => n.id === fromId);
    const to = canvasState.nodes.find(n => n.id === toId);
    if (!from || !to) return;
    const line = drawArrow(svgEl, from, to);
  });

  // Draw nodes
  canvasState.nodes.forEach(node => {
    const el = createNodeEl(node, canvasEl, svgEl);
    canvasEl.appendChild(el);
  });
}

function drawArrow(svgEl, from, to) {
  const NODE_W = 160, NODE_H = 68;
  const x1 = from.x + NODE_W / 2;
  const y1 = from.y + NODE_H;
  const x2 = to.x + NODE_W / 2;
  const y2 = to.y;

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  // Bezier path
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const cy1 = y1 + (y2 - y1) * 0.5;
  const cy2 = y2 - (y2 - y1) * 0.5;
  path.setAttribute('d', `M${x1},${y1} C${x1},${cy1} ${x2},${cy2} ${x2},${y2}`);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', '#C7C7CC');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('stroke-dasharray', '0');
  path.setAttribute('marker-end', 'url(#arrowhead)');
  g.appendChild(path);
  svgEl.appendChild(g);
  return g;
}

function ensureArrowMarker(svgEl) {
  let defs = svgEl.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '8');
    marker.setAttribute('markerHeight', '8');
    marker.setAttribute('refX', '4');
    marker.setAttribute('refY', '4');
    marker.setAttribute('orient', 'auto');
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', '0 1, 8 4, 0 7');
    poly.setAttribute('fill', '#8E8E93');
    marker.appendChild(poly);
    defs.appendChild(marker);
    svgEl.prepend(defs);
  }
}

function createNodeEl(node, canvasEl, svgEl) {
  const NODE_W = 160;
  const el = document.createElement('div');
  el.className = 'cnv-node';
  el.dataset.id = node.id;
  el.style.left = node.x + 'px';
  el.style.top = node.y + 'px';
  el.style.borderTopColor = node.color || '#8E8E93';

  el.innerHTML = `
    <div class="cnv-node-drag-handle">
      <div class="cnv-node-dot" style="background:${node.color || '#8E8E93'}"></div>
      <div class="cnv-node-title-wrap">
        <div class="cnv-node-title" contenteditable="true" spellcheck="false">${node.title}</div>
        <div class="cnv-node-desc" contenteditable="true" spellcheck="false">${node.desc || ''}</div>
      </div>
    </div>
    <div class="cnv-node-actions">
      <button class="cnv-connect-btn" title="Connect to another node">
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="4" cy="8" r="2"/><circle cx="12" cy="8" r="2"/><path d="M6 8h4"/></svg>
      </button>
      <button class="cnv-delete-btn" title="Delete node">
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>
      </button>
    </div>
    <div class="cnv-port-bottom" title="Drag to connect"></div>
  `;

  // ---- DRAG MOVE ----
  const handle = el.querySelector('.cnv-node-drag-handle');
  let dragging = false, ox = 0, oy = 0, startX = 0, startY = 0;

  handle.addEventListener('mousedown', (e) => {
    if (e.target.closest('[contenteditable]')) return;
    dragging = true;
    const rect = canvasEl.getBoundingClientRect();
    ox = e.clientX - rect.left - node.x;
    oy = e.clientY - rect.top - node.y;
    el.style.zIndex = 100;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = canvasEl.getBoundingClientRect();
    node.x = Math.max(0, e.clientX - rect.left - ox);
    node.y = Math.max(0, e.clientY - rect.top - oy);
    el.style.left = node.x + 'px';
    el.style.top = node.y + 'px';
    renderSVGLines(canvasEl, svgEl);
  });

  document.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      el.style.zIndex = 10;
    }
  });

  // ---- CONNECT via PORT ----
  const portBottom = el.querySelector('.cnv-port-bottom');
  portBottom.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    e.preventDefault();
    canvasState.connecting = node.id;
    canvasEl.style.cursor = 'crosshair';
    // temp line
    const tmp = document.getElementById('cnv-temp-line');
    if (!tmp) {
      const tl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tl.setAttribute('id', 'cnv-temp-line');
      tl.setAttribute('fill', 'none');
      tl.setAttribute('stroke', '#146DFF');
      tl.setAttribute('stroke-width', '2');
      tl.setAttribute('stroke-dasharray', '6 3');
      svgEl.appendChild(tl);
    }
  });

  // ---- CONNECT VIA BUTTON ----
  el.querySelector('.cnv-connect-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    canvasState.connecting = node.id;
    canvasEl.style.cursor = 'crosshair';
    showToast(canvasEl, 'Click another node to connect →');
  });

  // ---- DROP-TARGET: accept connection ----
  el.addEventListener('click', (e) => {
    if (!canvasState.connecting || canvasState.connecting === node.id) return;
    const fromId = canvasState.connecting;
    const toId = node.id;
    const exists = canvasState.connections.some(c =>
      (c[0] === fromId && c[1] === toId) || (c[0] === toId && c[1] === fromId)
    );
    if (!exists) {
      canvasState.connections.push([fromId, toId]);
      renderCanvas(canvasEl, svgEl);
    }
    canvasState.connecting = null;
    canvasEl.style.cursor = '';
    removeTempLine(svgEl);
  });

  // ---- DELETE ----
  el.querySelector('.cnv-delete-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    canvasState.nodes = canvasState.nodes.filter(n => n.id !== node.id);
    canvasState.connections = canvasState.connections.filter(c => c[0] !== node.id && c[1] !== node.id);
    renderCanvas(canvasEl, svgEl);
  });

  return el;
}

function removeTempLine(svgEl) {
  const tmp = svgEl.querySelector('#cnv-temp-line');
  if (tmp) tmp.remove();
}

function renderSVGLines(canvasEl, svgEl) {
  svgEl.innerHTML = '';
  ensureArrowMarker(svgEl);
  canvasState.connections.forEach(([fromId, toId]) => {
    const from = canvasState.nodes.find(n => n.id === fromId);
    const to = canvasState.nodes.find(n => n.id === toId);
    if (from && to) drawArrow(svgEl, from, to);
  });
}

function showToast(container, msg) {
  const t = document.createElement('div');
  t.className = 'cnv-toast';
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}

// =========================================
// OPEN CONFIG OVERLAY
// =========================================
function openAgentConfig(agentKey) {
  let overlay = document.getElementById('agent-config-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'agent-config-overlay';
    overlay.id = 'agent-config-overlay';
    const apMain = document.querySelector('.ap-main');
    if (apMain) {
      apMain.style.position = 'relative';
      apMain.appendChild(overlay);
    } else {
      document.body.appendChild(overlay);
    }
  }

  const a = getAgentConfig(agentKey);

  overlay.innerHTML = `
    <!-- Header -->
    <div class="acfg-header">
      <div class="acfg-header-left">
        <div class="acfg-agent-icon" style="background:${a.color};">${a.icon}</div>
        <div>
          <div class="acfg-agent-title">${a.name}</div>
          <div class="acfg-agent-subtitle">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><path d="M8 4v4l2 2"/></svg>
            Last run: 4 mins ago · Enabled
          </div>
        </div>
      </div>
      <div class="acfg-header-right">
        <div class="acfg-header-status">
          Mode: <span style="color:#34C759;">Auto-Apply</span>
          <label class="acfg-toggle" style="margin-left:8px; width:34px; height:20px;">
            <input type="checkbox" checked>
            <span class="acfg-toggle-slider" style="border-radius:20px;"></span>
          </label>
        </div>
        <button class="acfg-header-btn">Test Agent</button>
        <button class="acfg-close-btn" id="acfg-close">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>
        </button>
      </div>
    </div>

    <!-- Main Content Split -->
    <div class="acfg-main">

      <!-- LEFT PANEL -->
      <div class="acfg-panel-left">

        <!-- 1. Description -->
        <div class="acfg-section">
          <div class="acfg-section-title">Description</div>
          <div class="acfg-desc-box">
            <div class="acfg-desc-title">Agent Purpose</div>
            <div class="acfg-desc-text" id="desc-purpose" contenteditable="true" spellcheck="false">${a.purpose}</div>

            <div class="acfg-desc-title">Primary Objective</div>
            <div class="acfg-desc-text" id="desc-objective" contenteditable="true" spellcheck="false">Solve: ${a.problems}</div>

            <div class="acfg-desc-title">Activation Conditions</div>
            <ul class="acfg-desc-list">
              ${a.activation.map(cond => `<li contenteditable="true" spellcheck="false">${cond}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- 2. Knowledge Base -->
        <div class="acfg-section">
          <div class="acfg-section-title">Knowledge Base</div>
          <div class="acfg-kb-chips">
            ${a.kb.map((src, i) => {
    const isConnected = i % 3 !== 2;
    // Pick a simple icon per type of source name
    const iconMap = { 'crm': '🗄', 'sla': '📋', 'legal': '⚖', 'employee': '👤', 'payroll': '💵', 'gps': '🛰', 'traffic': '🚦', 'site': '🏢', 'shift': '📅', 'risk': '⚠' };
    let icon = '📁';
    const low = src.toLowerCase();
    for (const [k, v] of Object.entries(iconMap)) { if (low.includes(k)) { icon = v; break; } }
    return `
              <div class="acfg-kb-chip ${isConnected ? 'active' : ''}">
                <div class="acfg-kb-chip-icon">${icon}</div>
                <span class="acfg-kb-chip-label">${src}</span>
                <span class="acfg-kb-chip-status">${isConnected ? 'Connected' : 'Add'}</span>
              </div>`;
  }).join('')}
          </div>
        </div>

        <!-- 3. Core Settings -->
        <div class="acfg-section">
          <div class="acfg-section-title">Core Settings</div>
          ${a.core.map(c => {
    if (c.type === 'toggle') {
      return `<div class="acfg-setting-row">
                <div class="acfg-setting-info">
                  <div class="acfg-setting-name">${c.name}</div>
                  <div class="acfg-setting-desc">${c.desc}</div>
                </div>
                <label class="acfg-toggle">
                  <input type="checkbox" ${c.enabled ? 'checked' : ''}>
                  <span class="acfg-toggle-slider"></span>
                </label>
              </div>`;
    } else if (c.type === 'slider') {
      return `<div class="acfg-slider-wrap" style="margin-top:12px;">
                <div class="acfg-slider-header">
                  <span class="acfg-slider-label">${c.name}</span>
                  <span class="acfg-slider-val" id="val-${c.id}">${c.value}${c.unit}</span>
                </div>
                <input type="range" class="acfg-slider" min="${c.min}" max="${c.max}" value="${c.value}" data-id="${c.id}" data-unit="${c.unit}">
              </div>`;
    }
  }).join('')}
        </div>

        <!-- 4. Guardrails -->
        <div class="acfg-section">
          <div class="acfg-section-title">Guardrails & Constraints</div>
          ${a.guardrails.length === 0 ? '<div class="acfg-setting-desc">No constraints defined.</div>' : ''}
          ${a.guardrails.map(g => {
    if (g.toggle) {
      return `<div class="acfg-setting-row">
                <div class="acfg-setting-info"><div class="acfg-setting-name">${g.name}</div></div>
                <label class="acfg-toggle"><input type="checkbox" ${g.enabled ? 'checked' : ''}><span class="acfg-toggle-slider"></span></label>
              </div>`;
    } else {
      return `<div class="acfg-slider-wrap">
                <div class="acfg-slider-header">
                  <span class="acfg-slider-label">${g.name}</span>
                  <span class="acfg-slider-val" id="val-${g.id}">${g.val}${g.unit}</span>
                </div>
                <input type="range" class="acfg-slider" min="${g.min || 0}" max="${g.max || 100}" value="${g.val}" data-id="${g.id}" data-unit="${g.unit}">
              </div>`;
    }
  }).join('')}
        </div>

        <!-- 5. Notifications -->
        <div class="acfg-section" style="border-bottom:none;">
          <div class="acfg-section-title">Notification Settings</div>
          ${a.notifications.length === 0 ? '<div class="acfg-setting-desc">No notifications configured.</div>' : ''}
          ${a.notifications.map(n => `
             <div class="acfg-setting-row" style="padding: 8px 0;">
                <div class="acfg-setting-name" style="font-weight:500;">${n.name}</div>
                <label class="acfg-toggle" style="width:34px; height:20px;">
                  <input type="checkbox" ${n.enabled ? 'checked' : ''}>
                  <span class="acfg-toggle-slider" style="border-radius:20px;"></span>
                </label>
              </div>
          `).join('')}
        </div>

      </div>

      <!-- RIGHT PANEL: Canvas -->
      <div class="acfg-panel-right">
        <div class="acfg-right-top">
          <div class="acfg-right-title">Workflow Canvas</div>
          <div style="display:flex;gap:8px;align-items:center;">
            <button class="acfg-canvas-add-btn" id="cnv-add-node">
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg>
              Add Node
            </button>
            <button class="acfg-canvas-add-btn" id="cnv-cancel-connect" style="display:none; background:#FFF0F0; color:#E43F32; border-color:#FFCDD2;">
              Cancel Connect
            </button>
          </div>
        </div>

        <!-- Free-form Canvas -->
        <div class="acfg-canvas-wrap" id="acfg-canvas-wrap">
          <svg class="acfg-canvas-svg" id="acfg-canvas-svg" xmlns="http://www.w3.org/2000/svg"></svg>
          <div class="acfg-canvas" id="acfg-canvas"></div>
        </div>

        ${a.sim ? `
        <div class="acfg-sim-widget" id="acfg-sim-widget">
          <div class="acfg-sim-title">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="#34C759" stroke-width="2"><path d="M2 8l4 4 8-8"/></svg>
            Simulation Results
          </div>
          <div class="acfg-sim-grid">
            <div class="acfg-sim-col">
              <div class="acfg-sim-col-title">Before</div>
              <div class="acfg-sim-stat"><span>Visits:</span><span>${a.sim.before.visits}</span></div>
              <div class="acfg-sim-stat"><span>ETA:</span><span>${a.sim.before.eta}</span></div>
              <div class="acfg-sim-stat"><span>Dist:</span><span>${a.sim.before.distance}</span></div>
            </div>
            <div class="acfg-sim-col">
              <div class="acfg-sim-col-title">After Optimized</div>
              <div class="acfg-sim-stat improved"><span>Visits:</span><span>${a.sim.after.visits}</span></div>
              <div class="acfg-sim-stat improved"><span>ETA:</span><span>${a.sim.after.eta}</span></div>
              <div class="acfg-sim-stat improved"><span>Dist:</span><span>${a.sim.after.distance}</span></div>
            </div>
          </div>
        </div>` : ''}
      </div>
    </div>

    <!-- Floating AI Chat -->
    <div class="acfg-floating-chat" id="acfg-floating-chat">
      <div class="acfg-chat-options" id="acfg-chat-options">
        <button class="acfg-chat-opt" data-prompt="Add a new knowledge base source for this agent">📚 Add Knowledge Base</button>
        <button class="acfg-chat-opt" data-prompt="Update the workflow to add an approval step after the last node">🔀 Update Workflow</button>
        <button class="acfg-chat-opt" data-prompt="Add a new guardrail rule to prevent this agent from running after hours">🛡 Update Rule</button>
      </div>
      <div class="acfg-chat-input-wrapper" id="acfg-chat-wrapper">
        <svg class="acfg-chat-sparkle" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z"/>
        </svg>
        <input type="text" id="acfg-chat-input" placeholder="Ask AI to modify this agent..." autocomplete="off">
        <button class="acfg-chat-send" id="acfg-chat-send">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h12M9 4l5 4-5 4"/></svg>
        </button>
      </div>
      <div class="acfg-chat-response" id="acfg-chat-response" style="display:none;"></div>
    </div>

    <!-- Bottom Footer -->
    <div class="acfg-footer">
      <div class="acfg-footer-left">
        <a class="acfg-footer-link">Version History</a>
        <a class="acfg-footer-link">Agent Logs</a>
      </div>
      <div class="acfg-footer-right">
        <button class="acfg-btn acfg-btn-secondary" id="acfg-reset">Discard Changes</button>
        <button class="acfg-btn acfg-btn-primary" id="acfg-save">Save Configuration</button>
      </div>
    </div>
  `;

  overlay.classList.add('open');

  // ---- CANVAS init ----
  const canvasEl = document.getElementById('acfg-canvas');
  const svgEl = document.getElementById('acfg-canvas-svg');
  ensureArrowMarker(svgEl);
  initCanvas(canvasEl, svgEl, a);

  // Moving temp line while connecting
  canvasEl.addEventListener('mousemove', (e) => {
    if (!canvasState.connecting) return;
    const rect = canvasEl.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const from = canvasState.nodes.find(n => n.id === canvasState.connecting);
    if (!from) return;
    const x1 = from.x + 80;
    const y1 = from.y + 68;
    let tmp = svgEl.querySelector('#cnv-temp-line');
    if (!tmp) {
      tmp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tmp.setAttribute('id', 'cnv-temp-line');
      tmp.setAttribute('fill', 'none');
      tmp.setAttribute('stroke', '#146DFF');
      tmp.setAttribute('stroke-width', '2');
      tmp.setAttribute('stroke-dasharray', '6 3');
      svgEl.appendChild(tmp);
    }
    const cy1 = y1 + (my - y1) * 0.5;
    const cy2 = my - (my - y1) * 0.5;
    tmp.setAttribute('d', `M${x1},${y1} C${x1},${cy1} ${mx},${cy2} ${mx},${my}`);
  });

  // Cancel connect on Escape
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape' && canvasState.connecting) {
      canvasState.connecting = null;
      canvasEl.style.cursor = '';
      removeTempLine(svgEl);
      document.removeEventListener('keydown', escHandler);
    }
  });

  // Add Node button
  document.getElementById('cnv-add-node').addEventListener('click', () => {
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4', '#FFB300'];
    const newId = 'n' + (++canvasState.nextId);
    canvasState.nodes.push({
      id: newId,
      title: 'New Node',
      desc: 'Click to edit description',
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
    renderCanvas(canvasEl, svgEl);
    showToast(canvasEl, 'Node added — drag it into position');
  });

  // Cancel connect button
  const cancelBtn = document.getElementById('cnv-cancel-connect');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      canvasState.connecting = null;
      canvasEl.style.cursor = '';
      removeTempLine(svgEl);
    });
    // Monitor connecting state to show/hide cancel button
    const connectMonitor = setInterval(() => {
      if (!document.getElementById('cnv-cancel-connect')) { clearInterval(connectMonitor); return; }
      document.getElementById('cnv-cancel-connect').style.display = canvasState.connecting ? 'flex' : 'none';
    }, 200);
  }

  // ---- CLOSE / SAVE ----
  document.getElementById('acfg-close').addEventListener('click', () => overlay.classList.remove('open'));
  document.getElementById('acfg-reset').addEventListener('click', () => overlay.classList.remove('open'));
  document.getElementById('acfg-save').addEventListener('click', (e) => {
    const btn = e.target;
    btn.textContent = 'Saving...';
    setTimeout(() => {
      btn.textContent = '✓ Saved';
      btn.style.background = '#34C759';
      setTimeout(() => { overlay.classList.remove('open'); }, 900);
    }, 800);
  });

  // ---- CHAT LOGIC ----
  const chatInput = document.getElementById('acfg-chat-input');
  const chatOptions = document.getElementById('acfg-chat-options');
  const chatWrapper = document.getElementById('acfg-chat-wrapper');
  const chatSend = document.getElementById('acfg-chat-send');
  const chatResp = document.getElementById('acfg-chat-response');

  // Click on input → show options
  chatInput.addEventListener('focus', () => {
    chatOptions.classList.add('show');
    chatWrapper.classList.add('focused');
  });

  // Hide options when clicking outside
  document.addEventListener('click', function chatClickOut(e) {
    const floating = document.getElementById('acfg-floating-chat');
    if (!floating) { document.removeEventListener('click', chatClickOut); return; }
    if (!floating.contains(e.target)) {
      chatOptions.classList.remove('show');
      chatWrapper.classList.remove('focused');
    }
  });

  // Chip buttons fill prompt and send
  chatOptions.querySelectorAll('.acfg-chat-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      chatInput.value = btn.dataset.prompt;
      chatOptions.classList.remove('show');
      sendChatMessage(chatInput, chatResp, chatSend);
    });
  });

  // Send on Enter key
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim()) {
      e.preventDefault();
      sendChatMessage(chatInput, chatResp, chatSend);
    }
  });

  // Send button
  chatSend.addEventListener('click', () => {
    if (chatInput.value.trim()) sendChatMessage(chatInput, chatResp, chatSend);
  });

  // ---- SLIDERS ----
  overlay.querySelectorAll('.acfg-slider').forEach(slider => {
    slider.addEventListener('input', () => {
      const val = document.getElementById(`val-${slider.dataset.id}`);
      if (val) val.textContent = `${slider.value}${slider.dataset.unit}`;
    });
  });
}

// AI Chat Simulation
const AI_RESPONSES = {
  'knowledge': 'Got it! I\'ve added a new Knowledge Base source. Connect it under the Knowledge Base section on the left panel.',
  'workflow': 'Workflow updated! I\'ve queued an Approval Step node. Click "Add Node" and connect it to the last step.',
  'rule': 'Rule added! A new guardrail constraint has been registered: "No execution after 10:00 PM". View it in Guardrails.',
  'default': 'I\'ve analyzed your request and updated the agent configuration. Review the changes in the relevant section.'
};

function sendChatMessage(inputEl, respEl, sendBtn) {
  const msg = inputEl.value.trim();
  if (!msg) return;

  inputEl.value = '';
  sendBtn.disabled = true;
  respEl.style.display = 'block';
  respEl.classList.remove('done');
  respEl.innerHTML = `<div class="acfg-typing"><span></span><span></span><span></span></div>`;

  // Simulate AI thinking delay
  setTimeout(() => {
    const lower = msg.toLowerCase();
    let reply = AI_RESPONSES.default;
    if (lower.includes('knowledge') || lower.includes('base')) reply = AI_RESPONSES.knowledge;
    if (lower.includes('workflow') || lower.includes('node')) reply = AI_RESPONSES.workflow;
    if (lower.includes('rule') || lower.includes('guardrail') || lower.includes('constraint')) reply = AI_RESPONSES.rule;

    typeText(respEl, reply, () => {
      sendBtn.disabled = false;
      respEl.classList.add('done');
    });
  }, 1200);
}

function typeText(el, text, onDone) {
  el.innerHTML = '<span class="acfg-ai-response-text"></span>';
  const span = el.querySelector('.acfg-ai-response-text');
  let i = 0;
  const timer = setInterval(() => {
    span.textContent += text[i++];
    if (i >= text.length) { clearInterval(timer); if (onDone) onDone(); }
  }, 18);
}

// ---- CARD CONFIG BUTTONS ----
function patchAgentPanelForConfig() {
  const obs = new MutationObserver(() => {
    document.querySelectorAll('.view-config:not(.config-patched)').forEach(btn => {
      btn.classList.add('config-patched');
      const card = btn.closest('.ap-card, .ap-agent-card');
      if (card) {
        const idStr = card.id || '';
        let key = 'route';
        if (idStr.includes('contract')) key = 'contract';
        if (idStr.includes('scheduling')) key = 'scheduling';
        if (idStr.includes('route')) key = 'route';
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openAgentConfig(key);
        });
      }
    });
  });
  obs.observe(document.body, { childList: true, subtree: true });
}

document.addEventListener('DOMContentLoaded', () => {
  patchAgentPanelForConfig();
});

function addConfigCTAToChat(agentKey) {
  openAgentConfig(agentKey);
}
