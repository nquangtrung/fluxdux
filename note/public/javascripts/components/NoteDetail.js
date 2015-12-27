var React = require('react');

var NoteDetailHeader = require('./NoteDetailHeader.js');
var NoteDetailFooter = require('./NoteDetailFooter.js');
var NoteContent = require('./NoteContent.js');
var NoteEditor = require('./NoteEditor.js');

var data = {
    author : "Trung Tròn Trịa",
    title : "Xin chào các bạn",
    date : "2015/12/25",
    text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

var NoteDetail = React.createClass({displayName: 'NoteDetail',
    render: function() {
        return (
            <div className="col-md-8" id="note-detail">
                <div className="panel panel-default panel-nocurve">
                    <NoteDetailHeader />
                    <div className="panel-body panel-body-nopadding">
                        <NoteContent note={data} />
                        <NoteEditor note={data} />
                    </div>
                    <NoteDetailFooter />
                </div>
            </div>
        );
    }
});

module.exports = NoteDetail;
