var React = require('react');
var marked = require('marked');

var NoteContent = React.createClass({displayName: 'NoteContent',
    rawMarkup: function(raw) {
        var rawMarkup = marked(raw, {sanitize: true});
        return { __html: rawMarkup };
    },
    render: function() {
        if (!this.props.note) {
            return (
                <div id="note-content"></div>
            );
        }

        var className = this.props.editMode ? "col-md-6" : "col-md-12";
        var note = this.props.note.input ? this.props.note.input : this.props.note;
        return (
            <div id="note-content" className={className} >
                <h2>{note.title}</h2>
                <h7>by <strong>{this.props.note.author}</strong> @ <em>{this.props.note.date}</em></h7>
                <br /><br />
                <div id="note-text" dangerouslySetInnerHTML={this.rawMarkup(note.text)}></div>
            </div>
        );
    }
});

module.exports = NoteContent;
