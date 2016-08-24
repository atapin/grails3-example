import React from 'react';
import UserForm from './user-form';
import 'whatwg-fetch';
import {withRouter, Link} from 'react-router';
import auth from './auth';

const checkStatus = (response) => {
    if(response.status >= 200 && response.status < 300) {
        return response.json()
    } else {
        var error = new Error(response.status == 401 ? "Invalid username and/or password" : response.statusText);
        error.response = response;
        throw error;
    }
};



class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            error: ''
        };
        this.signIn = this.signIn.bind(this);
    }

    signIn(e) {
        e.preventDefault();
        console.log("Signing in...", this.form.data());

        fetch("/api/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.form.data())
        })
        .then(checkStatus)
        .then(this.success.bind(this))
        .catch(this.fail.bind(this))
    }

    success(authObject) {
        console.log("Signed in", authObject);
        auth.signIn(authObject);
        let locationState = this.props.location.state,
            nextPath = locationState ? locationState.nextPath : "/";
        this.props.router.replace(nextPath ? nextPath : "/");
        this.props.router.reload();
    }

    fail(res) {
        console.log("Failed to sign in", res);
        this.setState({error: res.message});
    }

    render () {
        let Error = () => <p className="alert alert-danger">{this.state.error} <Link to="/signup">Sign up</Link></p>;
        return (

            <div className="col-sm-4 col-sm-offset-4">
                { this.state.error ? <Error/> : null }
                <UserForm submitLabel="Sign in" onSubmit={this.signIn} ref={ (ref) => this.form = ref }/>

            </div>
        )
    }

}

export default withRouter(SignIn);
