var React = require('react');
var NoteList    = require('./NoteList.js');
var NoteDetail  = require('./NoteDetail.js');

var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment"},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment"},
];

var NoteApp = React.createClass({displayName: 'NoteApp',
    render: function() {
        return (
            <div id="note-app-container">
                <NoteList data={data}/>
                <NoteDetail />
            </div>
        );
    }
});

module.exports = NoteApp;