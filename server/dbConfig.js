const config = {
    prod: {
        // host: process.env.RDS_HOSTNAME,
        // user: process.env.RDS_USERNAME,
        // password: process.env.RDS_PASSWORD,
        // port: process.env.RDS_PORT
    },
    dev: {
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT
    }
}

module.exports = config