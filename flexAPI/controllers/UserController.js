const {User} = require("../models/")
const bcrypt = require('bcryptjs')
const jwt = require('../helpers/jwt')

class UserController {
    static async register(req,res,next){
        try {
            const {email,password} = req.body
            const data = await User.create({
                email,
                password
            })
            if(data){
                res.status(201).json({email:data.email})
            }
        } catch (error) {
            next(error)
        }
    }

    static async login(req,res,next){
        try {
            const {email,password} = req.body
            if(!email || !password){res.status(400).send('Email and Password cannot be empty')}
            else{
                const userdata = await User.findOne({where: {email: email}})
                if(userdata){
                    const pass = await bcrypt.compare(password, userdata.password)
                    if(pass){
                        const access_token = jwt.signToken({id:userdata.id,email:userdata.email})
                        res.status(200).json({access_token, id:userdata.id,email:userdata.email})
                    }else{
                        res.status(400).send('Invalid email or password')
                    }
                }else{
                    res.status(400).send('Invalid email or password')
                }
            }
        } catch (error) {
            next(error)
        }
        
    }

}

module.exports = UserController