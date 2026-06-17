import fs from 'fs';
import path from 'path';

const srcDir = './src/assets';

if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
}

const images = [
    {
        src: 'C:/Users/daksh/.gemini/antigravity/brain/a9f7e93c-e97e-43ef-bfa7-f1ae93146be0/hero_necklace_1778611936234.png',
        dest: path.join(srcDir, 'hero_necklace.png')
    },
    {
        src: 'C:/Users/daksh/.gemini/antigravity/brain/a9f7e93c-e97e-43ef-bfa7-f1ae93146be0/ring_product_1778611950848.png',
        dest: path.join(srcDir, 'ring_product.png')
    }
];

images.forEach(img => {
    if (fs.existsSync(img.src)) {
        fs.copyFileSync(img.src, img.dest);
        console.log(`Copied: ${img.dest}`);
    } else {
        console.log(`Source file not found: ${img.src}`);
    }
});
