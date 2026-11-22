const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

/* Cadastrar usuário*/

exports.criar = async (req, res) => {
    try {
        const { nome, email, senha} = req.body;

         if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: 'Preencha nome, email e senha.'
            });
    }
    const usuarioExistente = await Usuario.findOne({
        where: { email }
    });

    if (usuarioExistente) {
        return res.status(409).json({
            erro: 'Este email já está cadastrado.'
        });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
        nome,
        email,
        senha: senhaCriptografada
    });

    res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso!',
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    });
} catch (erro) {
    console.error('ERRO AO CADASTRAR USUÁRIO:', erro);
    res.status(500).json({
        erro: 'Erro ao cadastrar usuário.',
        detalhe: erro.message
     })
    }
};

/* Login de usuário */
exports.login= async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                erro: 'Informe email e senha.'
            });
        }

        const usuario = await Usuario.findOne({
            where: {email}
        });

        if (!usuario) {
            return res.status(401).json({
                erro: 'Email ou senha incorretos.'
            });
        }
        
        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                erro: 'Email ou senha incorretos.'
            });
        }

        const token = require('jsonwebtoken').sign(
            {
                id: usuario.id,
                email:usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            token
        });
    } catch (erro) {
        console.error('ERRO AO FAZER LOGIN:', erro);

        return res.status(500).json({
            erro: 'Erro ao realizar login.'
        });
    }
};
