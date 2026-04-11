const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'process.html', 'industries.html', 'contact.html'];

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');

  // Replace Header & Mobile Menu Logos
  html = html.replace(/<a href="index\.html" class="logo" aria-label="Go Green Eco Tech Home">[\s\S]*?<\/a>/g, 
    `<a href="index.html" class="logo" aria-label="Go Green Eco Tech Home">
        <img src="http://gogreenecotech.in/wp-content/uploads/2022/05/Go-Green-Eco-logo.png" alt="Go Green Eco Tech Logo" style="height: 50px; width: auto; object-fit: contain;">
      </a>`);

  // Replace Footer Logo (note the class="logo" vs the aria-label one)
  // Footer logo in HTML is currently: <a href="index.html" class="logo">...</a>
  html = html.replace(/<a href="index\.html" class="logo">[\s\S]*?<\/a>/g, 
    `<a href="index.html" class="logo">
            <img src="https://gogreenecotech.in/wp-content/uploads/2022/05/cropped-Go_Green_Eco_logo-removebg-preview-300x300.png" alt="Go Green Eco Tech Footer Logo" style="height: 80px; width: auto; object-fit: contain;">
          </a>`);

  fs.writeFileSync(file, html);
  console.log(`Updated logos in ${file}`);
}
