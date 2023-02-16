const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token_parent = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        if (!token_parent) {
            return res.status(401).json({ message: "Користувач не авторизований" })
        }
        const decoded = jwt.verify(token_parent, process.env.SECRET_KEY)
        req.userPAR = decoded
        next()
    } catch (e) {
        res.status(401).json({ message: "Користувач не авторизований" })
    }
};