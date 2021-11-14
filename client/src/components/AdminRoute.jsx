import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

export default function AdminRoute({ component: Component, ...rest }) {
    const logginUser = useSelector(state => state.user)
    const { userInfo } = logginUser
    return (
        <Route
            { ...rest }
            render = {(props) => 
                userInfo && userInfo.isAdmin ? (<Component {...props} />) : (<Redirect to="/signin" />)
            }
        />
    )
}
