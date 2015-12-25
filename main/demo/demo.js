// /media/data2/workspace/personal-learning-react/src/fluxdux
var FluxDux = require('../fluxdux.js');

var store = FluxDux.createStore('notes', {
	initialState : function() {
		return [];
	}
});
var store2 = FluxDux.createStore('notes2', {
    initialState : function() {
        return [];
    }
});
var actions = FluxDux.createActions(
	[ "add", "delete", "list" ]
);

var handler = FluxDux.handle(actions, {
	add : function(data) {
		console.log("add");
		console.log(data);
        store.trigger();
	},
	delete : function(data) {
		console.log("delete");
		console.log(data);
        store2.trigger();
	},
	list : function(data) {
		console.log("list");
		console.log(data);
	}
});

var Demo = {
	start : function() {
		store.change(function(store) {
            console.log("Store changed");
            console.log(store.state);
        });
        store2.change(function(store) {
            console.log("Store2 changed");
            console.log(store.state);
        });

		FluxDux.dispatch(actions.add, { text: "text1", author: "author1" } );
		FluxDux.dispatch(actions.add, { text: "text2", author: "author2" } );
		FluxDux.dispatch(actions.delete, { text: "text1", author: "author1" } );
		FluxDux.dispatch(actions.list, { text: "text1", author: "author1" } );
		actions.add({ text: "text3", author: "author3" });
	}
};

Demo.start();