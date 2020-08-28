const fakeData = require('./fakeData');
const expertData = fakeData.expertData;
const projectData = fakeData.projectData;
const assessData = fakeData.assessData;

function expertDashboard(req, res){
    res.status(200).json({
        success: true,
        data: []
    });
}

function login(req, res){
    if ('admin' == req.body.email && '123456' == req.body.password){
        res.status(200).json({
            success: true,
            data: {token: 'welcome'}
        });
    } else {
        res.status(401).json({
            success: false,
            msg: 'failed authorization'
        });
    }
}

function fetchExpert(req, res){
    // console.log(res.app.get('connection'))
    res.status(200).json({
        success: true,
        data: expertData
    });
}

function fetchProject(req, res){
    res.status(200).json({
        success: true,
        data: projectData
    });
}

function fetchAssessment(req, res){
    res.status(200).json({
        success: true,
        data: assessData
    });
}

module.exports = {
    expertDashboard,
    login,
    fetchExpert,
    fetchProject,
    fetchAssessment
}