const fs = require('fs');

// Read the index to get the header and footer
let baseHtml = fs.readFileSync('index.html', 'utf8');

const navRegex = /([\s\S]*?)<!-- \s*={20} HERO/;
const footerRegex = /(<!-- \s*={20} FOOTER[\s\S]*)/;

const navMatch = baseHtml.match(navRegex);
const footerMatch = baseHtml.match(footerRegex);

if (!navMatch || !footerMatch) {
  console.error("Could not parse Header or Footer from index.html");
  process.exit(1);
}

const headerContent = navMatch[1];
const footerContent = footerMatch[1];

// Content for Hazardous Waste
const hwContent = `
  <!-- ==================== PAGE HEADER ==================== -->
  <div class="page-header fade-in">
    <div class="container">
      <h1 class="page-header-title">Hazardous Waste Management</h1>
      <p class="page-header-desc" style="color: var(--green-100); max-width: 600px; margin: 0 auto; margin-top: 1rem;">
        Safe, compliant, and end-to-end solutions for handling, transport, and disposal of industrial hazardous materials.
      </p>
    </div>
  </div>

  <section class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; align-items: center;">
        <div class="fade-in">
          <h2 style="font-size: var(--fs-3xl); font-weight: var(--fw-extrabold); color: var(--gray-900); margin-bottom: 1.5rem;">
            Responsible <span class="text-green">Hazardous Waste</span> Processing
          </h2>
          <p style="color: var(--gray-500); margin-bottom: 1.5rem;">
            Go Green Eco Tech provides specialized services for managing hazardous industrial waste. Our processes ensure strict adherence to the guidelines laid down by the Central Pollution Control Board (CPCB) and State Pollution Control Boards.
          </p>
          <p style="color: var(--gray-500); margin-bottom: 1.5rem;">
            We employ scientifically sound techniques such as Co-Processing, Safe Secured Landfilling, and Incineration depending on the exact characterization of the waste. By minimizing environmental footprints, we help industries achieve zero-liability compliance.
          </p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 1rem;">
            <li style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); font-weight: var(--fw-medium);">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              Collection & Segregation at Source
            </li>
            <li style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); font-weight: var(--fw-medium);">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              GPS-Tracked Specialized Fleet Transport
            </li>
            <li style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); font-weight: var(--fw-medium);">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              Scientific Pre-processing and Co-processing
            </li>
            <li style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); font-weight: var(--fw-medium);">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              100% Documentation and Regulatory Compliance
            </li>
          </ul>
        </div>
        <div class="fade-in" style="background: var(--green-50); padding: 3rem; border-radius: var(--radius-lg); border: 1px solid var(--green-100); text-align: center;">
            <svg viewBox="0 0 48 48" fill="none" style="width: 120px; height: 120px; margin-bottom: 2rem; margin-inline: auto;">
              <rect x="4" y="4" width="40" height="40" rx="12" fill="#16a34a" opacity="0.1"/>
              <path d="M24 14l-2 4h4l-2 4" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 26h16v8H16z" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18 34v2M30 34v2" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>
              <path d="M20 26v-2a4 4 0 018 0v2" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>
              <circle cx="36" cy="12" r="4" fill="#ef4444" opacity="0.8"/>
            </svg>
            <h3 style="font-size: var(--fs-xl); font-weight: var(--fw-bold); margin-bottom: 1rem;">Have Hazardous Waste?</h3>
            <p style="color: var(--gray-500); margin-bottom: 2rem;">Let our expert team handle your complex waste disposal needs safely and compliantly.</p>
            <a href="contact.html" class="btn btn-primary" style="width: 100%;">Request Solutions</a>
        </div>
      </div>
    </div>
  </section>
`;

const hwFull = headerContent + hwContent + footerContent;
fs.writeFileSync('hazardous-waste.html', hwFull);
console.log("Created hazardous-waste.html");

// Content for Non-Hazardous Waste
const nhwContent = `
  <!-- ==================== PAGE HEADER ==================== -->
  <div class="page-header fade-in">
    <div class="container">
      <h1 class="page-header-title">Non-Hazardous Waste Management</h1>
      <p class="page-header-desc" style="color: var(--green-100); max-width: 600px; margin: 0 auto; margin-top: 1rem;">
        Transforming everyday industrial byproducts into valuable resources for a sustainable, circular economy.
      </p>
    </div>
  </div>

  <section class="section">
    <div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; align-items: center;">
        <div class="fade-in">
          <h2 style="font-size: var(--fs-3xl); font-weight: var(--fw-extrabold); color: var(--gray-900); margin-bottom: 1.5rem;">
            Maximizing Resource <span class="text-green">Recovery</span>
          </h2>
          <p style="color: var(--gray-500); margin-bottom: 1.5rem;">
            Our non-hazardous waste management solutions focus heavily on recycling and resource recovery. Utilizing state-of-the-art sorting and processing technologies, we ensure the minimal possible volume ends up in landfills.
          </p>
          <p style="color: var(--gray-500); margin-bottom: 1.5rem;">
            From industrial packaging (plastics, cardboard, wood) to common production byproducts, we sort, bale, shred, and repurpose materials, giving secondary raw materials a new life in manufacturing supply chains.
          </p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 1rem;">
             <li style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); font-weight: var(--fw-medium);">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              Comprehensive Waste Characterization
            </li>
            <li style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); font-weight: var(--fw-medium);">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              Advanced Material Sorting
            </li>
            <li style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); font-weight: var(--fw-medium);">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              Plastic & Paper Recycling Programs
            </li>
            <li style="display: flex; align-items: center; gap: 0.5rem; color: var(--gray-700); font-weight: var(--fw-medium);">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              Zero-Waste to Landfill Initiatives
            </li>
          </ul>
        </div>
        <div class="fade-in" style="background: var(--green-50); padding: 3rem; border-radius: var(--radius-lg); border: 1px solid var(--green-100); text-align: center;">
            <svg viewBox="0 0 48 48" fill="none" style="width: 120px; height: 120px; margin-bottom: 2rem; margin-inline: auto;">
              <rect x="4" y="4" width="40" height="40" rx="12" fill="#16a34a" opacity="0.1"/>
              <path d="M16 32l4-8h8l4 8" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 32h20" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>
              <circle cx="24" cy="20" r="4" stroke="#16a34a" stroke-width="2"/>
              <path d="M24 16v-2M28 20h2M20 20h-2M24 24v2" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <h3 style="font-size: var(--fs-xl); font-weight: var(--fw-bold); margin-bottom: 1rem;">Boost Your Recycling Rate</h3>
            <p style="color: var(--gray-500); margin-bottom: 2rem;">Discover how our solutions can turn your non-hazardous waste into a sustainable asset.</p>
            <a href="contact.html" class="btn btn-primary" style="width: 100%;">Get Started Today</a>
        </div>
      </div>
    </div>
  </section>
`;

const nhwFull = headerContent + nhwContent + footerContent;
fs.writeFileSync('non-hazardous-waste.html', nhwFull);
console.log("Created non-hazardous-waste.html");

// Update index.html and services.html links
function replaceLinksInFile(file) {
  if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      content = content.replace(/https:\/\/gogreenecotech\.in\/hazardous-waste\//g, 'hazardous-waste.html');
      content = content.replace(/https:\/\/gogreenecotech\.in\/non-hazardous-waste\//g, 'non-hazardous-waste.html');
      fs.writeFileSync(file, content);
      console.log("Updated links in " + file);
  }
}

replaceLinksInFile('index.html');
replaceLinksInFile('services.html');

