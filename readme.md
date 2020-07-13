                                    <!-- Hospital API for COVID Patient -->
                                                Please Read ME

1. Install all the required dependencies.

2. Implementation of all six routes stated below : 
       --> localhost:8000/api/v1/doctors/register
       --> localhost:8000/api/v1/doctors/login
       --> localhost:8000/api/v1/patients/register
       --> localhost:8000/api/v1/patients/:id/create_report
       --> localhost:8000/api/v1/patients/:id/all_reports
       --> localhost:8000/api/v1/reports/:status


       <!-- First and Second Route can be used to register the doctor itself and generating bearer token respectively --> 

       <!-- Third, Fourth and Fifth route is auth by JWT, so you have to pass bearer token in header which is generated from (doctors/login) route -->
       
       <!-- Only fifth route(:id/all_reports) can be accessed by patient to view their all reports til now by passing their patient_id in params and sendig password through post request-->

       <!-- In place of :id, you have to pass patient id  -->

       <!-- In place of :status, you have to pass status for filtering reports -->
       
       <!-- Pass the required data through the body -->
       


                                                     <!-- COOL STUFF -->

3. Sending text message on the patient given contact.

4. Password is sent via message on given contact of patient.

5. When Report is created by doctor, report is sent to patient contact in the form of text message.

6. Acheived this using library called "TWILIO".

7. Visit www.twilio.com/console for generating (ACCOUNT_SID, FROM and AUTH_TOKEN) and put it directly in the .env_sample file

8. Text message is sent only on the number which is verified by TWILIO.

9. So, make sure when doctor registers patient at very first time, doctor must verify patient's contact on (https://www.twilio.com/     console/phone-numbers/verified) and only then register patient with given contact.

10. If doctor not verifies patient contact on given website, then all things work fine, only text message not sent on patient's contact.

11. When text message sents successfully, there is a message SID prints in console, which is evident that message sent successfully.

12. Encrypting passwords stored in DB using BcryptJS.

13. Generating Random Passwords for patient.

                                            
                                            <!-- Body requests name -->

14. In (localhost:8000/api/v1/doctors/register) route , pass (email,password,confirm_password,name) through the body.

15. In (localhost:8000/api/v1/doctors/login) route , pass (email, password) thorugh the body.

16. In (localhost:8000/api/v1/patients/register) , pass (name, contact, password, confirm_password) through the body and pass(bearer    token from header).
    If password does not provided, it automatically generates random password and sent it to the patients given contact.

17. In (localhost:8000/api/v1/patients/:id/create_report) , pass (status, comments) through the body and pass patient id through params(URL) and pass (bearer token from header).

18. In (localhost:8000/api/v1/patients/:id/all_reports) , pass (password)(Patient's password passed) through the body and patient id through param.

19. In (localhost:8000/api/v1/reports/:status) , pass status through param and pass (bearer token from header).

20. Dependencies used are-->{
    "bcrypt": "^5.0.0",
    "bcryptjs": "^2.4.3",
    "connect-mongo": "^2.0.3",
    "dotenv": "^8.2.0",
    "express": "^4.16.4",
    "generate-password": "^1.5.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.4.6",
    "passport": "^0.4.0",
    "passport-jwt": "^4.0.0",
    "twilio": "^3.48.0"
    }

21. Follow above steps and you are good to go.

22. Thanx for reading.