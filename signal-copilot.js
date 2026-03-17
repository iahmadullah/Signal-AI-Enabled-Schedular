/**
 * signal-copilot.js
 * Signal Co-Pilot — Full-Day Operational Intelligence Walkthrough
 * Standalone — does NOT modify any other file.
 * Uses the same calendar rendering as general.js
 */

'use strict';

/* ================================================================
   RE-USE general.js CALENDAR DATA & RENDERER
   We inline a copy of the renderCalendar / createGlobalCard logic
   so the grid looks identical to general.html.
   ================================================================ */
const globalData = {
    0: [
        { time: '9:30a - 10:30a', title: '🚗 Orlando Day R...', officer: 'Hazel Grace', vehicle: '34HFG77', status: 'not-started', isWarm: true },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Carlos M.', status: 'completed' },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Site Alpha', officer: 'John D.', status: 'completed' },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 2-B', title: 'South Zone', officer: 'Sophia L.', status: 'not-started' },
    ],
    1: [
        { time: '7:00a - 3:00p', shiftTag: 'Shift 1-A', title: 'Site Alpha', officer: 'Carlos M.', status: 'completed' },
        { time: '8:00a - 4:00p', shiftTag: 'Shift 2-B', title: 'Site Delta', officer: 'John D.', status: 'completed' },
        { time: '7:00a - 3:00p', shiftTag: 'Shift 3-C', title: 'Site Charlie', officer: 'Sophia L.', status: 'completed' },
        { time: '6:00a - 2:00p', shiftTag: 'Shift 4-D', title: 'West Zone', officer: 'Ahmed K.', status: 'completed' },
    ],
    2: [
        { time: '7:00a - 3:00p', shiftTag: 'Shift 1-A', title: 'South Zone', officer: 'Carlos M.', status: 'completed' },
        { time: '8:00a - 4:00p', shiftTag: 'Shift 2-B', title: 'Midtown Patrol', officer: 'John D.', status: 'in-progress' },
        { time: '12:00p - 8:00p', shiftTag: 'Shift 3-C', title: 'North Zone', officer: 'Sophia L.', status: 'completed' },
        { time: '8:00a - 4:00p', shiftTag: 'Shift 4-D', title: 'Site Foxtrot', officer: 'Ahmed K.', status: 'completed' },
    ],
    3: [ // WED (today)
        { time: '8:00a - 4:00p', shiftTag: 'Shift 1-A', title: 'Site Bravo', officer: 'Carlos M.', status: 'in-progress', isWarm: false },
        { time: '8:00a - 4:00p', shiftTag: 'Shift 2-B', title: 'Midtown Patrol', officer: 'John D.', status: 'in-progress' },
        { time: '8:00a - 4:00p', shiftTag: 'Shift 3-C', title: 'Site Echo', officer: 'Sophia L.', status: 'completed' },
        { time: '8:00a - 6:00p', shiftTag: 'Shift 4-D', title: 'South Zone (+2h)', officer: 'Ahmed K.', status: 'in-progress' },
    ],
    4: [
        { time: '7:00a - 3:00p', shiftTag: 'Shift 1-A', title: 'Midtown Patrol', officer: 'Carlos M.', status: 'not-started' },
        { time: '7:00a - 3:00p', shiftTag: 'Shift 2-B', title: 'Site Alpha', officer: 'John D.', status: 'not-started' },
        { time: '8:00a - 4:00p', shiftTag: 'Shift 3-C', title: 'Midtown Patrol', officer: 'Sophia L.', status: 'not-started' },
        { time: '8:00a - 4:00p', shiftTag: 'Shift 4-D', title: 'East Zone', officer: 'Ahmed K.', status: 'not-started' },
    ],
    5: [
        { time: '6:00a - 12:00p', shiftTag: 'Shift 1-A', title: 'Reduced OT', officer: 'Carlos M.', status: 'not-started', isOT: true },
        { time: '8:00a - 4:00p', shiftTag: 'Shift 2-B', title: 'South Zone', officer: 'John D.', status: 'not-started' },
        { time: '6:00a - 2:00p', shiftTag: 'Shift 3-C', title: 'Midtown Patrol', officer: 'Sophia L.', status: 'not-started' },
    ],
    6: [
        { time: '6:00a - 2:00p', shiftTag: 'Shift 2-B', title: 'OT — Patrol', officer: 'John D.', status: 'unassigned', isOT: true },
    ],
};

let currentView = 'week';
let currentScene = 0;
let isRunning = false;
let slaInterval = null;

