const Sequelize = require('sequelize');

const config = require.main.require('./config');

module.exports.sequelize = new Sequelize(config.database);

const Admin = require('./admin');
const User = require('./user');
const Category = require('./category');
const Question = require('./question');
const Answer = require('./answer');

Category.hasMany(Question);
Question.belongsTo(Category);

Question.hasMany(Answer);
Answer.belongsTo(Question);

Answer.belongsTo(Question, { as: 'next' });

// Answer.belongsToMany(User, { through: 'useranswers' })

module.exports.Category = Category;
module.exports.Question = Question;
module.exports.Answer = Answer;
module.exports.User = User;
module.exports.Admin = Admin;
