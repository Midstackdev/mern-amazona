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
    const userExists = await User.findOne({ email: req.body.email })
    if(!userExists) {
        const user = new User ({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })
        const createdUser = await user.save()
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser)
        })
         
    }
    res.status(401).send({ message: 'User already exists.'})
}

export const show = async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        return res.status(200).send(user)  
    }
    return res.status(404).send({ message: 'User not found.'})
}

export const update = async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updateduser = await user.save()
        return res.send({
            _id: updateduser._id,
            name: updateduser.name,
            email: updateduser.email,
            isAdmin: updateduser.isAdmin,
            token: generateToken(updateduser)
        })  
    }
    return res.status(404).send({ message: 'User not found.'})
}