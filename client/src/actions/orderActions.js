import axios from 'axios'
import { CART_EMPTY } from '../constants/cartConstants'
import { 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../constants/orderConstansts"

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
    const { user: { userInfo } } = getState()
    try {
        const { data } = await axios.post(`/orders`, order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
        dispatch({ type: CART_EMPTY })
        localStorage.removeItem('cartItems')
    } catch (error) {
        dispatch({ 
            type: ORDER_CREATE_FAIL, 
            payload: error.response && error.response.data.message ?  error.response.data.message : error.response
        })
    }
}

export const getOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })
    const { user: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ 
            type: ORDER_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ?  error.response.data.message : error.response
        })
    }
}

export const getUserOrders = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST })
    const { user: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`/orders/user`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ 
            type: ORDER_LIST_FAIL, 
            payload: error.response && error.response.data.message ?  error.response.data.message : error.response
        })
    }
}

export const payOrder = (order, formData) => async (dispatch, getState) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: order})
    const { user: { userInfo } } = getState()
    try {
        const { data } = await axios.put(`/orders/${order._id}`, formData, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ 
            type: ORDER_PAY_FAIL, 
            payload: error.response && error.response.data.message ?  error.response.data.message : error.response
        })
    }
}