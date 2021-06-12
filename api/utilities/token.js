import jwt from "jsonwebtoken"

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET || 'somesuperlongsecret', {
        expiresIn: '30d'
    })
}

export const decodeToken = (token) => {
    
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'somesuperlongsecret')
    } catch (error) {
        return null
    }
}