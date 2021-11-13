import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function OrderHistory(props) {
    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserOrders())
    }, [dispatch])

    return loading ? (<LoadingBox></LoadingBox>) : 
        error ? (<MessageBox variant="danger">{error}</MessageBox>) :
        orders ?
        (
        <div>
            <h1>Order History</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELEIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice.toFixed(2)}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                            <td>{order.isDelievered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                            <td>
                                <button type="button" className="small" onClick={() => props.history.push(`/order/${order._id}`)}>
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : null
}
