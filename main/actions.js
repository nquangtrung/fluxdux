const sRejectType = [
	"addListener", "hasActionType", "invoke", "createInvoker"
];

function Actions(context, actions) {
	if (Array.isArray(actions)) {
		this.actions = actions;
	} else if (typeof (actions) === 'string') {
		this.actions = [ actions ];
	} else {
		throw "Actions must be an array of string or a string itself";
	}

    this._listeners = [];
	this.createInvoker();
    this.context = context;
}

Actions.prototype = {
    context : null,
	actions : null,
	_listeners : [],
	addListener : function(listener) {
		this._listeners.push(listener);
	},
	removeListener : function(listener) {
		this._listeners.splice(this._listeners.indexOf(listener), 1);
	},
	clearListeners : function() {
		console.log("clearListeners");
		this._listeners = [];
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

            if (sRejectType.indexOf(type) >= 0) {
                console.error("Type " + type + " is rejected.");
                continue;
            }
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