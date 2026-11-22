
jest.mock("../src/models/Usuario", () => ({
    findOne: jest.fn(),
    create: jest.fn()
}));

jest.mock("bcrypt", () => ({
    hash: jest.fn(),
    compare: jest.fn()
}));

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn()
}));

const Usuario = require("../src/models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsuarioController = require("../src/controllers/UsuarioController");

describe("Testes do UsuarioController", () => {
    let req;
    let res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test("Deve impedir cadastro com dados incompletos", async () => {
        req.body = { nome: "João" };

        await UsuarioController.criar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("Deve impedir cadastro com email já existente", async () => {
        req.body = {
            nome: "João",
            email: "joao@email.com",
            senha: "123456"
        };

        Usuario.findOne.mockResolvedValue({ id: 1 });

        await UsuarioController.criar(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
    });

    test("Deve cadastrar um usuário com sucesso", async () => {
        req.body = {
            nome: "João",
            email: "joao@email.com",
            senha: "123456"
        };

        Usuario.findOne.mockResolvedValue(null);
        bcrypt.hash.mockResolvedValue("senha_criptografada");

        Usuario.create.mockResolvedValue({
            id: 1,
            nome: "João",
            email: "joao@email.com"
        });

        await UsuarioController.criar(req, res);

        expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    test("Deve realizar login com sucesso", async () => {
        req.body = {
            email: "joao@email.com",
            senha: "123456"
        };

        Usuario.findOne.mockResolvedValue({
            id: 1,
            email: "joao@email.com",
            senha: "senha_criptografada"
        });

        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("token_teste");

        await UsuarioController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(jwt.sign).toHaveBeenCalled();
    });

    test("Deve impedir login com senha incorreta", async () => {
        req.body = {
            email: "joao@email.com",
            senha: "senha_errada"
        };

        Usuario.findOne.mockResolvedValue({
            id: 1,
            email: "joao@email.com",
            senha: "senha_criptografada"
        });

        bcrypt.compare.mockResolvedValue(false);

        await UsuarioController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });

    test("Deve impedir login de usuário inexistente", async () => {
        req.body = {
            email: "inexistente@email.com",
            senha: "123456"
        };

        Usuario.findOne.mockResolvedValue(null);

        await UsuarioController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
    });
});
