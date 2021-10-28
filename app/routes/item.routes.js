module.exports = (app) => {
    const Items = require('../controllers/item.controller.js');

    // Create a new Note
    app.get('/test', Items.test);
    app.post('/create-item', Items.createItem);
    app.patch('/update-item', Items.updateItem);
}