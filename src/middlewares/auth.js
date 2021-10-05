const jwt = require('jsonwebtoken')
const User = require('../models').User
const common = require('../common');
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ id: decoded.user.id, raw: true })
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        common.response(res, 401, false, "Please Authenticate")
    }
}

module.exports = auth