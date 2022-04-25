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

// Set up the mail server with Ethereal mail
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'sonia.corwin6@ethereal.email',
        pass: 'e8cUYFdetnuNyzbE1r'
    }
});

// --- SEND ROUTE ---
app.post('/send', (req, res) => {
    var mailParams = {
        from: 'sonia.corwin6@ethereal.email',
        to: 'sonia.corwin6@ethereal.email',
        subject: 'Sent from server',
        text: 'Can ya read this?'
    };

    transporter.sendMail(mailParams, (error, info) => {
        if(error) {
            res.status(500).send(error.message);
        }
        else {
            console.log('The message was sent.');
            res.status(200).jsonp(req.body);
        }
    });
});