var $ = require('jquery'),
	NoteStore = require('../stores/NoteStore.js');
	
var NoteActionsHandler = {

	save: function(data) {
		var op = (data.status === 'draft' ? 'add' : 'update');
		NoteStore.reduce('noteSaving', data);
		$.ajax({
			url: '/api/notes',
			type: 'POST',
			data: { 
				id: data.id,
				title: data.input.title,
				text: data.input.text,
				date: data.date,
				author: data.author,
				op: op 
			},
			dataType: 'json',
			success: function(response, status, xhr) {
				if (response.meta.status == 1) {
					if (op === 'add') {
						data.id = response.data.id;
					}
					NoteStore.reduce('noteSaved', data);	
				} else {
					NoteStore.reduce('noteSaveFailed', data);
				}
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
			type: 'GET',
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
		if (data.status === 'draft') {
			NoteStore.reduce('noteDeleted', data);
			return;
		}
		NoteStore.reduce('noteDeleting', data);
		$.ajax({
			url: '/api/notes',
			type: 'DELETE',
			data: data,
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