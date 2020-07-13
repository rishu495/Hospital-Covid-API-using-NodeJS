// require express
const express = require('express');

// require router from express
const router = express.Router();

// require passport for middleware auth
const passport=require('passport');

// require patient report controller
const patientReport=require('../../../controllers/api/v1/patient_report');



// post route for showing all reports with partucular given status
router.post('/reports/:status',passport.authenticate('jwt',{session: false}),patientReport.viewReportStatusWise);

// exporting modules
module.exports = router;