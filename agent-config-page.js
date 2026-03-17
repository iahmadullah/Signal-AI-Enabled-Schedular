// ===================================================
//  AGENT CONFIGURATION PAGE — Shared Data & Renderer
// ===================================================

const AGENT_PAGE_CONFIGS = {

    // ──────────────────────────────────────────────
    // 1. SIGNAL ORCHESTRATOR
    // Central decision engine. Delegates and syncs.
    // ──────────────────────────────────────────────
    orchestrator: {
        name: 'Signal Orchestrator',
        subtitle: 'Central Decision Engine · Pipeline Coordinator',
        color: '#1C1C1E',
        icon: '🧠',
        status: 'Active · Auto-Execute',
        lastRun: '2 mins ago',
        purpose: 'Central decision engine. Interprets user intent, selects agents, coordinates execution, validates impact, and updates the scheduler. Does not optimize directly — delegates and synchronizes across all agents.',
        problems: 'Missed handoffs between agents, cascading failures, silent errors in multi-agent pipelines, uncoordinated parallel execution.',
        activation: [
            'User input or system event trigger',
            'Agent failure detected',
            'Pipeline gap identified',
            'Manual orchestration request',
            'System health check cycle'
        ],
        kb: [
            'All Connected Agents (Contract, Scheduling, Route, Monitoring, Dispatch, Performance)',
            'Shift Database',
            'Contract Database',
            'Officer Profile Database',
            'SLA Rule Engine',
            'Fatigue & Compliance Rules',
            'Risk Scoring Engine',
            'Historical Performance Metrics'
        ],
        core: [
            { id: 'o1', name: 'Auto-Execute Low-Risk Actions', desc: 'Automatically execute actions scored below risk threshold without user confirmation', type: 'toggle', enabled: true },
            { id: 'o2', name: 'Require Confirmation for High-Impact Changes', desc: 'Always surface a confirmation step before executing high-impact multi-agent actions', type: 'toggle', enabled: true },
            { id: 'o3', name: 'Simulation Before Execution', desc: 'Run a dry-run simulation before committing any changes to the scheduler', type: 'toggle', enabled: false },
            { id: 'o4', name: 'Learning Feedback Loop', desc: 'Feed execution outcomes back into intent detection model to improve future decisions', type: 'toggle', enabled: true },
            { id: 'o5', name: 'Intent Detection Sensitivity', desc: 'How broadly to interpret ambiguous user inputs — higher = more aggressive interpretation', type: 'slider', min: 1, max: 10, value: 7, unit: '' },
            { id: 'o6', name: 'Context Memory Window', desc: 'Number of days of historical context considered per decision', type: 'slider', min: 1, max: 30, value: 7, unit: 'd' },
            { id: 'o7', name: 'Maximum Parallel Agent Calls', desc: 'Maximum agents the Orchestrator may query simultaneously per request', type: 'slider', min: 1, max: 8, value: 4, unit: ' agents' }
        ],
        guardrails: [
            { id: 'g1', name: 'Approval Threshold Score', val: 70, unit: '%', min: 0, max: 100 },
            { id: 'g2', name: 'Emergency Override Mode', toggle: true, enabled: false }
        ],
        notifications: [
            { name: 'Agent execution completed', enabled: true },
            { name: 'High-impact action requires confirmation', enabled: true },
            { name: 'Cascade failure detected', enabled: true },
            { name: 'Simulation result ready', enabled: false },
            { name: 'Learning model updated', enabled: false }
        ],
        workflow: [
            { id: 'n1', title: '1. User Input / Event Trigger', desc: 'User command or system anomaly fires', x: 360, y: 40, color: '#1C1C1E' },
            { id: 'n2', title: '2. Intent Detection', desc: 'Classify intent type and risk level', x: 360, y: 320, color: '#2196F3' },
            { id: 'n3', title: '3. Context Enrichment', desc: 'Fetch relevant shift, contract, route data', x: 360, y: 600, color: '#546E7A' },
            { id: 'n4', title: '4. Agent Selection Router', desc: 'Choose which agents to invoke', x: 360, y: 880, color: '#FF9800' },
            { id: 'n5', title: '5. Parallel Agent Execution', desc: 'Dispatch tasks to selected agents concurrently', x: 80, y: 1160, color: '#9C27B0' },
            { id: 'n6', title: '6. Impact Simulation', desc: 'Dry-run and risk assessment', x: 640, y: 1160, color: '#00BCD4' },
            { id: 'n7', title: '7. Compliance Validation', desc: 'Check fatigue, SLA, overtime rules', x: 360, y: 1440, color: '#F44336' },
            { id: 'n8', title: '8. User Confirmation', desc: 'Surface confirmation if action is high-impact', x: 80, y: 1720, color: '#8BC34A' },
            { id: 'n9', title: '9. Execution', desc: 'Commit changes across agents', x: 640, y: 1720, color: '#4CAF50' },
            { id: 'n10', title: '10. Scheduler Update Broadcast', desc: 'Notify all agents and UI of state change', x: 360, y: 2000, color: '#146DFF' },
            { id: 'n11', title: '11. Performance Feedback', desc: 'Log outcome and update learning model', x: 360, y: 2280, color: '#FF5722' }
        ],
        connections: [
            ['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'], ['n4', 'n5'], ['n4', 'n6'],
            ['n5', 'n7'], ['n6', 'n7'], ['n7', 'n8'], ['n7', 'n9'],
            ['n8', 'n9'], ['n9', 'n10'], ['n10', 'n11']
        ]
    },

    // ──────────────────────────────────────────────
    // 2. SIGNAL CO-PILOT
    // Proactive monitoring layer. Always listening.
    // ──────────────────────────────────────────────
    copilot: {
        name: 'Signal Co-Pilot',
        subtitle: 'Proactive Monitoring · Risk Intelligence',
        color: '#146DFF',
        icon: '🤖',
        status: 'Active · Always On',
        lastRun: '4 mins ago',
        purpose: 'Proactive monitoring layer. Detects risks, suggests improvements, anticipates workload imbalance and SLA threats. Always listening — does not wait for commands.',
        problems: 'Information overload, slow decision-making, missed SLA risks, undetected fatigue buildup, reactive-only operations.',
        activation: [
            'Continuous monitoring loop (always active)',
            'Fatigue threshold crossed',
            'Patrol imbalance detected',
            'SLA risk window approaching',
            'Contract expiry alert',
            'User message received',
            'Any agent anomaly surfaced'
        ],
        kb: [
            'Scheduling Database',
            'Patrol Visit Distribution',
            'Fatigue & Weekly Hour Tracking',
            'SLA Compliance Logs',
            'Dispatch History',
            'Contract Lifecycle Data',
            'Performance Scoring Engine',
            'Predictive Workload Trends'
        ],
        core: [
            { id: 'cp1', name: 'Continuous Monitoring Loop', desc: 'Always-on background process scanning all agents for deviations', type: 'toggle', enabled: true },
            { id: 'cp2', name: 'Auto-Suggest (No Manual Trigger)', desc: 'Proactively push suggestions without user asking', type: 'toggle', enabled: true },
            { id: 'cp3', name: 'Auto-Balancing', desc: 'Automatically trigger rebalancing when patrol imbalance is detected', type: 'toggle', enabled: false },
            { id: 'cp4', name: 'Executive Summary Reporting', desc: 'Generate concise shift-end intelligence summaries', type: 'toggle', enabled: true },
            { id: 'cp5', name: 'Fatigue Alert Threshold', desc: 'Weekly hour percentage at which fatigue alert fires', type: 'slider', min: 50, max: 100, value: 85, unit: '%' },
            { id: 'cp6', name: 'Patrol Imbalance Threshold', desc: 'Deviation percentage that triggers rebalance suggestion', type: 'slider', min: 5, max: 50, value: 20, unit: '%' },
            { id: 'cp7', name: 'SLA Risk Warning Window', desc: 'Minutes before SLA breach at which alert is raised', type: 'slider', min: 5, max: 120, value: 30, unit: 'min' },
            { id: 'cp8', name: 'Contract Expiry Alert Window', desc: 'Days before contract expiry to raise alert', type: 'slider', min: 1, max: 60, value: 14, unit: 'd' },
            { id: 'cp9', name: 'Risk Projection Horizon', desc: 'How many hours ahead to simulate risk scenarios', type: 'slider', min: 1, max: 48, value: 8, unit: 'hr' }
        ],
        guardrails: [
            { id: 'g1', name: 'Suggestion Confidence Threshold', val: 75, unit: '%', min: 50, max: 100 },
            { id: 'g2', name: 'Max Auto-Actions Per Hour', val: 5, unit: ' actions', min: 1, max: 30 },
            { id: 'g3', name: 'Human Approval Required', toggle: true, enabled: true }
        ],
        notifications: [
            { name: 'Fatigue risk alert', enabled: true },
            { name: 'SLA breach risk warning', enabled: true },
            { name: 'Patrol imbalance detected', enabled: true },
            { name: 'Contract expiry approaching', enabled: true },
            { name: 'Daily executive summary', enabled: true },
            { name: 'Shift completion briefing', enabled: false }
        ],
        workflow: [
            { id: 'n1', title: '1. Monitoring Loop', desc: 'Continuous background scanning — always active', x: 360, y: 40, color: '#146DFF' },
            { id: 'n2', title: '2. Signal Detection', desc: 'Detect fatigue, imbalance, SLA risk, contract risk', x: 360, y: 320, color: '#2196F3' },
            { id: 'n3', title: '3. Risk Scoring Engine', desc: 'Score severity and urgency of each signal', x: 360, y: 600, color: '#FF9800' },
            { id: 'n4', title: '4. Multi-Agent Data Query', desc: 'Pull live context from relevant agents', x: 360, y: 880, color: '#546E7A' },
            { id: 'n5', title: '5. Impact Projection', desc: 'Simulate risk trajectory over projection horizon', x: 360, y: 1160, color: '#9C27B0' },
            { id: 'n6', title: '6. Suggestion Generation', desc: 'Compose ranked, actionable recommendations', x: 80, y: 1440, color: '#4CAF50' },
            { id: 'n7', title: '7. User Confirmation', desc: 'Surface suggestion for operator approval', x: 640, y: 1440, color: '#00BCD4' },
            { id: 'n8', title: '8. Agent Execution', desc: 'Dispatch approved action to target agent', x: 360, y: 1720, color: '#F44336' },
            { id: 'n9', title: '9. Scheduler Visual Update', desc: 'Reflect changes in UI and scheduler', x: 360, y: 2000, color: '#8BC34A' },
            { id: 'n10', title: '10. Learning Feedback', desc: 'Log experience to refine future risk scoring', x: 360, y: 2280, color: '#FF5722' }
        ],
        connections: [
            ['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'], ['n4', 'n5'],
            ['n5', 'n6'], ['n5', 'n7'], ['n6', 'n8'], ['n7', 'n8'],
            ['n8', 'n9'], ['n9', 'n10']
        ]
    },

    // ──────────────────────────────────────────────
    // 3. CONTRACT INTELLIGENCE AGENT
    // Bridges Sales → Operations.
    // ──────────────────────────────────────────────
    contract: {
        name: 'Contract Intelligence Agent',
        subtitle: 'Property Data to Operational Blueprint',
        color: '#4CAF50',
        icon: '📄',
        status: 'Active · Auto-Apply',
        lastRun: '12 mins ago',
        purpose: 'Transforms property data into structured operational contracts and triggers shift blueprints. Bridges Sales to Operations by converting CRM leads and site profiles into fully configured shift templates, SLA rules, and service assignments.',
        problems: 'Manual contract entry errors, missed SLA clauses, ambiguous post orders, delayed blueprint activation, unvalidated risk profiles.',
        activation: [
            'User contract query or property name input',
            'CRM new property or lead event',
            'Contract modification or amendment',
            'Annual contract renewal trigger',
            'Client SLA dispute raised'
        ],
        kb: [
            'CRM Integration',
            'Property & Location Data',
            'Google Maps Integration',
            'Business Directory Data',
            'Risk Classification Engine',
            'SLA Template Library',
            'Pricing Matrix',
            'Service Configuration Templates'
        ],
        core: [
            { id: 'c1', name: 'Auto Property Enrichment', desc: 'Automatically fetch and enrich property details from external sources on contract creation', type: 'toggle', enabled: true },
            { id: 'c2', name: 'Risk Scoring Logic', desc: 'Run automatic risk profiling on every new or modified contract', type: 'toggle', enabled: true },
            { id: 'c3', name: 'Auto-Generate Shift Blueprint', desc: 'Trigger blueprint generation immediately after contract is validated', type: 'toggle', enabled: true },
            { id: 'c4', name: 'Auto-Trigger Scheduling After Publish', desc: 'Kick off the Scheduling Agent automatically when blueprint is published', type: 'toggle', enabled: false },
            { id: 'c5', name: 'Auto-Publish Contract Mode', desc: 'Publish without supervisor review if risk score is below threshold', type: 'toggle', enabled: false },
            { id: 'c6', name: 'Contact Auto-Fetch', desc: 'Automatically fetch primary contact details from CRM on property match', type: 'toggle', enabled: true },
            { id: 'c7', name: 'Default Shift Duration', desc: 'Default hours per shift when not explicitly stated in contract', type: 'slider', min: 4, max: 12, value: 8, unit: 'hr' },
            { id: 'c8', name: 'Default SLA Value', desc: 'Default SLA response time applied when contract is silent on SLA', type: 'slider', min: 5, max: 60, value: 15, unit: 'min' },
            { id: 'c9', name: 'Blueprint Activation Delay', desc: 'Hours to wait before auto-activating a generated blueprint', type: 'slider', min: 0, max: 72, value: 24, unit: 'hr' }
        ],
        guardrails: [
            { id: 'g1', name: 'Max Allowed Legal Risk Score', val: 15, unit: '%', min: 0, max: 50 },
            { id: 'g3', name: 'SLA Strictness Level', val: 80, unit: '%', min: 50, max: 100 },
            { id: 'g2', name: 'Require Supervisor Approval on Publish', toggle: true, enabled: true }
        ],
        notifications: [
            { name: 'Contract expiry alert', enabled: true },
            { name: 'SLA breach risk flag', enabled: true },
            { name: 'Blueprint generated confirmation', enabled: true },
            { name: 'Risk score exceeds threshold', enabled: true },
            { name: 'Amendment workflow triggered', enabled: false },
            { name: 'Auto-publish completed', enabled: false }
        ],
        workflow: [
            { id: 'n1', title: '1. Contract Query / Property Input', desc: 'User enters property name or CRM triggers event', x: 360, y: 40, color: '#4CAF50' },
            { id: 'n2', title: '2. Property Lookup', desc: 'Search CRM and site database for match', x: 360, y: 320, color: '#2196F3' },
            { id: 'n3', title: '3a. Existing — Retrieve Contract', desc: 'Load active contract details for that property', x: 80, y: 600, color: '#546E7A' },
            { id: 'n4', title: '3b. New — Onboarding Flow', desc: 'Initiate new property intake and contract draft', x: 640, y: 600, color: '#FF9800' },
            { id: 'n5', title: '4. Location Enrichment', desc: 'Enrich with Google Maps, risk zone, site data', x: 360, y: 880, color: '#00BCD4' },
            { id: 'n6', title: '5. Risk Profiling', desc: 'Score property risk level automatically', x: 360, y: 1160, color: '#F44336' },
            { id: 'n7', title: '6. Service Recommendation', desc: 'Recommend service types and SLA template', x: 360, y: 1440, color: '#9C27B0' },
            { id: 'n8', title: '7. Template Selection', desc: 'Match to best-fit service configuration template', x: 360, y: 1720, color: '#FF5722' },
            { id: 'n9', title: '8. Contract Draft Generation', desc: 'Auto-generate contract with all fields populated', x: 360, y: 2000, color: '#795548' },
            { id: 'n10', title: '9. User Review & Approval', desc: 'Supervisor reviews and approves draft', x: 360, y: 2280, color: '#607D8B' },
            { id: 'n11', title: '10. Publish Contract', desc: 'Contract goes live and is stored in CRM', x: 360, y: 2560, color: '#1C1C1E' },
            { id: 'n12', title: '11. Trigger Shift Creation', desc: 'Kick off Scheduling Agent with blueprint data', x: 80, y: 2840, color: '#4CAF50' },
            { id: 'n13', title: '12. Scheduler Initialization', desc: 'Shifts created and roster populated in system', x: 640, y: 2840, color: '#146DFF' }
        ],
        connections: [
            ['n1', 'n2'], ['n2', 'n3'], ['n2', 'n4'], ['n3', 'n5'], ['n4', 'n5'],
            ['n5', 'n6'], ['n6', 'n7'], ['n7', 'n8'], ['n8', 'n9'], ['n9', 'n10'],
            ['n10', 'n11'], ['n11', 'n12'], ['n11', 'n13']
        ]
    },

    // ──────────────────────────────────────────────
    // 4. SCHEDULING OPTIMIZATION AGENT
    // Compliance first, efficiency second.
    // ──────────────────────────────────────────────
    scheduling: {
        name: 'Scheduling Optimization Agent',
        subtitle: 'Roster Builder · Compliance-First Assignment',
        color: '#FFB300',
        icon: '📅',
        status: 'Active · Auto-Apply',
        lastRun: '8 mins ago',
        purpose: 'Assigns, replaces, balances, and optimizes shifts while respecting compliance and fatigue constraints. Protects compliance first, efficiency second.',
        problems: 'Chronic overtime, last-minute no-shows, missed certifications, scheduling conflicts, compliance breaches, manual roster errors.',
        activation: [
            'No-show or absent officer detected',
            'Unassigned shift gap found',
            'Workload imbalance threshold crossed',
            'Weekly roster generation cycle',
            'Manual assignment request'
        ],
        kb: [
            'Employee Availability',
            'Attendance Records',
            'Weekly Hour Tracking',
            'Fatigue Metrics',
            'Certification Records',
            'Site Requirements',
            'Performance Scores',
            'Standby Pool List'
        ],
        core: [
            { id: 's1', name: 'Auto No-Show Detection', desc: 'Detect and flag absent officers via attendance system integration', type: 'toggle', enabled: true },
            { id: 's2', name: 'Automatic Gap Fill', desc: 'Automatically assign a replacement when shift gap is detected', type: 'toggle', enabled: true },
            { id: 's3', name: 'Cross-Zone Assignment Permission', desc: 'Allow officers to be assigned outside their primary zone when no local candidates exist', type: 'toggle', enabled: false },
            { id: 's4', name: 'Simulation Requirement', desc: 'Run impact simulation before committing any roster change', type: 'toggle', enabled: true },
            { id: 's5', name: 'Manual Approval Requirement', desc: 'Require supervisor approval before auto-assigning replacements', type: 'toggle', enabled: false },
            { id: 's6', name: 'No-Show Grace Period', desc: 'Minutes after shift start before triggering replacement flow', type: 'slider', min: 0, max: 60, value: 15, unit: 'min' },
            { id: 's7', name: 'Workload Rebalance Threshold', desc: 'Percentage imbalance between officers before rebalancing is triggered', type: 'slider', min: 5, max: 50, value: 20, unit: '%' },
            { id: 's8', name: 'Max Weekly Hours', desc: 'Maximum hours per officer per week before overtime flag fires', type: 'slider', min: 30, max: 60, value: 48, unit: 'h' },
            { id: 's9', name: 'Max Daily Hours', desc: 'Maximum shift length per officer per day', type: 'slider', min: 6, max: 16, value: 12, unit: 'h' },
            { id: 's10', name: 'Fatigue Threshold', desc: 'Fatigue score percentage at which officer is excluded from pool', type: 'slider', min: 50, max: 100, value: 80, unit: '%' }
        ],
        guardrails: [
            { id: 'g1', name: 'Minimum Rest Period', val: 10, unit: 'hrs', min: 8, max: 24 },
            { id: 'g2', name: 'Lock Finalized Rosters', toggle: true, enabled: true }
        ],
        notifications: [
            { name: 'No-show detected', enabled: true },
            { name: 'Replacement candidate found', enabled: true },
            { name: 'Overtime risk approaching', enabled: true },
            { name: 'No eligible candidate — escalate', enabled: true },
            { name: 'Weekly roster finalized', enabled: true },
            { name: 'Fatigue threshold crossed', enabled: false }
        ],
        workflow: [
            { id: 'n1', title: '1. Trigger', desc: 'No-show / gap / imbalance / manual request', x: 360, y: 40, color: '#FFB300' },
            { id: 'n2', title: '2. Gap Detection', desc: 'Identify specific shift, site, and time requirements', x: 360, y: 320, color: '#2196F3' },
            { id: 'n3', title: '3. Candidate Pool Retrieval', desc: 'Fetch all available officers from standby list', x: 360, y: 600, color: '#546E7A' },
            { id: 'n4', title: '4. Constraint Validation', desc: 'Filter: fatigue, compliance, certifications', x: 360, y: 880, color: '#F44336' },
            { id: 'n5', title: '5. Weighted Scoring', desc: 'Score by availability, fatigue, overtime, proximity, performance, familiarity', x: 360, y: 1160, color: '#9C27B0' },
            { id: 'n6', title: '6. Simulation & Projection', desc: 'Simulate roster change and project compliance impact', x: 80, y: 1440, color: '#00BCD4' },
            { id: 'n7', title: '7. Risk Assessment', desc: 'Flag overtime, SLA, or compliance risks in output', x: 640, y: 1440, color: '#FF9800' },
            { id: 'n8', title: '8. User Confirmation', desc: 'Supervisor reviews and approves the recommendation', x: 360, y: 1720, color: '#8BC34A' },
            { id: 'n9', title: '9. Shift Reassignment', desc: 'Commit assignment to roster and notify officer', x: 360, y: 2000, color: '#4CAF50' },
            { id: 'n10', title: '10. Scheduler Update', desc: 'Push roster changes to UI and all stakeholders', x: 80, y: 2280, color: '#146DFF' },
            { id: 'n11', title: '11. Fatigue & Performance Update', desc: 'Update officer fatigue score and performance log', x: 640, y: 2280, color: '#FF5722' }
        ],
        connections: [
            ['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'], ['n4', 'n5'],
            ['n5', 'n6'], ['n5', 'n7'], ['n6', 'n8'], ['n7', 'n8'],
            ['n8', 'n9'], ['n9', 'n10'], ['n9', 'n11']
        ]
    },

    // ──────────────────────────────────────────────
    // 5. ROUTE OPTIMIZATION AGENT
    // Optimizes time, coverage, and workload simultaneously.
    // ──────────────────────────────────────────────
    route: {
        name: 'Route Optimization Agent',
        subtitle: 'Patrol Sequencing · Coverage · SLA Protection',
        color: '#8B5CF6',
        icon: '🗺',
        status: 'Active · Real-Time',
        lastRun: '1 min ago',
        purpose: 'Reduces visit count, clusters checkpoints, avoids traffic, balances patrol load, and protects SLA. Optimizes time, coverage, and workload simultaneously.',
        problems: 'Excessive visit counts, high travel times, inconsistent checkpoint coverage, rushed patrols, wasted fuel, predictable patrol patterns, SLA breach risk.',
        activation: [
            'Shift start triggers route build',
            'Live traffic event detected',
            'Manual optimize request by supervisor',
            'Dispatch event requiring route recalculation',
            'SLA risk threshold crossed'
        ],
        kb: [
            'GPS Tracking (Live)',
            'Traffic API (Live)',
            'QR/NFC Checkpoint Logs',
            'Site Risk Classification',
            'Incident History',
            'Visit Dwell Time History',
            'SLA Time Windows',
            'Patrol Density Rules'
        ],
        core: [
            { id: 'r1', name: 'Checkpoint Clustering Enabled', desc: 'Group nearby checkpoints into single optimized visits', type: 'toggle', enabled: true },
            { id: 'r2', name: 'Low-Risk Visit Compression', desc: 'Compress visits at low-risk sites when patrol schedule is heavy', type: 'toggle', enabled: true },
            { id: 'r3', name: 'Dynamic Density Adjustment', desc: 'Increase visit frequency at high-risk sites in real-time', type: 'toggle', enabled: true },
            { id: 'r4', name: 'Patrol Randomization Mode', desc: 'Randomize patrol sequence to prevent predictable patterns', type: 'toggle', enabled: true },
            { id: 'r5', name: 'Auto Re-Order on Traffic', desc: 'Automatically reorder sequence when traffic conditions change', type: 'toggle', enabled: true },
            { id: 'r6', name: 'Cross-Officer Rebalance', desc: 'Shift checkpoints between officers when one route is overloaded', type: 'toggle', enabled: false },
            { id: 'r7', name: 'Target Visit Reduction', desc: 'Target percentage reduction in redundant visit count per shift', type: 'slider', min: 0, max: 50, value: 20, unit: '%' },
            { id: 'r8', name: 'Maximum Cluster Radius', desc: 'Maximum distance between checkpoints to qualify for clustering', type: 'slider', min: 0, max: 5, value: 2, unit: 'mi' },
            { id: 'r9', name: 'Traffic Sensitivity Level', desc: 'How aggressively to reroute based on live traffic delays', type: 'slider', min: 0, max: 100, value: 85, unit: '%' },
            { id: 'r10', name: 'Minimum Coverage Threshold', desc: 'Minimum percentage of checkpoints that must be visited per shift', type: 'slider', min: 50, max: 100, value: 95, unit: '%' },
            { id: 'r11', name: 'Real-Time Recalculation Interval', desc: 'How frequently the route engine re-evaluates the live route', type: 'slider', min: 1, max: 30, value: 5, unit: 'min' },
            { id: 'r12', name: 'Maximum Visits Per Shift', desc: 'Hard cap on total site visits per officer per shift', type: 'slider', min: 10, max: 100, value: 60, unit: '' }
        ],
        guardrails: [
            { id: 'g1', name: 'Max Daily Driving Hours', val: 6, unit: 'hrs', min: 2, max: 12 },
            { id: 'g2', name: 'SLA Priority Override', toggle: true, enabled: true },
            { id: 'g3', name: 'Emergency Mode Override', toggle: true, enabled: false }
        ],
        notifications: [
            { name: 'Route recalculated (traffic)', enabled: true },
            { name: 'Route deviation alert', enabled: true },
            { name: 'SLA risk — route delay warning', enabled: true },
            { name: 'Checkpoint clustering applied', enabled: false },
            { name: 'Patrol randomization updated', enabled: false },
            { name: 'Coverage threshold breach', enabled: true }
        ],
        workflow: [
            { id: 'n1', title: '1. Trigger', desc: 'Shift start / traffic event / dispatch / SLA risk', x: 360, y: 40, color: '#8B5CF6' },
            { id: 'n2', title: '2. Route Data Retrieval', desc: 'Fetch shift plan, checkpoints, and SLA windows', x: 360, y: 320, color: '#2196F3' },
            { id: 'n3', title: '3. Traffic & Risk Enrichment', desc: 'Pull live GPS, traffic API, and site risk scores', x: 360, y: 600, color: '#FF9800' },
            { id: 'n4', title: '4. Checkpoint Clustering', desc: 'Group nearby checkpoints by radius and risk tier', x: 80, y: 880, color: '#00BCD4' },
            { id: 'n5', title: '5. Visit Compression', desc: 'Compress low-risk visits to reduce patrol count', x: 640, y: 880, color: '#4CAF50' },
            { id: 'n6', title: '6. SLA Priority Adjustment', desc: 'Re-weight sequence to protect high-SLA sites first', x: 360, y: 1160, color: '#F44336' },
            { id: 'n7', title: '7. Route Path Optimization', desc: 'Build optimal patrol sequence (time + distance)', x: 360, y: 1440, color: '#9C27B0' },
            { id: 'n8', title: '8. Impact Estimation', desc: 'Calculate time saved, distance saved, coverage %', x: 360, y: 1720, color: '#546E7A' },
            { id: 'n9', title: '9. User Confirmation', desc: 'Supervisor reviews and approves optimized route', x: 360, y: 2000, color: '#8BC34A' },
            { id: 'n10', title: '10. Route Update Broadcast', desc: 'Push route to officer app and all stakeholders', x: 80, y: 2280, color: '#146DFF' },
            { id: 'n11', title: '11. Scheduler Map Redraw', desc: 'Update map visualization in scheduler UI', x: 640, y: 2280, color: '#FF5722' },
            { id: 'n12', title: '12. Performance Metric Update', desc: 'Log visit reduction, distance savings, SLA outcome', x: 360, y: 2560, color: '#1C1C1E' }
        ],
        connections: [
            ['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'], ['n3', 'n5'],
            ['n4', 'n6'], ['n5', 'n6'], ['n6', 'n7'], ['n7', 'n8'],
            ['n8', 'n9'], ['n9', 'n10'], ['n9', 'n11'],
            ['n10', 'n12'], ['n11', 'n12']
        ]
    }

};

