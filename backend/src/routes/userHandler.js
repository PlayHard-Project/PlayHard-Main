const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

async function createRoutes(router, model, baseRoute) {
    router.post(`/${baseRoute}`, async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name) {
                return res.json({ error: 'Error 400 Bad Request: Name is required' });
            }

            if (!email) {
                return res.json({ error: 'Error 400 Bad Request: Email is required' });
            }

            const exist = await User.findOne({ email });
            if (exist) {
                return res.json({ error: 'Error 409 Conflicts: Email is already registered' });
            }

            if (!password) {
                return res.json({error: 'Error 400 Bad Request: Password is required'});
            }

            if (password.length < 6) {
                return res.json({error: 'Error 400 Bad Request: Password should be at least 6 characters long'});
            }

            const passwordHash = await bcrypt.hashSync(password, 8);
            console.log(passwordHash);

            const user = await User.create({
                name,
                email,
                password: passwordHash,
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

module.exports = {
    createRoutes,
};