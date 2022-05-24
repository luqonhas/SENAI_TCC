//Libs
import { useEffect, useState } from "react";

// Styles
import "../../assets/styles/reset.css";
import "../../assets/styles/pages/alerts.css";

// Images
import order_icon from "../../assets/images/icons/alerts-table-order.svg";
import filter_icon from "../../assets/images/icons/alerts-table-filter.svg";
import alerts_bell from "../../assets/images/alerts-bell-icon.svg";

// Components
import Menu from "../../components/Menu";

function Alerts() {
  const [itens, setItens] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const [status, setStatus] = useState([]);

  const [dataAlert, setDataAlert] = useState(" ");

  const pages = Math.ceil(itens.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;

  const currentItens = itens.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:5000/v1/alert/read")
        .then((response) => response.json())
        .then((data) => setItens(data.data));
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [itensPerPage]);

  // ORDENAÇÃO COM HOOKS
  function OldOrder() {
    var current = document.getElementById("current-order");
    var old = document.getElementById("old-order");
    var img = document.getElementById("alerts-order");

    current.classList.toggle("active");
    old.classList.toggle("active");
    img.classList.toggle("active");

    const fetchData = async () => {
      await fetch("http://localhost:5000/v1/alert/read/antigos")
        .then((response) => response.json())
        .then((data) => setItens(data.data.reverse()));
    };
    fetchData();
  }

  // ORDENAÇÃO COM HOOKS
  function CurrentOrdering() {
    var current = document.getElementById("current-order");
    var old = document.getElementById("old-order");
    var img = document.getElementById("alerts-order-img");

    current.classList.toggle("active");
    old.classList.toggle("active");
    img.classList.toggle("active");

    const fetchData = async () => {
      await fetch("http://localhost:5000/v1/alert/read/recentes")
        .then((response) => response.json())
        .then((data) => setItens(data.data.reverse()));
    };
    fetchData();
  }

  // ORDENAÇÃO COM HOOKS
  function Filter() {
    const fetchData = async () => {
      await fetch(`http://localhost:5000/v1/alert/read/${dataAlert}`)
        .then((response) => response.json())
        .then((data) => setItens(data.data.reverse()));
    };
    fetchData();
  }

  // function FilterStatus() {
  //   const fetchData = async () => {
  //     await fetch("http://localhost:5000/v1/alert/read")
  //       .then((response) => response.json())
  //       .then((response) => setStatus(response.data));

  //     for (let index = 0; index < status.length; index++) {
  //       const element = status[index];

  //       var data = new Date(element.createdDate);
  //       console.log("porra " + data);

  //       var data2 = new Date();
  //       console.log("caralhoPOOO " + data2);

  //       var mes = data.getMonth() + 1;

  //       if (data.getTime() != data2.getTime()) {
  //         if (element.status == 1) {
  //           var resultado = (element.status * mes) / 100;
  //           console.log(resultado);
  //         }
  //       }
  //     }
  //   };
  //   fetchData();
  // }

  return (
    <>
      <Menu>
        <div className="alerts-table-background">
          <div className="alerts-table-top">
            <div className="alerts-table-top-title">
              {/* <button onClick={FilterStatus}>DSOSO</button> */}
              <h1>Todos alertas</h1>
            </div>
            <div className="alerts-table-top-functions">
              <div
                id="alerts-order"
                className="alerts-table-top-functions-order"
              >
                <img
                  id="alerts-order-img"
                  src={order_icon}
                  alt="Ícone de ordenar da tabela"
                  draggable="false"
                />

                <div className="alerts-table-pages-btn-lines-per-page">
                  <p
                    id="current-order"
                    className="alerts-table-pages-btn-lines-per-page-text-order"
                    onClick={() => OldOrder()}
                  >
                    Ordenar
                  </p>
                  <p
                    id="old-order"
                    className="alerts-table-pages-btn-lines-per-page-text-order active"
                    onClick={() => CurrentOrdering()}
                  >
                    Ordenar
                  </p>

                  <div className="alerts-table-pages-btn-lines-per-page-clickable"></div>
                </div>
              </div>
              <div className="alerts-table-top-functions-filter">
                <img
                  src={filter_icon}
                  alt="Ícone de filtrar da tabela"
                  draggable="false"
                />
                <input
                  value={dataAlert}
                  onChange={(event) => setDataAlert(event.target.value)}
                  onFocus={() => Filter()}
                  // onInput={() => Filter()}
                  type="date"
                ></input>
              </div>
            </div>
          </div>
          <table className="alerts-table-content-background">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItens.map((item) => {
                return (
                  <tr>
                    <td>
                      <div className="alerts-table-content-row-description">
                        {item.status == 1 ? (
                          <div className="alerts-table-content-row-description-icon safe">
                            <img
                              src={alerts_bell}
                              alt="Ícone de alerta"
                              draggable="false"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        {item.status == 2 ? (
                          <div className="alerts-table-content-row-description-icon attention">
                            <img
                              src={alerts_bell}
                              alt="Ícone de alerta"
                              draggable="false"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        {item.status == 3 ? (
                          <div className="alerts-table-content-row-description-icon danger">
                            <img
                              src={alerts_bell}
                              alt="Ícone de alerta"
                              draggable="false"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="alerts-table-content-row-description-text">
                          <p>
                            {item.status == 1
                              ? "Seguro! Poucas pessoas no ambiente!"
                              : item.status == 2
                              ? "Cuidado! Algumas pessoas no ambiente!"
                              : "Perigo! Há muitas pessoas no ambiente!"}
                          </p>
                          <span>{item.description}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="alerts-table-content-row-date">
                        <p>
                          {new Date(item.createdDate)
                            .toLocaleDateString("pt-br", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                            .replace(" de 2021", ", 2021")}
                        </p>
                        <span>
                          às{" "}
                          {new Date(item.createdDate)
                            .toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            .replace(":", "h")}
                        </span>
                      </div>
                    </td>
                    <td>
                      {item.status == 1 ? (
                        <div className="alerts-table-content-row-status safe">
                          <p>Seguro</p>
                        </div>
                      ) : (
                        ""
                      )}
                      {item.status == 2 ? (
                        <div className="alerts-table-content-row-status attention">
                          <p>Atenção</p>
                        </div>
                      ) : (
                        ""
                      )}
                      {item.status == 3 ? (
                        <div className="alerts-table-content-row-status danger">
                          <p>Perigo</p>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="alerts-table-pages-btn-background">
            <div className="alerts-table-pages-btn-lines-per-page">
              <p>Linhas por página: </p>
              <div className="alerts-table-pages-btn-lines-per-page-clickable">
                <select
                  className="form-control"
                  name="state"
                  id="maxRows"
                  value={itensPerPage}
                  onChange={(e) => setItensPerPage(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={70}>70</option>
                  <option value={100}>100</option>
                  <option value="5000">Tudo</option>
                </select>
              </div>

              <div className="alerts-table-pages-btn-quantity-pages">
                <div className="alerts-table-pages-btn-number-next-prev">
                  <p>Numeração das páginas: </p>
                  <div className="alerts-table-pages-btn-number-prev-icon">
                    {Array.from(Array(pages), (item, index) => {
                      return (
                        <button
                          value={index}
                          onClick={(e) => setCurrentPage(e.target.value)}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Menu>
    </>
  );
}

export default Alerts;
