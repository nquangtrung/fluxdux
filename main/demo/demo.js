// /media/data2/workspace/personal-learning-react/src/fluxdux
var FluxDux = require('../fluxdux.js');

// var store = FluxDux.createStore('notes', {
// 	initialState : function() {
// 		return [];
// 	}
// });
var actions = FluxDux.createActions(
	[ "add", "delete", "list" ]
);

var handler = FluxDux.handle(actions, {
	add : function(data) {
		console.log("add");
		console.log(data);
	},
	delete : function(data) {
		console.log("delete");
		console.log(data);
	},
	list : function(data) {
		console.log("list");
		console.log(data);
	}
});

var Demo = {
	start : function() {
		// store.listen(function(state) {
		// 	console.log(state);
		// });
		FluxDux.dispatch(actions.add, { text: "text1", author: "author1" } );
		FluxDux.dispatch(actions.add, { text: "text2", author: "author2" } );
		FluxDux.dispatch(actions.delete, { text: "text1", author: "author1" } );
		FluxDux.dispatch(actions.list, { text: "text1", author: "author1" } );
		
		actions.add({ text: "text3", author: "author3" });
	}
};

Demo.start();