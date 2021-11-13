import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function Profile() {
    const logginUser = useSelector(state => state.user)
    const { userInfo } = logginUser
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserDetails(userInfo._id))
    }, [dispatch, userInfo])

    console.log('user', logginUser)
    console.log('userDetails', userDetails)

    return (
        <div>
            <form className="form" onSubmit={''}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox />
                    :
                    error ? <MessageBox varaint="danger">{error}</MessageBox>
                    :
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter name" value={user.name} onChange={''} />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter email" value={user.email} onChange={''} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter password" onChange={''} />
                        </div>
                        <div>
                            <label htmlFor="confrimPassword">confrimPassword</label>
                            <input type="password" id="confrimPassword" placeholder="Enter confrim password" onChange={''} />
                        </div>
                        <div>
                            <label></label>
                            <button className="primary" type="submit">Update</button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}
