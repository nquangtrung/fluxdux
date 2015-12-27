var React = require('react');

var NoteListItem = React.createClass({displayName: 'NoteListItem',
    render: function() {
        return (
            <a className="note-app-list-item list-group-item" href="#">
                <h4 className="list-group-item-heading">{ this.props.author }</h4>
                <div className="list-group-item-text">{ this.props.children.toString() }</div>
            </a>
        );
    }
});

module.exports = NoteListItem;
