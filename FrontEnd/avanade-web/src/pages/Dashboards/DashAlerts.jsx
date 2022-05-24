// Libs
import React, { Component } from "react";
import axios from "axios";
// Styles
import "../../assets/styles/reset.css";
import "../../assets/styles/pages/dashAlerts.css";
import "../../assets/styles/powerbi/donut.css";

// Components
import Menu from "../../components/Menu";

// Images
import alert_default from "../../assets/images/dashboard-alerts-icon-default.svg";
import alert_safe from "../../assets/images/dashboard-alerts-icon-safe.svg";
import alert_attention from "../../assets/images/dashboard-alerts-icon-attention.svg";
import alert_danger from "../../assets/images/dashboard-alerts-icon-danger.svg";
import alert_bell from "../../assets/images/dashboard-alerts-bell-notify.svg";
import alert_clock from "../../assets/images/dashboard-alerts-clock-notify.svg";
import alert_cell from "../../assets/images/dashboard-alerts-cellphone-notify.svg";
import alert_email from "../../assets/images/dashboard-alerts-email-notify.svg";
import imagem from "../../assets/images/temporary/alerts-frame.png";

function changeWithQuantity() {
  var quantity_alerts = document.getElementById("quantity-alerts");
  var quantity_word = document.getElementById("quantity-word");
  var quantity_word_value;
  var quantity_number = quantity_alerts.textContent;

  if (quantity_number == 0) {
    quantity_word_value = document.createTextNode(" alertas");
    quantity_word.appendChild(quantity_word_value);
  }
  if (quantity_number == 1) {
    quantity_word_value = document.createTextNode(" alerta");
    quantity_word.appendChild(quantity_word_value);
  }
  if (quantity_number >= 2) {
    quantity_word_value = document.createTextNode(" alertas");
    quantity_word.appendChild(quantity_word_value);
  }
}

function filtros(alert, status) {
  return alert.status == status;
}

function countAlert(listAlert = [], status) {
  var filtrar = listAlert.filter((e) => filtros(e, status));
  // console.log(filtrar);
  return filtrar.length;
}

class DashAlerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAlert: [],
      amount: 0,
      statuss: 0,
      urlimage: "",
    };
  }

  listarAlertas = () => {
    axios("http://localhost:5000/v1/alert/read", {})
      .then((resposta) => {
        this.setState({ listAlert: resposta.data.data });
      })

      .then(this.amountPeople)
      .then(this.amountStatus)
      .then(this.imageUrl)

      .catch((erro) => console.log(erro));
  };

  calcularPorcentagem = (quantidade, total) => {
    let porcentagem = (quantidade / total) * 100;

    return porcentagem;
  };

  FilterStatus = (status_) => {
    function FiltrarPorMes(alert, mes) {
      return (
        new Date(alert.createdDate).toLocaleDateString().split("/")[1] == mes
      );
    }

    var arrayMesAtual = this.state.listAlert.filter((e) =>
      FiltrarPorMes(e, new Date().toLocaleDateString().split("/")[1])
    );
    var arrayMesAnterior = this.state.listAlert.filter((e) =>
      FiltrarPorMes(e, new Date().toLocaleDateString().split("/")[1] - 1)
    );

    function filtros_(alert, mes) {
      return (
        alert.status == status_ &&
        new Date(alert.createdDate).getMonth() + 1 == mes
      );
    }

    var alertasMesAtualStatus = arrayMesAtual.filter((e) =>
      filtros_(e, new Date().toLocaleDateString().split("/")[1])
    );
    var alertasMesAntetiorStatus = arrayMesAnterior.filter((e) =>
      filtros_(e, new Date().toLocaleDateString().split("/")[1] - 1)
    );

    let porcentagemAlertasAtual = this.calcularPorcentagem(
      alertasMesAtualStatus.length,
      arrayMesAtual.length
    );
    let porcentagemAlertasAnterior = this.calcularPorcentagem(
      alertasMesAntetiorStatus.length,
      arrayMesAnterior.length
    );

    let porcentagemFinal = 0;

    porcentagemFinal = porcentagemAlertasAtual - porcentagemAlertasAnterior;

    if (porcentagemFinal > 0) {
      return "+" + porcentagemFinal.toFixed(0);
    }

    return " " + porcentagemFinal.toFixed(0);
  };

  count = (listAlert, status) => {
    return countAlert(listAlert, status);
  };

  amountPeople = () => {
    this.setState({
      amount:
        this.state.listAlert[this.state.listAlert.length - 1].amountOfPeople,
    });
  };

  imageUrl = () => {
    this.setState({
      urlimage: this.state.listAlert[this.state.listAlert.length - 1].urlImage,
    });
    console.log(this.state.listAlert[this.state.listAlert.length - 1].urlImage);
  };

  amountStatus = () => {
    this.setState({
      statuss: this.state.listAlert[this.state.listAlert.length - 1].status,
    });
  };

  formatarDataHora = (date) => {
    let hora = new Date(date).toLocaleTimeString();

    let novaHora = hora.split(":")[0];
    novaHora += ":" + hora.split(":")[1];

    return ` ${novaHora}`;
  };

  componentDidMount() {
    changeWithQuantity();
    this.listarAlertas();
    this.count();
    this.FilterStatus();
  }

  render() {
    return (
      <>
        <Menu>
          <div className="dash-alerts-small-squares-background">
            <div className="dash-alerts-small-squares">
              <h3>Alertas do dia</h3>
              <div className="dash-alerts-small-squares-info-background">
                <div className="dash-alerts-small-squares-info default">
                  <p>
                    <span id="quantity-alerts">
                      {this.state.listAlert.length}
                    </span>
                    <span id="quantity-word"></span>
                  </p>
                </div>
                <img
                  src={alert_default}
                  alt="Ícone de alerta"
                  draggable="false"
                />
              </div>
              <div className="dash-alerts-small-squares-bottom-quantity">
                <div className="dash-alerts-small-squares-quantity safe">
                  <p>{this.count(this.state.listAlert, 1)}</p>
                </div>

                <div className="dash-alerts-small-squares-quantity attention">
                  <p>{this.count(this.state.listAlert, 2)}</p>
                </div>

                <div className="dash-alerts-small-squares-quantity danger">
                  <p>{this.count(this.state.listAlert, 3)}</p>
                </div>
              </div>
            </div>

            <div className="dash-alerts-small-squares">
              <h3>Porcentagem do dia %</h3>
              <div className="dash-alerts-small-squares-info-background">
                <div className="dash-alerts-small-squares-info safe">
                  <p>Seguro</p>
                </div>
                <img src={alert_safe} alt="Ícone de alerta" draggable="false" />
              </div>
              <div className="dash-alerts-small-squares-bottom">
                <div className="dash-alerts-small-squares-percent safe">
                  <p>{this.FilterStatus(1)}%</p>
                </div>
                <span>desde o mês passado</span>
              </div>
            </div>

            <div className="dash-alerts-small-squares">
              <h3>Porcentagem do dia %</h3>
              <div className="dash-alerts-small-squares-info-background">
                <div className="dash-alerts-small-squares-info attention">
                  <p>Cuidado</p>
                </div>
                <img
                  src={alert_attention}
                  alt="Ícone de alerta"
                  draggable="false"
                />
              </div>
              <div className="dash-alerts-small-squares-bottom">
                <div className="dash-alerts-small-squares-percent attention">
                  <p>{this.FilterStatus(2)}%</p>
                </div>
                <span>desde o mês passado</span>
              </div>
            </div>

            <div className="dash-alerts-small-squares">
              <h3>Porcentagem do dia %</h3>
              <div className="dash-alerts-small-squares-info-background">
                <div className="dash-alerts-small-squares-info danger">
                  <p>Perigo</p>
                </div>
                <img
                  src={alert_danger}
                  alt="Ícone de alerta"
                  draggable="false"
                />
              </div>
              <div className="dash-alerts-small-squares-bottom">
                <div className="dash-alerts-small-squares-percent danger">
                  <p>{this.FilterStatus(3)}%</p>
                </div>
                <span>desde o mês passado</span>
              </div>
            </div>
          </div>

          <div className="dash-alerts-grafics-background">
            <div className="dash-alerts-grafics-bars-background">
              <div className="dash-alerts-grafics-title">
                <h2>Dados da semana</h2>
              </div>
              <div className="dash-alerts-grafics-bars-graph">
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

            <div className="dash-alerts-grafics-small-background">
              <div className="dash-alerts-grafics-title">
                <h2>Resumo do dia</h2>
              </div>
              <div className="dash-alerts-grafics-donut-graph">
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

          <div className="dash-alerts-notify-background">
            <div className="dash-alerts-notify-frame-background">
              <div className="dash-alerts-notify-frame-image-background">
                <div className="dash-alerts-notify-frame-image-title">
                  <h2>Frame do último alerta na área de risco</h2>
                </div>

                <div className="dash-alerts-notify-frame-image-content-background">
                  <img
                    src={imagem}
                    alt="Frame da câmera"
                    draggable="false"
                  />
                </div>
              </div>
              <div className="dash-alerts-notify-frame-info-background">
                <div className="dash-alerts-notify-frame-image-title">
                  <h2>Dados do Alerta</h2>
                </div>

                <div className="dash-alerts-notify-frame-info-content-background">
                  <div className="dash-alerts-notify-frame-info-content-data">
                    <div className="dash-alerts-notify-frame-info-content-data-row">
                      {this.state.amount >= 0 && this.state.amount <= 3 ? (
                        <div className="dash-alerts-notify-frame-info-content-data-row-icon safe">
                          <img
                            src={alert_bell}
                            alt="Ícone da notificação"
                            draggable="false"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {this.state.amount >= 4 && this.state.amount <= 7 ? (
                        <div className="dash-alerts-notify-frame-info-content-data-row-icon attention">
                          <img
                            src={alert_bell}
                            alt="Ícone da notificação"
                            draggable="false"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {this.state.amount >= 8 ? (
                        <div className="dash-alerts-notify-frame-info-content-data-row-icon danger">
                          <img
                            src={alert_bell}
                            alt="Ícone da notificação"
                            draggable="false"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="dash-alerts-notify-frame-info-content-data-row-text">
                        {this.state.amount >= 0 && this.state.amount <= 3 ? (
                          <p>Área segura!</p>
                        ) : (
                          ""
                        )}
                        {this.state.amount >= 4 && this.state.amount <= 7 ? (
                          <p>Área em atenção!</p>
                        ) : (
                          ""
                        )}
                        {this.state.amount >= 8 ? <p>Área perigosa!</p> : ""}
                        <span>{this.state.amount} pessoas na área</span>
                      </div>
                    </div>

                    <div className="dash-alerts-notify-frame-info-content-data-row">
                      {this.state.amount >= 0 && this.state.amount <= 3 ? (
                        <div className="dash-alerts-notify-frame-info-content-data-row-icon safe">
                          <img
                            src={alert_clock}
                            alt="Ícone da notificação"
                            draggable="false"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {this.state.amount >= 4 && this.state.amount <= 7 ? (
                        <div className="dash-alerts-notify-frame-info-content-data-row-icon attention">
                          <img
                            src={alert_clock}
                            alt="Ícone da notificação"
                            draggable="false"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {this.state.amount >= 8 ? (
                        <div className="dash-alerts-notify-frame-info-content-data-row-icon danger">
                          <img
                            src={alert_clock}
                            alt="Ícone da notificação"
                            draggable="false"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="dash-alerts-notify-frame-info-content-data-row-text">
                        <p>
                          {new Intl.DateTimeFormat("pt-br", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                            .format(this.state.listAlert.createdDate)
                            .replace(" de 2021", ", 2021")}
                        </p>
                        <span>
                          às{" "}
                          {new Date(this.state.listAlert.createdDate)
                            .toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            .replace(":", "h")}
                        </span>
                      </div>
                    </div>

                    <div className="dash-alerts-notify-frame-info-content-data-row">
                      {this.state.amount >= 0 && this.state.amount <= 3 ? (
                        <div className="dash-alerts-notify-frame-info-content-data-row-icon safe">
                          <img
                            src={alert_cell}
                            alt="Ícone da notificação"
                            draggable="false"
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      {this.state.amount >= 4 && this.state.amount <= 7 ? (
                        <div className="dash-alerts-notify-frame-info-content-data-row-icon attention">
                          <img
                            src={alert_cell}
                            alt="Ícone da notificação"
                            draggable="false"
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      {this.state.amount >= 8 ? (
                        <div className="dash-alerts-notify-frame-info-content-data-row-icon danger">
                          <img
                            src={alert_cell}
                            alt="Ícone da notificação"
                            draggable="false"
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="dash-alerts-notify-frame-info-content-data-row-text">
                        <p>Notificações</p>
                        <span>Enviadas</span>
                      </div>
                    </div>

                    <div className="dash-alerts-notify-frame-info-content-data-row">
                      {this.state.amount >= 0 && this.state.amount <= 3 ? (
                        <div className="dash-alerts-notify-frame-info-content-data-row-icon safe">
                          <img
                            src={alert_email}
                            alt="Ícone da notificação"
                            draggable="false"
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      {this.state.amount >= 4 && this.state.amount <= 7 ? (
                        <div className="dash-alerts-notify-frame-info-content-data-row-icon attention">
                          <img
                            src={alert_email}
                            alt="Ícone da notificação"
                            draggable="false"
                          />
                        </div>
                      ) : (
                        ""
                      )}

                      {this.state.amount >= 8 ? (
                        <div className="dash-alerts-notify-frame-info-content-data-row-icon danger">
                          <img
                            src={alert_email}
                            alt="Ícone da notificação"
                            draggable="false"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="dash-alerts-notify-frame-info-content-data-row-text">
                        <p>E-mails</p>
                        <span>Enviados</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      this.state.statuss == 1
                        ? "dash-alerts-notify-frame-info-content-message safe"
                        : "" || this.state.statuss == 2
                        ? "dash-alerts-notify-frame-info-content-message attention"
                        : "" || this.state.statuss == 3
                        ? "dash-alerts-notify-frame-info-content-message danger"
                        : ""
                    }
                  >
                    <p>
                      {" "}
                      {this.state.statuss == 1
                        ? "Seguro"
                        : this.state.statuss == 2
                        ? "Cuidado"
                        : "Perigo"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="dash-alerts-notify-info-background"></div>
          </div>
        </Menu>
      </>
    );
  }
}

export default DashAlerts;
