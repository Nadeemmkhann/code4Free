const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;
  
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Specify your email provider configuration here
      service: 'Gmail',
      auth: {
        user: 'code44free@gmail.com',
        pass: 'uouqpmncnxwnfzhw',
      },
    });
  
    // Set up the email data
    const mailOptions = {
        from: `${name} <code44free@gmail.com>`,
        to: 'code44free@gmail.com',
        subject: "Query",
        html: `
        <div>
        <p>From: ${name}</p>
        <p>Email: ${email}</p>
        <p>${message}</p>
      </div>
      `
        };
  
    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Email sent');
      res.status(200).json({ message: 'Email sent' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  });

app.listen(process.env.PORT || 4000)