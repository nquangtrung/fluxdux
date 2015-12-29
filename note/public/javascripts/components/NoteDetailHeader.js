var React = require('react');

var NoteUIStateStore = require('../stores/NoteUIStateStore.js');
var NoteStore = require('../stores/NoteStore.js');

var NoteActions = require('../actions/NoteActions.js');

var NoteDetailHeader = React.createClass({displayName: 'NoteDetailHeader',
    discardModification : function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to discard this?")) {
            NoteStore.reduce("discardInput", this.props.note);
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
        if (confirm("Are you sure you want to delete this?")) {
            NoteActions.delete(this.props.note);  
            NoteUIStateStore.reduce("set", {
                key: "editMode",
                value: false    
            }); 
        }
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

        if (this.props.editMode && (this.props.note.status === 'modified' || this.props.note.status === 'draft')) {
            return (
                <div className="panel-heading panel-heading-nocurve" id="note-detail-header">
                    <div className="btn-group pull-right">
                        <a href="#" className="btn btn-default" >
                            <span className="glyphicon glyphicon-floppy-disk" onClick={this.saveNote} />
                        </a>
                        <a href="#" className="btn btn-default" onClick={ this.discardModification } >
                            <span className="glyphicon glyphicon-floppy-remove" > Discard</span>
                        </a>
                        <a href="#" className="btn btn-danger" onClick={ this.deleteNote }>
                            <span className="glyphicon glyphicon-trash" />
                        </a>
                    </div>
                    <div className="clearfix" />
                </div>
            );
        } else if (this.props.editMode) {
            return (
                <div className="panel-heading panel-heading-nocurve" id="note-detail-header">
                    <div className="btn-group pull-right">
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
