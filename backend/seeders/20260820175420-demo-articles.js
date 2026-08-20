'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Articles', [
      {
        title: 'Тестовая статья: Часть 1',
        text: 'Содержательная часть первой статьи.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Тестовая статья: Часть 2',
        text: 'Содержательная часть второй статьи. Текста тут чуть больше, чем в первой части XD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Другая статья',
        text: '...',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles', null, {});
  }
};
