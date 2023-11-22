const User = require('../models/userSchema');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        error: 'No user found'
      });
    }

    // Check if password matches (without bcrypt for now)
    const passwordMatch = password === user.password;

    if (passwordMatch) {
      res.json({
        message: 'Login successful'
      });
    } else {
      res.json({
        error: 'Password does not match'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

module.exports = {
  login
};
