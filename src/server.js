const express = require('express');
const cors = require("cors")
require("dotenv").config();

const database = require('./config/database');
const ProdutoRoutes = require('./routes/ProdutoRoutes')
const UsuariosRoutes = require('./routes/UsuarioRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./docs/swagger')


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/produtos', ProdutoRoutes)
app.use('/usuarios', UsuariosRoutes)

app.get('/', (req, res) => {
    res.json({
        mensagem: "Bem-Vindo à API da Ordnas Store!"
    });
});

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        await database.authenticate();
        console.log('MySQL conectado com sucesso!')

        await database.sync()
        console.log('Tabelas criadas com sucesso!')

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (erro) {
        console.error('Erro ao conectar ao MySQL:', erro.message);
    }
}

iniciarServidor();