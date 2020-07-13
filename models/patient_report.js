// require mongoose
const mongoose = require('mongoose');

// creating patientReport Schema 
const patientReportSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    patient: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'UserPatient',
        required:true

    },
    
    doctor: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'UserDoctor',
        required:true
    },
    comments: {
        type: String
    }
    
},{ 
    timestamps: true
});


const Report = mongoose.model('Report', patientReportSchema);

// exporting the Report model schema
module.exports = Report;