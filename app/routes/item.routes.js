module.exports = (app) => {
    const Items = require('../controllers/item.controller.js');

    // Create a new Note
    app.get('/test', Items.test);
    app.post('/createitem', Items.createItem);
    app.patch('/updateitem', Items.updateItem);
}