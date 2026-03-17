// ===== GLOBAL SCHEDULE DATA =====
// Each card: time, shiftTag, title, location, officer, vehicle, status, isOT, isWarm
const globalData = {
    0: [ // SUN
        { time: '9:30a - 10:30a', title: '🚗  Orlando Day Time R...', officer: 'Hazel Grace', vehicle: '34HFG77', status: 'not-started', isWarm: true },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 10:30a', title: '🚗  Orlando Day Time R...', officer: 'Hazel Grace', vehicle: '34HFG77', status: 'completed', isWarm: true },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'not-started', isWarm: false },
    ],
    1: [ // MON
        { time: '9:30a - 10:30a', title: '🚗  Orlando Day Time R...', officer: 'Hazel Grace', vehicle: '34HFG77', status: 'completed', isWarm: true },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
    ],
    2: [ // TUE
        { time: '9:30a - 10:30a', title: '🚗  Orlando Day Time R...', officer: 'Hazel Grace', vehicle: '34HFG77', status: 'completed', isWarm: true },
        { time: '9:30a - 10:30a', title: '🚗  Orlando Day Time R...', officer: 'Hazel Grace', vehicle: '34HFG77', status: 'unassigned', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
    ],
    3: [ // WED (today)
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 10:30a', title: '🚗  Orlando Day Time R...', officer: 'Hazel Grace', vehicle: '34HFG77', status: 'in-progress', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'in-progress', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'not-started', isWarm: false },
    ],
    4: [ // THU
        { time: '9:30a - 10:30a', title: '🚗  Orlando Day Time R...', officer: 'Hazel Grace', vehicle: '34HFG77', status: 'not-started', isWarm: true },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'unassigned', isWarm: false },
        { time: '9:30a - 10:30a', title: '🚗  Orlando Day Time R...', officer: 'Hazel Grace', vehicle: '34HFG77', status: 'not-started', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
    ],
    5: [ // FRI
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'not-started', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
    ],
    6: [ // SAT
        { time: '9:30a - 10:30a', isOT: true, title: '🚗  Orlando Day Time R...', officer: 'Hazel Grace', vehicle: '34HFG77', status: 'not-started', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'unassigned', isWarm: false },
        { time: '9:30a - 10:30a', title: '🚗  Orlando Day Time R...', officer: 'Hazel Grace', vehicle: '34HFG77', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'not-started', isWarm: false },
        { time: '9:30a - 11:30p', shiftTag: 'Shift 1-A', title: 'Zorinski Lake', location: 'Parking Lot', officer: 'Hazel Grace', status: 'completed', isWarm: false },
    ],
};

// Initials helper
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

let currentView = 'week';

// ===== RENDER CALENDAR =====
function renderCalendar() {
    const calendarHeader = document.getElementById('calendar-header');
    const calendarBody = document.getElementById('calendar-body');
    calendarHeader.innerHTML = '';
    calendarBody.innerHTML = '';

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const daysNumbers = [19, 20, 21, 22, 23, 24, 25];

    if (currentView === 'day') {
        calendarHeader.style.gridTemplateColumns = '1fr';
        calendarBody.style.gridTemplateColumns = '1fr';
        calendarBody.style.gridTemplateRows = 'none';

        const cell = document.createElement('div');
        cell.className = 'calendar-header-cell global-header-cell today';
        cell.innerHTML = '<span class="day-name">WED</span><span class="day-number today-circle">22</span>';
        calendarHeader.appendChild(cell);

        const column = document.createElement('div');
        column.className = 'calendar-column today-column';
        column.style.borderRight = 'none';
        const dayCards = globalData[3] || [];

        for (let i = 0; i < Math.max(dayCards.length, 7); i++) {
            const slot = document.createElement('div');
            slot.className = 'card-slot g-slot';
            if (dayCards[i]) {
                slot.appendChild(createGlobalCard(dayCards[i]));
            }
            column.appendChild(slot);
        }
        calendarBody.appendChild(column);

    } else if (currentView === 'week') {
        calendarHeader.style.gridTemplateColumns = 'repeat(7, 1fr)';
        calendarBody.style.gridTemplateColumns = 'repeat(7, 1fr)';
        calendarBody.style.gridTemplateRows = 'none';

        daysOfWeek.forEach((day, index) => {
            const cell = document.createElement('div');
            cell.className = 'calendar-header-cell global-header-cell' + (index === 3 ? ' today' : '');

            const numClass = index === 3 ? 'day-number today-circle' : 'day-number';
            cell.innerHTML = `<span class="day-name">${day}</span><span class="${numClass}">${daysNumbers[index]}</span>`;

            calendarHeader.appendChild(cell);
        });

        const maxCards = Math.max(...Object.values(globalData).map(col => col.length));
        const slotsCount = Math.max(maxCards, 7);

        for (let day = 0; day < 7; day++) {
            const column = document.createElement('div');
            column.className = 'calendar-column' + (day === 3 ? ' today-column' : '');
            const dayCards = globalData[day] || [];

            for (let i = 0; i < slotsCount; i++) {
                const slot = document.createElement('div');
                slot.className = 'card-slot g-slot';
                if (dayCards[i]) {
                    slot.appendChild(createGlobalCard(dayCards[i]));
                }
                column.appendChild(slot);
            }
            calendarBody.appendChild(column);
        }

    } else if (currentView === 'month') {
        calendarHeader.style.gridTemplateColumns = 'repeat(7, 1fr)';
        calendarBody.style.gridTemplateColumns = 'repeat(7, 1fr)';
        calendarBody.style.gridTemplateRows = 'repeat(5, minmax(130px, auto))';

        daysOfWeek.forEach((day) => {
            const cell = document.createElement('div');
            cell.className = 'calendar-header-cell global-header-cell';
            cell.style.justifyContent = 'center';
            cell.innerHTML = `<span class="day-name">${day}</span>`;
            calendarHeader.appendChild(cell);
        });

        let startDate = 5;
        for (let i = 0; i < 35; i++) {
            const cell = document.createElement('div');
            cell.className = 'month-cell';
            cell.style.borderRight = '1px solid var(--color-border-subtle-01)';
            cell.style.borderBottom = '1px solid var(--color-border-subtle-01)';
            cell.style.padding = '8px';
            cell.style.display = 'flex';
            cell.style.flexDirection = 'column';
            cell.style.gap = '4px';

            const dateNum = document.createElement('div');
            const dateVal = (startDate + i) > 31 ? (startDate + i - 31) : (startDate + i);
            dateNum.textContent = dateVal;
            dateNum.style.fontSize = '12px';
            dateNum.style.color = 'var(--color-text-secondary-01)';
            dateNum.style.fontWeight = '500';
            dateNum.style.marginBottom = '2px';

            if (i >= 14 && i < 21) {
                const dayIndex = i - 14;
                if (dayIndex === 3) {
                    dateNum.style.backgroundColor = 'var(--color-brand-main)';
                    dateNum.style.color = 'white';
                    dateNum.style.width = '24px';
                    dateNum.style.height = '24px';
                    dateNum.style.display = 'flex';
                    dateNum.style.alignItems = 'center';
                    dateNum.style.justifyContent = 'center';
                    dateNum.style.borderRadius = '50%';
                }
            }

            cell.appendChild(dateNum);

            if (i >= 14 && i < 21) {
                const dayIndex = i - 14;
                const dayCards = globalData[dayIndex] || [];
                dayCards.forEach(cardData => {
                    const chip = document.createElement('div');
                    chip.style.backgroundColor = cardData.status === 'completed' ? 'var(--color-surface-success-subtle)' : (cardData.status === 'in-progress' ? 'var(--color-brand-subtle)' : 'var(--color-surface-grey-subtle)');
                    chip.style.borderLeft = cardData.isWarm ? '2px solid #F4780B' : '2px solid var(--color-border-brand)';
                    chip.style.padding = '2px 4px';
                    chip.style.fontSize = '9px';
                    chip.style.fontWeight = '500';
                    chip.style.borderRadius = '4px';
                    chip.style.whiteSpace = 'nowrap';
                    chip.style.overflow = 'hidden';
                    chip.style.textOverflow = 'ellipsis';
                    chip.style.cursor = 'pointer';
                    chip.style.color = 'var(--color-text-primary)';
                    chip.textContent = cardData.time.split(' ')[0] + ' ' + cardData.title.substring(0, 10);

                    if (cardData.shiftTag) {
                        chip.textContent = cardData.time.split(' ')[0] + ' ' + cardData.shiftTag;
                    }

                    chip.addEventListener('click', () => {
                        chip.style.transform = 'scale(0.97)';
                        setTimeout(() => { chip.style.transform = ''; }, 150);
                    });
                    cell.appendChild(chip);
                });
            }
            calendarBody.appendChild(cell);
        }
    }
}

function createGlobalCard(data) {
    const card = document.createElement('div');
    card.className = 'g-card' + (data.isWarm ? ' g-card--warm' : '');

    let html = '<div class="g-card-body">';

    // OT badge (if overtime)
    if (data.isOT) {
        html += `<div class="g-card-ot-badge">
      <svg viewBox="0 0 12 12" fill="none"><path d="M6 1L1 11h10L6 1z" fill="#F4780B"/><text x="6" y="9" text-anchor="middle" font-size="6" font-weight="bold" fill="white">!</text></svg>
      <span>OT</span>
    </div>`;
    }

    // Header row — time + shift tag
    html += '<div class="g-card-header">';
    html += `<span class="g-card-time">${data.time}</span>`;
    if (data.shiftTag) {
        html += `<span class="g-card-shift-tag">
      <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1" y="1" width="6" height="6" rx="0.5"/></svg>
      ${data.shiftTag}
    </span>`;
    }
    html += '</div>';

    // Title
    html += `<div class="g-card-title">${data.title}</div>`;

    // Location if present
    if (data.location) {
        html += `<div class="g-card-title">${data.location}</div>`;
    }

    // Details
    html += '<div class="g-card-details">';

    // Officer row
    html += `<div class="g-card-row">
    <div class="g-card-row-avatar g-card-row-avatar--person">
      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:6px;font-weight:500;color:#146DFF;">${getInitials(data.officer)}</div>
    </div>
    <span class="g-card-row-text">${data.officer}</span>
  </div>`;

    // Vehicle row (if present)
    if (data.vehicle) {
        html += `<div class="g-card-row">
      <div class="g-card-row-avatar g-card-row-avatar--vehicle">
        <svg viewBox="0 0 14 14" fill="none" style="width:10px;height:10px;">
          <path d="M2 8h10l-.7-3H2.7L2 8z" fill="#6A6A70"/>
          <circle cx="4" cy="10" r="1.2" fill="#6A6A70"/>
          <circle cx="10" cy="10" r="1.2" fill="#6A6A70"/>
          <path d="M2 8v2.5M12 8v2.5" stroke="#6A6A70" stroke-width="0.8"/>
        </svg>
      </div>
      <span class="g-card-row-text">${data.vehicle}</span>
    </div>`;
    }

    // Unassigned placeholder rows
    if (!data.vehicle && !data.location) {
        html += `<div class="g-card-row">
      <div class="g-card-row-avatar g-card-row-avatar--vehicle">
        <svg viewBox="0 0 14 14" fill="none" style="width:10px;height:10px;"><path d="M7 3v8M3 7h8" stroke="#6A6A70" stroke-width="1.2" stroke-linecap="round"/></svg>
      </div>
      <span class="g-card-row-text" style="color:#CCC;">Unassigned</span>
    </div>`;
    }

    html += '</div>'; // g-card-details
    html += '</div>'; // g-card-body

    // Status dot
    html += `<div class="g-card-status g-card-status--${data.status}"></div>`;

    card.innerHTML = html;

    // Click animation — skip if any animation class is active to avoid transform conflicts
    card.addEventListener('click', () => {
        const animatingClasses = ['flash-red', 'flash-green', 'highlight-pulse', 'highlight-john', 'highlight-pulse-purple', 'new-shift'];
        const isAnimating = animatingClasses.some(cls => card.classList.contains(cls));
        if (isAnimating) return;

        card.style.transform = 'scale(0.97)';
        setTimeout(() => { card.style.transform = ''; }, 150);
    });

    return card;
}

// ===== TAB SWITCHING =====
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.tagName === 'A') return; // skip navigation links
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

