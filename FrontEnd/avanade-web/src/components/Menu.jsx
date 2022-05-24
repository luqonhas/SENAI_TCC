// Libs
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

// Styles
import '../assets/styles/reset.css';
import '../assets/styles/components/menu.css';

// Images
// Sidebar (Ícones não clicados):
import dashboard_unclicked from '../assets/images/icons/sidebar-dashboard-unclicked.png';
import alert_unclicked from '../assets/images/icons/sidebar-alert-unclicked.svg';
import camera_unclicked from '../assets/images/icons/sidebar-camera-unclicked.svg';
import exit_unclicked from '../assets/images/icons/sidebar-exit-unclicked.svg';
// Sidebar (Ícones clicados):
import dashboard_clicked from '../assets/images/icons/sidebar-dashboard-clicked.png';
import alert_clicked from '../assets/images/icons/sidebar-alert-clicked.svg';
import camera_clicked from '../assets/images/icons/sidebar-camera-clicked.svg';
import exit_clicked from '../assets/images/icons/sidebar-exit-clicked.svg';
// Header:
import user from '../assets/images/icons/header-user-default.svg';
import user_test from '../assets/images/icons/user-test.jpeg';
import goodeye_logo from '../assets/images/sidebar-logo-goodeye.svg';
import lightmode from '../assets/images/icons/header-theme-lightmode.svg';

// Services
import {logout, parseJwt} from '../services/Auth';



function toggleClickBtn(){
    const URL = window.location.pathname;
    // console.log(URL);

    if(URL === '/dashboard/temperature' || URL === '/dashboard/people' || URL === '/dashboard/alerts') {
        var element = document.getElementById("dashboard");
        element.classList.add("active");
        document.getElementById("icon-dash").src=dashboard_clicked;
    }

    if(URL === '/dashboard/temperature') {
        var element = document.getElementById("header-btn-content-temperature");
        element.classList.add("active");
    }

    if(URL === '/dashboard/people') {
        var element = document.getElementById("header-btn-content-people");
        element.classList.add("active");
    }

    if(URL === '/dashboard/alerts') {
        var element = document.getElementById("header-btn-content-alerts");
        element.classList.add("active");
    }

    if (URL === '/alerts') {
        var element = document.getElementById("alerts");
        var quantity = document.getElementById("alert-quantity");
        element.classList.add("active");
        quantity.classList.add("active");
        document.getElementById("icon-alert").src=alert_clicked;
    }

    if (URL === '/camera') {
        var element = document.getElementById("camera");
        element.classList.add("active");
        document.getElementById("icon-camera").src=camera_clicked;
    }
}

function toggleClickPhoto(){
    var photo = document.getElementById("user-photo");

    photo.classList.add("active");
}

const accentsMap = new Map([
  ["A", "Á|À|Ã|Â|Ä"],
  ["a", "á|à|ã|â|ä"],
  ["E", "É|È|Ê|Ë"],
  ["e", "é|è|ê|ë"],
  ["I", "Í|Ì|Î|Ï"],
  ["i", "í|ì|î|ï"],
  ["O", "Ó|Ò|Ô|Õ|Ö"],
  ["o", "ó|ò|ô|õ|ö"],
  ["U", "Ú|Ù|Û|Ü"],
  ["u", "ú|ù|û|ü"],
  ["C", "Ç"],
  ["c", "ç"],
  ["N", "Ñ"],
  ["n", "ñ"]
]);

const reducer = (acc, [key]) => acc.replace(new RegExp(accentsMap.get(key), "g"), key);

const removeAccents = (text) => [...accentsMap].reduce(reducer, text);

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            listAlert : [],
            dark : true
        }
    }

 darkMode() {
    if(this.state.dark){
        const background = document.getElementById("sidebar-background");
        background.classList.add("background-black");     

        const backgroundContent = document.getElementById("content-between-header");
        backgroundContent.classList.add("background-black"); 

        const backgroundHeader = document.getElementById("header-background");
        backgroundHeader.classList.add("background-black"); 

        const backgroundSpan = document.getElementById("sidebar-logo-content");
        backgroundSpan.classList.add("color-white"); 
        
        const backgroundSobre = document.getElementById("header-sobre");
        backgroundSobre.classList.add("color-white"); 

        const backgroundText = document.getElementById("header-user-content-text");
        backgroundText.classList.add("color-white"); 

        const backgroundBtn = document.getElementById("header-btns");
        backgroundBtn.classList.add("background-black"); 

    }else{
        const background = document.getElementById("sidebar-background");
        background.classList.remove("background-black");      

        const backgroundContent = document.getElementById("sidebar-background");
        backgroundContent.classList.remove("background-black"); 

        const backgroundHeader = document.getElementById("header-background");
        backgroundHeader.classList.remove("background-black");      

        const backgroundSpan = document.getElementById("sidebar-logo-content");
        backgroundSpan.classList.remove("color-white");  

        const backgroundSobre = document.getElementById("header-sobre");
        backgroundSobre.classList.remove("color-white"); 

        const backgroundText = document.getElementById("header-user-content-text");
        backgroundText.classList.remove("color-white"); 

        const backgroundBtn = document.getElementById("header-btns");
        backgroundBtn.classList.remove("background-black"); 
    }
}

activeDarkMode = () => {
      this.setState({
          dark : false
      })  
      this.darkMode();
}