// =============================================
// CANVAS ENGINE
// =============================================
let _canvas = { nodes: [], connections: [], connecting: null, nextId: 1, zoom: 1 };

function initConfigPage(agentKey) {
    const a = AGENT_PAGE_CONFIGS[agentKey];
    if (!a) return;

    // Page title
    document.title = a.name + ' Config | Signal Intelligence';

    // Header
    const headerIcon = document.getElementById('cfg-agent-icon');
    const headerTitle = document.getElementById('cfg-agent-title');
    const headerSub = document.getElementById('cfg-agent-subtitle');
    const headerStatus = document.getElementById('cfg-agent-status');
    const headerLast = document.getElementById('cfg-agent-lastrun');
    if (headerIcon) { headerIcon.textContent = a.icon; headerIcon.style.background = a.color; }
    if (headerTitle) headerTitle.textContent = a.name;
    if (headerSub) headerSub.textContent = a.subtitle;
    if (headerStatus) headerStatus.textContent = a.status;
    if (headerLast) headerLast.textContent = 'Last run: ' + a.lastRun;

    // Also update panel icon + title
    const panelIcon = document.getElementById('cfg-panel-icon');
    const panelTitle = document.getElementById('cfg-panel-title');
    if (panelIcon) { panelIcon.textContent = a.icon; panelIcon.style.background = a.color; }
    if (panelTitle) panelTitle.textContent = a.name;

    // Left panel
    renderLeftPanel(a);

    // Canvas zoom setup
    let canvasEl = document.getElementById('cfg-canvas');
    let svgEl = document.getElementById('cfg-canvas-svg');
    let wrap = document.getElementById('cfg-canvas-wrap');

    // Mouse wheel zoom
    if (wrap && !wrap.dataset.zoomBound) {
        wrap.dataset.zoomBound = 'true';
        wrap.addEventListener('wheel', e => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                setZoom(_canvas.zoom - (e.deltaY > 0 ? 0.05 : -0.05));
            }
        }, { passive: false });
    }

    // Adding zoom buttons to Topbar
    const topbarBtns = document.querySelector('.cfg-canvas-topbar');
    if (topbarBtns && !document.getElementById('cfg-zoom-controls')) {
        const rightSection = document.createElement('div');
        rightSection.style.display = 'flex';
        rightSection.style.gap = '8px';
        rightSection.style.alignItems = 'center';

        const zc = document.createElement('div');
        zc.id = 'cfg-zoom-controls';
        zc.className = 'cfg-zoom-controls';
        zc.innerHTML = `
         <button class="cfg-zoom-btn" id="cfg-zoom-out" title="Zoom Out">-</button>
         <span id="cfg-zoom-lbl">100%</span>
         <button class="cfg-zoom-btn" id="cfg-zoom-in" title="Zoom In">+</button>
      `;
        rightSection.appendChild(zc);

        const addBtn = document.getElementById('cfg-add-node');
        if (addBtn) {
            addBtn.parentNode.removeChild(addBtn);
            rightSection.appendChild(addBtn);
        }
        topbarBtns.appendChild(rightSection);

        document.getElementById('cfg-zoom-in').onclick = () => setZoom(_canvas.zoom + 0.1);
        document.getElementById('cfg-zoom-out').onclick = () => setZoom(_canvas.zoom - 0.1);
    }

    function setZoom(z) {
        _canvas.zoom = Math.min(Math.max(0.4, z), 2.0);
        const scaledCanvas = document.getElementById('cfg-canvas');
        const scaledSvg = document.getElementById('cfg-canvas-svg');

        if (scaledCanvas) {
            scaledCanvas.style.transformOrigin = '0 0';
            scaledCanvas.style.transform = `scale(${_canvas.zoom})`;
        }
        if (scaledSvg) {
            scaledSvg.style.transformOrigin = '0 0';
            scaledSvg.style.transform = `scale(${_canvas.zoom})`;
        }
        const lbl = document.getElementById('cfg-zoom-lbl');
        if (lbl) lbl.textContent = Math.round(_canvas.zoom * 100) + '%';
    }

    // Canvas Init
    if (canvasEl && svgEl) {
        _canvas.nodes = a.workflow.map(n => ({ ...n }));
        _canvas.connections = (a.connections || []).map(c => [...c]);
        _canvas.nextId = _canvas.nodes.length + 1;
        ensureArrowDefs(svgEl);
        renderCanvas(canvasEl, svgEl);
        bindCanvasEvents(canvasEl, svgEl);

        // Center canvas view — new positions are naturally centered
        requestAnimationFrame(() => {
            if (!wrap) return;
            wrap.scrollLeft = 0;
            wrap.scrollTop = 0;
        });
    }

    bindChat();

    // Sliders
    document.querySelectorAll('.cfg-slider').forEach(s => {
        s.addEventListener('input', () => {
            const v = document.getElementById('val-' + s.dataset.id);
            if (v) v.textContent = s.value + (s.dataset.unit || '');
        });
    });

    // Footer buttons
    document.getElementById('cfg-save-btn')?.addEventListener('click', e => {
        const btn = e.target;
        btn.textContent = '✓ Saved';
        btn.style.background = '#34C759';
        setTimeout(() => { btn.textContent = 'Save Configuration'; btn.style.background = ''; }, 1800);
    });
    document.getElementById('cfg-discard-btn')?.addEventListener('click', () => history.back());
}

