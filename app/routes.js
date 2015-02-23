// app/routes.js

// grab the nerd model we just created
var Todo = require('../models/Todo.js');
var Bd = require('../models/Bd.js');
var Concert = require('../models/Concert.js');

module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  app.get('/api/todos', function(req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)

        res.json(todos); // return all todos in JSON format
      });
    });

  // create todo and send back all todos after creation
  app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
      //name : req.body.text,
      name : req.body.name,
    }, function(err, todo) {
      if (err)
        res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
          if (err)
            res.send(err)
            res.json(todos);
          });
        });

      });

    // route to handle creating goes here (app.post)

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
      Todo.remove({
        _id : req.params.todo_id
      }, function(err, todo) {
        if (err)
          res.send(err);

          // get and return all the todos after you create another
          Todo.find(function(err, todos) {
            if (err)
              res.send(err)
              res.json(todos);
            });
          });
        });

        app.get('/api/bds', function(req, res) {

          // use mongoose to get all bds in the database
          Bd.find(function(err, bds) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
              res.send(err)

              res.json(bds); // return all todos in JSON format
            });
          });

// create BD and send back all todos after creation
app.post('/api/bds', function(req, res) {

  Bd.create({
    titre : req.body.titre,
    scenariste : req.body.scenariste,
    dessinateur : req.body.dessinateur,
    date : req.body.date,
    note : req.body.note
  }, function(err, bd) {
    if (err)
      res.send(err);

      // get and return all the todos after you create another
      Bd.find(function(err, bds) {
        if (err)
          res.send(err)
          res.json(bds);
        });
      });

    });

app.put('/api/bd/:bd_id',function(req, res) {
  console.log(req.params.bd_id);
  Bd.findOne({_id: req.params.bd_id},function(err, bd) {
        if (bd){
          console.log('ok bd');
          console.log(req.body.date);
   bd.titre = req.body.titre;
   bd.scenariste = req.body.scenariste,
   bd.dessinateur = req.body.dessinateur,
   bd.date = req.body.date,
   bd.note = req.body.note
   bd.save(function(err) {
     if (err) res.send(err);
     Bd.find(function(err, bds) {
       if (err)
        res.send(err)
        res.json(bds);
      });
    });
            } else {
              console.log('erreur findone');
          res.send(err);
        }
    });
  });


                   // supprimer une bd
                   app.delete('/api/bd/:bd_id', function(req, res) {
                     Bd.remove({
                       _id : req.params.bd_id
                     }, function(err, bd) {
                       if (err)
                         res.send(err);

                         // get and return all the todos after you create another
                         Bd.find(function(err, bds) {
                           if (err)
                             res.send(err)
                             res.json(bds);
                           });
                         });
                       });

                      // récupérer une bd
                      /* GET /todos/id */
                      app.get('/api/bd/:bd_id', function(req, res, next) {
                        Bd.findById(req.params.bd_id, function (err, bd) {
                          if (err) return next(err);
                          console.log(bd);
                          res.json(bd);
                        });
                      });

	////////////////////////////////////////////
	// API Concerts
	////////////////////////////////////////////
	
	// Liste des concerts
	app.get('/api/concerts', function(req, res) {
		Concert.find(function(err, concerts) {
			if (err)
				res.send(err)
             res.json(concerts); 
        });
    });

	// Création d'un concert et renvoi de la liste des concerts
	app.post('/api/concerts', function(req, res) {
		Concert.create({
			artiste : req.body.artiste,
			avec : req.body.avec,
			salle : req.body.salle,
			date : req.body.date,
			note : req.body.note
		}, function(err, concert) {
			if (err)
				res.send(err);
			Concert.find(function(err, concerts) {
				if (err)
					res.send(err)
				res.json(concerts);
			});
		});
    });

	// Mise à jour d'un concert
	app.put('/api/concert/:concert_id',function(req, res) {
		console.log(req.params.concert_id);
		Concert.findOne({_id: req.params.concert_id},function(err, concert) {
			if (concert){
				concert.artiste = req.body.artiste;
				concert.avec = req.body.avec,
				concert.salle = req.body.salle,
				concert.date = req.body.date,
				concert.note = req.body.note
				concert.save(function(err) {
					if (err) res.send(err);
					Concert.find(function(err, concerts) {
						if (err)
							res.send(err)
						res.json(concerts);
					});
				});
            } else {
				console.log('erreur findone');
				res.send(err);
			}
		});
	});

	// Suppression d'un concert
	app.delete('/api/concert/:concert_id', function(req, res) {
		Concert.remove({
			_id : req.params.concert_id
		}, function(err, concert) {
			if (err)
				res.send(err);
            Concert.find(function(err, concerts) {
				if (err)
					res.send(err)
				res.json(concerts);
            });
        });
    });

	// Récupération d'un concert
	app.get('/api/concert/:concert_id', function(req, res, next) {
		Concert.findById(req.params.concert_id, function (err, concert) {
			if (err) return next(err);
            res.json(concert);
        });
    });

					  // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
      res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

  };

//http://www.kdelemme.com/2014/09/20/build-single-page-application-with-angular-node-mongo-part-ii/
//routes ...