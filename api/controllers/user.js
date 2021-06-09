import data from "../data.js"
import User from "../models/User.js"

export const createUsers = async(req, res) => {
    // await User.remove({})
    const createdUsers = await User.insertMany(data.users)
    res.send({
        createdUsers
    })
}