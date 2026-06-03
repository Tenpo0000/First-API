# First-API — Sistema de Biblioteca
 
API RESTful completa para gerenciamento de uma biblioteca, construída com **NestJS**, **TypeScript**, **Prisma ORM** e **MongoDB**.
 
---
 
## Tecnologias
 
- [NestJS](https://nestjs.com/) — framework Node.js 
- [TypeScript](https://www.typescriptlang.org/) — tipagem
- [Prisma ORM](https://www.prisma.io/) — acesso ao banco de dados
- [MongoDB](https://www.mongodb.com/) — banco de dados NoSQL
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — formatação de código
---
 
## Funcionalidades
 
- Cadastro, listagem, edição e remoção de **livros**
- Gerenciamento de **usuários** com controle de acesso por roles (`ADMIN` / `MEMBRO`)
- Cadastro de **autores** com bio, nacionalidade e e-mail
- Cadastro de **editoras** com CNPJ, cidade, país e site
- Organização de livros por **categorias**
- Controle de **empréstimos** com status (`ATIVO`, `DEVOLVIDO`, `ATRASADO`)
- Sistema de **reservas** com status (`PENDENTE`, `CONFIRMADO`, `CANCELADA`)
- **Favoritos** — cada usuário pode favoritar livros sem duplicatas
- **Histórico** de ações dos usuários (empréstimo, devolução, reserva, cancelamento)
---
 
## Modelo de Dados
 
```
Books          --- Categoria  (N:N)
Books          --- Autor      (N:N)
Books          --- Editora    (N:1)
Books          --- Emprestimo (1:N)
Books          --- Reserva    (1:N)
Books          --- Favoritos  (1:N)
Books          --- Historico  (1:N)
Usuario        --- Emprestimo (1:N)
Usuario        --- Reserva    (1:N)
Usuario        --- Favoritos  (1:N)
Usuario        --- Historico  (1:N)
```
 
---
 
## Pré-requisitos
 
- [Node.js](https://nodejs.org/) v16+
- [npm](https://www.npmjs.com/)
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas) ou instância local do MongoDB
---
 
## Instalação
 
```bash
# 1. Clone o repositório
git clone https://github.com/Tenpo0000/First-API.git
cd First-API
 
# 2. Instale as dependências
npm install
 
# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com sua connection string do MongoDB
 
# 4. Gere o Prisma Client
npx prisma generate
 
# 5. Inicie o servidor
npm run start:dev
```
 
---
 
## Variáveis de Ambiente
 
Crie um arquivo `.env` na raiz do projeto com:
 
```env
DATABASE_URL="mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<banco>?retryWrites=true&w=majority"
```
 
---
 
## Scripts disponíveis
 
```bash
# Desenvolvimento (hot reload)
npm run start:dev
 
# Produção
npm run start:prod
 
# Build
npm run build
 
# Testes unitários
npm run test
 
# Testes e2e
npm run test:e2e
 
# Cobertura de testes
npm run test:cov
 
# Lint
npm run lint
```
 
---
 
## Endpoints
 
### Livros `/books`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/books` | Lista todos os livros |
| GET | `/books/:id` | Busca livro por ID |
| POST | `/books` | Cria um novo livro |
| PATCH | `/books/:id` | Atualiza um livro |
| DELETE | `/books/:id` | Remove um livro |
 
### Usuários `/users`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/users` | Lista todos os usuários |
| GET | `/users/:id` | Busca usuário por ID |
| POST | `/users` | Cria um novo usuário |
| PATCH | `/users/:id` | Atualiza um usuário |
| DELETE | `/users/:id` | Remove um usuário |
 
### Autores `/autores`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/autores` | Lista todos os autores |
| POST | `/autores` | Cria um novo autor |
| PATCH | `/autores/:id` | Atualiza um autor |
| DELETE | `/autores/:id` | Remove um autor |
 
### Editoras `/editoras`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/editoras` | Lista todas as editoras |
| POST | `/editoras` | Cria uma nova editora |
| PATCH | `/editoras/:id` | Atualiza uma editora |
| DELETE | `/editoras/:id` | Remove uma editora |
 
### Categorias `/categorias`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/categorias` | Lista todas as categorias |
| POST | `/categorias` | Cria uma nova categoria |
| PATCH | `/categorias/:id` | Atualiza uma categoria |
| DELETE | `/categorias/:id` | Remove uma categoria |
 
### Empréstimos `/emprestimos`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/emprestimos` | Lista todos os empréstimos |
| GET | `/emprestimos/:id` | Busca empréstimo por ID |
| POST | `/emprestimos` | Registra novo empréstimo |
| PATCH | `/emprestimos/:id` | Atualiza status do empréstimo |
 
### Reservas `/reservas`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/reservas` | Lista todas as reservas |
| POST | `/reservas` | Cria uma nova reserva |
| PATCH | `/reservas/:id` | Atualiza status da reserva |
| DELETE | `/reservas/:id` | Cancela uma reserva |
 
### Favoritos `/favoritos`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/favoritos/usuario/:id` | Lista favoritos de um usuário |
| POST | `/favoritos` | Adiciona livro aos favoritos |
| DELETE | `/favoritos/:id` | Remove dos favoritos |
 
### Histórico `/historico`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/historico/usuario/:id` | Histórico de ações de um usuário |
 
---
 
## Autor
 
**Laerte Dutra da Silva**
 
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/laerte-dutra-da-silva-e-silva-7419813a0/)
[![Instagram](https://img.shields.io/badge/-Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/laerte_dutra/)
[![Gmail](https://img.shields.io/badge/-Gmail-333?style=flat&logo=gmail&logoColor=white)](mailto:laertelai12@gmail.com)
 
---
 
> **Nota:** Os endpoints listados são baseados na estrutura do schema do banco de dados. Ajuste conforme a implementação real dos controllers.

Projeto ainda em construção 
