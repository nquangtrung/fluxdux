var FluxDux = require('fluxdux');

var NoteActions = FluxDux.createActions([
	"save", "delete", "load"
]);

module.exports = NoteActions;