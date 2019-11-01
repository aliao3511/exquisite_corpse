const validator = require('validator');

const { validText } = require('./util');

const validateLoginInput = ({ identifier, password }) => {
    let errors = {};

    identifier = validText(identifier) ? identifier : '';
    password = validText(password) ? password: '';

    if (validator.isEmpty(identifier)) {
        errors.identifier = 'username or email required';
    }

    if (validator.isEmpty(password)) {
        errors.password = 'password required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};

const validateRegisterInput = data => {
    let errors = {};
    data.email = validText(data.email) ? data.email : '';
    data.username = validText(data.username) ? data.username : '';
    data.password = validText(data.password) ? data.password: '';
    data.password2 = validText(data.password2) ? data.password2 : '';

    if (!validator.isEmail(data.email)) {
        errors.email = 'invalid email';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'email required';
    }

    if (!validator.isLength(data.username, { min: 2, max: 25 })) {
        errors.username = 'username must be between 2 and 25 characters long';
    }

    if (validator.isEmpty(data.username)) {
        errors.username = 'username required';
    }

    if (!validator.isLength(data.password, { min: 6 })) {
        errors.password = 'password must be at least 6 characters';
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'please confirm password';
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'passwords do not match';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };

};

module.exports = {
    validateLoginInput,
    validateRegisterInput,
};
