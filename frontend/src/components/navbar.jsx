import { connect } from 'react-redux';
import React from 'react';

import { logout } from '../modules/auth';
import { openModal } from '../modules/ui/modal';

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
        const { openModal, loggedIn, logout } = this.props;
        if (loggedIn) {
            return (
                <div>
                    <button onClick={logout}>Log Out</button>
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={() => openModal('signup')}>Sign Up</button>
                    <button onClick={() => openModal('login')}>Log In</button>
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

export default connect(msp, { logout, openModal })(NavBar);