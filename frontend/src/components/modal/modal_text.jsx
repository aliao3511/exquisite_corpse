import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { openModal, closeModal } from '../../modules/ui/modal';

const ModalText = () => {

    const [continued, setContinued] = useState(false);
    const dispatch = useDispatch();

    return !continued ? (
        <div>
            <strong>Welcome to Exquisite Corpse!</strong>
            <p>Exquisite Corpse is a collaborative drawing application based off of artist Xavier Barrade's 2011 project 'Epic Exquisite Corpse'.</p>
            <button onClick={() => setContinued(true)}>Continue</button>
        </div> 
    ) : (
        <div>
                <p>There's only one rule: Connect your drawing to the lines on the side</p>
            <p>You can contribute either anonymously or under a name.</p>
            <p>If you'd like to be credited for your contributions, create an account or sign in below!</p>
            <button onClick={() => dispatch(openModal('login'))}>Log In</button>
            <button onClick={() => dispatch(openModal('signup'))}>Sign Up</button>
            <button onClick={() => dispatch(closeModal())} >Get started</button>
        </div>
    );

}

export default ModalText;