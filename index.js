var instagram = require('instagram-nodejs');

var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

var express = require('express');
var app = express();

var ins = instagram.init(config.token);

/**Set header and body
* @param object res (express response object)
* @param object response (from lib instagram-nodejs request-promise object)
* return void
*/
function setHeaderBody(res, response){
	res.set('Content-Type', 'application/json');
	res.status(response.statusCode);
	res.send(response.body);
}

app.get('/popular', function(req, res, next){
	console.log('response will be sent by the next function ...');
  	next();
}, function (req, res) {
	ins.connect('/media/popular', 'GET')
		.then(function (response) {
			setHeaderBody(res, response);
    	})
    	.catch(function (err) {
        	console.error(err);
    	});
});

//Get media by id
app.get('/media/:id', function(req, res, next){
  	next();
}, function (req, res) {
	ins.media(req.params.id)
		.then(function (response) {
			setHeaderBody(res, response);
    	})
    	.catch(function (err) {
        	console.error(err);
    	});
});

//Get media popular
app.get('/media/popular', function(req, res, next){
  	next();
}, function (req, res) {
	ins.mediaPopular()
		.then(function (response) {
			setHeaderBody(res, response);
    	})
    	.catch(function (err) {
        	console.error(err);
    	});
});


//Get user by id
app.get('/users/:id', function(req, res, next){
  	next();
}, function (req, res) {
	ins.users(req.params.id)
    .then( function (response){
      res.status(response.statusCode);
      res.send(response.body);
    }, function(response){
      res.status(response.statusCode);
      res.send(response.body);
    });
});
//Get user media recent
app.get('/users/:id/media/recent', function(req, res, next){
    next();
}, function (req, res) {
  ins.usersMediaRecent(req.params.id, req.query.max_id)
    .then(function (response) {
      setHeaderBody(res, response);
      })
      .catch(function (err) {
          console.error(err);
      });
});
//Get user followed-by
app.get('/users/:id/followed-by', function(req, res, next){
    next();
}, function (req, res) {
  ins.usersFollowedBy(req.params.id, req.query.max_id)
    .then(function (response) {
      setHeaderBody(res, response);
      })
      .catch(function (err) {
          console.error(err);
      });
});
//Get user relationship
app.get('/users/:id/relationship', function(req, res, next){
    next();
}, function (req, res) {
  ins.usersGetRelationship(req.query.max_id)
    .then(function (response) {
      setHeaderBody(res, response);
      })
      .catch(function (err) {
          console.error(err);
      });
});

//Search users
app.get('/users/search', function(req, res, next){
    next();
}, function (req, res) {
  ins.usersSearch(req.query.q)
    .then(function (response) {
      setHeaderBody(res, response);
      })
      .catch(function (err) {
          console.error(err);
      });
});

//Get users self feed
app.get('/users/self/feed', function(req, res, next){
  	next();
}, function (req, res) {
	ins.usersSelfFeed(req.query.max_id)
		.then(function (response) {
			setHeaderBody(res, response);
    	})
    	.catch(function (err) {
        	console.error(err);
    	});
});



//Get user self media liked
app.get('/users/self/media/liked', function(req, res, next){
  	next();
}, function (req, res) {
	ins.usersSelfMediaLiked(req.query.max_id)
		.then(function (response) {
			setHeaderBody(res, response);
    	})
    	.catch(function (err) {
        	console.error(err);
    	});
});



//Get user requested-by
app.get('/users/self/requested-by', function(req, res, next){
  	next();
}, function (req, res) {
	ins.usersSelfRequestedBy(req.query.max_id)
		.then(function (response) {
			setHeaderBody(res, response);
    	})
    	.catch(function (err) {
        	console.error(err);
    	});
});

//Get comments of media by media_id
app.get('/media/:id/comment', function(req, res, next){
  	next();
}, function (req, res) {
	ins.mediaGetComment(req.params.id)
		.then(function (response) {
			setHeaderBody(res, response);
    	})
    	.catch(function (err) {
        	console.error(err);
    	});
});

//Get likes of media by media_id
app.get('/media/:id/like', function(req, res, next){
  	next();
}, function (req, res) {
	ins.mediaGetLikes(req.params.id)
		.then(function (response) {
			setHeaderBody(res, response);
    	})
    	.catch(function (err) {
        	console.error(err);
    	});
});

//Get recent media by tag name
app.get('/tags/media/recent/:name', function(req, res, next){
  	next();
}, function (req, res) {
	ins.tagsMediaRecent(req.params.nam, req.query.max_id)
		.then(function (response) {
			setHeaderBody(res, response);
    	})
    	.catch(function (err) {
        	console.error(err);
    	});
});

//Search tags by name
app.get('/tags/search', function(req, res, next){
  	next();
}, function (req, res) {
	ins.tagsSearch(req.query.q)
		.then(function (response) {
			setHeaderBody(res, response);
    	})
    	.catch(function (err) {
        	console.error(err);
    	});
});

var server = app.listen(config.port, function () {
  var host = config.base_url;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
