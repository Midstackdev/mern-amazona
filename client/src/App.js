import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Redirect, Route } from 'react-router-dom'
import { signOut } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import Cart from './pages/Cart';

import Home from './pages/Home'
import Order from './pages/Order';
import OrderHistory from './pages/OrderHistory';
import PaymentMethod from './pages/PaymentMethod';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Products from './pages/Products';
import Profile from './pages/Profile';
import ShippingAddress from './pages/ShippingAddress';
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
                            <li>
                                <Link to="/profile">User profile</Link>
                            </li>
                            <li>
                                <Link to="/orders/history">Order history</Link>
                            </li>
                            <li>
                                <Link to="#signout" onClick={handleSignOut}>Sign out</Link>
                            </li>
                        </ul>
                    </div>
                ) : (   
                  <Link to="/signin">Sign in</Link>
                )}
                {userInfo && userInfo.isAdmin && (
                    <div className="dropdown">
                        <Link to="#admin">
                            Admin{' '}<i className="fa fa-caret-down"></i>
                        </Link>
                        <ul className="dropdown-content">
                            <li>
                                <Link to="/dashbaord">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/products">Products</Link>
                            </li>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                            <li>
                                <Link to="/orders">Orders</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
        <main>
            <Route path="/" component={Home} exact />
            <Route path="/product/:id" component={Product} exact />
            <Route path="/cart/:id?" component={Cart} exact />
            <Route path="/signin" component={SignIn} exact />
            <Route path="/signup" component={SignUp} exact />
            <Route path="/shipping" render={(props) => !userInfo ? <Redirect to="/signin" /> : <ShippingAddress {...props} />} exact />
            <Route path="/payment" render={(props) => !userInfo ? <Redirect to="/signin" /> : <PaymentMethod {...props} />} exact />
            <Route path="/place-order" render={(props) => !userInfo ? <Redirect to="/signin" /> : <PlaceOrder {...props} />} exact />
            <Route path="/order/:id" render={(props) => !userInfo ? <Redirect to="/signin" /> : <Order {...props} />} exact />
            <Route path="/orders/history" render={(props) => !userInfo ? <Redirect to="/signin" /> : <OrderHistory {...props} />} exact />
            <PrivateRoute path="/profile"  component={Profile} exact />
            <AdminRoute path="/products"  component={Products} exact />
        </main>
        <footer className="row center">
            All right reseve
        </footer>
    </div>
    </Router>
  );
}

export default App;
