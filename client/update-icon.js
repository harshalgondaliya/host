import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively get all .jsx files
function getAllFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFiles(filePath));
        } else if (file.endsWith('.jsx')) {
            results.push(filePath);
        }
    });
    return results;
}

const srcDir = path.join(__dirname, 'src');
const files = getAllFiles(srcDir);

console.log('Updating vegetarian icon in components...');

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the src path with the new public path
    content = content.replace(
        /src="\/src\/assets\/images\/icons\/vegetarian\.svg"/g,
        'src="/assets/images/icons/vegetarian.svg"'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${path.relative(__dirname, filePath)}`);
});

console.log('Finished updating vegetarian icon in components.'); 