function renderLeftPanel(a) {
    const panel = document.getElementById('cfg-left-panel');
    if (!panel) return;

    // Description
    const purposeEl = panel.querySelector('#cfg-desc-purpose');
    const problemsEl = panel.querySelector('#cfg-desc-problems');
    if (purposeEl) purposeEl.textContent = a.purpose;
    if (problemsEl) problemsEl.textContent = 'Solve: ' + a.problems;

    // Activation list
    const actList = panel.querySelector('#cfg-activation-list');
    if (actList) {
        actList.innerHTML = a.activation.map(c =>
            '<li contenteditable="true" spellcheck="false">' + c + '</li>'
        ).join('');
    }

    // KB chips
    const kbWrap = panel.querySelector('#cfg-kb-chips');
    if (kbWrap) {
        const iconMap = {
            'crm': '🗄', 'sla': '📋', 'legal': '⚖', 'employee': '👤', 'payroll': '💵',
            'gps': '🛰', 'traffic': '🚦', 'site': '🏢', 'shift': '📅', 'risk': '⚠',
            'history': '📜', 'profile': '🧑', 'patrol': '🚔', 'compliance': '✅',
            'stream': '📡', 'playbook': '📖', 'incident': '🔴', 'output': '📤',
            'state': '🔵', 'master': '⭐', 'api': '🔌', 'google': '🗺',
            'pricing': '💲', 'template': '📐', 'property': '🏠', 'location': '📍',
            'certification': '🏅', 'attendance': '📊', 'performance': '📈',
            'standby': '🟡', 'dispatch': '🚨', 'density': '🔢', 'checkpoint': '📌',
            'visit': '👁', 'dwell': '⏱', 'intelligence': '🧠', 'scheduling': '📅',
            'contract': '📄', 'route': '🗺', 'monitoring': '👁', 'forecast': '🔮',
            'workload': '⚖', 'prediction': '🔮', 'lifecycle': '🔄'
        };
        kbWrap.innerHTML = a.kb.map((src, i) => {
            let icon = '📁';
            const low = src.toLowerCase();
            for (const [k, v] of Object.entries(iconMap)) {
                if (low.includes(k)) { icon = v; break; }
            }
            const connected = i < a.kb.length - 1;
            return '<div class="cfg-kb-chip ' + (connected ? 'active' : '') + '">' +
                '<div class="cfg-kb-icon">' + icon + '</div>' +
                '<span class="cfg-kb-label">' + src + '</span>' +
                '<span class="cfg-kb-badge">' + (connected ? 'Connected' : 'Add') + '</span>' +
                '</div>';
        }).join('');
    }

    // Core settings
    const coreWrap = panel.querySelector('#cfg-core-settings');
    if (coreWrap) {
        coreWrap.innerHTML = a.core.map(c => {
            if (c.type === 'toggle') {
                return '<div class="cfg-setting-row">' +
                    '<div class="cfg-setting-info">' +
                    '<div class="cfg-setting-name">' + c.name + '</div>' +
                    '<div class="cfg-setting-desc">' + c.desc + '</div>' +
                    '</div>' +
                    '<label class="cfg-toggle"><input type="checkbox" ' + (c.enabled ? 'checked' : '') + '><span class="cfg-toggle-track"></span></label>' +
                    '</div>';
            }
            if (c.type === 'slider') {
                return '<div class="cfg-slider-wrap">' +
                    '<div class="cfg-slider-header">' +
                    '<span class="cfg-slider-label">' + c.name + '</span>' +
                    '<span class="cfg-slider-val" id="val-' + c.id + '">' + c.value + c.unit + '</span>' +
                    '</div>' +
                    '<div class="cfg-setting-desc" style="margin-bottom:8px;">' + c.desc + '</div>' +
                    '<input type="range" class="cfg-slider" min="' + c.min + '" max="' + c.max + '" value="' + c.value + '" data-id="' + c.id + '" data-unit="' + c.unit + '">' +
                    '</div>';
            }
            return '';
        }).join('');
    }

    // Guardrails
    const guardWrap = panel.querySelector('#cfg-guardrails');
    if (guardWrap) {
        const html = a.guardrails.map(g => {
            if (g.toggle) {
                return '<div class="cfg-setting-row">' +
                    '<div class="cfg-setting-info"><div class="cfg-setting-name">' + g.name + '</div></div>' +
                    '<label class="cfg-toggle"><input type="checkbox" ' + (g.enabled ? 'checked' : '') + '><span class="cfg-toggle-track"></span></label>' +
                    '</div>';
            }
            return '<div class="cfg-slider-wrap">' +
                '<div class="cfg-slider-header">' +
                '<span class="cfg-slider-label">' + g.name + '</span>' +
                '<span class="cfg-slider-val" id="val-' + g.id + '">' + g.val + g.unit + '</span>' +
                '</div>' +
                '<input type="range" class="cfg-slider" min="' + (g.min || 0) + '" max="' + (g.max || 100) + '" value="' + g.val + '" data-id="' + g.id + '" data-unit="' + g.unit + '">' +
                '</div>';
        }).join('');
        guardWrap.innerHTML = html || '<p class="cfg-empty">No constraints defined.</p>';
    }

    // Notifications
    const notifWrap = panel.querySelector('#cfg-notifications');
    if (notifWrap) {
        notifWrap.innerHTML = a.notifications.map(n =>
            '<div class="cfg-setting-row" style="padding:8px 0;">' +
            '<div class="cfg-setting-name">' + n.name + '</div>' +
            '<label class="cfg-toggle"><input type="checkbox" ' + (n.enabled ? 'checked' : '') + '><span class="cfg-toggle-track"></span></label>' +
            '</div>'
        ).join('');
    }
}

