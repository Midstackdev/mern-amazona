import { gateway } from "../lib/gateway.js"

export const generateToken = (req, res) => {
    gateway.clientToken.generate({})
        .then(({ clientToken }) => {
            res.status(200).json(clientToken)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error)
        })
}

export const processPayment = (req, res) => {
    const { amount, paymentMethodNonce } = req.body
    // console.log(req.body)
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
    .catch(error => {
        console.log(error)
        res.status(500).json(error)
    })
}

export const getTransaction = () => {
    let result;
    const transactionId = req.params.id;

    gateway.transaction.find(transactionId)
        .then((transaction) => {
            // result = createResultObject(transaction);
            res.status(200).json(transaction);
        })
}