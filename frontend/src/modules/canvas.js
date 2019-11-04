import axios from 'axios';

// action types
const RECEIVE_IMAGE = 'e-c/canvas/RECEIVE_IMAGE';
const RECEIVE_IMAGES = 'e-c/canvas/RECEIVE_IMAGES';
const RECEIVE_USER_IMAGES = 'e-c/canvas/RECEIVE_USER_IMAGES';

// reducer
const _nullState = {
    images: {},
    user: {},
};

export default function reducer(state = _nullState, action) {
    Object.freeze(state);
    const images = {};
    const user = {};
    switch(action.type) {
        case RECEIVE_IMAGE:
            return {
                image: action.image
            };
        case RECEIVE_IMAGES:
            action.images.reduce((images, image) => images[image.id] = image);
            return {
                ...state,
                images
            };
        case RECEIVE_USER_IMAGES:
            action.images.reduce((user, image) => user[image.id] = image);
            return {
                ...state,
                user
            };
        default:
            return state;
    }
}

// util

// action creators
export const receiveImage = image => ({
    type: RECEIVE_IMAGE,
    image
});

export const receiveImages = images => ({
    type: RECEIVE_IMAGE,
    images
});

export const receiveUserImages = images => ({
    type: RECEIVE_USER_IMAGES,
    images
});

// thunk action creators
export const saveImage = image => async dispatch => {
    const response = await axios.post('/api/images/save', image);
    return dispatch(receiveImage(response.data.image));
};

export const getImage = id => async dispatch => {
    const response = await axios.get(`/api/images/${id}`);
    return dispatch(receiveImage(response.data.image));
};
