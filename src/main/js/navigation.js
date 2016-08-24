import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router'
import auth from './auth';

class Navigation extends React.Component {

    constructor() {
        super();
        this.state = {
            loggedIn: false
        }
    }

    componentWillMount() {
        auth.sub(this);
    }

    componentWillUnmount() {
        auth.unsub(this);
    }

    onAuth(loggedIn) {
        this.setState({loggedIn: loggedIn});
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Grails3 ❤️ React</Link>
                    </div>
                    { this.state.loggedIn ?
                        <ul className="nav navbar-nav">
                            <li><Link to="/search">Search</Link></li>
                        </ul> : null
                    }

                    { this.state.loggedIn ?
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/logout">Log out</Link></li>
                        </ul> : null
                    }

                    { this.state.loggedIn ? null :
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/signin">Sign in</Link></li>
                        </ul>
                    }
                </div>
            </nav>
        )
    }
}

export default Navigation;


