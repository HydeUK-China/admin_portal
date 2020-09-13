const expertData = [
    {
        'id': 1, 'title': 'Dr', 'first_name': 'H', 'last_name': 'M', 'expertise': 'Data', 'category': 'Computer Science', 'level': 'S', 'email': 'U@com',
        'phone_no': '074586442', 'cv': 'CV'
    },
    {
        'id': 2, 'title': 'Dr', 'first_name': 'A', 'last_name': 'B', 'expertise': 'Engineer', 'category': 'Mechanical Engieneer', 'level': 'A', 'email': 'U@com',
        'phone_no': '0658994521', 'cv': 'CV'
    }
]

const projectData = [
    {
        'id': 10, 'start_date': '2020-07-01', 'employer': 'Alibaba', 'area': 'GuangZhou', 'required_expertise': 'Data', 'salary': 100000, 'close_date': '2020-10-22'
    },
    {
        'id': 19, 'start_date': '2020-08-21', 'employer': 'Siemens', 'area': 'United Kingdom', 'required_expertise': 'Engineer', 'salary': 120000, 'close_date': '2020-10-22'
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
                'id': 1, 'title': 'Dr', 'first_name': 'H', 'last_name': 'M', 'expertise': 'Data', 'category': 'Computer Science', 'level': 'S', 'email': 'U@com',
                'phone_no': '074586442', 'cv': 'CV'
            },
            {
                'id': 2, 'title': 'Dr', 'first_name': 'A', 'last_name': 'B', 'expertise': 'Engineer', 'category': 'Mechanical Engieneer', 'level': 'A', 'email': 'U@com',
                'phone_no': '0658994521', 'cv': 'CV'
            }
        ]

    },
    {
        'id': 19, 'start_date': '2020-08-21', 'employer': 'Siemens', 'area': 'United Kingdom', 'required_expertise': 'Engineer', 'salary': 120000, 'close_date': '2020-10-22',
        'expertData': [
            {
                'id': 3, 'title': 'Dr', 'first_name': 'K', 'last_name': 'N', 'expertise': 'Computer Science', 'category': 'Information Technology', 'level': 'S', 'email': 'U@com',
                'phone_no': '074586442', 'cv': 'CV'
            },
            {
                'id': 4, 'title': 'Dr', 'first_name': 'J', 'last_name': 'S', 'expertise': 'Engineer', 'category': 'Mechanical Engieneer', 'level': 'A', 'email': 'U@com',
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