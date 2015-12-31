var FluxDux = require('fluxdux');

var NoteLocalActions = FluxDux.createActions([
    "discardInput", "startEditor", "deleteNote", "noteDraft", "filter", "noteDraft", "selectAndEditNote", "noteSaved", "noteDeleted", "closeEditor"
]);

module.exports = NoteLocalActions;