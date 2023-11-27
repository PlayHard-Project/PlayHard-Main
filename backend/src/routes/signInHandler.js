const User = require('../models/userSchema');

const { tokenSign } = require('../models/middelware/generateToken')
const { compare } = require('../models/middelware/handleBcrypt')

/**
 * Handle all login validations and responses.
 *
 * @param {request} req - The request handled by the login api.
 * @param {response} res - The response after API process the request.
 * @returns {json} A token if it was succesful or an error if not.
 */
const signIn = async (req, res) => {
    try {
      const { email, password } = req.body
  
      const user = await User.findOne({ email })
  
      if (!user) {
        res.json({ error: 'User not found' });
        console.log('User not found');
      } else {
        const checkPassword = await compare(password, user.password);
  
        if (checkPassword) {
          const tokenSession = await tokenSign(user);
          console.log('SignIn Successfully');
          res.json({
            data: user,
            tokenSession
          });
          return;
        }
  
        if (!checkPassword) {
          res.json({
            error: 'Invalid password'
          });
          console.log('Invalid password');
          return;
        }
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

module.exports = {
    signIn,
};