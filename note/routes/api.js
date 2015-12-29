var express = require('express');
var router = express.Router();

var data = [
    {id: 1, author: "Pete Hunt", title: "Title1", text: "This is one sample comment", date: "2015/12/25" },
    {id: 2, author: "Jordan Walke",  title: "Title2", text: "This is *saved* sample comment", date: "2015/12/25" },
    {id: 3, author: "Molly",  title: "Title3", text: "This is *saving* sample comment", date: "2015/12/25" },
    {id: 4, author: "Margin",  title: "Title4", text: "This is *deleting* sample comment", date: "2015/12/25" },
    {id: 5, author: "Hello",  title: "Title5", text: "This is *draft* sample comment", date: "2015/12/25" },
    {id: 6, author: "Mike",  title: "Title6", text: "This is *modified* sample comment", date: "2015/12/25" }
]; 

router.get('/notes', function(req, res, next) {
	res.send({
		meta: {
			status: 1,
			message: "Everything is peachy"
		},
		data: data
	});
});

router.post('/notes', function(req, res, next) {
	setTimeout(function() {
	    res.send({hello:"hello"});
	}, 500);
});

router.delete('/notes/:id', function(req, res, next) {
	setTimeout(function() {
	    res.send({hello:"hello"});
	}, 500);
});

module.exports = router;
