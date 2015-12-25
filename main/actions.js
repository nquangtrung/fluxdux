const sRejectType = [
	"addListener", "hasActionType", "invoke", "createInvoker"
];


function Actions(actions) {
	this.actions = actions;
    this._listeners = [];
	this.createInvoker();
}

Actions.prototype = {
	actions : null,
	_listeners : [],
	addListener : function(listener) {
		this._listeners.push(listener);
	},
	hasActionType : function(type) {
		return this.actions.indexOf(type) >= 0;
	},
	invoke : function(context, type, data) {
		for (var idx in context._listeners) {
			var listener = context._listeners[idx];
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
			//var invoker = new Function("context", "invokeFunc",
			//	"return function(data) { invokeFunc(context, \"" + type + "\", data); }")(this, this.invoke);
            var invoker = (function(context, invokeFunc, type) {
                return function(data) {
                    invokeFunc(context, type, data);
                };
            })(this, this.invoke, type);
			this[type] = invoker;
		}
	}
};

module.exports = Actions;