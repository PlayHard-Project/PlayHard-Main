const jwt = require('jsonwebtoken')

// Genera token
const tokenSign = async (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET, 
        {
            expiresIn: "2h",
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => {
    return jwt.decode(token, null)
}



module.exports = { tokenSign, decodeSign, verifyToken }