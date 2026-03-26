const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'https://allan.heartkeystudio.com', // seu frontend
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields required' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false, // TLS via STARTTLS
        auth: {
            user: process.env.BREVO_SMTP_USER,
            pass: process.env.BREVO_SMTP_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.BREVO_FROM_EMAIL,
            to: 'devao.developer@gmail.com',
            subject: `New Contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });
        res.json({ success: true });
    } catch (error) {
        console.error('sendMail error', error);
        res.status(500).json({ error: error.message || 'Failed to send email' });
    }
});

// Se rodando localmente com `node server.js` (teste):
if (process.env.NODE_ENV !== 'production' && require.main === module) {
    app.listen(3000, () => console.log('Server running on port 3000'));
}

module.exports = app;