import userRoutes from './user.js'
import productRoutes from './product.js'
import ordertRoutes from './order.js'
import paymentRoutes from './payment.js'

export const registerRoutes = (app) => {
    app.use('/api/users', userRoutes)
    app.use('/api/products', productRoutes)
    app.use('/api/orders', ordertRoutes)
    app.use('/api/payment', paymentRoutes)
}