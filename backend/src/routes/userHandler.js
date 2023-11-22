const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

            if (name.length > 20) {
                return res.json({ error: 'Error 400 Bad Request: Name exceeds 20 characters' })
            }

            if (name.length < 6) {
                return res.json({ error: 'Error 400 Bad Request: Name should be at least 6 characters long' });
            }

            if (/\s/.test(name)) {
                return res.json({ error: 'Error 400 Bad Request: Name should not contain spaces' });
            }

            if (!/^[a-zA-Z0-9]+$/.test(name)) {
                return res.json({ error: 'Error 400 Bad Request: Name should only contain letters and numbers' });
            }

            if (!email) {
                return res.json({ error: 'Error 400 Bad Request: Email is required' });
            }

            if (email.length > 60) {
                return res.json({ error: 'Error 400 Bad Request: Email exceeds 60 characters' })
            }

            if (/\s/.test(email)) {
                return res.json({ error: 'Error 400 Bad Request: Email should not contain spaces' });
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

            if (password.length > 60) {
                return res.json({ error: 'Error 400 Bad Request: Password exceeds 60 characters' })
            }

            if (/\s/.test(password)) {
                return res.json({ error: 'Error 400 Bad Request: Password should not contain spaces' });
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;

            if (!passwordRegex.test(password)) {
                return res.json({
                    error: 'Error 400 Bad Request: Password should contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
                });
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
        const { email, password } = req.body;

        // Validate empty email
        if (!email) {
            return res.status(400).json({ error: 'Error 400 Bad Request: Email is required' });
        }

        // Validate supported email format
        if (!email.endsWith('@gmail.com')) {
            return res.json({ error: ' Error 400 Bad Request: Invalid email format, only @gmail.com supported' });
        }

        // Validate incomplete email format
        if (email==('@gmail.com')) {
            return res.json({ error: ' Error 400 Bad Request: Invalid incomplete email format.' });
        }

        // Validate empty password
        if (!password) {
            return res.status(400).json({ error: 'Error 400 Bad Request: Password is required' });
        }

        // Validate password length
        if (password.length < 6) {
            return res.json({ error: 'Error 400 Bad Request: Password should be at least 6 characters long' });
        }

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Error 404 Not Found: User not found' });
        }

        // Check if password matches (encrypted)
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            jwt.sign({ email: user.email, id: user._id, name: user.firstName }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        } else {
            res.status(401).json({ error: 'Error 401 Unauthorized: Incorrect password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error 500 Internal Server Error' });
    }
};

/**
 * Get the unique Json Web Token assigned for login sesions.
 *
 * @param {request} req - The request handled by the profiles api.
 * @param {response} res - The response after API process the request.
 * @returns {json} A token if it was recovered succesfully or an error if not.
 */
const getProfile = (req, res) => {
    try {
        const { token } = req.cookies;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
                if (err) throw err;
                res.json(user);
            });
        } else {
            res.json({ error: 'Error 401 Unauthorized: Token not provided' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error 500 Internal Server Error' });
    }
};

module.exports = {
    createRoutes,
    login,
    getProfile,
};