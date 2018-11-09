/*
#### ##     ## ########   #######  ########  ########  ######
 ##  ###   ### ##     ## ##     ## ##     ##    ##    ##    ##
 ##  #### #### ##     ## ##     ## ##     ##    ##    ##
 ##  ## ### ## ########  ##     ## ########     ##     ######
 ##  ##     ## ##        ##     ## ##   ##      ##          ##
 ##  ##     ## ##        ##     ## ##    ##     ##    ##    ##
#### ##     ## ##         #######  ##     ##    ##     ######
*/


// Configure environment
require('dotenv').config();


// Imports
const Sequelize = require('sequelize');
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const util = require('util');


// Configuration
const config = {
    db: {
        dialect: 'postgres',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: 5432,
        database: process.env.DB_DATABASE,
        dialectOptions: { ssl: true }
    }
};


/*
##     ## ######## #### ##        ######
##     ##    ##     ##  ##       ##    ##
##     ##    ##     ##  ##       ##
##     ##    ##     ##  ##        ######
##     ##    ##     ##  ##             ##
##     ##    ##     ##  ##       ##    ##
 #######     ##    #### ########  ######
*/


// Loggers
const logSuccess = (message) => console.log(chalk.green('Success:'), message);
const logError = (err) => console.log(chalk.red('Error:'), err.message);
const logMessage = (message) => console.log(chalk.blue('Message:'), message);
const logWarning = (message) => console.log(chalk.yellow('Warning:'), message);


/*
########     ###    ########    ###    ########     ###     ######  ########
##     ##   ## ##      ##      ## ##   ##     ##   ## ##   ##    ## ##
##     ##  ##   ##     ##     ##   ##  ##     ##  ##   ##  ##       ##
##     ## ##     ##    ##    ##     ## ########  ##     ##  ######  ######
##     ## #########    ##    ######### ##     ## #########       ## ##
##     ## ##     ##    ##    ##     ## ##     ## ##     ## ##    ## ##
########  ##     ##    ##    ##     ## ########  ##     ##  ######  ########
*/


// Init ORM
const sequelize = new Sequelize({ ...config.db, logging: false });


// Test connection
sequelize.authenticate()
    .then(logSuccess('connected to postgres database'))
    .catch(logError);


// Define models
const User = sequelize.define('user', {
    email: Sequelize.STRING
});

const Category = sequelize.define('category', {
    name: Sequelize.STRING
});

const Question = sequelize.define('question', {
    name: { type: Sequelize.STRING, unique: true }
});

const Answer = sequelize.define('answer', {
    name: Sequelize.STRING,
    code: Sequelize.STRING,
    next: Sequelize.STRING
});


// Define relations
Category.hasMany(Question);
Question.hasMany(Answer);
User.hasMany(Answer);


// Synchronize with the database
sequelize.sync({ force: true })
    .then(logMessage('database synchronized'))
    .catch(logError);


/*
   ###     ######  ######## ####  #######  ##    ##  ######
  ## ##   ##    ##    ##     ##  ##     ## ###   ## ##    ##
 ##   ##  ##          ##     ##  ##     ## ####  ## ##
##     ## ##          ##     ##  ##     ## ## ## ##  ######
######### ##          ##     ##  ##     ## ##  ####       ##
##     ## ##    ##    ##     ##  ##     ## ##   ### ##    ##
##     ##  ######     ##    ####  #######  ##    ##  ######
*/


// Category CRUD
const categories = {
    create: async (body) => {
        return await Category.create({
            name: body.name
        });
    },

    read: async (query) => {
        return await Category.findOne({
            where: { name: query.name }
        });
    },

    update: async (body) => {
        return await Category.update({

        });
    },

    delete: async (body) => {
        return await Category.delete({
            name: body.name
        });
    }
}

// Questions CRUD
const questions = {
    create: async (body) => {
        return await Question.create({
            name: body.name,
            answers: body.answers
        }, { include: [Answer] });
    },

    read: async (query) => {
        return await Question.findOne({
            where: { name: query.name },
            include: [Answer]
        });
    },

    update: async (body) => {
        return await Question.update({
            name: body.name
        });
    },

    delete: async (body) => { }
};


/*
   ###    ########  ########
  ## ##   ##     ## ##     ##
 ##   ##  ##     ## ##     ##
##     ## ########  ########
######### ##        ##
##     ## ##        ##
##     ## ##        ##
*/


// Init app
const app = express();
app.use(morgan(process.env.NODE_ENV));
app.listen = util.promisify(app.listen);


// Define body handlers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Category CRUD
app.route('/category')
    .post((req, res, next) => {
        categories.create(req.body)
            .then((category) => res.json(category))
            .catch(next);
    })
    .get((req, res, next) => {
        categories.read(req.query)
            .then((category) => res.json(category))
            .catch(next);
    });


// Questions CRUD
app.route('/questions')
    .post((req, res, next) => {
        questions.create(req.body)
            .then((question) => res.json(question))
            .catch(next);
    })
    .get((req, res, next) => {
        questions.read(req.query)
            .then((question) => res.json(question))
            .catch(next);
    });


// Error interceptor
app.use((err, req, res, next) => {
    logError(err);
    res.status(500).json(err.message);
});


// 404 interceptor
app.get('**', (req, res) => res.sendStatus(404));


// Start server
app.listen(process.env.PORT)
    .then(logSuccess(`server started on port ${process.env.PORT}`))
    .catch(logError);