const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'output');
const backgroundsDir = path.join(__dirname, 'assets', '01 - Background');

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

fs.readdir(backgroundsDir, (err, files) => {
    if (err) {
        console.error('Error reading backgrounds directory:', err);
        return;
    }

    files.forEach(file => {
        const srcPath = path.join(backgroundsDir, file);
        const destPath = path.join(outputDir, file);
        fs.copyFile(srcPath, destPath, (err) => {
            if (err) {
                console.error(`Error copying ${file}:`, err);
            } else {
                console.log(`Copied ${file} to output directory.`);
            }
        });
    });
});
