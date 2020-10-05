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
        const sql = `SELECT foreign_user_id, permission_role 
                    FROM user_credential 
                    WHERE account_name=? AND account_password=?`;

        res.app.get('connection').query(sql, [email, password], function (err, rows) {
            if (err) {
                res.status(400).json({
                    success: false,
                    msg: err.sqlMessage
                });
            } else {
                if (rows[0]) {
                    if (rows[0].permission_role == 'admin') {
                        req.session.token = jwtUtil.generateTokenByRole('admin');
                        res.status(200).json({
                            success: true,
                            data: {
                                role: '__admin__',
                                user_id: rows[0].foreign_user_id
                            }
                        });
                    } else {
                        req.session.token = jwtUtil.generateTokenByRole(rows[0].permission_role);
                        res.status(200).json({
                            success: true,
                            data: {
                                role: rows[0].permission_role,
                                user_id: rows[0].foreign_user_id
                            }
                        });
                    }
                } else {
                    res.status(400).json({
                        success: false,
                        msg: 'failed authorization'
                    });
                }
            }
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

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role === 'admin') {
                const sql = `SELECT * FROM expert_info`;

                res.app.get('connection').query(sql, function (err, rows) {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            msg: err.sqlMessage
                        });
                    } else {
                        res.status(200).json({
                            success: true,
                            data: rows
                        })
                    }
                });
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

function addExpert(req, res) {
    const token = req.session.token;
    const record = req.body.record;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role === 'admin') {
                const sql = `INSERT INTO expert_info
                            (title, first_name, last_name, gender, nationality, date_of_birth, email, 
                            phone_no, linkedin, facebook, twitter, expertise, category, source_references,
                            edu_organization, field_of_speciality, education, employment, membership_of_professional_bodies,
                            scientific_contribution_and_research_leadersihp, awarded_grants_and_funded_activities,
                            awards, patents, publications, collaborative_project_proposal)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                res.app.get('connection').query(sql, [record.title, record.first_name, record.last_name, record.gender,
                record.nationality, record.date_of_birth, record.email, record.phone_no, record.linkedin, record.facebook,
                record.twitter, record.expertise, record.category, record.source_references, record.edu_organization,
                record.field_of_speciality, record.education, record.employment, record.membership_of_professional_bodies,
                record.scientific_contribution_and_research_leadersihp, record.awarded_grants_and_funded_activities,
                record.awards, record.patents, record.publications, record.collaborative_project_proposal],
                    function (err, feedback) {
                        if (err) {
                            res.status(400).json({
                                success: false,
                                msg: err.sqlMessage
                            });
                        } else {
                            res.status(200).json({
                                success: true,
                                data: feedback
                            })
                        }
                    });
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

function editExpert(req, res) {
    const token = req.session.token;
    const record = req.body.record;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role) {
                const sql = `UPDATE expert_info
                            SET title=?,
                            first_name=?,
                            last_name=?,
                            gender=?,
                            nationality=?,
                            date_of_birth=?,
                            email=?,
                            phone_no=?,
                            linkedin=?,
                            facebook=?,
                            twitter=?,
                            expertise=?,
                            category=?,
                            source_references=?,
                            edu_organization=?,
                            field_of_speciality=?,
                            education=?,
                            employment=?,
                            membership_of_professional_bodies=?,
                            scientific_contribution_and_research_leadersihp=?,
                            awarded_grants_and_funded_activities=?,
                            awards=?,
                            patents=?,
                            publications=?,
                            collaborative_project_proposal=?
                            WHERE expert_id=?`;

                res.app.get('connection').query(sql, [record.title, record.first_name, record.last_name, record.gender,
                record.nationality, record.date_of_birth, record.email, record.phone_no, record.linkedin, record.facebook,
                record.twitter, record.expertise, record.category, record.source_references, record.edu_organization,
                record.field_of_speciality, record.education, record.employment, record.membership_of_professional_bodies,
                record.scientific_contribution_and_research_leadersihp, record.awarded_grants_and_funded_activities,
                record.awards, record.patents, record.publications, record.collaborative_project_proposal, record.expert_id],
                    function (err, feedback) {
                        if (err) {
                            res.status(400).json({
                                success: false,
                                msg: err.sqlMessage
                            });
                        } else {
                            res.status(200).json({
                                success: true,
                                data: feedback
                            })
                        }
                    });
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

function deleteExpert(req, res) {
    const token = req.session.token;
    const expertId = req.params.expertid;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role === 'admin') {
                const sql = `DELETE FROM expert_info WHERE expert_id=?`;

                res.app.get('connection').query(sql, [expertId], function (err, feedback) {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            msg: err.sqlMessage
                        });
                    } else {
                        res.status(200).json({
                            success: true,
                            data: feedback
                        })
                    }
                });
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

function fetchExpert(req, res) {
    const token = req.session.token;
    const expertId = req.params.expertid;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role) {
                const sql = `SELECT * FROM expert_info WHERE expert_id=?`;

                res.app.get('connection').query(sql, [expertId], function (err, rows) {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            msg: err.sqlMessage
                        });
                    } else {
                        res.status(200).json({
                            success: true,
                            data: rows[0]
                        })
                    }
                });
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


function fetchExpertProject(req, res) {
    const token = req.session.token;
    const expertId = req.params.expertid;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role) {
                const sql = `SELECT *  FROM project_matching 
                            JOIN project_info
                            ON project_info.project_id = project_matching.project_id
                            WHERE project_matching.expert_id=?`;

                res.app.get('connection').query(sql, [expertId], function (err, rows) {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            msg: err.sqlMessage
                        });
                    } else {
                        res.status(200).json({
                            success: true,
                            data: rows
                        })
                    }
                });
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

function fetchProjectAll(req, res) {
    const token = req.session.token;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role === 'admin') {
                const sql = 'SELECT * FROM project_info';

                res.app.get('connection').query(sql, function (err, rows) {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            msg: err.sqlMessage
                        });
                    } else {
                        res.status(200).json({
                            success: true,
                            data: rows
                        })
                    }
                });
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

function addProject(req, res) {
    const token = req.session.token;
    const record = req.body.record;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role === 'admin') {
                const sql = `INSERT INTO project_info 
                            (start_date, professional_field, job_description,
                            required_expertise, employer, area, salary, currency)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

                res.app.get('connection').query(sql, [record.start_date, record.professional_field, record.job_description, record.required_expertise,
                record.employer, record.area, record.salary, record.currency],
                    function (err, rows) {
                        if (err) {
                            res.status(400).json({
                                success: false,
                                msg: err.sqlMessage
                            });
                        } else {
                            res.status(200).json({
                                success: true,
                                data: rows
                            })
                        }
                    });
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

function editProject(req, res) {
    const token = req.session.token;
    const record = req.body.record;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role === 'admin') {
                const sql = `UPDATE project_info 
                            SET start_date=?,
                            professional_field=?,
                            job_description=?,
                            required_expertise=?,
                            employer=?,
                            area=?,
                            salary=?,
                            currency=?
                            WHERE project_id=?`;

                res.app.get('connection').query(sql, [record.start_date, record.professional_field, record.job_description, record.required_expertise,
                record.employer, record.area, record.salary, record.currency, record.project_id],
                    function (err, feedback) {
                        if (err) {
                            res.status(400).json({
                                success: false,
                                msg: err.sqlMessage
                            });
                        } else {
                            res.status(200).json({
                                success: true,
                                data: feedback
                            })
                        }
                    });
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

function deleteProject(req, res) {
    const token = req.session.token;
    const projectId = req.params.projectid;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role === 'admin') {
                const sql = `DELETE FROM project_info WHERE project_id=?`;

                res.app.get('connection').query(sql, [projectId], function (err, feedback) {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            msg: err.sqlMessage
                        });
                    } else {
                        res.status(200).json({
                            success: true,
                            data: feedback
                        })
                    }
                });
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

