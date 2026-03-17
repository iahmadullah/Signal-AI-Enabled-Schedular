const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('PAGE ERROR:', msg.text());
        } else {
            console.log('PAGE LOG:', msg.text());
        }
    });

    page.on('pageerror', error => {
        console.log('PAGE EXCEPTION:', error.message);
    });

    page.on('requestfailed', request => {
        console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
    });

    await page.goto('http://localhost:8000/agent-hub.html', { waitUntil: 'networkidle0' });

    const jsCode = `
    const res = {
        agentPageConfigsExists: typeof AGENT_PAGE_CONFIGS !== 'undefined',
        canvasExists: typeof _canvas !== 'undefined',
        agentHubExists: typeof renderHubWorkflow !== 'undefined'
    };
    JSON.stringify(res);
  `;
    const evalResult = await page.evaluate(jsCode);
    console.log('EVAL:', evalResult);

    await browser.close();
})();
