// ===== SCHEDULING AGENT — INTERACTIVE SHIFT MANAGEMENT =====
// Shows unassigned shifts, available officers, swap suggestions for late/absent officers

const SCHED_OFFICERS = [
    { name: 'Marcus Chen', score: 97, fatigue: 12, cert: true, status: 'available', hrs: 32 },
    { name: 'Sarah Connor', score: 96, fatigue: 28, cert: true, status: 'available', hrs: 36 },
    { name: 'James Wilson', score: 94, fatigue: 35, cert: true, status: 'on-duty', hrs: 40 },
    { name: 'David Park', score: 92, fatigue: 45, cert: true, status: 'available', hrs: 24 },
    { name: 'Elena Rodriguez', score: 91, fatigue: 18, cert: true, status: 'available', hrs: 28 },
    { name: 'Alex Kim', score: 89, fatigue: 52, cert: false, status: 'off-duty', hrs: 44 },
    { name: 'Lisa Wang', score: 88, fatigue: 22, cert: true, status: 'available', hrs: 30 },
    { name: 'Robert Jones', score: 85, fatigue: 68, cert: true, status: 'on-leave', hrs: 0 },
];

const SCHED_UNASSIGNED = [
    { id: 'u1', day: 'Tuesday', time: '9:30a – 10:30a', site: '🚗 Orlando Day Time Route', type: 'Patrol', priority: 'high' },
    { id: 'u2', day: 'Thursday', time: '9:30a – 11:30p', site: 'Zorinski Lake – Parking Lot', type: 'Dedicated', priority: 'medium' },
    { id: 'u3', day: 'Saturday', time: '9:30a – 11:30p', site: 'Zorinski Lake – Parking Lot', type: 'Dedicated', priority: 'low' },
];

const SCHED_SWAPS = [
    { officer: 'Hazel Grace', reason: 'Called in sick', day: 'Wednesday', time: '9:30a – 11:30p', site: 'Zorinski Lake', suggestions: ['Marcus Chen', 'Elena Rodriguez', 'Lisa Wang'] },
    { officer: 'Alex Kim', reason: 'Overtime exceeded (44h)', day: 'Thursday', time: '9:30a – 10:30a', site: 'Orlando Day Time Route', suggestions: ['David Park', 'Marcus Chen', 'Sarah Connor'] },
];

function injectSchedulingAgent() {
    const obs = new MutationObserver(() => {
        const body = document.getElementById('agent-panel-body');
        if (body && !document.getElementById('sched-agent-card')) {
            // Insert after the signal section, or after orch section, or before agent list
            const signalSec = document.getElementById('signal-section');
            const orchCard = document.getElementById('orch-card');
            const orchSec = orchCard ? orchCard.closest('div') : null;
            const agentLabel = body.querySelector('.agent-section-label:not([style])');
            const insertRef = signalSec ? signalSec.nextSibling : orchSec ? orchSec.nextSibling : agentLabel;
            if (!insertRef && !signalSec && !orchSec) return;

            const sec = document.createElement('div');
            sec.id = 'sched-agent-section';
            sec.innerHTML = `
        <div class="agent-section-label" style="margin-bottom:4px;margin-top:8px;">INTERACTIVE AGENTS</div>
        <div class="agent-card visible" id="sched-agent-card" style="border:1px solid rgba(255,179,0,0.15);background:linear-gradient(135deg,rgba(255,179,0,0.04),rgba(255,152,0,0.03));opacity:1;transform:none;">
          <div class="agent-icon" style="background:linear-gradient(135deg,#F57C00,#FFB300);box-shadow:0 2px 10px rgba(255,179,0,0.25);">
            <svg viewBox="0 0 20 20" fill="none" style="width:18px;height:18px;">
              <rect x="3" y="4" width="14" height="12" rx="2" stroke="white" stroke-width="1.5" fill="none"/>
              <path d="M3 8h14" stroke="white" stroke-width="1.5"/>
              <path d="M7 4V2M13 4V2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="7" cy="12" r="1.2" fill="white"/>
              <circle cx="13" cy="12" r="1.2" fill="white"/>
            </svg>
            <div class="agent-status-dot agent-status-dot--online"></div>
          </div>
          <div class="agent-info">
            <div class="agent-name">Scheduling Agent</div>
            <div class="agent-desc">Unassigned shifts · Officer swaps · Reassignment</div>
            <span class="agent-capability" style="background:rgba(255,179,0,0.08);color:#F57C00;">${SCHED_UNASSIGNED.length} Unassigned · ${SCHED_SWAPS.length} Swaps</span>
          </div>
          <svg class="agent-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>
        </div>
      `;
            if (insertRef) {
                body.insertBefore(sec, insertRef);
            } else if (signalSec) {
                signalSec.after(sec);
            } else if (orchSec) {
                orchSec.after(sec);
            }
            document.getElementById('sched-agent-card').addEventListener('click', openSchedulingAgent);
        }
    });
    obs.observe(document.body, { childList: true, subtree: true });
}

