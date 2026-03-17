// ===== SCHEDULE DATA =====
const scheduleData = {
  // Sunday
  0: [
    { title: '🚗 Orlando Day Time Runsheet', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Zorinski Lake Itinerary', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Daytime Schedule', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Daytime Runsheet 2023', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
  ],
  // Monday
  1: [
    { title: '🚗 Orlando Day Time Runsheet', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Daily Rundown', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Daytime Overview', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Day Time Runsheet', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Daytime Operations', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Day Time Runsheet', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Day Time Runsheet', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
  ],
  // Tuesday
  2: [
    { title: '🚗 Orlando Afternoon Itinerary', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Daytime Plan', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Day Plan', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Day Trip Outline', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
  ],
  // Wednesday (today)
  3: [
    { title: '🚗 Orlando Daylight Agenda', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Day Schedule', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Day Time Runsheet', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
  ],
  // Thursday
  4: [
    { title: '🚗 Orlando Day Time Runsheet', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Day Time Runsheet', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Morning Schedule', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
  ],
  // Friday
  5: [
    { title: '🚗 Orlando Daytime Roadmap', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Day Time Runsheet', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
  ],
  // Saturday
  6: [
    { title: '🚗 Orlando Day Time Runsheet', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
    { title: '🚗 Orlando Day Time Runsheet', officer: 'Hazel Grace', time: '9:30a - 10:30a', hits: 8 },
  ],
};

// Avatar color generator based on initials
function getAvatarColor(name) {
  const colors = ['#E3F2FD', '#FCE4EC', '#E8F5E9', '#FFF3E0', '#F3E5F5', '#E0F7FA'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

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

  if (currentView === 'day') {
    calendarHeader.style.gridTemplateColumns = '1fr';
    calendarBody.style.gridTemplateColumns = '1fr';
    calendarBody.style.gridTemplateRows = 'none';

    const cell = document.createElement('div');
    cell.className = 'calendar-header-cell today';
    cell.textContent = 'WED';
    calendarHeader.appendChild(cell);

    const column = document.createElement('div');
    column.className = 'calendar-column today-column';
    column.style.borderRight = 'none';
    const dayCards = scheduleData[3] || [];

    for (let i = 0; i < Math.max(dayCards.length, 7); i++) {
      const slot = document.createElement('div');
      slot.className = 'card-slot';
      if (dayCards[i]) {
        slot.appendChild(createScheduleCard(dayCards[i]));
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
      cell.className = 'calendar-header-cell' + (index === 3 ? ' today' : '');
      cell.textContent = day;
      calendarHeader.appendChild(cell);
    });

    const maxCards = Math.max(...Object.values(scheduleData).map(col => col.length));
    const slotsCount = Math.max(maxCards, 7);

    for (let day = 0; day < 7; day++) {
      const column = document.createElement('div');
      column.className = 'calendar-column' + (day === 3 ? ' today-column' : '');
      const dayCards = scheduleData[day] || [];

      for (let i = 0; i < slotsCount; i++) {
        const slot = document.createElement('div');
        slot.className = 'card-slot';
        if (dayCards[i]) {
          slot.appendChild(createScheduleCard(dayCards[i]));
        }
        column.appendChild(slot);
      }
      calendarBody.appendChild(column);
    }

  } else if (currentView === 'month') {
    calendarHeader.style.gridTemplateColumns = 'repeat(7, 1fr)';
    calendarBody.style.gridTemplateColumns = 'repeat(7, 1fr)';
    calendarBody.style.gridTemplateRows = 'repeat(5, minmax(120px, auto))';

    daysOfWeek.forEach((day) => {
      const cell = document.createElement('div');
      cell.className = 'calendar-header-cell';
      cell.style.textAlign = 'center';
      cell.textContent = day;
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
      dateNum.style.marginBottom = '4px';

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
        const dayCards = scheduleData[dayIndex] || [];
        dayCards.forEach(cardData => {
          const chip = document.createElement('div');
          chip.style.backgroundColor = 'var(--color-surface-grey-subtle)';
          chip.style.borderLeft = '2px solid var(--color-border-brand)';
          chip.style.padding = '4px 6px';
          chip.style.fontSize = '10px';
          chip.style.fontWeight = '500';
          chip.style.borderRadius = '4px';
          chip.style.whiteSpace = 'nowrap';
          chip.style.overflow = 'hidden';
          chip.style.textOverflow = 'ellipsis';
          chip.style.cursor = 'pointer';
          chip.textContent = cardData.title;
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

function createScheduleCard(data) {
  const card = document.createElement('div');
  card.className = 'schedule-card';

  card.innerHTML = `
    <div class="card-title">${data.title}</div>
    <div class="card-officer">
      <div class="card-officer-avatar" style="background: ${getAvatarColor(data.officer)}">
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:500;color:#444;">${getInitials(data.officer)}</div>
      </div>
      <span class="card-officer-name">${data.officer}</span>
    </div>
    <div class="card-time">
      <span class="card-time-text">${data.time}</span>
    </div>
    ${data.hits ? `<div class="card-badge">${data.hits} Hits</div>` : ''}
  `;

  card.addEventListener('click', () => {
    // Skip the click scale if an animation class is currently active on the card
    const animatingClasses = ['flash-red', 'flash-green', 'highlight-pulse', 'highlight-john', 'highlight-pulse-purple', 'new-shift'];
    const isAnimating = animatingClasses.some(cls => card.classList.contains(cls));
    if (isAnimating) return;

    card.style.transform = 'scale(0.97)';
    setTimeout(() => {
      card.style.transform = '';
    }, 150);
  });

  return card;
}

// ===== TAB SWITCHING =====
function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
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

  let currentDate = new Date(2026, 0, 19); // Jan 19, 2026

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

    if (startMonth === endMonth) {
      return `${startMonth} ${date.getDate()} - ${endMonth} ${endDate.getDate()}, ${endDate.getFullYear()}`;
    }
    return `${startMonth} ${date.getDate()} - ${endMonth} ${endDate.getDate()}, ${endDate.getFullYear()}`;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentDate.setDate(currentDate.getDate() - 7);
      dateText.textContent = formatDateRange(currentDate);
      addClickFeedback(prevBtn);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentDate.setDate(currentDate.getDate() + 7);
      dateText.textContent = formatDateRange(currentDate);
      addClickFeedback(nextBtn);
    });
  }
}

// ===== CLICK FEEDBACK =====
function addClickFeedback(element) {
  element.style.opacity = '0.5';
  setTimeout(() => {
    element.style.opacity = '';
  }, 150);
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
      addClickFeedback(dropdown);
    });

    menu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
  initTabs();
  initViewToggle();
  initDateRange();
  initSidebarToggle();
  initFilterDropdowns();
});
