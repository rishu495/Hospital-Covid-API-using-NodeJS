// require mongoose
const mongoose=require('mongoose');

// creating patientReport Schema
const userDoctorSchema=new mongoose.Schema({
    email:{ 
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    }
},{
    timestamps: true
});

const UserDoctor=mongoose.model('UserDoctor',userDoctorSchema);

// exporting UserDoctor model Schema
module.exports=UserDoctor;