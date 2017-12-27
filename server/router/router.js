var express = require('express');
var router = express.Router();
const path = require('path');
const loginValidate = require("../login/loginValidate");


// GET route for reading data
router.get('/', function (req, res, next) {
    if(!loginValidate.wasLoginSuccessful()) {
        res.redirect("/login")
    } else {
        res.redirect("./public/mainScreen/");
    }
});


//POST route for updating data
// router.post('/', function (req, res, next) {
//   // confirm that user typed same password twice
//   if (req.body.password !== req.body.passwordConf) {
//     var err = new Error('Passwords do not match.');
//     err.status = 400;
//     res.send("passwords dont match");
//     return next(err);
//   }

//   if (req.body.email &&
//     req.body.username &&
//     req.body.password &&
//     req.body.passwordConf) {

//     var userData = {
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password,
//       passwordConf: req.body.passwordConf,
//     }

//     User.create(userData, function (error, user) {
//       if (error) {
//         return next(error);
//       } else {
//         req.session.userId = user._id;
//         return res.redirect('/profile');
//       }
//     });

//   } else if (req.body.logemail && req.body.logpassword) {
//     User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
//       if (error || !user) {
//         var err = new Error('Wrong email or password.');
//         err.status = 401;
//         return next(err);
//       } else {
//         req.session.userId = user._id;
//         return res.redirect('/profile');
//       }
//     });
//   } else {
//     var err = new Error('All fields required.');
//     err.status = 400;
//     return next(err);
//   }
// })

router.get("/public/mainScreen/", function(req, res) {
	res.sendFile( __dirname + "/public/" + "mainScreen/" + "mainPage.html" );
})

router.get('/login', function(req, res, next) {
	res.sendFile(__dirname + "/../login/index.html");
})

router.post('/login', function(req, res, next) {
	if(loginValidate.wasLoginSuccessful()) {
		res.redirect("/login")
	} else {
		res.redirect("./public/mainScreen/");
	}
})

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;