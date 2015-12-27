var React = require('react');

var NoteEditor = React.createClass({displayName: 'NoteEditor',
    render: function() {
        return (
            <div id="note-editor" className="col-md-6"  >
                <input id="note-editor-title" value={this.props.note.title} />
                <div id="note-text">
                    <textarea id="note-editor-text" defaultValue={this.props.note.text} />
                </div>
            </div>
        );
    }
});

module.exports = NoteEditor;
