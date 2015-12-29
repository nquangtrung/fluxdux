var express = require('express');
var router = express.Router();

var data = [ ]; 

router.get('/notes', function(req, res, next) {
	setTimeout(function() {
	    res.send({
			meta: {
				status: 1,
				message: "Everything is peachy"
			},
			data: data
		});
	}, 1000);
});

router.post('/notes', function(req, res, next) {
	if (data.length > 100) {
		data.splice(0, 50);
	}
	setTimeout(function() {
		var responseData;
		if (req.body.op === 'add') {
			responseData = req.body;
			responseData.id = (data.length > 0 ? (data[data.length - 1].id + 1) : 1);
			responseData.op = undefined;
			data.push(responseData);
		} else if (req.body.op === 'update') {
			var note = req.body;
			for (var idx in data) {
				if (data[idx].id == note.id) {
					data[idx].title = note.title;
					data[idx].text = note.text;
					responseData = data[idx];
				}
			}
		} else {
			res.send({
				meta: {
					status: -1,
					message: "Operation mismatched"
				},
				data: req.body
			});
		}

	    res.send({
			meta: {
				status: 1,
				message: "Everything is peachy"
			},
			data: responseData
		});
	}, 1000);
});

router.delete('/notes', function(req, res, next) {
	setTimeout(function() {
	    var note = req.body;
		for (var idx in data) {
			if (data[idx].id == note.id) {
				data.splice(idx, 1);
				break;	
			}
		}
		res.send({
			meta: {
				status: 1,
				message: "Everything is peachy"
			},
			data: req.body
		});
	}, 1000);
});

module.exports = router;
