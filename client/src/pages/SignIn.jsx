import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../actions/userActions'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function SignIn(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const {loading, error, userInfo } = user
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(signIn(email, password))
    }

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect)
        }
    }, [userInfo])

    return (
    
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && (<LoadingBox></LoadingBox>)}
                {error && (<MessageBox variant="danger">{error}</MessageBox>)}
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
                    <label />
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label />
                    <div className="primary">
                        New customer ? <Link to="/signup">Create your account.</Link>
                    </div>
                </div>
            </form>
        </div>
        
    )
}
