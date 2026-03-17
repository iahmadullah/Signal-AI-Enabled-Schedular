// ===== CONTRACT INTELLIGENCE AGENT — SIMULATION =====

const script = [
    {
        scene: 0,
        trigger: "Milwaukee Tool",
        agentInit: "Active contract found: Milwaukee Tool – Industrial Property.",
        visual: `
            <div class="dash-card">
                <div class="dash-header">
                    <div class="dash-title">
                        <h3>Milwaukee Tool</h3>
                        <p>ID: C-88342 • Industrial Property</p>
                    </div>
                    <span class="dash-badge">Active Contract</span>
                </div>
                <div class="grid-cols-2">
                    <div class="data-box">
                        <div class="data-label">Patrol Officers</div>
                        <div class="data-value"><i class="fa-solid fa-car-side"></i> 4 Active</div>
                    </div>
                    <div class="data-box">
                        <div class="data-label">Dedicated Officers</div>
                        <div class="data-value"><i class="fa-solid fa-user-shield"></i> 18 Active</div>
                    </div>
                    <div class="data-box">
                        <div class="data-label">Dispatch Incidents</div>
                        <div class="data-value"><i class="fa-solid fa-bell"></i> 12 / mo (avg)</div>
                    </div>
                    <div class="data-box">
                        <div class="data-label">Response SLA</div>
                        <div class="data-value"><i class="fa-solid fa-stopwatch"></i> < 15 mins</div>
                    </div>
                </div>
            </div>
        `,
        actions: [{ label: "View Full Agreement" }, { label: "Edit Coverage" }, { label: "Open Shift Plan", highlight: true }, { label: "Create Amendment" }],
        waitFor: "Open Shift Plan"
    },
    {
        scene: 1.5,
        targetVisual: "Open Shift Plan",
        agentInit: "Opening pre-filtered calendar for Milwaukee Tool. No manual search needed.",
        visual: `
            <div class="dash-card">
                <div class="dash-header">
                    <div class="dash-title">
                        <h3>Targeted Shift Plan</h3>
                        <p>Milwaukee Tool • This Week</p>
                    </div>
                    <span class="dash-badge" style="background:#DBEAFE; color:#1D4ED8; border-color:#BFDBFE">Calendar Focus</span>
                </div>
                <div class="schedule-grid">
                    <div class="schedule-item" style="animation-delay: 0.1s">
                        <div class="sch-left">
                            <h4>Night Patrol — North Sector</h4>
                            <p>Today, 22:00 - 06:00 • Officer: J. Miller</p>
                        </div>
                        <span class="sch-badge">Patrol</span>
                    </div>
                    <div class="schedule-item" style="animation-delay: 0.2s">
                        <div class="sch-left">
                            <h4>Gate Entry Control</h4>
                            <p>Tomorrow, 06:00 - 14:00 • Officer: A. Smith</p>
                        </div>
                        <span class="sch-badge" style="color:#B45309; background:#FEF3C7">Dedicated</span>
                    </div>
                    <div class="schedule-item" style="animation-delay: 0.3s">
                        <div class="sch-left">
                            <h4>Perimeter Scan</h4>
                            <p>Tomorrow, 14:00 - 22:00 • Unassigned</p>
                        </div>
                        <span class="sch-badge" style="color:#B91C1C; background:#FEE2E2">Pending SLA</span>
                    </div>
                </div>
            </div>
        `,
        actions: [{ label: "View Analytics" }, { label: "Search New Property", highlight: true }],
        waitFor: "Search New Property"
    },
    {
        scene: 1.8,
        agentInit: "Please enter or select the site name you are searching for.",
        visual: null,
        actions: [{ label: "Walmart", highlight: true }, { label: "Target" }, { label: "Home Depot" }],
        waitFor: "Walmart"
    },
    {
        scene: 2,
        trigger: "Walmart",
        agentInit: "No contract data found for Walmart. Would you like me to guide you to create this site?",
        visual: `
            <div class="empty-state" style="opacity:1; animation:fadeIn 0.5s; position:relative; transform:none; left:0; top:0; margin: 0 auto; margin-top: 30px; text-align:center;">
                <i class="fa-solid fa-building-circle-exclamation" style="font-size:48px; color:#F59E0B"></i>
                <h3 style="color:#1E293B; margin:16px 0 8px; font-size:18px;">Site Not Found</h3>
                <p style="color:#64748B;">Contract Intelligence DB scanned.</p>
            </div>
        `,
        actions: [{ label: "Yes, create site", highlight: true }, { label: "Remind me later" }, { label: "Cancel" }],
        waitFor: "Yes, create site"
    },
    {
        scene: 3,
        agentInit: "Please share a Google Maps URL, drop a map pin, or type the address.",
        visual: `
            <div class="empty-state" style="opacity:1; position:relative; transform:none; left:0; top:0; margin: 0 auto; margin-top: 30px; text-align:center;">
                <i class="fa-solid fa-location-dot" style="font-size:48px; color:#2563EB"></i>
                <h3 style="color:#1E293B; margin:16px 0 8px; font-size:18px;">Awaiting Coordinates</h3>
                <p style="color:#64748B;">Ready to parse location data.</p>
            </div>
        `,
        actions: [{ label: "https://goo.gl/maps/walmart123", highlight: true }, { label: "Enter Manually" }, { label: "Use Current Location" }],
        waitFor: "https://goo.gl/maps/walmart123",
        triggerInput: "maps"
    },
    {
        scene: 3.2,
        agentInit: "Scanning geospatial data... extracting property bounds.",
        visual: `
            <div class="dash-card search-animation">
                <div class="radar-scan">
                    <div class="radar-beacon"></div>
                </div>
                <p style="text-align:center; margin-top: 16px; color:#64748B; font-weight:500;">Connecting to Maps API...</p>
            </div>
        `,
        autoNext: true,
        delayNext: 3000
    },
    {
        scene: 3.5,
        agentInit: "I found: Walmart Supercenter, Retail Property, 1234 Main Street. Open 7 days | 6 AM – 11 PM. Large Parking Area | High Foot Traffic.<br><br>Would you like me to fetch publicly available contact details?",
        visual: `
            <div class="dash-card">
                <div class="map-visual">
                    <div class="map-overlay">
                        <div>
                            <h3>Walmart Supercenter</h3>
                            <p>1234 Main Street, Anytown</p>
                        </div>
                    </div>
                </div>
                <div class="grid-cols-2" style="margin-bottom:0">
                    <div class="data-box"><div class="data-label">Property Type</div><div class="data-value">Retail Center</div></div>
                    <div class="data-box"><div class="data-label">Traffic Index</div><div class="data-value" style="color:#DC2626">High Risk</div></div>
                    <div class="data-box"><div class="data-label">Hours</div><div class="data-value">06:00 - 23:00</div></div>
                    <div class="data-box"><div class="data-label">Parking Size</div><div class="data-value">Large Lot</div></div>
                </div>
            </div>
        `,
        actions: [{ label: "Yes, fetch public data", highlight: true }, { label: "No, skip" }, { label: "Edit Address" }],
        waitFor: "Yes, fetch public data"
    },
    {
        scene: 3.8,
        agentInit: "Retrieved: Store Phone (555-0199), Corporate Contact (regional@walmart.ext).<br>Set as Primary Contact?",
        visual: null,
        actions: [{ label: "Confirm as Primary", highlight: true }, { label: "Add Alternative" }, { label: "Delete" }],
        waitFor: "Confirm as Primary"
    },
    {
        scene: 4,
        agentInit: "New property created. Select a contract template to draft the agreement.",
        visual: `
            <div class="empty-state" style="opacity:1; position:relative; transform:none; left:0; top:0; margin: 0 auto; margin-top: 30px; text-align:center;">
                <i class="fa-solid fa-file-signature" style="font-size:48px; color:#8B5CF6"></i>
                <h3 style="color:#1E293B; margin:16px 0 8px; font-size:18px;">Template Engine</h3>
                <p style="color:#64748B;">Waiting for service parameters.</p>
            </div>
        `,
        actions: [{ label: "Patrol Service" }, { label: "Dedicated Service" }, { label: "Patrol + Dedicated", highlight: true }, { label: "Dispatch Only" }],
        waitFor: "Patrol + Dedicated"
    },
    {
        scene: 5,
        agentInit: "Analyzing: Retail • Parking lot exposure • Evening crowd peak • Moderate theft risk.<br><br>Based on the profile, I recommend:<br>• 2 Patrol Officers<br>• 5 Days per Week<br>• 1 Dedicated Officer (Peak Hours)<br>• 15-minute Dispatch SLA",
        visual: `
            <div class="dash-card" style="border-color:#F59E0B">
                <div class="dash-header">
                    <div class="dash-title">
                        <h3>AI Recommendation Engine</h3>
                        <p>Confidence: 94% Match</p>
                    </div>
                    <span class="dash-badge" style="background:#FEF3C7; color:#B45309; border:none"><i class="fa-solid fa-bolt"></i> Optimized</span>
                </div>
                <div class="schedule-grid">
                    <div class="schedule-item" style="border-left-color:#F59E0B; animation-delay:0.1s; opacity:1; transform:none;">
                        <div class="sch-left"><h4>2 Patrol Officers</h4><p>High deterrence visibility</p></div><i class="fa-solid fa-car" style="color:#64748B"></i>
                    </div>
                    <div class="schedule-item" style="border-left-color:#F59E0B; animation-delay:0.2s; opacity:1; transform:none;">
                        <div class="sch-left"><h4>5 Days / Week</h4><p>Covering peak traffic days</p></div><i class="fa-regular fa-calendar-check" style="color:#64748B"></i>
                    </div>
                    <div class="schedule-item" style="border-left-color:#F59E0B; animation-delay:0.3s; opacity:1; transform:none;">
                        <div class="sch-left"><h4>1 Dedicated Officer</h4><p>Peak Hour internal coverage (16:00-22:00)</p></div><i class="fa-solid fa-building-shield" style="color:#64748B"></i>
                    </div>
                </div>
            </div>
        `,
        actions: [{ label: "Accept Recommendation", highlight: true }, { label: "Modify Coverage" }, { label: "Reject" }],
        waitFor: "Accept Recommendation"
    },
    {
        scene: 6,
        agentInit: "Generating structured Service Agreement...",
        visual: `
            <div class="doc-card">
                <div class="doc-header">
                    <h3>Service Agreement</h3>
                    <p style="text-align:center; color:#6b7280; font-size:12px; margin-top:8px">Draft: Walmart Supercenter (#1234) • Auto-Generated</p>
                </div>
                <div class="doc-section">
                    <h4>Officer Allocation</h4>
                    <ul class="doc-list">
                        <li>Two (2) Mobile Patrol vehicles assigned on a 5-day randomized rotation.</li>
                        <li>One (1) Dedicated Guard stationed during peak operational hours (1600-2200).</li>
                    </ul>
                </div>
                <div class="doc-section" style="display:flex; justify-content:space-between; border-top:1px solid #E2E8F0; padding-top:16px; margin-top:16px">
                    <div>
                        <h4 style="border:none; padding:0; margin-bottom:4px">Monthly Rate</h4>
                        <div style="font-size:22px; font-weight:700; color:#16A34A">$8,450.00</div>
                    </div>
                </div>
            </div>
        `,
        actions: [{ label: "Publish Contract", highlight: true }, { label: "Save as Draft" }, { label: "Share for Approval" }],
        waitFor: "Publish Contract"
    },
    {
        scene: 7,
        agentInit: "Contract successfully published. Generating operational blueprint...<br>• Shift Creation Agent activated.<br>• 2 shifts added to your schedule.",
        visual: `
            <div class="dash-card" style="border-color:#10B981">
                <div class="dash-header">
                    <div class="dash-title">
                        <h3>Live Schedule Reflection</h3>
                        <p>Walmart Supercenter • Operational Live</p>
                    </div>
                    <span class="dash-badge" style="background:#D1FAE5; color:#065F46; border:none"><i class="fa-solid fa-satellite-dish"></i> Live Matrix</span>
                </div>
                <div style="margin-top:14px; text-align:center; color:#64748B; font-size:13px;">
                    Scheduler updated successfully.
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
    userInput.placeholder = "Type a site name...";
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

    const lowerVal = val.toLowerCase();

    // Milwaukee Tool - Scene 0
    if (lowerVal.includes("milwaukee")) {
        step = 0;
        await executeStep(step);
    }
    // Walmart - Scene 2 (Index 3 in array)
    else if (lowerVal.includes("walmart")) {
        step = 3;
        await executeStep(step);
    }
    // Maps - Scene 3 triggers 3.2 (scan animation) (Index 4 maps input -> jumped to index 5 radar screen)
    else if ((lowerVal.startsWith("http") || lowerVal.includes("goo.gl") || lowerVal.includes("maps")) && step === 4) {
        step = 5;
        await executeStep(step);
    }
    else {
        await agentMsg("I couldn't find a direct match. Try typing 'Milwaukee Tool' or 'Walmart'.");
        enableInput();
    }
}

async function agentMsg(text, visualHtml = null) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message agent';
    msgDiv.style.maxWidth = '95%';
    msgDiv.innerHTML = `
        <span class="msg-title">Contract Intelligence</span>
        <div class="msg-typing"><span></span><span></span><span></span></div>
    `;
    history.appendChild(msgDiv);
    history.scrollTop = history.scrollHeight;

    await new Promise(r => setTimeout(r, 1000));

    let content = text;
    if (visualHtml) {
        content += `<div style="margin-top: 14px; margin-bottom: 4px; border-top: 1px solid #E2E8F0; padding-top: 14px;">${visualHtml}</div>`;
    }

    msgDiv.innerHTML = `
        <span class="msg-title">Contract Intelligence</span>
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
        } else if (label.includes('Publish') || label.includes('Yes') || label.includes('Accept') || label.includes('Confirm')) {
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

    // Process the action
    userMsg(action);

    // Some actions natively move to next step in script
    if (script[step].waitFor === action) {
        step++;

        // Custom logic: if action is entering maps link, jump to animation (index 4 is Scene 3.2)
        if (action === "https://goo.gl/maps/walmart123" && step === 3) {
            step = 4;
        }

        await executeStep(step);
    }
}

async function executeStep(index) {
    if (index >= script.length) return;
    const current = script[index];

    await agentMsg(current.agentInit, current.visual);

    if (current.scene === 7) {
        setTimeout(() => {
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
                    <div class="card-time"><span class="card-time-text">10:00a - 6:00p</span></div>
                    <div class="card-badge" style="background:${colorHex}15; color:${colorHex}; font-weight: 600;">${label}</div>
                `;
                const slot = document.createElement('div');
                slot.className = 'card-slot';
                slot.appendChild(newCard);
                return slot;
            };

            const colWed = document.getElementById('calendar-col-3');
            if (colWed) colWed.prepend(createShift('Walmart Patrol', 'R. Evans', 'RE', '#10B981', 'Patrol', '#D1FAE5'));

            const colThu = document.getElementById('calendar-col-4');
            if (colThu) colThu.prepend(createShift('Walmart Shift', 'T. Brooks', 'TB', '#F59E0B', 'Dedicated', '#FEF3C7'));
        }, 1200);
    }

    if (current.autoNext) {
        disableInput();
        setTimeout(async () => {
            step++;
            await executeStep(step);
        }, current.delayNext || 1500);
    } else {
        renderActions(current.actions);
        if (current.scene === 3) {
            enableInput();
            userInput.placeholder = "Paste map link...";
        }
    }
}

function toggleVoiceChat() {
    const modal = document.getElementById('voice-modal');
    const overlay = document.getElementById('overlay');
    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    } else {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
}

window.onload = async () => {
    enableInput();
    await agentMsg("Contract Intelligence Online. Type 'Milwaukee Tool' to view current contracts or 'Walmart' to begin onboarding.");
};
