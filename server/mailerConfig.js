const createTransportConfig = {
    host: "smtpw.263.net", //replace with your email provider
    port: 465,
    auth: {
        user: "contact@hyde-china.com", //replace with the email address
        pass: "Cmm2020cm107" //replace with the password
    }
}

const testConfig = {
    service: 'gmail',
    auth: {
        user: '',
        pass: '',
    }
}

module.exports = {
    createTransportConfig,
    testConfig
}