module.exports = async () => {
    const { Answer, Question, Category } = require.main.require('./models');
    const faker = require('faker');

    let categoryIndex = 1;

    const categories = new Array(6).fill().map(() => {
        let questionIndex = 1;

        return {
            index: categoryIndex++,
            name: faker.lorem.sentence(),
            questions: new Array(6).fill().map(() => {
                let answerIndex = 1;

                return {
                    name: faker.lorem.sentence(),
                    index: questionIndex++,
                    answers: new Array(2).fill().map(() => {
                        return {
                            index: answerIndex++,
                            code: faker.random.number(3),
                            name: faker.lorem.sentence(3),
                            explanation : faker.random.number(1) == 1 ? faker.lorem.sentences(3) : null
                        }
                    })
                }
            })
        };
    });


    for (const category of categories) {
        await Category.create(category, { include: { model: Question, include: Answer } });
    }
};