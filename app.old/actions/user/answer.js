const { User, Answer } = require.main.require('./models');
const faker = require('faker');


module.exports.create = async ({ answers }) => {
    const user = await User.create({
        email: faker.random.uuid(),
        visited: new Date(),
        answers
    });
};