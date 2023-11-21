const User = require('../models/userSchema')


const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // Check name
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        };
        // Check email
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'Email is already register'
            })
        };
        // Check password
        if (!password || password.lenght < 6){
            return res.json({
                error: 'Password is required and should be at least 6 characters laong'
            })
        };

        const user = await User.create({
            name, email, password
        })

        return res.jason(user)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    registerUser
}