module.exports = (app) => {
    const profils = require('../controllers/profil.controller.js');

    // Create a new Note
    app.post('/profil', profils.create);

    // Retrieve all Notes
    app.get('/profil', profils.findAll);

    // Retrieve a single Note with noteId
    app.get('/profil/:userId', profils.findOne);

    // Update a Note with noteId
    app.put('/profil/:userId', profils.update);

    // Delete a Note with noteId
    app.delete('/profil/:userId', profils.delete);
}