// ===== AUTO ASSIGN ENGINE =====
// Manages the full auto-assign flow: scan → modal → assign

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const AVAILABLE_OFFICERS = [
    'James Wilson', 'Sarah Connor', 'David Park', 'Maria Santos',
    'Alex Thompson', 'Rachel Kim', 'Chris Evans', 'Nina Patel',
    'Jake Morrison', 'Lisa Blackwell', 'Omar Hassan', 'Emily Chen'
];

const VEHICLES = ['47KPR92', '28MNL55', '61WQZ33', '85TYR19', '39BHK71', '52FGJ48'];

function getRandomOfficer() {
    return AVAILABLE_OFFICERS[Math.floor(Math.random() * AVAILABLE_OFFICERS.length)];
}

function getRandomVehicle() {
    return VEHICLES[Math.floor(Math.random() * VEHICLES.length)];
}

function getInitialsAA(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// ===== PHASE 1: SCANNING =====
function startAutoAssign() {
    const autoBtn = document.getElementById('auto-assign-btn');
    autoBtn.classList.add('active');

    // Add progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scan-progress';
    progressBar.id = 'scan-progress';
    document.body.appendChild(progressBar);

    // Add scan beam overlay
    const overlay = document.createElement('div');
    overlay.className = 'scan-overlay';
    overlay.id = 'scan-overlay';
    overlay.innerHTML = '<div class="scan-beam"></div>';
    document.body.appendChild(overlay);

    // Scan cards column by column with stagger
    const allCards = document.querySelectorAll('.g-card');
    const columns = document.querySelectorAll('.calendar-column');
    const unassignedCards = [];
    let scanDelay = 200;

    columns.forEach((col, colIdx) => {
        const cards = col.querySelectorAll('.g-card');
        cards.forEach((card, cardIdx) => {
            const delay = (colIdx * 300) + (cardIdx * 80);
            setTimeout(() => {
                card.classList.add('scanning');
                setTimeout(() => card.classList.remove('scanning'), 400);

                // Check if unassigned
                const statusDot = card.querySelector('.g-card-status--unassigned');
                if (statusDot) {
                    unassignedCards.push({ card, colIdx, cardIdx });
                }
            }, delay);
        });
    });

    // After scan completes, highlight unassigned & show counter
    const totalScanTime = (columns.length * 300) + 400;

    setTimeout(() => {
        // Remove scan visuals
        progressBar.remove();
        overlay.remove();

        // Highlight unassigned cards
        unassignedCards.forEach((item, idx) => {
            setTimeout(() => {
                item.card.classList.add('unassigned-highlight');
            }, idx * 100);
        });

        // Show counter splash
        if (unassignedCards.length > 0) {
            showScanCounter(unassignedCards.length, () => {
                showUnassignedModal(unassignedCards);
            });
        } else {
            autoBtn.classList.remove('active');
            showToast('All shifts are already assigned!', 0);
        }
    }, totalScanTime);
}

function showScanCounter(count, onComplete) {
    const counter = document.createElement('div');
    counter.className = 'scan-counter';
    counter.id = 'scan-counter';
    counter.innerHTML = `
    <div class="scan-counter-number">${count}</div>
    <div class="scan-counter-label">Unassigned Shifts Found</div>
  `;
    document.body.appendChild(counter);

    requestAnimationFrame(() => {
        counter.classList.add('visible');
    });

    setTimeout(() => {
        counter.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        counter.style.opacity = '0';
        counter.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => {
            counter.remove();
            onComplete();
        }, 300);
    }, 1200);
}

