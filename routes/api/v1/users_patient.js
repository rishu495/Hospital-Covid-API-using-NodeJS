// require express
const express = require('express');

// require router from express
const router = express.Router();

// require passport for JWT auth
const passport=require('passport');

// require patient report controller
const patientReport=require('../../../controllers/api/v1/patient_report');

// require user patient controller
const userPatient=require('../../../controllers/api/v1/user_patient');

// setting post route for register patient by doctor using JWT auth
router.post('/register/', passport.authenticate('jwt',{session: false}), userPatient.register);

// setting post route for creating report by doctor using JWT auth
router.post('/:id/create_report',passport.authenticate('jwt',{session: false}),patientReport.createReport);

// setting post route for viewAll report by patient 
router.post('/:id/all_reports',patientReport.viewAllReport);



// exporting the router
module.exports = router;