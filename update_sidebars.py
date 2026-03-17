import re

items_index = """      <div class="sidebar-nav">
        <!-- Dashboard -->
        <button class="sidebar-nav-item" title="Dashboard">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="2" width="6" height="6" rx="1" />
            <rect x="12" y="2" width="6" height="6" rx="1" />
            <rect x="2" y="12" width="6" height="6" rx="1" />
            <rect x="12" y="12" width="6" height="6" rx="1" />
          </svg>
        </button>
        <!-- Signal/Map -->
        <button class="sidebar-nav-item" title="Signal Map">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="10" cy="10" r="8" />
            <path d="M2 10h16" />
            <path d="M10 2c2.5 2 4 5 4 8s-1.5 6-4 8c-2.5-2-4-5-4-8s1.5-6 4-8z" />
          </svg>
        </button>
        <!-- Schedule (Active) -->
        <button class="sidebar-nav-item active" title="Schedule" id="nav-schedule">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="4" width="14" height="14" rx="2" />
            <path d="M3 8h14" />
            <path d="M7 2v4" />
            <path d="M13 2v4" />
          </svg>
        </button>
        <!-- Agent Studio -->
        <button class="sidebar-nav-item" title="Agent Studio" id="nav-agent-studio" onclick="window.location.href='agent-hub.html'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="transform: scale(0.85); transform-origin: center;">
            <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" stroke-linejoin="round" />
            <path d="M19 16l1.2 2.8L23 20l-2.8 1.2L19 24l-1.2-2.8L15 20l2.8-1.2L19 16z" stroke-linejoin="round" />
          </svg>
        </button>
        <!-- Users -->
        <button class="sidebar-nav-item" title="Users" style="position: relative;">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="10" cy="7" r="3" />
            <path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          </svg>
          <span class="nav-dot"></span>
        </button>
        <!-- Settings -->
        <button class="sidebar-nav-item" title="Settings">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="10" cy="10" r="3" />
            <path d="M10 1.5v2m0 13v2m-6-8.5h-2m16 0h-2m-1.5-5L13 6.5m-8 7L6.5 15m9.5-2l-1.5-1.5m-11 0L5 13" />
          </svg>
        </button>
      </div>"""

items_general = items_index.replace("      ", "            ").replace("    ", "        ").replace("  ", "    ").replace('\n                ', '\n                    ').replace('\n              ', '\n                ').replace('\n            ', '\n                ')
items_general = re.sub(r'class="sidebar-nav"', r'class="sidebar-nav"', items_general)

items_agent = items_general.replace('class="sidebar-nav-item active" title="Schedule"', 'class="sidebar-nav-item" title="Schedule" onclick="window.location.href=\'index.html\'"')
items_agent = items_agent.replace('class="sidebar-nav-item" title="Agent Studio" id="nav-agent-studio" onclick="window.location.href=\'agent-hub.html\'"', 'class="sidebar-nav-item active" title="Agent Studio" id="nav-agent-studio"')


for f, repl in [('index.html', items_index), ('general.html', items_general), ('agent-hub.html', items_agent)]:
    with open(f, 'r') as file:
        content = file.read()
    
    # Replace the whole <div class="sidebar-nav">...</div>
    new_content = re.sub(r'<div class="sidebar-nav">.*?</div>\n\s*<button class="sidebar-toggle"', 
                         repl + '\n      <button class="sidebar-toggle"' if f == 'index.html' else repl + '\n            <button class="sidebar-toggle"', 
                         content, flags=re.DOTALL)
    
    with open(f, 'w') as file:
        file.write(new_content)

print("Done updating")