function openSchedulingAgent() {
    const chatView = document.getElementById('agent-chat-view');
    if (!chatView) return;

    document.querySelectorAll('.agent-card').forEach(c => c.classList.remove('active'));
    document.getElementById('sched-agent-card').classList.add('active');

    chatView.innerHTML = `
    <div class="agent-chat-header">
      <button class="agent-chat-back" id="sched-back">
        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 3L5 7l4 4"/></svg>
      </button>
      <div class="agent-chat-identity">
        <div class="agent-chat-icon" style="background:linear-gradient(135deg,#F57C00,#FFB300);">
          <svg viewBox="0 0 16 16" fill="none" style="width:14px;height:14px;">
            <rect x="2" y="3" width="12" height="10" rx="2" stroke="white" stroke-width="1.2" fill="none"/>
            <path d="M2 6h12" stroke="white" stroke-width="1.2"/>
          </svg>
        </div>
        <div>
          <div class="agent-chat-name">Scheduling Agent</div>
          <div class="agent-chat-status"><span style="color:#4CAF50;">●</span> Monitoring shifts</div>
        </div>
      </div>
    </div>
    <div class="agent-chat-messages" id="sched-msgs" style="scroll-behavior:smooth;padding:12px;"></div>
    <div style="padding:10px 16px;border-top:1px solid #F0F0F1;">
      <div style="display:flex;gap:6px;">
        <button class="chat-suggestion-btn sched-tab-btn active" data-tab="overview" style="flex:1;font-size:10px;padding:6px 4px;">Overview</button>
        <button class="chat-suggestion-btn sched-tab-btn" data-tab="unassigned" style="flex:1;font-size:10px;padding:6px 4px;">Unassigned</button>
        <button class="chat-suggestion-btn sched-tab-btn" data-tab="officers" style="flex:1;font-size:10px;padding:6px 4px;">Officers</button>
        <button class="chat-suggestion-btn sched-tab-btn" data-tab="swaps" style="flex:1;font-size:10px;padding:6px 4px;">Swaps</button>
      </div>
    </div>
  `;

    requestAnimationFrame(() => chatView.classList.add('open'));

    document.getElementById('sched-back').addEventListener('click', () => {
        chatView.classList.remove('open');
        document.querySelectorAll('.agent-card').forEach(c => c.classList.remove('active'));
    });

    chatView.querySelectorAll('.sched-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            chatView.querySelectorAll('.sched-tab-btn').forEach(b => { b.classList.remove('active'); b.style.background = ''; b.style.color = ''; b.style.borderColor = ''; });
            btn.classList.add('active');
            btn.style.background = '#FFB300';
            btn.style.color = 'white';
            btn.style.borderColor = '#FFB300';
            renderSchedTab(btn.dataset.tab);
        });
    });

    // Activate first tab styling
    const firstBtn = chatView.querySelector('.sched-tab-btn.active');
    if (firstBtn) { firstBtn.style.background = '#FFB300'; firstBtn.style.color = 'white'; firstBtn.style.borderColor = '#FFB300'; }

    renderSchedTab('overview');
}

