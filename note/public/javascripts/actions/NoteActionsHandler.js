var FluxDux = require('fluxdux'),
	$ = require('jquery'),
	NoteStore = require('../stores/NoteStore.js');
	
var NoteActionsHandler = {
	save: function(data) {
		NoteStore.reduce('noteSaving', data);
		$.ajax({
			url: '/api/notes',
			method: 'POST',
			data: data,
			dataType: 'json',
			success: function(response, status, xhr) {
				console.log('NoteActionsHandler.save', response);
				NoteStore.reduce('noteSaved', data);
			},
			error: function(xhr, status, e) {
				console.log('Error', status, e);
				NoteStore.reduce('noteSaveFailed', data);
			}
		});
	},
	load: function(data) {
		$.ajax({
			url: '/api/notes',
			method: 'GET',
			dataType: 'json',
			success: function(response, status, xhr) {
				NoteStore.reduce('noteLoaded', {
					firstPage: true,
					list: response.data
				});
			},
			error: function(xhr, status, e) {
				console.log('Error', status, e);
			}
		});
	},
	delete: function(data) {
		$.ajax({
			url: '/api/notes',
			method: 'DELETE',
			dataType: 'json',
			success: function(response, status, xhr) {
				NoteStore.reduce('noteDeleted', data);
			},
			error: function(xhr, status, e) {
				NoteStore.reduce('noteSaveFailed', data);
			}
		});
	}
}

module.exports = NoteActionsHandler;