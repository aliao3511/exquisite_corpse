import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../modules/auth';

const msp = state => ({
    loggedIn: state.auth.authenticated,
});

class NavBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    links() {
        if (this.props.loggedIn) {
            return (
                <div>
                    <button onClick={this.logout}>log out</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to='/signup'>sign up</Link>
                    <Link to='/login'>log in</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.links()}
            </div>
        );
    }

}

export default connect(msp, { logout })(NavBar);