const Sequelize = require('sequelize');

const { Category } = require.main.require('./models');

const { Op } = require('sequelize');

module.exports.create = async ({ category }) => {
    const index = await Category.max('index');

    category.index = index + 1;

    category = await Category.create(category);

    return category.get();
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

module.exports.update = async ({ category }) => {
    await Category.update({ name: category.name }, { where: { id: category.id } });
};

module.exports.order = async ({ id, orientation }) => {

    const category = await Category.findOne({ where: { id } });

    const count = await Category.count();

    if (orientation == "down") {
        if (category.get('index') < count - 1) {

            const nextCategory = await Category.findOne({ where: { index: category.get('index') + 1 } });

            nextCategory.set('index', category.get('index'));

            category.set('index', category.get('index') + 1);

            await nextCategory.save();
            await category.save();

        }
    } else {
        if (category.get('index') > 0) {

            const previousCategory = await Category.findOne({ where: { index: category.get('index') - 1 } });

            previousCategory.set('index', category.get('index'));

            category.set('index', category.get('index') - 1);

            await previousCategory.save();
            await category.save();
        }
    }
};

// module.exports.update = async ({ index, name, newIndex, newName }) => {
//     if (index || name) {
//         const category = await Category.findOne({
//             where: {
//                 [Op.or]: [{ index }, { name }]
//             }
//         });

//         await category.update({
//             index: newIndex || category.index,
//             name: newName || category.name
//         });
//     }
// };

module.exports.delete = async ({ index }) => {
    await Category.destroy({ where: { index } });

    const categories = await Category.findAll({ where: { index: { [Op.gt]: index } }});

    for (const category of categories) {
        category.set('index', category.get('index') - 1);
        await category.save();
    }
};