/* ================================================================
   GENERAL.JS CALENDAR RENDERER (verbatim copy)
   ================================================================ */
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function createGlobalCard(data) {
    const card = document.createElement('div');
    card.className = 'g-card' + (data.isWarm ? ' g-card--warm' : '');
    if (data._id) card.dataset.cardId = data._id;

    let html = '<div class="g-card-body">';
    if (data.isOT) {
        html += `<div class="g-card-ot-badge">
      <svg viewBox="0 0 12 12" fill="none"><path d="M6 1L1 11h10L6 1z" fill="#F4780B"/><text x="6" y="9" text-anchor="middle" font-size="6" font-weight="bold" fill="white">!</text></svg>
      <span>OT</span>
    </div>`;
    }
    html += '<div class="g-card-header">';
    html += `<span class="g-card-time">${data.time}</span>`;
    if (data.shiftTag) {
        html += `<span class="g-card-shift-tag">
      <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1" y="1" width="6" height="6" rx="0.5"/></svg>
      ${data.shiftTag}
    </span>`;
    }
    html += '</div>';
    html += `<div class="g-card-title">${data.title}</div>`;
    if (data.location) html += `<div class="g-card-title">${data.location}</div>`;
    html += '<div class="g-card-details">';
    html += `<div class="g-card-row">
    <div class="g-card-row-avatar g-card-row-avatar--person">
      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:6px;font-weight:500;color:#146DFF;">${getInitials(data.officer)}</div>
    </div>
    <span class="g-card-row-text">${data.officer}</span>
  </div>`;
    if (data.vehicle) {
        html += `<div class="g-card-row">
      <div class="g-card-row-avatar g-card-row-avatar--vehicle">
        <svg viewBox="0 0 14 14" fill="none" style="width:10px;height:10px;">
          <path d="M2 8h10l-.7-3H2.7L2 8z" fill="#6A6A70"/>
          <circle cx="4" cy="10" r="1.2" fill="#6A6A70"/><circle cx="10" cy="10" r="1.2" fill="#6A6A70"/>
          <path d="M2 8v2.5M12 8v2.5" stroke="#6A6A70" stroke-width="0.8"/>
        </svg>
      </div>
      <span class="g-card-row-text">${data.vehicle}</span>
    </div>`;
    }
    if (!data.vehicle && !data.location) {
        html += `<div class="g-card-row">
      <div class="g-card-row-avatar g-card-row-avatar--vehicle">
        <svg viewBox="0 0 14 14" fill="none" style="width:10px;height:10px;"><path d="M7 3v8M3 7h8" stroke="#6A6A70" stroke-width="1.2" stroke-linecap="round"/></svg>
      </div>
      <span class="g-card-row-text" style="color:#CCC;">Unassigned</span>
    </div>`;
    }
    html += '</div></div>';
    html += `<div class="g-card-status g-card-status--${data.status}"></div>`;
    card.innerHTML = html;
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.97)';
        setTimeout(() => { card.style.transform = ''; }, 150);
    });
    return card;
}

function renderCalendar() {
    const calHeader = document.getElementById('calendar-header');
    const calBody = document.getElementById('calendar-body');
    if (!calHeader || !calBody) return;
    calHeader.innerHTML = '';
    calBody.innerHTML = '';

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const daysNumbers = [3, 4, 5, 6, 7, 8, 9];

    if (currentView === 'week') {
        calHeader.style.gridTemplateColumns = 'repeat(7, 1fr)';
        calBody.style.gridTemplateColumns = 'repeat(7, 1fr)';
        calBody.style.gridTemplateRows = 'none';

        daysOfWeek.forEach((day, index) => {
            const cell = document.createElement('div');
            cell.className = 'calendar-header-cell global-header-cell' + (index === 3 ? ' today' : '');
            const numClass = index === 3 ? 'day-number today-circle' : 'day-number';
            cell.innerHTML = `<span class="day-name">${day}</span><span class="${numClass}">${daysNumbers[index]}</span>`;
            calHeader.appendChild(cell);
        });

        const maxCards = Math.max(...Object.values(globalData).map(col => col.length));
        const slotsCount = Math.max(maxCards, 5);

        for (let day = 0; day < 7; day++) {
            const column = document.createElement('div');
            column.className = 'calendar-column' + (day === 3 ? ' today-column' : '');
            column.dataset.day = day;
            const dayCards = globalData[day] || [];

            for (let i = 0; i < slotsCount; i++) {
                const slot = document.createElement('div');
                slot.className = 'card-slot g-slot';
                slot.dataset.day = day;
                slot.dataset.slot = i;
                if (dayCards[i]) {
                    const cardData = { ...dayCards[i], _id: `card-d${day}s${i}` };
                    slot.appendChild(createGlobalCard(cardData));
                }
                column.appendChild(slot);
            }
            calBody.appendChild(column);
        }

    } else if (currentView === 'day') {
        calHeader.style.gridTemplateColumns = '1fr';
        calBody.style.gridTemplateColumns = '1fr';
        const cell = document.createElement('div');
        cell.className = 'calendar-header-cell global-header-cell today';
        cell.innerHTML = '<span class="day-name">WED</span><span class="day-number today-circle">6</span>';
        calHeader.appendChild(cell);
        const column = document.createElement('div');
        column.className = 'calendar-column today-column';
        column.dataset.day = 3;
        const dayCards = globalData[3] || [];
        for (let i = 0; i < Math.max(dayCards.length, 5); i++) {
            const slot = document.createElement('div');
            slot.className = 'card-slot g-slot';
            if (dayCards[i]) slot.appendChild(createGlobalCard({ ...dayCards[i], _id: `card-d3s${i}` }));
            column.appendChild(slot);
        }
        calBody.appendChild(column);

    } else {
        // month — simplified
        calHeader.style.gridTemplateColumns = 'repeat(7, 1fr)';
        calBody.style.gridTemplateColumns = 'repeat(7, 1fr)';
        calBody.style.gridTemplateRows = 'repeat(5, minmax(90px, auto))';
        ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].forEach(day => {
            const cell = document.createElement('div');
            cell.className = 'calendar-header-cell global-header-cell';
            cell.innerHTML = `<span class="day-name">${day}</span>`;
            calHeader.appendChild(cell);
        });
        let startDate = 1;
        for (let i = 0; i < 35; i++) {
            const cell = document.createElement('div');
            cell.style.cssText = 'border-right:1px solid var(--color-border-subtle-01);border-bottom:1px solid var(--color-border-subtle-01);padding:8px;display:flex;flex-direction:column;gap:4px;';
            const dateNum = document.createElement('div');
            const dateVal = startDate + i > 31 ? (startDate + i - 31) : (startDate + i);
            dateNum.textContent = dateVal;
            dateNum.style.cssText = 'font-size:12px;color:var(--color-text-secondary-01);font-weight:500;margin-bottom:2px;';
            cell.appendChild(dateNum);
            calBody.appendChild(cell);
        }
    }
}

