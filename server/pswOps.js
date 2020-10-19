const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { createTransportConfig } = require('./mailerConfig');

const transporter = nodemailer.createTransport(createTransportConfig);

function forgotPassword(req, res) {
    const email = req.body.email.trim().toLowerCase();

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
                            const mailOptions = {
                                from: 'contact@hyde-china.com',
                                to: `${email}`,
                                subject: 'Link To Reset Password',
                                html: 'You are receiving this email because you (or someone else) have requested to reset the password for your account. <br/>'
                                    + 'Please click on the following link to complete the process : <br/>'
                                    + `${res.app.get('url')}/resetpassword/${token} <br/>`
                                    + 'If you did not request this, please ignore this email and your password will remain unchanged.<br/>',
                            };
                            
                            transporter.sendMail(mailOptions, (err, response) => {
                                if (err) {
                                    res.status(400).json({
                                        success: false,
                                        msg: `unable to send recovery email due to error: ${err.code}`
                                    });
                                } else {
                                    res.status(200).json({
                                        success: true,
                                        data: 'recovery email sent'
                                    });
                                }
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
    const email = req.body.email.trim().toLowerCase();
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
            msg: 'email or password should not be empty'
        });
    }
}

module.exports = {
    forgotPassword,
    resetPassword,
    updatePassword
}