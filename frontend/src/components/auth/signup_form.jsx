import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { signup, clearErrors } from '../../modules/auth';
import { openModal } from '../../modules/ui/modal';

const msp = state => ({
    errors: state.errors.auth,
});

class SignupForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            password2: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
    }
    
    componentDidMount() {
        this.props.clearErrors();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.signup(this.state);
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value });
        };
    }

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.props.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.props.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    toggleForm(e) {
        e.preventDefault();
        this.props.openModal('login');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type='text'
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder={'email'}
                        />
                    </div>
                    <div>
                        <input type='text'
                            value={this.state.username}
                            onChange={this.update('username')}
                            placeholder={'username'}
                        />
                    </div>
                    <div>
                        <input type='password'
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder={'password'}
                        />
                    </div>
                    <div>
                        <input type='password'
                            value={this.state.password2}
                            onChange={this.update('password2')}
                            placeholder={'confirm password'}
                        />
                    </div>
                    <input type="submit" value="submit" />
                    <button onClick={this.toggleForm}>Or log in</button>
                    {this.renderErrors()}
                </form>
            </div>
        )
    }

}

export default connect(msp, { signup, clearErrors, openModal })(withRouter(SignupForm));