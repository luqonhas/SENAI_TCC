// // Libs
// import React, { Component } from 'react';
// import axios from "axios";

// // Styles
// import '../../assets/styles/reset.css';
// import '../../assets/styles/pages/camera.css';

// // Components
// import Menu from '../../components/Menu';

// // Images
// import movimentation from '../../assets/images/camera-movimentation-icon.svg';
// import length_icon from '../../assets/images/camera-length-icon.svg';
// import updown_icon from '../../assets/images/camera-up-down-icon.svg';
// import leftright_icon from '../../assets/images/camera-left-right-icon.svg';
// import image_frame from '../../assets/images/temporary/camera-image-frame.png';
// import reload_icon from '../../assets/images/camera-reload-icon.svg';

// // Movimentação da linha arrastando com o mouse:

// function moveLineOne(){
//     const dragLine = document.querySelector(".camera-content-image-line-one-background");
//     const html = document.querySelector("html");

//     const drag = (e) => {
//         dragLine.style.top = e.pageY + "px";
//         dragLine.style.left = e.pageX + "px";
//     }

//     dragLine.addEventListener("mousedown", () => {
//         window.addEventListener("mousemove", drag);
//     })

//     window.addEventListener("mouseleave", () => {
//         window.removeEventListener("mousemove", drag)
//     })

//     window.addEventListener("click", () => {
//         html.style.draggable = "false";
//         window.removeEventListener("mousemove", drag)
//     })
// }

// function moveLineTwo(){
//     const dragLine = document.querySelector(".camera-content-image-line-two-background");
    
//     const drag = (e) => {
//         dragLine.style.top = e.pageY + "px";
//         dragLine.style.left = e.pageX + "px";
//     }

//     dragLine.addEventListener("mousedown", () => {
//         window.addEventListener("mousemove", drag);
//     })

//     window.addEventListener("mouseleave", () => {
//         window.removeEventListener("mousemove", drag)
//     })

//     window.addEventListener("click", () => {
//         window.removeEventListener("mousemove", drag)
//     })
// }

// function clickedLineOne(){
//     const lineOne = document.querySelector(".camera-content-image-line-one");
//     const lineTwo = document.querySelector(".camera-content-image-line-two");

//     window.addEventListener("click", () => {
//         lineTwo.classList.remove("active");
//         lineOne.classList.add("active");
//     })
// }

// function clickedLineTwo(){
//     const lineOne = document.querySelector(".camera-content-image-line-one");
//     const lineTwo = document.querySelector(".camera-content-image-line-two");

//     window.addEventListener("click", () => {
//         lineOne.classList.remove("active");
//         lineTwo.classList.add("active");
//     })
// }

// function hoverNewFrame(){
//     const background = document.querySelector(".camera-content-image-opacity-background");
//     const frame = document.querySelector(".camera-content-image-new-frame");

//     background.addEventListener("mouseover", () => {
//         frame.classList.toggle("active");
//     })

//     background.addEventListener("mouseleave", () => {
//         frame.classList.toggle("active");
//     })

//     frame.addEventListener("mouseover", () => {
//         frame.classList.add("active");
//     })

//     frame.addEventListener("mouseleave", () => {
//         frame.classList.remove("active");
//     })
// }


// class Camera extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             example : ''
//         }
//     }

//     componentDidMount(){
//         moveLineOne();
//         moveLineTwo();
//         hoverNewFrame();

//         var lineOne = document.getElementById("lineTwo");
//         var style = lineOne.currentStyle || window.getComputedStyle(lineOne);

//         console.log("Line Two: Top=" + style.top + " and Left=" + style.left)
//     }



// export default Camera;



// ------------------------------ código funcional abaixo


// Libs
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// // Images
import movimentation from '../../assets/images/camera-movimentation-icon.svg';
import length_icon from '../../assets/images/camera-length-icon.svg';
import updown_icon from '../../assets/images/camera-up-down-icon.svg';
import leftright_icon from '../../assets/images/camera-left-right-icon.svg';
import image_frame from '../../assets/images/temporary/camera-image-frame.png';
import reload_icon from '../../assets/images/camera-reload-icon.svg';

