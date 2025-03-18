const fs = require('fs');
const path = require('path');

const storeDir = path.join(__dirname, 'src', 'store');
const files = fs.readdirSync(storeDir).filter(file => file.endsWith('.jsx'));

console.log('Updating vegetarian icon in store files...');

files.forEach(file => {
    const filePath = path.join(storeDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the external URL with our local path
    content = content.replace(
        /src="https:\/\/content\.dmart\.in\/website\/_next\/static\/media\/veg\.fd2bc51a\.svg"/g,
        'src="/src/assets/images/icons/vegetarian.svg"'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});

console.log('Finished updating vegetarian icon in store files.'); 