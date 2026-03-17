// ===== SCHEDULING OPTIMIZATION AGENT — SIMULATION =====

const script = [
    {
        scene: 0,
        trigger: "Morning",
        agentInit: "Monitoring shift start times. <b>Alert: 4 Officers Have Not Started Their Shift.</b>",
        visual: `
            <div class="dash-card" style="border-color:#EF4444">
                <div class="dash-header">
                    <div class="dash-title">
                        <h3 style="color:#DC2626"><i class="fa-solid fa-triangle-exclamation"></i> Action Required</h3>
                        <p>No-Show / Late Detection</p>
                    </div>
                    <span class="dash-badge" style="background:#FEE2E2; color:#B91C1C; border-color:#FECACA">High Priority</span>
                </div>
                <div class="schedule-grid">
                    <div class="schedule-item" style="border-left-color:#EF4444; animation-delay: 0.1s">
                        <div class="sch-left">
                            <h4>John Doe — Dedicated</h4>
                            <p>Walmart 5th Ave • High Priority (Coverage Gap)</p>
                        </div>
                        <span class="sch-badge" style="background:#FEF2F2; color:#EF4444">12 min late</span>
                    </div>
                    <div class="schedule-item" style="border-left-color:#F59E0B; animation-delay: 0.2s">
                        <div class="sch-left">
                            <h4>Carlos Mendez — Patrol</h4>
                            <p>Zone A • Coverage Risk</p>
                        </div>
                        <span class="sch-badge" style="background:#FFFDEB; color:#D97706">12 min late</span>
                    </div>
                    <div class="schedule-item" style="border-left-color:#F59E0B; animation-delay: 0.3s">
                        <div class="sch-left">
                            <h4>Ahmed R. — Dedicated</h4>
                            <p>Industrial Site • Moderate Risk</p>
                        </div>
                        <span class="sch-badge" style="background:#FFFDEB; color:#D97706">12 min late</span>
                    </div>
                    <div class="schedule-item" style="border-left-color:#94A3B8; animation-delay: 0.4s">
                        <div class="sch-left">
                            <h4>Sophia Khan — Patrol</h4>
                            <p>Midtown • Low Urgency</p>
                        </div>
                        <span class="sch-badge" style="background:#F8FAFC; color:#64748B">12 min late</span>
                    </div>
                </div>
                <p style="text-align:center; font-size:12px; color:#64748B; margin-top:16px;">
                    Diagnosis: Checked 10-min grace period. No clock-in event. No GPS presence at site.
                </p>
            </div>
        `,
        actions: [{ label: "Find Replacements", highlight: true }, { label: "Send Reminder" }, { label: "Ignore for now" }],
        waitFor: "Find Replacements"
    },
    {
        scene: 0.5,
        agentInit: "Searching for available officers...",
        visual: `
            <div class="dash-card search-animation-card" style="border-color:#F59E0B">
                <div class="skeleton-list">
                    <div class="skeleton-item" style="border-left: 3px solid #F59E0B">
                        <div class="skeleton-avatar"></div>
                        <div class="skeleton-lines">
                            <div class="skeleton-line" style="width: 60%"></div>
                            <div class="skeleton-line" style="width: 40%"></div>
                        </div>
                    </div>
                    <div class="skeleton-item">
                        <div class="skeleton-avatar"></div>
                        <div class="skeleton-lines">
                            <div class="skeleton-line" style="width: 70%"></div>
                            <div class="skeleton-line" style="width: 45%"></div>
                        </div>
                    </div>
                    <div class="skeleton-item" style="opacity: 0.6">
                        <div class="skeleton-avatar"></div>
                        <div class="skeleton-lines">
                            <div class="skeleton-line" style="width: 50%"></div>
                            <div class="skeleton-line" style="width: 30%"></div>
                        </div>
                    </div>
                </div>
                <div style="text-align:center; padding-top:15px; font-size:13px; font-weight:500; color:#F59E0B;" id="search-status">
                    Analyzing skills, fatigue, and distance thresholds...
                </div>
            </div>
        `,
        autoNext: true,
        delayNext: 3500
    },
    {
        scene: 1,
        agentInit: "Evaluated distance, availability, and fatigue limits.<br><br>Here is the optimized replacement plan:",
        visual: `
            <div class="dash-card" style="border-color:#F59E0B">
                <div class="dash-header">
                    <div class="dash-title">
                        <h3>Replacement Plan Ready</h3>
                        <p>ETA and risk calculation completed.</p>
                    </div>
                    <span class="dash-badge" style="background:#FFFBEB; color:#D97706; border-color:#FDE68A">Suggestions</span>
                </div>
                <div class="table-wrapper">
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>Original</th>
                            <th>Suggested Replacement</th>
                            <th>ETA</th>
                            <th>Fatigue Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>John D.</td><td>Mark T.</td><td style="color:#10B981;font-weight:600">14 min</td><td>Low</td></tr>
                        <tr><td>Carlos M.</td><td>Jason R.</td><td style="color:#10B981;font-weight:600">18 min</td><td>Low</td></tr>
                        <tr><td>Ahmed R.</td><td>Extend shift of Paul</td><td>+2 hrs</td><td>Safe</td></tr>
                        <tr><td>Sophia K.</td><td>Move visits to Carlos backup</td><td>—</td><td>Safe</td></tr>
                    </tbody>
                </table>
                </div>
            </div>
        `,
        actions: [{ label: "Apply Plan", highlight: true }, { label: "Modify Plan" }, { label: "Cancel" }],
        waitFor: "Apply Plan"
    },
    {
        scene: 2,
        agentInit: "Plan applied. Shifts reassigned, officers notified, no-show logged, payroll flag created.<br><br>Crisis resolved in under 60 seconds.",
        visual: `
            <div class="dash-card" style="border-color:#10B981">
                <div class="dash-header" style="margin-bottom:0; padding-bottom:0; border-bottom:none;">
                    <div class="dash-title">
                        <h3 style="color:#059669"><i class="fa-solid fa-circle-check"></i> Scheduler Updated</h3>
                        <p>All emergency gaps filled successfully.</p>
                    </div>
                </div>
            </div>
        `,
        actions: [{ label: "Wait for Midday Update", highlight: true }],
        waitFor: "Wait for Midday Update"
    },
    {
        scene: 3,
        agentInit: "<b>12:30 PM Update:</b> I've detected 3 unassigned shifts for tonight.<br><br>I evaluated standby pool, officers under 40 hours, and site familiarity.",
        visual: `
            <div class="dash-card">
                <div class="dash-header">
                    <div class="dash-title">
                        <h3>Midday Gap Detection</h3>
                        <p>Optimized Fill Plan Suggested</p>
                    </div>
                    <span class="dash-badge" style="background:#FEF3C7; color:#B45309; border:none">Review Needed</span>
                </div>
                <div class="schedule-grid">
                    <div class="schedule-item" style="border-left-color:#F59E0B">
                        <div class="sch-left">
                            <h4>2 Shifts Extended</h4>
                            <p>Extending 6-hour shifts to 8 hours</p>
                        </div>
                        <i class="fa-solid fa-clock" style="color:#64748B"></i>
                    </div>
                    <div class="schedule-item" style="border-left-color:#10B981">
                        <div class="sch-left">
                            <h4>1 Standby Assignment</h4>
                            <p>Assigned to available standby officer</p>
                        </div>
                        <i class="fa-solid fa-user-check" style="color:#64748B"></i>
                    </div>
                </div>
            </div>
        `,
        actions: [{ label: "View Shifts", highlight: true }, { label: "Review Alternatives" }],
        waitFor: "View Shifts"
    },
    {
        scene: 3.5,
        agentInit: "I have highlighted the unassigned shifts on the schedule for your review.",
        visual: null,
        actions: [{ label: "Approve Fill Plan", highlight: true }, { label: "Cancel" }],
        waitFor: "Approve Fill Plan"
    },
    {
        scene: 4,
        agentInit: "Fill plan approved. Calendar auto-filled.<br><br><i>Tip: Type 'Optimize' for individual rebalancing.</i>",
        visual: null,
        actions: [{ label: "Optimize John Doe", highlight: true }],
        waitFor: "Optimize John Doe"
    },
    {
        scene: 5,
        targetVisual: "Optimize John Doe",
        agentInit: "Here is John's current plan.<br>Total: 32 hours (uneven distribution).",
        visual: `
            <div class="dash-card">
                <div class="dash-header">
                    <div class="dash-title">
                        <h3>Current Schedule: John Doe</h3>
                        <p>Total: 32 Hours (Uneven)</p>
                    </div>
                    <span class="dash-badge" style="background:#F1F5F9; color:#64748B; border:none">Standard</span>
                </div>
                <div class="table-wrapper">
                <table class="report-table">
                    <thead><tr><th>Day</th><th>Site</th><th>Hours</th></tr></thead>
                    <tbody>
                        <tr><td>Mon</td><td>Walmart A</td><td>10</td></tr>
                        <tr><td>Tue</td><td>Walmart A</td><td>12</td></tr>
                        <tr><td>Wed</td><td>Target</td><td>6</td></tr>
                        <tr><td>Thu</td><td>Walmart B</td><td>4</td></tr>
                    </tbody>
                </table>
                </div>
            </div>
        `,
        actions: [{ label: "Make it 44 hours. Max 8h per shift. Split Walmart A/B.", highlight: true }],
        waitFor: "Make it 44 hours. Max 8h per shift. Split Walmart A/B."
    },
    {
        scene: 5.5,
        agentInit: "Rebalancing... Calculating 44-hour target... Ensuring maximum 8 hour shifts...",
        visual: `
            <div class="dash-card search-animation-card" style="border-color:#8B5CF6">
                <div class="skeleton-list">
                    <div class="skeleton-item" style="border-left: 3px solid #8B5CF6">
                        <div class="skeleton-lines">
                            <div class="skeleton-line" style="width: 80%"></div>
                        </div>
                    </div>
                    <div class="skeleton-item">
                        <div class="skeleton-lines">
                            <div class="skeleton-line" style="width: 60%"></div>
                        </div>
                    </div>
                    <div class="skeleton-item" style="opacity: 0.6">
                        <div class="skeleton-lines">
                            <div class="skeleton-line" style="width: 70%"></div>
                        </div>
                    </div>
                </div>
                <div style="text-align:center; padding-top:15px; font-size:13px; font-weight:500; color:#8B5CF6;" id="rebalance-status">
                    Applying compliance rules...
                </div>
            </div>
        `,
        autoNext: true,
        delayNext: 3500
    },
    {
        scene: 6,
        agentInit: "Rebalancing done. Distributing 8-hour shifts. Ensuring rest compliance.",
        visual: `
            <div class="dash-card" style="border-color:#8B5CF6">
                <div class="dash-header">
                    <div class="dash-title">
                        <h3>Optimized Resource Target</h3>
                        <p>Total: 44 Hours • Balanced 50/50</p>
                    </div>
                    <span class="dash-badge" style="background:#EDE9FE; color:#6D28D9; border:none"><i class="fa-solid fa-wand-magic-sparkles"></i> Optimized</span>
                </div>
                <div class="table-wrapper">
                <table class="report-table">
                    <thead><tr><th>Day</th><th>Site</th><th>Hours</th></tr></thead>
                    <tbody>
                        <tr><td>Mon</td><td>Walmart A</td><td>8</td></tr>
                        <tr><td>Tue</td><td>Walmart B</td><td>8</td></tr>
                        <tr><td>Wed</td><td>Walmart A</td><td>8</td></tr>
                        <tr><td>Thu</td><td>Walmart B</td><td>8</td></tr>
                        <tr><td>Fri</td><td>Walmart A</td><td>8</td></tr>
                        <tr><td>Sat</td><td>Walmart B</td><td>4</td></tr>
                    </tbody>
                </table>
                </div>
            </div>
        `,
        actions: [{ label: "Balance Active Patrols.", highlight: true }],
        waitFor: "Balance Active Patrols."
    },
    {
        scene: 7,
        agentInit: "Analyzing current patrol load for 4:00 PM.<br>Carlos has 30 visits. Sophia has 18 visits.<br><br>Transferring 6 visits from Carlos → Sophia. Recalculating live routes.",
        visual: `
            <div class="dash-card" style="border-color:#10B981">
                <div class="dash-header">
                    <div class="dash-title">
                        <h3>Live Route Reflection</h3>
                        <p>Zone load equalized.</p>
                    </div>
                    <span class="dash-badge" style="background:#D1FAE5; color:#065F46; border:none"><i class="fa-solid fa-bolt"></i> Synced</span>
                </div>
                <div class="grid-cols-2" style="margin-bottom:0">
                    <div class="data-box" style="border-color:#10B981">
                        <div class="data-label">Carlos</div>
                        <div class="data-value">30 <i class="fa-solid fa-arrow-right-long" style="color:#64748B; font-size:12px"></i> 24</div>
                    </div>
                    <div class="data-box" style="border-color:#10B981">
                        <div class="data-label">Sophia</div>
                        <div class="data-value">18 <i class="fa-solid fa-arrow-right-long" style="color:#64748B; font-size:12px"></i> 24</div>
                    </div>
                </div>
            </div>
        `,
        actions: [{ label: "Restart Scenario", highlight: true }],
        waitFor: "Restart Scenario"
    }
];

