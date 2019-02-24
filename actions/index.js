const { Category, Question, Answer, User } = require.main.require('./models');

const { orderForm } = require.main.require('./utils');

module.exports.readForm = async () => {
  const form = await Category.findAll({
    include: { model: Question, include: { model: Answer } }
  });

  return orderForm(form);
};

module.exports.createAnswers = async ({ email, answers }) => {
  return await User.create({
    email,
    answers
  });
};

module.exports.login = require('./login');
module.exports.user = require('./user');
module.exports.admin = require('./admin');