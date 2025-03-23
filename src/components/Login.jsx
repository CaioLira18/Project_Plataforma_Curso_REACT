import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import Profile from "./Profile";

// URL da API para o Railway
const API_URL = "https://testserver-production-eca2.up.railway.app/";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    authenticated: false,
  });

  const handleClickRegister = async (values) => {
    try {
      const response = await Axios.post(`${API_URL}/register`, values);
      alert(response.data.msg);
      if (response.data.success) {
        document.getElementById("register-form").style.display = "none";
      }
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao registrar usuário: " + (error.response?.data?.msg || error.message));
    }
  };

  const handleClickLogin = async (values) => {
    try {
      const response = await Axios.post(`${API_URL}/login`, values);
      if (response.data.success) {
        const loggedUser = { email: values.email, authenticated: true };
        localStorage.setItem("user", JSON.stringify(loggedUser));
        setUser(loggedUser);
        alert(response.data.msg);
      } else {
        alert(response.data.msg || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login: " + (error.response?.data?.msg || error.message));
    }
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

        <Formik initialValues={{ email: "", password: "" }} onSubmit={handleClickLogin} validationSchema={validationLogin}>
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

            <button className="login-button" type="submit">ENTRAR</button>
          </Form>
        </Formik>

        <div className="register-link">
          <button className="register-button" onClick={() => document.getElementById("register-form").style.display = "block"}>REGISTRAR</button>
        </div>

        <div id="register-form" style={{ display: "none" }}>
          <h2>Registrar</h2>
          <Formik initialValues={{ email: "", password: "", confirmPassword: "" }} onSubmit={handleClickRegister} validationSchema={validationRegister}>
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

              <button className="login-button" type="submit">REGISTRAR</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;