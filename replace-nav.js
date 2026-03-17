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
    let content = fs.readFileSync(f.file, 'utf8');

    // Replace styles to include general required css for the sidebar/navbar
    if (!content.includes('general.css')) {
        content = content.replace(
            '<link rel="stylesheet" href="agent-config-page.css">',
            '<link rel="stylesheet" href="styles.css">\n    <link rel="stylesheet" href="general.css">\n    <link rel="stylesheet" href="agent-config-page.css">'
        );
    }

    // For AI orchestrator css which might be missing but is required
    if (f.file === 'config-orchestrator.html' && !content.includes('ai-orchestrator.css')) {
        // we dont actually need it for config
    }

    // Replace sidebar
    const cb1 = content.indexOf('<!-- Sidebar -->');
    if (cb1 !== -1) {
        // Find closing </nav> tag at index > cb1
        const cb2 = content.indexOf('</nav>', cb1) + 6;
        content = content.substring(0, cb1) + sidebarHTML + content.substring(cb2);
    }

    // Make sure we adjust the sidebar active state
    // The "Agent Studio" button should be active, and others not
    let customSidebar = sidebarHTML.replace('class="sidebar-nav-item active" title="Schedule"', 'class="sidebar-nav-item" title="Schedule"');
    customSidebar = customSidebar.replace('class="sidebar-nav-item" title="Agent Studio"', 'class="sidebar-nav-item active" title="Agent Studio"');

    const sb1 = content.indexOf('<!-- ===== SIDEBAR NAVIGATION ===== -->');
    if (sb1 !== -1) {
        const sb2 = content.indexOf('</nav>', sb1) + 6;
        content = content.substring(0, sb1) + customSidebar + content.substring(sb2);
    }

    // Build agent specific header
    let customHeader = headerBaseHTML.replace(
        '<span class="breadcrumb-text">Schedule</span>',
        '<span class="breadcrumb-text" style="color:#AEAEB2;">Agent Studio / </span><span class="breadcrumb-text" style="margin-left:5px;">' + f.title + '</span>'
    );
    // Remove actual background of icon but set new background
    customHeader = customHeader.replace(
        /<div class="breadcrumb-icon">[\s\S]*?<\/div>/,
        '<div class="breadcrumb-icon" style="background: ' + f.color + '; border-radius: 6px; display:flex; align-items:center; justify-content:center; padding: 4px; font-size:12px; height:24px; width:24px;">' + f.icon + '</div>'
    );
    // Remove the location-dropdown completely
    customHeader = customHeader.replace(/<div class="header-location">[\s\S]*?<\/div>/, '');

    // The header requires 'app-layout' handling... wait, config pages have 'cfg-layout' and 'cfg-main'. The global header will just fit vertically into cfg-main if designed correctly but general CSS assumes it's within 'main-content'.
    // Let's add the right classes.

    // The config page currently has <!-- Top Bar -->
    const tb1 = content.indexOf('<!-- Top Bar -->');
    const tbEnd = content.indexOf('<!-- Content -->');
    if (tb1 !== -1 && tbEnd !== -1) {
        content = content.substring(0, tb1) + '<!-- Top Bar (Replaced by Global Header) -->\n' + customHeader + '\n            ' + content.substring(tbEnd);
    }

    // The global header might conflict with 'cfg-main' padding, we can test it visually.

    fs.writeFileSync(f.file, content, 'utf8');
    console.log('Updated ' + f.file);
});
