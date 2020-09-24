const fakeData = require('./fakeData');
const jwtUtil = require('./jwtUtil');

const expertData = fakeData.expertData;
const projectData = fakeData.projectData;
const employerData = fakeData.employerData;
const projectMatchingData = fakeData.projectMatchingData

function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        if ('admin' == email && '123456' == password) {
            req.session.token = jwtUtil.generateTokenByRole('admin');
            res.status(200).json({
                success: true,
                data: {
                    role: '__admin__'
                }
            });
        } else if ('expert' == email && '123456' == password) {
            req.session.token = jwtUtil.generateTokenByRole('expert');
            res.status(200).json({
                success: true,
                data: {
                    role: 'expert'
                }
            });
        } else if ('employer' == email && '123456' == password) {
            req.session.token = jwtUtil.generateTokenByRole('employer');
            res.status(200).json({
                success: true,
                data: {
                    role: 'employer'
                }
            });
        } else {
            res.status(400).json({
                success: false,
                msg: 'failed authorization'
            });
        }
    } else {
        res.status(400).json({
            success: false,
            msg: 'failed authorization'
        });
    }
}

function logout(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            res.status(400).json({
                success: false,
                msg: 'failed clear session'
            });
        } else {
            res.status(200).json({
                success: true,
                data: {
                    session: 'session destroyed'
                }
            });
        }
    });
}

function expertDashboard(req, res) {
    // res.app.get('connection').query('SELECT * FROM Applicant_Information', function(err, rows){
    //     if(err){
    // res.status(400).json({
    //     success: false,
    //     msg: err.sqlMessage
    // });
    //     } else {
    // res.status(200).json({
    //     success: true,
    //     data: []
    // });
    //     }
    // })
    const token = req.session.token;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role === 'admin') {
                res.status(200).json({
                    success: true,
                    data: []
                })
            } else {
                res.status(400).json({
                    success: false,
                    msg: 'role permission denied'
                })
            }
        }).catch(err => {
            res.status(400).json({
                success: false,
                msg: err
            })
        });
}

function fetchExpertAll(req, res) {
    const token = req.session.token;

    // jwtUtil.verifyRoleFromToken(token)
    //     .then((role) => {
    //         if (role === 'admin') {
    //             res.status(200).json({
    //                 success: true,
    //                 data: expertData
    //             })
    //         } else {
    //             res.status(400).json({
    //                 success: false,
    //                 msg: 'role permission denied'
    //             })
    //         }
    //     }).catch(err => {
    //         res.status(400).json({
    //             success: false,
    //             msg: err
    //         })
    //     });
    res.status(200).json({
        success: true,
        data: expertData
    })
}

function fetchExpert(req, res) {
    const expertId = req.params.expertid
    res.status(200).json({
        success: true,
        data: expertData[expertId]
    })
}

function fetchEmployer(req, res) {
    const token = req.session.token;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role === 'admin') {
                res.status(200).json({
                    success: true,
                    data: employerData
                })
            } else {
                res.status(400).json({
                    success: false,
                    msg: 'role permission denied'
                })
            }
        }).catch(err => {
            res.status(400).json({
                success: false,
                msg: err
            })
        });
}

function fetchProject(req, res) {
    res.status(200).json({
        success: true,
        data: projectData
    });
}

function fetchProjectMatching(req, res) {
    res.status(200).json({
        success: true,
        data: projectMatchingData
    });
}

module.exports = {
    expertDashboard,
    login,
    logout,
    fetchExpertAll,
    fetchExpert,
    fetchProject,
    fetchEmployer,
    fetchProjectMatching
}