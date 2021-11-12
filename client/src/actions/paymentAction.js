import axios from "axios"

export const getClientPaymentToken = async() => {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    try {
        const {data} = await axios.get(`/payment/token`, 
        {headers: {
            Authorization: `Bearer ${userInfo.token}`
        }})
        return data
    } catch (error) {
        let message = error.response && error.response.data.message ?  error.response.data.message : error.response
        return message
    }

}