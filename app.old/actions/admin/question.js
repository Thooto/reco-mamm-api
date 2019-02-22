const { Question, Answer } = require.main.require('./models');

module.exports.create = async ({ question }) => {
    
    return await Question.create(question, {
        include: Answer
    });
};