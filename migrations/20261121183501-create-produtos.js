
"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        const tabelas = await queryInterface.showAllTables();

        if (!tabelas.includes("produtos")) {
            await queryInterface.createTable("produtos", {
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
                descricao: {
                    type: Sequelize.TEXT
                },
                preco: {
                    type: Sequelize.DECIMAL(10, 2),
                    allowNull: false
                },
                imagem: {
                    type: Sequelize.STRING
                },
                categoria: {
                    type: Sequelize.STRING
                },
                estoque: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0
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
