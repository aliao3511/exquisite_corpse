import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { openModal, closeModal } from '../../modules/ui/modal';

const ModalText = () => {

    const [continued, setContinued] = useState(false);
    const dispatch = useDispatch();

    return !continued ? (
        <div className='modal-text-container'>
            <strong>Welcome to Exquisite Corpse!</strong>
            <p>Exquisite Corpse is a collaborative drawing application based off of artist Xavier Barrade's 2011 project 'Epic Exquisite Corpse'.</p>
            <button onClick={() => setContinued(true)}>Continue</button>
        </div> 
    ) : (
            <div className='modal-text-container'>
                <p>There's only one rule:</p>
                <ul className='rules'>
                  <li>connect your drawing to the lines on the side</li>
                </ul>
                {/*<p>You can contribute either anonymously or under a name.</p>
                <p>If you'd like to be credited for your contributions, create an account or sign in below!</p>*/}
                <div className='modal-text-buttons'>
                  <div className='auth-links'>
                    {/*<button onClick={() => dispatch(openModal('login'))}>
                      log in
                    </button>
                    <button onClick={() => dispatch(openModal('signup'))}>
                      sign up
                    </button>*/}
                  </div>
                  <button onClick={() => dispatch(closeModal())} >get started</button>
                </div>
            </div>
    );

}

export default ModalText;
