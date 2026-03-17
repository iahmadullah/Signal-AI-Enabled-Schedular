/* ===== SIGNAL ORCHESTRATOR DEMO — JS ===== */

// ─── Schedule Data (same structure as general.js) ───
const scheduleData = {
    0: [
        makeCard('🚗 Orlando Day Runsheet', 'Hazel Grace', '9:00a - 5:00p', '0058FF'),
        makeCard('🛡 Extra Coverage', 'Sam T.', '10:00a - 2:00p', '4CAF50'),
    ],
    1: [
        makeCard('🚗 Orlando Daily Rundown', 'Hazel Grace', '9:30a - 10:30a', '0058FF'),
        makeCard('🚨 Dispatch — Midtown', 'Marcus L.', '8:00a - 4:00p', 'F4780B'),
        makeCard('🚗 Patrol Zone B', 'Janet R.', '12:00p - 8:00p', '146DFF'),
    ],
    2: [
        makeCard('🚗 Orlando Afternoon Itinerary', 'Hazel Grace', '9:30a - 10:30a', '0058FF'),
        makeCard('🚗 Daytime Plan', 'Chris M.', '7:00a - 3:00p', '146DFF'),
    ],
    3: [ // Wednesday (today) — demo targets this column
        makeCard('🚗 Daylight Agenda', 'Carlos M.', '9:30a - 5:30p', '0058FF', 'demo-late', 'card-carlos'),
        makeCard('🏥 Hospital Surge', 'Ahmed K.', '10:00a - 6:00p', '146DFF', 'demo-late', 'card-ahmed'),
        makeCard('🚗 Orlando Patrol — Sect 4', 'John Doe', '11:00a - 7:00p', '0058FF', '', 'card-john'),
    ],
    4: [
        makeCard('🚗 Orlando Morning Schedule', 'Hazel Grace', '9:30a - 10:30a', '0058FF'),
        makeCard('🚗 Thu Patrol', 'Sophia L.', '8:00a - 4:00p', '146DFF'),
    ],
    5: [
        makeCard('🚗 Orlando Daytime Roadmap', 'Hazel Grace', '9:30a - 10:30a', '0058FF'),
    ],
    6: [
        makeCard('🚗 Orlando Day Runsheet', 'Hazel Grace', '9:30a - 10:30a', '0058FF'),
    ],
};

