import React from 'react';
import { connect } from 'react-redux';

import LoginForm from '../auth/login_form';
import SignupForm from '../auth/signup_form';
import ModalText from './modal_text';
import { closeModal } from '../../modules/ui/modal';
import './modal.scss';

const msp = state => ({
    modal: state.ui.modal
});

const Modal = ({ modal, closeModal }) => {
    if (!modal) {
        return null;
    }

    let component;
    switch(modal) {
        case 'login':
            component = <LoginForm />;
            break;
        case 'signup':
            component = <SignupForm />;
            break;
        case 'splash':
            component = <ModalText />;
            break;
        default:
            return null;
    }

    return (
        <div className='modal-background' onClick={closeModal}>
            <div className='modal-child' onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    )
};  

export default connect(msp, { closeModal })(Modal);