/* ================================================================
   VIEW TOGGLE
   ================================================================ */
function initViewToggle() {
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            renderCalendar();
        });
    });
}

/* ================================================================
   SCENE DEFINITIONS
   ================================================================ */
const CHAT_FLOW = [
    {
        agents: ['scheduling', 'route', 'performance', 'contract', 'monitoring'],
        setup: setupScene1,
        aiMessage: 'Good morning. I ran an overnight scan.\n\nToday\'s priority signals:\n• 3 officers approaching fatigue threshold\n• 2 patrol zones imbalanced (Midtown & South)\n• 4 unassigned weekend shifts\n• 1 contract expiring in 4 days\n• High traffic probability after 5 PM\n\nWhere would you like to start?',
        quickActions: ['Stabilize fatigue risks', 'Optimize Midtown patrol']
    },
    {
        userTrigger: 'Stabilize fatigue risks',
        agents: ['scheduling', 'performance'],
        setup: setupScene2,
        simulation: true,
        simCards: [[5, 0], [3, 3], [0, 1]],  // Carlos Fri, Ahmed Wed, Carlos Sun
        simTracks: [
            { icon: '⏱', label: 'Fatigue rebalance', status: 'Projecting 7-day OT curves…' },
            { icon: '📍', label: 'Shift coverage model', status: 'Checking zone gaps & overlaps…' },
            { icon: '📊', label: 'Performance scoring', status: 'Scoring output per officer…' },
            { icon: '🔁', label: 'Swap feasibility', status: 'Validating contract constraints…' }
        ],
        aiMessage: 'Analyzing fatigue trajectories…\n\nCarlos → projected 48h by Friday\nJohn → projected 46h\nSophia → safe at 38h\n\nSimulating rebalance across remaining shifts…\n\nProposal:\n• Move Friday Patrol: Carlos → Sophia\n• Extend Ahmed +2h Wednesday\n• Reduce John\'s Sunday shift by 2h\n\nKeeps everyone under 44 hours.\n\nApply?',
        quickActions: ['Apply recommendations']
    },
    {
        userTrigger: 'Apply recommendations',
        agents: ['scheduling'],
        aiMessage: '✅ Applied. Scheduler updated and officers notified. Risk indicators cleared.',
        quickActions: ['Optimize Midtown patrol']
    },
    {
        userTrigger: 'Optimize Midtown patrol',
        agents: ['route', 'monitoring'],
        setup: setupScene3,
        simulation: true,
        simCards: [[0, 1], [4, 2], [1, 1]],  // Patrol cards across the week
        simTracks: [
            { icon: '🗺', label: 'Route modelling', status: 'Computing shortest patrol paths…' },
            { icon: '📍', label: 'Hit density analysis', status: 'Mapping incident clusters…' },
            { icon: '⚡', label: 'Traffic forecast', status: 'Integrating real-time data…' },
            { icon: '🔄', label: 'Officer rebalance', status: 'Redistributing patrol zones…' }
        ],
        aiMessage: 'Current patrol load:\n• Carlos: 32 hits (7h)\n• John: 25 hits (6h 30m)\n• Sophia: 18 hits (4h)\n\nIdentifying redundancies + traffic inefficiencies…\n\nRebalanced distribution:\n• Carlos: 24 hits\n• John: 19 hits\n• Sophia: 24 hits\n\nDistance reduced: 5.1 miles\nTime saved: 2h 10m combined\nCoverage score: 94%\n\nReassign spare time to other zones?',
        quickActions: ['Use spare time productively']
    },
    {
        userTrigger: 'Use spare time productively',
        agents: ['route', 'scheduling'],
        setup: setupScene4,
        aiMessage: '7 unassigned low-risk hits available nearby.\n\nIf added to John:\n• Completes shift in 4h 20m\n• No fatigue impact\n• SLA unaffected\n\nAdd 4 hits to John\'s route?',
        quickActions: ['Add 4 hits to John']
    },
    {
        userTrigger: 'Add 4 hits to John',
        agents: ['route'],
        aiMessage: '✅ Assignment confirmed. John\'s route updated.',
        quickActions: ['Monitor real-time operations']
    },
    {
        userTrigger: 'Monitor real-time operations',
        agents: ['dispatch', 'route', 'scheduling', 'monitoring'],
        setup: setupScene5,
        emergency: true,
        aiMessage: '🚨 Emergency at Walmart.\n\nNearest officer: John (8 min away).\n\nAssigning and adjusting patrol density…\n\nDispatch resolved in 11 minutes.\nNo SLA breach.\n3 low-risk hits deferred.\n\nReschedule them tonight or tomorrow?',
        quickActions: ['Reschedule tomorrow']
    },
    {
        userTrigger: 'Reschedule tomorrow',
        agents: ['contract', 'performance'],
        setup: setupScene6,
        aiMessage: 'Got it. 3 deferred visits moved to tomorrow at 8 AM.\nSLA impact: None.\n\nBy the way, Milwaukee Tool contract expires in 4 days.\n\nPerformance Summary:\n• SLA: 100%\n• Patrol efficiency: +8%\n• Dispatches handled: 12\n\nI can generate a renewal draft, an upsell recommendation, or a performance summary.',
        quickActions: ['Generate renewal draft']
    },
    {
        userTrigger: 'Generate renewal draft',
        agents: ['contract'],
        aiMessage: 'Renewal draft generated.\n\nKey changes from current contract:\n• Coverage: +2 sites\n• Patrol hours: 480 → 520h/month\n• Est. revenue impact: +$8,400/month',
        contract: true,
        quickActions: ['How did we perform today?']
    },
    {
        userTrigger: 'How did we perform today?',
        agents: ['scheduling', 'route', 'performance', 'contract', 'monitoring', 'dispatch'],
        setup: setupScene7,
        aiMessage: 'Today\'s AI interventions:\n• 3 fatigue risks prevented\n• 14 visits optimized\n• 6 visits reassigned\n• 1 dispatch auto-managed\n• 0 SLA breaches\n• 2.3 miles saved per officer\n• Labor efficiency: +12%\n\nOperational Health Score: 94%',
        analytics: true,
        quickActions: ['Close session']
    },
    {
        userTrigger: 'Close session',
        agents: [],
        aiMessage: 'Session saved. Tomorrow\'s supervisor briefing has been queued for 7:45 AM. Have a good evening!'
    }
];

