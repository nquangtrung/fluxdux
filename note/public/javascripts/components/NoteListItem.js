var React = require('react');

var NoteUIStateStore = require('../stores/NoteUIStateStore.js');

var NoteListItem = React.createClass({displayName: 'NoteListItem',
    notePicked : function(e) {
        e.preventDefault();
        NoteUIStateStore.reduce("set", {
            key: "currentNoteId",
            value: this.props.note.id
        });
    },
    render: function() {
        var statusString = '';
        if (this.props.note.status === 'saving') {
            statusString = 'Saving';
        } else if (this.props.note.status === 'draft') {
            statusString = 'Draft';
        }
        
		var statusClassName = this.props.note.status;
        var activeClassName = this.props.selected ? 'active' : '';
        var title = this.props.note.title;
        if (this.props.note.input) {
            title = this.props.note.input.title;
        }
        return (
            <a className={"note-app-list-item list-group-item " + activeClassName} href="#" onClick={this.notePicked}>
            	<div>
	                <h4 className={"list-group-item-heading " + statusClassName}>{ title }</h4>
                    <div className={"pull-right " + statusClassName}>{statusString}</div>
                </div>
                <div className={"list-group-item-text " + statusClassName}>{ this.props.note.author }</div>
            </a>
        );
    }
});

module.exports = NoteListItem;