// ===== VIEW TOGGLE =====
function initViewToggle() {
    const toggleBtns = document.querySelectorAll('.view-toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            renderCalendar();
        });
    });
}

// ===== DATE RANGE NAVIGATION =====
function initDateRange() {
    const dateRange = document.getElementById('date-range');
    const dateText = document.querySelector('.date-range-text');
    const prevBtn = document.getElementById('date-prev');
    const nextBtn = document.getElementById('date-next');

    let currentDate = new Date(2026, 0, 19);

    if (dateRange) {
        dateRange.style.position = 'relative';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.className = 'date-picker-input';
        dateRange.appendChild(dateInput);

        dateInput.addEventListener('change', (e) => {
            if (e.target.value) {
                const [y, m, d] = e.target.value.split('-');
                currentDate = new Date(y, m - 1, d);
                dateText.textContent = formatDateRange(currentDate);
            }
        });

        if (prevBtn) {
            prevBtn.style.position = 'relative';
            prevBtn.style.zIndex = '2';
        }
        if (nextBtn) {
            nextBtn.style.position = 'relative';
            nextBtn.style.zIndex = '2';
        }
    }

    function formatDateRange(date) {
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 6);
        const startMonth = date.toLocaleString('en-US', { month: 'short' });
        const endMonth = endDate.toLocaleString('en-US', { month: 'short' });
        return `${startMonth} ${date.getDate()} - ${endMonth} ${endDate.getDate()}, ${endDate.getFullYear()}`;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentDate.setDate(currentDate.getDate() - 7);
            dateText.textContent = formatDateRange(currentDate);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentDate.setDate(currentDate.getDate() + 7);
            dateText.textContent = formatDateRange(currentDate);
        });
    }
}

// ===== SIDEBAR TOGGLE =====
function initSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    let collapsed = false;

    toggle.addEventListener('click', () => {
        collapsed = !collapsed;
        if (collapsed) {
            sidebar.style.width = '0';
            sidebar.style.minWidth = '0';
            sidebar.style.padding = '0';
            sidebar.style.overflow = 'hidden';
            toggle.style.right = '-28px';
            toggle.querySelector('svg').style.transform = 'rotate(180deg)';
        } else {
            sidebar.style.width = '';
            sidebar.style.minWidth = '';
            sidebar.style.padding = '';
            sidebar.style.overflow = '';
            toggle.style.right = '';
            toggle.querySelector('svg').style.transform = '';
        }
    });
}

// ===== FILTER DROPDOWN INTERACTIONS =====
function initFilterDropdowns() {
    const dropdowns = document.querySelectorAll('.filter-dropdown');
    const dummyOptions = [
        '<input type="checkbox"> Option 1',
        '<input type="checkbox"> Option 2',
        '<input type="checkbox"> Option 3'
    ];

    dropdowns.forEach(dropdown => {
        const wrapper = document.createElement('div');
        wrapper.className = 'dropdown-wrapper';
        dropdown.parentNode.insertBefore(wrapper, dropdown);
        wrapper.appendChild(dropdown);

        const menu = document.createElement('div');
        menu.className = 'dropdown-menu';
        menu.innerHTML = dummyOptions.map(opt => `<label class="dropdown-item">${opt}</label>`).join('');
        wrapper.appendChild(menu);

        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.dropdown-menu').forEach(m => {
                if (m !== menu) m.classList.remove('show');
            });
            menu.classList.toggle('show');
        });

        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
    });
}

