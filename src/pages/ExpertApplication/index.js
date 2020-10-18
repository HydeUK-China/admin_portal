import React, { Component } from 'react';
import _ from 'lodash';
import JobCard from '../../components/jobCard';
import { fetchReq } from '../../utils/utils';
import { projectDataLessField, projectDataLessHeader } from '../../asset/dataFieldHeader';

export default class ExpertApplication extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }

        this.lessHeader = ['ID', 'Job Title', 'Job Type', 'Employer', 'Location', 'Salary', 'Start Date', 'Close Date']
        this.lessField = ['project_id', 'job_title', 'job_type', 'employer', 'location', 'salary', 'start_date', 'close_date']
        this.moreHeader = ['Currency', 'Organization Infomation', 'Professional Field', 'Job Description', 'Required Expertise', 'Responsibility', 'Essential skills']
        this.moreField = [ 'currency', 'organization_info', 'professional_field', 'job_description', 'required_expertise', 'responsibility', 'essential_skills']

        this.expertId = props.uid;
    }

    componentDidMount() {
        const url = `/api/fetchExpertProject/${this.expertId}`
        fetchReq(url).then(data => {
            this.setState({
                data
            })
        }).catch(err => alert(err));
    }

    renderJobcards(){
        const { data } = this.state;
        const { role } = this.props;
        let rows = []
        let jobcards = []

        if(data.length > 0){
            _.forEach(data, (item, index) => {    
            
                jobcards.push(<JobCard key={`jobcards-${index}`}
                                        role={role}
                                        moreField={this.lessField.concat(this.moreField)}
                                        moreHeader={this.lessHeader.concat(this.moreHeader)}
                                        data={item}/>)
                if ((index % 4 === 3) || (data.length === index + 1)){
                    rows.push(<div key={`jobcardrows-${index}`} className="row">
                            {[...jobcards]}
                        </div>)
                    jobcards = []          
                }
            });
    
            return rows;
        } else {
            return <div style={{color: 'darkgrey', fontSize: '1rem'}}>You haven't applied to any jobs yet.</div>
        }
        
    }

    render() {
        return (
            <div className="expert-application-container">
                { this.renderJobcards() }
            </div>
        )
    }
}
