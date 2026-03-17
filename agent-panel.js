// ===== AI AGENT PANEL ENGINE =====

const AGENTS = [
    {
        id: 'route',
        name: 'Route Agent',
        desc: 'Optimizes patrol routes for maximum coverage with minimum travel',
        capability: 'Route Optimization',
        status: 'online',
        color: 'route',
        iconSvg: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 17l4-8 4 4 6-10"/>
      <circle cx="3" cy="17" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="7" cy="9" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="11" cy="13" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="17" cy="3" r="1.5" fill="currentColor" stroke="none"/>
    </svg>`,
        greeting: "I'm your Route Agent. I analyze patrol patterns and optimize routes to reduce travel time while maximizing site coverage.",
        stats: [
            { label: 'Routes optimized today', value: '18', cls: 'green' },
            { label: 'Avg. travel reduction', value: '23%', cls: 'blue' },
            { label: 'Coverage efficiency', value: '94.2%', cls: 'green' },
        ],
        suggestions: ['Optimize today\'s routes', 'Show coverage gaps', 'Reduce travel time for Zone A']
    },
    {
        id: 'tour',
        name: 'Tour Agent',
        desc: 'Builds checkpoint groups and organizes patrol sequences',
        capability: 'Checkpoint Management',
        status: 'online',
        color: 'tour',
        iconSvg: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <rect x="3" y="3" width="14" height="14" rx="2"/>
      <path d="M7 7h6"/>
      <path d="M7 10h6"/>
      <path d="M7 13h3"/>
      <circle cx="14" cy="13" r="2" fill="currentColor" stroke="none"/>
    </svg>`,
        greeting: "I'm your Tour Agent. I organize checkpoints into efficient tour sequences and build patrol groups.",
        stats: [
            { label: 'Active tours', value: '12', cls: 'blue' },
            { label: 'Checkpoints covered', value: '156', cls: 'green' },
            { label: 'Pending reviews', value: '3', cls: 'orange' },
        ],
        suggestions: ['Create new tour', 'Review checkpoint gaps', 'Optimize tour sequence']
    },
    {
        id: 'dispatch',
        name: 'Dispatch Agent',
        desc: 'Manages emergency dispatch and real-time officer allocation',
        capability: 'Emergency Response',
        status: 'online',
        color: 'dispatch',
        iconSvg: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 1l2 6h6l-5 3.5 2 6.5-5-4-5 4 2-6.5L2 7h6l2-6z"/>
    </svg>`,
        greeting: "I'm your Dispatch Agent. I handle emergency situations by finding and allocating the nearest available officers in real-time.",
        stats: [
            { label: 'Active dispatches', value: '4', cls: 'orange' },
            { label: 'Avg. response time', value: '4.2 min', cls: 'green' },
            { label: 'Officers available', value: '8', cls: 'blue' },
        ],
        suggestions: ['Dispatch nearest officer', 'Show available units', 'Emergency allocation']
    },
    {
        id: 'monitoring',
        name: 'Monitoring Agent',
        desc: 'Tracks real-time shift completion and officer activities',
        capability: 'Live Tracking',
        status: 'online',
        color: 'monitoring',
        iconSvg: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <circle cx="10" cy="10" r="8"/>
      <path d="M10 6v4l3 2"/>
      <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none"/>
    </svg>`,
        greeting: "I'm your Monitoring Agent. I track real-time shift progress, flag delays, and monitor officer completion rates.",
        stats: [
            { label: 'Shifts in progress', value: '12', cls: 'blue' },
            { label: 'Completion rate', value: '87%', cls: 'green' },
            { label: 'Delayed shifts', value: '2', cls: 'orange' },
        ],
        suggestions: ['Show delayed shifts', 'Officer location map', 'Completion summary']
    },
    {
        id: 'reporting',
        name: 'Reporting Agent',
        desc: 'Produces summaries, analytics, and SLA compliance reports',
        capability: 'Analytics & SLA',
        status: 'online',
        color: 'reporting',
        iconSvg: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <rect x="3" y="2" width="14" height="16" rx="1"/>
      <path d="M7 6h6"/>
      <path d="M7 9h3"/>
      <rect x="7" y="12" width="2" height="3" rx="0.5" fill="currentColor" stroke="none"/>
      <rect x="10" y="11" width="2" height="4" rx="0.5" fill="currentColor" stroke="none"/>
      <rect x="13" y="10" width="2" height="5" rx="0.5" fill="currentColor" stroke="none"/>
    </svg>`,
        greeting: "I'm your Reporting Agent. I generate SLA reports, compliance summaries, and performance analytics across all operations.",
        stats: [
            { label: 'SLA compliance', value: '96.4%', cls: 'green' },
            { label: 'Reports generated', value: '47', cls: 'blue' },
            { label: 'Alerts this week', value: '5', cls: 'orange' },
        ],
        suggestions: ['Generate daily SLA report', 'Weekly performance summary', 'Compliance overview']
    }
];

let panelOpen = false;
let activeAgent = null;

// ===== PANEL CREATION =====
function createAgentPanel() {
    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'agent-backdrop';
    backdrop.id = 'agent-backdrop';
    backdrop.addEventListener('click', closeAgentPanel);

    // Panel
    const panel = document.createElement('div');
    panel.className = 'agent-panel';
    panel.id = 'agent-panel';

    panel.innerHTML = `
    <div class="agent-panel-header">
      <div class="agent-panel-header-left">
        <div class="agent-panel-logo">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M10 2l1.5 3.5L15 7l-3.5 1.5L10 12l-1.5-3.5L5 7l3.5-1.5L10 2z" fill="white"/>
            <path d="M16 11l.8 1.8L19 14l-2.2.8L16 17l-.8-2.2L13 14l2.2-.8L16 11z" fill="white" opacity="0.7"/>
          </svg>
        </div>
        <div class="agent-panel-title-group">
          <div class="agent-panel-title">AI Agent Hub</div>
          <div class="agent-panel-subtitle">5 agents ready to assist</div>
        </div>
      </div>
      <button class="agent-panel-close" id="agent-panel-close" title="Close panel">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M4 4l8 8M12 4l-8 8"/>
        </svg>
      </button>
    </div>
    <div class="agent-panel-body" id="agent-panel-body">
      <div class="agent-section-label">Available Agents</div>
      ${AGENTS.map((agent, idx) => `
        <div class="agent-card" id="agent-card-${agent.id}" data-agent="${agent.id}" style="transition-delay: ${idx * 0.05}s;">
          <div class="agent-icon agent-icon--${agent.color}">
            ${agent.iconSvg}
            <div class="agent-status-dot agent-status-dot--${agent.status}"></div>
          </div>
          <div class="agent-info">
            <div class="agent-name">${agent.name}</div>
            <div class="agent-desc">${agent.desc}</div>
            <span class="agent-capability agent-capability--${agent.color}">${agent.capability}</span>
          </div>
          <svg class="agent-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 4l4 4-4 4"/>
          </svg>
        </div>
      `).join('')}
    </div>
    <div class="agent-panel-footer">
      <span class="agent-panel-footer-text">Powered by</span>
      <span class="agent-panel-footer-brand">FO Intelligence Engine</span>
    </div>
    <div class="agent-chat-view" id="agent-chat-view"></div>
  `;

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    // Events
    document.getElementById('agent-panel-close').addEventListener('click', closeAgentPanel);

    // Agent card clicks
    AGENTS.forEach(agent => {
        const card = document.getElementById(`agent-card-${agent.id}`);
        card.addEventListener('click', () => openAgentChat(agent));
    });
}

// ===== OPEN / CLOSE =====
function toggleAgentPanel() {
    if (panelOpen) {
        closeAgentPanel();
    } else {
        openAgentPanel();
    }
}

function openAgentPanel() {
    panelOpen = true;
    const backdrop = document.getElementById('agent-backdrop');
    const panel = document.getElementById('agent-panel');
    const fab = document.getElementById('ai-fab');

    backdrop.classList.add('open');
    panel.classList.add('open');
    fab.classList.add('panel-open');

    // Stagger-reveal agent cards
    const cards = panel.querySelectorAll('.agent-card');
    cards.forEach((card, idx) => {
        setTimeout(() => card.classList.add('visible'), 100 + idx * 70);
    });
}

function closeAgentPanel() {
    panelOpen = false;
    activeAgent = null;
    const backdrop = document.getElementById('agent-backdrop');
    const panel = document.getElementById('agent-panel');
    const fab = document.getElementById('ai-fab');
    const chatView = document.getElementById('agent-chat-view');

    backdrop.classList.remove('open');
    panel.classList.remove('open');
    fab.classList.remove('panel-open');

    // Reset chat view
    chatView.classList.remove('open');
    chatView.innerHTML = '';

    // Reset card states
    panel.querySelectorAll('.agent-card').forEach(c => {
        c.classList.remove('active', 'visible');
    });
}

// ===== AGENT CHAT =====
function openAgentChat(agent) {
    activeAgent = agent;

    // Mark active card
    document.querySelectorAll('.agent-card').forEach(c => c.classList.remove('active'));
    document.getElementById(`agent-card-${agent.id}`).classList.add('active');

    const chatView = document.getElementById('agent-chat-view');

    chatView.innerHTML = `
    <div class="agent-chat-header">
      <button class="agent-chat-back" id="chat-back-btn" title="Back to agents">
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M9 3L5 7l4 4"/>
        </svg>
      </button>
      <div class="agent-chat-identity">
        <div class="agent-chat-icon agent-icon--${agent.color}">
          ${agent.iconSvg}
        </div>
        <div>
          <div class="agent-chat-name">${agent.name}</div>
          <div class="agent-chat-status">Online</div>
        </div>
      </div>
    </div>
    <div class="agent-chat-messages" id="chat-messages"></div>
    <div class="agent-chat-input-area">
      <div class="agent-chat-input-wrapper">
        <input type="text" class="agent-chat-input" id="chat-input" placeholder="Ask ${agent.name} anything..." autocomplete="off" />
        <button class="agent-chat-send" id="chat-send-btn">
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L6 8"/>
            <path d="M12 2l-4 10-2-4-4-2 10-4z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

    // Open chat view
    requestAnimationFrame(() => {
        chatView.classList.add('open');
    });

    // Back button
    document.getElementById('chat-back-btn').addEventListener('click', () => {
        chatView.classList.remove('open');
        activeAgent = null;
        document.querySelectorAll('.agent-card').forEach(c => c.classList.remove('active'));
    });

    // Input handling
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');

    input.addEventListener('input', () => {
        sendBtn.classList.toggle('enabled', input.value.trim().length > 0);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            sendUserMessage(input.value.trim(), agent);
            input.value = '';
            sendBtn.classList.remove('enabled');
        }
    });

    sendBtn.addEventListener('click', () => {
        if (input.value.trim()) {
            sendUserMessage(input.value.trim(), agent);
            input.value = '';
            sendBtn.classList.remove('enabled');
        }
    });

    // Show greeting sequence
    showAgentGreeting(agent);
}

