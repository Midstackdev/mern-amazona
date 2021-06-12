import { decodeToken } from "../utilities/token.js"

export const isAuth = (req, res, next) => {
    const authorization  = req.headers.authorization
    if(authorization) {
        const decoded = decodeToken(authorization.slice(7, authorization.length))
        
        if(!decoded) {
            return res.status(401).send({ message: 'Invalid token'})
        }else {
            req.user = decoded
            next()
        }
    }else {

        return res.status(401).send({ message: 'No token'})
    }
}