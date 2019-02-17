const config = {
    app: {
        port: process.env.PORT,
        env: process.env.NODE_ENV,
        secret: process.env.SECRET,
        saltRounds: parseInt(process.env.SALT_ROUNDS)
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

module.exports = config;