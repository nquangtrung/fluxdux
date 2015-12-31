var NoteStore = require('../stores/NoteStore.js'),
    NoteUIStateStore = require('../stores/NoteUIStateStore.js'),
    NoteActions = require('./NoteActions.js');

var NoteLocalActionsHandler = {
    discardInput: function(data) {
        NoteStore.reduce("discardInput", data);
        NoteUIStateStore.reduce("set", {
            key: "editMode",
            value: false
        });
    },
    startEditor : function(data) {
        if (!data.input) {
            NoteStore.reduce('updateInput', {
                id: data.id,
                title: data.title,
                text: data.text
            });
        }
        NoteUIStateStore.reduce("set", {
            key: "editMode",
            value: true
        });
    },
    deleteNote : function(data) {
        NoteActions.delete(data);
        NoteUIStateStore.reduce("set", {
            key: "editMode",
            value: false
        });
    },
    selectAndEditNote : function(data) {
        NoteUIStateStore.reduce('setAll', [
            { type: 'editMode', value: true },
            { type: 'currentNoteId', value: data.id }
        ]);
    },
    closeEditor : function() {
        NoteUIStateStore.reduce("set", {
            key: "editMode",
            value: false
        });
    },
    noteDraft : function() {
        NoteStore.reduce('noteDraft');
    },
    noteSaved : function() {
        NoteUIStateStore.reduce("set", {
            key: "currentNoteId",
            value: -1
        });
    },
    noteDeleted : function() {
        NoteUIStateStore.reduce("set", {
            key: "currentNoteId",
            value: -1
        });
    },
    filter : function(value) {
        NoteUIStateStore.reduce('filter', {
            title: value
        });
    }
};

module.exports = NoteLocalActionsHandler;