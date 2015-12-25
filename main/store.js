function Store(context, name, proto) {
    this.name = name;
    this.context = context;
    this.storeActions = context.createActions(
        [ "change" ]
    );

    if (this.initialState) {
        this. state = this.initialState();
    }
}

Store.prototype = {
    storeActions : null,
    context : null,
    state   : null,
    name    : null,
    initialState : function() {
        return [];
    },
    trigger : function() {
        this.context.dispatch(this.storeActions.change, this);
    },
    change : function(callback) {
        this.context.handle(this.storeActions, {
            change : callback
        });
    }
};

module.exports = Store;