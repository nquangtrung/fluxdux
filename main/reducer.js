function Reducer(reducer) {
    this.proto = reducer;
    this.init();
}

Reducer.prototype = {
    proto : null,

    init : function() {
        for (var idx in this.proto) {
            this[idx] = this.proto[idx];
        }
    },

    reduce : function(action, state, data) {
        if (this[action]) {
            return this[action](state, data);
        } else {
            throw "Action [" + action + "] was not implemented in the reducer.";
        }
    }
};

module.exports = Reducer;