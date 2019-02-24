const { Answer, Question, Category, Admin, User } = require.main.require('./models');

module.exports = async () => {
    const faker = require('faker');

    await User.create({
        email: 'qlanta@gmail.com'
    });

    await Admin.create({
        email: "fabien@gmail.com",
        password: "fabien"
    });

    let categoryIndex = 0;

    const categories = new Array(2).fill().map(() => {
        let questionIndex = 0;

        return {
            index: categoryIndex++,
            name: faker.lorem.sentence(),
            questions: new Array(2).fill().map(() => {
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