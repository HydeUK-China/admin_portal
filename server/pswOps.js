const crypto = require('crypto');
// const nodemailer = require('nodemailer');

function forgotPassword(req, res) {
    const email = req.body.email.toLowerCase();

    if (email) {
        const sql = `SELECT id FROM user_credential 
                    WHERE account_name=?`;

        res.app.get('connection').query(sql, [email], function (err, rows) {
            if (err) {
                res.status(400).json({
                    success: false,
                    msg: err.sqlMessage
                });
            } else {
                if (rows.length > 0) {
                    const token = crypto.randomBytes(20).toString('hex');
                    const sql = `UPDATE user_credential 
                                 SET reset_password_token=?
                                 WHERE id=?`;

                    res.app.get('connection').query(sql, [token, rows[0].id], function (err, feedback) {
                        if (err) {
                            res.status(400).json({
                                success: false,
                                msg: err.sqlMessage
                            });
                        } else {
                            // const mailOptions = {
                            //     from: '',
                            //     to: `${email}`,
                            //     subject: 'Link To Reset Password',
                            //     text:
                            //         'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
                            //         + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
                            //         + `http://localhost:5001/reset/${token}\n\n`
                            //         + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                            // };
                            // const transporter = nodemailer.createTransport();
                            // transporter.sendMail(mailOptions, (err, response) => {
                            //     if (err) {
                            //         res.status(400).json({
                            //             success: false,
                            //             msg: err
                            //         });
                            //     } else {
                            //         console.log('here is the res: ', response);
                            //         res.status(200).json({
                            //             success: true,
                            //             data: 'recovery email sent'
                            //         });
                            //     }
                            // });
                        }
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        msg: 'email is not registered'
                    });
                }
            }
        });
    } else {
        res.status(400).json({
            success: false,
            msg: 'email should not be empty'
        })
    }
}

function resetPassword(req, res) {
    const token = req.params.token;

    if (token) {
        const sql = `SELECT id, foreign_user_id, account_name, permission_role 
                    FROM user_credential 
                    WHERE reset_password_token=?`;

        res.app.get('connection').query(sql, [token], function (err, rows) {
            if (err) {
                res.status(400).json({
                    success: false,
                    msg: err.sqlMessage
                });
            } else {
                if (rows.length > 0) {
                    res.status(200).json({
                        success: true,
                        data: rows[0]
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        msg: 'reset token not found in db'
                    });
                }
            }
        });

    } else {
        res.status(400).json({
            success: false,
            msg: 'reset token should not be empty'
        });
    }
}

function updatePassword(req, res) {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    if (email && password) {
        const sql = `SELECT id FROM user_credential 
        WHERE account_name=?`;

        res.app.get('connection').query(sql, [email], function (err, rows) {
            if (err) {
                res.status(400).json({
                    success: false,
                    msg: err.sqlMessage
                });
            } else {
                if (rows.length > 0) {
                    const sql = `UPDATE user_credential 
                                SET reset_password_token=?,
                                account_password=?
                                WHERE id=?`;

                    res.app.get('connection').query(sql, ['', password, rows[0].id], function (err, rows) {
                        if (err) {
                            res.status(400).json({
                                success: false,
                                msg: err.sqlMessage
                            });
                        } else {
                            res.status(200).json({
                                success: true,
                                data: 'password is updated'
                            });
                        }
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        msg: 'email is not registered'
                    });
                }
            }
        });
    } else {
        res.status(400).json({
            success: false,
            msg: 'email and password should not be empty'
        });
    }
}

module.exports = {
    forgotPassword,
    resetPassword,
    updatePassword
}