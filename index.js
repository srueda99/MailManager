// --- IMPORTS ---
const express = require('express');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

// --- SERVER ---
// Start the server running with port as env variable
const app = express();
const port = process.env.PORT || 4040;
app.listen(port, () => {
	console.log('****************************');
    console.log(`Server running on port: ${port}`);
});

// Set up the mail server with gmail credentials
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // 465 is the secure port
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Credentials verification
transporter.verify().then(() => {
    console.log('Connection established with Gmail');
});

// --- SEND ROUTE ---
app.post('/send', (req, res) => {
    var mailParams = {
        from: process.env.EMAIL,
        to: "sebasruedam99@gmail.com",
        subject: "Sent from server",
        text: "Can ya read this?"
    };

    transporter.sendMail(mailParams, (error, info) => {
        if(error) {
            res.status(500).send(error.message);
        }
        else {
            console.log('Message sent.');
            res.status(200).jsonp(req.body);
        }
    });
});