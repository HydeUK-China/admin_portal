import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { fetchReq } from '../utils/utils';

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: props.match.params.token,
            email: null,
            role: null,
            password: null,
            showSpinner: false
        }
        this.password = React.createRef();

        this.updatePassword = this.updatePassword.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        const { token } = this.state;

        const url = `/api/resetPassword/${token}`
        fetchReq(url).then(data => {
            this.setState({
                email: data.account_name,
                role: data.permission_role
            })
        }).catch(msg => {
            alert(msg);
        });
    }

    handleInputChange(e, key) {
        this.setState({
            [key]: e.target.value
        })
    }

    updatePassword(e) {
        e.preventDefault();

        this.setState({
            showSpinner: true
        })

        const { email, password } = this.state;

        fetchReq('/api/updatePassword', {
            body: JSON.stringify({
                email,
                password
            })
        }).then(data => {
            this.setState({
                showSpinner: false
            })
            alert(data);

            this.props.history.replace('/login');
        }).catch(msg => {
            this.setState({
                showSpinner: false
            })
            alert(msg);
        });
    }

    render() {
        const { email, password, showSpinner } = this.state;

        return (
            <form className="registerLogin-form" onSubmit={this.updatePassword}>
                <div className="form-group">
                    <label> Your email: </label>
                    <label> {email} </label>
                </div>
                <div className="form-group">
                    <label> Reset password: </label>
                    <input type="password" className="form-control" placeholder="Reset password"
                        value={password}
                        onChange={(e) => this.handleInputChange(e, 'password')} required />
                </div>
                <div className="form-group">
                    <button type="submit" className="apply-btn">Submit</button>
                </div>
                <div className={showSpinner ? "spinner" : null}></div>
            </form>
        )
    }
}

export default withRouter(ResetPasswordForm)