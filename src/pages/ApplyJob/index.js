import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { fetchReq, getRole, getUid } from '../../utils/utils';

import '../../styles/applyjob.css';

class ApplyJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectId: props.match.params.projectId,
            expertId: (getRole() === 'expert' && getUid()) ? getUid() : null,
            project: {}
        }
    }

    componentDidMount() {
        const { projectId } = this.state;
        const url = `/api/fetchProject/${projectId}`;

        fetchReq(url).then(data => {
            this.setState({
                project: data
            })
        }).catch(err => alert(err));
    }

    applyNow() {
        const { projectId, expertId } = this.state;

        if (expertId) {
            fetchReq('/api/expertApply', {
                body: JSON.stringify({
                    expertid: expertId,
                    projectid: projectId
                })
            }).then(data => {
                alert(data)
            }).catch(msg =>
                alert(msg)
            )
        } else {
            alert("You are not loggedin yet. You need login before applying for this job.")
        }

    }

    render() {
        const { projectId, expertId } = this.state;
        console.log('projectId: ', projectId, 'expertId: ', expertId)

        return (
            <div>

            </div>
        )
    }
}

export default withRouter(ApplyJob)