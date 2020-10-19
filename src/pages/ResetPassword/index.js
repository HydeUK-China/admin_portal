import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { fetchReq } from '../../utils/utils';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            token: props.match.params.token,
            email: null,
            role: null,
            password: null
        }
        this.password = React.createRef();

        this.updatePassword = this.updatePassword.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
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

    handleInputChange(e, key){
        this.setState({
            [key]: e.target.value
        })
    }

    updatePassword(e){
        e.preventDefault();

        const { email, password } = this.state;

        fetchReq('/api/updatePassword', {
            body: JSON.stringify({
                email,
                password
            })
        }).then(data => {
            alert(data);

            this.props.history.replace('/login');
        }).catch(msg => {
            alert(msg);
        });
    }

    render() {
        const { email, password } = this.state;

        return (
            <div className="container w-40 text-center">
                <form onSubmit={this.updatePassword}>
                    <h2 className="text-center">Update Password</h2>
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
                        <button type="submit" className="btn" style={{ backgroundColor: '#00216 !important' }}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(ResetPassword)