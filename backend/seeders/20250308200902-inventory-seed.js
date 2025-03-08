'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('inventory', [
        
        { category: 'food', food_type: 'dog', food_form: 'dry', item_name: null, quantity: 2, unit: 'kg', last_updated: new Date(), createdAt: new Date() },
        { category: 'food', food_type: 'dog', food_form: 'wet', item_name: null, quantity: 100, unit: 'can', last_updated: new Date(), createdAt: new Date() },
        { category: 'food', food_type: 'cat', food_form: 'dry', item_name: null, quantity: 10, unit: 'kg', last_updated: new Date(), createdAt: new Date() },
        { category: 'food', food_type: 'cat', food_form: 'wet', item_name: null, quantity: 120, unit: 'can', last_updated: new Date(), createdAt: new Date() },

       
        { category: 'miscellaneous', food_type: null, food_form: null, item_name: 'toy', quantity: 10, unit: 'piece', last_updated: new Date(), createdAt: new Date() },
        { category: 'miscellaneous', food_type: null, food_form: null, item_name: 'collar', quantity: 100, unit: 'piece', last_updated: new Date(), createdAt: new Date() },
    ]);
},

down: async (queryInterface) => {
    return queryInterface.bulkDelete('inventory', null, {});
}
};
