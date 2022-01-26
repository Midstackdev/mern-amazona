import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../actions/userActions'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function SignUp(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const reg = useSelector(state => state.register)
    const {loading, error, userInfo } = reg
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            console.log('Passwords do not match')
        }else {

            dispatch(signUp(name, email, password))
        }
    }

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect)
        }
    }, [userInfo, props.history, redirect])

    return (
    
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <h1>Sign Up</h1>
                </div>
                {loading && (<LoadingBox></LoadingBox>)}
                {error && (<MessageBox variant="danger">{error}</MessageBox>)}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter name" required
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter email" required
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Enter confirm password" required
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Sign up</button>
                </div>
                <div>
                    <label />
                    <div className="primary">
                        Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign In.</Link>
                    </div>
                </div>
            </form>
        </div>
        
    )
}
