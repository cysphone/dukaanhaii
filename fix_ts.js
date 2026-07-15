const fs = require('fs');
let content = fs.readFileSync('src/lib/templates.ts', 'utf8');

// The objects missing the 'name' field
content = content.replace(/id: 'about',\n\s*type: 'AboutSection',/g, "id: 'about',\n            type: 'AboutSection',\n            name: 'About Section',");
content = content.replace(/id: 'contact',\n\s*type: 'TextSection',/g, "id: 'contact',\n            type: 'TextSection',\n            name: 'Contact Info',");
content = content.replace(/id: 'programs',\n\s*type: 'CardsSection',/g, "id: 'programs',\n            type: 'CardsSection',\n            name: 'Programs List',");
content = content.replace(/id: 'shopHeader',\n\s*type: 'SimpleHeaderSection',/g, "id: 'shopHeader',\n            type: 'SimpleHeaderSection',\n            name: 'Shop Header',");
content = content.replace(/id: 'productGrid',\n\s*type: 'ProductGridSection',/g, "id: 'productGrid',\n            type: 'ProductGridSection',\n            name: 'Product Grid',");
content = content.replace(/id: 'servicesList',\n\s*type: 'CardsSection',/g, "id: 'servicesList',\n            type: 'CardsSection',\n            name: 'Services List',");
content = content.replace(/id: 'practices',\n\s*type: 'CardsSection',/g, "id: 'practices',\n            type: 'CardsSection',\n            name: 'Practice Areas',");

fs.writeFileSync('src/lib/templates.ts', content);
console.log('Fixed missing names in templates.ts');
