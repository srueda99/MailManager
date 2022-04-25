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

// Set up the mail server
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "sonia.corwin6@ethereal.email",
        pass: "e8cUYFdetnuNyzbE1r"
    }
});

// --- SEND ROUTE ---
app.post('/send', (req, res) => {
    var mailParams = {
        from: "sonia.corwin6@ethereal.email",
        to: "sonia.corwin6@ethereal.email",
        subject: "Enviado desde el server",
        text: "Puedes leer esto?"
    };

    transporter.sendMail(mailParams, (error, info) => {
        if(error) {
            res.status(500).send(error.message);
        }
        else {
            console.log("Mensaje enviado");
            res.status(200).jsonp(req.body);
        }
    });
});