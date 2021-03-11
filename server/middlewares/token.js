
const { User  } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) =>  {
    try {
        const token = req.headers.authorization
        const decodedToken = jwt.verify(token, process.env.JWT_KEY)
        const userId = decodedToken.userId

        const user = await User.findOne({ where: { id: userId }})
        if(user) {
            if(user.verified) {
                req.user = {id: user.id, role: (JSON.parse(user.role))}
                next()
            }
            else {
                res.status(449).json({ error: "User not register yet !" })
            }
        }
        else {
            res.status(498).json({ error: "Le jeton a expiré ou est invalide !" })
        }
    }
    catch(error) {
        res.status(498).json({ error: "Le jeton a expiré ou est invalide !" })
    }
}