# MERN Integration CRM Application

## Screen Recording: https://drive.google.com/file/d/1aMAsOEzPxBKYY5qCzRcLbWo79TIJ2zrv/view?usp=sharing
This is a full-stack Customer Relationship Management (CRM) application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## Features
- **User Authentication**: Secure registration and login with JWT and password hashing (bcrypt).
- **CRM CRUD Operations**: Create, Read, Update, and Delete customer data.
- **Responsive Design**: Modern and clean UI built with React and Tailwind CSS.
- **Input Validation**: Front-end and back-end validation for all inputs.
- **Protected Routes**: Secure access to CRM data using JWT middleware.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Axios, React Router.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, BcryptJS.
- **Database**: MongoDB (Local or Atlas).

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running locally (or a MongoDB Atlas connection string)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/harlinmartin/mern-integration.git
   cd mern-integration
   ```

2. Setup the Backend:
   ```bash
   cd server
   npm install
   # Create a .env file based on .env.example
   cp .env.example .env
   # Update the MONGO_URI and JWT_SECRET in .env
   npm run dev
   ```

3. Setup the Frontend:
   ```bash
   cd ../client
   npm install
   npm start
   ```

## Folder Structure
```text
project-root/
├── client/          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── vite.config.js
├── server/          # Node.js Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── app.js
└── README.md
```
