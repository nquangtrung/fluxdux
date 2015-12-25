const sRejectType = [
	"addListener", "hasActionType", "invoke", "createInvoker"
];

var _listeners = [];

function Actions(actions) {
	this.actions = actions;
	this.createInvoker();
}

Actions.prototype = {
	actions : null,

	addListener : function(listener) {
		_listeners.push(listener);
	},
	hasActionType : function(type) {
		return this.actions.indexOf(type) >= 0;
	},
	invoke : function(context, type, data) {
		for (var idx in _listeners) {
			var listener = _listeners[idx];
			if (listener[type]) {
				var f = listener[type];
				f(data);
			}
		}
	},
	createInvoker : function() {
		for (var idx in this.actions) {
			var type = this.actions[idx];
			var _self = this;
			var invoker = new Function("context", "invokeFunc", 
				"return function(data) { invokeFunc(context, \"" + type + "\", data); }")(this, this.invoke);
			this[type] = invoker;
		}
	}
};

module.exports = Actions;