# Ordnas Store API

API REST desenvolvida com Node.js, Express, MySQL e Sequelize para o gerenciamento de produtos e usuários da loja virtual Ordnas Store.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- Sequelize
- JWT (autenticação)
- Bcrypt (criptografia de senhas)
- Swagger (documentação)
- Jest (testes automatizados)

## Funcionalidades

- Cadastro, consulta, atualização e exclusão de produtos.
- Cadastro de usuários.
- Login com email e senha.
- Senhas armazenadas com criptografia.
- Autenticação com token JWT.
- Documentação das rotas com Swagger.
- Testes automatizados com Jest.
- Migrations e Seeders para gerenciamento e inserção de dados.

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd ordnas-store-api
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DB_NAME=ordnas_store
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_HOST=localhost
DB_DIALECT=mysql
JWT_SECRET=sua_chave_secreta
```

Configure os dados de acesso ao seu MySQL.

### 4. Criar o banco de dados

No MySQL, execute:

```sql
CREATE DATABASE ordnas_store;
```

### 5. Executar as migrations e seeders

```bash
npx sequelize-cli db:migrate
```

```bash
npx sequelize-cli db:seed:all
```

### 6. Iniciar o servidor

Modo desenvolvimento:

```bash
npm run dev
```

O servidor será iniciado em:

`http://localhost:3000`

## Documentação da API

A documentação interativa está disponível em:

`http://localhost:3000/api-docs`

## Rotas disponíveis

### Produtos

| Método | Rota | Funcionalidade |
|---|---|---|
| GET | `/produtos` | Listar produtos |
| GET | `/produtos/:id` | Buscar produto por ID |
| POST | `/produtos` | Cadastrar produto |
| PUT | `/produtos/:id` | Atualizar produto |
| DELETE | `/produtos/:id` | Excluir produto |

As operações de cadastro, atualização e exclusão exigem autenticação JWT.

### Usuários

| Método | Rota | Funcionalidade |
|---|---|---|
| POST | `/usuarios` | Cadastrar usuário |
| POST | `/usuarios/login` | Realizar login |

## Testes automatizados

Para executar os testes:

```bash
npm test
```

## Autor

Desenvolvido por Sandro Albuquerque.

Projeto desenvolvido como atividade prática do curso de Desenvolvedor Full Stack.