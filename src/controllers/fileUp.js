
const fs = require('fs');
const path = require('path');
const { randomBytes } = require('crypto');

const imagesDir = `${path.resolve()}/files`;
const allowedFileExtensions=['png', 'jpg', 'jpeg', 'svg', 'gif', 'avif', 'webp', 'pdf'];


module.exports.fileUp = async function (link) {
    try {
        if (!link) return null;
        const extIndex = link.lastIndexOf('.');// Check if link has a file extension
        if (extIndex === -1) throw new Error('Link does not contain a file extension.');
        const ext = link.substring(extIndex + 1);// Get file extension
        if (!allowedFileExtensions.includes(ext.toLowerCase())) throw new Error('Invalid file extension.');// Check if file extension is valid
        const fileName = randomBytes(16).toString('hex') + '.' + ext;// Generate a unique file name
        if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);
        const buffer = fs.readFileSync(link);// Read image file from link
        const filePath = `${imagesDir}/${fileName}`;// Write image file to images directory
        fs.writeFileSync(filePath, buffer);
        return `file/${fileName}`;// Return file path


    } catch (error) {
        console.error(error);
        throw new Error('Failed to save image.');

    }
}