// =============================================
// CANVAS RENDERER
// =============================================
function ensureArrowDefs(svgEl) {
    if (svgEl.querySelector('#cfg-arrow')) return;
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    // Default gray arrow
    const makeMarker = (id, color) => {
        const m = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        m.setAttribute('id', id);
        m.setAttribute('markerWidth', '10'); m.setAttribute('markerHeight', '10');
        m.setAttribute('refX', '8'); m.setAttribute('refY', '5');
        m.setAttribute('orient', 'auto');
        m.setAttribute('markerUnits', 'userSpaceOnUse');
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        p.setAttribute('points', '0 0, 10 5, 0 10');
        p.setAttribute('fill', color);
        m.appendChild(p);
        return m;
    };
    defs.appendChild(makeMarker('cfg-arrow-default', '#C7C7CC'));
    svgEl.prepend(defs);
}

function getOrCreateArrowMarker(svgEl, color) {
    const safeId = 'cfg-arrow-' + color.replace('#', '');
    const defs = svgEl.querySelector('defs');
    if (defs && !defs.querySelector('#' + safeId)) {
        const m = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        m.setAttribute('id', safeId);
        m.setAttribute('markerWidth', '10'); m.setAttribute('markerHeight', '10');
        m.setAttribute('refX', '8'); m.setAttribute('refY', '5');
        m.setAttribute('orient', 'auto');
        m.setAttribute('markerUnits', 'userSpaceOnUse');
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        p.setAttribute('points', '0 0, 10 5, 0 10');
        p.setAttribute('fill', color);
        m.appendChild(p);
        defs.appendChild(m);
    }
    return safeId;
}