let step = 0;
const history = document.getElementById('chat-history');
const actionsContainer = document.getElementById('quick-actions');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function enableInput() {
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.placeholder = "Type a command...";
    userInput.focus();
}

function disableInput() {
    userInput.disabled = true;
    sendBtn.disabled = true;
    userInput.placeholder = "Agent processing...";
}

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
});

sendBtn.onclick = handleSend;

async function handleSend() {
    const val = userInput.value.trim();
    if (!val) return;

    userInput.value = "";
    userMsg(val);
    disableInput();

    const currentWait = script[step] && script[step].waitFor ? script[step].waitFor.toLowerCase() : null;
    const isMatch = currentWait && val.toLowerCase().includes(currentWait.replace(/[^\w\s]/gi, '').split(' ')[0]);

    // General matching logic based on expected step action or keywords
    if (val.toLowerCase().includes("balance") && step < script.length - 1) {
        step = script.findIndex(s => s.scene === 7);
        await executeStep(step);
    } else if (val.toLowerCase().includes("optimize") && step < script.findIndex(s => s.scene === 5)) {
        step = script.findIndex(s => s.scene === 5);
        await executeStep(step);
    } else if (currentWait && val.toLowerCase().includes(currentWait.split(' ')[0].toLowerCase())) {
        step++;
        await executeStep(step);
    } else {
        await agentMsg("Confirmed. The system will continue to monitor the schedule.");
        if (script[step]) {
            renderActions(script[step].actions);
        }
        enableInput();
    }
}

