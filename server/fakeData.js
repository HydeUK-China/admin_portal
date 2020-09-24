const expertData = [
    {
        'id': 1, 'title': 'Dr', 'first_name': 'Jonathan', 'last_name': 'M', 'expertise': 'Data', 'category': 'Computer Science', 'level': 'S', 'email': 'U@com',
        'phone_no': '074586442', 'education': 'University of Cambridge', 'employment': 'Alibaba', 'projects': 'project xxx', 'patents': 'patent xxx',
        'field_of_speciality': 'xxx', 'awards': 'xxx', 'products': 'xxx', ' publication_date': 'xxx', 'recent_major_research_projects': 'xxx',
        'collaborative_project_proposal': 'xxx',
        'applications': [
            {
                'id': 10, 'job_title': 'Data Scientist', 'start_date': '2020-07-01', 'employer': 'Alibaba', 'area': 'GuangZhou', 'required_expertise': 'Data', 'salary': 100000,
                'close_date': '2020-10-22', 'featured': 'xxx', 'job_description': 'Analyze data', 'responsibilities': 'daily report',
                'essential_skills': 'data modelling, machine learning'
            },
            {
                'id': 19, 'job_title': 'Software Engineer', 'start_date': '2020-08-21', 'employer': 'Siemens', 'area': 'United Kingdom', 'required_expertise': 'Engineer', 'salary': 120000,
                'close_date': '2020-10-22', 'featured': 'xxx', 'job_description': 'develop website', 'responsibilities': 'daily code push',
                'essential_skills': 'javascript, SQL'
            }
        ]
    },
    {
        'id': 2, 'title': 'Dr', 'first_name': 'Helene', 'last_name': 'B', 'expertise': 'Engineer', 'category': 'Mechanical Engieneer', 'level': 'A', 'email': 'U@com',
        'phone_no': '0658994521', 'education': 'University of Oxford', 'employment': 'Tencent', 'projects': 'project yyy', 'patents': 'patent yyy',
        'field_of_speciality': 'yyy', 'awards': 'yyy', 'products': 'yyy', 'publication_date': 'yyy', 'recent_major_research_projects': 'yyy',
        'collaborative_project_proposal': 'yyy',
        'applications': [
            {
                'id': 10, 'job_title': 'Data Scientist', 'start_date': '2020-07-01', 'employer': 'Alibaba', 'area': 'GuangZhou', 'required_expertise': 'Data', 'salary': 100000,
                'close_date': '2020-10-22', 'featured': 'xxx', 'job_description': 'Analyze data', 'responsibilities': 'daily report',
                'essential_skills': 'data modelling, machine learning'
            },
            {
                'id': 19, 'job_title': 'Software Engineer', 'start_date': '2020-08-21', 'employer': 'Siemens', 'area': 'United Kingdom', 'required_expertise': 'Engineer', 'salary': 120000,
                'close_date': '2020-10-22', 'featured': 'xxx', 'job_description': 'develop website', 'responsibilities': 'daily code push',
                'essential_skills': 'javascript, SQL'
            },
            {
                'id': 10, 'job_title': 'Data Scientist', 'start_date': '2020-07-01', 'employer': 'Alibaba', 'area': 'GuangZhou', 'required_expertise': 'Data', 'salary': 100000,
                'close_date': '2020-10-22', 'featured': 'xxx', 'job_description': 'Analyze data', 'responsibilities': 'daily report',
                'essential_skills': 'data modelling, machine learning'
            },
            {
                'id': 19, 'job_title': 'Software Engineer', 'start_date': '2020-08-21', 'employer': 'Siemens', 'area': 'United Kingdom', 'required_expertise': 'Engineer', 'salary': 120000,
                'close_date': '2020-10-22', 'featured': 'xxx', 'job_description': 'develop website', 'responsibilities': 'daily code push',
                'essential_skills': 'javascript, SQL'
            },
            {
                'id': 10, 'job_title': 'Data Scientist', 'start_date': '2020-07-01', 'employer': 'Alibaba', 'area': 'GuangZhou', 'required_expertise': 'Data', 'salary': 100000,
                'close_date': '2020-10-22', 'featured': 'xxx', 'job_description': 'Analyze data', 'responsibilities': 'daily report',
                'essential_skills': 'data modelling, machine learning'
            },
            {
                'id': 19, 'job_title': 'Software Engineer', 'start_date': '2020-08-21', 'employer': 'Siemens', 'area': 'United Kingdom', 'required_expertise': 'Engineer', 'salary': 120000,
                'close_date': '2020-10-22', 'featured': 'xxx', 'job_description': 'develop website', 'responsibilities': 'daily code push',
                'essential_skills': 'javascript, SQL'
            }
        ]
    }
]

