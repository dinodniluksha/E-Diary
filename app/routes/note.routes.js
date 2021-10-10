module.exports = (app) => {
    const Notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/notes', Notes.create);

    // Retrieve all Notes
    app.get('/notes', Notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', Notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', Notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', Notes.delete);
}