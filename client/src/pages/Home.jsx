import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getProducts = async() => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/products`)
                setLoading(false)
                setProducts(data)
            } catch (error) {
                setError(error.message)
                setLoading(false)
                console.log(error)
            }
        }
        getProducts()
    }, [])

    return (
        <>
        {loading ? (<LoadingBox></LoadingBox>)
        : 
        error ? (<MessageBox variant="danger">{error}</MessageBox>)
        :
        (
            <div className="row center">
                {products.map(product => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
        )}
        </>
    )
}
