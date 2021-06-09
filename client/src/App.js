import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Cart from './pages/Cart';

import Home from './pages/Home'
import Product from './pages/Product';

function App() {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

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
                <Link to="/signin">Sign in</Link>
            </div>
        </header>
        <main>
            <Route path="/" component={Home} exact />
            <Route path="/product/:id" component={Product} exact />
            <Route path="/cart/:id?" component={Cart} exact />
        </main>
        <footer className="row center">
            All right reseve
        </footer>
    </div>
    </Router>
  );
}

export default App;
