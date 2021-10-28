module.exports = (app) => {
    const ItemStructures = require('../controllers/item-structure.controller.js');

    // Create a new item structure
    app.post('/create-item-structure', ItemStructures.createItemStructure);

    // Update created item structure
    app.patch('/update-item-structure', ItemStructures.updateItemStructure);

    // Retriew created item structure
    app.get('/get-item-structure', ItemStructures.getItemStructure);
}