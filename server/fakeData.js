const expertData = [
    {
        'Applicant ID': 1, 'First Name': 'H', 'Last Name': 'M', 'Email': 'U@com',
        'Tel': '135', 'D.O.B': false, 'Nationality': 'CH', 'Expertise': 'Statistics',
        'Professional Field': 'Engineering', 'CV': true
    },
    {
        'Applicant ID': 2, 'First Name': 'N', 'Last Name': 'Y', 'Email': 'R@com',
        'Tel': '135', 'D.O.B': false, 'Nationality': 'CH', 'Expertise': 'Urban planning',
        'Professional Field': 'Engineering', 'CV': false
    }
]

const projectData = [
    {
        'Project ID': 10, 'Project Area': 'US', 'Proposal': 'good', 'Project Place': 'WHouse',
        'Person in Charge': 'Helen', 'Applicant ID': 567, 'Status': 'pending'
    },
    {
        'Project ID': 18, 'Project Area': 'CN', 'Proposal': 'good', 'Project Place': 'BJ',
        'Person in Charge': 'Rui', 'Applicant ID': 123, 'Status': 'completed'
    }
]

const assessData = [
    {
        'Applicant ID': 348, 'First Name': 'Yran', 'Last Name': 'Iany', '手动评级 (A)': 'A',
        'Grade': 90
    },
    {
        'Applicant ID': 132, 'First Name': 'Pongran', 'Last Name': 'Eyop', '手动评级 (A)': 'B',
        'Grade': 100
    },
    {
        'Applicant ID': 678, 'First Name': 'Bo', 'Last Name': 'Wang', '手动评级 (A)': 'C',
        'Grade': 30
    }
]

module.exports = {
    expertData,
    projectData,
    assessData
}