// Private actions queue
var sActions = [];

function Dispatcher() { };

Dispatcher.prototype = {
	dispatch : function(invoker, data) {
		invoker(data);
	},
	watch : function(actions) {
		sActions.push(actions);
	}
};

module.exports = Dispatcher;