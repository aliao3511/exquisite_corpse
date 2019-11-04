import axios from 'axios';

// action types

// reducer

// util

// action creators
export const saveImage = image => async dispatch => {
    const img = await axios.post('/api/images/save', image);
    return img.data;
};

export const getImage = id => async dispatch => {
    const img = await axios.get(`/api/images/${id}`);
    debugger
    // return img.data.toString('base64');
};