activeWhiteMode = () => {
    this.setState({
        dark : true
    })  
    this.darkMode();
}


    
listarAlertas = () => {
    axios("http://localhost:5000/v1/alert/read", {})
        .then((resposta) => {
        this.setState({ listAlert: resposta.data.data });
        console.log(resposta);
        })

        .then(this.amountPeople)
        .then(this.amountStatus)

        .catch((erro) => console.log(erro));
};

    componentDidMount() {
        toggleClickBtn();
        this.listarAlertas();
    }

    render() {
        const URL = window.location.pathname;
        // console.log(URL);
        return(
            <>
                <div className="menu-background">
                    <div id="sidebar-background" className="sidebar-background">
                        <div className="sidebar">

                            {/* Logo */}
                            <div className="sidebar-logo">
                                <div className="sidebar-logo-content" draggable="false">
                                    <p>Good</p>
                                    <span id="sidebar-logo-content">Eye</span>
                                </div>
                            </div>

                            {/* Botões */}
                            {/* Dashboard */}
                            <Link id="dashboard" to="/dashboard/temperature" className="sidebar-btn">
                                <div className="sidebar-btn-content">
                                    <div className="sidebar-btn-content-default">
                                        <img id="icon-dash" className="sidebar-btn-icon" src={dashboard_unclicked} draggable="false" />
                                        <p>Dashboard</p>
                                    </div>
                                </div>
                            </Link>

                            {/* Alerts */}
                            <Link id="alerts" to="/alerts" className="sidebar-btn">
                                <div className="sidebar-btn-content">
                                    <div className="sidebar-btn-content-default">
                                        <img id="icon-alert" className="sidebar-btn-icon" src={alert_unclicked} draggable="false" />
                                        <p>Relatórios</p>
                                    </div>
                                    <div id="alert-quantity" className="sidebar-btn-content-alert">
                                        <span>{this.state.listAlert.length}</span>
                                    </div>
                                </div>
                            </Link>

                            {/* Camera */}
                            <Link id="camera" to="/camera" className="sidebar-btn">
                                <div className="sidebar-btn-content">
                                    <div className="sidebar-btn-content-default">
                                        <img id="icon-camera" className="sidebar-btn-icon" src={camera_unclicked} draggable="false" />
                                        <p>Câmera</p>
                                    </div>
                                </div>
                            </Link>

                            {/* Divisória */}
                            <div className="sidebar-vazio">
                                <div className="sidebar-linha"></div>
                            </div>

                            {/* Configurações */}
                            {/* <div className="sidebar-btn ">
                                <div className="sidebar-btn-content">
                                    <div className="sidebar-btn-content-default">
                                        <img className="sidebar-btn-icon" src={setting_unclicked} />
                                        <p>Configurações</p>
                                    </div>
                                </div>
                            </div> */}

                            {/* Logout */}
                            <Link className="sidebar-btn" onClick={logout} to="/">
                                <div className="sidebar-btn-content">
                                    <div className="sidebar-btn-content-default">
                                        <img className="sidebar-btn-icon" src={exit_unclicked} />
                                        <p>Sair</p>
                                    </div>
                                </div>
                            </Link>

                        </div>
                    </div>
                    <div id="content-between-header" className="content-between-header">
                        <div id="header-background" className="header-background">
                            <div className="header">
                                <div className="header-sobre-user">
                                    <div  id="header-sobre" className="header-sobre">
                                        {
                                            URL === "/dashboard/temperature" ? 
                                            <p>Controle de temperatura do ambiente</p>
                                            : ''
                                        }

                                        {
                                            URL === "/dashboard/people" ? 
                                            <p>Controle de pessoas do ambiente</p>
                                            : ''
                                        }

                                        {
                                            URL === "/dashboard/alerts" ? 
                                            <p>Controle de alertas do ambiente</p>
                                            : ''
                                        }

                                        {
                                            URL === "/alerts" ? 
                                            <p>Todos os alertas emitidos</p>
                                            : ''
                                        }

                                        {
                                            URL === "/camera" ? 
                                            <p>Formato da área de risco</p>
                                            : ''
                                        }
                                    </div>
                                    <div className="header-user">
                                        <div className="header-user-content">
                                            <div onClick={this.state.dark ? this.activeDarkMode : this.activeWhiteMode} className="header-user-theme">
                                                <img src={lightmode} alt="Ícone de tema claro" />
                                            </div>
                                            <div id="header-user-content-text" className="header-user-content-text">
                                                <p>{removeAccents(parseJwt().family_name)}</p>
                                                <p>{parseJwt().role == "Administrator" ? "Administrador" : "Convidado"}</p>
                                            </div>
                                            <div className="header-user-content-photo" id="user-photo" onClick={toggleClickPhoto}>
                                                <img src={user_test} draggable="false" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Botões */}
                                <div id="header-btns" className="header-btns">
                                    {
                                        URL === "/dashboard/temperature" || URL === "/dashboard/people" || URL === "/dashboard/alerts" ? 
                                        <>
                                            <Link to="/dashboard/temperature" id="header-btn-content-temperature" className="header-btn-content">
                                                <p>Temperatura</p>
                                            </Link>
                                            <Link to="/dashboard/people" id="header-btn-content-people" className="header-btn-content">
                                                <p>Pessoas</p>
                                            </Link>
                                            <Link to="/dashboard/alerts" id="header-btn-content-alerts" className="header-btn-content">
                                                <p>Alertas</p>
                                            </Link>
                                        </> : ''
                                    }

                                    {
                                        URL === "/alerts" || URL === "/camera" ? 
                                        <>
                                            <Link className="header-btn-content-alerts">
                                                <p>Geral</p>
                                            </Link>
                                        </> : ''
                                    }
                                    
                                </div>

                            </div>
                        </div>
                        
                        <div className="content-background">
                            {this.props.children}
                        </div>
                    </div>

                </div>

            </>
        )
    }
}

export default Menu;