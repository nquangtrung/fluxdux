var React = require('react');

var NoteContent = React.createClass({displayName: 'NoteContent',
    render: function() {
        return (
            <div id="note-content" className="col-md-6" >
                <h2>{this.props.note.title}</h2>
                <h7>by <strong>{this.props.note.author}</strong> @ <em>{this.props.note.date}</em></h7>
                <br /><br />
                <div id="note-text">{this.props.note.text}</div>
            </div>
        );
    }
});

module.exports = NoteContent;
