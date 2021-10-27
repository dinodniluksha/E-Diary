module.exports = (app) => {
    const ItemStructures = require('../controllers/item-structure.controller.js');

    // Create a new item structure
    app.post('/item-structures', ItemStructures.createItemStructure);
    // Retriew created item structure
    app.get('/get-item-structure', ItemStructures.getItemStructure);
}