const projectData = [
    {
        'id': 10, 'job_title': 'Data Scientist', 'start_date': '2020-07-01', 'employer': 'Alibaba', 'area': 'GuangZhou', 'required_expertise': 'Data', 'salary': 100000,
        'close_date': '2020-10-22', 'featured': 'xxx', 'job_description': 'Analyze data', 'responsibilities': 'daily report',
        'essential_skills': 'data modelling, machine learning'
    },
    {
        'id': 19, 'job_title': 'Software Engineer', 'start_date': '2020-08-21', 'employer': 'Siemens', 'area': 'United Kingdom', 'required_expertise': 'Engineer', 'salary': 120000,
        'close_date': '2020-10-22', 'featured': 'xxx', 'job_description': 'develop website', 'responsibilities': 'daily code push',
        'essential_skills': 'javascript, SQL'
    }
]

const employerData = [
    {
        'id': 348, 'title': 'Mr', 'first_name': 'Yran', 'last_name': 'Iany', 'organization': 'A',
        'email': 'a@gmail.com', 'phone_no': '123123', 'nationality': 'British'
    },
    {
        'id': 132, 'title': 'Mr', 'first_name': 'Pongran', 'last_name': 'Eyop', 'organization': 'B',
        'email': 'b@gmail.com', 'phone_no': '9182398123', 'nationality': 'British'
    },
    {
        'id': 678, 'title': 'Mr', 'first_name': 'Bo', 'last_name': 'Wang', 'organization': 'C',
        'email': 'c@gmail.com', 'phone_no': '91023923', 'nationality': 'British'
    }
]

const projectMatchingData = [
    {
        'id': 10, 'start_date': '2020-07-01', 'employer': 'Alibaba', 'area': 'GuangZhou', 'required_expertise': 'Data', 'salary': 100000, 'close_date': '2020-10-22',
        'expertData': [
            {
                'id': 1, 'title': 'Dr', 'first_name': 'Jonathan', 'last_name': 'M', 'expertise': 'Data', 'category': 'Computer Science', 'level': 'S', 'email': 'U@com',
                'phone_no': '074586442', 'cv': 'CV'
            },
            {
                'id': 2, 'title': 'Dr', 'first_name': 'Helene', 'last_name': 'B', 'expertise': 'Engineer', 'category': 'Mechanical Engieneer', 'level': 'A', 'email': 'U@com',
                'phone_no': '0658994521', 'cv': 'CV'
            }
        ]

    },
    {
        'id': 19, 'start_date': '2020-08-21', 'employer': 'Siemens', 'area': 'United Kingdom', 'required_expertise': 'Engineer', 'salary': 120000, 'close_date': '2020-10-22',
        'expertData': [
            {
                'id': 3, 'title': 'Dr', 'first_name': 'Helene', 'last_name': 'N', 'expertise': 'Computer Science', 'category': 'Information Technology', 'level': 'S', 'email': 'U@com',
                'phone_no': '074586442', 'cv': 'CV'
            },
            {
                'id': 4, 'title': 'Dr', 'first_name': 'Boris', 'last_name': 'S', 'expertise': 'Engineer', 'category': 'Mechanical Engieneer', 'level': 'A', 'email': 'U@com',
                'phone_no': '0658994521', 'cv': 'CV'
            }
        ]

    }
]

module.exports = {
    expertData,
    projectData,
    employerData,
    projectMatchingData
}