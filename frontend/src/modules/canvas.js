import axios from 'axios';

// action types
const RECEIVE_IMAGE = 'e-c/canvas/RECEIVE_IMAGE';
const RECEIVE_BASE = 'e-c/canvas/RECEIVE_BASE';
const RECEIVE_IMAGES = 'e-c/canvas/RECEIVE_IMAGES';
const RECEIVE_USER_IMAGES = 'e-c/canvas/RECEIVE_USER_IMAGES';

// reducer
const _nullState = {
    images: {},
    user: {},
    base: {}
};

export default function reducer(state = _nullState, action) {
    Object.freeze(state);
    const images = [];
    const user = {};
    switch(action.type) {
        case RECEIVE_IMAGE:
            return {
                ...state,
                image: action.image
            };
        case RECEIVE_BASE:
            return {
                ...state,
                base: action.base
            };
        case RECEIVE_IMAGES:
            return {
                ...state,
                images: action.images
            };
        case RECEIVE_USER_IMAGES:
            return {
                ...state,
                user: action.images
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

export const receiveBase = base => ({
    type: RECEIVE_BASE,
    base
});

export const receiveImages = images => ({
    type: RECEIVE_IMAGES,
    images
});

export const receiveUserImages = images => ({
    type: RECEIVE_USER_IMAGES,
    images
});

// thunk action creators
export const saveImage = (image) => async dispatch => {
    const response = await axios.post('/api/images/save', image);
    return dispatch(receiveImage(response.data.image));
};

export const getImage = id => async dispatch => {
    const response = await axios.get(`/api/images/${id}`);
    return dispatch(receiveImage(response.data.image));
};

export const getBase = () => async dispatch => {
    const response = await axios.get(`/api/images/draw`);
    return dispatch(receiveBase(response.data.base));
};

export const getCorpse = () => async dispatch => {
    const response = await axios.get(`/api/images/corpse`);
    return dispatch(receiveImages(response.data.images));
};

// seeding
export const seedImage = image => async dispatch => {
    const response = await axios.post(`api/images/seed`, image);
    return dispatch(receiveImage(response.data.image));
};