// require mongoose
const mongoose=require('mongoose');

// creating the userPatient Schema
const userPatientSchema= new mongoose.Schema({
    contact:{
        type: String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    name: {
        type: String,
        required:true
    }
},{
    timestamps: true
});


const UserPatient=mongoose.model('UserPatient',userPatientSchema);

// exporting the user Patient model Schema
module.exports=UserPatient;