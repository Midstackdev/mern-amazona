import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dropin from 'braintree-web-drop-in'
import { getOrder, payOrder } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getClientPaymentToken, processPayment } from '../actions/paymentAction'
import { ORDER_PAY_RESET } from '../constants/orderConstansts'


export default function Order(props) {
    const [clientToken, setClientToken] = useState(null)
    const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false)
    const [braintreeInstance, setBraintreeInstance] = useState(undefined)

    const orderId = props.match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { error, loading, order } = orderDetails
    
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, error: errorPay, sucees: successPay } = orderPay

    useEffect(() => {
        if(!order || successPay || (order && order._id !== orderId )) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrder(orderId))
        }
    }, [orderId, dispatch, order, successPay])

    useEffect(() => {
        if(order && !order.isPaid) {
            getClientPaymentToken()
                .then(data => {
                    setClientToken(data)
                    setShowBraintreeDropIn(true)
                    
                    if (showBraintreeDropIn) {
                        const initializeBraintree = () => dropin.create({
                            authorization: clientToken, // insert your tokenization key or client token here
                            container: '#braintree-drop-in-div',
                            // paypal: {
                            //     flow: 'checkout'
                            // }
                        }, function (error, instance) {
                            if (error)
                                console.error(error)
                            else
                                setBraintreeInstance(instance);
                        });
            
                        if (braintreeInstance) {
                            braintreeInstance
                                .teardown()
                                .then(() => {
                                    initializeBraintree();
                                });
                        } else {
                            initializeBraintree();
                        }
                    }
                })
        }

    }, [showBraintreeDropIn, order])

    const pay = () => {
        if (braintreeInstance) {
            braintreeInstance.requestPaymentMethod(
                (error, payload) => {
                    if (error) {
                        console.error(error);
                    } else {
                        const paymentMethodNonce = payload.nonce;
                        // console.log("payment method nonce", payload.nonce);

                        // TODO: use the paymentMethodNonce to
                        //  call you server and complete the payment here

                        processPayment({ paymentMethodNonce, amount: order.totalPrice.toFixed(2) })
                            .then(data => {
                                // console.log(data)
                                const formData = {
                                    transactionId: data.transaction.id,
                                    status: data.transaction.status,
                                    updatedAt: data.transaction.updatedAt,
                                }
                                dispatch(payOrder(order, formData))
                            })

                        // alert(`Payment completed with nonce=${paymentMethodNonce}`);

                        // onPaymentCompleted();
                    }
                });
        }
    }

    // console.log(braintreeInstance)

    return loading ? (<LoadingBox></LoadingBox>) : 
        error ? (<MessageBox variant="danger">{error}</MessageBox>) :
        order ?
        (
        <div>
            <h1>Order {order?._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {order.shippingAddress.address},  
                                    {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? 
                                (<MessageBox variant="success">Delivered</MessageBox>) : 
                                (<MessageBox variant="danger">Not Delivered</MessageBox>)}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {order.paymentMethod}
                                </p>
                                {order.isPaid ? 
                                (<MessageBox variant="success">Paid at {order.paidAt}</MessageBox>) : 
                                (<MessageBox variant="danger">Not Paid</MessageBox>)}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {order.orderItems.map(item => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img src={item.image} alt={item.name} className="small"/>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </div>
                                                
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            {
                                !order.isPaid && (
                                    <li>
                                        {
                                            !setShowBraintreeDropIn ? (<LoadingBox></LoadingBox>) :
                                            (
                                            <>
                                                <div
                                                    id={"braintree-drop-in-div"}
                                                />
                                                <>
                                                {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                                {loadingPay && <LoadingBox />}
                                                <button
                                                    className="primary block"
                                                    type="button"
                                                    disabled={!braintreeInstance}
                                                    onClick={pay}
                                                >
                                                Pay
                                                </button>
                                                </>
                                            </>
                                            )
                                        }
                                        <MessageBox variant="warning">
                                            <a 
                                                href = "https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live#valid-card-numbers" 
                                                target = "_blank" 
                                                rel = "noopener noreferrer"
                                            >
                                                Card details here
                                            </a>
                                        </MessageBox>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}
