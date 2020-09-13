const rdsClient = {
    prod: {
        host: 'expertdb.cwhivqtuvfvm.eu-west-2.rds.amazonaws.com',
        user: 'hydeuk',
        password: 'Shree123456',
        port: '3306'
    },
    dev: {
        host: 'expertdb.cwhivqtuvfvm.eu-west-2.rds.amazonaws.com',
        user: 'hydeuk',
        password: 'Shree123456',
        port: '3306'
    }
}

const database = {
    prod: 'ExpertDatabase',
    dev: 'ExpertDatabase'
}

module.exports = {
    rdsClient,
    database
}