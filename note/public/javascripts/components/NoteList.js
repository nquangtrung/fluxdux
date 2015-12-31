var React = require('react');

var NoteListHeader = require('./NoteListHeader.js');
var NoteListFooter = require('./NoteListFooter.js');
var NoteListItem = require('./NoteListItem.js');

var NoteList = React.createClass({displayName: 'NoteList',
    render: function() {
        var selectedId = this.props.selected;
        var filter = this.props.filter.title;
        var notes = this.props.data.map(function(note) {
            var selected = (selectedId === note.id);
            if (filter) {
                if (note.input) {
                    if (note.input.title.toLowerCase().indexOf(filter) < 0) {
                        return null;
                    }
                } else if (note.title.toLowerCase().indexOf(filter) < 0) {
                    return null;
                }
            }
            return (
                <NoteListItem key={note.id} note={note} selected={selected} />
            );
        });

        return (
            <div className="col-md-4" id="note-list">
                <div className="panel panel-default panel-nocurve">
                    <NoteListHeader />
                    <div className="list-group" id="note-list-container">{notes}</div>
                    <NoteListFooter />
                </div>
            </div>
        );
    }
});

module.exports = NoteList;
