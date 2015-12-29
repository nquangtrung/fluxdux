var React = require('react');

var NoteDetailHeader = require('./NoteDetailHeader.js');
var NoteDetailFooter = require('./NoteDetailFooter.js');
var NoteContent = require('./NoteContent.js');
var NoteEditor = require('./NoteEditor.js');

var NoteUIStateStore = require('../stores/NoteUIStateStore.js');

var NoteDetail = React.createClass({displayName: 'NoteDetail',
    render: function() {
        return (
            <div className="col-md-8" id="note-detail">
                <div className="panel panel-default panel-nocurve">
                    <NoteDetailHeader editMode={this.props.editMode} note={this.props.note} />
                    <div className="panel-body panel-body-nopadding">
                        <NoteEditor editMode={this.props.editMode} note={this.props.note} />
                        <NoteContent editMode={this.props.editMode} note={this.props.note} />
                    </div>
                    <NoteDetailFooter />
                </div>
            </div>
        );
    }
});

module.exports = NoteDetail;
