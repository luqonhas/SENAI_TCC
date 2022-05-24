// Libs
import React, { Component } from "react";
import axios from "axios";

// Styles
import "../../assets/styles/reset.css";
import "../../assets/styles/pages/login.css";

// Images
import logo_goodeye_text from '../../assets/images/login-logo-goodeye-text.svg';
import logo_goodeye from '../../assets/images/login-logo-goodeye.svg';
import logo_avanade from '../../assets/images/login-logo-avanade.svg';
import eyeClose from '../../assets/images/login-eye-close.svg';
import eyeOpen from '../../assets/images/login-eye-open.svg';

// Services
import {parseJwt} from '../../services/Auth';



function togglePassword(){
  const eye = document.querySelector('#login-password-eye');
  const password = document.querySelector('#login-password');

  eye.addEventListener('click', function (e) {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('active');
  });
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      mensagem: "",
      isLoading : false
    };
  }



  efetuaLogin = (event) => {
    event.preventDefault();

    this.setState({ mensagem : "", isLoading: true });

    axios
      .post("http://localhost:5000/v1/login/signin", {
        email: this.state.email,
        password: this.state.password,
      })

      .then((resposta) => {
        if (resposta.data.successFailure === true) {
          localStorage.setItem("user-token", resposta.data.data.token);
          
          // this.setState({isLoading : false});

          this.props.history.push("/dashboard/temperature");
        }
        this.setState({
          mensagem : "E-mail ou senha inválidos! Tente novamente.",
          isLoading : false
        })
      })

      .catch(() => {
        this.setState({
            mensagem : "E-mail ou senha inválidos! Tente novamente.",
            isLoading : false
        })
      })
  };

  atualiza = (campo) => {
    this.setState({ [campo.target.name] : campo.target.value });
  };

  componentDidMount(){
    togglePassword();
  }

  render() {
    return (
      <>
        <div className="login-background">
            <div className="login-side">
                <div className="login-side-logos">
                    <div className="login-logo-goodeye-text">
                        <img src={logo_goodeye_text} alt="Logo GoodEye em texto" draggable='false' />
                    </div>
                    <div className="login-logo-goodeye">
                        <img src={logo_goodeye} alt="Logo GoodEye" draggable='false' />
                    </div>
                    <div className="login-logo-avanade">
                        <img src={logo_avanade} alt="Logo Avanade" draggable='false' />
                    </div>
                </div>
            </div>

            <div className="login-form-background">
                <form onSubmit={this.efetuaLogin} className="login-form">
                    <div className="login-form-text">
                        <h1>Login</h1>
                        <p>Sempre monitorando o melhor para você!</p>
                    </div>

                    <div className="login-form-input">
                        <div className="login-input">
                            <p className="login-input-label">Email<span>*</span></p>
                            <input type="email" name="email" value={this.state.email} onChange={this.atualiza} placeholder="mail@website.com" />
                        </div>
                        <div className="login-input">
                            <p className="login-input-label">Senha<span>*</span></p>
                            <input type="password" name="password" value={this.state.password} onChange={this.atualiza} maxlength="30" id="login-password" placeholder="&lowast;&lowast;&lowast;&lowast;&lowast;&lowast;" />
                            <div className="login-input-password-eye" id="login-password-eye" alt="Olho mágico para senha"></div>
                            <p className="login-input-password">Deve ter pelo menos 6 caracteres</p>
                        </div>
                    </div>

                    <div className="login-form-btns">

                        {
                            this.state.isLoading === true && (<input value="Entrando..." type="button" className="login-btn" disabled />)
                        }
                        {
                            this.state.isLoading === false && (<input value="Entrar" className="login-btn" type="submit" disabled={this.state.email === "" || this.state.password === "" || this.state.email === null && this.state.password === null ? true : false} />)
                        }
                        
                        <div className="login-form-btns-error-background">
                          <p className="login-form-btns-error">{this.state.mensagem}</p>
                        </div>

                        <div className="login-form-footer">
                            <p>©2021 All Rights Reserved</p>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
      </>
    );
  }
}
