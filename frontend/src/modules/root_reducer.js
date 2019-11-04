import { combineReducers } from 'redux';

import auth from './auth';
import errors from './errors/errors';
import canvas from './canvas';
import ui from './ui/ui';

export default combineReducers({
    auth,
    errors,
    canvas,
    ui
});