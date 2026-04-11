const fs = require('fs');
const files = ['hazardous-waste.html', 'non-hazardous-waste.html', 'about.html', 'process.html', 'services.html', 'industries.html', 'index.html'];

files.forEach(file => {
    if(!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the container div
    content = content.replace(/<div\s+style="background:\s*var\(--green-50\);\s*padding:\s*1.5rem;\s*border-left:\s*4px\s*solid\s*var\(--primary\);\s*border-radius:\s*0\s*var\(--radius-md\)\s*var\(--radius-md\)\s*0;">/g, '<div class="info-box">');
    
    // Replace the strong tag
    content = content.replace(/<strong style="color:\s*var\(--green-800\);">([^<]+)<\/strong>/g, '<h4 class="info-box-title">$1</h4>');
    
    // Replace green text span
    content = content.replace(/<span class="text-green">/g, '<span class="gradient-text-emerald">');

    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
});
