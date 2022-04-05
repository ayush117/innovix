const { User, validate } = require('../models/Usermodel');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");


// const contactEmail = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: "ayush.trivedikrish@gmail.com",
//       pass: "********",
//     },
//   });
  
//   contactEmail.verify((error) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Ready to Send");
//     }
//   });

// router.post('/login', (req, res) => {
//     res.send({
//       token: 'test123'
//     });
// });

router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "***************@gmail.com",
        subject: "Contact Form Submission",
        html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    console.log('==>>',name,email,message);
    // contactEmail.sendMail(mail, (error) => {
    //     if (error) {
    //         res.json({ status: "ERROR" });
    //     } else {
    //         res.json({ status: "Message Sent" });
    //     }
    // });
});

router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    console.log('SERVER====>');
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        console.log('SERVER====>');
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
});

module.exports = router;

