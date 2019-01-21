const { Category, Question, Answer } = require.main.require('./models');

const get = async () => {
    let categories = await Category.findAll();

    categories = categories.map(({ dataValues }) => ({
        id: dataValues.id,
        name: dataValues.name
    }));

    for (let category of categories) {
        const questions = await Question.findAll({ where: { categoryId: category.id } });

        category.questions = questions.map(({ dataValues }) => ({
            id: dataValues.id,
            name: dataValues.name,
            categoryId: dataValues.categoryId
        }));

        for (let question of category.questions) {
            const answers = await Answer.findAll({ where: { questionId: question.id } });

            question.answers = answers.map(({ dataValues }) => ({
                id: dataValues.id,
                name: dataValues.name,
                code: dataValues.code,
                next: dataValues.next
            }));
        }
    }

    // console.log(require('util').inspect(categories, false, null, true));

    return categories;
};

get();

module.exports = get;