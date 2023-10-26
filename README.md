<div align="center">
  <img src="https://github.com/JhonesJhonatas/dont-forget-backend/assets/105026951/d57c35a4-e21d-4e97-b3a5-7e9d83614cc1" alt="DontForget Logo" height="100">
</div>

<br>

<hr>

<div align="start">
  <h1>DontForget BackEnd</h1>
</div>

<a href="https://dont-forget-web.vercel.app/">🌐 → Link da aplicação em produção</a>

### 📄 • Sobre

Este repositório contém o backend de uma aplicação de gerenciamento de tarefas.
A aplicação foi desenvolvida com o intuito de criar uma forma simples de gerenciar minhas tarefas diárias de uma forma simples,
separando as tarefas de cada projeto ou cliente utilizando uma interface que facilita o manuseio de todas essas informações.

#### 📁 • O que essa api permite

- Criar seu usuário
- Realizar Login
- Criar, editar ou excluir Projetos/Clientes
- Criar, editar, excluir, concluir Tarefas

### 📄 • Ferramentas

- Nodejs
- Express
- Postgre
- Prisma
- DateFns
- EsLint
- Jwt
- TsyRinge
- Zod

### 📄 • Lista de Rotas
| Rota | Método HTTP |  Função | Requer autenticação | 
| --- | --- | --- | --- |
| /users/create-user | POST | Cria um usuário | Não |
| /users/session | POST | Cria a sessão gerando um token | Não |
| /projects/create-project | POST | Cria um projeto | sim |
| /projects/list-projects | POST | Lista os projetos | sim |
| /projects/edit-project | POST | Edita um projeto | sim |
| /projects/delete-project/:projectId | POST | Exclui um projeto | sim |
| /tasks/create-task | POST | Cria uma tarefa | sim |
| /tasks/conclude-task-by-id | POST | Conclui uma tarefa | sim |
| /tasks/edit-task-by-id | POST | Edita uma tarefa | sim |
| /tasks/list-all-opened-tasks-by-user-id | POST | Lista todas as task em aberto | sim |
| /tasks/list-opened-tasks-by-project-id/:projectId | POST | Lista Tarefas em abert por projeto | sim |
| /tasks/list-concluded-tasks-by-project-id/:projectId | POST | Lista Tarefas concluídas por Projeto | sim |
| /tasks/delete-opened-task-by-id/:taskId | POST | Exclui uma tarefa em aberto | sim |
| /tasks/delete-concluded-task-by-id/:taskId | POST | Exclui uma tarefa concluída | sim |

### 📄 • Como Iniciar o projeto

1 - Clone este repositório na sua máquina
2 - Crie um arquivo .env
  2.1 - PORT=Aqui vai a porta que você quer rodar a aplicação
  2.2 - BASE_URL=Aqui vai o link de conexão com o banco que você criar
3 - Instale as dependências
4 - Rode o comando "npx prisma migrate dev"
5 - Inicie o projeto e faça as requisições
