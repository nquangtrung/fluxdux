var React = require('react');

var NoteActions = require('../actions/NoteActions.js');
var NoteLocalActions = require('../actions/NoteLocalActions.js');

var NoteDetailHeader = React.createClass({displayName: 'NoteDetailHeader',
    discardModification : function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to discard this?")) {
            NoteLocalActions.discardInput(this.props.note);
        }
    },
    startEditor : function(e) {
        e.preventDefault();
        NoteLocalActions.startEditor(this.props.note);
    },
    deleteNote : function(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this?")) {
            NoteLocalActions.deleteNote(this.props.note);
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
