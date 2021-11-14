import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_PROFILE_UPDATE_RESET } from '../constants/userConstants'

export default function Profile() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const logginUser = useSelector(state => state.user)
    const { userInfo } = logginUser
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    const userProfile = useSelector(state => state.userProfile)
    const { loading: loadingProfile, error: errorProfile, success: successProfile } = userProfile
    const dispatch = useDispatch()

    useEffect(() => {
        if(!user) {
            dispatch({ type: USER_PROFILE_UPDATE_RESET })
            dispatch(getUserDetails(userInfo._id))
        }else {
            setName(user.name)
            setEmail(user.email)
        }
    }, [dispatch, userInfo, user])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            alert('Passwords do no match')
        }else {
            dispatch(updateUserProfile({userId: user._id,
                name,
                email,
                password
            }))
        }
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox />
                    :
                    error ? <MessageBox varaint="danger">{error}</MessageBox>
                    :
                    <>
                        {loadingProfile && <LoadingBox/>}
                        {errorProfile && <MessageBox variant="danger">{errorProfile}</MessageBox>}
                        {successProfile && <MessageBox variant="success">{"Profile updated successfully"}</MessageBox>}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="confrimPassword">confrimPassword</label>
                            <input type="password" id="confrimPassword" placeholder="Enter confrim password" onChange={e => setConfirmPassword(e.target.value)} />
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