// ===== ISSUE MODAL LOGIC =====
const issueDetails = {
    'contract': {
        title: 'New Contract at Walmart Midtown — Action Needed',
        descHtml: `The new 12-month contract with <strong>Walmart Midtown (#Site 709)</strong> kicks off on <strong>Jan 27</strong>. Based on the agreed terms, you need to place:<ul style="margin-top:4px; padding-left:20px;"><li><strong>2 Patrol officers</strong> (Mon–Sat, 8:00a–4:00p)</li><li><strong>1 Dedicated officer</strong> (Mon–Fri, 6:00a–2:00p)</li><li><strong>1 Dispatch slot</strong> (24/7 on-call rotation)</li></ul>That's <strong>~124 shifts</strong> over the next 12 months. Signal can pre-schedule the entire year in one go, or you can start with the first 30 days.`,
        recTitle: 'Balanced Workforce Distribution',
        recDesc: 'Signal will distribute Walmart Midtown shifts across 14 available officers — no one goes over 40h/week, and all site requirements are matched automatically.',
        recReason: 'This strategy spreads assignments across available officers while ensuring weekly hour limits are respected and coverage remains balanced.',
        recCta: 'View Coverage Plan',
        recCta2: 'Approve Plan',
        recPainPoint: 'You just landed a 12-month contract at Walmart Midtown. 124 new shifts need to be placed starting Jan 27 — without tipping anyone into overtime or leaving other sites shorthanded.',
        recSolution: 'Signal\'s scheduler scans all 47 active officers, filters by site requirements and current weekly hours, then distributes the new Walmart Midtown shifts across 14 eligible officers — no one exceeds their 40h cap.',
        recBetter: 'Zero manual spreadsheet work. No accidental overtime. Every shift is placed by Jan 25 — 2 days before the contract start date — so your client walks in to a fully staffed site on day one.',
        altTitle: 'Prioritize Officers Who Know This Site',
        altDesc: 'Marcus T., Janelle K., Roy M., and Priya S. all have prior experience at Walmart Midtown or similar retail sites. Signal will schedule them first, then fill remaining gaps from the broader pool.',
        altReason: 'Officers familiar with the site can patrol more efficiently and respond faster to incidents.',
        altCta: 'Approve Strategy',
        altPainPoint: 'New sites have a learning curve. Randomly assigning officers who\'ve never worked at Walmart Midtown – East Peachtree Blvd (#Site 709) risks slower incident response and frustrated client contacts on day one.',
        altSolution: 'Cross-references your roster against documented site history. Officers Marcus T., Janelle K., Roy M., and Priya S. — who all have Walmart experience — get first priority. Remaining shifts are filled from the available officer pool.',
        altBetter: 'Experienced officers need zero site orientation time. Marcus T. alone handled 18 shifts at Walmart Peachtree last quarter — your client gets a familiar face and a confident start.'
    },
    'missed': {
        title: 'James Carter Missed His 6:00a Shift — Site Unguarded',
        descHtml: `<strong>James Carter</strong> (Emp #0421) was scheduled for the <strong>6:00a–2:00p</strong> shift at <strong>Riverfront Logistics – Bay 3</strong> but did not clock in. His last GPS ping was 4.2 miles from the site at 5:47a.<br><br>The site has been <strong>unguarded for 28 minutes</strong>. No replacement has been dispatched. 3 incoming deliveries are scheduled between 7:00–9:00a that require officer sign-off.`,
        recTitle: 'Send Donna Mills — She\'s 3 Minutes Away',
        recDesc: 'Donna Mills (#0387) is currently off-duty, 1.2 miles from Riverfront Logistics. She has 32h logged this week and is reachable by phone right now.',
        recReason: 'The system evaluated officer location, availability, and current weekly hours to restore coverage as quickly as possible.',
        recCta: 'Approve Strategy',
        recPainPoint: 'James Carter no-showed at Riverfront Logistics. The site has been unguarded since 6:04a — 3 delivery trucks are arriving in the next 45 minutes that all require security sign-off.',
        recSolution: 'Signal flagged Donna Mills as the closest available officer. She\'s 1.2 miles from Riverfront Logistics, has 32h logged this week (8h under her limit), and has worked this site before.',
        recBetter: 'Donna can be on-site by 6:40a — before the first delivery truck arrives. No overtime triggered, no contractor callout needed, and the client SLA gap is only 36 minutes.',
        altTitle: 'Pull Marcus from the Low-Risk Brookside Post',
        altDesc: 'Marcus Johnson (#0312) is currently posted at Brookside Storage (low-risk, minimal foot traffic) 2.4 miles away. Brookside can safely operate solo for 4h based on current activity.',
        altReason: 'Rebalancing coverage across nearby sites ensures the critical location receives immediate security presence.',
        altCta: 'Approve Strategy',
        altPainPoint: 'Reaching Donna off-duty might not go through immediately. An alternative is to temporarily redeploy an on-duty officer from a lower-risk nearby site — Brookside Storage — rather than waiting for an off-duty response.',
        altSolution: 'Marcus Johnson\'s current post (Brookside Storage) has had zero incidents in the past 90 days and is low-foot-traffic. Signal recommends temporarily reassigning him to Riverfront Logistics for 4 hours until a permanent replacement is found.',
        altBetter: 'Marcus is already on-duty — no overtime, no commute delay. He can reach Riverfront Logistics in ~12 minutes, and Brookside\'s low-risk status means the temporary solo gap is an acceptable trade-off.'
    },
    'open': {
        title: '6 Shifts This Week Have No Officer Assigned',
        descHtml: `<strong>6 upcoming shifts</strong> across <strong>3 sites</strong> have no officer assigned. Left unresolved, these become active coverage gaps the moment each shift starts.<br><br><table style="width:100%; font-size:12px; border-collapse:collapse; margin-top:8px;"><thead><tr style="border-bottom:1px solid #E2E8F0; color:#64748B;"><th style="padding:4px 8px; text-align:left;">Site</th><th style="padding:4px 8px; text-align:left;">Day</th><th style="padding:4px 8px; text-align:left;">Time</th></tr></thead><tbody><tr style="border-bottom:1px solid #F1F5F9;"><td style="padding:4px 8px;">Westpark Plaza</td><td style="padding:4px 8px;">Tue Jan 21</td><td style="padding:4px 8px;">6:00a–2:00p</td></tr><tr style="border-bottom:1px solid #F1F5F9;"><td style="padding:4px 8px;">Westpark Plaza</td><td style="padding:4px 8px;">Wed Jan 22</td><td style="padding:4px 8px;">6:00a–2:00p</td></tr><tr style="border-bottom:1px solid #F1F5F9;"><td style="padding:4px 8px;">Northgate Mall</td><td style="padding:4px 8px;">Tue Jan 21</td><td style="padding:4px 8px;">2:00p–10:00p</td></tr><tr style="border-bottom:1px solid #F1F5F9;"><td style="padding:4px 8px;">Northgate Mall</td><td style="padding:4px 8px;">Thu Jan 23</td><td style="padding:4px 8px;">2:00p–10:00p</td></tr><tr style="border-bottom:1px solid #F1F5F9;"><td style="padding:4px 8px;">Harbor View Apt.</td><td style="padding:4px 8px;">Wed Jan 22</td><td style="padding:4px 8px;">10:00p–6:00a</td></tr><tr><td style="padding:4px 8px;">Harbor View Apt.</td><td style="padding:4px 8px;">Fri Jan 24</td><td style="padding:4px 8px;">10:00p–6:00a</td></tr></tbody></table>`,
        recTitle: 'Auto-Fill All 6 Shifts Now',
        recDesc: 'Signal will assign all 6 shifts across 6 available officers — nobody goes over 40h and each site\'s specific requirements are matched.',
        recReason: 'The system evaluates officer availability, workload, and proximity to assign all shifts efficiently in one pass.',
        recCta: 'Approve Strategy',
        recPainPoint: '6 shifts across Westpark, Northgate, and Harbor View have no officer. Manually calling available staff and checking everyone\'s hours would take a dispatcher 45–60 minutes.',
        recSolution: 'Signal cross-references all 47 roster members against availability, weekly hours, and site requirements, then batch-assigns the 6 shifts in seconds. Proposed: Sandra L. → Westpark (Tue), Roy M. → Westpark (Wed), and 4 others.',
        recBetter: '6 open shifts resolved in under 10 seconds. 0 overtime triggered. All 6 officers are under 38h for the week after the new assignments. Dispatcher is free to handle other issues.',
        altTitle: 'Group by Zone — Fewer Officers, Less Travel',
        altDesc: 'Westpark and Northgate are 0.8 miles apart. Signal assigns 2 officers who already have shifts in that zone, so they cover both sites without extra commuting.',
        altReason: 'Grouping assignments within the same area minimizes travel time and improves patrol efficiency.',
        altCta: 'Approve Strategy',
        altPainPoint: 'Auto-filling 6 shifts across 3 sites might send officers crisscrossing the city. Westpark and Northgate gaps overlap in time and geography — it\'s more efficient to assign zone-aware officers.',
        altSolution: 'Clusters the 4 Westpark/Northgate shifts and assigns them to 2 officers (Kevin L. and Priya S.) who already have nearby shifts that week. Harbor View night shifts are filled from the available overnight pool.',
        altBetter: 'Kevin L. saves 38 minutes of daily driving. Priya S. saves 22 minutes. Both officers stay in a familiar patrol zone all week. Estimated fuel cost saving: ~$28 across the week.'
    },
    'split': {
        title: 'John Doe Needs to Leave by 1:00p — Coverage Gap Until 5:00p',
        descHtml: `<strong>John Doe</strong> (#0289) submitted an early-out request at 11:42a. He needs to leave <strong>Eastside Community Center</strong> by 1:00p due to a family emergency. His shift was scheduled to run until 5:00p.<br><br>That leaves a <strong>4-hour gap</strong> (1:00p–5:00p) with no officer on-site. The client contract specifies <strong>continuous 8:00a–6:00p coverage</strong> on weekdays — this gap would be a contract violation if not resolved before 1:00p.`,
        recTitle: 'Split at 1:00p — Assign Lisa Chen for the Afternoon',
        recDesc: 'Lisa Chen (#0445) is available from 12:30p, has only logged 28h this week, and can take the 1:00p–5:00p segment with 30 minutes to commute.',
        recReason: 'Splitting the shift allows John to leave while ensuring continuous coverage for the client.',
        recCta: 'Approve Strategy',
        recPainPoint: 'John Doe needs to leave at 1:00p. Eastside Community Center\'s contract requires non-stop daytime coverage through 6:00p. Leaving it uncovered — even for 30 minutes — risks a breach notice.',
        recSolution: 'Signal splits John\'s shift at 1:00p, creates a 1:00p–5:00p open slot, and assigns Lisa Chen — who\'s free and 4.1 miles away. She\'s notified immediately and can confirm in the app.',
        recBetter: 'Seamless handoff at 1:00p. Client sees no gap. John handles his emergency. Lisa logs in on the existing shift — no separate override needed. Contract remains compliant.',
        altTitle: 'Replace John Entirely — Full Shift for One Officer',
        altDesc: 'Derek Williams (#0503) can cover the full 8:00a–5:00p shift. He\'d relieve John now, with one officer covering the entire block.',
        altReason: 'A single full-shift replacement eliminates coordination risk and provides continuous coverage without a hand-off.',
        altCta: 'Approve Strategy',
        altPainPoint: 'A two-officer split introduces a hand-off risk. If Lisa is delayed even 15 minutes, there\'s a window of zero coverage. A single full-shift replacement eliminates that coordination risk entirely.',
        altSolution: 'Signal identifies Derek Williams as available for the full remaining shift window. John is released immediately, and Derek takes over through 5:00p — a single, continuous handover.',
        altBetter: 'One officer, zero hand-off risk, continuous coverage. Derek has worked Eastside Community Center 6 times before — the client already knows him by name.'
    },
    'noshow': {
        title: 'No-Show at Walmart Midtown — 0% Coverage Since 6:00p',
        descHtml: `<strong>Carlos Rivera</strong> (#0198) has not clocked in for his <strong>6:00p–2:00a shift</strong> at <strong>Walmart Midtown (Main Entrance)</strong>. Three automated check-in alerts went unanswered. His last known location pinged at home at 5:12p.<br><br>The site has been <strong>unguarded for 52 minutes</strong>. This is a high-footfall retail closing period — Walmart's store manager has already called dispatch asking for an update. SLA breach timer: <strong style="color:#DC2626;">8 minutes remaining</strong>.`,
        recTitle: 'Send Tony Alvarez — He\'s 7 Minutes Out',
        recDesc: 'Tony Alvarez (#0377) just finished his 2:00p–6:00p shift at Eastside Plaza, 1.8 miles from Walmart Midtown. He\'s within weekly hour limits and hasn\'t been notified yet.',
        recReason: 'The system selects the fastest option to restore coverage while respecting workload limits.',
        recCta: 'Approve Strategy',
        recPainPoint: 'Carlos Rivera is a confirmed no-show at Walmart Midtown. The site has been dark since 6:00p during peak store closing hours. The client is already calling dispatch — SLA breach is 8 minutes away.',
        recSolution: 'Tony Alvarez just finished a shift and is only 1.8 miles from Walmart Midtown. He\'s under his weekly hour cap and has active clearance for this site. Signal notifies him via app push immediately.',
        recBetter: 'Tony can be on-site by 6:07p — stopping the SLA breach with 1 minute to spare. He already has his gear and is familiar with the Walmart Midtown layout from prior shifts.',
        altTitle: 'Temporary Patrol Holdover Until Full Replacement Arrives',
        altDesc: 'Officer Sandra Lin is on active patrol 0.9 miles from Walmart Midtown. She can swing by and hold the site for 2 hours while a full-shift replacement is confirmed.',
        altReason: 'Patrol officers already operating nearby can reach the site faster and minimize coverage downtime.',
        altCta: 'Approve Strategy',
        altPainPoint: 'A full 8-hour replacement takes time to line up. Walmart Midtown can\'t stay dark while dispatch finishes calling. A visible patrol presence in the next 5 minutes buys that time.',
        altSolution: 'Sandra Lin diverts from active patrol for a 2-hour temporary hold at Walmart Midtown. In parallel, Signal contacts the next 3 available officers to secure a full-shift replacement before Sandra\'s window ends.',
        altBetter: 'Sandra reaches the site in 4 minutes — 4 minutes before the SLA breach. Her visible presence satisfies the client and deters any opportunistic incidents during the closing rush.'
    },
    'emergency': {
        title: '🔴 Active Fire at Zornski Lake — Security Support Requested',
        descHtml: `<strong>Zornski Lake Park, Campground East Zone</strong> — A brush fire started at approximately <strong>6:34p</strong> near Campsite Block D. Woodlands County Fire is on scene. The Incident Commander has requested private security support for:<ul style="margin-top:4px; padding-left:20px;"><li><strong>Evacuation management</strong> — ~80 campers in 3 blocks need orderly exit via Gate 2</li><li><strong>Perimeter control</strong> — Keep spectators off the North Trail access road</li><li><strong>Crowd safety</strong> — Staging area at the main parking lot requires crowd management</li></ul><strong>ETA for fire containment:</strong> Unknown. <strong>Nearest patrol unit:</strong> 4.1 miles east.`,
        recTitle: 'Dispatch Officer Kevin Tang — 6-Minute ETA',
        recDesc: 'Kevin Tang (#0512) is on active patrol 4.1 miles from Zornski Lake. He has emergency response training, is equipped with crowd management gear, and his shift ends at 10:00p.',
        recReason: 'The system analyzed GPS locations and identified the closest patrol unit capable of reaching the site quickly. This provides the <strong>fastest response time</strong>.',
        recCta: 'Approve Strategy',
        recPainPoint: 'The Zornski Lake fire IC is requesting security support now. ~80 campers need to be evacuated and a perimeter held. Every minute without security personnel increases crowd safety risk.',
        recSolution: 'Signal identified Kevin Tang as the closest on-duty officer with emergency response training (ERC Level 2). He receives an immediate app alert with incident details, IC contact info, and the Gate 2 evacuation route.',
        recBetter: 'Kevin arrives in 6 minutes. He\'s trained, equipped, and briefed before he arrives. Single point of contact for the IC. No overtime — his shift runs until 10:00p.',
        altTitle: 'Send Two Officers — Split Evacuation and Perimeter Duties',
        altDesc: 'Kevin Tang handles evacuation (Gate 2, Campsite Blocks A–C). Officer Diane Park (#0291), 5.8 miles west, handles perimeter on North Trail. Both arrive within 8 minutes of each other.',
        altReason: 'Two officers increases security presence to support emergency services and manage crowds at two separate zones simultaneously.',
        altCta: 'Approve Strategy',
        altPainPoint: 'Sending one officer to manage 80 evacuees, a perimeter, and a crowd staging area simultaneously is an unsafe overload. The IC specifically said they need support at two separate zones.',
        altSolution: 'Kevin Tang takes evacuation duty (closer) and Diane Park takes North Trail perimeter (arrives 7 minutes after Kevin). Signal coordinates their comms on Channel 3 with the Incident Commander.',
        altBetter: 'Two officers = two zones covered simultaneously. Kevin focuses 100% on safe evacuation. Diane holds the perimeter. The IC gets a clean command structure without overloading a single officer.'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('ai-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            const homeView = document.getElementById('ai-home-view');
            const issueView = document.getElementById('ai-issue-view');
            if (homeView && issueView) {
                issueView.style.display = 'none';
                homeView.style.display = 'flex';
            }
        });
    }
});

