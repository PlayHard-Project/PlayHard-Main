const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

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
      jwt.sign({email: user.email, id: user._id, name: user.firstName}, process.env.JWT_SECRET, {}, (err,token) => {
        if(err) throw err;
        res.cookie('token', token).json(user)
      })
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

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) =>{
            if(err) throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    }
}

module.exports = {
  login,
  getProfile,
};
