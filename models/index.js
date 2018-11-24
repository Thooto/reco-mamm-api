// Database ORM dependencies
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');


// Import config file
const config = require.main.require('./config');


// Init database link
const sequelize = new Sequelize({ ...config.db, logging: false });


// Setup database models
const Admin = sequelize.define('admin', {
    username: { type: Sequelize.STRING, unique: true },
    password: Sequelize.STRING
});

// Hash the password before creating
Admin.beforeCreate(async (admin) => {
    const hash = await bcrypt.hash(admin.password, config.app.saltRounds);
    admin.password = hash;
});

const User = sequelize.define('user', {
    email: { type: Sequelize.STRING, unique: true }
});

const Category = sequelize.define('category', {
    name: { type: Sequelize.STRING, unique: true }
});

const Question = sequelize.define('question', {
    name: { type: Sequelize.STRING, unique: true }
});

const Answer = sequelize.define('answer', {
    name: Sequelize.STRING,
    code: Sequelize.STRING,
    next: Sequelize.STRING
});


// Define relations between tables
Category.hasMany(Question);
Question.hasMany(Answer);


// Define user answers
Answer.belongsToMany(User, { through: 'usersanswers' });


// Export models
module.exports.sequelize = sequelize;
module.exports.Category = Category;
module.exports.Question = Question;
module.exports.Answer = Answer;
module.exports.User = User;
module.exports.Admin = Admin;

