## FluxDux
The best of both FLUX and Redux all in one package.

### Description
This library is a mixture of both FLUX and Redux's features. Each `store` will only be keeping its own data state, the state is *reduced* through `store.reduce` method. Store does not listen directly to actions, but through an immediate object called the `handler`. These `handler`s will listen to `actions` that being dispatched from `view`.

For more detail explaination, please follow this [tutorial][fluxdux_tutorial].
### Install
Install directly from npm using command-line.
>>> npm install --save fluxdux

Or checkout from github
>>> git checkout https://github.com/nquangtrung/fluxdux

### Usage
Please see `demo/demo.js` for some quick usage example.

Define `store` with its reducers.
```javascript
var FluxDux = require('../fluxdux.js');
var store = FluxDux.createStore('notes', {
	initialState : function() { ... },
    add : function(state, data) { 
        /* Add new note to current state and return a new state */ 
        return newState; 
    },
    delete : function(state, data) { 
        /* Remove data from current state and return a new state */ 
        return newState; 
    },
    /* Other reducers here */
});
```
Define `actions`.
```javascript
var actions = FluxDux.createActions(
	[ "add", "delete" ]
);
```
How `handler` will connect `action` and `store`
```javascript
FluxDux.handle(actions, {
	add : function(data) {
        store.reduce("add", data);
	},
	delete : function(data) {
        store.reduce("delete", data);
	}
});
```
Actions can be dispatched through directly calling the method.
```javascript
actions.add({ text: "text1", author: "author1" });
actions.delete({ index: 1 });
actions.add({ text: "text2", author: "author2" });
```
### NPM package
[![alt text][fluxdux_badge]][fluxdux_npm]

[fluxdux_badge]: https://nodei.co/npm/fluxdux.png?downloads=true&downloadRank=true&stars=true "fluxdux"
[fluxdux_github]: https://github.com/nquangtrung/fluxdux
[fluxdux_npm]: https://www.npmjs.com/package/fluxdux
[fluxdux_tutorial]: http://blog.trontria.com/fluxdux-tutorial/