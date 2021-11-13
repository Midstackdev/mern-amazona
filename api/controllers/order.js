import Order from "../models/Order.js"

export const create = async (req, res) => {
    if(req.body.orderItems.length === 0) {
        return res.status(400).send({ message: 'Cart is empty'})
    }else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        })

        const createOrder = await order.save()
        res.status(201).send({ message: 'New order created', order: createOrder})
    }
}

export const index = async (req, res) => {
    const orders = await Order.find({ user: req.user._id})
    if(orders) {
        return res.status(200).send(orders)
    }else {
        return res.status(404).send({ message: 'Order Not Found'})
    }
}

export const show = async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order) {
        return res.status(200).send(order)
    }else {
        return res.status(404).send({ message: 'Order Not Found'})
    }
}

export const update = async (req, res) => {
    const order = await Order.findById(req.params.id)
    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            transactionId: req.body.transactionId,
            status: req.body.status,
            updatedAt: req.body.updatedAt,
        }
        const updatedOrder = await order.save()
        return res.status(200).send({ message: 'Order Paid', order: updatedOrder})
    }else {
        return res.status(404).send({ message: 'Order Not Found'})
    }
}