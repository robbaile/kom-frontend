import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

class Nav extends React.Component {
    render() {
        return (
            <div className="nav">
                <img src={logo} className="App-logo" alt="logo" />
                <nav className="nav">
                    <Link className="nav__item" to="/">Home</Link>
                    <Link className="nav__item" to="/rides">My Rides</Link>
                    <Link className="nav__item" to="/users">Users</Link>
                </nav>
            </div>
        )
    }
}

export default Nav;