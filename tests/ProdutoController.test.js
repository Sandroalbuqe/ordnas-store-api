
jest.mock("../src/models/Produto", () => ({
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn()
}));

const Produto = require("../src/models/Produto");
const ProdutoController = require("../src/controllers/ProdutoController");

describe("Testes do ProdutoController", () => {
    let req;
    let res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: {},
            body: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test("Deve listar todos os produtos", async () => {
        const produtos = [{ id: 1, nome: "Camisa Preta" }];

        Produto.findAll.mockResolvedValue(produtos);

        await ProdutoController.listar(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(produtos);
    });

    test("Deve buscar um produto pelo ID", async () => {
        const produto = { id: 1, nome: "Camisa Preta" };

        req.params.id = "1";
        Produto.findByPk.mockResolvedValue(produto);

        await ProdutoController.buscarPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(produto);
    });

    test("Deve retornar 404 quando o produto não existir", async () => {
        req.params.id = "99";
        Produto.findByPk.mockResolvedValue(null);

        await ProdutoController.buscarPorId(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
    });

    test("Deve cadastrar um produto", async () => {
        const dados = { nome: "Camisa Preta", preco: 50 };
        const produto = { id: 1, ...dados };

        req.body = dados;
        Produto.create.mockResolvedValue(produto);

        await ProdutoController.criar(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(produto);
    });

    test("Deve atualizar um produto", async () => {
        const produto = {
            id: 1,
            update: jest.fn().mockResolvedValue(true)
        };

        req.params.id = "1";
        req.body = { preco: 60 };

        Produto.findByPk.mockResolvedValue(produto);

        await ProdutoController.atualizar(req, res);

        expect(produto.update).toHaveBeenCalledWith({ preco: 60 });
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Deve excluir um produto", async () => {
        const produto = {
            id: 1,
            destroy: jest.fn().mockResolvedValue(true)
        };

        req.params.id = "1";
        Produto.findByPk.mockResolvedValue(produto);

        await ProdutoController.excluir(req, res);

        expect(produto.destroy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
