var React = require('react');
var NoteListHeader = React.createClass({displayName: 'NoteListHeader',
    dispatchOnClick : function() {
        alert("dispatchOnClick");
    },
    render: function() {
        return (
            <div className="panel-heading panel-heading-nocurve">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for..." />
                    <span className="input-group-btn">
                        <a href="#" className="btn btn-default">
                            <span className="glyphicon glyphicon-search" />
                        </a>
                        <a href="#" className="btn btn-default" onclick={ this.dispatchOnClick }>
                            <span className="glyphicon glyphicon-plus" />
                        </a>
                    </span>
                </div>
            </div>
        );
    }
});

module.exports = NoteListHeader;