// ── Node topology helpers ──────────────────────────────────
function getNodeTypeMeta(nodeId, connections) {
    const inC = connections.filter(c => c[1] === nodeId).length;
    const outC = connections.filter(c => c[0] === nodeId).length;
    let label, chipColor;
    if (inC === 0) { label = 'TRIGGER'; chipColor = '#FF9800'; }
    else if (outC === 0) { label = 'OUTPUT'; chipColor = '#4CAF50'; }
    else if (outC > 1) { label = 'BRANCH'; chipColor = '#9C27B0'; }
    else if (inC > 1) { label = 'MERGE'; chipColor = '#00BCD4'; }
    else { label = 'PROCESS'; chipColor = '#546E7A'; }
    return { label, inC, outC, chipColor };
}

function getSystemTag(title, desc) {
    const t = (title + ' ' + (desc || '')).toLowerCase();
    if (t.match(/\btrigger|\bevent|\buser.input/)) return { tag: 'Input', icon: '⚡' };
    if (t.match(/\blearn|\bfeedback|\bml|\bmodel/)) return { tag: 'ML Engine', icon: '🧠' };
    if (t.match(/\bgps|\btraffic|\blive|\breal.time/)) return { tag: 'Live Data', icon: '📡' };
    if (t.match(/\bcrm|\bdatabase|\blookup|\bsearch/)) return { tag: 'Database', icon: '🗄' };
    if (t.match(/\brisk|\bscor|\bprofile|\bclassif/)) return { tag: 'Risk Engine', icon: '⚠' };
    if (t.match(/\bcompli|\bvalid|\bsla|\bfatigue/)) return { tag: 'Compliance', icon: '✅' };
    if (t.match(/\bconfirm|\bapprov|\breview|\bsupervis/)) return { tag: 'Approval', icon: '👤' };
    if (t.match(/\bsimul|\bdry.run|\bproject/)) return { tag: 'Simulation', icon: '🔬' };
    if (t.match(/\bnotif|\bbroadcast|\bpush|\bupdate/)) return { tag: 'Broadcast', icon: '📢' };
    if (t.match(/\bmap|\broute|\bpath|\bsequenc/)) return { tag: 'Routing', icon: '🗺' };
    if (t.match(/\bdetect|\bmonitor|\bscan|\bwatch/)) return { tag: 'Monitoring', icon: '👁' };
    if (t.match(/\bcommit|\bassign|\bexecut|\bdispatch/)) return { tag: 'Execution', icon: '⚙' };
    if (t.match(/\bgenerat|\bdraft|\btemplate|\bbuild/)) return { tag: 'Generator', icon: '📐' };
    if (t.match(/\banalyti|\bperform|\bmetric|\bscore/)) return { tag: 'Analytics', icon: '📊' };
    return { tag: 'Process', icon: '●' };
}