function showAgentGreeting(agent) {
    const container = document.getElementById('chat-messages');

    // Show typing indicator first
    showTyping(container, agent);

    setTimeout(() => {
        removeTyping(container);

        // Add greeting message
        addAgentMessage(container, agent, agent.greeting);

        // After greeting, show stats card
        setTimeout(() => {
            showTyping(container, agent);
            setTimeout(() => {
                removeTyping(container);
                addAgentStatsCard(container, agent);

                // After stats, show suggestions
                setTimeout(() => {
                    addSuggestions(container, agent);
                }, 300);
            }, 800);
        }, 400);
    }, 1000);
}

function showTyping(container, agent) {
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-msg chat-msg--agent visible';
    wrapper.id = 'typing-wrapper';
    wrapper.innerHTML = `
    <div class="chat-msg-avatar agent-icon--${agent.color}" style="width:24px;height:24px;border-radius:8px;display:flex;align-items:center;justify-content:center;">
      <svg viewBox="0 0 8 8" fill="none" style="width:8px;height:8px;"><circle cx="4" cy="4" r="3" fill="currentColor"/></svg>
    </div>
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
    container.appendChild(wrapper);
    container.scrollTop = container.scrollHeight;
}

function removeTyping(container) {
    const typing = document.getElementById('typing-wrapper');
    if (typing) typing.remove();
}

function addAgentMessage(container, agent, text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg--agent';
    msg.innerHTML = `
    <div class="chat-msg-avatar agent-icon--${agent.color}" style="width:24px;height:24px;border-radius:8px;display:flex;align-items:center;justify-content:center;">
      <svg viewBox="0 0 8 8" fill="none" style="width:8px;height:8px;"><circle cx="4" cy="4" r="3" fill="currentColor"/></svg>
    </div>
    <div class="chat-msg-bubble">${text}</div>
  `;
    container.appendChild(msg);
    requestAnimationFrame(() => msg.classList.add('visible'));
    container.scrollTop = container.scrollHeight;
}

function addAgentStatsCard(container, agent) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg--agent';
    msg.innerHTML = `
    <div class="chat-msg-avatar agent-icon--${agent.color}" style="width:24px;height:24px;border-radius:8px;display:flex;align-items:center;justify-content:center;">
      <svg viewBox="0 0 8 8" fill="none" style="width:8px;height:8px;"><circle cx="4" cy="4" r="3" fill="currentColor"/></svg>
    </div>
    <div>
      <div class="chat-msg-bubble">Here's my current activity overview:</div>
      <div class="chat-activity-card">
        ${agent.stats.map(s => `
          <div class="chat-activity-row">
            <span class="chat-activity-label">${s.label}</span>
            <span class="chat-activity-value chat-activity-value--${s.cls}">${s.value}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
    container.appendChild(msg);
    requestAnimationFrame(() => msg.classList.add('visible'));
    container.scrollTop = container.scrollHeight;
}

function addSuggestions(container, agent) {
    const sugDiv = document.createElement('div');
    sugDiv.className = 'chat-suggestions';
    sugDiv.innerHTML = agent.suggestions.map(s =>
        `<button class="chat-suggestion-btn">${s}</button>`
    ).join('');
    container.appendChild(sugDiv);
    requestAnimationFrame(() => sugDiv.classList.add('visible'));

    // Handle suggestion clicks
    sugDiv.querySelectorAll('.chat-suggestion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sendUserMessage(btn.textContent, agent);
            sugDiv.style.display = 'none';
        });
    });

    container.scrollTop = container.scrollHeight;
}

function addUserMessage(container, text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg--user';
    msg.innerHTML = `
    <div class="chat-msg-avatar" style="width:24px;height:24px;border-radius:8px;background:#146DFF;display:flex;align-items:center;justify-content:center;">
      <svg viewBox="0 0 10 10" fill="none" style="width:10px;height:10px;"><circle cx="5" cy="4" r="2" stroke="white" stroke-width="1" fill="none"/><path d="M2 9c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="white" stroke-width="1" fill="none" stroke-linecap="round"/></svg>
    </div>
    <div class="chat-msg-bubble">${text}</div>
  `;
    container.appendChild(msg);
    requestAnimationFrame(() => msg.classList.add('visible'));
    container.scrollTop = container.scrollHeight;
}

// ===== SMART RESPONSE ENGINE =====
const AGENT_RESPONSES = {
    route: {
        default: "I've analyzed the current patrol routes. I can see 3 routes with overlapping coverage in Zone B. Want me to optimize those?",
        optimize: "Running route optimization... I've recalculated paths for 18 patrols. The new routes reduce total travel by <span class='chat-highlight'>23%</span> while maintaining <span class='chat-highlight'>94%</span> coverage. Shall I apply these changes?",
        gaps: "I've detected 2 coverage gaps:\n• <strong>Sector C-4</strong> — No patrol between 2:00 AM - 4:00 AM\n• <strong>Parking Lot B</strong> — Only 1 pass instead of required 3\n\nI can reassign nearby officers to fill these gaps.",
        travel: "Zone A analysis complete. Current avg. travel: <span class='chat-highlight'>12.4 km</span> per shift. I can reduce it to <span class='chat-highlight'>9.1 km</span> by resequencing checkpoint order. This saves roughly 22 minutes per officer."
    },
    tour: {
        default: "I have 12 active tours across all sites. 3 need checkpoint reviews. Would you like me to show the details?",
        create: "I'll set up a new tour. Please tell me the site and number of checkpoints, and I'll build an optimal walking sequence.",
        checkpoint: "Found 3 checkpoints that haven't been visited in the last 48 hours:\n• <strong>North Gate</strong> (missed 2 tours)\n• <strong>Server Room B</strong> (missed 1 tour)\n• <strong>Emergency Exit 3</strong> (missed 2 tours)",
        sequence: "I've reordered the checkpoint sequence for Tour #7. The new order reduces walking distance by <span class='chat-highlight'>340 meters</span> and expected completion time from 45 to <span class='chat-highlight'>38 minutes</span>."
    },
    dispatch: {
        default: "Currently managing 4 active dispatches. All response times are within SLA. How can I help?",
        nearest: "Scanning for nearest available officers... Found <strong>Officer James Wilson</strong> — 1.2 km away, ETA <span class='chat-highlight'>3 minutes</span>. <strong>Officer Sarah Connor</strong> is backup at 2.8 km. Shall I dispatch?",
        available: "8 officers currently available for dispatch:\n• 3 completing shifts within 30 min\n• 5 on standby\n\nNearest unit is <span class='chat-highlight'>Unit C-12</span> at Columbus main entrance.",
        emergency: "🚨 Emergency protocol activated. I've identified the 3 nearest officers and notified them. Average response ETA: <span class='chat-highlight'>2.8 minutes</span>. Backup unit dispatched as well."
    },
    monitoring: {
        default: "Currently tracking 12 active shifts. Completion rate is at 87%. 2 shifts show minor delays. Want a breakdown?",
        delayed: "2 shifts showing delays:\n• <strong>Shift 3-B</strong> (Hazel Grace) — 12 min behind, checkpoint 4 of 8\n• <strong>Shift 5-A</strong> (David Park) — 8 min behind, checkpoint 6 of 10\n\nBoth are non-critical delays due to extended checkpoint inspections.",
        location: "All 12 active officers are reporting GPS. Last update: <span class='chat-highlight'>15 seconds ago</span>. No coverage blind spots detected. Officer locations map is available in the dashboard.",
        completion: "Today's completion summary:\n• <strong>Completed:</strong> 20 shifts (100% SLA)\n• <strong>In Progress:</strong> 12 shifts (87% on-track)\n• <strong>Remaining:</strong> 6 shifts scheduled\n\nOverall day completion: <span class='chat-highlight'>62.5%</span>"
    },
    reporting: {
        default: "Ready to generate reports. I have data for daily SLA, weekly performance, and compliance dashboards. What do you need?",
        sla: "📊 Daily SLA Report generated:\n• <strong>SLA Compliance:</strong> <span class='chat-highlight'>96.4%</span>\n• <strong>On-time completions:</strong> 32/34\n• <strong>Avg. response time:</strong> 4.2 min (target: 5 min)\n• <strong>Coverage score:</strong> 91/100\n\nReport exported to your dashboard.",
        performance: "📈 Weekly Performance Summary:\n• <strong>Total shifts:</strong> 238\n• <strong>Completion rate:</strong> <span class='chat-highlight'>94.1%</span>\n• <strong>Officer utilization:</strong> 88.3%\n• <strong>Top performer:</strong> James Wilson (100% completion)\n\nFull breakdown available in Analytics.",
        compliance: "✅ Compliance Overview:\n• <strong>Site inspections:</strong> 98% complete\n• <strong>Checkpoint scans:</strong> 96.4% on-time\n• <strong>Incident reports:</strong> All filed within SLA\n• <strong>Training compliance:</strong> 100%\n\n2 minor deviations noted — both resolved."
    }
};

function getAgentResponse(agent, userText) {
    const text = userText.toLowerCase();
    const responses = AGENT_RESPONSES[agent.id];

    if (agent.id === 'route') {
        if (text.includes('optim')) return responses.optimize;
        if (text.includes('gap') || text.includes('coverage')) return responses.gaps;
        if (text.includes('travel') || text.includes('zone')) return responses.travel;
    } else if (agent.id === 'tour') {
        if (text.includes('create') || text.includes('new')) return responses.create;
        if (text.includes('checkpoint') || text.includes('gap') || text.includes('review')) return responses.checkpoint;
        if (text.includes('sequence') || text.includes('optim')) return responses.sequence;
    } else if (agent.id === 'dispatch') {
        if (text.includes('nearest') || text.includes('dispatch')) return responses.nearest;
        if (text.includes('available') || text.includes('unit') || text.includes('show')) return responses.available;
        if (text.includes('emergency') || text.includes('alert')) return responses.emergency;
    } else if (agent.id === 'monitoring') {
        if (text.includes('delay')) return responses.delayed;
        if (text.includes('location') || text.includes('map') || text.includes('gps')) return responses.location;
        if (text.includes('completion') || text.includes('summary')) return responses.completion;
    } else if (agent.id === 'reporting') {
        if (text.includes('sla') || text.includes('daily')) return responses.sla;
        if (text.includes('performance') || text.includes('weekly')) return responses.performance;
        if (text.includes('compliance') || text.includes('overview')) return responses.compliance;
    }

    return responses.default;
}

function sendUserMessage(text, agent) {
    const container = document.getElementById('chat-messages');
    addUserMessage(container, text);

    // Show typing then respond
    setTimeout(() => {
        showTyping(container, agent);

        const thinkTime = 800 + Math.random() * 800;
        setTimeout(() => {
            removeTyping(container);
            const response = getAgentResponse(agent, text);
            addAgentMessage(container, agent, response);
        }, thinkTime);
    }, 300);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    createAgentPanel();

    const fab = document.getElementById('ai-fab');
    if (fab) {
        fab.addEventListener('click', toggleAgentPanel);
    }
});
