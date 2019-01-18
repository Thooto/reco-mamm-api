const config = {
    app: {
        port: process.env.PORT,
        env: process.env.NODE_ENV,
        secret: process.env.SECRET,
        saltRounds: process.env.SALT_ROUNDS
    },
    database: {
        dialect: 'postgres',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: 5432,
        database: process.env.DB_DATABASE,
        dialectOptions: { ssl: true },
        logging: false
    }
};

module.exports = config;