import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import auth from './auth';

import { withRouter } from 'react-router';

function checkStatus(response) {
    if(response.status >= 200 && response.status < 300) {
        return response.json()
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

class Search extends React.Component {

    constructor() {
        super();
        this.search = this.search.bind(this);
        this.fail = this.fail.bind(this);
        this.success = this.success.bind(this);

        this.state = {
            tweets: [],
            auth: JSON.parse(localStorage.auth)
        }
    }

    search(e) {
        e.preventDefault();
        console.log("Searching...");
        let token = this.state.auth.access_token;
        let query = ReactDOM.findDOMNode(this.refs.query).value.trim();

        this.setState({inProgress: true});

        fetch("/api/search?q=" + query , {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(checkStatus)
        .then(this.success)
        .catch(this.fail)
    }

    success(tweets) {
        console.log("Search result", tweets);
        this.setState({tweets: tweets, inProgress: false});
    }

    fail(error) {
        console.error("Search has failed", error);
        this.setState({inProgress: false});
        if(error.response.status == 401) {
            auth.logOut();
            this.props.router.replace({
                pathname: "/signin",
                state: {nextPath: "/search"}
            })
        }
    }

    render() {

        let tweets = this.state.tweets.map( (tweet) => {
            let userLink = "https://twitter.com/" + tweet.user;
            return <div className="col-sm-12 col-md-12 col-lg-12 tweet" key={tweet.id}>
                <a href={userLink} target="_blank"><b>{tweet.user}</b></a>: {tweet.text}
            </div>
        });
        return (

                <div className="row">
                    <div className="container">
                        <form className="form-inline col-lg-12" onSubmit={this.search} >
                            <div className="form-group">
                                <label className="sr-only" htmlFor="query">Search:</label>
                                <input type="text"
                                       className="form-control"
                                       id="query"
                                       placeholder="Query"
                                       ref="query"
                                       disabled={this.state.inProgress}
                                />
                            </div>
                            <button type="submit" className="btn btn-default" disabled={this.state.inProgress}>Search</button>
                        </form>

                        <div className="col-lg-12">
                            {tweets}
                        </div>
                    </div>

            </div>
        )
    }

}

export default withRouter(Search);