let currentStep = 0;

/* ================================================================
   DOM HELPERS
   ================================================================ */
const qs = s => document.querySelector(s);

const messagesEl = qs('#scp-messages');
const thinkingEl = qs('#scp-thinking');
const inputEl = qs('#scp-input');
const sendBtn = qs('#scp-send-btn');
const quickActionsEl = qs('#scp-quick-actions');
const agentPillsEl = qs('#scp-agent-pills');
const emergencyBanner = qs('#scp-emergency-banner');
const analyticsOverlay = qs('#scp-analytics');
const contractPanel = qs('#scp-contract-panel');
const balancedTag = qs('#scp-balanced-tag');

const sleep = ms => new Promise(r => setTimeout(r, ms));

function scrollMessages() {
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
}

function fmtTime() {
    return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

/* ================================================================
   MICRO-INTERACTIONS — SCANNER
   ================================================================ */
const scanOverlay = qs('#scp-scan-overlay');
const scanProgress = qs('#scp-scan-progress');

async function runScanAnimation(durationMs = 2000) {
    if (!scanOverlay) return;
    scanOverlay.classList.add('active');

    // Stagger-scan every visible card
    const cards = document.querySelectorAll('.g-card');
    let delay = 0;
    cards.forEach(card => {
        setTimeout(() => {
            card.classList.add('card-scanning');
            setTimeout(() => card.classList.remove('card-scanning'), 700);
        }, delay);
        delay += 60;
    });

    // Progress bar sweep
    if (scanProgress) {
        scanProgress.style.transition = `width ${durationMs}ms linear`;
        scanProgress.style.width = '100%';
    }

    await sleep(durationMs + 200);
    scanOverlay.classList.remove('active');
    if (scanProgress) {
        scanProgress.style.transition = 'none';
        scanProgress.style.width = '0';
    }
}

/* ================================================================
   MICRO-INTERACTIONS — GHOST CARD FLY (shift reassignment)
   ================================================================ */
function animateCardMove(fromSlot, toSlot, label = 'Reassigning shift…') {
    if (!fromSlot || !toSlot) return;
    const fromRect = fromSlot.getBoundingClientRect();
    const toRect = toSlot.getBoundingClientRect();

    // Mark source as departing
    const srcCard = fromSlot.querySelector('.g-card');
    if (srcCard) srcCard.classList.add('card-departing');

    // Mark target slot as receiving
    toSlot.classList.add('slot-receiving');

    // Create ghost element
    const ghost = document.createElement('div');
    ghost.className = 'scp-ghost-card';
    ghost.innerHTML = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10 3v7l4 4" stroke-linecap="round"/>
        <circle cx="10" cy="10" r="8"/>
    </svg>${label}`;

    // Position at source
    ghost.style.left = `${fromRect.left + fromRect.width / 2 - 70}px`;
    ghost.style.top = `${fromRect.top}px`;
    ghost.style.width = `${Math.max(fromRect.width, 140)}px`;

    // Compute fly deltas (source → destination)
    const dx = (toRect.left + toRect.width / 2) - (fromRect.left + fromRect.width / 2);
    const dy = toRect.top - fromRect.top;
    ghost.style.setProperty('--fly-x', `${dx}px`);
    ghost.style.setProperty('--fly-y', `${dy}px`);

    document.body.appendChild(ghost);
    requestAnimationFrame(() => ghost.classList.add('animating'));

    // After fly: clean up and pop-in at destination
    setTimeout(() => {
        ghost.remove();
        toSlot.classList.remove('slot-receiving');
        if (srcCard) srcCard.classList.remove('card-departing');
        const destCard = toSlot.querySelector('.g-card');
        if (destCard) destCard.classList.add('card-arriving', 'card-highlight-success');
    }, 950);
}

/* ================================================================
   AGENT PILLS
   ================================================================ */
function activateAgents(keys) {
    const barLabel = qs('#scp-agent-bar-label');

    document.querySelectorAll('.scp-agent-pill').forEach(pill => {
        const k = pill.dataset.agent;
        // Clear previous states
        pill.classList.remove('active', 'resolved');

        if (keys.includes(k)) {
            // Pop the pill in with spinner (working state)
            pill.classList.add('active');
            // After 2.2s → swap spinner for green pulse dot (resolved)
            setTimeout(() => pill.classList.add('resolved'), 2200);
        }
    });

    // Show/hide the "Active:" label
    if (barLabel) {
        barLabel.style.display = keys.length > 0 ? '' : 'none';
    }
}

/* ================================================================
   MESSAGES
   ================================================================ */
function addMessage(role, text, extras = {}) {
    const msg = document.createElement('div');
    msg.className = `scp-msg scp-msg--${role}`;

    const av = document.createElement('div');
    av.className = 'scp-msg-avatar';
    av.textContent = role === 'ai' ? '✦' : 'MS';

    const body = document.createElement('div');
    body.className = 'scp-msg-body';

    const bubble = document.createElement('div');
    bubble.className = 'scp-msg-bubble';
    bubble.textContent = text;
    body.appendChild(bubble);

    const time = document.createElement('div');
    time.className = 'scp-msg-time';
    time.textContent = fmtTime();
    body.appendChild(time);

    if (extras.simulation) {
        const panel = buildSimPanel(extras.simTracks || DEFAULT_SIM_TRACKS);
        body.appendChild(panel);
        // Highlight impacted scheduler cards while simulation runs
        if (extras.simCards) highlightSimCards(extras.simCards);
    }

    if (extras.showActions && extras.actions && extras.actions.length) {
        const actRow = document.createElement('div');
        actRow.className = 'scp-msg-actions';
        extras.actions.forEach((a, i) => {
            const chip = document.createElement('button');
            chip.className = 'scp-action-chip' + (i > 0 ? ' scp-action-chip--secondary' : '');
            chip.textContent = a;
            chip.addEventListener('click', () => {
                inputEl.value = a;
                inputEl.focus();
            });
            actRow.appendChild(chip);
        });
        body.appendChild(actRow);
    }

    msg.appendChild(av);
    msg.appendChild(body);
    messagesEl.appendChild(msg);
    scrollMessages();
    return msg;
}

async function showThinking(ms = 900) {
    thinkingEl.classList.add('visible');
    scrollMessages();
    await sleep(ms);
    thinkingEl.classList.remove('visible');
}

/* ================================================================
   SIMULATION PANEL BUILDER
   ================================================================ */
const DEFAULT_SIM_TRACKS = [
    { icon: '⏱', label: 'Fatigue rebalance', status: 'Projecting 7-day OT curves…' },
    { icon: '📍', label: 'Shift coverage model', status: 'Checking zone gaps & overlaps…' },
    { icon: '📊', label: 'Performance scoring', status: 'Scoring output per officer…' },
    { icon: '🔁', label: 'Swap feasibility', status: 'Validating contract constraints…' }
];

function buildSimPanel(tracks) {
    const panel = document.createElement('div');
    panel.className = 'scp-sim-panel';

    // Header
    panel.innerHTML = `
        <div class="scp-sim-header">
            <div class="scp-sim-spinner"></div>
            <span class="scp-sim-title">Running ${tracks.length} simulations…</span>
            <span class="scp-sim-count" id="scp-sim-count">0 / ${tracks.length}</span>
        </div>
        <div class="scp-sim-tracks" id="scp-sim-tracks"></div>
        <div class="scp-sim-footer">
            <span class="scp-sim-eta">Est. completion: ~3s</span>
            <span class="scp-sim-done-badge">✓ All complete</span>
        </div>`;

    const tracksEl = panel.querySelector('#scp-sim-tracks');
    const countEl = panel.querySelector('#scp-sim-count');

    // Build each track row
    tracks.forEach((t, i) => {
        const row = document.createElement('div');
        row.className = 'scp-sim-track';
        row.innerHTML = `
            <div class="scp-sim-track-header">
                <span class="scp-sim-track-name">
                    <span class="scp-sim-track-icon">${t.icon}</span>
                    ${t.label}
                </span>
                <span class="scp-sim-track-pct" id="pct-${i}">0%</span>
            </div>
            <div class="scp-sim-bar-bg"><div class="scp-sim-bar-fill" id="fill-${i}"></div></div>
            <span class="scp-sim-track-status" id="status-${i}">${t.status}</span>`;
        tracksEl.appendChild(row);
    });

    // Animate each track staggered
    let done = 0;
    tracks.forEach((t, i) => {
        const delay = i * 420; // stagger start
        const duration = 1800 + i * 300; // each takes slightly different time
        const fill = panel.querySelector(`#fill-${i}`);
        const pct = panel.querySelector(`#pct-${i}`);
        const sta = panel.querySelector(`#status-${i}`);

        setTimeout(() => {
            // Count up % with requestAnimationFrame
            const start = performance.now();
            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const pctVal = Math.round(progress * 100);
                fill.style.width = pctVal + '%';
                pct.textContent = pctVal + '%';
                if (pctVal >= 60 && pctVal < 90) sta.textContent = 'Optimising candidates…';
                if (pctVal >= 90) sta.textContent = 'Finalising…';
                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    pct.textContent = '100%';
                    pct.classList.add('done');
                    sta.textContent = '✓ Complete';
                    done++;
                    countEl.textContent = `${done} / ${tracks.length}`;
                    if (done === tracks.length) {
                        panel.classList.add('complete');
                        countEl.textContent = `${tracks.length} / ${tracks.length}`;
                    }
                }
            }
            requestAnimationFrame(tick);
        }, delay);
    });

    return panel;
}

