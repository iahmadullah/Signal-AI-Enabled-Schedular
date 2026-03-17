document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const quickActions = document.getElementById('quick-actions');
    const modal = document.getElementById('ai-working-modal');
    const modalTitle = document.getElementById('ai-working-title');
    const modalDesc = document.getElementById('ai-working-desc');

    // Grid Elements
    const cardJohn = document.getElementById('card-john');
    const cardCarlos = document.getElementById('card-carlos');
    const cardSophia = document.getElementById('card-sophia');

    const johnHits = document.getElementById('john-hits');
    const carlosHits = document.getElementById('carlos-hits');
    const sophiaHits = document.getElementById('sophia-hits');

    const carAlert = document.getElementById('car-alert');

    // Helper: Add message to chat
    function addMessage(text, sender = 'agent', dataHTML = '') {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg msg-${sender}`;

        const avatar = document.createElement('div');
        avatar.className = 'msg-avatar';
        avatar.innerHTML = sender === 'agent' ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path></svg>` : 'U';

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';
        bubble.innerHTML = text + dataHTML;

        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
        chatMessages.appendChild(msgDiv);

        // trigger animation
        setTimeout(() => msgDiv.classList.add('visible'), 50);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Helper: Show Typing Indicator
    function showTyping() {
        return new Promise(resolve => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `chat-msg msg-agent temp-typing`;
            msgDiv.innerHTML = `
                <div class="msg-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path></svg></div>
                <div class="msg-bubble"><div class="typing"><span></span><span></span><span></span></div></div>
            `;
            chatMessages.appendChild(msgDiv);
            setTimeout(() => msgDiv.classList.add('visible'), 50);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                msgDiv.remove();
                resolve();
            }, 1200);
        });
    }

    // Helper: Update Quick Actions
    function updateActions(actions) {
        quickActions.innerHTML = '';
        actions.forEach(act => {
            const btn = document.createElement('button');
            btn.className = 'quick-action-btn';
            btn.textContent = act.text;
            btn.onclick = () => {
                quickActions.innerHTML = '';
                addMessage(act.text, 'user');
                act.handler();
            };
            quickActions.appendChild(btn);
        });
    }

    // --- STORY SEQUENCE ---

    async function initStory() {
        await showTyping();
        addMessage("Good afternoon. It's 4:00 PM. Here is the current patrol status. There are some bottlenecks detected.", 'agent', `
            <div class="chat-summary-data">
                <div class="data-row"><span class="data-label">John Doe</span><span class="data-value data-val-orange">25 hits remaining</span></div>
                <div class="data-row"><span class="data-label">Carlos Mendez</span><span class="data-value data-val-orange" style="color:#ef4444;">32 hits remaining</span></div>
                <div class="data-row"><span class="data-label">Sophia Khan</span><span class="data-value">18 hits remaining</span></div>
            </div>
        `);

        updateActions([
            { text: "Show me today's route for John Doe", handler: step1_ShowJohnRoute }
        ]);
    }

    async function step1_ShowJohnRoute() {
        await showTyping();

        // Pulse John's shift
        cardJohn.classList.add('optimized');
        setTimeout(() => cardJohn.classList.remove('optimized'), 2000);

        addMessage("Highlighting John Doe's current run in Manhattan South. He is currently on track, but there is an opportunity to clear more hits if we optimize his sequence.", 'agent');

        updateActions([
            { text: "Optimize John's Route to clear more hits", handler: step2_OptimizeJohn }
        ]);
    }

    async function step2_OptimizeJohn() {
        // Show short typing, animate the card visibly 
        addMessage("Optimizing John's active route schedule...", 'agent');
        await new Promise(r => setTimeout(r, 600));

        // Animated Scaling and update of John's card
        cardJohn.style.transition = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
        cardJohn.style.transform = "scale(1.15)";
        cardJohn.style.zIndex = "100";
        cardJohn.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";

        await new Promise(r => setTimeout(r, 800));

        // Update John UI
        cardJohn.classList.remove('orange');
        cardJohn.classList.add('green');
        cardJohn.innerHTML = `
            <div class="card-time">8:00a - 4:00p</div>
            <div class="card-title" style="color:#10b981; font-weight:600;">Zone A + B Optimal</div>
            <div class="card-loc">Manhattan South</div>
            <div class="card-icon icon-green">✔</div>
        `;
        johnHits.textContent = "33 hits (Optimized)";
        johnHits.style.color = "#10b981";

        await new Promise(r => setTimeout(r, 800));
        cardJohn.style.transform = "scale(1)";
        cardJohn.style.boxShadow = "none";

        await showTyping();
        addMessage("Route optimized for John Doe. I have resequenced his path through Zone B.", 'agent', `
            <div class="report-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                +8 Expected Hits Cleared
            </div>
            <div style="font-size:12px; color:#64748b; margin-top:8px;">Travel time reduced by 14 minutes.</div>
        `);

        updateActions([
            { text: "Check Carlos Mendez for overlap", handler: step3_CheckCarlos }
        ]);
    }

    async function step3_CheckCarlos() {
        await showTyping();

        // Update Carlos UI (Traffic shake)
        cardCarlos.classList.remove('orange');
        cardCarlos.classList.add('traffic');
        carAlert.style.display = 'inline';
        carlosHits.style.color = "#ef4444";

        addMessage("Warning: Carlos Mendez is currently stuck in major gridlock on 125th St. At his current velocity, he will miss 12 low-priority hits before end of shift.", 'agent');

        updateActions([
            { text: "Reassign Carlos's low-priority hits to Sophia", handler: step4_ReassignCarlos }
        ]);
    }

    async function step4_ReassignCarlos() {
        addMessage("Initiating transfer of 12 hits to Sophia Khan...", 'agent');

        // Wait a beat before animation starts
        await new Promise(r => setTimeout(r, 600));

        // Get coordinates
        const srcRect = cardCarlos.getBoundingClientRect();
        const destRect = document.getElementById('cell-sophia-wed').getBoundingClientRect();

        // Create Clone for animation
        const clone = cardCarlos.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.top = srcRect.top + 'px';
        clone.style.left = srcRect.left + 'px';
        clone.style.width = srcRect.width + 'px';
        clone.style.height = srcRect.height + 'px';
        clone.style.margin = '0';
        clone.style.zIndex = '9999';
        clone.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        clone.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        clone.classList.remove('traffic');
        clone.classList.add('optimized'); // purple style
        clone.innerHTML = `
            <div class="card-time">Transferring 12 Hits</div>
            <div class="card-title">Routing to Sophia</div>
            <div class="card-icon icon-blue"></div>
            `;
        document.body.appendChild(clone);

        // Turn the original Carlos card to a normal green one now that hits are removed
        cardCarlos.style.opacity = '0.5';
        cardCarlos.classList.remove('traffic');
        cardCarlos.classList.add('green');
        carAlert.style.display = 'none';
        carlosHits.textContent = "20 hits (Adjusted)";
        carlosHits.style.color = "#64748b";
        cardCarlos.innerHTML = `
            <div class="card-time">10:00a - 6:00p</div>
            <div class="card-title">Zone B Reduced</div>
            <div class="card-loc">Harlem North</div>
            <div class="card-icon icon-green">✔</div>
        `;

        // Trigger animation movement
        setTimeout(() => {
            clone.style.top = (destRect.top + 8) + 'px';
            clone.style.left = (destRect.left + 8) + 'px';
            clone.style.width = (destRect.width - 16) + 'px'; // account for padding
            clone.style.height = (destRect.height - 16) + 'px';
            clone.style.transform = 'scale(1.05)';
        }, 50);

        // Wait for the clone to "arrive"
        await new Promise(r => setTimeout(r, 1200));

        // Cleanup clone and update Sophia's card
        clone.remove();
        cardSophia.classList.remove('blue');
        cardSophia.classList.add('optimized');
        cardSophia.innerHTML = `
            <div class="card-time">7:00a - 3:00p</div>
            <div class="card-title" style="color:#8b5cf6; font-weight:600;">Zone C + B Overlap</div>
            <div class="card-loc">Queens & Harlem</div>
            <div class="card-icon icon-blue"></div>
        `;
        sophiaHits.textContent = "30 hits (Boosted)";
        sophiaHits.style.color = "#8b5cf6";

        await showTyping();
        addMessage("Transferred 12 hits from Carlos to Sophia Khan. Carlos is now back on track to complete his high-priority checks. Sophia assumes the extra load seamlessly.", 'agent', `
            <div class="report-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Schedule Rebalanced Successfully
            </div>
        `);

        // Remove highlight from Sophia after a few seconds
        setTimeout(() => {
            cardSophia.classList.remove('optimized');
            cardSophia.classList.add('blue');
        }, 3000);

        updateActions([
            { text: "Approve and push updates to officers", handler: step5_Finish }
        ]);
    }

    async function step5_Finish() {
        // Just a final confirmation interaction
        await showTyping();

        addMessage("All schedules have been locked and pushed to the mobile devices. Officers have acknowledged the new routing.", 'agent');

        updateActions([
            { text: "Reset Demo", handler: () => location.reload() }
        ]);
    }

    // Start
    setTimeout(initStory, 800);
});
