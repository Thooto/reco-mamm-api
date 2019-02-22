const { Category } = require.main.require('./models');

const { Op } = require('sequelize');

module.exports.get = async ({ index, name }) => {
    const params = index || name ? {
        where: {
            [Op.or]: [{ index }, { name }]
        }
    } : {};

    const categories = await Category.findAll(params);

    return categories;
};