/* ================================================================
   SCHEDULER CARD SIM HIGHLIGHTER
   ================================================================ */
function highlightSimCards(slotList) {
    // slotList = array of [day, slotIdx] to tag as "simulating"
    const tagged = [];
    slotList.forEach(([day, slotIdx]) => {
        const card = getCardInSlot(day, slotIdx);
        if (!card) return;
        card.classList.add('card-simulating');
        card.style.position = 'relative';

        // Inject sim badge
        const badge = document.createElement('div');
        badge.className = 'scp-sim-badge';
        badge.innerHTML = `<span class="scp-badge-dot"></span> Simulating`;
        card.appendChild(badge);
        tagged.push({ card, badge });
    });

    // Auto-remove sim state after simulation completes (~4.5s)
    setTimeout(() => {
        tagged.forEach(({ card, badge }) => {
            card.classList.remove('card-simulating');
            badge.remove();
        });
    }, 4500);
}

/* ================================================================
   SCENE RUNNER
   ================================================================ */
async function runStep(idx) {
    if (isRunning) return;
    isRunning = true;
    currentStep = idx;

    const step = CHAT_FLOW[idx];
    if (step.agents) activateAgents(step.agents);
    if (step.setup) step.setup();

    setQuickActions([]); // clear old quick actions

    await sleep(200);
    await showThinking(step.simulation ? 2200 : 900);

    addMessage('ai', step.aiMessage, {
        simulation: step.simulation,
        simTracks: step.simTracks,
        simCards: step.simCards,
        showActions: !!step.quickActions,
        actions: step.quickActions || []
    });

    if (step.emergency) setupScene5Emergency();
    if (step.analytics) triggerAnalytics();
    if (step.contract) setTimeout(() => contractPanel.classList.add('active'), 700);

    isRunning = false;

    // Auto-suggest next step in input area
    const nextStepInfo = CHAT_FLOW[idx + 1];
    if (nextStepInfo && nextStepInfo.userTrigger) {
        inputEl.placeholder = `Suggestion: ${nextStepInfo.userTrigger}…`;
    } else {
        inputEl.placeholder = "Ask Signal Co-Pilot…";
    }
}

