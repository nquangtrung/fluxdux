var Reducer = require('./reducer.js');

function Store(context, name, reducer) {
    this.name = name;
    this.context = context;
    this.reducer = new Reducer(reducer);
    this.storeActions = context.createActions(
        [ "change" ]
    );

    if (this.reducer.initialState) {
        this.state = this.reducer.initialState();
    }
}

function unsubcribe(actions) {
    actions.clearListeners();
}

Store.prototype = {
    storeActions : null,
    context : null,
    state   : null,
    name    : null,
    reducer : null,
    trigger : function() {
        this.context.dispatch(this.storeActions.change, this.state);
    },
    change : function(callback) {
        this.context.handle(this.storeActions, {
            change : callback
        });

        var unsubcriber = (function(store) {
            return function() {
                unsubcribe(store.storeActions);
            }
        })(this);
        return unsubcriber;
    },
    reduce : function(action, data) {
        this.state = this.reducer.reduce(action, this.state, data);
        this.trigger();
    },
    getState : function() {
        return this.state;
    }
};

module.exports = Store;