function makeCard(title, officer, time, color, extraClass = '', id = '') {
    return { title, officer, time, color, extraClass, id };
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function getAvatarBg(name) {
    const palette = ['#E3F2FD', '#FCE4EC', '#E8F5E9', '#FFF3E0', '#F3E5F5', '#E0F7FA', '#FBE9E7'];
    let h = 0; for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
    return palette[Math.abs(h) % palette.length];
}

// ─── Render Calendar ────────────────────────────────
function renderCalendar() {
    const body = document.getElementById('calendar-body');
    body.innerHTML = '';

    const slotsCount = Math.max(...Object.values(scheduleData).map(d => d.length), 5);

    for (let day = 0; day < 7; day++) {
        const col = document.createElement('div');
        col.className = 'calendar-column' + (day === 3 ? ' today-column' : '');

        const dayCards = scheduleData[day] || [];
        for (let i = 0; i < slotsCount; i++) {
            const slot = document.createElement('div');
            slot.className = 'card-slot g-slot';

            if (dayCards[i]) {
                const d = dayCards[i];
                const card = document.createElement('div');
                card.className = `g-card${d.extraClass ? ' ' + d.extraClass : ''}`;
                card.style.borderLeftColor = '#' + d.color;
                if (d.id) card.id = d.id;

                card.innerHTML = `
                    <div class="g-card-body">
                        <div class="g-card-header">
                            <span class="g-card-time">${d.time}</span>
                        </div>
                        <div class="g-card-title">${d.title}</div>
                        <div class="g-card-details">
                            <div class="g-card-row">
                                <div class="g-card-row-avatar g-card-row-avatar--person"
                                    style="background:${getAvatarBg(d.officer)}">
                                    <span style="font-size:7px;font-weight:600;color:#444">${getInitials(d.officer)}</span>
                                </div>
                                <span class="g-card-row-text">${d.officer}</span>
                            </div>
                        </div>
                    </div>
                    <div class="g-card-status g-card-status--in-progress"></div>
                `;
                slot.appendChild(card);
            }
            col.appendChild(slot);
        }
        body.appendChild(col);
    }
}

// ─── Chat System ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();

    const messagesEl = document.getElementById('chat-messages');
    const trigger = document.getElementById('scene-trigger');
    const label = document.getElementById('trigger-label');
    const counter = document.getElementById('scene-counter');
    const toast = document.getElementById('demo-toast');
    const gridView = document.getElementById('grid-view');
    const mapView = document.getElementById('map-view');
    const analyticsView = document.getElementById('analytics-view');
    const routePath = document.getElementById('route-path');

    let scene = 0;

    const agents = document.querySelectorAll('.mini-agent');
    function highlightAgent(idx) {
        agents.forEach((a, i) => a.classList.toggle('active', i === idx));
    }

    const SCENES = [
        // Scene 0 — Morning overview
        {
            user: "Good morning. Show me today's operational status.",
            bot: "Good morning. Here's today's live snapshot:<br><br>• 42 active shifts running<br>• <strong>3 officers late</strong> (highlighted on scheduler)<br>• 2 patrol zones imbalanced<br>• 4 unassigned night shifts<br>• 1 SLA-sensitive site at risk",
            action() {
                highlightAgent(0);
                showToast("Live data sync complete", "success");
            }
        },
        // Scene 1 — Fix late officers
        {
            user: "Fix the late officers.",
            bot: "Running attendance recovery…<br><br><em>Calling Scheduling Agent + Employee Agent…</em><br><br>Replacement plan ready:<br>• Carlos → Jason M. (ETA 14 min)<br>• Ahmed → Shift extended<br>• John stays on current patrol<br><br>Apply changes?",
            action() {
                highlightAgent(1);
                setCardState('card-carlos', 'demo-processing');
                setCardState('card-ahmed', 'demo-processing');
                showToast("Evaluating backup eligibility…", "");
            }
        },
        // Scene 2 — Apply
        {
            user: "Apply.",
            bot: "Changes applied. Schedule stabilized.",
            action() {
                highlightAgent(0);
                setCardState('card-carlos', 'demo-resolved');
                updateCardOfficer('card-carlos', 'Jason M. (Sub)');
                setCardState('card-ahmed', 'demo-resolved');
                updateCardOfficer('card-ahmed', 'Ahmed K. (EXT)');
                showToast("Attendance Stabilized ✓", "success");
            }
        },
        // Scene 3 — Patrol optimisation
        {
            user: "Optimize John Doe's patrol today.",
            bot: "Current route: 25 stops · 6h 30m · 14.2 mi<br><br>Running cluster analysis…",
            action() {
                highlightAgent(2);
                switchView('map');
                setTimeout(() => { routePath.style.strokeDashoffset = '0'; }, 500);
                showToast("Route analysis running…", "");
            }
        },
        // Scene 4 — Result (auto)
        {
            auto: true,
            bot: "Optimized route ready:<br>19 stops · 3h 45m · 8.1 mi<br><br>Would you like to:<br>1️⃣ Close shift early<br>2️⃣ Add more visits<br>3️⃣ Keep optimized route",
            action() {
                document.getElementById('map-clusters').style.opacity = '1';
            }
        },
        // Scene 5 — Add visits
        {
            user: "Add more visits.",
            bot: "6 unassigned visits nearby:<br>• Walmart 5th Ave (2 stops)<br>• CVS Midtown (2 stops)<br>• Plaza B (2 stops)<br><br>Which to assign?",
            action() { showToast("Scanning proximity clusters…", ""); }
        },
        // Scene 6 — Assign
        {
            user: "Add Walmart and CVS.",
            bot: "Updated: 26 stops · 4h 20m<br>Route pushed to John's mobile app.",
            action() { showToast("Route synced to officer app ✓", "success"); }
        },
        // Scene 7 — Traffic disruption (auto)
        {
            auto: true,
            bot: "⚠️ Traffic disruption detected near 5th Ave.<br>Recalculating to protect SLA…",
            action() {
                highlightAgent(2);
                document.getElementById('traffic-marker').style.opacity = '1';
                routePath.style.stroke = '#F4780B';
                showToast("Real-time rerouting active", "warning");
            }
        },
        // Scene 8 — Emergency (auto)
        {
            auto: true,
            bot: "🚨 Emergency at Walmart 5th Ave.<br>Assigning nearest patrol officer.",
            action() {
                highlightAgent(3);
                document.getElementById('emergency-marker').style.opacity = '1';
                routePath.style.stroke = '#E43F32';
                showToast("EMERGENCY DISPATCH", "error");
            }
        },
        // Scene 9 — Resolved (auto)
        {
            auto: true,
            bot: "Dispatch resolved in 11 min.<br>Rebalancing patrol coverage across zone.",
            action() {
                highlightAgent(0);
                document.getElementById('emergency-marker').style.opacity = '0';
                routePath.style.stroke = '#146DFF';
                showToast("Event cleared. Patrol resumed ✓", "success");
            }
        },
        // Scene 10 — Summary
        {
            user: "Summarize today.",
            bot: "Today's Signal Orchestrator impact:<br><br>• 3 no-shows resolved<br>• 2 routes optimized<br>• 1 dispatch handled<br>• 0 SLA breaches<br>• <strong>Labor efficiency +12%</strong>",
            action() {
                highlightAgent(0);
                switchView('analytics');
                setTimeout(() => {
                    document.querySelectorAll('.a-bar-fill').forEach(bar => {
                        const target = bar.getAttribute('data-target');
                        bar.style.width = target;
                    });
                }, 300);
                showToast("Day complete. All KPIs met ✓", "success");
            }
        }
    ];

    // ─── Helpers ─────────────────────────────────────
    function setCardState(id, stateClass) {
        const card = document.getElementById(id);
        if (!card) return;
        card.classList.remove('demo-late', 'demo-processing', 'demo-resolved');
        if (stateClass) card.classList.add(stateClass);
    }

    function updateCardOfficer(id, name) {
        const card = document.getElementById(id);
        if (!card) return;
        const nameEl = card.querySelector('.g-card-row-text');
        const avEl = card.querySelector('.g-card-row-avatar span');
        if (nameEl) nameEl.textContent = name;
        if (avEl) avEl.textContent = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }

    function switchView(to) {
        if (to === 'map') {
            gridView.classList.add('hidden');
            mapView.classList.add('active-view');
            analyticsView.classList.remove('active-view');
        } else if (to === 'analytics') {
            gridView.classList.add('hidden');
            mapView.classList.remove('active-view');
            analyticsView.classList.add('active-view');
        } else {
            gridView.classList.remove('hidden');
            mapView.classList.remove('active-view');
            analyticsView.classList.remove('active-view');
        }
    }

    function showToast(text, type) {
        toast.textContent = text;
        toast.className = `orch-toast show${type ? ' ' + type : ''}`;
        clearTimeout(toast._t);
        toast._t = setTimeout(() => toast.classList.remove('show'), 3200);
    }

    function appendMessage(text, role) {
        const div = document.createElement('div');
        div.className = `chat-bubble ${role}`;
        div.innerHTML = text;
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return div;
    }

    function showTyping() {
        const el = document.createElement('div');
        el.className = 'typing-indicator';
        el.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        messagesEl.appendChild(el);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return el;
    }

    function updateCounter() {
        counter.textContent = `Scene ${scene} / ${SCENES.length}`;
    }

    // ─── Scene Runner ─────────────────────────────────
    function runScene() {
        if (scene >= SCENES.length) {
            window.location.href = 'agent-hub.html';
            return;
        }

        const s = SCENES[scene];

        if (s.user) {
            // User types, then AI responds
            appendMessage(s.user, 'user');
            trigger.disabled = true;
            label.textContent = "AI is orchestrating…";

            const typing = showTyping();
            setTimeout(() => {
                typing.remove();
                appendMessage(s.bot, 'bot');
                s.action();
                scene++;
                updateCounter();
                trigger.disabled = false;
                label.textContent = scene < SCENES.length ? 'Next →' : 'Finish';

                // Chain auto scenes
                if (SCENES[scene] && SCENES[scene].auto) {
                    trigger.disabled = true;
                    setTimeout(runAutoScene, 2200);
                }
            }, 1400);
        } else if (s.auto) {
            runAutoScene();
        }
    }

    function runAutoScene() {
        if (scene >= SCENES.length) return;
        const s = SCENES[scene];
        if (!s.auto) { trigger.disabled = false; label.textContent = 'Next →'; return; }

        const typing = showTyping();
        setTimeout(() => {
            typing.remove();
            appendMessage(s.bot, 'bot');
            s.action();
            scene++;
            updateCounter();

            if (SCENES[scene] && SCENES[scene].auto) {
                setTimeout(runAutoScene, 2200);
            } else {
                trigger.disabled = false;
                label.textContent = scene < SCENES.length ? 'Next →' : 'Finish';
            }
        }, 1200);
    }

    trigger.addEventListener('click', runScene);

    // ─── Initial greeting ─────────────────────────────
    setTimeout(() => {
        appendMessage(
            "Hello 👋 I'm your <strong>Signal Orchestrator</strong>.<br>I coordinate Scheduling, Employee, Route, and Dispatch agents in real-time.<br><br>Click <strong>Start Walkthrough</strong> to begin today's demo.",
            'bot'
        );
    }, 600);
});
