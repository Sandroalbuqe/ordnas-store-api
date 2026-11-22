
"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        const tabelas = await queryInterface.showAllTables();

        const usuariosExiste = tabelas.some(
            tabela => tabela.toLowerCase() === "usuarios"
        );

        if (!usuariosExiste) {
            await queryInterface.createTable("usuarios", {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false
                },
                nome: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true
                },
                senha: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            });
        }
    },

    async down(queryInterface) {
        // Não remove a tabela existente para preservar os dados.
    }
};
