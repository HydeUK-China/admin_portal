const rdsClient = {
    prod: {
        // host: 'expertdb.cwhivqtuvfvm.eu-west-2.rds.amazonaws.com',
        // user: 'hydeuk',
        // password: 'Shree123456',
        // port: '3306'
        host: 'localhost',
        user: 'root',
        password: '1234567890',
        port: '3306'
    },
    dev: {
        host: 'localhost',
        user: 'root',
        password: '1234567890',
        port: '3306'
    }
}

const database = {
    prod: 'portal_system',
    dev: 'portal_system'
}

module.exports = {
    rdsClient,
    database
}