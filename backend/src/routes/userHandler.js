const User = require('../models/userSchema')


function createRoutes (router, model, baseRoute) {
    /**
     * Endpoint to create a new item in the database.
     * @name router.post
     * @method
     * @param {string} `/${baseRoute}` - The path for creating a new item.
     * @param {Function} (req, res) - Callback function to handle the route.
     * @returns {void}
     */
    router.post(`/${baseRoute}`, async (req, res) => {
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
    });

    /**
   * Endpoint to retrieve all items from the database.
   * @name router.get
   * @method
   * @param {string} `/${baseRoute}` - The path for retrieving all items.
   * @param {Function} (req, res) - Callback function to handle the route.
   * @returns {void}
   */
  router.get(`/${baseRoute}`, (req, res) => {
    model
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});
}  

module.exports = {
    createRoutes
}