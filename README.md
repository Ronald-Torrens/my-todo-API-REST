# 🛍️ My TO-DO API REST

Backend authentication API built with Node.js, Express and Sequelize.

## 📋 Features

- JWT Authentication
- Password recovery via email
- Role-based access control
- Secure password hashing with bcrypt
- Nodemailer email notifications

## 🚀 Tech Stack

- Node.js
- Express
- Sequelize
- PostgreSQL
- JWT
- Nodemailer
- Docker

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/Ronald-Torrens/my-todo-API-REST.git
cd my-todo-API-REST
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm run dev
```

4. The server will run on:

```bash
http://localhost:3000
```

## Environment Variables

Create a `.env` file:

```bash
JWT_SECRET=
SMTP_HOST=
SMTP_USER=
SMTP_PASSWORD=
```
## 📦 API Endpoints

- Tasks:
```http
GET /task — Listar todos los tasks.
GET /task/:id — Obtener task específico.
POST /task — Crear un nuevo task.
PATCH /task/:id — Actualizar task.
DELETE /task/:id — Eliminar task.
DELETE /task/ — Eliminar todos task.
```
- Authentication:
```http
POST /auth/login — Iniciar sesión.
POST /auth/refresh — Refrescar tokens.
POST /auth/recovery — Solicitar recuperación de contraseña.
POST /auth/change-password — Cambiar contraseña con token de recuperación.
POST /auth/logout — Cerrar sesión y eliminar refresh token.
```
