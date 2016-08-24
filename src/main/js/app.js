import React from 'react';
import Navigation from './navigation';
import auth from './auth';

class App extends React.Component {
    constructor() {
        super();

        this.state = {auth: null};
    }

    componentWillMount() {
        auth.sub(this);
    }

    componentWillUnmount() {
        auth.unsub(this);
    }

    onAuth(loggedIn) {
        this.setState({
            loggedIn: loggedIn
        });
    }

    render () {
        return (
            <div id="main-layout">
                <Navigation/>
                <main className="container">
                    {this.props.children}
                </main>
            </div>
        )
    }

}

export default App;
