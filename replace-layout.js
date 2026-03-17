const fs = require('fs');

const gen = fs.readFileSync('general.html', 'utf8');

const sIdx1 = gen.indexOf('<!-- ===== SIDEBAR NAVIGATION ===== -->');
const sIdx2 = gen.indexOf('</nav>', sIdx1) + 6;
const sidebarHTML = gen.substring(sIdx1, sIdx2);

const hIdx1 = gen.indexOf('<!-- Header -->');
const hIdx2 = gen.indexOf('</header>', hIdx1) + 9;
const headerBaseHTML = gen.substring(hIdx1, hIdx2);

const files = [
    { file: 'config-orchestrator.html', title: 'Signal Orchestrator', icon: '🧠', color: '#1C1C1E' },
    { file: 'config-copilot.html', title: 'Signal Co-Pilot', icon: '🤖', color: '#146DFF' },
    { file: 'config-contract.html', title: 'Contract Intelligence Agent', icon: '📄', color: '#4CAF50' },
    { file: 'config-scheduling.html', title: 'Scheduling Optimization Agent', icon: '📅', color: '#FFB300' },
    { file: 'config-route.html', title: 'Route Optimization Agent', icon: '🗺', color: '#8B5CF6' }
];

files.forEach(f => {
    try {
        let content = fs.readFileSync(f.file, 'utf8');

        // Add CSS links if not present
        if (!content.includes('general.css')) {
            content = content.replace(
                '<link rel="stylesheet" href="agent-config-page.css">',
                '<link rel="stylesheet" href="styles.css">\n    <link rel="stylesheet" href="general.css">\n    <link rel="stylesheet" href="agent-config-page.css">'
            );
        }

        // Layout wrapper
        content = content.replace(/<div class="cfg-layout">/, '<div class="app-layout cfg-layout-override" id="app-layout" style="display:flex; height:100vh; overflow:hidden;">');

        // 1. Sidebar Replacement
        let customSidebar = sidebarHTML.replace('class="sidebar-nav-item active" title="Schedule"', 'class="sidebar-nav-item" title="Schedule"');
        customSidebar = customSidebar.replace('class="sidebar-nav-item" title="Agent Studio"', 'class="sidebar-nav-item active" title="Agent Studio"');
        customSidebar = customSidebar.replace(/onclick="window\.location\.href='agent-hub\.html'"/g, ""); // Remove the inline onclick for Agent Studio, it might interfere or navigate twice but here it's fine. We'll leave it out or keep it. Actually keep it:
        customSidebar = customSidebar.replace('id="nav-agent-studio"', 'id="nav-agent-studio" onclick="window.location.href=\'agent-hub.html\'"');

        const navStart = content.indexOf('<!-- Sidebar -->');
        if (navStart !== -1) {
            let navEnd = content.indexOf('</nav>', navStart);
            if (navEnd === -1) navEnd = content.indexOf('<!-- Main -->', navStart); else navEnd += 6;

            // Only replace if we haven't already injected the global side navigation
            if (!content.substring(navStart, navEnd).includes('sidebar-nav-item')) {
                content = content.substring(0, navStart) + customSidebar + '\n        ' + content.substring(navEnd);
            }
        }

        // 2. Header Replacement
        let customHeader = headerBaseHTML.replace(
            '<span class="breadcrumb-text">Schedule</span>',
            '<span class="breadcrumb-text" style="color:#AEAEB2; cursor:pointer;" onclick="location.href=\'agent-hub.html\'">Agent Studio</span><span class="breadcrumb-text" style="color:#AEAEB2; margin:0 8px;">/</span><span class="breadcrumb-text">' + f.title + ' Configuration</span>'
        );
        customHeader = customHeader.replace(
            /<div class="breadcrumb-icon">[\s\S]*?<\/div>/,
            '<div class="breadcrumb-icon" style="background: ' + f.color + '; border-radius: 6px; display:flex; align-items:center; justify-content:center; font-size:12px; height:24px; width:24px; padding:0;">' + f.icon + '</div>'
        );
        customHeader = customHeader.replace(/<div class="header-location">[\s\S]*?<\/div>/, '');

        const tbStart = content.indexOf('<!-- Top Bar -->');
        if (tbStart !== -1) {
            let tbEnd = content.indexOf('<!-- Content -->');
            if (tbEnd !== -1) {
                // If we haven't already replaced the top bar
                if (!content.substring(tbStart, tbEnd).includes('header-profile')) {
                    content = content.substring(0, tbStart) + customHeader + '\n            ' + content.substring(tbEnd);
                }
            }
        }

        // Ensure main container takes up space properly
        if (content.includes('<div class="cfg-main">')) {
            content = content.replace(/<div class="cfg-main">/, '<div class="cfg-main" style="flex:1; display:flex; flex-direction:column; min-width:0; overflow:hidden; background:#F8F9FA;">');
        }

        fs.writeFileSync(f.file, content, 'utf8');
        console.log('Successfully updated ' + f.file);
    } catch (e) {
        console.error("Error updating " + f.file + ": " + e.message);
    }
});
