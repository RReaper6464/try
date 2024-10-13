const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

const OUTPUT_DIR = 'output';
const METADATA_DIR = 'metadata';
const TOTAL_NFTS = 2222; // Set to 2222 for the total NFTs

// Ensure output and metadata directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}
if (!fs.existsSync(METADATA_DIR)) {
    fs.mkdirSync(METADATA_DIR);
}

// Function to get a random layer path based on layer type
function getRandomLayerPath(layerType) {
    let layerPath;

    switch (layerType) {
        case 'background':
            layerPath = 'assets/01 - Background';
            break;
        case 'fur':
            layerPath = 'assets/02 - Fur';
            break;
        case 'clothes':
            layerPath = 'assets/03 - Clothes';
            break;
        case 'neckwear':
            layerPath = 'assets/04 - Neck Wear';
            break;
        case 'face':
            layerPath = 'assets/05 - Face';
            break;
        case 'eyewear':
            layerPath = 'assets/06 - Eye Wear';
            break;
        case 'headwear':
            layerPath = 'assets/07 - Head Wear';
            break;
        default:
            throw new Error('Unknown layer type');
    }

    const layers = fs.readdirSync(layerPath);
    return {
        path: `${layerPath}/${layers[Math.floor(Math.random() * layers.length)]}`,
        name: layers[Math.floor(Math.random() * layers.length)].split('.')[0] // Assuming file names are structured as "name.png"
    };
}

// Function to generate NFTs
async function generateNFTs() {
    for (let i = 1; i <= TOTAL_NFTS; i++) {
        console.log(`Generating NFT #${i}`);
        const canvas = createCanvas(2048, 2048);
        const context = canvas.getContext('2d');

        const selectedLayers = {};

        // Load and draw layers
        const background = getRandomLayerPath('background');
        selectedLayers.background = background.name;
        const bgImage = await loadImage(background.path);
        context.drawImage(bgImage, 0, 0);

        const fur = getRandomLayerPath('fur');
        selectedLayers.fur = fur.name;
        const furImage = await loadImage(fur.path);
        context.drawImage(furImage, 0, 0);

        const clothes = getRandomLayerPath('clothes');
        selectedLayers.clothes = clothes.name;
        const clothesImage = await loadImage(clothes.path);
        context.drawImage(clothesImage, 0, 0);

        const neckWear = getRandomLayerPath('neckwear');
        selectedLayers.neckWear = neckWear.name;
        const neckWearImage = await loadImage(neckWear.path);
        context.drawImage(neckWearImage, 0, 0);

        const face = getRandomLayerPath('face');
        selectedLayers.face = face.name;
        const faceImage = await loadImage(face.path);
        context.drawImage(faceImage, 0, 0);

        const eyewear = getRandomLayerPath('eyewear');
        selectedLayers.eyewear = eyewear.name;
        const eyewearImage = await loadImage(eyewear.path);
        context.drawImage(eyewearImage, 0, 0);

        const headwear = getRandomLayerPath('headwear');
        selectedLayers.headwear = headwear.name;
        const headwearImage = await loadImage(headwear.path);
        context.drawImage(headwearImage, 0, 0);

        // Save the image
        const buffer = canvas.toBuffer('image/png');
        const outputFilePath = `${OUTPUT_DIR}/Pesto Penguin #${i}.png`;
        fs.writeFileSync(outputFilePath, buffer);

        // Create metadata
        const metadata = {
            name: `Pesto Penguin #${i}`,
            image: outputFilePath.replace(/\\/g, '/'), // Ensure URL-style paths
            description: "Pesto Penguin Club is a whimsical NFT collection celebrating the charming King Penguin of Australia",
            attributes: [
                { trait_type: "Background", value: selectedLayers.background },
                { trait_type: "Fur", value: selectedLayers.fur },
                { trait_type: "Clothes", value: selectedLayers.clothes },
                { trait_type: "Neck Wear", value: selectedLayers.neckWear },
                { trait_type: "Face", value: selectedLayers.face },
                { trait_type: "Eyewear", value: selectedLayers.eyewear },
                { trait_type: "Head Wear", value: selectedLayers.headwear }
            ]
        };

        fs.writeFileSync(`${METADATA_DIR}/Pesto Penguin #${i}.json`, JSON.stringify(metadata, null, 2));
    }
}

generateNFTs().then(() => {
    console.log('NFTs generated successfully!');
}).catch(error => {
    console.error('Error generating NFTs:', error);
});