let currentActiveIssue = null;

window.openIssueModal = function (id) {
    currentActiveIssue = id;
    const data = issueDetails[id];
    if (!data) return;

    // Switch views
    const homeView = document.getElementById('ai-home-view');
    const issueView = document.getElementById('ai-issue-view');
    if (homeView && issueView) {
        homeView.style.display = 'none';
        issueView.style.display = 'flex';
    }

    // Populate Sticky Header
    const topBadge = document.getElementById('ai-issue-top-badge');
    const topTitle = document.getElementById('ai-issue-top-title');
    const topMeta = document.getElementById('ai-issue-top-meta');

    const issueCard = document.getElementById('issue-' + id);
    if (issueCard) {
        const badgeEl = issueCard.querySelector('.ai-alert-badge');
        const metaEl = issueCard.querySelector('.ai-alert-meta');

        if (badgeEl && topBadge) {
            const badgeClasses = Array.from(badgeEl.classList).filter(c => c.startsWith('ai-alert-badge--')).join(' ');
            topBadge.className = 'ai-issue-badge ' + badgeClasses;
            topBadge.innerHTML = badgeEl.innerHTML;
        }
        if (metaEl && topMeta) topMeta.innerHTML = metaEl.innerHTML;
    }
    if (topTitle) topTitle.innerHTML = data.title;

    const chatMsgs = document.getElementById('scc-chat-messages');
    if (!chatMsgs) return;

    // Clear previous chat
    chatMsgs.innerHTML = '';

    let optionsHtml = '';

    // ── Recommended card ──────────────────────────────────────────────
    if (data.recTitle) {
        let recButtonsHtml = '';

        // First CTA (View Coverage Plan OR single approve)
        if (data.recCta) {
            const isViewPlan = data.recCta.toLowerCase().includes('view') ||
                data.recCta.toLowerCase().includes('coverage plan');
            if (isViewPlan) {
                recButtonsHtml += `
                <button class="ai-option-btn ai-option-btn--outline"
                    onclick="window.openCoveragePlanFromChat('${id}', this)">
                    ${data.recCta}
                </button>`;
            } else {
                recButtonsHtml += `
                <button class="ai-option-btn ai-option-btn--primary"
                    onclick="window.resolveWithChoice('${id}', '${(data.recTitle || '').replace(/'/g, "\\'")}', this)">
                    ${data.recCta}
                </button>`;
            }
        }

        // Second CTA (Review Strategy - always add it for Rec)
        recButtonsHtml += `
            <button class="ai-option-btn ai-option-btn--outline"
                onclick="window.openReviewModal('${id}', false)">
                Review
            </button>`;

        optionsHtml += `
        <div class="ai-option-card ai-option--rec">
            <div class="ai-option-badge">⭐ Recommended</div>
            <div class="ai-option-title">${data.recTitle}</div>
            <div class="ai-option-desc">${data.recDesc}</div>
            <div class="ai-option-btns" style="display:flex; gap:8px;">${recButtonsHtml}</div>
        </div>`;
    }

    // ── Alternative card ─────────────────────────────────────────────
    if (data.altTitle) {
        optionsHtml += `
        <div class="ai-option-card ai-option--alt">
            <div class="ai-option-badge ai-option-badge--alt">Alternative</div>
            <div class="ai-option-title">${data.altTitle}</div>
            <div class="ai-option-desc">${data.altDesc}</div>
            <div class="ai-option-btns" style="display:flex; gap:8px;">
                <button class="ai-option-btn ai-option-btn--secondary" style="flex:1;"
                    onclick="window.resolveWithChoice('${id}', '${(data.altTitle || '').replace(/'/g, "\\'")}', this)">
                    ${data.altCta || 'Approve Strategy'}
                </button>
                <button class="ai-option-btn ai-option-btn--outline" style="flex:1;"
                    onclick="window.openReviewModal('${id}', true)">
                    Review
                </button>
            </div>
        </div>`;
    }

    const msg = document.createElement('div');
    msg.className = 'ai-chat-bubble ai-bubble';
    msg.innerHTML = `
        <div class="ai-bubble-avatar">
            <svg viewBox="0 0 24 24" fill="none"><path d="m12 3 2 5 5 1-4 3 1 5-4-2.5L8 17l1-5-4-3 5-1 2-5Z" fill="currentColor"/></svg>
        </div>
        <div class="ai-bubble-body" style="width:100%;">
            <div class="ai-bubble-issue-title">${data.title}</div>
            <div class="ai-bubble-issue-desc">${data.descHtml.replace(/<br>/g, ' ')}</div>
            <div class="ai-options-list">${optionsHtml}</div>
        </div>
    `;

    chatMsgs.appendChild(msg);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
};

