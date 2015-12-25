// /media/data2/workspace/personal-learning-react/src/fluxdux
var Dispatcher = require('./dispatcher.js');
var Actions = require('./actions.js');

// Private dispatcher
var sDispatcher = null;

function FluxDux() { }

FluxDux.prototype = {
	dispatcher : function() {
		// Singleton pattern
		if (sDispatcher == null) {
			sDispatcher = new Dispatcher();
		}
		return sDispatcher;
	},
	createStores : function() {

	},
	createActions : function(names) {
		var actions = new Actions(names);
		this.dispatcher().watch(actions);
		return actions;
	},
	handle : function(actions, listener) {
		actions.addListener(listener);
	},
	dispatch : function(type, data) {
		this.dispatcher().dispatch(type, data);
	}
};

var fluxduxer = new FluxDux();
module.exports = fluxduxer;