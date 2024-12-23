const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.PASSWORD_EMAIL
    }
});

const sendVerificationEmail = async (userEmail) => {
    try {
        const fiveDigitCode = `${Math.floor(10000 + Math.random() * 90000)}`;

        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: userEmail,
            subject: 'Verify Your Email',
            html: `<p>Please verify your email using this four-digit code: <strong>${fiveDigitCode}</strong></p>`
        };

        await transporter.sendMail(mailOptions);

        console.log(`Verification email sent to ${userEmail}`);

        return fiveDigitCode;
    } catch (error) {
        console.error('Error sending verification email:', error.message);
        throw new Error('Could not send verification email. Please try again later.');
    }
};


const sendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const verificationCode = await sendVerificationEmail(email);

        res.status(200).json({ message: 'Verification email sent', code: verificationCode });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to send verification email' });
    }
};

module.exports = { sendVerificationCode };



