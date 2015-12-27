var React = require('react');

var NoteListHeader = require('./NoteListHeader.js');
var NoteListFooter = require('./NoteListFooter.js');
var NoteListItem = require('./NoteListItem.js');

var NoteList = React.createClass({displayName: 'NoteDetail',
    render: function() {
        console.log(this.props.data);
        var notes = this.props.data.map(function(note) {
            console.log(note);
            return (
                <NoteListItem author={ note.author } key={ note.id }>
                    { note.text }
                </NoteListItem>
            );
        });
        return (
            <div className="col-md-4" id="note-list">
                <div className="panel panel-default panel-nocurve">
                    <NoteListHeader />
                    <div className="list-group" id="note-list-container">{ notes }</div>
                    <NoteListFooter />
                </div>
            </div>
        );
    }
});

module.exports = NoteList;
