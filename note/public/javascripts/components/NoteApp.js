var React = require('react');
var FluxDux = require('fluxdux');

var NoteList    = require('./NoteList.js');
var NoteDetail  = require('./NoteDetail.js');

var NoteUIStateStore = require('../stores/NoteUIStateStore.js');
var NoteStore = require('../stores/NoteStore.js');

var NoteActions = require('../actions/NoteActions.js');
var NoteActionsHandler = require('../actions/NoteActionsHandler.js')

var NoteApp = React.createClass({displayName: 'NoteApp',
    getInitialState : function() {
        return {
            ui : NoteUIStateStore.getState(),
            data : NoteStore.getState()
        };
    },
    onUIStateChange : function(data) {
        this.setState({ ui: data });
    },
    onDataStateChange : function(data) {
        this.setState({ data: data });
    },
    componentDidMount : function() {
        this.unsubcribe1 = NoteUIStateStore.change(this.onUIStateChange);
        this.unsubcribe2 = NoteStore.change(this.onDataStateChange);
        
        FluxDux.handle(NoteActions, NoteActionsHandler);
        NoteActions.load({});
    },
    componentWillUnmount : function() {
        this.unsubcribe1();
        this.unsubcribe2();
    },
    render: function() {
        var note;
        if (this.state.ui.currentNoteId >= 0) {
            for (var i in this.state.data) {
                note = this.state.data[i];
                if (note.id === this.state.ui.currentNoteId) {
                    break;
                }
            }
        }
        
        return (
            <div id="note-app-container">
                <NoteList data={this.state.data} selected={this.state.ui.currentNoteId} filter={this.state.ui.filter} />
                <NoteDetail editMode={this.state.ui.editMode} note={note} />
            </div>
        );
    }
});

module.exports = NoteApp;