async function agentMsg(text, visualHtml = null) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message agent';
    msgDiv.style.maxWidth = '95%';
    msgDiv.innerHTML = `
        <span class="msg-title">Scheduling Optimization</span>
        <div class="msg-typing"><span></span><span></span><span></span></div>
    `;
    history.appendChild(msgDiv);
    history.scrollTop = history.scrollHeight;

    await new Promise(r => setTimeout(r, 900));

    let content = text;
    if (visualHtml) {
        content += `<div style="margin-top: 14px; margin-bottom: 4px; border-top: 1px solid #E2E8F0; padding-top: 14px;">${visualHtml}</div>`;
    }

    msgDiv.innerHTML = `
        <span class="msg-title">Scheduling Optimization</span>
        <div class="msg-bubble">${content}</div>
    `;
    history.scrollTop = history.scrollHeight;
}

function userMsg(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user';
    msgDiv.innerHTML = `
        <span class="msg-title">Supervisor</span>
        <div class="msg-bubble">${text}</div>
    `;
    history.appendChild(msgDiv);
    history.scrollTop = history.scrollHeight;
}

function renderActions(actions) {
    actionsContainer.innerHTML = '';
    if (!actions) return;

    actions.forEach(act => {
        let label = typeof act === 'string' ? act : act.label;
        let isHighlight = act.highlight;

        const btn = document.createElement('button');
        btn.className = 'action-btn';
        if (isHighlight) {
            btn.classList.add('suggested');
        } else if (label.includes('Apply Plan') || label.includes('Approve') || label.includes('Yes')) {
            btn.classList.add('primary');
        }

        btn.innerHTML = label;
        btn.onclick = () => handleAction(label);
        actionsContainer.appendChild(btn);
    });
}

