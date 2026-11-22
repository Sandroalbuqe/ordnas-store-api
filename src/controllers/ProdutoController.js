
const Produto = require("../models/Produto");

/* Listar todos os produtos */
exports.listar = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar produtos." });
    }
};

/* Buscar produto por ID */
exports.buscarPorId = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        res.status(200).json(produto);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar produto." });
    }
};

/* Cadastrar produto */
exports.criar = async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        res.status(201).json(produto);
    } catch (erro) {
        console.error('ERRO AO CADASTRAR:', erro);

        res.status(400).json({
            erro: 'Erro ao cadastrar produto.',
            detalhe: erro.message
        });
    }
};

/* Atualizar produto */
exports.atualizar = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        await produto.update(req.body);
        res.status(200).json(produto);
    } catch (erro) {
        res.status(400).json({ erro: "Erro ao atualizar produto." });
    }
};

/* Excluir produto */
exports.excluir = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);

        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado." });
        }

        await produto.destroy();
        res.status(200).json({ mensagem: "Produto excluído com sucesso." });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao excluir produto." });
    }
};