// ===== PHASE 2: MODAL =====
function showUnassignedModal(unassignedCards) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.id = 'auto-assign-backdrop';

    const shiftListItems = unassignedCards.map((item, idx) => {
        const titleEl = item.card.querySelector('.g-card-title');
        const timeEl = item.card.querySelector('.g-card-time');
        const title = titleEl ? titleEl.textContent.trim() : 'Unknown Shift';
        const time = timeEl ? timeEl.textContent.trim() : '';
        const dayLabel = DAYS[item.colIdx] || '';

        return `
      <div class="shift-list-item" data-idx="${idx}" style="animation-delay: ${idx * 0.06}s;">
        <div class="shift-item-status"></div>
        <div class="shift-item-info">
          <div class="shift-item-title">${title}</div>
          <div class="shift-item-detail">${time} · No officer assigned</div>
        </div>
        <div class="shift-item-day">${dayLabel}</div>
      </div>
    `;
    }).join('');

    backdrop.innerHTML = `
    <div class="modal" id="auto-assign-modal">
      <div class="modal-header">
        <div class="modal-header-left">
          <div class="modal-header-icon">
            <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M11 2a1 1 0 011 1v3a1 1 0 01-2 0V3a1 1 0 011-1z"/>
              <path d="M11 16a1 1 0 011 1v2a1 1 0 01-2 0v-2a1 1 0 011-1z"/>
              <path d="M4.22 4.22a1 1 0 011.42 0l1.41 1.42a1 1 0 01-1.42 1.41L4.22 5.64a1 1 0 010-1.42z"/>
              <circle cx="11" cy="11" r="4"/>
            </svg>
          </div>
          <div>
            <div class="modal-title">Unassigned Shifts Detected</div>
            <div class="modal-subtitle">AI will find the best-fit officers for each shift</div>
          </div>
        </div>
        <button class="modal-close" id="modal-close-btn">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 4l8 8M12 4l-8 8"/>
          </svg>
        </button>
      </div>
      <div class="modal-body" id="modal-body">
        ${shiftListItems}
      </div>
      <div class="modal-footer">
        <div class="modal-footer-info"><strong>${unassignedCards.length}</strong> shifts need assignment</div>
        <button class="btn-assign" id="btn-assign-shifts">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M8 1l1.5 3.5L13 6l-3.5 1.5L8 11l-1.5-3.5L3 6l3.5-1.5L8 1z" fill="white"/>
            <path d="M14 11l.6 1.4L16 13l-1.4.6L14 15l-.6-1.4L12 13l1.4-.6L14 11z" fill="white" opacity="0.7"/>
          </svg>
          <span>Auto Assign Shifts</span>
        </button>
      </div>
    </div>
  `;

    document.body.appendChild(backdrop);

    // Trigger visibility
    requestAnimationFrame(() => {
        backdrop.classList.add('visible');

        // Stagger reveal list items
        const items = backdrop.querySelectorAll('.shift-list-item');
        items.forEach((item, idx) => {
            setTimeout(() => item.classList.add('visible'), idx * 60);
        });
    });

    // Close button
    document.getElementById('modal-close-btn').addEventListener('click', () => {
        closeModal(unassignedCards);
    });

    // Backdrop click to close
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal(unassignedCards);
    });

    // Assign button
    document.getElementById('btn-assign-shifts').addEventListener('click', () => {
        startAssignment(unassignedCards);
    });
}

function closeModal(unassignedCards) {
    const backdrop = document.getElementById('auto-assign-backdrop');
    const modal = document.getElementById('auto-assign-modal');
    const autoBtn = document.getElementById('auto-assign-btn');

    modal.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    modal.style.transform = 'translateY(20px) scale(0.97)';
    modal.style.opacity = '0';

    backdrop.style.transition = 'opacity 0.3s ease';
    backdrop.style.opacity = '0';

    // Remove highlights
    unassignedCards.forEach(item => {
        item.card.classList.remove('unassigned-highlight');
    });
    autoBtn.classList.remove('active');

    setTimeout(() => backdrop.remove(), 300);
}

// ===== PHASE 3: ASSIGNMENT =====
function startAssignment(unassignedCards) {
    const assignBtn = document.getElementById('btn-assign-shifts');
    const btnText = assignBtn.querySelector('span');
    const btnSvg = assignBtn.querySelector('svg');

    // Update button to loading state
    assignBtn.classList.add('assigning');
    btnSvg.outerHTML = `<div class="assign-progress"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" stroke-width="2"/><path d="M14 8a6 6 0 00-6-6" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>`;
    btnText.textContent = 'Assigning...';

    // Update modal list items one by one
    const listItems = document.querySelectorAll('.shift-list-item');

    unassignedCards.forEach((item, idx) => {
        setTimeout(() => {
            // Update list item in modal
            if (listItems[idx]) {
                const officer = getRandomOfficer();
                const statusDot = listItems[idx].querySelector('.shift-item-status');
                const detail = listItems[idx].querySelector('.shift-item-detail');

                // Pulse the item
                listItems[idx].style.background = 'rgba(20, 109, 255, 0.04)';
                statusDot.style.transition = 'background 0.3s ease, transform 0.3s ease';
                statusDot.style.background = '#146DFF';
                statusDot.style.transform = 'scale(1.5)';

                setTimeout(() => {
                    statusDot.style.background = '#4CAF50';
                    statusDot.style.transform = 'scale(1)';
                    detail.textContent = `Assigned to ${officer}`;
                    detail.style.color = '#4CAF50';
                    listItems[idx].style.background = 'rgba(76, 175, 80, 0.04)';
                }, 300);
            }
        }, idx * 500);
    });

    // After all assignments, close modal and animate cards
    const totalAssignTime = unassignedCards.length * 500 + 600;

    setTimeout(() => {
        // Close modal
        const backdrop = document.getElementById('auto-assign-backdrop');
        const modal = document.getElementById('auto-assign-modal');

        modal.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        modal.style.transform = 'translateY(20px) scale(0.97)';
        modal.style.opacity = '0';

        backdrop.style.transition = 'opacity 0.4s ease';
        backdrop.style.opacity = '0';

        setTimeout(() => {
            backdrop.remove();

            // Now animate the actual cards
            animateCardAssignments(unassignedCards);
        }, 400);
    }, totalAssignTime);
}

