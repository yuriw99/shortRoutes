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

const loginUser = async (req, res) => {
try {
    const { email, password } = req.body;
    connectDB();
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(200).json({ message: 'User not found' });
    }
    if (user.password == password) {
        req.session.user = { email, password };
        return res.status(200).json({ message: 'this is the correct user' });
    }
    else {
        return res.status(200).json({ message: 'incorrect password' });
    }
} catch(error){
    return res.status(200).json({message: 'cannot connect'});
}

}

module.exports = {loginUser};