function setQuickActions(list) {
    if (!quickActionsEl) return;
    quickActionsEl.innerHTML = '';
    (list || []).forEach(text => {
        const btn = document.createElement('button');
        btn.className = 'scp-quick-action';
        btn.textContent = text;
        btn.addEventListener('click', () => handleUserInput(text));
        quickActionsEl.appendChild(btn);
    });
}

/* ================================================================
   SCENE SETUPS — animate the general.html scheduler cards
   ================================================================ */
function getSlot(day, slot) {
    return qs(`[data-day="${day}"][data-slot="${slot}"]`);
}

function getCardInSlot(day, slot) {
    const s = getSlot(day, slot);
    return s ? s.querySelector('.g-card') : null;
}

function setupScene1() {
    // Run scanning beam across the whole calendar grid
    runScanAnimation(2200);

    // Stagger warn highlights: fatigue cards light up after scan starts
    setTimeout(() => {
        [getCardInSlot(5, 0)].forEach(card => {
            if (card) card.classList.add('card-highlight-warn');
        });
        // Saturday unassigned slot pulses as a gap
        const sat = getSlot(6, 1);
        if (sat && !sat.querySelector('.g-card')) {
            const ph = document.createElement('div');
            ph.className = 'scp-unassigned-slot-label pulse';
            ph.textContent = '+ Unassigned';
            sat.appendChild(ph);
        }
        // Contract expiry badge on Wed day=3 slot=0
        const wedCard = getCardInSlot(3, 0);
        if (wedCard && !wedCard.querySelector('.scp-expiry-badge')) {
            wedCard.style.position = 'relative';
            const badge = document.createElement('span');
            badge.className = 'scp-expiry-badge';
            badge.textContent = '4d left';
            wedCard.appendChild(badge);
        }
    }, 900);
}

