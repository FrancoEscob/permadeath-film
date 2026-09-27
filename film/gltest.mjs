import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({executablePath:'/usr/bin/chromium', headless:true, args:['--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--enable-gpu','--allow-file-access-from-files']});
const p = await b.newPage();
await p.goto('file:///tmp/gltest.html'); await new Promise(r=>setTimeout(r,500));
console.log(await p.evaluate(()=>window.info));
await b.close();
