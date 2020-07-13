// Require Report Schema
const Report=require('../../../models/patient_report');

// Require patient user schema
const UserPatient = require('../../../models/user_patient');

// Require bcryptjs for encrypting and decrypting the passwords stored in DB
const Bcrypt=require('bcryptjs');

// Require Twilio for sending the text messages on patient given phone number
const twilio = require('twilio');

// Require dotenv 
require('dotenv').config();

// Controller for creating the report by doctor
module.exports.createReport=function(req,res){
    
    //finding patient id sent through params 
    UserPatient.findById(req.params.id,function(err,patient){

        if(err){
            return res.json(400,{
                message:err
            });
        }

        // if patient found with given id
        if(patient){

            // creating the report of that particular patient
            Report.create({patient:req.params.id,
                            doctor:req.user._id,
                            status:req.body.status,
                            comments:req.body.comments},

            // callback function for creating report
            function(err,report){

                if(err){
                    return res.json(400,{
                        messgae:err
                    })
                }

                // logic after creating the report 
                else{

                    // message setup for sending the text message using twilio
                    var accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
                    var authToken = process.env.AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console


                    var client = new twilio(accountSid, authToken);
                    client.messages.create({
                        // sent message body
                        body: 'Hello '+patient.name+' Your Report Status is - '+req.body.status+' . Any Extra Comments  - '+req.body.comments,
                        to: patient.contact,  // Text this number
                        from: process.env.FROM // From a valid Twilio number
                    })
                    // print SID on console after sending message successfully 
                    .then((message) => console.log(message.sid));

                    // return success message
                    return res.json(200,{
                        message:"Report Created Successfully",
                        created_report:report
                    })
                }
                
            })
        }

        else{
            // if patient not found with given id,return not found
            return res.json(404,{
                message:"Patient Not Registered"
            })
        }

    })

}



// controller function for display all reports till date of any patient  
module.exports.viewAllReport=function(req,res){

    // finding user with id field passed thorugh params
    UserPatient.findById(req.params.id,function(err,patient){

        // checking the entered password , correct or not
        if(Bcrypt.compareSync(req.body.password,patient.password)){
            
            //finding all reports from REPORT collection using patient id 
            Report.find({patient:req.params.id},function(err,report){
                if(err){
                    return res.json(400,{
                        message:err
                    })
                }

                // return all reports if it is not empty
                if(report.length!=0){
                    return res.json(200,{
                        message:"Your all reports till Now",
                        reports:report
                    })
                }

                // if no reports are there, return with same
                else{
                    return res.json(400,{
                        message:"No reports found"
                    })
                }
            })
        }

        // if entered password doen't matches, return with same
        else{
            return res.json(400,{
                message:"Your password doesn't match"
            })
        }
    })

}


// controller function for viewing report status WIse
module.exports.viewReportStatusWise=async function(req,res){


    try{
        // finding all reports with given status provided in param and populating the patient and doctor detail related to that report
        let report = await Report.find({status: req.params.status})
        .populate('patient', 'name contact')
        .populate('doctor', 'name email');

        // if no reports found with provided status, return with same message
        if(report.length==0){
            return res.json(200,{
                message:"Patient Not Found with this status"
            })
        }
        // if reports found, return all reports with provided status
        else{
            return res.json(200,{
                message:"Patient with provided status :",
                reports:report
            })
        }
    }

    // catches error, if any
    catch{
        return res.json(400,{
            message:err
        })
    }


}