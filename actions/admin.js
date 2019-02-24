const { Category, Question, Answer } = require.main.require('./models');
const { Op } = require('sequelize');

module.exports.category = {
  async create({ category }) {
    category.index = await Category.count();

    return await Category.create(category);
  },

  async rename({ category }) {
    await Category.update({ name: category.name }, { where: { id: category.id } });
  },

  async move({ index, direction }) {
    const category = await Category.findOne({ where: { index } });

    const count = await Category.count();

    if (direction == "down") {
      if (index < count - 1) {
        const nextCategory = await Category.findOne({ where: { index: index + 1 } });

        nextCategory.set('index', index);
        category.set('index', index + 1);

        await nextCategory.save();
        await category.save();
      }
    } else {
      if (index > 0) {
        const previousCategory = await Category.findOne({ where: { index: index - 1 } });

        previousCategory.set('index', index);
        category.set('index', index - 1);

        await previousCategory.save();
        await category.save();
      }
    }
  },

  async destroy({ index }) {
    await Category.destroy({ where: { index } });

    const categories = await Category.findAll({ where: { index: { [Op.gt]: index } } });

    for (const category of categories) {
      category.set('index', category.get('index') - 1);
      await category.save();
    }
  }
};

module.exports.question = {
  async create({ question }) {
    question.index = await Question.count({ where: { categoryId: question.categoryId } });

    return await Question.create(question);
  },

  async rename({ question }) {
    await Question.update({ name: question.name }, { where: { id: question.id } });
  },

  async move({ index, direction, categoryId }) {
    const question = await Question.findOne({ where: { index, categoryId } });

    const count = await Question.count();

    if (direction == "down") {
      if (index < count - 1) {
        const nextQuestion = await Question.findOne({ where: { categoryId, index: index + 1 } });

        nextQuestion.set('index', index);
        question.set('index', index + 1);

        await nextQuestion.save();
        await question.save();
      }
    } else {
      if (index > 0) {
        const previousQuestion = await Question.findOne({ where: { categoryId, index: index - 1 } });

        previousQuestion.set('index', index);
        question.set('index', index - 1);

        await previousQuestion.save();
        await question.save();
      }
    }
  },

  async destroy({ index, categoryId }) {
    await Question.destroy({ where: { index, categoryId } });

    const questions = await Question.findAll({ where: { categoryId, index: { [Op.gt]: index } } });

    for (const question of questions) {
      question.set('index', question.get('index') - 1);
      await question.save();
    }
  }
};

module.exports.answer = {
  async create({ answer }) {
    answer.index = await Answer.count({ where: { questionId: answer.questionId } });

    return await Answer.create(answer);
  },

  async rename({ answer }) {
    await Answer.update({ name: answer.name, explanation: answer.explanation, nextId: answer.nextId }, { where: { id: answer.id } });
  },

  async move({ index, direction, questionId }) {
    const answer = await Answer.findOne({ where: { index, questionId } });

    const count = await Answer.count();

    if (direction == "down") {
      if (index < count - 1) {
        const nextAnswer = await Answer.findOne({ where: { questionId, index: index + 1 } });

        nextAnswer.set('index', index);
        answer.set('index', index + 1);

        await nextAnswer.save();
        await answer.save();
      }
    } else {
      if (index > 0) {
        const previousAnswer = await Answer.findOne({ where: { questionId, index: index - 1 } });

        previousAnswer.set('index', index);
        answer.set('index', index - 1);

        await previousAnswer.save();
        await answer.save();
      }
    }
  },

  async destroy({ index, questionId }) {
    await Answer.destroy({ where: { index, questionId } });

    const answers = await Answer.findAll({ where: { questionId, index: { [Op.gt]: index } } });

    for (const answer of answers) {
      answer.set('index', answer.get('index') - 1);
      await answer.save();
    }
  }
};