function renderSchedTab(tab) {
    const msgs = document.getElementById('sched-msgs');
    if (!msgs) return;

    const font = 'font-family:Inter,system-ui,sans-serif;';

    if (tab === 'overview') {
        const unassignedCount = SCHED_UNASSIGNED.length;
        const availableOfficers = SCHED_OFFICERS.filter(o => o.status === 'available').length;
        const swapNeeded = SCHED_SWAPS.length;
        const avgFatigue = Math.round(SCHED_OFFICERS.reduce((a, o) => a + o.fatigue, 0) / SCHED_OFFICERS.length);

        msgs.innerHTML = `
      <div style="${font}">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
          <div style="text-align:center;padding:14px 8px;border-radius:10px;border:1px solid rgba(228,63,50,0.1);background:rgba(228,63,50,0.03);">
            <div style="font-size:24px;font-weight:700;color:#E43F32;line-height:1;">${unassignedCount}</div>
            <div style="font-size:9px;font-weight:600;color:#86868B;text-transform:uppercase;letter-spacing:0.3px;margin-top:4px;">Unassigned Shifts</div>
          </div>
          <div style="text-align:center;padding:14px 8px;border-radius:10px;border:1px solid rgba(76,175,80,0.1);background:rgba(76,175,80,0.03);">
            <div style="font-size:24px;font-weight:700;color:#4CAF50;line-height:1;">${availableOfficers}</div>
            <div style="font-size:9px;font-weight:600;color:#86868B;text-transform:uppercase;letter-spacing:0.3px;margin-top:4px;">Available Officers</div>
          </div>
          <div style="text-align:center;padding:14px 8px;border-radius:10px;border:1px solid rgba(255,179,0,0.1);background:rgba(255,179,0,0.03);">
            <div style="font-size:24px;font-weight:700;color:#FFB300;line-height:1;">${swapNeeded}</div>
            <div style="font-size:9px;font-weight:600;color:#86868B;text-transform:uppercase;letter-spacing:0.3px;margin-top:4px;">Swaps Needed</div>
          </div>
          <div style="text-align:center;padding:14px 8px;border-radius:10px;border:1px solid rgba(20,109,255,0.1);background:rgba(20,109,255,0.03);">
            <div style="font-size:24px;font-weight:700;color:#146DFF;line-height:1;">${avgFatigue}%</div>
            <div style="font-size:9px;font-weight:600;color:#86868B;text-transform:uppercase;letter-spacing:0.3px;margin-top:4px;">Avg Fatigue</div>
          </div>
        </div>

        <div style="font-size:11px;font-weight:700;color:#262527;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px;">⚡ Quick Actions</div>

        <button class="sched-quick-action" onclick="renderSchedTab('unassigned')" style="display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border-radius:10px;border:1px solid #F0F0F1;background:white;cursor:pointer;margin-bottom:6px;text-align:left;${font}transition:all 0.2s;">
          <div style="width:32px;height:32px;border-radius:8px;background:rgba(228,63,50,0.06);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">📋</div>
          <div style="flex:1;"><div style="font-size:12px;font-weight:600;color:#262527;">Fill Unassigned Shifts</div><div style="font-size:10px;color:#86868B;">${unassignedCount} shifts need officers</div></div>
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="#AEAEB2" stroke-width="2" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>
        </button>

        <button class="sched-quick-action" onclick="renderSchedTab('swaps')" style="display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border-radius:10px;border:1px solid #F0F0F1;background:white;cursor:pointer;margin-bottom:6px;text-align:left;${font}transition:all 0.2s;">
          <div style="width:32px;height:32px;border-radius:8px;background:rgba(255,179,0,0.06);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">🔄</div>
          <div style="flex:1;"><div style="font-size:12px;font-weight:600;color:#262527;">Process Swap Requests</div><div style="font-size:10px;color:#86868B;">${swapNeeded} officers need replacement</div></div>
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="#AEAEB2" stroke-width="2" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>
        </button>

        <button onclick="renderSchedTab('officers')" style="display:flex;align-items:center;gap:10px;width:100%;padding:10px 12px;border-radius:10px;border:1px solid #F0F0F1;background:white;cursor:pointer;margin-bottom:6px;text-align:left;${font}transition:all 0.2s;">
          <div style="width:32px;height:32px;border-radius:8px;background:rgba(76,175,80,0.06);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">👤</div>
          <div style="flex:1;"><div style="font-size:12px;font-weight:600;color:#262527;">View Officer Roster</div><div style="font-size:10px;color:#86868B;">${availableOfficers} available, ${SCHED_OFFICERS.length} total</div></div>
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="#AEAEB2" stroke-width="2" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>
        </button>

        ${typeof openAgentConfig === 'function' ? `
        <div class="signal-config-cta" onclick="openAgentConfig('scheduling')" style="margin-top:8px;cursor:pointer;">
          <div class="signal-config-cta-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2"/></svg>
          </div>
          <div><div class="signal-config-cta-text">Configure Scheduling Agent</div><div class="signal-config-cta-sub">Auto-swap rules · Fatigue thresholds · OT limits</div></div>
          <svg class="signal-config-cta-arrow" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 4l4 4-4 4"/></svg>
        </div>` : ''}
      </div>
    `;
    }

    else if (tab === 'unassigned') {
        msgs.innerHTML = `
      <div style="${font}">
        <div style="font-size:11px;font-weight:700;color:#262527;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px;">📋 Unassigned Shifts (${SCHED_UNASSIGNED.length})</div>
        ${SCHED_UNASSIGNED.map(s => {
            const prioColor = s.priority === 'high' ? '#E43F32' : s.priority === 'medium' ? '#FFB300' : '#4CAF50';
            const prioLabel = s.priority.charAt(0).toUpperCase() + s.priority.slice(1);
            const avail = SCHED_OFFICERS.filter(o => o.status === 'available').slice(0, 3);
            return `
            <div style="border:1px solid #F0F0F1;border-radius:10px;padding:12px;margin-bottom:8px;border-left:3px solid ${prioColor};" id="shift-${s.id}">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                <div style="font-size:12px;font-weight:600;color:#262527;">${s.site}</div>
                <span style="font-size:8px;font-weight:700;padding:2px 7px;border-radius:100px;background:${prioColor}10;color:${prioColor};text-transform:uppercase;">${prioLabel}</span>
              </div>
              <div style="font-size:10px;color:#86868B;margin-bottom:8px;">${s.day} · ${s.time} · ${s.type}</div>
              <div style="font-size:9px;font-weight:600;color:#AEAEB2;text-transform:uppercase;letter-spacing:0.3px;margin-bottom:6px;">AI Suggestions:</div>
              <div style="display:flex;gap:4px;flex-wrap:wrap;">
                ${avail.map(o => `
                  <button class="sched-assign-btn" data-shift="${s.id}" data-officer="${o.name}" style="padding:5px 10px;border-radius:6px;border:1px solid #E6E6E7;background:white;font-size:10px;font-weight:500;color:#262527;cursor:pointer;${font}display:flex;align-items:center;gap:4px;transition:all 0.2s;">
                    <span style="width:16px;height:16px;border-radius:50%;background:rgba(20,109,255,0.08);display:inline-flex;align-items:center;justify-content:center;font-size:7px;font-weight:700;color:#146DFF;">${o.name.split(' ').map(n => n[0]).join('')}</span>
                    ${o.name} <span style="color:#4CAF50;font-size:9px;">${o.score}%</span>
                  </button>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

        // Bind assign buttons
        msgs.querySelectorAll('.sched-assign-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const shiftId = btn.dataset.shift;
                const officer = btn.dataset.officer;
                const shiftCard = document.getElementById(`shift-${shiftId}`);

                // Visual feedback on button
                btn.style.background = '#4CAF50';
                btn.style.color = 'white';
                btn.style.borderColor = '#4CAF50';
                btn.textContent = '✓ Assigned';

                // Update card
                if (shiftCard) {
                    shiftCard.style.borderLeftColor = '#4CAF50';
                    shiftCard.style.background = 'rgba(76,175,80,0.02)';
                    const detail = shiftCard.querySelector('[style*="margin-bottom:8px"]');
                    if (detail) detail.innerHTML += `<br><strong style="color:#4CAF50;">→ ${officer} assigned</strong>`;
                }

                // Also highlight on calendar
                const dayMap = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 };
                const shift = SCHED_UNASSIGNED.find(s => s.id === shiftId);
                if (shift) {
                    const dayIdx = dayMap[shift.day];
                    const col = document.getElementById(`calendar-col-${dayIdx}`);
                    if (col) {
                        const unassignedCards = col.querySelectorAll('.g-card');
                        unassignedCards.forEach(card => {
                            const statusDot = card.querySelector('.g-card-status--unassigned');
                            if (statusDot) {
                                card.classList.add('signal-glow-green');
                                statusDot.className = 'g-card-status g-card-status--completed';
                                const nameEl = card.querySelector('.g-card-row-text');
                                if (nameEl) { nameEl.textContent = officer; nameEl.style.color = '#146DFF'; setTimeout(() => nameEl.style.color = '', 2000); }
                                // sparkle
                                if (typeof sparkleCard === 'function') sparkleCard(card, '#4CAF50');
                                setTimeout(() => card.classList.remove('signal-glow-green'), 2000);
                            }
                        });
                    }
                }
            });
        });
    }

    else if (tab === 'officers') {
        msgs.innerHTML = `
      <div style="${font}">
        <div style="font-size:11px;font-weight:700;color:#262527;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px;">👤 Officer Roster (${SCHED_OFFICERS.length})</div>
        ${SCHED_OFFICERS.map(o => {
            const statusColor = o.status === 'available' ? '#4CAF50' : o.status === 'on-duty' ? '#146DFF' : o.status === 'off-duty' ? '#AEAEB2' : '#E43F32';
            const statusLabel = o.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            const fatigueColor = o.fatigue < 30 ? '#4CAF50' : o.fatigue < 60 ? '#FFB300' : '#E43F32';
            const initials = o.name.split(' ').map(n => n[0]).join('');
            return `
            <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;border:1px solid #F0F0F1;margin-bottom:6px;transition:all 0.2s;">
              <div style="width:32px;height:32px;border-radius:50%;background:rgba(20,109,255,0.06);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#146DFF;flex-shrink:0;">${initials}</div>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:600;color:#262527;">${o.name}</div>
                <div style="font-size:10px;color:#86868B;display:flex;gap:8px;margin-top:2px;">
                  <span>Score: <strong style="color:#146DFF;">${o.score}%</strong></span>
                  <span>Fatigue: <strong style="color:${fatigueColor};">${o.fatigue}%</strong></span>
                  <span>${o.hrs}h/wk</span>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px;">
                <span style="font-size:8px;font-weight:700;padding:2px 7px;border-radius:100px;background:${statusColor}10;color:${statusColor};">${statusLabel}</span>
                ${o.cert ? '<span style="font-size:8px;color:#4CAF50;">✓ Certified</span>' : '<span style="font-size:8px;color:#AEAEB2;">Not certified</span>'}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
    }

    else if (tab === 'swaps') {
        msgs.innerHTML = `
      <div style="${font}">
        <div style="font-size:11px;font-weight:700;color:#262527;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px;">🔄 Swap Required (${SCHED_SWAPS.length})</div>
        ${SCHED_SWAPS.map((s, idx) => {
            return `
            <div style="border:1px solid rgba(255,179,0,0.15);border-radius:10px;padding:12px;margin-bottom:10px;background:rgba(255,179,0,0.02);" id="swap-${idx}">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                <div style="width:28px;height:28px;border-radius:50%;background:rgba(228,63,50,0.06);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;">⚠</div>
                <div style="flex:1;">
                  <div style="font-size:12px;font-weight:600;color:#E43F32;">${s.officer} — ${s.reason}</div>
                  <div style="font-size:10px;color:#86868B;">${s.day} · ${s.time} · ${s.site}</div>
                </div>
              </div>
              <div style="font-size:9px;font-weight:600;color:#AEAEB2;text-transform:uppercase;letter-spacing:0.3px;margin-bottom:6px;">Recommended Replacements:</div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                ${s.suggestions.map((name, rank) => {
                const officer = SCHED_OFFICERS.find(o => o.name === name);
                const initials = name.split(' ').map(n => n[0]).join('');
                const isTop = rank === 0;
                return `
                    <button class="sched-swap-btn" data-swap="${idx}" data-officer="${name}" style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;border:1px solid ${isTop ? 'rgba(76,175,80,0.2)' : '#E6E6E7'};background:${isTop ? 'rgba(76,175,80,0.03)' : 'white'};cursor:pointer;${font}text-align:left;width:100%;transition:all 0.2s;">
                      <span style="width:24px;height:24px;border-radius:50%;background:${isTop ? 'rgba(76,175,80,0.08)' : 'rgba(20,109,255,0.06)'};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:${isTop ? '#4CAF50' : '#146DFF'};flex-shrink:0;">${initials}</span>
                      <div style="flex:1;">
                        <div style="font-size:11px;font-weight:600;color:#262527;">${name} ${isTop ? '<span style="font-size:8px;color:#4CAF50;font-weight:700;">⭐ Best Match</span>' : ''}</div>
                        <div style="font-size:9px;color:#86868B;">Score: ${officer ? officer.score : '–'}% · Fatigue: ${officer ? officer.fatigue : '–'}% · ${officer ? officer.hrs : '–'}h/wk</div>
                      </div>
                      <span style="font-size:10px;font-weight:600;color:${isTop ? '#4CAF50' : '#146DFF'};">Assign →</span>
                    </button>
                  `;
            }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

        // Bind swap buttons
        msgs.querySelectorAll('.sched-swap-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const swapIdx = parseInt(btn.dataset.swap);
                const officer = btn.dataset.officer;
                const swapCard = document.getElementById(`swap-${swapIdx}`);

                btn.style.background = '#4CAF50';
                btn.style.color = 'white';
                btn.style.borderColor = '#4CAF50';
                btn.innerHTML = `<span style="font-size:12px;">✓</span> <span style="font-size:11px;font-weight:600;">${officer} assigned — Swap complete</span>`;

                if (swapCard) {
                    swapCard.style.borderColor = 'rgba(76,175,80,0.2)';
                    swapCard.style.background = 'rgba(76,175,80,0.03)';
                }

                // Disable other buttons in this swap
                swapCard.querySelectorAll('.sched-swap-btn').forEach(b => {
                    if (b !== btn) { b.style.opacity = '0.4'; b.style.pointerEvents = 'none'; }
                });

                // Flash on calendar
                const swap = SCHED_SWAPS[swapIdx];
                if (swap) {
                    const dayMap = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 };
                    const dayIdx = dayMap[swap.day];
                    const col = document.getElementById(`calendar-col-${dayIdx}`);
                    if (col) {
                        const cards = col.querySelectorAll('.g-card');
                        cards.forEach(card => {
                            const nameEl = card.querySelector('.g-card-row-text');
                            if (nameEl && nameEl.textContent.includes('Hazel')) {
                                card.classList.add('signal-glow-green');
                                nameEl.textContent = officer;
                                nameEl.style.color = '#4CAF50';
                                nameEl.style.fontWeight = '600';
                                if (typeof addBadge === 'function') addBadge(card, '✦ Swapped', 'rgba(76,175,80,0.08)', '#2E7D32');
                                if (typeof sparkleCard === 'function') sparkleCard(card, '#4CAF50');
                                setTimeout(() => { card.classList.remove('signal-glow-green'); nameEl.style.color = ''; nameEl.style.fontWeight = ''; }, 3000);
                            }
                        });
                    }
                }
            });
        });
    }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => { injectSchedulingAgent(); });
