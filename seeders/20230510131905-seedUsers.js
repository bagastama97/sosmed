"use strict";
const fs = require("fs");
const users = JSON.parse(fs.readFileSync("./users.json")).map((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", users);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", users);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
