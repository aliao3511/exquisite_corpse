import { connect } from 'react-redux';
import React from 'react';

import { logout } from '../../modules/auth';
import { openModal } from '../../modules/ui/modal';
import './navbar.scss';

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
                <button onClick={logout}>log out</button>
            );
        } else {
            return (
                <>
                    <button onClick={() => openModal('signup')}>sign up</button>
                    <button onClick={() => openModal('login')}>log in</button>
                </>
            );
        }
    }

    render() {
        return (
            <div className='navbar'>
                {this.links()}
            </div>
        );
    }

}

export default connect(msp, { logout, openModal })(NavBar);