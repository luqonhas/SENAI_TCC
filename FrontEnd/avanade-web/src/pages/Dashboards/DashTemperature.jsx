// Libs
import React, { Component } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import axios from "axios";

// Styles
import '../../assets/styles/reset.css';
import '../../assets/styles/pages/dashTemperature.css';
import '../../assets/styles/components/menu.css';

// Components
import Menu from '../../components/Menu';

// Images
import temperature_default from '../../assets/images/dashboard-temperature-icon-default.svg';
import temperature_safe from '../../assets/images/dashboard-temperature-icon-safe.svg';
import temperature_attention from '../../assets/images/dashboard-temperature-icon-attention.svg';
import temperature_danger from '../../assets/images/dashboard-temperature-icon-danger.svg';
import graph_bars from '../../assets/images/temporary/graph-bars.svg';
import graph_donut from '../../assets/images/temporary/graph-donut.svg';


function changeWithTemperature(){
    var message = document.getElementById("message");
    var message_text = document.getElementById("message-text");
    var message_text_value;
    var temperatureInput = document.getElementById("valor-temperatura");
    var temperatureValue = temperatureInput.textContent;
    console.log(temperatureValue)

    if (temperatureValue <= 25) {
        message.classList.add("safe");
        message_text_value = document.createTextNode("Seguro");
        message_text.appendChild(message_text_value);
    }
    if (temperatureValue >= 26 && temperatureValue <= 30) {
        message.classList.add("attention");
        message_text_value = document.createTextNode("Atenção");
        message_text.appendChild(message_text_value);
    }
    if (temperatureValue >= 31) {
        message.classList.add("danger");
        message_text_value = document.createTextNode("Perigo");
        message_text.appendChild(message_text_value);
    }
}

function toggleClickBtnCelsius(){
    var celsius = document.getElementById("celsius");
    var fahrenheit = document.getElementById("fahrenheit");
    var temperatureInput = document.getElementById("valor-temperatura");
    var temperatureValue = temperatureInput.textContent;

    fahrenheit.classList.remove("active");

    if (!celsius.classList.contains("active")) {
        temperatureValue = parseFloat(temperatureValue);
        let result = (temperatureValue-32)/1.8;
        temperatureInput.innerHTML = result.toFixed(0);
        // console.log(temperatureValue)
    }

    celsius.classList.add("active");
}

function toggleClickBtnFahrenheit(){
    var fahrenheit = document.getElementById("fahrenheit");
    var celsius = document.getElementById("celsius");
    var temperatureInput = document.getElementById("valor-temperatura");
    var temperatureValue = temperatureInput.textContent;

    celsius.classList.remove("active");

    if (!fahrenheit.classList.contains("active")) {
        temperatureValue = parseFloat(temperatureValue);
        let result = (temperatureValue*1.8)+32;
        temperatureInput.innerHTML = result.toFixed(0);
        // console.log(temperatureValue)
    }

    fahrenheit.classList.add("active");
}

