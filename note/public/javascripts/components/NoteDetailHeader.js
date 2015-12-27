var React = require('react');

var NoteDetailHeader = React.createClass({displayName: 'NoteDetailHeader',
    dispatchOnClick : function(e) {
        alert("Hello");
        console.log(e);
    },
    render: function() {
        return (
            <div className="panel-heading panel-heading-nocurve" id="note-detail-header">
                <div className="btn-group pull-right">
                    <a href="#" className="btn btn-default" action="edit" onClick={ this.dispatchOnClick }>
                        <span className="glyphicon glyphicon-pencil" />
                    </a>
                    <a href="#" className="btn btn-danger" action="delete" onClick={ this.dispatchOnClick }>
                        <span className="glyphicon glyphicon-trash" />
                    </a>
                </div>
                <div className="clearfix" />
            </div>
        );
    }
});

module.exports = NoteDetailHeader;