async function handleAction(action) {
    actionsContainer.innerHTML = '';

    if (action === "Restart Scenario") {
        location.reload();
        return;
    }

    userMsg(action);

    if (script[step].waitFor === action) {
        step++;
        await executeStep(step);
    }
}

async function executeStep(index) {
    if (index >= script.length) return;
    const current = script[index];

    await agentMsg(current.agentInit, current.visual);

    if (current.scene === 0.5) {
        setTimeout(() => {
            const status = document.getElementById('search-status');
            if (status) status.innerText = "Checking availability for Jason R...";
        }, 1200);
        setTimeout(() => {
            const status = document.getElementById('search-status');
            if (status) status.innerText = "Evaluating Mark T. and suitable matches...";
        }, 2200);
    }

    // Dynamic UI Updates on the Scheduler Side based on steps
    if (current.scene === 2) { // "Apply Plan"
        setTimeout(() => {
            removeHighlights();
            updateCalendarOnApplyPlan();
        }, 800);
    }

    if (current.scene === 3.5) { // "View Shifts"
        setTimeout(() => {
            highlightMiddayGaps();
        }, 500);
    }

    if (current.scene === 4) { // "Approve Fill Plan"
        setTimeout(() => {
            removeHighlights();
        }, 500);
    }

    if (current.scene === 5) { // "Optimize John Doe"
        setTimeout(() => {
            highlightJohnDoe();
        }, 800);
    }

    if (current.scene === 5.5) {
        setTimeout(() => {
            const status = document.getElementById('rebalance-status');
            if (status) status.innerText = "Syncing schedule blocks...";
            simulateUpdatingShifts();
        }, 1500);
    }

    if (current.scene === 6) { // "Rebalancing Done"
        setTimeout(() => {
            removeHighlights();
        }, 500);
    }

    if (current.scene === 7) { // "Balance Active Patrols"
        setTimeout(() => {
            updateCalendarOnBalance();
        }, 800);
    }

    if (current.autoNext) {
        disableInput();
        setTimeout(async () => {
            step++;
            await executeStep(step);
        }, current.delayNext || 1500);
    } else {
        renderActions(current.actions);
        enableInput();
    }
}

