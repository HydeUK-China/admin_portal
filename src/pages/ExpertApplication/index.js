import React, { Component } from 'react';
import _ from 'lodash';
import JobCard from '../../components/jobCard';
import { fetchReq } from '../../utils/utils';

export default class ExpertApplication extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null
        }

        this.lessHeader = ['ID', 'Job Title', 'Start Date', 'Employer', 'Area', 'Required Expertise', 'Salary', 'Close Date']

        this.lessField = ['id', 'job_title', 'start_date', 'employer', 'area', 'required_expertise', 'salary', 'close_date']

        this.moreHeader = ['Featured', 'Job Description', 'Responsibilities', 'Essential skills']

        this.moreField = ['featured', 'job_description', 'responsibilities', 'essential_skills']
    }

    componentDidMount() {
        const expertId = 1;
        const url = `/api/fetchExpertProject/${expertId}`
        fetchReq(url).then(data => {
            this.setState({
                data
            })
        }).catch(err => console.log(err));
    }

    renderJobcards(){
        const { data } = this.state;
        const { role } = this.props;
        let rows = []
        let jobcards = []

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
    }

    render() {
        return (
            <div className="expert-application-container">
                { this.renderJobcards() }
            </div>
        )
    }
}
