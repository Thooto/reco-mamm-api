const { Category } = require.main.require('./models');

const { Op } = require('sequelize');

module.exports.create = async (categories) => {
    await Category.bulkCreate(categories);
};

module.exports.read = async ({ index, name }) => {
    const params = index || name ? {
        where: {
            [Op.or]: [{ index }, { name }]
        }
    } : {};

    const categories = await Category.findAll(params);

    return categories;
};

module.exports.update = async ({ index, name, newIndex, newName }) => {
    if (index || name) {
        const category = await Category.findOne({
            where: {
                [Op.or]: [{ index }, { name }]
            }
        });

        await category.update({
            index: newIndex || category.index,
            name: newName || category.name
        });
    }
};

module.exports.delete = async ({ index, name }) => {
    if (index || name) {
        await Category.delete({
            where: {
                [Op.or]: [{ index }, { name }]
            }
        });
    }
};