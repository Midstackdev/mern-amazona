export const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    }else {
        return res.status(401).send({ message: 'Invalid Admin token'})
    }
}