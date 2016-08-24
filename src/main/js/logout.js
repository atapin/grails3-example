import React from 'react';
import {withRouter} from 'react-router';
import auth from './auth';

class Logout extends React.Component {
    componentDidMount() {
        auth.logOut();
        this.props.router.replace("/")
    }

    render() {
        return <p>Logging out...</p>
    }
}


export default withRouter(Logout);