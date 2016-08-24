import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute, Link} from 'react-router';
import App from './app';
import SignIn from './signin';
import SignUp from './signup';
import Logout from './logout';
import Search from './search';
import auth from './auth';

const Paths = {
    SIGNIN: "/signin",
    SEARCH: "/search",
    LOGOUT: "/logout",
    SINGUP: "/signup"
};

const Greet = () =>
    <div className="jumbotron">
        <h1>Hello, world!</h1>
        <p>Here you can search tweets from Twitter after signing in</p>
        <p><Link to={Paths.SIGNIN} className="btn btn-primary btn-lg">Sign in</Link></p>
    </div>;

const NotFound = () =>
    <div className="row">
        <div className="col-lg-12">
            <h1>404. It's 362 more than 42 :(</h1>
        </div>
    </div>;

function checkAuth(next, replace) {

    let nextPath = next.location.pathname;
    if (auth.loggedIn()) {
        if(nextPath == Paths.SIGNIN || nextPath == Paths.SINGUP) {
            replace({pathname: "/"});
        }
    } else {
        if(nextPath != Paths.SIGNIN && nextPath != Paths.SINGUP) {
            replace({
                pathname: Paths.SIGNIN,
                state: {nextPath: nextPath}
            });
        }
    }
}

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Greet}/>
            <Route path={Paths.SIGNIN} component={SignIn} onEnter={checkAuth} />
            <Route path={Paths.SEARCH} component={Search} onEnter={checkAuth} />
            <Route path={Paths.LOGOUT} component={Logout}/>
            <Route path={Paths.SINGUP} component={SignUp} onEnter={checkAuth}/>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
, document.getElementById('app'));