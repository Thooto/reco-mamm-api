const { Category, Question, Answer } = require.main.require('./models');

module.exports.get = async () => {
    const form = await Category.findAll({
        include: { model: Question, include: Answer }
    });

    return form.map(category => {
        const questions = category.questions.map(question => {
            const answers = question.answers.map(answer => answer.get());

            return { ...question.get(), answers };
        });

        return { ...category.get(), questions };
    });
};