// Opens the coverage plan modal from chat without immediately resolving
window.openCoveragePlanFromChat = function (id, btnEl) {
    // Show the coverage plan modal
    const overlay = document.getElementById('coverage-plan-overlay') ||
        document.getElementById('issue-modal-overlay');
    if (overlay) {
        // Try coverage plan modal first
        const cpOverlay = document.getElementById('coverage-plan-overlay');
        if (cpOverlay) {
            cpOverlay.classList.add('show');
        } else {
            // Fallback: open the issue modal in "plan preview" mode
            currentActiveIssue = id;
            overlay.classList.add('show');
        }
    }
    // Also call the existing openCoveragePlanModal if it exists
    if (typeof window.openCoveragePlanModal === 'function') {
        window.openCoveragePlanModal();
    }
};


window.openReviewModal = function (id, isAlternative) {
    const data = issueDetails[id];
    if (!data) return;

    const modal = document.getElementById('strategy-review-modal');
    if (!modal) return;

    const titleEl = document.getElementById('review-modal-title');
    const painPointEl = document.getElementById('review-modal-painpoint');
    const solutionEl = document.getElementById('review-modal-solution');
    const betterEl = document.getElementById('review-modal-better');
    const approveBtn = document.getElementById('review-modal-approve-btn');

    if (isAlternative) {
        titleEl.textContent = 'Review Alternative Strategy';
        painPointEl.textContent = data.altPainPoint;
        solutionEl.textContent = data.altSolution;
        betterEl.textContent = data.altBetter;
        approveBtn.textContent = data.altCta || 'Approve Strategy';
        approveBtn.onclick = () => {
            closeReviewModal();
            // Simulate button click in the chat bubble
            const chatBubbleBtns = document.querySelectorAll('.ai-option--alt .ai-option-btn--secondary');
            if (chatBubbleBtns.length > 0) chatBubbleBtns[chatBubbleBtns.length - 1].click();
        };
    } else {
        titleEl.textContent = 'Review Recommended Strategy';
        painPointEl.textContent = data.recPainPoint;
        solutionEl.textContent = data.recSolution;
        betterEl.textContent = data.recBetter;
        const ctaText = data.recCta2 || data.recCta || 'Approve Strategy';
        approveBtn.textContent = ctaText;
        approveBtn.onclick = () => {
            closeReviewModal();
            // Simulate button click in the chat bubble
            const chatBubbleBtns = document.querySelectorAll('.ai-option--rec .ai-option-btn--primary');
            if (chatBubbleBtns.length > 0) chatBubbleBtns[chatBubbleBtns.length - 1].click();
            else if (ctaText.toLowerCase().includes('view')) window.openCoveragePlanFromChat(id, null);
        };
    }

    modal.classList.add('show');
};

