module.exports = async () => {
    const { Answer, Question, Category, Admin } = require.main.require('./app.old/models');
    const faker = require('faker');




    await Admin.create({
        email: "freyal@gmail.com",
        password: "fabienreyal"
    });

    let categoryIndex = 0;

    const categories = new Array(6).fill().map(() => {
        let questionIndex = 0;

        return {
            index: categoryIndex++,
            name: faker.lorem.sentence(),
            questions: new Array(6).fill().map(() => {
                let answerIndex = 0;

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