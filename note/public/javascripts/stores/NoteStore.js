var FluxDux = require('fluxdux'),
	moment = require('moment'),
	NoteUIStateStore = require('../stores/NoteUIStateStore.js');

var data = [
    {id: 1, author: "Pete Hunt", title: "Title1", text: "This is one sample comment", date: "2015/12/25", status: "saved"},
    {id: 2, author: "Jordan Walke",  title: "Title2", text: "This is *saved* sample comment", date: "2015/12/25", status: "saved"},
    {id: 3, author: "Molly",  title: "Title3", text: "This is *saving* sample comment", date: "2015/12/25", status: "saving"},
    {id: 4, author: "Margin",  title: "Title4", text: "This is *deleting* sample comment", date: "2015/12/25", status: "deleting"},
    {id: 5, author: "Hello",  title: "Title5", text: "This is *draft* sample comment", date: "2015/12/25", 
    		status: "draft",
    		input: { title: 'Title draft', text: 'This is draft text'} },
    {id: 6, author: "Mike",  title: "Title6", text: "This is *modified* sample comment", date: "2015/12/25", 
    		status: "modified",
    		input: { title: 'Title modified', text: 'This is modified text'} },
]; 

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
		var tmpId = state[state.length - 1].id + 1;
		state.push({
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
		});
		NoteUIStateStore.reduce('setAll', [
			{ type: 'editMode', value: true },
			{ type: 'currentNoteId', value: tmpId }
		]);
		return state;
	},
	noteSaving : function(state, data) {
		for (var idx in state) {
			if (state[idx].id == data.id) {
				state[idx].status = 'saving';
				break;
			}
		}
		NoteUIStateStore.reduce("set", {
                key: "editMode",
                value: false
            });
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
				break;
			}
		}
		return state;
	},
	noteDeleting : function(state, data) {
		for (var idx in state) {
			if (state[idx].id == data.id) {
				state[idx].status = 'deleting';
				break;
			}
		}
		NoteUIStateStore.reduce("set", {
                key: "editMode",
                value: false
            });
		return state;
	},
	noteDeleted : function(state, data) {
		for (var idx in state) {
			if (state[idx].id == data.id) {
				state.splice(idx, 1);
				break;
			}
		} 
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