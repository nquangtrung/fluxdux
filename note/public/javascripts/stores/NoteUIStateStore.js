var FluxDux = require('fluxdux');

var NoteUIStateStore = FluxDux.createStore('NoteUIStateStore', {
	initialState : function() {
		return {
            editMode : false,
            currentNoteId : -1,
            filter: {},
        };
	},
    set : function(state, data) {
        if (data.key === 'currentNoteId') {
            state.editMode	= false;
        }
        state[data.key] = data.value;
        return state;
    },
    setAll : function(state, data) {
        for (var idx in data) {
            var item = data[idx];
            state[item.type] = item.value;
        }
        return state;
    },
    filter : function(state, data) {
        for (var idx in data) {
            state.filter[idx] = data[idx];
        }
        return state;
    }
});

module.exports = NoteUIStateStore;