function renderCanvas(canvasEl, svgEl) {
    canvasEl.innerHTML = '';
    const oldDefs = svgEl.querySelector('defs');
    svgEl.innerHTML = '';
    if (oldDefs) svgEl.appendChild(oldDefs);
    else ensureArrowDefs(svgEl);

    // Render nodes first so we can measure actual heights
    _canvas.nodes.forEach(node => canvasEl.appendChild(makeNode(node, canvasEl, svgEl)));

    // Now draw lines using actual rendered DOM heights
    _canvas.connections.forEach(([fId, tId]) => {
        const f = _canvas.nodes.find(n => n.id === fId);
        const t = _canvas.nodes.find(n => n.id === tId);
        if (f && t) {
            const fromEl = canvasEl.querySelector(`[data-id="${fId}"]`);
            const fromH = fromEl ? fromEl.offsetHeight : 130;
            drawLine(svgEl, f, t, fromH);
        }
    });
}

function drawLine(svgEl, from, to, fromHeight) {
    const NODE_W = 240;
    const h = (fromHeight || 130);
    const PORT_R = 8;  // half of port 12px + small gap
    const x1 = from.x + NODE_W / 2;
    const y1 = from.y + h;  // bottom of from-node (port sits just below)
    const x2 = to.x + NODE_W / 2;
    const y2 = to.y; // top of to-node
    const cp = Math.max(40, Math.abs(y2 - y1) * 0.45);
    const d = `M${x1},${y1} C${x1},${y1 + cp} ${x2},${y2 - cp} ${x2},${y2}`;
    const lineColor = from.color || '#C7C7CC';
    const markerId = getOrCreateArrowMarker(svgEl, lineColor);

    // Soft glow
    const glow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    glow.setAttribute('d', d); glow.setAttribute('fill', 'none');
    glow.setAttribute('stroke', lineColor); glow.setAttribute('stroke-width', '7');
    glow.setAttribute('stroke-opacity', '0.10'); glow.setAttribute('stroke-linecap', 'round');
    svgEl.appendChild(glow);

    // Main line
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d); path.setAttribute('fill', 'none');
    path.setAttribute('stroke', lineColor); path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-opacity', '0.70'); path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('marker-end', `url(#${markerId})`);
    svgEl.appendChild(path);
}

