import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import Profile from "./Profile";

const Login = () => {
  // Estado para armazenar os dados do usuário atual
  const [user, setUser] = useState({
    email: "",
    password: "",
    authenticated: false
  });

  const handleClickRegister = (values) => {
    Axios.post("http://localhost:34645/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
    }).catch((error) => {
      console.error("Erro ao registrar:", error);
      alert("Erro ao registrar usuário");
    });
  };

  // Adicione este código dentro da função handleClickLogin no componente Login
const handleClickLogin = (values) => {
  Axios.post("http://localhost:34645/login", {
    email: values.email,
    password: values.password,
  }).then((response) => {
    // Verificar a resposta do servidor
    console.log("Resposta do servidor:", response);
    
    // Se o login for bem-sucedido
    if (response.data.success || response.status === 200) {
      // IMPORTANTE: armazenar corretamente no localStorage
      const userData = {
        email: values.email,
        authenticated: true
      };
      
      console.log("Salvando usuário no localStorage:", userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      // ADICIONE ESTE CÓDIGO para forçar o Header a atualizar
      window.dispatchEvent(new Event('storage'));
      
      // Atualizar o estado do usuário
      setUser({
        email: values.email,
        password: values.password,
        authenticated: true
      });
      
      alert("Login realizado com sucesso!");
      
      // Opcionalmente, redirecione para a página inicial
      // window.location.href = "/";
    } else {
      alert(response.data.msg || "Credenciais inválidas");
    }
  }).catch((error) => {
    console.error("Erro ao fazer login:", error);
    alert("Erro ao fazer login");
  });
};

  

  // Verificar se já existe um usuário logado no localStorage ao carregar o componente
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        ...parsedUser,
        password: "" // Não armazenamos a senha no localStorage
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

  // Renderizar o perfil do usuário se estiver autenticado
  if (user.authenticated) {
    return (
     <Profile/>
    );
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
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button className="login-button" type="submit">LOGIN</button>
          </Form>
        </Formik>

        <div className="register-link">
          <button className="register-button" onClick={() => document.getElementById('register-form').style.display = 'block'}>REGISTER</button>
        </div>

        <div id="register-form" style={{ display: 'none' }}>
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

              <button className="login-button" type="submit">REGISTER</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;