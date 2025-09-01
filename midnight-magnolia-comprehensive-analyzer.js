// Midnight Magnolia Comprehensive Asset & Document Analyzer
// Scans for product/design assets, analyzes quality, detects duplicates, and reviews documents for mission keywords
// Generates a text report of high-value assets and documents

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const sharp = require('sharp'); // Requires 'sharp' package for image analysis
const pdfParse = require('pdf-parse'); // Requires 'pdf-parse' for PDF analysis
const mammoth = require('mammoth'); // Requires 'mammoth' for DOCX analysis

const destFolder = '/Users/latishaimara/midnight-magnolia-grimoire-1/midnight-magnolia-assets';
const reportFile = '/Users/latishaimara/midnight-magnolia-grimoire-1/midnight-magnolia-assets-report.txt';

const assetExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];
const docExtensions = ['.pdf', '.docx', '.csv', '.xlsx'];
const themeKeywords = [
  'neurodivergent','adhd','planner','journal','legal','budget','healthcare','black women','geneaology','research','event planning','social justice','poetry','magic','black girl','conscious','free domain books','free domain pictures','love','self-love','joy','black joy','black history','slavery','juneteenth','black panthers','bell hooks','audre lorde','alice walker','octavia butler','science fiction','nina simone','tarot','automation','notion','business','james baldwin','scott cunningham','luiseh teish','jambalaya','oyotunji','yoruba','hoodoo','new orleans','voodoo','gullah geechee','phifer','vincent','graves','queer','bisexual','creating change','rockwood','open society','parole','expungement','pardon','herbal','wedding','education','charleston','greensboro','savannah','south carolina','north carolina','Moya','Muhiyyidin','d\'baha','activism','denmark vesey'
];

if (!fs.existsSync(destFolder)) {
  fs.mkdirSync(destFolder);
}

let seenHashes = new Set();
let reportLines = [];

function hashFile(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

function analyzeImage(filePath, fileName) {
  return sharp(filePath)
    .metadata()
    .then(meta => {
      let quality = 'high';
      if (meta.width < 600 || meta.height < 600 || meta.size < 100 * 1024) quality = 'low';
      reportLines.push(`IMAGE: ${fileName} | ${meta.width}x${meta.height} | ${Math.round(meta.size/1024)}KB | Quality: ${quality}`);
    })
    .catch(() => {
      reportLines.push(`IMAGE: ${fileName} | Unable to analyze.`);
    });
}

function analyzeDocument(filePath, fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === '.pdf') {
    return pdfParse(fs.readFileSync(filePath)).then(data => {
      let found = themeKeywords.filter(k => data.text.toLowerCase().includes(k));
      if (found.length > 0) {
        reportLines.push(`DOCUMENT: ${fileName} | Keywords: ${found.join(', ')}`);
      }
    }).catch(() => {
      reportLines.push(`DOCUMENT: ${fileName} | Unable to analyze PDF.`);
    });
  } else if (ext === '.docx') {
    return mammoth.extractRawText({path: filePath}).then(result => {
      let found = themeKeywords.filter(k => result.value.toLowerCase().includes(k));
      if (found.length > 0) {
        reportLines.push(`DOCUMENT: ${fileName} | Keywords: ${found.join(', ')}`);
      }
    }).catch(() => {
      reportLines.push(`DOCUMENT: ${fileName} | Unable to analyze DOCX.`);
    });
  } else {
    // For CSV/XLSX, just note presence
    reportLines.push(`DOCUMENT: ${fileName} | Format: ${ext}`);
    return Promise.resolve();
  }
}

async function scanAndAnalyze(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['/System', '/Library', '/Applications', '/private', '/dev', '/Volumes', '/Network'].includes(fullPath)) {
        await scanAndAnalyze(fullPath);
      }
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (assetExtensions.includes(ext)) {
        const hash = hashFile(fullPath);
        if (!seenHashes.has(hash)) {
          seenHashes.add(hash);
          const destPath = path.join(destFolder, entry.name);
          if (!fs.existsSync(destPath)) {
            fs.copyFileSync(fullPath, destPath);
          }
          await analyzeImage(fullPath, entry.name);
        } else {
          reportLines.push(`DUPLICATE IMAGE: ${entry.name}`);
        }
      } else if (docExtensions.includes(ext)) {
        await analyzeDocument(fullPath, entry.name);
      }
    }
  }
}

(async () => {
  const homeDir = os.homedir();
  await scanAndAnalyze(homeDir);
  fs.writeFileSync(reportFile, reportLines.join('\n'));
  console.log('Comprehensive asset and document analysis complete. See midnight-magnolia-assets-report.txt for details.');
})();
