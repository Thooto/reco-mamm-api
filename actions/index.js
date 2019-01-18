// Dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
jwt.sign = require('util').promisify(jwt.sign);

const { Category, Question, Answer, Admin } = require.main.require('./models');
const { config } = require.main.require('./settings');


// Authentication functions
module.exports.authenticate = {
    async register(body) {
        return await Admin.create({
            username: body.username,
            password: body.password
        });
    },

    async login(body) {
        const admin = await Admin.findOne({ where: { username: body.username } });

        if (!admin) throw Error('Admin not found');

        const matches = await bcrypt.compare(body.password, admin.password);

        if (!matches) throw Error('Wrong password');

        return await jwt.sign({ username: admin.username }, config.app.secret, { expiresIn: '1h' });
    }
};


// Category CRUD
module.exports.categories = {
    async create(body) {
        return await Category.create({
            name: body.name
        });
    },

    async read(query) {
        if (query.name) return await Category.findOne({
            where: { name: query.name }
        });
        return await Category.findAll();
    },

    async update(body) {
        return await Category.update({
            // TODO
        });
    },

    async delete(body) {
        return await Category.delete({
            where: { name: body.name }
        });
    }
}


// Questions CRUD
module.exports.questions = {
    async create(body) {
        return await Question.create({
            name: body.name,
            categoryId: body.categoryId
        });
    },

    async read(query) {
        if (query.categoryId) return await Question.findAll({
            where: { categoryId: query.categoryId }
        });

        return await Question.findOne({
            where: { name: query.name }
        });
    },

    async update(body) {
        return await Question.update({
            // TODO
        });
    },

    async delete(body) {
        return await Question.delete({
            where: { name: body.name }
        });
    }
};


// Answers CRUD
module.exports.answers = {
    async create(body) {
        return await Answer.create({
            name: body.name,
            questionId: body.questionId
        });
    },

    async read(query) {
        if (query.questionId) return await Answer.findAll({
            where: { questionId: query.questionId }
        });

        return await Answer.findOne({
            where: { name: query.name }
        });
    },

    async update(body) {
        return await Answer.update({
            // TODO
        });
    },

    async delete(body) {
        return await Answer.delete({
            where: { name: body.name }
        });
    }
}

/*

module.exports.sendGreetings = async () => 'Welcome to Expercancer API!';

module.exports.admin = require('./admin');
module.exports.user = require('./user');

// IN SOME ACTION FILE

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require.main.require('./settings');

const { User } = require.main.require('./models');

module.exports = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) throw Error('User not found');

    const matches = await bcrypt.compare(password, user.password);

    if (!matches) throw Error('Wrong password');

    return await jwt.sign({ userId: user._id }, config.secret, { expiresIn: config.userExpirationTime });
};

*/