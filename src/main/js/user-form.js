import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';


class UserForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            
                <form className="form-horizontal" name="signInForm" onSubmit={this.props.onSubmit} ref="signInForm">
                    <div className="form-group">
                        <label htmlFor="signin-name" className="col-sm-3 control-label">Username</label>
                        <div className="col-sm-9">
                            <input type="text"
                                   className="form-control" id="signin-name"
                                   placeholder="Name"
                                   ref="name"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-3 control-label">Password</label>
                        <div className="col-sm-9">
                            <input type="password"
                                   className="form-control"
                                   id="signin-password"
                                   placeholder="Password"
                                   ref="password"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9">
                            <button type="submit" className="btn btn-default">{this.props.submitLabel}</button>
                        </div>
                    </div>
                </form>
        )
    }

    data() {
        let name = ReactDOM.findDOMNode(this.refs.name).value.trim(),
            password = ReactDOM.findDOMNode(this.refs.password).value.trim();
        return {
            username: name,
            password: password
        }
    }

}

export default UserForm;
