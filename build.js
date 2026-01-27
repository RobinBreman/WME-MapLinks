const fs = require('fs');
const path = require('path');

// Read the TypeScript source to extract the userscript header
const tsFile = path.join(__dirname, 'src', 'wme-maplinks.ts');
const tsContent = fs.readFileSync(tsFile, 'utf8');

// Extract the header (everything between // ==UserScript== and // ==/UserScript==)
const headerMatch = tsContent.match(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/);
const header = headerMatch ? headerMatch[0] : '';

if (!header) {
    console.error('Warning: No userscript header found in source file!');
}

// Read the compiled JavaScript
const jsFile = path.join(__dirname, 'dist', 'wme-maplinks.js');
let jsContent = fs.readFileSync(jsFile, 'utf8');

// Remove the header from compiled JS if it exists (TypeScript may have kept it as comments)
jsContent = jsContent.replace(/\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==\n*/g, '');

// Remove import statements that were kept as comments or actual imports
jsContent = jsContent.replace(/^import\s+.*?;\s*$/gm, '');
jsContent = jsContent.replace(/^export\s+.*?;\s*$/gm, '');

// Wrap the compiled code in an IIFE and add the header
const finalContent = `${header}

(function () {
    'use strict';

${jsContent.trim()}
})();
//# sourceMappingURL=wme-maplinks.js.map
`;

// Write the final file
const outputFile = path.join(__dirname, 'wme-maplinks.js');
fs.writeFileSync(outputFile, finalContent, 'utf8');
console.log('✓ Generated wme-maplinks.js');

// Copy source map if it exists
const sourceMapFile = path.join(__dirname, 'dist', 'wme-maplinks.js.map');
const sourceMapOutput = path.join(__dirname, 'wme-maplinks.js.map');
if (fs.existsSync(sourceMapFile)) {
    const sourceMap = JSON.parse(fs.readFileSync(sourceMapFile, 'utf8'));
    // Update the source map to point to the correct source file location
    sourceMap.sources = sourceMap.sources.map(source => {
        if (source.startsWith('../src/')) {
            return source.replace('../src/', 'src/');
        }
        return source;
    });
    fs.writeFileSync(sourceMapOutput, JSON.stringify(sourceMap, null, 2), 'utf8');
    console.log('✓ Copied source map');
}

// Copy the meta.js file to root
const metaSourceFile = path.join(__dirname, 'dist', 'wme-maplinks.meta.js');
const metaOutputFile = path.join(__dirname, 'wme-maplinks.meta.js');
if (fs.existsSync(metaSourceFile)) {
    fs.copyFileSync(metaSourceFile, metaOutputFile);
    console.log('✓ Copied wme-maplinks.meta.js');
}

// Copy any other .js files from dist to root
const distDir = path.join(__dirname, 'dist');
const distFiles = fs.readdirSync(distDir);

distFiles.forEach(file => {
    if (file.endsWith('.js') && file !== 'wme-maplinks.js' && file !== 'wme-maplinks.meta.js') {
        const sourcePath = path.join(distDir, file);
        const destPath = path.join(__dirname, file);
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✓ Copied ${file}`);
    }
});

console.log('\nBuild complete!');
