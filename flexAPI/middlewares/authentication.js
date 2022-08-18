const {User} = require("../models")
const jwt = require("../helpers/jwt")

class Auth {

    static async authentication(req, res, next){
        try {
            const {access_token} = req.headers
            if(!access_token){
                res.status(401).send("You don't have access 1")
            }else{
                const decode = jwt.verifyToken(access_token)
                const user = await User.findByPk(decode.id)
                if(!user){
                    res.status(401).send("You don't have access 3")
                }
                else{
                    res.locals.user = decode
                    next()
                }
            }
            
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Auth