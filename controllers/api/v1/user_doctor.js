// Require user doctor schema 
const UserDoctor=require('../../../models/user_doctor');

// reequire JWT for generating token
const jwt = require('jsonwebtoken');

// require brcyptjs for encrypting and decrypting password in db
const Bcrypt=require('bcryptjs');


// controller for register the doctor in DB
module.exports.register=function(req,res){

    // checking if password and confirm password matches or not
    if(req.body.password!=req.body.confirm_password){
        return res.json(412, {
            message:"Confirm Password doesn't match"
        });
    }

    // finding doctor using email, if doctor already exists
    UserDoctor.findOne({email:req.body.email},function(err,data){
        if(err){
            return res.json(400,{
                message:err
            });
        }
        
        // if doctor not found with that email, create new doctor
        if(!data){

            // encrypting passwordbefore saving in DB
            req.body.password=Bcrypt.hashSync(req.body.password,10);

            // creating new entry in DB
            UserDoctor.create(req.body,function(err,doctor){
                
                if(err){
                    return res.json(400,{
                        message:err
                    });
                }
                else{

                    // returning success message, with basic details after creating doctor in DB
                    return res.json(201,{
                        message:"User Doctor created Successfully",
                        id:doctor._id,
                        doctor_name:doctor.name,
                        email:doctor.email
                    });
                }
                
            });
        }
        else{

            // if email already exists, return with the same message
            return res.json(412,{
                message:"User Doctor already exists,please login to continue"
            });
        }

    });
}




// controller function for login the doctor 
module.exports.login = async function(req, res){
    try{

        // finding the email with provided mail
        let doctor = await UserDoctor.findOne({email: req.body.email});

        // if doctor not found with given mail or password doesn't match then return with Invalid credentials
        if (!doctor || !Bcrypt.compareSync(req.body.password,doctor.password)){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        // if doctor found and password matches, return with success and provide them JWT token
        else{
            return res.json(200, {
                message: 'Sign in successful, here is your token, please keep it safe!',
                data:  {
                    // creating token using doctor's data and key(hospital_API)
                    token: jwt.sign(doctor.toJSON(), 'hospital_API', {expiresIn:  '100000000'})
                }
            })
        }
        
    // catch error if any
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}