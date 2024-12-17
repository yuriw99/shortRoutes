const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'wu.carissa@gmail.com',
        pass: 'your-email-password-or-app-specific-password'
    }
});

const sendVerificationEmail = async (userEmail) => {
    try {
        const fourDigitCode = `${Math.floor(1000 + Math.random() * 9000)}`;

        const mailOptions = {
            from: 'wu.carissa@gmail.com',
            to: userEmail, 
            subject: 'Verify Your Email',
            html: `<p>Please verify your email using this four-digit code: <strong>${fourDigitCode}</strong></p>`
        };

        await transporter.sendMail(mailOptions);

        console.log(`Verification email sent to ${userEmail}`);
        
        return fourDigitCode;
    } catch (error) {
        console.error('Error sending verification email:', error.message);
        throw new Error('Could not send verification email. Please try again later.');
    }
};


