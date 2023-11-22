const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createRoutes(router, model, baseRoute) {
    router.post(`/${baseRoute}`, async (req, res) => {
        try {
            const { name, email, password, isAdmin } = req.body;

            if (!name) {
                return res.json({ error: 'Error 400 Bad Request: Name is required' });
            }

            if (!email) {
                return res.json({ error: 'Error 400 Bad Request: Email is required' });
            }

            if (!email.endsWith('@gmail.com')) {
                return res.json({ error: ' Error 400 Bad Request: Invalid email format, use @gmail' });
            }

            const exist = await User.findOne({ email });
            if (exist) {
                return res.json({ error: 'Error 409 Conflicts: Email is already registered' });
            }

            if (!password) {
                return res.json({ error: 'Error 400 Bad Request: Password is required' });
            }

            if (password.length < 6) {
                return res.json({ error: 'Error 400 Bad Request: Password should be at least 6 characters long' });
            }

            if (!isAdmin) {
                return res.json({ error: 'Error 400 Bad Request: It is required to know if the user is an admin'})
            }

            const passwordHash = await bcrypt.hashSync(password, 8);
            console.log(passwordHash);

            const user = await User.create({
                name,
                email,
                password: passwordHash,
                isAdmin,
            });

            return res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error 500: Internal Server Error' });
        }
    });

    router.get(`/${baseRoute}`, (req, res) => {
        model
            .find()
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }));
    });
}

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
    createRoutes,
    login,
    getProfile,
};