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
        return res.json({ error: 'Error 404: User not found' });
      } 
        const checkPassword = await compare(password, user.password);
  
        if (checkPassword) {
          const tokenSession = await tokenSign(user);
          res.json({
            data: user,
            tokenSession
          });
          return;
        } else {
          res.json({ error: 'Error 401: Incorrect password' });
      }
      
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

module.exports = {
    signIn,
};