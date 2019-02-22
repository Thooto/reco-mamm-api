const { Category, Question, Answer, User } = require.main.require('./models');

const { orderForm } = require.main.require('./utils');

module.exports.readForm = async () => {
  const form = await Category.findAll({
    order: ['index'],
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

module.login = require('./login');
module.user = require('./user');
module.admin = require('./admin');