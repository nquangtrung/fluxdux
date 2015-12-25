// /media/data2/workspace/personal-learning-react/src/fluxdux
var Dispatcher  = require('./dispatcher.js'),
    Actions     = require('./actions.js'),
    Store       = require('./store.js');

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
	createActions : function(names) {
		var actions = new Actions(this, names);
		this.dispatcher().watch(actions);
		return actions;
	},
	handle : function(actions, listener) {
		actions.addListener(listener);
	},
	dispatch : function(type, data) {
		this.dispatcher().dispatch(type, data);
	},
	createStore : function(name, proto) {
        var store = new Store(this, name, proto);
        return store;
    }
};

var fluxduxer = new FluxDux();
module.exports = fluxduxer;