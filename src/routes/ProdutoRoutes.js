
const express = require("express");
const router = express.Router();

const ProdutoController = require("../controllers/ProdutoController");
const autenticar = require("../middlewares/auth");

// Rotas públicas

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */

router.get("/", ProdutoController.listar);


/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", ProdutoController.buscarPorId);


/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cadastra um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - preco
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               imagem:
 *                 type: string
 *               categoria:
 *                 type: string
 *               estoque:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produto cadastrado
 *       401:
 *         description: Token não informado ou inválido
 */
router.post("/", autenticar, ProdutoController.criar);


/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               preco:
 *                 type: number
 *               imagem:
 *                 type: string
 *               categoria:
 *                 type: string
 *               estoque:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       401:
 *         description: Token não informado ou inválido
 *       404:
 *         description: Produto não encontrado
 */
router.put("/:id", autenticar, ProdutoController.atualizar);


/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Exclui um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto excluído com sucesso
 *       401:
 *         description: Token não informado ou inválido
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:id", autenticar, ProdutoController.excluir);

module.exports = router;
