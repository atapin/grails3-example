import React from 'react';
import UserForm from './user-form';
import 'whatwg-fetch';
import {withRouter} from 'react-router';

const checkStatus = (response) => {
    if(response.status >= 200 && response.status < 300) {
        return response.json();
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            error: ''
        };
        this.signUp = this.signUp.bind(this);
    }

    signUp(e) {
        e.preventDefault();
        let form = this.form.data();
        console.log("Signing in...", form);

        let body = "username=" + form.username + "&password=" + form.password

        fetch("/api/signup", {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: body
        })
        .then(checkStatus)
        .then(this.success.bind(this))
        .catch(this.readError.bind(this))
        .then(this.fail.bind(this))
    }

    success(user) {
        console.log("Signed up", user);
        this.props.router.replace("/");
    }

    readError(error) {
        console.log("Failed to sign up", error);
        return error.response.json();
    }

    fail(error) {
        if(error) this.setState({error: error.error});
    }

    render () {
        let Error = () => <p className="alert alert-danger">{this.state.error}</p>;
        return (

            <div className="col-sm-4 col-sm-offset-4">
                { this.state.error ? <Error/> : null }
                <UserForm submitLabel="Sign up" onSubmit={this.signUp} ref={ (ref) => this.form = ref }/>

            </div>
        )
    }

}

export default withRouter(SignUp);

