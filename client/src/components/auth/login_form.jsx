import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { login, clearErrors } from '../../modules/auth';
import { openModal } from '../../modules/ui/modal';

const msp = state => ({
    errors: state.errors.auth,
});

class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            identifier: '',
            password: '',
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    componentDidUpdate() {
        if (this.props.currentUser) {
            this.props.history.push('/!');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state);
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
        this.props.openModal('signup');
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type='text'
                            value={this.state.identifier}
                            onChange={this.update('identifier')}
                            placeholder={'email or username'}
                        />
                    </div>
                    <div>
                        <input type='password'
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder={'password'}
                        />
                    </div>                                     
                    <input type="submit" value="submit"/>
                    <button onClick={this.toggleForm}>or sign up</button>
                    {this.renderErrors()}
                </form>
            </div>
        )
    }

}

export default connect(msp, { login, clearErrors, openModal })(withRouter(LoginForm));