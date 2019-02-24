module.exports = {
    web: {
        host: process.env.HOST
    },

    api: {
        host: `api.${process.env.HOST}`
    },

    app: {
        port: process.env.PORT,
        env: process.env.NODE_ENV,
        secret: process.env.SECRET,
        saltRounds: parseInt(process.env.SALT_ROUNDS),
        tokenExpiration: process.env.NODE_ENV == 'dev' ? '24h' : '1h'
    },

    database: {
        dialect: 'postgres',
        username: process.env.PDB_USERNAME,
        password: process.env.PDB_PASSWORD,
        host: process.env.PDB_HOST,
        port: 5432,
        database: process.env.PDB_DATABASE,
        dialectOptions: { ssl: true },
        logging: false
    }
};