'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Dogs',
      [
        {
          name: 'Perro Aguayo',
          age: 4,
          enjoys: "Enjoys long walks from window to food bowl.  Its a tough job out there for a dog.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Felix',
          age: 12,
          enjoys: "Enjoys destroying things. I'm built for chaos, and I know it.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'The Gov.',
          age: 15,
          enjoys: "I enjoy being in charge, neigh,  I demand to be in charge. Whatever the situation, whoever is involved, I'm the boss.  We clear?",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Uers', null, {})
  }
}
