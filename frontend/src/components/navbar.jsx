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
                    <button onClick={logout}>log out</button>
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={() => openModal('signup')}>sign up</button>
                    <button onClick={() => openModal('login')}>log in</button>
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