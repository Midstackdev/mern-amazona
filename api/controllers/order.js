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