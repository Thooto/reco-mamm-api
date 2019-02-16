const { Category, Question, Answer } = require.main.require('./models');

module.exports.get = async ({ questionId }) => {
    return 'coucou' + questionId;
    // const form = await Category.findAll({
    //     order: ['index'],
    //     include: { model: Question, include: { model: Answer } }
    // });

    // return form.map(category => {
    //     const questions = category.questions.map(question => {
    //         const answers = question.answers.map(answer => answer.get()).sort((a, b) => a.index > b.index);

    //         return { ...question.get(), answers };
    //     }).sort((a, b) => a.index > b.index);

    //     return { ...category.get(), questions };
    // });
};