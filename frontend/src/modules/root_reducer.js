import { combineReducers } from 'redux';

import auth from './auth';
import errors from './errors';
import canvas from './canvas';

export default combineReducers({
    auth,
    errors,
    canvas
});