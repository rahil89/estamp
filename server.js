const express = require('express');
const bodyParser = require('body-parser');
const Jimp = require('jimp'); // Ensure 'jimp' module is installed
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JavaScript) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/generate-id-card', async (req, res) => {
    const { userName, className, departmentName, marks } = req.body;

    // Log received text values
    console.log('Received Data:', { userName, className, departmentName, marks });

    // Load the template image
    const templatePath = 'bond.png';
    const template = await Jimp.read(templatePath);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    
    // Draw text over the template image using the loaded font
    
    // Draw text over the template image
    
    template.print(font, 1020, 1138, userName); // Draw user name
    template.print(font, 1018, 1438, userName); // Draw user name
    template.print(font, 1020, 1138, userName); // Draw user name
    template.print(font, 1020, 1200, departmentName); // Draw classclassName departmentName
    template.print(font, 1020, 1510, className); // Draw department
    template.print(font, 1020, 1560, marks); // Draw marks

    // Save the modified image
    const idCardPath = path.join(__dirname, 'bond1.png');
    await template.writeAsync(idCardPath);

    console.log('ID card generated:', idCardPath);
    res.sendFile(idCardPath);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
