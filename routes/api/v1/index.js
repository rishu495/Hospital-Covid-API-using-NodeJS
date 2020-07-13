// require express
const express = require('express');

// require router from express
const router = express.Router();

// set route path for /doctors
router.use('/doctors', require('./users_doctor'));

// set route path for /
router.use('/',require('./patient_report'));

// set route path for /patients
router.use('/patients', require('./users_patient'));

// exporting router
module.exports = router;