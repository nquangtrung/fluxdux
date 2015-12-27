var React = require('react');

var NoteListFooter = React.createClass({displayName: 'NoteListFooter',
    render: function() {
        return (
            <div className="panel-footer panel-footer-nocurve" id="note-list-footer"></div>
        );
    }
});

module.exports = NoteListFooter;
