var React = require('react');

var NoteLocalActions = require('../actions/NoteLocalActions.js');

var NoteListHeader = React.createClass({displayName: 'NoteListHeader',
    addDraft : function() {
        NoteLocalActions.noteDraft();
    },
    filter : function(e) {
        NoteLocalActions.filter(e.target.value);
    },
    render: function() {
        return (
            <div className="panel-heading panel-heading-nocurve">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for..." onChange={this.filter} />
                    <span className="input-group-btn">
                        <a href="#" className="btn btn-default" onClick={ this.addDraft }>
                            <span className="glyphicon glyphicon-plus" />
                        </a>
                    </span>
                </div>
            </div>
        );
    }
});

module.exports = NoteListHeader;