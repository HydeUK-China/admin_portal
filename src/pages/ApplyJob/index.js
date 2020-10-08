import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {fetchReq, getRole, getUid} from '../../utils/utils';

import '../../styles/applyjob.css';

class ApplyJob extends Component {
    constructor(props){
        super(props);

        this.state = {
            projectId: props.match.params.projectId,
            expertId: (getRole() === 'expert' && getUid()) ? getUid() : null,
            project: {}
        }
    }

    componentDidMount() {
        this.receiveUpdateData();
    }

    receiveUpdateData() {
        const { projectId } = this.state;
        const url = `/api/fetchProject/${projectId}`;
        
        fetchReq(url).then(data => {
            this.setState({
                project: data
            })
        }).catch(err => alert(err));
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