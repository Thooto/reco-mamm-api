const Sequelize = require('sequelize');

const { config } = require.main.require('./settings');

module.exports.sequelize = new Sequelize(config.database);

const Admin = require('./admin');
const User = require('./user');
const Category = require('./category');
const Question = require('./question');
const Answer = require('./answer');

Category.hasMany(Question);
Question.hasMany(Answer);

Answer.belongsToMany(User, { through: 'useranswers' });

module.exports.Category = Category;
module.exports.Question = Question;
module.exports.Answer = Answer;
module.exports.User = User;
module.exports.Admin = Admin;
