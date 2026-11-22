
"use strict";

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert("produtos", [
            {
                nome: "Tênis de Corrida",
                descricao: "Tênis confortável para corrida",
                preco: 220.00,
                imagem: "tenis-corrida.jpg",
                categoria: "Calçados",
                estoque: 15,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete("produtos", {
            nome: "Tênis de Corrida"
        });
    }
};