function setupScene2() {
    // Quick scan first to show AI is assessing
    runScanAnimation(1400);

    setTimeout(() => {
        // Carlos Fri → animate ghost flying to a reduced slot (same col, shorter)
        const carlsFri = getCardInSlot(5, 0);
        if (carlsFri) {
            carlsFri.classList.remove('card-highlight-warn');
            carlsFri.classList.add('card-departing');
        }
    }, 400);

    // Ghost card fly: Carlos from Fri high slot → Fri same day, showing reduction
    setTimeout(() => {
        const fromSlot = getSlot(5, 0);
        const toSlot = getSlot(5, 2);  // Sophia's slot — will be repopulated
        animateCardMove(fromSlot, toSlot, 'Reassigning OT → Reduced');
    }, 800);

    // After fly lands: rebalanced state
    setTimeout(() => {
        // Carlos Fri → turn green (balanced / reduced)
        const carlsFri = getCardInSlot(5, 0);
        if (carlsFri) {
            carlsFri.classList.remove('card-departing');
            carlsFri.classList.add('card-highlight-success');
            const timeEl = carlsFri.querySelector('.g-card-time');
            if (timeEl) timeEl.textContent = '6:00a - 12:00p';
            const titleEl = carlsFri.querySelector('.g-card-title');
            if (titleEl) titleEl.textContent = 'Reduced OT';
        }
        // Sophia Fri (5,2) — new card arrives
        const sophiaSlt = getSlot(5, 2);
        if (sophiaSlt) {
            sophiaSlt.innerHTML = '';
            const newCard = createGlobalCard({
                time: '6:00a - 2:00p', shiftTag: 'Shift 1-A',
                title: 'Midtown Patrol', officer: 'Sophia L.', status: 'not-started', _id: 'sophia-fri-new'
            });
            sophiaSlt.appendChild(newCard);
            newCard.classList.add('card-arriving', 'card-highlight-success');
        }
        // Ahmed Wed (3,3) — extended
        const ahmedWed = getCardInSlot(3, 3);
        if (ahmedWed) {
            const t = ahmedWed.querySelector('.g-card-time');
            if (t) t.textContent = '8:00a - 6:00p';
            const tt = ahmedWed.querySelectorAll('.g-card-title')[0];
            if (tt) tt.textContent = 'South Zone (+2h)';
            ahmedWed.classList.add('card-highlight-success');
        }
        // Show balanced tag
        if (balancedTag) balancedTag.style.display = 'inline-flex';
    }, 2000);
}

function setupScene3() {
    // Scan beam sweeps to '"analyse" patrol routes
    runScanAnimation(1600);

    setTimeout(() => {
        // Highlight all patrol cards with a blue pulse
        document.querySelectorAll('.g-card').forEach(card => {
            const title = card.querySelector('.g-card-title');
            if (title && title.textContent.includes('Patrol')) {
                card.classList.add('card-scanning');
                setTimeout(() => card.classList.remove('card-scanning'), 800);
            }
        });
    }, 400);

    setTimeout(() => {
        // Update Sophia's patrol slots with optimized hit count
        [getCardInSlot(0, 1), getCardInSlot(4, 2)].forEach(card => {
            if (card) {
                const title = card.querySelector('.g-card-title');
                if (title) title.textContent = 'Midtown (24 hits)';
                card.classList.add('card-highlight-success');
            }
        });
    }, 2200);
}

function setupScene4() {
    setTimeout(() => {
        // John's Tue and Wed cards glow purple
        [getCardInSlot(2, 1), getCardInSlot(3, 1)].forEach(card => {
            if (card) {
                card.style.transition = 'all 0.4s ease';
                card.style.borderLeftColor = '#8B5CF6';
                card.style.background = '#F5F3FF';
                card.style.boxShadow = '0 0 0 2px rgba(139,92,246,0.3)';
            }
        });
        setTimeout(() => {
            const johnWed = getCardInSlot(3, 1);
            if (johnWed) {
                const t = johnWed.querySelector('.g-card-title');
                if (t) t.textContent = 'Midtown (+4 hits)';
                johnWed.classList.add('card-highlight-success');
                johnWed.style.borderLeftColor = '';
                johnWed.style.background = '';
                johnWed.style.boxShadow = '';
            }
        }, 1200);
    }, 700);
}

function setupScene5() {
    // Emergency shown via message trigger
}

function setupScene5Emergency() {
    emergencyBanner.classList.add('active');
    const johnWed = getCardInSlot(3, 1);
    if (johnWed) {
        johnWed.classList.add('card-dispatch');
        const t = johnWed.querySelector('.g-card-title');
        if (t) t.textContent = '🚨 Dispatch – Walmart';
        const time = johnWed.querySelector('.g-card-time');
        if (time) time.textContent = '2:32 PM';
    }
    startSLATimer(11 * 60);
    setTimeout(() => {
        stopSLATimer();
        emergencyBanner.classList.remove('active');
        if (johnWed) {
            johnWed.classList.remove('card-dispatch');
            johnWed.classList.add('card-highlight-success');
            const t = johnWed.querySelector('.g-card-title');
            if (t) t.textContent = '✓ Dispatch Resolved';
        }
    }, 5500);
}

function setupScene6() {
    const wedCard = getCardInSlot(3, 0);
    if (wedCard && !wedCard.querySelector('.scp-expiry-badge')) {
        wedCard.style.position = 'relative';
        const badge = document.createElement('span');
        badge.className = 'scp-expiry-badge';
        badge.textContent = '4d left';
        wedCard.appendChild(badge);
    }
}

