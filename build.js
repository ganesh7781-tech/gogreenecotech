const fs = require('fs');

let baseHtml = fs.readFileSync('index.html', 'utf8');

// 1. Update navigation & CTA links to point to HTML pages instead of IDs
baseHtml = baseHtml.replace(/href="#home"/g, 'href="index.html"');
baseHtml = baseHtml.replace(/href="#about"/g, 'href="about.html"');
baseHtml = baseHtml.replace(/href="#services"/g, 'href="services.html"');
baseHtml = baseHtml.replace(/href="#process"/g, 'href="process.html"');
baseHtml = baseHtml.replace(/href="#industries"/g, 'href="industries.html"');
baseHtml = baseHtml.replace(/href="#contact"/g, 'href="contact.html"');

// 2. Update the Services section to only show the two requested services
const servicesPattern = /<div class="services-grid">[\s\S]*?<\/section>/;
const newServicesContent = `<div class="services-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); max-width: 900px; margin: 0 auto;">
        <div class="service-card fade-in">
          <div class="service-icon">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="4" y="4" width="40" height="40" rx="12" fill="#16a34a" opacity="0.1"/>
              <path d="M24 14l-2 4h4l-2 4" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 26h16v8H16z" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18 34v2M30 34v2" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>
              <path d="M20 26v-2a4 4 0 018 0v2" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>
              <circle cx="36" cy="12" r="4" fill="#ef4444" opacity="0.8"/>
              <path d="M36 10v3M36 14.5v.5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <h3 class="service-title">Hazardous Waste Management</h3>
          <p class="service-desc">Safe collection, transport, and disposal of hazardous industrial waste with full compliance and real-time tracking.</p>
          <a href="https://gogreenecotech.in/hazardous-waste/" target="_blank" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">View Service</a>
        </div>

        <div class="service-card fade-in">
          <div class="service-icon">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="4" y="4" width="40" height="40" rx="12" fill="#16a34a" opacity="0.1"/>
              <path d="M16 32l4-8h8l4 8" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 32h20" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>
              <circle cx="24" cy="20" r="4" stroke="#16a34a" stroke-width="2"/>
              <path d="M24 16v-2M28 20h2M20 20h-2M24 24v2" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <h3 class="service-title">Non-Hazardous Waste</h3>
          <p class="service-desc">Efficient sorting, processing, and recycling of non-hazardous industrial waste streams to maximize resource recovery.</p>
          <a href="https://gogreenecotech.in/non-hazardous-waste/" target="_blank" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">View Service</a>
        </div>
      </div>
    </div>
  </section>`;

baseHtml = baseHtml.replace(servicesPattern, newServicesContent);

// Save homepage updates
fs.writeFileSync('index.html', baseHtml);
console.log("Updated index.html");

// 3. Generate inner pages
function createSubpage(filename, title, sectionId) {
    const sectionRegex = new RegExp(`<section class="${sectionId.replace('-','.*?')} section" id="${sectionId}">[\\s\\S]*?<\\/section>`);
    const match = baseHtml.match(sectionRegex);
    if (!match) {
        console.log("Could not find section: " + sectionId);
        return;
    }
    
    // Replace everything between Hero and Footer with just the page header + targeted section
    const fullReplacementRegex = /<section class="hero" id="home">[\s\S]*?<footer class="footer">/;
    
    const innerContent = `
  <!-- ==================== PAGE HEADER ==================== -->
  <div class="page-header fade-in">
    <div class="container">
      <h1 class="page-header-title">${title}</h1>
    </div>
  </div>

  ${match[0]}

  <footer class="footer">`;

    let generatedHtml = baseHtml.replace(fullReplacementRegex, innerContent);
    fs.writeFileSync(filename, generatedHtml);
    console.log("Generated " + filename);
}

createSubpage('about.html', 'About Us', 'about');
createSubpage('services.html', 'Our Services', 'services');
createSubpage('process.html', 'Our Process', 'process');
createSubpage('industries.html', 'Industries We Serve', 'industries');
createSubpage('contact.html', 'Contact Us', 'contact');
