// /media/data2/workspace/personal-learning-react/src/fluxdux
var FluxDux = require('../fluxdux.js');

var store = FluxDux.createStore('notes', {
	initialState : function() {
		return [];
	},
    add : function(state, data) {
        data.visibility = "visible";
        state.push(data);
        return state;
    },
    delete : function(state, data) {
        state.splice(data.index, 1);
        return state;
    },
    author : function(state, data) {
        for (var idx in state) {
            var note = state[idx];
            if (note.author === data.author) {
                note.visibility = "visible";
            } else {
                note.visibility = "hidden";
            }
        }
        return state;
    },
    all : function (state) {
        for (var idx in state) {
            var note = state[idx];
            note.visibility = "visible";
        }
        return state;
    }
});

var actions = FluxDux.createActions(
	[ "add", "delete" ]
);

FluxDux.handle(actions, {
	add : function(data) {
		console.log("add");
        store.reduce("add", data);
	},
	delete : function(data) {
		console.log("delete");
        store.reduce("delete", data);
	}
});

var Demo = {
	start : function() {
		store.change(function(data) {
            console.log("state updated", data);
            for (var idx in data) {
                var note = data[idx];
                if (note.visibility === 'visible') {
                    console.log(idx, note);
                }
            }
        });

        actions.add({ text: "text1", author: "author1" });
        actions.add({ text: "text4", author: "author1" });
        actions.add({ text: "text5", author: "author1" });
        actions.add({ text: "text6", author: "author1" });
        actions.add({ text: "text2", author: "author2" });
        actions.add({ text: "text7", author: "author2" });
        actions.add({ text: "text8", author: "author2" });
        actions.delete({ index: 1 });
		actions.add({ text: "text3", author: "author3" });
        store.reduce("author", { author: "author1" });
        store.reduce("author", { author: "author3" });
        store.reduce("author", { author: "author2" });
        store.reduce("all");
	}
};

Demo.start();