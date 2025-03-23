import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import Profile from "./Profile";

// URL da API para o Railway
// Substitua pela URL pública do seu serviço no Railway
const API_URL = import.meta.env.VITE_API_URL || "https://projectplataformacursoreact-production.up.railway.app";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    authenticated: false,
  });

  const handleClickRegister = (values) => {
    console.log("Enviando dados de registro:", values);
    Axios.post(`${API_URL}/register`, {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      console.log("Resposta do servidor (registro):", response.data);
      alert(response.data.msg);
      
      if (response.data.success) {
        document.getElementById('register-form').style.display = 'none';
      }
    })
    .catch((error) => {
      console.error("Erro ao registrar:", error);
      alert("Erro ao registrar usuário: " + (error.response?.data?.msg || error.message));
    });
  };

  const handleClickLogin = (values) => {
    console.log(`Tentando fazer login em: ${API_URL}/login`);
    console.log("Dados enviados:", { email: values.email, password: "***" });
    
    Axios.post(`${API_URL}/login`, {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      console.log("Resposta do servidor (login):", response.data);
      if (response.data.success) {
        const loggedUser = {
          email: values.email,
          authenticated: true
        };
        localStorage.setItem("user", JSON.stringify(loggedUser));
        setUser(loggedUser);
        alert(response.data.msg);
      } else {
        alert(response.data.msg || "Erro ao fazer login");
      }
    })
    .catch((error) => {
      console.error("Erro detalhado:", error);
      console.error("Config da requisição:", error.config);
      alert("Erro ao fazer login: " + (error.response?.data?.msg || error.message));
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const validationLogin = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup.string().min(8, "Mínimo 8 caracteres").required("Campo obrigatório"),
  });

  const validationRegister = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup.string().min(8, "Mínimo 8 caracteres").required("Campo obrigatório"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas devem ser iguais").required("Campo obrigatório"),
  });

  if (user.authenticated) {
    return <Profile />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="user-icon">
          <i className="fas fa-user"></i>
        </div>

        {/* Formulário de Login */}
        <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
          <Form className="login-form">
            <div className="login-form-group">
              <i className="fas fa-envelope"></i>
              <Field name="email" className="form-field" placeholder="Email ID" />
              <ErrorMessage component="span" name="email" className="form-error" />
            </div>

            <div className="login-form-group">
              <i className="fas fa-lock"></i>
              <Field type="password" name="password" className="form-field" placeholder="Senha" />
              <ErrorMessage component="span" name="password" className="form-error" />
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Lembrar-me
              </label>
              <a href="#" className="forgot-link">
                Esqueceu a senha?
              </a>
            </div>

            <button className="login-button" type="submit">
              ENTRAR
            </button>
          </Form>
        </Formik>

        <div className="register-link">
          <button className="register-button" onClick={() => document.getElementById("register-form").style.display = "block"}>
            REGISTRAR
          </button>
        </div>

        {/* Formulário de Registro */}
        <div id="register-form" style={{ display: "none" }}>
          <h2>Registrar</h2>
          <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
            <Form className="login-form">
              <div className="login-form-group">
                <i className="fas fa-envelope"></i>
                <Field name="email" className="form-field" placeholder="Email" />
                <ErrorMessage component="span" name="email" className="form-error" />
              </div>

              <div className="login-form-group">
                <i className="fas fa-lock"></i>
                <Field type="password" name="password" className="form-field" placeholder="Senha" />
                <ErrorMessage component="span" name="password" className="form-error" />
              </div>

              <div className="login-form-group">
                <i className="fas fa-lock"></i>
                <Field type="password" name="confirmPassword" className="form-field" placeholder="Confirmar Senha" />
                <ErrorMessage component="span" name="confirmPassword" className="form-error" />
              </div>

              <button className="login-button" type="submit">
                REGISTRAR
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;