window.closeReviewModal = function () {
    const modal = document.getElementById('strategy-review-modal');
    if (modal) modal.classList.remove('show');
};


window.resolveWithChoice = function (id, choiceName, btnEl) {
    // Disable all option buttons in the bubble so can't double-click
    const bubble = btnEl.closest('.ai-chat-bubble');
    if (bubble) {
        bubble.querySelectorAll('.ai-option-btn').forEach(b => {
            b.disabled = true;
            b.style.opacity = '0.5';
            b.style.cursor = 'default';
        });
        // Highlight chosen card
        const chosenCard = btnEl.closest('.ai-option-card');
        if (chosenCard) {
            chosenCard.classList.add('ai-option-card--chosen');
        }
    }

    const chatMsgs = document.getElementById('scc-chat-messages');

    // Show user confirmation bubble
    const uMsg = document.createElement('div');
    uMsg.className = 'ai-chat-bubble user-bubble';
    uMsg.innerHTML = `<div class="user-bubble-body">✓ Approved: ${choiceName}</div>`;
    chatMsgs.appendChild(uMsg);
    chatMsgs.scrollTop = chatMsgs.scrollHeight;

    // Show AI "applying" response bubble
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'ai-chat-bubble ai-bubble';
        aiMsg.innerHTML = `
            <div class="ai-bubble-avatar">
                <svg viewBox="0 0 24 24" fill="none"><path d="m12 3 2 5 5 1-4 3 1 5-4-2.5L8 17l1-5-4-3 5-1 2-5Z" fill="currentColor"/></svg>
            </div>
            <div class="ai-bubble-body">
                <span class="ai-typing-dots">Applying strategy<span>.</span><span>.</span><span>.</span></span>
            </div>
        `;
        chatMsgs.appendChild(aiMsg);
        chatMsgs.scrollTop = chatMsgs.scrollHeight;

        // Trigger the actual resolution after a short delay
        setTimeout(() => {
            window.resolveIssue(id);
            // Replace typing dots with success message
            const typingSpan = aiMsg.querySelector('.ai-typing-dots');
            if (typingSpan) {
                typingSpan.outerHTML = `<span style="color:#16A34A; font-weight:600;">✓ Done! Issue resolved and schedule updated.</span>`;
            }
            chatMsgs.scrollTop = chatMsgs.scrollHeight;
        }, 1200);
    }, 400);
};