function setupScene7() {
    emergencyBanner.classList.remove('active');
    contractPanel.classList.remove('active');
    stopSLATimer();
}

/* ================================================================
   SLA TIMER
   ================================================================ */
function startSLATimer(secs) {
    let r = secs;
    const el = qs('#scp-sla-count');
    slaInterval = setInterval(() => {
        r--;
        const m = Math.floor(r / 60);
        const s = r % 60;
        if (el) el.textContent = `${m}:${String(s).padStart(2, '0')}`;
        if (r <= 0) stopSLATimer();
    }, 1000);
}

function stopSLATimer() {
    if (slaInterval) { clearInterval(slaInterval); slaInterval = null; }
}

/* ================================================================
   ANALYTICS
   ================================================================ */
function triggerAnalytics() {
    setTimeout(() => {
        analyticsOverlay.classList.add('active');
        animateCount('metric-fatigue', 3, '');
        animateCount('metric-visits', 14, '');
        animateCount('metric-dispatch', 1, '');
        animateCount('metric-sla', 0, '');
        animateDecimal('metric-miles', 2.3, 'mi');
        animateCount('metric-efficiency', 12, '%');
        animateCount('scp-health-score', 94, '%');
        setTimeout(() => {
            const bar = qs('#scp-chart-fill');
            if (bar) bar.style.width = '94%';
        }, 500);
    }, 900);
}

function animateCount(id, end, suffix) {
    const el = qs(`#${id}`);
    if (!el) return;
    let v = 0;
    const step = end / 60;
    const t = setInterval(() => {
        v = Math.min(v + step, end);
        el.textContent = Math.round(v) + suffix;
        if (v >= end) clearInterval(t);
    }, 16);
}

function animateDecimal(id, end, suffix) {
    const el = qs(`#${id}`);
    if (!el) return;
    let v = 0;
    const step = end / 80;
    const t = setInterval(() => {
        v = Math.min(v + step, end);
        el.textContent = v.toFixed(1) + suffix;
        if (v >= end) clearInterval(t);
    }, 16);
}

/* ================================================================
   SEND / USER INPUT
   ================================================================ */
sendBtn.addEventListener('click', () => {
    let t = inputEl.value.trim();
    if (!t) {
        // Fallback to placeholder suggestion if nothing is typed
        if (inputEl.placeholder.includes('Suggestion: ')) {
            t = inputEl.placeholder.replace('Suggestion: ', '').replace('…', '');
        } else {
            return;
        }
    }
    inputEl.value = '';
    handleUserInput(t);
});

inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendBtn.click(); }
});

async function handleUserInput(text) {
    addMessage('user', text);
    inputEl.placeholder = "Ask Signal Co-Pilot…";
    const t = text.trim().toLowerCase();

    // Find next step triggered by this text (allow loose matching or fallback to next linear step for demo)
    let nextStepIdx = CHAT_FLOW.findIndex((s, i) => i > currentStep && s.userTrigger);

    if (nextStepIdx === -1) {
        await showThinking(900);
        addMessage('ai', `I've noted that. Anything else I can assist with?`);
        return;
    }

    runStep(nextStepIdx);
}

/* ================================================================
   FILTER DROPDOWNS (from general.js)
   ================================================================ */
function initFilterDropdowns() {
    const dropdowns = document.querySelectorAll('.filter-dropdown');
    const opts = ['<input type="checkbox"> Option 1', '<input type="checkbox"> Option 2', '<input type="checkbox"> Option 3'];
    dropdowns.forEach(dd => {
        const wrap = document.createElement('div');
        wrap.className = 'dropdown-wrapper';
        dd.parentNode.insertBefore(wrap, dd);
        wrap.appendChild(dd);
        const menu = document.createElement('div');
        menu.className = 'dropdown-menu';
        menu.innerHTML = opts.map(o => `<label class="dropdown-item">${o}</label>`).join('');
        wrap.appendChild(menu);
        dd.addEventListener('click', e => {
            e.stopPropagation();
            document.querySelectorAll('.dropdown-menu').forEach(m => { if (m !== menu) m.classList.remove('show'); });
            menu.classList.toggle('show');
        });
        menu.addEventListener('click', e => e.stopPropagation());
    });
    document.addEventListener('click', () => document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show')));
}

/* ================================================================
   SIDEBAR TOGGLE (from general.js)
   ================================================================ */
function initSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    if (!sidebar || !toggle) return;
    let collapsed = false;
    toggle.addEventListener('click', () => {
        collapsed = !collapsed;
        sidebar.style.width = collapsed ? '0' : '';
        sidebar.style.minWidth = collapsed ? '0' : '';
        sidebar.style.padding = collapsed ? '0' : '';
        sidebar.style.overflow = collapsed ? 'hidden' : '';
        toggle.style.right = collapsed ? '-28px' : '';
        toggle.querySelector('svg').style.transform = collapsed ? 'rotate(180deg)' : '';
    });
}

/* ================================================================
   INIT
   ================================================================ */
function init() {
    renderCalendar();
    initViewToggle();
    initFilterDropdowns();
    initSidebarToggle();
    runStep(0);
}

document.addEventListener('DOMContentLoaded', init);