function fetchProjectExpert(req, res) {
    const token = req.session.token;
    const projectId = req.params.projectid;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role == 'admin') {
                const sql = `SELECT * FROM project_matching
                            JOIN expert_info
                            ON expert_info.expert_id = project_matching.expert_id
                            WHERE project_matching.project_id=?`;

                res.app.get('connection').query(sql, [projectId], function (err, rows) {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            msg: err.sqlMessage
                        });
                    } else {
                        res.status(200).json({
                            success: true,
                            data: rows
                        })
                    }
                });
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

function fetchProjectMatching(req, res) {
    const token = req.session.token;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role == 'admin') {
                const sql = `SELECT * FROM (
                                SELECT *, ROW_NUMBER() OVER (PARTITION BY project_matching.project_id ORDER BY project_matching.matching_id) AS rn
                                FROM project_matching 
                            ) AS temp
                            JOIN project_info
                            ON project_info.project_id = temp.project_id 
                            WHERE rn=1`;

                res.app.get('connection').query(sql, function (err, rows) {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            msg: err.sqlMessage
                        });
                    } else {
                        res.status(200).json({
                            success: true,
                            data: rows
                        })
                    }
                });
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

module.exports = {
    expertDashboard,
    login,
    logout,
    fetchExpertAll,
    addExpert,
    editExpert,
    deleteExpert,
    fetchExpert,
    fetchProjectAll,
    addProject,
    editProject,
    deleteProject,
    fetchProjectExpert,
    fetchExpertProject,
    fetchEmployer,
    fetchProjectMatching
}