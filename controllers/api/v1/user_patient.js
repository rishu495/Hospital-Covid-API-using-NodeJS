// require user Patient model
const UserPatient=require('../../../models/user_patient');

// require twilio for messaging service
const twilio = require('twilio');

// require generate-password for generating password, if password not set during patient registration
const generator = require('generate-password');

// require bcryptjs for encrypting and decrypting the password stored in DB
const Bcrypt=require('bcryptjs');

// Require dotenv 
require('dotenv').config();

//controller function for register new patient 
module.exports.register=function(req,res){

    // validation check for password and confirm password
    if(req.body.password!=req.body.confirm_password){
        return res.json(412, {
            message:"Confirm Password doesn't match"
        });
    }

    // finding the patient using their provided phone number 
    UserPatient.findOne({contact:req.body.contact},function(err,data){
        if(err){
            return res.json(400,{
                message:err
            });
        }

        // if phone number not foud, create new patient 
        if(!data){

            // if password not set at time of registration 
            if(!req.body.password){
                // genearting random password
                 var password = generator.generate({
                    length: 10,
                    numbers: true
                });

                // setting the generated password in request body
                req.body.password=password;
            }

            // storing password before encrypting
            const messagePassword=req.body.password;

            // encrypting password
            req.body.password=Bcrypt.hashSync(req.body.password,10);

            // creating patient with the given details
            UserPatient.create(req.body,function(err,patient){


                if(err){
                    return res.json(400,{
                        message:err
                    });
                }

                // after successfully creating the patient
                else{
                    var accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
                    var authToken = process.env.AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

                    // message setup for sending the password on mobile number provided by patient
                    var client = new twilio(accountSid, authToken);
                    client.messages.create({
                        // message body that has to be sent
                        body: 'Hello '+patient.name+' Your Password is - '+messagePassword+' . Keep it for future reference!',
                        to: req.body.contact,  // Text this number
                        from: process.env.FROM // From a valid Twilio number
                    })

                    // print message SID after successfully sending the message
                    .then((message) => console.log(message.sid));
                    
                    // return success message with basic details 
                    return res.json(201,{
                        message:"User Patient created Successfully",
                        id:patient._id,
                        patient_Name: patient.name,
                        contact: patient.contact
                    });
                }
                
            });
        }
        else{
            // if patient already exists with given phone number, return with same message
            return res.json(412,{
                message:"User Patient already exists,login to continue"
            });
        }

    });
}