function animateCardAssignments(unassignedCards) {
    unassignedCards.forEach((item, idx) => {
        setTimeout(() => {
            const card = item.card;

            // Remove unassigned highlight
            card.classList.remove('unassigned-highlight');

            // Add AI processing effect
            card.classList.add('ai-processing');

            // Add sparkles
            addSparkles(card);

            // After processing, update the card content
            setTimeout(() => {
                card.classList.remove('ai-processing');
                card.classList.add('assigned-success');

                // Update the status dot
                const statusDot = card.querySelector('.g-card-status');
                if (statusDot) {
                    statusDot.classList.remove('g-card-status--unassigned');
                    statusDot.classList.add('g-card-status--completed', 'morphing');
                }

                // Update border color to blue
                card.style.borderLeftColor = '#0058FF';

                // Replace "Unassigned" text with assigned officer
                const officer = getRandomOfficer();
                const officerRow = card.querySelector('.g-card-row');
                if (officerRow) {
                    const avatar = officerRow.querySelector('.g-card-row-avatar');
                    const text = officerRow.querySelector('.g-card-row-text');
                    if (avatar) {
                        avatar.classList.remove('g-card-row-avatar--vehicle');
                        avatar.classList.add('g-card-row-avatar--person');
                        avatar.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:6px;font-weight:500;color:#146DFF;">${getInitialsAA(officer)}</div>`;
                    }
                    if (text) {
                        text.style.color = '';
                        text.textContent = officer;
                        text.classList.add('officer-typing');
                        setTimeout(() => text.classList.remove('officer-typing'), 500);
                    }
                }

                // Update vehicle if applicable
                const rows = card.querySelectorAll('.g-card-row');
                if (rows.length > 1) {
                    const vehicleRow = rows[1];
                    const vehicleText = vehicleRow.querySelector('.g-card-row-text');
                    if (vehicleText && vehicleText.textContent.includes('Unassigned')) {
                        vehicleText.style.color = '';
                        vehicleText.textContent = getRandomVehicle();
                    }
                }

                // Remove warm background if it had it
                card.classList.remove('g-card--warm');

                setTimeout(() => {
                    card.classList.remove('assigned-success');
                }, 600);
            }, 600);
        }, idx * 700);
    });

    // Show success toast after all done
    const totalTime = unassignedCards.length * 700 + 1200;
    setTimeout(() => {
        const autoBtn = document.getElementById('auto-assign-btn');
        autoBtn.classList.remove('active');

        showToast(`Successfully assigned ${unassignedCards.length} shifts`, unassignedCards.length);

        // Update legend count
        updateLegendCounts(unassignedCards.length);
    }, totalTime);
}

function addSparkles(card) {
    const container = document.createElement('div');
    container.className = 'sparkle-container';

    for (let i = 1; i <= 3; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = `sparkle s${i}`;
        sparkle.style.top = `${Math.random() * 60 + 20}%`;
        sparkle.style.left = `${Math.random() * 60 + 20}%`;
        container.appendChild(sparkle);
    }

    card.style.position = 'relative';
    card.appendChild(container);

    setTimeout(() => container.remove(), 800);
}

function showToast(message, count) {
    const toast = document.createElement('div');
    toast.className = 'assign-toast';
    toast.id = 'assign-toast';
    toast.innerHTML = `
    <div class="assign-toast-icon">
      <svg viewBox="0 0 14 14" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 7l3 3 5-5"/>
      </svg>
    </div>
    <div class="assign-toast-text">${message.replace(/(\d+)/, '<span>$1</span>')}</div>
  `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.add('visible');
        });
    });

    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

function updateLegendCounts(assignedCount) {
    // Update unassigned count in legend
    const legendItems = document.querySelectorAll('.legend-item');
    legendItems.forEach(item => {
        const label = item.querySelector('.legend-label');
        const count = item.querySelector('.legend-count');
        if (label && label.textContent.includes('Unassigned') && count) {
            const currentCount = parseInt(count.textContent) || 0;
            const newCount = Math.max(0, currentCount - assignedCount);
            count.textContent = newCount;
            count.style.transition = 'color 0.3s';
            count.style.color = '#4CAF50';
            setTimeout(() => { count.style.color = ''; }, 1500);
        }
        if (label && label.textContent.includes('Completed') && count) {
            const currentCount = parseInt(count.textContent) || 0;
            count.textContent = currentCount + assignedCount;
            count.style.transition = 'color 0.3s';
            count.style.color = '#4CAF50';
            setTimeout(() => { count.style.color = ''; }, 1500);
        }
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    const autoBtn = document.getElementById('auto-assign-btn');
    if (autoBtn) {
        autoBtn.addEventListener('click', () => {
            // Prevent double-clicks
            if (autoBtn.classList.contains('active')) return;
            startAutoAssign();
        });
    }
});
