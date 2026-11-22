const { DataTypes } = require('sequelize');
const database = require('../config/database')

const Produto = database.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    },

    categoria: {
        type: DataTypes.STRING,
        allowNull: true
    },

    estoque: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Produto;