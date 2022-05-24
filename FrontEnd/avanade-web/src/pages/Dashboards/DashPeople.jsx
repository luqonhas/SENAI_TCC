// Libs
import React, { Component } from "react";
import axios from "axios";

// Styles
import "../../assets/styles/reset.css";
import "../../assets/styles/pages/dashPeople.css";

// Components
import Menu from "../../components/Menu";

// Images
import one_people_safe from "../../assets/images/dashboard-people-icon-one-safe.svg";
import two_people_safe from "../../assets/images/dashboard-people-icon-two-safe.svg";
import three_people_safe from "../../assets/images/dashboard-people-icon-three-safe.svg";
import people_attention from "../../assets/images/dashboard-people-icon-attention.svg";
import people_danger from "../../assets/images/dashboard-people-icon-danger.svg";

function filtros(alert, status) {
  return alert.status == status;
}

function countAlert(listAlert = [], status) {
  var filtrar = listAlert.filter((e) => filtros(e, status));
  console.log(filtrar);
  return filtrar.length;
}
class DashPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAlert: [],
      amount: 0,
      statusAlert: 0,
    };
  }

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

  amountPeople = () => {
    this.setState({
      amount:
        this.state.listAlert[this.state.listAlert.length - 1].amountOfPeople,
    });
  };

  amountStatus = () => {
    this.setState({
      statusAlert: this.state.listAlert[this.state.listAlert.length - 1].status,
    });
  };

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

  count = (listAlert, status) => {
    return countAlert(listAlert, status);
  };

  componentDidMount() {
    this.listarAlertas();
    this.count();
    this.FilterStatus();
  }

  render() {
    return (
      <>
        <Menu>
          <div className="dash-people-small-squares-background">
            {/* \<button onFocusCapture={() => this.FilterStatus(1)}>kkdk</button> */}
            <div
              id="cards"
              className={
                this.state.amount >= 4
                  ? "dash-people-small-squares big"
                  : "dash-people-small-squares"
              }
            >
              <h3>Quantidade atual</h3>
              <div className="dash-people-small-squares-info-background">
                <div
                  id="quantity-value-element"
                  className={
                    this.state.amount >= 0 && this.state.amount <= 3
                      ? "dash-people-small-squares-info safe"
                      : this.state.amount >= 4 && this.state.amount <= 7
                      ? "dash-people-small-squares-info attention"
                      : "dash-people-small-squares-info danger"
                  }
                >
                  <p>
                    <span id="quantity-people">{this.state.amount}</span>
                    {this.state.amount == 0 ? (
                      <span id="quantity-word">pessoas</span>
                    ) : (
                      ""
                    )}{" "}
                    {this.state.amount == 1 ? (
                      <span id="quantity-word">pessoa</span>
                    ) : (
                      ""
                    )}{" "}
                    {this.state.amount >= 2 ? (
                      <span id="quantity-word">pessoas</span>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <img
                  id="quantity-value-img"
                  src={
                    this.state.amount >= 0 && this.state.amount <= 1
                      ? one_people_safe
                      : this.state.amount == 2
                      ? two_people_safe
                      : this.state.amount == 3
                      ? three_people_safe
                      : this.state.amount >= 4 && this.state.amount <= 7
                      ? people_attention
                      : people_danger
                  }
                  alt="Ícone de pessoa"
                  draggable="false"
                />
              </div>
              {this.state.amount >= 0 && this.state.amount <= 3 ? (
                <div
                  id="message"
                  className="dash-people-small-squares-message safe"
                >
                  <p id="message-text">Seguro</p>
                </div>
              ) : (
                ""
              )}
              {this.state.amount >= 4 && this.state.amount <= 7 ? (
                <div
                  id="message"
                  className="dash-people-small-squares-message attention"
                >
                  <p id="message-text">Atenção</p>
                </div>
              ) : (
                ""
              )}
              {this.state.amount >= 8 ? (
                <div
                  id="message"
                  className="dash-people-small-squares-message danger"
                >
                  <p id="message-text">Perigo</p>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="dash-people-small-squares">
              <h3>Porcentagem do dia %</h3>
              <div className="dash-people-small-squares-info-background">
                <div className="dash-people-small-squares-info safe">
                  <p>Seguro</p>
                </div>
                <img
                  src={three_people_safe}
                  alt="Ícone de pessoa"
                  draggable="false"
                />
              </div>
              <div className="dash-people-small-squares-bottom">
                <div className="dash-people-small-squares-percent safe">
                  <p>{this.FilterStatus(1)}%</p>
                </div>
                <span>desde o mês passado</span>
              </div>
            </div>

            <div className="dash-people-small-squares">
              <h3>Porcentagem do dia %</h3>
              <div className="dash-people-small-squares-info-background">
                <div className="dash-people-small-squares-info attention">
                  <p>Cuidado</p>
                </div>
                <img
                  src={people_attention}
                  alt="Ícone de pessoa"
                  draggable="false"
                />
              </div>
              <div className="dash-people-small-squares-bottom">
                <div className="dash-people-small-squares-percent attention">
                  <p>{this.FilterStatus(2)}%</p>
                </div>
                <span>desde o mês passado</span>
              </div>
            </div>

            <div className="dash-people-small-squares">
              <h3>Porcentagem do dia %</h3>
              <div className="dash-people-small-squares-info-background">
                <div className="dash-people-small-squares-info danger">
                  <p>Perigo</p>
                </div>
                <img
                  src={people_danger}
                  alt="Ícone de pessoa"
                  draggable="false"
                />
              </div>
              <div className="dash-people-small-squares-bottom">
                <div className="dash-people-small-squares-percent danger">
                  <p>{this.FilterStatus(3)}%</p>
                </div>
                <span>desde o mês passado</span>
              </div>
            </div>
          </div>

          <div className="dash-people-grafics-background">
            <div className="dash-people-grafics-bars-background">
              <div className="dash-people-grafics-title">
                <h2>Dados da semana</h2>
              </div>
              <div className="dash-people-grafics-bars-graph">
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

            <div className="dash-people-grafics-small-background">
              <div className="dash-people-grafics-title">
                <h2>Resumo do dia</h2>
              </div>
              <div className="dash-people-grafics-donut-graph">
                {/* DONUT */}
                <iframe
                  id="donut"
                  title="Donut - Alerts - Donut - Alerts"
                  width="100%"
                  overflow="hidden"
                  height="100%"
                  src="https://app.powerbi.com/reportEmbed?reportId=40091852-6cb9-465a-9549-9c84d2e7007d&autoAuth=true&ctid=b1051c4b-3b94-41ab-9441-e73a72342fdd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWJyYXppbC1zb3V0aC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D&filterPaneEnabled=false&navContentPaneEnabled=false"
                  frameborder="0"
                  allowFullScreen="true"
                  filterPaneEnabled="false"
                ></iframe>
              </div>
            </div>
          </div>
        </Menu>
      </>
    );
  }
}

export default DashPeople;
