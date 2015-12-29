var React = require('react');

var NoteUIStateStore = require('../stores/NoteUIStateStore.js');
var NoteStore = require('../stores/NoteStore.js');

var NoteActions = require('../actions/NoteActions.js');

var NoteDetailHeader = React.createClass({displayName: 'NoteDetailHeader',
    discardModification : function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to discard this?")) {
            NoteStore.reduce("discardInput", {
                id: this.props.note.id
            });
            NoteUIStateStore.reduce("set", {
                key: "editMode",
                value: false
            });    
        }
    },
    startEditor : function(e) {
        e.preventDefault();
        if (!this.props.note.input) {
            NoteStore.reduce('updateInput', {
                id: this.props.note.id,
                title: this.props.note.title,
                text: this.props.note.text
            });
        }
        NoteUIStateStore.reduce("set", {
            key: "editMode",
            value: true
        });
    },
    deleteNote : function(e) {
        e.preventDefault();
        NoteActions.delete(this.props.note);
    },
    saveNote : function(e) {
        e.preventDefault();
        NoteActions.save(this.props.note);
    },
    render: function() {
        if (!this.props.note) {
            return (
                <div className="panel-heading panel-heading-nocurve" id="note-detail-header">&nbsp;</div>
            );
        }

        var discardClassName = 'hidden';
        if (this.props.note.status === 'modified') {
            discardClassName = '';
        }
        
        if (this.props.editMode) {
            return (
                <div className="panel-heading panel-heading-nocurve" id="note-detail-header">
                    <div className="btn-group pull-right">
                        <a href="#" className="btn btn-default" >
                            <span className="glyphicon glyphicon-floppy-disk" onClick={this.saveNote} />
                        </a>
                        <a href="#" className={"btn btn-default " + discardClassName} onClick={ this.discardModification } >
                            <span className="glyphicon glyphicon-floppy-remove" > Discard</span>
                        </a>
                        <a href="#" className="btn btn-danger" onClick={ this.deleteNote }>
                            <span className="glyphicon glyphicon-trash" />
                        </a>
                    </div>
                    <div className="clearfix" />
                </div>
            );
        } else {
            var className = (this.props.note.status === 'deleting' || this.props.note.status === 'saving') ? 'hidden' : '';
            return (
                <div className="panel-heading panel-heading-nocurve" id="note-detail-header">
                    <div className="btn-group pull-right">
                        <a href="#" className={"btn btn-default " + className} onClick={ this.startEditor }>
                            <span className="glyphicon glyphicon-pencil" />
                        </a>
                    </div>
                    <div className="clearfix" />
                </div>
            );
        }
        
    }
});

module.exports = NoteDetailHeader;
