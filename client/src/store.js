import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducer'
import { createOrderReducer, getOrderReducer, payOrderReducer, userOrdersReducer } from './reducers/orderReducer'
import { productDetailsReducer, productListReducer } from './reducers/productReducer'
import { getUserDetailsReducer, registerReducer, signInReducer, updateUserProfileReducer } from './reducers/userReducer'

const initialState = {
    user: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentmethod: 'PayPal'
    }
}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: signInReducer,
    register: registerReducer,
    orderCreate: createOrderReducer,
    orderDetails: getOrderReducer,
    orderPay: payOrderReducer,
    orderList: userOrdersReducer,
    userDetails: getUserDetailsReducer,
    userProfile: updateUserProfileReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store