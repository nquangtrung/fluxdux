var React = require('react');
var ReactDOM = require('react-dom');
var NoteApp = require('./components/NoteApp.js');

window.onload = function() {
    ReactDOM.render(
        <NoteApp />,
        document.getElementById('content')
    );
};