function redrawLines(svgEl, canvasEl) {
    const defs = svgEl.querySelector('defs');
    svgEl.innerHTML = '';
    if (defs) svgEl.appendChild(defs);
    _canvas.connections.forEach(([fId, tId]) => {
        const f = _canvas.nodes.find(n => n.id === fId);
        const t = _canvas.nodes.find(n => n.id === tId);
        if (f && t) {
            const fromEl = canvasEl ? canvasEl.querySelector(`[data-id="${fId}"]`) : null;
            const fromH = fromEl ? fromEl.offsetHeight : 130;
            drawLine(svgEl, f, t, fromH);
        }
    });
}

function makeNode(node, canvasEl, svgEl) {
    const el = document.createElement('div');
    el.className = 'cnv-node';
    el.dataset.id = node.id;
    el.style.cssText = 'left:' + node.x + 'px; top:' + node.y + 'px;';

    const hexToRgba = (hex, alpha) => {
        let r = 0, g = 0, b = 0;
        if (hex && hex.length >= 4) {
            r = parseInt(hex.length === 4 ? hex[1] + hex[1] : hex.substring(1, 3), 16);
            g = parseInt(hex.length === 4 ? hex[2] + hex[2] : hex.substring(3, 5), 16);
            b = parseInt(hex.length === 4 ? hex[3] + hex[3] : hex.substring(5, 7), 16);
        }
        return `rgba(${isNaN(r) ? 142 : r}, ${isNaN(g) ? 142 : g}, ${isNaN(b) ? 147 : b}, ${alpha})`;
    };
    const cColor = node.color || '#8E8E93';

    // Step number and clean title
    const stepMatch = node.title.match(/^([\d]+[a-z]?[ab]?)\./);
    const stepNum = stepMatch ? stepMatch[1] : '';
    const titleText = node.title.replace(/^[\d]+[a-z]?[ab]?\.\s*/, '').replace(/^[a-z]\.\s*/i, '').trim();

    // Topology metadata
    const { label: typeLabel, inC, outC, chipColor } = getNodeTypeMeta(node.id, _canvas.connections);
    const { tag: sysTag, icon: sysIcon } = getSystemTag(node.title, node.desc);

    // Type label color bg
    const typeBg = {
        TRIGGER: '#FFF3E0', PROCESS: '#F3F4F6',
        BRANCH: '#F3E5F5', MERGE: '#E0F7FA', OUTPUT: '#E8F5E9'
    }[typeLabel] || '#F3F4F6';
    const typeText = {
        TRIGGER: '#E65100', PROCESS: '#546E7A',
        BRANCH: '#6A1B9A', MERGE: '#006064', OUTPUT: '#1B5E20'
    }[typeLabel] || '#546E7A';

    el.innerHTML =
        // Left accent stripe
        `<div class="cnv-accent" style="background:${cColor}; z-index:1;"></div>` +

        // ── HEADER ──────────────────────────────
        `<div class="cnv-node-header">` +
        `<div class="cnv-step-badge" style="background:${hexToRgba(cColor, 0.13)};color:${cColor};border-color:${hexToRgba(cColor, 0.28)};">${stepNum}</div>` +
        `<div class="cnv-header-text">` +
        `<div class="cnv-title" contenteditable="true" spellcheck="false">${titleText}</div>` +
        `<div class="cnv-type-chip" style="background:${typeBg};color:${typeText}">${typeLabel}</div>` +
        `</div>` +
        `<div class="cnv-status-dot" style="background:${cColor};"></div>` +
        `</div>` +

        // ── BODY ────────────────────────────────
        `<div class="cnv-node-body">` +
        `<div class="cnv-desc" contenteditable="true" spellcheck="false">${node.desc || ''}</div>` +
        `<div class="cnv-meta-row">` +
        `<span class="cnv-meta-io">` +
        `<span class="cnv-io-dir cnv-io-in">↓ ${inC} in</span>` +
        `<span class="cnv-io-sep">·</span>` +
        `<span class="cnv-io-dir cnv-io-out">↑ ${outC} out</span>` +
        `</span>` +
        `<span class="cnv-sys-tag">${sysIcon} ${sysTag}</span>` +
        `</div>` +
        `</div>` +

        // ── FOOTER ──────────────────────────────
        `<div class="cnv-node-footer">` +
        `<div class="cnv-actions">` +
        `<button class="cnv-btn cnv-btn-connect" title="Connect">` +
        `<svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2"><circle cx="3" cy="8" r="2"/><circle cx="13" cy="8" r="2"/><path d="M5 8h6" stroke-linecap="round"/></svg>Link` +
        `</button>` +
        `<button class="cnv-btn cnv-btn-delete" title="Delete">` +
        `<svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4l8 8M12 4L4 12"/></svg>` +
        `</button>` +
        `</div>` +
        `</div>` +

        // Output port
        `<div class="cnv-port" title="Drag to connect"></div>`;

    // Drag
    let dragging = false, ox = 0, oy = 0;
    el.addEventListener('mousedown', e => {
        if (e.target.closest('[contenteditable]') || e.target.closest('.cnv-btn') || e.target.closest('.cnv-port')) return;
        dragging = true;
        const r = canvasEl.getBoundingClientRect();
        ox = (e.clientX - r.left) / _canvas.zoom - node.x;
        oy = (e.clientY - r.top) / _canvas.zoom - node.y;
        el.style.zIndex = 50; el.classList.add('dragging');
        e.preventDefault();
    });
    document.addEventListener('mousemove', e => {
        if (!dragging) return;
        const r = canvasEl.getBoundingClientRect();
        node.x = Math.max(0, (e.clientX - r.left) / _canvas.zoom - ox);
        node.y = Math.max(0, (e.clientY - r.top) / _canvas.zoom - oy);
        el.style.left = node.x + 'px';
        el.style.top = node.y + 'px';
        redrawLines(svgEl, canvasEl);
    });
    document.addEventListener('mouseup', () => { if (dragging) { dragging = false; el.style.zIndex = 10; el.classList.remove('dragging'); } });

    // Port drag to connect
    el.querySelector('.cnv-port').addEventListener('mousedown', e => {
        e.stopPropagation(); e.preventDefault();
        _canvas.connecting = node.id;
        canvasEl.style.cursor = 'crosshair';
    });

    // Connect button
    el.querySelector('.cnv-btn-connect').addEventListener('click', e => {
        e.stopPropagation();
        _canvas.connecting = node.id;
        canvasEl.style.cursor = 'crosshair';
        showCanvasToast(canvasEl, 'Click another node to connect');
    });

    // Accept connection
    el.addEventListener('click', e => {
        if (!_canvas.connecting || _canvas.connecting === node.id) return;
        const exists = _canvas.connections.some(c =>
            (c[0] === _canvas.connecting && c[1] === node.id) ||
            (c[0] === node.id && c[1] === _canvas.connecting)
        );
        if (!exists) {
            _canvas.connections.push([_canvas.connecting, node.id]);
            renderCanvas(canvasEl, svgEl);
        }
        _canvas.connecting = null;
        canvasEl.style.cursor = '';
    });

    // Delete
    el.querySelector('.cnv-btn-delete').addEventListener('click', e => {
        e.stopPropagation();
        _canvas.nodes = _canvas.nodes.filter(n => n.id !== node.id);
        _canvas.connections = _canvas.connections.filter(c => c[0] !== node.id && c[1] !== node.id);
        renderCanvas(canvasEl, svgEl);
    });

    return el;
}

