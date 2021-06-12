import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { signOut } from './actions/userActions';
import Cart from './pages/Cart';

import Home from './pages/Home'
import Product from './pages/Product';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const user = useSelector(state => state.user)
  const { userInfo } = user
  const dispatch = useDispatch()

  const handleSignOut = () => {
      dispatch(signOut())
  }

  return (
    <Router>
    <div className="grid-container">
        <header className="row">
            <div>
                <Link className="brand" to="/">amazona</Link>
            </div>
            <div>
                <Link to="/cart">
                    Cart
                    {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                    )}
                </Link>
                {userInfo ? (
                    <div className="dropdown">
                        <Link to="#">{
                            userInfo.name} <i className="fa fa-caret-down"></i>
                        </Link>
                        <ul className="dropdown-content">
                            <Link to="#signout" onClick={handleSignOut}>Sign out</Link>
                        </ul>
                    </div>
                ) : (   
                  <Link to="/signin">Sign in</Link>
                )}
            </div>
        </header>
        <main>
            <Route path="/" component={Home} exact />
            <Route path="/product/:id" component={Product} exact />
            <Route path="/cart/:id?" component={Cart} exact />
            <Route path="/signin" component={SignIn} exact />
            <Route path="/signup" component={SignUp} exact />
        </main>
        <footer className="row center">
            All right reseve
        </footer>
    </div>
    </Router>
  );
}

export default App;