// Deselect / clear all card highlights when hand is idle
function clearIdleHighlights() {
    // Only remove transient hover/pulse highlights — not intentional step highlights
    document.querySelectorAll('.schedule-card').forEach(card => {
        if (!card.classList.contains('flash-red') &&
            !card.classList.contains('flash-green') &&
            !card.classList.contains('highlight-pulse') &&
            !card.classList.contains('highlight-john') &&
            !card.classList.contains('highlight-pulse-purple')) {
            card.style.transform = '';
            card.style.boxShadow = '';
        }
    });
}

// ==== UI MUTATION FUNCTIONS ====

function highlightLateShifts() {
    const cols = document.querySelectorAll('.calendar-column');
    const colWed = cols[3];

    if (colWed) {
        let cards = colWed.querySelectorAll('.schedule-card');
        if (cards.length > 0) {
            cards[0].classList.add('flash-red');
            const n = cards[0].querySelector('.card-officer-name');
            if (n) n.innerText = 'John Doe';
        }
        if (cards.length > 1) {
            cards[1].classList.add('flash-red');
            const n = cards[1].querySelector('.card-officer-name');
            if (n) n.innerText = 'Carlos Mendez';
        }
        if (cards.length > 2) {
            cards[2].classList.add('flash-red');
            const n = cards[2].querySelector('.card-officer-name');
            if (n) n.innerText = 'Ahmed R.';
        }
    }

    const colThu = cols[4];
    if (colThu) {
        let cards = colThu.querySelectorAll('.schedule-card');
        if (cards.length > 0) {
            cards[0].classList.add('flash-red');
            const n = cards[0].querySelector('.card-officer-name');
            if (n) n.innerText = 'Sophia Khan';
        }
    }
}

