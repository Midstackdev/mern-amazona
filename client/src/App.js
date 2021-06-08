import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/Home'
import Product from './pages/Product';

function App() {
  return (
    <Router>
    <div className="grid-container">
        <header className="row">
            <div>
                <a className="brand" href="/">amazona</a>
            </div>
            <div>
                <a href="/cart">Cart</a>
                <a href="/signin">Sign in</a>
            </div>
        </header>
        <main>
            <Route path="/" component={Home} exact />
            <Route path="/product/:id" component={Product} exact />
        </main>
        <footer className="row center">
            All right reseve
        </footer>
    </div>
    </Router>
  );
}

export default App;
