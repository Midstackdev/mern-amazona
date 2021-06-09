import userRoutes from './user.js'

export const registerRoutes = (app) => {
    app.use('/api/users', userRoutes)
}