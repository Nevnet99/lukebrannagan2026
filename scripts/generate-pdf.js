import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';


const OUTPUT_DIR = 'public/assets';
const OUTPUT_FILE = 'Luke_Brannagan_CV.pdf';
const LOCAL_URL = 'http://localhost:4321/cv'; 

(async () => {
  console.log('🚀 Starting PDF generation...');
  console.log(`🎯 Target: ${LOCAL_URL}`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 2. Launch the headless browser
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  
  const page = await browser.newPage();

  try {
    await page.goto(LOCAL_URL, {
      waitUntil: 'networkidle0', // Wait until all fonts, icons, and hydration are finished
      timeout: 60000 // 60 second timeout just in case
    });
  } catch (e) {
    console.error(`❌ Error: Could not connect to ${LOCAL_URL}.`);
    console.error('👉 Make sure your Astro server is running! (npm run dev)');
    await browser.close();
    process.exit(1);
  }

  await page.emulateMediaType('print');

  await page.pdf({
    path: path.join(OUTPUT_DIR, OUTPUT_FILE),
    format: 'A4',
    printBackground: true, 
    margin: {
      top: '15mm',
      right: '15mm',
      bottom: '15mm',
      left: '15mm'
    },
    displayHeaderFooter: false 
  });

  await browser.close();
  console.log(`✅ PDF generated successfully: ${OUTPUT_DIR}/${OUTPUT_FILE}`);
})();
