var React = require('react');

var NoteStore = require('../stores/NoteStore.js');

var NoteEditor = React.createClass({displayName: 'NoteEditor',
    onTitleChanged: function(e) {
        NoteStore.reduce('updateInput', {
            id: this.props.note.id,
            title: e.target.value
        });
    },
    onTextChanged: function(e) {
        NoteStore.reduce('updateInput', {
            id: this.props.note.id,
            text: e.target.value
        });
    },
    render: function() {
        if (!this.props.note) {
            return (
                <div id="note-editor" className='hidden' />
            );
        }

        // Show the input
        input = this.props.note.input;    

        // If not in edit mode, we don't dislay the editor
        if (!this.props.editMode) {
            return (
                <div id="note-editor" className='hidden' />
            );
        }
        
        return (
            <div id="note-editor" className='col-md-6'  >
                <input id="note-editor-title" value={input.title} onChange={this.onTitleChanged}/>
                <div className="flex">
                    <textarea id="note-editor-text" value={input.text} onChange={this.onTextChanged}/>
                </div>
            </div>
        );
    }
});

module.exports = NoteEditor;
