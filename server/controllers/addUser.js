const mongoose = require('mongoose');
const User = require('../models/User');


const connection = 'mongodb+srv://yuriw:TUr9QMmVjl5Upsk8@shortroutesusers.d6kud.mongodb.net/Users?retryWrites=true&w=majority&appName=ShortRoutesUsers';

const connectDB = async () => {
    try {
        await mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to Users database");
    } catch (error) {
        console.log("Failed to connect to Users database:", error);
    }
};


const sendInfoDatabase = async (email, password) => {
    try {
        const user = new User({
            email: email,
            password: password
        });

        const result = await user.save();
        console.log("User is saved:", result);
    } catch (error) {
        console.error("Error saving user:", error);
    }
};


const addUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email != "initial email") {
            connectDB();
            sendInfoDatabase(email, password);

            res.status(200).json({ message: 'User added successfully' });
        } else {
            res.status(400).json({ message: "Tried to add 'initial email, not real email" })
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Failed to add the user' });
    }

}

module.exports = { addUser };
