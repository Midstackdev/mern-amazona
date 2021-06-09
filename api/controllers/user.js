import data from "../data.js"
import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../utilities/token.js"

export const createUsers = async(req, res) => {
    // await User.remove({})
    const createdUsers = await User.insertMany(data.users)
    res.send({
        createdUsers
    })
}

export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({ message: 'Invalid email or password'})
}

export const register = async (req, res) => {

}