const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { tokenSign, verifyToken } = require('../models/middelware/generateToken')
const { encrypt, compare } = require('../models/middelware/handleBcrypt')
const cookie = require('cookie');

/**
 * Creates routes for handling user-related operations.
 * 
 * @param {Object} router - Express router object.
 * @param {Object} model - Mongoose model for user data.
 * @param {string} baseRoute - Base route for user-related operations.
 */
async function createRoutes(router, model, baseRoute) {

    /**
     * Handles the creation of a new user.
     * @function
     * @name POST /baseRoute
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Object} - JSON response containing either user data or an error message.
     */
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

            const atIndex = email.indexOf('@');
            if (atIndex === -1 || atIndex === 0) {
                return res.json({ error: 'Error 400 Bad Request: Invalid email format, missing text before @gmail.com' });
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
                return res.json({ error: 'Error 400 Bad Request: It is required to know if the user is an admin' })
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

    /**
     * Handles the retrieval of all users.
     * @function
     * @name GET /baseRoute
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Object} - JSON response containing either user data or an error message.
     */
    router.get(`/${baseRoute}`, (req, res) => {
        model
            .find()
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }));
    });
}

/**
 * Handle all login validations and responses.
 *
 * @param {request} req - The request handled by the login api.
 * @param {response} res - The response after API process the request.
 * @returns {json} A token if it was succesful or an error if not.
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = await compare(password, user.password)
        const tokenSession = await tokenSign(user)
        //console.log(tokenSession) SE GENERA BIEN

        if (checkPassword) { //TODO Contraseña es correcta!
            res.send({
                data: user,
                tokenSession
            })
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            })
            return
        }

    } catch (e) {
        httpError(res, e)
    }
}

const getUser = async (req, res) => {
    try {
        // Access the tokenData stored in the req object during storeTokenData
        const tokenData = req.tokenData;

        // Return only the tokenData
        res.send({ tokenData });
    } catch (e) {
        httpError(res, e);
    }
}

const storeTokenData = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);

        console.log(tokenData);

        if (tokenData._id) {
            // Store tokenData in the req object for later access in getUser
            req.tokenData = tokenData;
            next();
        } else {
            res.send({ tokenData });
        }
    } catch (e) {
        console.log(e);
        res.send({ error: 'Do not have permissions!' });
    }
}

module.exports = {
    createRoutes,
    login,
    getUser,
    storeTokenData
};