window.resolveIssue = function (id) {
    currentActiveIssue = id;

    if (currentActiveIssue) {
        const card = document.getElementById('issue-' + currentActiveIssue);
        if (card) {
            // Animate scheduler background flash
            const timeline = document.querySelector('.scc-timeline-container');
            if (timeline) {
                timeline.style.transition = 'background-color 0.4s ease';
                timeline.style.backgroundColor = 'var(--color-surface-success-subtle)';

                setTimeout(() => {
                    timeline.style.transition = 'background-color 1.5s ease';
                    timeline.style.backgroundColor = 'var(--color-surface-white)';
                }, 400);
            }

            // Execute specific animation logic based on the issue solved
            const calendarCols = document.querySelectorAll('.calendar-column');
            if (calendarCols && calendarCols.length > 3) {
                const colWed = calendarCols[2]; // Target today or next days based on logic
                const colThu = calendarCols[3];

                if (currentActiveIssue === 'contract') {
                    // Create 12 new shifts
                    const srcCard = document.querySelector('.g-card');
                    if (srcCard && calendarCols.length > 0) {
                        for (let i = 0; i < 12; i++) {
                            setTimeout(() => {
                                const col = calendarCols[i % calendarCols.length];
                                let slot = document.createElement('div');
                                slot.className = 'card-slot g-slot';
                                col.insertBefore(slot, col.children[2] || col.firstChild);

                                const c = srcCard.cloneNode(true);
                                c.classList.remove('g-card--warm');
                                c.style.backgroundColor = '#EFF6FF'; // Contract color
                                c.style.borderLeftColor = '#3B82F6';
                                const title = c.querySelector('.g-card-title');
                                if (title) title.textContent = 'Walmart Midtown';

                                c.style.animation = 'blink-shift 1.2s ease-in-out 2';
                                slot.appendChild(c);
                                setTimeout(() => c.style.animation = 'none', 2400);
                            }, i * 250); // Slower generation stagger
                        }
                    }
                } else if (currentActiveIssue === 'missed' || currentActiveIssue === 'noshow') {
                    // Highlight a shift red, then reassign blue
                    let c;
                    if (currentActiveIssue === 'missed') {
                        c = document.querySelector('.g-card--warm') || document.querySelector('.g-card');
                    } else {
                        // pick a different one for noshow just for visual differentiation
                        const warms = document.querySelectorAll('.g-card--warm');
                        c = warms.length > 1 ? warms[1] : (warms[0] || document.querySelector('.g-card'));
                    }

                    if (c) {
                        c.style.transition = 'all 1.5s ease';

                        // Flash red first
                        c.style.backgroundColor = '#FEF2F2';
                        c.style.borderLeftColor = '#EF4444';

                        setTimeout(() => {
                            c.classList.remove('g-card--warm');
                            c.style.backgroundColor = '#EFF6FF'; // Blue
                            c.style.borderLeftColor = '#3B82F6';
                            const title = c.querySelector('.g-card-title');
                            if (title) {
                                title.style.color = '#1D4ED8';
                                title.textContent = currentActiveIssue === 'missed' ? 'Reassigned - Nearest Officer' : 'Reassigned - Walmart Midtown';
                            }
                        }, 800);

                        c.style.animation = 'blink-shift 1.2s ease-in-out 3';
                        setTimeout(() => c.style.animation = 'none', 3600);
                    }
                } else if (currentActiveIssue === 'open') {
                    // Select 6 shifts and make them blue
                    const cards = Array.from(document.querySelectorAll('.g-card')).slice(2, 8);
                    cards.forEach((c, idx) => {
                        setTimeout(() => {
                            c.style.transition = 'all 1s ease';
                            c.classList.remove('g-card--warm');
                            c.style.backgroundColor = '#EFF6FF'; // Blue
                            c.style.borderLeftColor = '#3B82F6';
                            const off = c.querySelector('.g-card-row-text');
                            if (off && off.textContent === 'Unassigned') off.textContent = 'Auto-Assigned';
                            c.style.animation = 'blink-shift 1s ease-in-out 2';
                            setTimeout(() => c.style.animation = 'none', 2000);
                        }, idx * 350);
                    });
                } else if (currentActiveIssue === 'split') {
                    // Make 2 shifts of it
                    const c = colWed ? colWed.querySelector('.g-card') : document.querySelector('.g-card');
                    if (c && colWed) {
                        c.style.transition = 'all 1.2s ease';
                        c.style.height = '48px';
                        c.style.overflow = 'hidden';
                        const timeSpan = c.querySelector('.g-card-time');
                        if (timeSpan) timeSpan.textContent = '9:00 AM - 1:00 PM';

                        let emptySlot = document.createElement('div');
                        emptySlot.className = 'card-slot g-slot';
                        colWed.insertBefore(emptySlot, c.parentElement.nextSibling);

                        const c2 = c.cloneNode(true);
                        const t2 = c2.querySelector('.g-card-time');
                        if (t2) t2.textContent = '1:00 PM - 5:00 PM';

                        c.style.animation = 'blink-shift 1.5s ease-in-out 2';
                        emptySlot.appendChild(c2);
                        c2.style.animation = 'blink-shift 1.5s ease-in-out 2';

                        setTimeout(() => {
                            c.style.animation = 'none';
                            c2.style.animation = 'none';
                        }, 3000);
                    }
                } else if (currentActiveIssue === 'emergency') {
                    // Add an emergency dispatch card
                    if (colWed) {
                        let emptySlot = colWed.querySelector('.card-slot:empty');
                        if (!emptySlot) {
                            emptySlot = document.createElement('div');
                            emptySlot.className = 'card-slot g-slot';
                            colWed.insertBefore(emptySlot, colWed.children[1] || colWed.firstChild);
                        }
                        emptySlot.innerHTML = `
                            <div class="g-card" style="background:#FEF2F2; border-left:3px solid #EF4444; padding:8px; border-radius:6px; box-shadow:0 2px 4px rgba(0,0,0,0.05); animation:blink-shift 1s ease-in-out 3; transition:transform 0.3s ease;">
                                <div class="g-card-time" style="font-size:11px; color:#B91C1C; font-weight:600;">Immediate Dispatch</div>
                                <div class="g-card-title" style="color:#991B1B; font-weight:600; font-size:12px; margin-top:4px;">Emergency - Zornski Lake</div>
                                <div class="g-card-details" style="margin-top:4px; font-size:11px; color:#7F1D1D;">Unit 4 Responding</div>
                            </div>
                        `;
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }
            }

            // Mark issue card in the side panel as resolved
            card.style.transition = 'all 0.5s ease';
            card.classList.remove('alert-critical', 'alert-warning', 'alert-ai');
            card.classList.add('resolved');
            card.style.borderColor = '#BBF7D0';
            card.style.backgroundColor = '#F0FDF4';
            card.style.boxShadow = 'none';
            card.style.transform = 'none';

            // Change flag to checkmark
            const titleSpan = card.querySelector('.alert-header');
            if (titleSpan) {
                titleSpan.innerHTML = `<span class="alert-icon" style="color:#16A34A; font-size: 14px; margin-top:2px;">✔</span> <span style="color:#16A34A;">RESOLVED</span>`;
            }
            const actionsDiv = card.querySelector('.alert-actions');
            if (actionsDiv) {
                actionsDiv.style.opacity = '0.5';
                actionsDiv.style.pointerEvents = 'none';
            }

            // Remove the click event if we don't want it to re-open (optional)
            card.onclick = null;
            card.style.cursor = 'default';

            // Update KPI number based on the issue solved
            let kpiIdToUpdate = 'kpi-' + currentActiveIssue;
            if (kpiIdToUpdate) {
                const kpiElement = document.getElementById(kpiIdToUpdate);
                if (kpiElement) {
                    let valSpan = kpiElement.querySelector('.ai-kpi-val') || kpiElement.querySelector('.kpi-val');
                    if (valSpan) {
                        let val = parseInt(valSpan.textContent);
                        if (!isNaN(val) && val > 0) {
                            if (currentActiveIssue === 'open') val -= 6;
                            else val -= 1;

                            if (val < 0) val = 0;
                            valSpan.textContent = val;

                            // Micro-interaction for KPI bump
                            kpiElement.style.transform = 'scale(1.1)';
                            kpiElement.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            setTimeout(() => {
                                kpiElement.style.transform = 'scale(1)';
                            }, 200);

                            if (val === 0) {
                                valSpan.classList.remove('kpi-alert', 'kpi-warn', 'kpi-info');
                                valSpan.style.color = '#10B981'; // Green color when empty
                            }
                        }
                    }
                }
            }

            setTimeout(() => {
                // Animate card out
                card.style.opacity = '0';
                card.style.height = '0';
                card.style.padding = '0';
                card.style.margin = '0';
                card.style.border = 'none';
                card.style.overflow = 'hidden';

                setTimeout(() => {
                    card.style.display = 'none';

                    // Update Progress Bar tracking
                    window._resolvedCount = (window._resolvedCount || 0) + 1;
                    const totalIssues = 6; // Updated for 7 specific issues
                    const fill = document.querySelector('.progress-bar-fill');
                    const text = document.querySelector('.progress-text');

                    if (fill && text) {
                        fill.style.transition = 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        let newPercent = 50 + (50 * (window._resolvedCount / totalIssues));
                        if (newPercent > 100) newPercent = 100;
                        fill.style.width = newPercent + '%';
                        text.innerHTML = "<strong>" + Math.round(newPercent) + "%</strong> Complete · Resolve alerts to stabilize today's schedule";

                        if (window._resolvedCount >= totalIssues) {
                            text.innerHTML = '<strong>100%</strong> Complete · Schedule is stable';
                            const alertList = document.querySelector('.ai-alerts-list');
                            if (alertList) {
                                alertList.innerHTML = `
                                    <div class="all-set-msg" style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding: 60px 20px; animation: fadeIn 0.8s ease;">
                                        <div style="width:64px; height:64px; border-radius:50%; background:#F0FDF4; border:3px solid #BBF7D0; color:#16A34A; display:flex; align-items:center; justify-content:center; margin-bottom:16px; box-shadow: 0 4px 12px rgba(22,163,74,0.15);">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:32px; height:32px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <h4 style="font-size:16px; font-weight:700; color:#1E293B; margin:0 0 6px;">All Set!</h4>
                                        <p style="font-size:13px; color:#64748B; line-height:1.5; margin:0;">Scheduler is in sync.<br>Agents are running fine.</p>
                                    </div>
                                `;
                            }
                        }
                    }
                }, 500); // Wait for transition height/opacity
            }, 1200); // Time to read the resolved status
        }
    }
}

window.processChat = function () {
    const chatInput = document.getElementById('scc-chat-input');
    const val = chatInput.value.trim().toLowerCase();
    if (!val) return;

    const msgs = document.getElementById('scc-chat-messages');

    // User bubble
    const uMsg = document.createElement('div');
    uMsg.className = 'ai-chat-bubble user-bubble';
    uMsg.innerHTML = `<div class="user-bubble-body">${chatInput.value}</div>`;
    msgs.appendChild(uMsg);

    chatInput.value = '';
    msgs.scrollTop = msgs.scrollHeight;

    if (val.includes('resolve all') || val.includes('fix all')) {
        setTimeout(() => {
            const aiMsg = document.createElement('div');
            aiMsg.className = 'ai-chat-bubble ai-bubble';
            aiMsg.innerHTML = `
                <div class="ai-bubble-avatar">
                    <svg viewBox="0 0 24 24" fill="none"><path d="m12 3 2 5 5 1-4 3 1 5-4-2.5L8 17l1-5-4-3 5-1 2-5Z" fill="currentColor" /></svg>
                </div>
                <div class="ai-bubble-body">Resolving all open issues automatically...</div>
            `;
            msgs.appendChild(aiMsg);
            msgs.scrollTop = msgs.scrollHeight;

            ['contract', 'missed', 'open', 'split', 'noshow', 'emergency'].forEach((id, i) => {
                const card = document.getElementById('issue-' + id);
                if (card && !card.classList.contains('resolved')) {
                    setTimeout(() => window.resolveIssue(id), i * 1400); // Wait for the animations
                }
            });
        }, 600);
    }
}

function initChatListeners() {
    // Provide chat listener mappings
    const chatInput = document.getElementById('scc-chat-input');
    const chatSend = document.getElementById('scc-chat-send');
    if (chatInput && chatSend) {
        chatSend.addEventListener('click', window.processChat);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') window.processChat();
        });
    }
}

// ===== COVERAGE MODAL LOGIC =====
window.openCoveragePlanModal = function () {
    const coverageModal = document.getElementById('coverage-modal-overlay');
    if (coverageModal) {
        coverageModal.classList.add('show');
        coverageModal.onclick = function (e) {
            if (e.target === coverageModal) {
                window.closeCoverageModal();
            }
        };
    }
}

window.closeCoverageModal = function () {
    const coverageModal = document.getElementById('coverage-modal-overlay');
    if (coverageModal) {
        coverageModal.classList.remove('show');
    }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    initTabs();
    initViewToggle();
    initDateRange();
    initSidebarToggle();
    initFilterDropdowns();
    initChatListeners();

    const configBtn = document.querySelector('.ai-config-btn');
    if (configBtn) {
        configBtn.addEventListener('click', window.openConfigModal);
    }
});

