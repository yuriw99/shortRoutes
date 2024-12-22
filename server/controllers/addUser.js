const sendInfoDatabase = async (email, password) => {

}

const addUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        sendInfoDatabase(email, password);

        res.status(200).json({ message: 'User added successfully' });

    }catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Failed to add the user' });
    }

}

module.exports = {addUser};
