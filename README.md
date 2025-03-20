# 🏫 Course Purchase Platform  

Welcome to the **Course Purchase Platform** repository, a modern system for acquiring online courses. Developed with **React.js on the frontend and Node.js with Express on the backend**, this project provides an intuitive experience for user registration, cart management, and tracking purchased courses.  

## ✨ Technologies Used  

- **React.js** - Framework for an interactive interface  
- **Node.js** - Platform for backend development  
- **Express.js** - Framework for building APIs  
- **MySQL** - Database for information storage  
- **Bcrypt** - Password encryption for security  

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="MySQL" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="Express" width="40" height="40"/>  

## 🔧 Features  

- 📚 Course catalog with an option to add to the cart (Implemented)  
- 🛒 Cart management (adding and removing courses)  (Implemented)
- 👤 Secure authentication with user login and registration**  (implemented)
- 🔐 Password encryption using Bcrypt  (implemented)
- 🗂 MySQL integration for data storage  (Implemented)
- 📖 User profile page displaying purchased courses (Implemented)
- 📱 Responsive design for all devices  (Soon)

## 🛠 Installation and Execution  

To run the project locally, follow these steps:  

1. Clone this repository:  
   ```sh
   https://github.com/CaioLira18/Project_Plataforma_Curso_REACT.git
   ```  
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Start the server:  
   ```sh
   npm start
   ```  

## 🗂️ Project Structure  

```
frontend/
  ├── src/
  │   ├── components/    # Reusable components
  │   ├── pages/         # Application pages
  │   ├── services/      # Services and integrations
  │   ├── styles/        # Styling files
  │   ├── utils/         # Utility functions
  │   └── App.js         # Main component
  ├── public/           # Static files
  ├── package.json      # React project configuration
  └── .env              # Environment settings

backend/
  ├── src/
  │   ├── config/        # Server configuration
  │   ├── controllers/   # Request handlers
  │   ├── models/        # Database models
  │   ├── routes/        # API endpoints
  │   ├── middlewares/   # Authentication and security middlewares
  │   ├── database/      # Database configuration
  │   └── server.js      # Main server file
  ├── package.json      # Backend configuration
  ├── .env              # Environment settings
  ├── migrations/       # Database migration files
  └── seeders/          # Initial database data
```  

## 🔐 Authentication System  

The system implements a secure authentication method:  

- **Registration**: Users can create an account with email and password (Implemented)
- **Login**: Users can login an your account (implemented)
- **Password Encryption**: All passwords are securely stored using Bcrypt (Implemented)
- **User Profile**: Displays purchased courses  (Soon)

## © License  

This project is licensed under the MIT License. See the `LICENSE` file for more details.  

---