function highlightMiddayGaps() {
    const cols = document.querySelectorAll('.calendar-column');
    const colWed = cols[3];
    const colThu = cols[4];

    if (colWed) {
        let cards = colWed.querySelectorAll('.schedule-card');
        if (cards.length > 1) cards[1].classList.add('highlight-pulse');
        if (cards.length > 2) cards[2].classList.add('highlight-pulse');
    }
    if (colThu) {
        let cards = colThu.querySelectorAll('.schedule-card');
        if (cards.length > 1) cards[1].classList.add('highlight-pulse');
    }
}

function highlightJohnDoe() {
    const colsList = document.querySelectorAll('.calendar-column');
    const cols = [1, 2, 3, 4];
    cols.forEach(colIdx => {
        const col = colsList[colIdx];
        if (col) {
            let cards = col.querySelectorAll('.schedule-card');
            if (cards.length > 0) {
                cards[0].classList.add('highlight-john');
                const n = cards[0].querySelector('.card-officer-name');
                if (n) n.innerText = 'John Doe';
            }
        }
    });
}

function removeHighlights() {
    const cards = document.querySelectorAll('.schedule-card');
    cards.forEach(card => {
        // Remove ALL highlight/flash classes so no card stays stuck when idle
        card.classList.remove(
            'highlight-pulse',
            'highlight-john',
            'flash-red',
            'flash-green',
            'highlight-pulse-purple',
            'new-shift'
        );
        // Also clear any inline animation or transform left over
        card.style.animation = '';
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.borderLeftColor = '';
    });
}

function simulateUpdatingShifts() {
    const johnCards = document.querySelectorAll('.highlight-john');
    let idx = 0;
    const interval = setInterval(() => {
        if (idx >= johnCards.length) {
            clearInterval(interval);
            return;
        }

        johnCards[idx].classList.remove('highlight-john');
        johnCards[idx].classList.add('highlight-pulse-purple');

        setTimeout(() => {
            const titleNode = johnCards[idx].querySelector('.card-time-text');
            if (titleNode) titleNode.innerText = '09:00a - 5:00p';
        }, 300);

        idx++;
    }, 600);
}

function updateCalendarOnApplyPlan() {
    const redCards = document.querySelectorAll('.flash-red');
    const replacements = ['Mark T.', 'Jason R.', 'Paul (Extended)', 'Carlos (Backup)'];

    redCards.forEach((card, index) => {
        card.classList.remove('flash-red');
        card.classList.add('flash-green');

        setTimeout(() => {
            const nameNode = card.querySelector('.card-officer-name');
            if (nameNode && replacements[index]) {
                nameNode.innerText = replacements[index];
            }
        }, 500);
    });
}

function updateCalendarOnBalance() {
    const createShift = (title, officer, initials, colorHex, label, avatarColor) => {
        const newCard = document.createElement('div');
        newCard.className = 'schedule-card new-shift';
        newCard.style.borderLeftColor = colorHex;
        newCard.innerHTML = `
            <div class="card-title" style="font-weight: 600;">${title}</div>
            <div class="card-officer">
              <div class="card-officer-avatar" style="background: ${avatarColor}">
                <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:500;color:#444;">${initials}</div>
              </div>
              <span class="card-officer-name">${officer}</span>
            </div>
            <div class="card-time"><span class="card-time-text">4:00p - 12:00a</span></div>
            <div class="card-badge" style="background:${colorHex}15; color:${colorHex}; font-weight: 600;">${label}</div>
        `;
        const slot = document.createElement('div');
        slot.className = 'card-slot';
        slot.appendChild(newCard);
        return slot;
    };

    // Just visually create a change
    const colWed = document.getElementById('calendar-col-3');
    if (colWed) {
        colWed.prepend(createShift('Patrol (Zone A)', 'Sophia K.', 'SK', '#8B5CF6', 'Rebalanced', '#EDE9FE'));
    }
}

window.onload = async () => {
    enableInput();
    await agentMsg("Starting Shift Monitor... System is identifying current schedule status.");
    setTimeout(() => {
        executeStep(0);
        highlightLateShifts();
    }, 1200);
};
