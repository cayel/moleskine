// app/routes.js


var Todo = require('../models/Todo.js');
var Bd = require('../models/Bd.js');
var Concert = require('../models/Concert.js');
var Book = require('../models/Book.js');
var Film = require('../models/Film.js');
var User = require('../models/Users.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes
  
  app.post('/register', function(req, res, next){
  	if(!req.body.username || !req.body.password){
    	return res.status(400).json({message: 'Please fill out all fields'});
  	}	

  	var user = new User();
  	user.username = req.body.username;
  	user.setPassword(req.body.password)
  	user.save(function (err){
    	if(err){ return next(err); }
    	return res.json({token: user.generateJWT()})
  	});
  });
  
  app.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      	return res.status(401).json(info);
    	}
  	})(req, res, next);
  });

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

	////////////////////////////////////////////
	// API Livres
	////////////////////////////////////////////
	
	// Liste des livres
	app.get('/api/books', function(req, res) {
		Book.find(function(err, books) {
			if (err)
				res.send(err)
             res.json(books); 
        });
    });

	// Création d'un livre et renvoi de la liste des livres
	app.post('/api/books', function(req, res) {
		Book.create({
			titre : req.body.titre,
			auteur : req.body.auteur,
			date : req.body.date,
			note : req.body.note
		}, function(err, book) {
			if (err)
				res.send(err);
			Book.find(function(err, books) {
				if (err)
					res.send(err)
				res.json(books);
			});
		});
    });

	// Mise à jour d'un livre
	app.put('/api/book/:book_id',function(req, res) {
		console.log(req.params.book_id);
		Book.findOne({_id: req.params.book_id},function(err, book) {
			if (book){
				book.titre = req.body.titre;
				book.auteur = req.body.auteur,
				book.date = req.body.date,
				book.note = req.body.note
				book.save(function(err) {
					if (err) res.send(err);
					Book.find(function(err, books) {
						if (err)
							res.send(err)
						res.json(books);
					});
				});
            } else {
				console.log('erreur findone');
				res.send(err);
			}
		});
	});

	// Suppression d'un livre
	app.delete('/api/book/:book_id', function(req, res) {
		Book.remove({
			_id : req.params.book_id
		}, function(err, book) {
			if (err)
				res.send(err);
            Book.find(function(err, books) {
				if (err)
					res.send(err)
				res.json(books);
            });
        });
    });

	// Récupération d'un livre
	app.get('/api/book/:book_id', function(req, res, next) {
		Book.findById(req.params.book_id, function (err, book) {
			if (err) return next(err);
            res.json(book);
        });
    });	
	
	////////////////////////////////////////////
	// API Films
	////////////////////////////////////////////
	
	// Liste des films
	app.get('/api/films', function(req, res) {
		Film.find(function(err, films) {
			if (err)
				res.send(err)
             res.json(films); 
        });
    });
/*
	// Liste des films 2015
	app.get('/api/films/last3', function(req, res) {
		//Film.find({ date : { $gt: "01/01/2015" } }, function(err, films) {
		Film.find().limit(3).sort({date : 'desc'}).exec( function(err, films) {		
			if (err)
				res.send(err)
             res.json(films); 
        });
    });
*/
	// Création d'un film et renvoi de la liste des films
	app.post('/api/films', function(req, res) {
		Film.create({
			titre : req.body.titre,
			realisateur : req.body.realisateur,
			cine : req.body.cine,
			date : req.body.date,
			note : req.body.note
		}, function(err, film) {
			if (err)
				res.send(err);
			Film.find(function(err, films) {
				if (err)
					res.send(err)
				res.json(films);
			});
		});
    });

	// Mise à jour d'un film
	app.put('/api/film/:film_id',function(req, res) {
		console.log(req.params.film_id);
		Film.findOne({_id: req.params.film_id},function(err, film) {
			if (film){
				film.titre = req.body.titre;
				film.realisateur = req.body.realisateur,
				film.cine = req.body.cine,
				film.date = req.body.date,
				film.note = req.body.note
				film.save(function(err) {
					if (err) res.send(err);
					Film.find(function(err, films) {
						if (err)
							res.send(err)
						res.json(films);
					});
				});
            } else {
				console.log('erreur findone');
				res.send(err);
			}
		});
	});

	// Suppression d'un film
	app.delete('/api/film/:film_id', function(req, res) {
		Film.remove({
			_id : req.params.film_id
		}, function(err, film) {
			if (err)
				res.send(err);
            Film.find(function(err, films) {
				if (err)
					res.send(err)
				res.json(films);
            });
        });
    });

	// Récupération d'un film
	app.get('/api/film/:film_id', function(req, res, next) {
		Film.findById(req.params.film_id, function (err, film) {
			if (err) return next(err);
            res.json(film);
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