// ─── ALERT CONFIG MODAL ────────────────────────────────────────────────────

const CFG_DEFAULTS = {
    thresholds: {
        contract:  { priority: 'Medium',   value: '≥ 1 new contract' },
        missed:    { priority: 'Critical', value: '≥ 1 missed' },
        open:      { priority: 'High',     value: '> 3 open shifts' },
        split:     { priority: 'Medium',   value: '≥ 2 split shifts' },
        noshow:    { priority: 'Critical', value: '≥ 1 no-show' },
        emergency: { priority: 'Critical', value: 'Always alert' }
    },
    general: {
        overtime: 'Alert at 40 hours',
        sla:      '30 minutes before breach'
    },
    automation: {
        globalWait: '15 minutes',
        badges: {
            contract:  { enabled: false, action: 'Flag for review' },
            missed:    { enabled: true,  action: 'Notify supervisor' },
            open:      { enabled: true,  action: 'Auto-reassign officer' },
            split:     { enabled: false, action: 'Flag for review' },
            noshow:    { enabled: true,  action: 'Notify supervisor' },
            emergency: { enabled: true,  action: 'Escalate to manager' }
        },
        rules: {
            lateArrivals:     true,
            dedicatedPriority: true,
            autoResolveLow:   false
        }
    },
    email: {
        recipient:      '',
        trigger:        'Any unresolved alert (High or above)',
        delay:          '30 minutes',
        includeSummary: true,
        ccManager:      false
    }
};

function cfgGetConfig() {
    try {
        const stored = localStorage.getItem('alertConfig');
        return stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(CFG_DEFAULTS));
    } catch (e) {
        return JSON.parse(JSON.stringify(CFG_DEFAULTS));
    }
}

function cfgReadForm() {
    const badges = ['contract','missed','open','split','noshow','emergency'];
    const cfg = {
        thresholds: { ...badges.reduce((acc, b) => {
            acc[b] = {
                priority: (document.getElementById('thresh-priority-' + b) || {}).value || '',
                value:    (document.getElementById('thresh-val-' + b) || {}).value || ''
            };
            return acc;
        }, {}) },
        general: {
            overtime: (document.getElementById('thresh-overtime') || {}).value || '',
            sla:      (document.getElementById('thresh-sla') || {}).value || ''
        },
        automation: {
            globalWait: (document.getElementById('auto-global-wait') || {}).value || '',
            badges: badges.reduce((acc, b) => {
                acc[b] = {
                    enabled: !!(document.getElementById('auto-en-' + b) || {}).checked,
                    action:  (document.getElementById('auto-action-' + b) || {}).value || ''
                };
                return acc;
            }, {}),
            rules: {
                lateArrivals:      !!(document.getElementById('auto-late-arrivals') || {}).checked,
                dedicatedPriority: !!(document.getElementById('auto-dedicated-priority') || {}).checked,
                autoResolveLow:    !!(document.getElementById('auto-resolve-low') || {}).checked
            }
        },
        email: {
            recipient:      (document.getElementById('email-recipient') || {}).value || '',
            trigger:        (document.getElementById('email-trigger') || {}).value || '',
            delay:          (document.getElementById('email-delay') || {}).value || '',
            includeSummary: !!(document.getElementById('email-include-summary') || {}).checked,
            ccManager:      !!(document.getElementById('email-cc-manager') || {}).checked
        }
    };
    return cfg;
}

function cfgPopulateForm(cfg) {
    const badges = ['contract','missed','open','split','noshow','emergency'];
    badges.forEach(b => {
        const pEl = document.getElementById('thresh-priority-' + b);
        const vEl = document.getElementById('thresh-val-' + b);
        if (pEl && cfg.thresholds[b]) pEl.value = cfg.thresholds[b].priority;
        if (vEl && cfg.thresholds[b] && b !== 'emergency') vEl.value = cfg.thresholds[b].value;
        const enEl = document.getElementById('auto-en-' + b);
        const actEl = document.getElementById('auto-action-' + b);
        if (enEl && cfg.automation.badges[b]) enEl.checked = cfg.automation.badges[b].enabled;
        if (actEl && cfg.automation.badges[b]) actEl.value = cfg.automation.badges[b].action;
    });
    const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
    const setChk = (id, v) => { const el = document.getElementById(id); if (el) el.checked = v; };
    setVal('thresh-overtime', cfg.general.overtime);
    setVal('thresh-sla',      cfg.general.sla);
    setVal('auto-global-wait', cfg.automation.globalWait);
    setChk('auto-late-arrivals',      cfg.automation.rules.lateArrivals);
    setChk('auto-dedicated-priority', cfg.automation.rules.dedicatedPriority);
    setChk('auto-resolve-low',        cfg.automation.rules.autoResolveLow);
    setVal('email-recipient', cfg.email.recipient);
    setVal('email-trigger',   cfg.email.trigger);
    setVal('email-delay',     cfg.email.delay);
    setChk('email-include-summary', cfg.email.includeSummary);
    setChk('email-cc-manager',      cfg.email.ccManager);
}

function cfgShowToast(msg) {
    const t = document.getElementById('cfg-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
}

window.openConfigModal = function () {
    const modal = document.getElementById('config-modal-overlay');
    if (!modal) return;
    // Populate form from saved config
    cfgPopulateForm(cfgGetConfig());
    // Switch to first tab
    cfgSwitchTab('thresholds', modal.querySelector('.cfg-tab'));
    // Show modal using .show class (matches general.css transition)
    modal.classList.add('show');
    // Close on backdrop click
    modal.onclick = function (e) {
        if (e.target === modal) window.closeConfigModal();
    };
};

window.closeConfigModal = function () {
    const modal = document.getElementById('config-modal-overlay');
    if (!modal) return;
    modal.classList.remove('show');
};

window.cfgSwitchTab = function (tabId, clickedBtn) {
    // Update tab buttons
    document.querySelectorAll('.cfg-tab').forEach(t => t.classList.remove('active'));
    if (clickedBtn) clickedBtn.classList.add('active');
    // Update panels
    document.querySelectorAll('.cfg-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('cfg-panel-' + tabId);
    if (panel) {
        panel.classList.add('active');
        // If share tab, refresh JSON preview
        if (tabId === 'share') cfgRefreshJsonPreview();
    }
};

function cfgRefreshJsonPreview() {
    const el = document.getElementById('cfg-json-preview');
    if (!el) return;
    const cfg = cfgGetConfig();
    el.value = JSON.stringify(cfg, null, 2);
}

window.cfgSaveAndClose = function () {
    const cfg = cfgReadForm();
    localStorage.setItem('alertConfig', JSON.stringify(cfg));
    cfgShowToast('✓ Settings saved successfully');
    window.closeConfigModal();
};

window.cfgSendTestEmail = function () {
    const recipient = (document.getElementById('email-recipient') || {}).value || '';
    if (!recipient) {
        cfgShowToast('⚠ Please enter a recipient email address first');
        return;
    }
    cfgShowToast('✉ Test email sent to ' + recipient);
};

window.cfgCopyConfig = function () {
    const el = document.getElementById('cfg-json-preview');
    if (!el) return;
    cfgRefreshJsonPreview();
    navigator.clipboard.writeText(el.value).then(() => {
        cfgShowToast('✓ Config copied to clipboard');
    }).catch(() => {
        el.select();
        document.execCommand('copy');
        cfgShowToast('✓ Config copied to clipboard');
    });
};

window.cfgExportConfig = function () {
    const cfg = cfgGetConfig();
    const blob = new Blob([JSON.stringify(cfg, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'alert-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    cfgShowToast('✓ Config exported as alert-config.json');
};

window.cfgResetDefaults = function () {
    if (!confirm('Reset all alert configuration to defaults? This cannot be undone.')) return;
    localStorage.removeItem('alertConfig');
    cfgPopulateForm(JSON.parse(JSON.stringify(CFG_DEFAULTS)));
    cfgRefreshJsonPreview();
    cfgShowToast('✓ Configuration reset to defaults');
};

// Load saved config on page load
document.addEventListener('DOMContentLoaded', function () {
    // Nothing to do at load; form is populated when modal opens
});
