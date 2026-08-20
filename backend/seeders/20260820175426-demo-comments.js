'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        text: 'Ого, наконец-то первая статья!',
        articleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Я думал, что сервис мертв...',
        articleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Хах, тут действительно больше текста!',
        articleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