function bindCanvasEvents(canvasEl, svgEl) {
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && _canvas.connecting) {
            _canvas.connecting = null;
            canvasEl.style.cursor = '';
        }
    });
    document.getElementById('cfg-add-node')?.addEventListener('click', () => {
        const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4', '#FFB300'];
        const id = 'n' + (++_canvas.nextId);
        _canvas.nodes.push({
            id, title: 'New Step', desc: 'Click to edit',
            x: 80 + Math.random() * 300,
            y: 80 + Math.random() * 300,
            color: colors[_canvas.nextId % colors.length]
        });
        renderCanvas(canvasEl, svgEl);
        showCanvasToast(canvasEl, 'Node added — drag to reposition');
    });
}

function showCanvasToast(canvasEl, msg) {
    const t = document.createElement('div');
    t.className = 'cnv-toast';
    t.textContent = msg;
    canvasEl.appendChild(t);
    setTimeout(() => t.remove(), 2400);
}

// =============================================
// FLOATING CHAT
// =============================================
const AI_CHAT_REPLIES = {
    knowledge: "Got it! I've queued a new Knowledge Base connection. Check the KB section on the left to configure it.",
    workflow: "Workflow updated. A new step has been added to the canvas. Drag it into position and connect it.",
    rule: "New guardrail rule added. Review it in the Guardrails section below the Core Settings.",
    schedule: "Updated the scheduling parameters. The new settings will take effect on the next roster generation.",
    default: "I've processed your request and updated the configuration. Review the relevant section on the left."
};

function bindChat() {
    const input = document.getElementById('cfg-chat-input');
    const opts = document.getElementById('cfg-chat-opts');
    const wrapper = document.getElementById('cfg-chat-wrapper');
    const send = document.getElementById('cfg-chat-send');
    const resp = document.getElementById('cfg-chat-resp');
    if (!input) return;

    input.addEventListener('focus', () => {
        opts?.classList.add('show');
        wrapper?.classList.add('focused');
    });
    document.addEventListener('click', e => {
        if (!document.getElementById('cfg-floating-chat')?.contains(e.target)) {
            opts?.classList.remove('show');
            wrapper?.classList.remove('focused');
        }
    });

    opts?.querySelectorAll('.cfg-chat-opt').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            input.value = btn.dataset.prompt;
            opts.classList.remove('show');
            sendAIMessage(input, resp, send);
        });
    });

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && input.value.trim()) { e.preventDefault(); sendAIMessage(input, resp, send); }
    });
    send?.addEventListener('click', () => { if (input.value.trim()) sendAIMessage(input, resp, send); });
}

function sendAIMessage(inputEl, respEl, sendBtn) {
    const msg = inputEl.value.trim();
    if (!msg) return;
    inputEl.value = '';
    if (sendBtn) sendBtn.disabled = true;
    if (respEl) {
        respEl.style.display = 'block';
        respEl.innerHTML = '<div class="cfg-typing"><span></span><span></span><span></span></div>';
    }
    setTimeout(() => {
        const low = msg.toLowerCase();
        let reply = AI_CHAT_REPLIES.default;
        if (low.includes('knowledge') || low.includes('base')) reply = AI_CHAT_REPLIES.knowledge;
        else if (low.includes('workflow') || low.includes('node')) reply = AI_CHAT_REPLIES.workflow;
        else if (low.includes('rule') || low.includes('guardrail')) reply = AI_CHAT_REPLIES.rule;
        else if (low.includes('schedule') || low.includes('shift')) reply = AI_CHAT_REPLIES.schedule;
        typeReply(respEl, reply, () => { if (sendBtn) sendBtn.disabled = false; });
    }, 1200);
}

function typeReply(el, text, cb) {
    el.innerHTML = '<span class="cfg-ai-text"></span>';
    const span = el.querySelector('.cfg-ai-text');
    let i = 0;
    const t = setInterval(() => {
        span.textContent += text[i++];
        if (i >= text.length) { clearInterval(t); if (cb) cb(); }
    }, 16);
}