// Styles
import '../../assets/styles/pages/camera2.css';

// Components
import Menu from '../../components/Menu.jsx'


// Está faltando REFATORAÇÃO!!!
const Camera = () => {

  const [linhaEditada, setLinhaEditada] = useState(1)

  const [idLinha1, setIdLinha1] = useState('')
  const [idLinha2, setIdLinha2] = useState('')

  const [largura, setLargura] = useState(0)
  const [marginTop, setMarginTop] = useState(0)
  const [marginLeft, setMarginLeft] = useState(0)

  const [largura2, setLargura2] = useState(0)
  const [marginTop2, setMarginTop2] = useState(0)
  const [marginLeft2, setMarginLeft2] = useState(0)

//   const [imagem, setImagem] = useState('https://miro.medium.com/max/1024/1*xDi2csEAWxu95IEkaNdFUQ.png')
  const [imagem, setImagem] = useState('')
  const [imagemTemporaria, setImagemTemporaria] = useState('')

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const [display, setDisplay] = useState('flex');

  const editarLinha = (id, linha) => {

    if(linha === 1) {
     
        axios.patch('http://localhost:5000/v1/lines/update/'+id, {
            Width: largura,
            MarginLeft: marginTop,
            MarginTop: marginLeft
        })
        .then(resposta => {
            console.log(resposta)
        })
    
        .catch(erro => console.log(erro))
    }else {
        axios.patch('http://localhost:5000/v1/lines/update/'+id, {
            Width: largura2,
            MarginLeft: marginTop2,
            MarginTop: marginLeft2
        })
        .then(resposta => {
            console.log(resposta)
        })
    
        .catch(erro => console.log(erro))
    }
    
  }

  const buscarLinhas = () => {
      axios.get('http://localhost:5000/v1/lines', {
        headers: {
           'Authorization' : 'Bearer ' + localStorage.getItem('user-token') 
        }
      })

      .then(resposta => {
        //   let dados = resposta.data.data
        console.log(resposta.data.data)

        setIdLinha1(resposta.data.data[0].id)
        setIdLinha2(resposta.data.data[1].id)

        setLargura(resposta.data.data[0].width)
        setLargura2(resposta.data.data[1].width)

        setMarginTop(resposta.data.data[0].marginLeft)
        setMarginTop2(resposta.data.data[1].marginLeft)
        
        setMarginLeft(resposta.data.data[0].marginTop)
        setMarginLeft2(resposta.data.data[1].marginTop)
      })

      .catch(erro => console.log(erro))
  }

  const receiveImage = async (event) => {

    setDisplay('flex')
    
    const reader = new FileReader()

    reader.onload = () => {
      if(reader.readyState === 2) {
        setImagem(reader.result)
        setImagemTemporaria(reader.result)
      }
    }
    
    reader.readAsDataURL(event.target.files[0])
    
    function wait(ms) {
        // retorna uma promessa depois do tempo que foi recebido
        return new Promise(r => setTimeout(r, ms));
    }

    await wait(10)
    
    calcularMedidas()
    
    setDisplay('none')
    console.log('uploaded')
  }
  
  const calcularMedidas = () => {
    // console.log(document.getElementById('img_').clientWidth)
    setWidth(document.getElementById('img_').clientWidth)
    setHeight(document.getElementById('img_').clientHeight)
  }

  const hoverNewFrame = () => {
    const background = document.querySelector(".main-img");
    const frame = document.querySelector(".camera-content-image-new-frame");

    background.addEventListener("mouseover", () => {
        frame.classList.toggle("active");
    })

    background.addEventListener("mouseleave", () => {
        frame.classList.toggle("active");
    })

    frame.addEventListener("mouseover", () => {
        frame.classList.add("active");
    })

    frame.addEventListener("mouseleave", () => {
        frame.classList.remove("active");
    })
}

  useEffect(() => {
    // calcularMedidas()
    // console.log('sim')
    buscarLinhas()
    hoverNewFrame()
  }, [imagem])

  return (
    <>
      <Menu>
          <div className="camera-background">
              <div className="camera-title">
                  <h2>Altere a sua área de risco</h2>
              </div>

              <div className="camera-content-background">
                <div className="camera-content-inputs-background">
                  <div className="camera-content-inputs">

                    <div className="camera-content-inputs-lines-title">
                        <p className="camera-content-inputs-title">Linhas</p>
                        <img src={movimentation} alt="Ícone de movimentação" draggable="false" />
                    </div>

                    <div className="camera-content-inputs-lines-main">
                        <div className="camera-content-inputs-lines-btn"><img src={length_icon} alt="Ícone de comprimento" draggable="false" /></div>
                        <input type="number" value={linhaEditada === 1 ? largura : largura2} onChange={e => linhaEditada === 1 ? setLargura(e.target.value) : setLargura2(e.target.value)} />
                    </div>

                    <div className="camera-content-inputs-lines-main">
                        <div className="camera-content-inputs-lines-btn"><img src={updown_icon} alt="Ícone de comprimento" draggable="false" /></div>
                        <input type="number" value={linhaEditada === 1 ? marginTop : marginTop2} onChange={e => linhaEditada === 1 ? setMarginTop(e.target.value) : setMarginTop2(e.target.value)} />
                    </div>

                    <div className="camera-content-inputs-lines-main">
                        <div className="camera-content-inputs-lines-btn"><img src={leftright_icon} alt="Ícone de comprimento" draggable="false" /></div>
                        <input type="number" value={linhaEditada === 1 ? marginLeft : marginLeft2} onChange={e => linhaEditada === 1 ? setMarginLeft(e.target.value) : setMarginLeft2(e.target.value)} />
                    </div>

                  </div>

                  <div className="camera-content-inputs-form-btn">
                      <button onClick={() => editarLinha(linhaEditada === 1 ? idLinha1 : idLinha2 , linhaEditada)} type="submit" title="Salvar alterações">Salvar alterações</button>
                      <input type="file" onChange={(e) => {
                        receiveImage(e)
                      }}/>
                      <button disabled>Cancelar alterações</button>
                  </div>
                </div>

                  <div className="camera-content-image-frame-main">
                    <div className="camera-content-image-dashed-border">
                      <div className="camera-content-image-new-frame">
                          <div className="camera-content-image-new-frame-reload">
                              <img src={reload_icon} alt="Ícone de reload" draggable="false" />
                          </div>

                          <div className="camera-content-image-new-frame-desc">
                              <p>Capturar outro frame</p>
                          </div>
                      </div>
                      
                      <div className="camera-content-image-frame-main">
                          <div className="camera-content-image-new-frame">
                              <div className="camera-content-image-new-frame-reload">
                                  <img src={reload_icon} alt="Ícone de reload" draggable="false" />
                              </div>

                              <div className="camera-content-image-new-frame-desc">
                                  <p>Capturar outro frame</p>
                              </div>
                          </div>
                          <div className="imagem-camera-background" style={{width: width, height: height, backgroundImage: `url(${imagem})`}}>
                            <div id="lineOne" className="camera-content-image-line-one-background">
                                <div className='selecionada' onClick={() => console.log(linhaEditada)}>Linha {linhaEditada} selecionada!</div>
                                <div onClick={() => setLinhaEditada(1)} style={{width: '7px', height: largura+'px', top: marginTop+'px', left: marginLeft+'px', border: linhaEditada === 1? 'solid 1px #FFF' : ''}} className="camera-content-image-line-one active"></div>
                            </div>

                            <div id="lineTwo" className="camera-content-image-line-two-background">
                                <div onClick={() => setLinhaEditada(2)} style={{width: '7px', height: largura2+'px', top: marginTop2+'px', left: marginLeft2+'px', border: linhaEditada === 2 ? 'solid 1px #FFF' : ''}} className="camera-content-image-line-two"></div>
                            </div>

                          </div>

                          <img className="main-img" style={{display: display}} id='img_' src={imagem}/>

                      </div>
                    </div>
                    
                  </div>
                
              </div>
          </div>
      </Menu>
    </>
  );
  
}

export default Camera;