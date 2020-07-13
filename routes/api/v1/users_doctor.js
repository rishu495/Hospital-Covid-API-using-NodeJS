// require express
const express = require('express');

// require router from express
const router = express.Router();

// require user docter controller 
const userDoctor=require('../../../controllers/api/v1/user_doctor');

// setting post route for registration of new doctor
router.post('/register', userDoctor.register);

// setting post route for login of doctor
router.post('/login',userDoctor.login);

// exporting router
module.exports = router;