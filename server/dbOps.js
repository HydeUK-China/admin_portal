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

function signup(req, res) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const role = req.body.role;

    const sql = `INSERT INTO expert_info (first_name, last_name, email, phone_no) 
                VALUES (?, ?, ?, ?)`;

    res.app.get('connection').query(sql, [firstname, lastname, email, phone], function (err, rows) {
        if (err) {
            res.status(400).json({
                success: false,
                msg: 'failed inserting into expert_info'
            });
        } else {
            const sql = `SELECT expert_id FROM expert_info 
                        WHERE first_name=? AND last_name=? AND email=? AND phone_no=?`
            res.app.get('connection').query(sql, [firstname, lastname, email, phone], function (err, rows) {
                if (err) {
                    res.status(400).json({
                        success: false,
                        msg: 'failed getting user_id'
                    });
                } else {
                    const expertid = rows[0].expert_id;
                    const sql = `INSERT INTO user_credential (foreign_user_id, account_name, account_password, permission_role) 
                                    VALUES (?, ?, ?, ?)`;
                    res.app.get('connection').query(sql, [expertid, `${role}_${expertid}`, password, role], function (err, rows) {
                        if (err) {
                            res.status(400).json({
                                success: false,
                                msg: 'failed inserting into user_credential'
                            });
                        } else {
                            req.session.token = jwtUtil.generateTokenByRole(role);
                            res.status(200).json({
                                success: true,
                                data: {
                                    role: role,
                                    user_id: expertid
                                }
                            });
                        }
                    });
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
                            const sql = `SELECT expert_id FROM expert_info 
                                        WHERE first_name=? AND last_name=? AND email=?`
                            res.app.get('connection').query(sql, [firstname, lastname, email], function (err, rows) {
                                if (err) {
                                    res.status(400).json({
                                        success: false,
                                        msg: 'failed getting user_id'
                                    });
                                } else {
                                    const expertid = rows[0].expert_id;
                                    const sql = `INSERT INTO user_credential (foreign_user_id, account_name, account_password, permission_role) 
                                                    VALUES (?, ?, ?, ?)`;
                                    res.app.get('connection').query(sql, [expertid, `expert_${expertid}`, record.password, 'expert'], function (err, rows) {
                                        if (err) {
                                            res.status(400).json({
                                                success: false,
                                                msg: 'failed inserting into user_credential'
                                            });
                                        } else {
                                            res.status(200).json({
                                                success: true,
                                                data: feedback
                                            });
                                        }
                                    });
                                }
                            });
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

function expertApply(req, res) {
    const expertid = req.body.expertid;
    const projectid = req.body.projectid;

    jwtUtil.verifyRoleFromToken(token)
        .then((role) => {
            if (role) {
                const sql = `INSERT INTO project_matching (project_id, expert_id) 
                            VALUES (?, ?)`;

                res.app.get('connection').query(sql, [projectid, expertid], function (err, feedback) {
                    if (err) {
                        res.status(400).json({
                            success: false,
                            msg: err.sqlMessage
                        });
                    } else {
                        res.status(200).json({
                            success: true,
                            data: 'successfully applied'
                        });
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
}

function fetchProject(req, res) {
    const projectId = req.params.projectid;

    const sql = 'SELECT * FROM project_info WHERE project_id=?';

    res.app.get('connection').query(sql, [projectId], function (err, rows) {
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
    signup,
    fetchExpertAll,
    addExpert,
    editExpert,
    deleteExpert,
    fetchExpert,
    expertApply,
    fetchProjectAll,
    fetchProject,
    addProject,
    editProject,
    deleteProject,
    fetchProjectExpert,
    fetchExpertProject,
    fetchEmployer,
    fetchProjectMatching
}