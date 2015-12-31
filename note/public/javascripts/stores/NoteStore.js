var FluxDux = require('fluxdux'),
	moment  = require('moment'),
    NoteLocalActions = require('../actions/NoteLocalActions.js');

var NoteStore = FluxDux.createStore('NoteStore', {
	initialState : function() {
		return [];
	},
	noteLoaded : function(state, data) {
		if (data.firstPage) {
			state = [];
		}
		for (var idx in data.list) {
			data.list[idx].status = 'saved';
			state.push(data.list[idx]);
		}
		return state;
	},
	noteDraft : function(state) {
		var tmpId = 1;
		if (state.length > 0) {
			tmpId = state[state.length - 1].id + 1;
		}

		var newNote = {
			id: tmpId,
			author: "Guest",
			title: "Untitled Note",
			text: "",
			date: moment().format(),
			status: "draft",
			input: {
				title: "Untitled Note",
				text: ""
			}
		};
		state.push(newNote);
        NoteLocalActions.selectAndEditNote(newNote);
		return state;
	},
	noteSaving : function(state, data) {
		for (var idx in state) {
			if (state[idx].id == data.id) {
				state[idx].status = 'saving';
				break;
			}
		}
        NoteLocalActions.closeEditor();
		return state;
	}, 
	noteSaveFailed : function(state, data) {
		for (var idx in state) {
			if (state[idx].id == data.id) {
				state[idx].status = 'save-failed';
				break;
			}
		}
		return state;
	}, 
	noteSaved : function(state, data) {
		for (var idx in state) {
			if (state[idx].id == data.id) {
				state[idx].status = 'saved';
                state[idx].title = state[idx].input.title;
                state[idx].text = state[idx].input.text;
                state[idx].input = null;
				break;
			}
		}
        NoteLocalActions.noteSaved(data);
		return state;
	},
	noteDeleting : function(state, data) {
		for (var idx in state) {
			if (state[idx].id == data.id) {
				state[idx].status = 'deleting';
				break;
			}
		}
        NoteLocalActions.closeEditor();
		return state;
	},
	noteDeleted : function(state, data) {
		for (var idx in state) {
			if (state[idx].id == data.id) {
				state.splice(idx, 1);
				break;
			}
		}
        NoteLocalActions.noteDeleted();
		return state;
	},
	discardInput : function(state, data) {
		for (var idx in state) {
			if (state[idx].status === 'draft') {
				// Delete the draft
				state.splice(idx, 1);
				break;
			}

			// Discard modified data only
        	if (state[idx].id != data.id) {
        		continue;
        	}
        	state[idx].input = null;
    		state[idx].status = 'saved';	
        	break;
        }
		return state;
	},
    updateInput : function(state, data) {
        for (var idx in state) {
        	if (state[idx].id != data.id) {
        		continue;
        	}

        	if (state[idx].status === 'saving' || state[idx].status === 'deleting') {
        		break;
        	}

        	// Create input data if not presented
        	if (!state[idx].input) {
        		state[idx].input = { };
        	}

			// Update this note's data
        	var modified = false;
        	for (var jdx in data) {
        		if (data[jdx] != state[idx][jdx]) {
        			modified = true;
        		}
        		state[idx].input[jdx] = data[jdx];
        	}

        	// Update this note's status
        	if (state[idx].status !== 'draft') {
        		state[idx].status = modified ? 'modified' : 'saved';	
        	}
			break;
        }
        return state;
    }
});

module.exports = NoteStore;