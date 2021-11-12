import { gateway } from "../lib/gateway.js"

export const generateToken = (req, res) => {
    gateway.clientToken.generate({})
        .then(({ clientToken }) => {
            res.status(200).json(clientToken)
        })
        .catch(error => console.log(error))
}

export const processPayment = (req, res) => {
    const { amount, paymentMethodNonce } = req.body

    gateway.transaction.sale({
        amount,
        paymentMethodNonce,
        // deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
    })
    .then(result => { 
        res.status(200).json(result)
    })
    .catch(error => console.log(error));
}