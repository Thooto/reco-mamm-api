const { Category, Question, Answer } = require.main.require('./models');

const get2 = async () => {
    console.time('get2');

    const form = await Category.findAll({
        include: {
            model: Question,
            include: Answer
        }
    });

    console.timeEnd('get2');

    for (const category of form) {
        console.log('Category');
        console.log(category.get());
        for (const question of category.questions) {
            console.log('  Question');
            console.log(question.get());
            for (const answer of question.answers) {
                console.log('    Answer');
                console.log(answer.get());
            }
        }
    }
};

get2();

module.exports.get = async () => {
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