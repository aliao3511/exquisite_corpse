// action types
const OPEN_MODAL = 'e-c/modal/OPEN_MODAL';
const CLOSE_MODAL = 'e-c/modal/CLOSE_MODAL';

// reducer
export default function reducer(state = null, action) {
    Object.freeze(state);
    switch(action.type) {
        case OPEN_MODAL:
            return action.modal;
        case CLOSE_MODAL:
            return null;
        default:
            return state;
    }
}

// action creators
export const openModal = modal => ({
    type: OPEN_MODAL,
    modal
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});