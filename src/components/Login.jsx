import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import Profile from "./Profile";

// URL do backend no Railway
const API_URL = "https://projectplataformacursoreact-production.up.railway.app/";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    authenticated: false,
  });

  const handleClickRegister = (values) => {
    Axios.post(`${API_URL}/register`, {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        alert(response.data.msg);
      })
      .catch((error) => {
        console.error("Erro ao registrar:", error);
        alert("Erro ao registrar usuário");
      });
  };

  const handleClickLogin = (values) => {
    Axios.post(`${API_URL}/login`, {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        console.log("Resposta do servidor:", response);

        if (response.data.success) {
          const userData = {
            email: values.email,
            authenticated: true,
          };

          console.log("Salvando usuário no localStorage:", userData);
          localStorage.setItem("user", JSON.stringify(userData));

          window.dispatchEvent(new Event("storage"));

          setUser({
            email: values.email,
            password: values.password,
            authenticated: true,
          });

          alert("Login realizado com sucesso!");
        } else {
          alert(response.data.msg || "Credenciais inválidas");
        }
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao fazer login");
      });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        ...parsedUser,
        password: "",
      });
    }
  }, []);

  const validationLogin = yup.object().shape({
    email: yup.string().email("Não é um email válido").required("Esse campo é obrigatório"),
    password: yup.string().min(8, "A senha deve conter no mínimo 8 caracteres").required("Esse campo é obrigatório"),
  });

  const validationRegister = yup.object().shape({
    email: yup.string().email("Não é um email válido").required("Esse campo é obrigatório"),
    password: yup.string().min(8, "A senha deve conter no mínimo 8 caracteres").required("Esse campo é obrigatório"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas devem ser iguais").required("Esse campo é obrigatório"),
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

        <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
          <Form className="login-form">
            <div className="login-form-group">
              <i className="fas fa-envelope"></i>
              <Field name="email" className="form-field" placeholder="Email ID" />
              <ErrorMessage component="span" name="email" className="form-error" />
            </div>

            <div className="login-form-group">
              <i className="fas fa-lock"></i>
              <Field type="password" name="password" className="form-field" placeholder="Password" />
              <ErrorMessage component="span" name="password" className="form-error" />
            </div>

            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            <button className="login-button" type="submit">
              LOGIN
            </button>
          </Form>
        </Formik>

        <div className="register-link">
          <button className="register-button" onClick={() => document.getElementById("register-form").style.display = "block"}>
            REGISTER
          </button>
        </div>

        <div id="register-form" style={{ display: "none" }}>
          <h2>Register</h2>
          <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
            <Form className="login-form">
              <div className="login-form-group">
                <i className="fas fa-envelope"></i>
                <Field name="email" className="form-field" placeholder="Email" />
                <ErrorMessage component="span" name="email" className="form-error" />
              </div>

              <div className="login-form-group">
                <i className="fas fa-lock"></i>
                <Field type="password" name="password" className="form-field" placeholder="Password" />
                <ErrorMessage component="span" name="password" className="form-error" />
              </div>

              <div className="login-form-group">
                <i className="fas fa-lock"></i>
                <Field type="password" name="confirmPassword" className="form-field" placeholder="Confirm Password" />
                <ErrorMessage component="span" name="confirmPassword" className="form-error" />
              </div>

              <button className="login-button" type="submit">
                REGISTER
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
