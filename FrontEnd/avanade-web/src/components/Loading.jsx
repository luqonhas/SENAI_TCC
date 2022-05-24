// Libs
import React, { Component } from "react";

// Styles
import "../assets/styles/reset.css";
import "../assets/styles/components/loading.css";

// Images
import loading from "../assets/images/loading-screen-logo.svg";
import { Fade } from "react-bootstrap";

function loadingFadeOut(){
    const target = document.getElementById("loader-wrapper");
    target.style.opacity = '0';
    target.style.position = "absolute";
    target.style.overflow = "auto";
    target.style.zIndex = -2;  
}

class Loading extends Component {
    componentDidMount(){
        window.onload = function(){
            loadingFadeOut();
        }
        
    }

    render(){
        return(
            <>
                <div id="loader-wrapper" class="loader-wrapper">
                    <img className="loader" src={loading} draggable="false" />
                </div>
            </>
        )
    }
}

export default Loading;