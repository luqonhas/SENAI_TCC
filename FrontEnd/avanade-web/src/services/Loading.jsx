export function loadingFadeOut(){
    setInterval(function(){ 
        var target = document.getElementById("loader-wrapper");
        var html = document.querySelector("html");
        html.classList.add("loading")
        target.style.opacity = 0;
        target.style.position = "absolute";
        target.style.zIndex = -2;           
    }, 5000);
}

export function removeHiddenOverflow(){
    const html = document.querySelector("html");
    html.classList.remove("loading");
}