class DashTemperature extends Component {
    constructor(props){
        super(props);
        this.state = {
            listAlert: [],
            dark : true
        }
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

      calcularPorcentagem = (quantidade, total) => {
        let porcentagem = (quantidade / total) * 100
    
        return porcentagem
      }

      FilterStatus = (status_) => {  

        function FiltrarPorMes(alert, mes) {
          return new Date(alert.createdDate).toLocaleDateString().split('/')[1] == mes
        }
    
        var arrayMesAtual = this.state.listAlert.filter((e) => FiltrarPorMes(e, new Date().toLocaleDateString().split('/')[1]))
        var arrayMesAnterior = this.state.listAlert.filter((e) => FiltrarPorMes(e, new Date().toLocaleDateString().split('/')[1]-1))
    
        function filtros_(alert, mes) {
          return alert.status == status_ && (new Date(alert.createdDate).getMonth() + 1) == mes; 
        }
      
        var alertasMesAtualStatus = arrayMesAtual.filter((e) => filtros_(e, new Date().toLocaleDateString().split('/')[1]))
        var alertasMesAntetiorStatus = arrayMesAnterior.filter((e) => filtros_(e, new Date().toLocaleDateString().split('/')[1]-1))
        
        let porcentagemAlertasAtual = this.calcularPorcentagem(alertasMesAtualStatus.length, arrayMesAtual.length)
        let porcentagemAlertasAnterior = this.calcularPorcentagem(alertasMesAntetiorStatus.length, arrayMesAnterior.length)
        
        let porcentagemFinal = 0
     
        porcentagemFinal = porcentagemAlertasAtual - porcentagemAlertasAnterior;
    
        if(porcentagemFinal > 0){
          return '+' +porcentagemFinal.toFixed(0)
        }
        
        return ' ' + porcentagemFinal.toFixed(0)
      };

    darkMode() {
        if(this.state.dark){
            const background = document.getElementById("dash-temperature-small-squares");
            background.classList.add("background-black");     

    
        }else{
            const background = document.getElementById("dash-temperature-small-squares");
            background.classList.remove("background-black");      
        }
    }
    

    //dash-temperature-small-squares
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


    componentDidMount(){
        changeWithTemperature();
        this.listarAlertas();
        this.FilterStatus();
    }

    render() {
        var temperatureValueText = document.getElementById("valor-temperatura");
        console.log(temperatureValueText)

        return(
            <>
                <Menu>
                    <div className="dash-temperature-small-squares-background">
                        <div id="dash-temperature-small-squares" className="dash-temperature-small-squares">
                            <h3>Temperatura atual</h3>
                            <div className="dash-temperature-small-squares-info-background">
                                <div className="dash-temperature-small-squares-info default">
                                    <p id="valor-temperatura">32</p>
                                    <span id="celsius" onClick={toggleClickBtnCelsius} className="dash-temperature-small-squares-celsius-fahrenheit active">°C</span>
                                    <div className="dash-temperature-small-squares-line"></div>
                                    <span id="fahrenheit" onClick={toggleClickBtnFahrenheit} className="dash-temperature-small-squares-celsius-fahrenheit">°F</span>
                                </div>

                                {/* corrigir erro */}
                                <img onClick={this.state.dark ? this.activeDarkMode : this.activeWhiteMode}  src={temperature_default} alt="Ícone de temperatura" draggable="false" />
                            </div>
                            <div id="message" className="dash-temperature-small-squares-message">
                                <p id="message-text"></p>
                            </div>
                        </div>

                        <div className="dash-temperature-small-squares">
                            <h3>Porcentagem do dia %</h3>
                            <div className="dash-temperature-small-squares-info-background">
                                <div className="dash-temperature-small-squares-info safe">
                                    <p>Seguro</p>
                                </div>
                                <img src={temperature_safe} alt="Ícone de temperatura" draggable="false" />
                            </div>
                            <div className="dash-temperature-small-squares-bottom">
                                <div className="dash-temperature-small-squares-percent safe">
                                    <p>{this.FilterStatus(1)}%</p>
                                </div> 
                                <span>desde o mês passado</span>
                            </div>
                        </div>

                        <div className="dash-temperature-small-squares">
                            <h3>Porcentagem do dia %</h3>
                            <div className="dash-temperature-small-squares-info-background">
                                <div className="dash-temperature-small-squares-info attention">
                                    <p>Cuidado</p>
                                </div>
                                <img src={temperature_attention} alt="Ícone de temperatura" draggable="false" />
                            </div>
                            <div className="dash-temperature-small-squares-bottom">
                                <div className="dash-temperature-small-squares-percent attention">
                                    <p>{this.FilterStatus(2)}%</p>
                                </div> 
                                <span>desde o mês passado</span>
                            </div>
                        </div>

                        <div className="dash-temperature-small-squares">
                            <h3>Porcentagem do dia %</h3>
                            <div className="dash-temperature-small-squares-info-background">
                                <div className="dash-temperature-small-squares-info danger">
                                    <p>Perigo</p>
                                </div>
                                <img src={temperature_danger} alt="Ícone de temperatura" draggable="false" />
                            </div>
                            <div className="dash-temperature-small-squares-bottom">
                                <div className="dash-temperature-small-squares-percent danger">
                                    <p>{this.FilterStatus(3)}%</p>
                                </div> 
                                <span>desde o mês passado</span>
                            </div>
                        </div>
                    </div>

                    <div className="dash-temperature-grafics-background">
                        <div className="dash-temperature-grafics-bars-background">
                            <div className="dash-temperature-grafics-title">
                                <h2>Dados da semana</h2>
                            </div>
                            <div className="dash-temperature-grafics-bars-graph">
                                {/* BARS */}
                                <iframe
                                id="donut"
                                title="Bars - People"
                                width="100%"
                                overflow="hidden"
                                height="100%"
                                src="https://app.powerbi.com/reportEmbed?reportId=3d74d8e9-c551-4968-b61e-f95d88a454b5&autoAuth=true&ctid=b1051c4b-3b94-41ab-9441-e73a72342fdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWJyYXppbC1zb3V0aC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D&filterPaneEnabled=false&navContentPaneEnabled=false"
                                frameborder="0"
                                allowFullScreen="true"
                                filterPaneEnabled="false"
                                ></iframe>
                            </div>
                        </div>

                        <div className="dash-temperature-grafics-small-background">
                            <div className="dash-temperature-grafics-title">
                                <h2>Resumo do dia</h2>
                            </div>
                            <div className="dash-temperature-grafics-donut-graph">
                                {/* DONUT */}
                                <iframe
                                id="donut"
                                title="Donut - Alerts"
                                width="100%"
                                overflow="hidden"
                                height="100%"
                                src="https://app.powerbi.com/reportEmbed?reportId=1b552356-62ec-451a-83c0-9c5900eea340&autoAuth=true&ctid=b1051c4b-3b94-41ab-9441-e73a72342fdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWJyYXppbC1zb3V0aC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D&filterPaneEnabled=false&navContentPaneEnabled=false"
                                frameborder="0"
                                allowFullScreen="true"
                                filterPaneEnabled="false"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </Menu>
            </>
        )
    }
}

export default DashTemperature;