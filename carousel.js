window.onload = function () {
    // Variables
    const TIEMPO_INTERVALO_MILESIMAS_SEG = 3000;
    let posicionActual = 0;
    let $imagen = document.querySelector('#imagen');
    let intervalo;

    
    // Set the images list 
    let lista = new Array();

    for (n=0; n<= 80; n++){
        lista[n] = n+1;
    }
    for (n=0; n<=80; n++){
        var rand1 = Math.floor((Math.random()*81));
        val = lista[n];
        lista[n] = lista[rand1];
        lista[rand1] = val;
    }

    // Funciones
    function isroot(){
        return (document.head.id == "root");
    }
    function sethome(phome){
        home = phome;
    }
    function pasarFoto() {
        if(posicionActual >= 8) {
            posicionActual = 0;
        } else {
            posicionActual++;
        }
        renderizarimagen();
    }

    function renderizarimagen(){
        //$imagen.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
        let str;
        str = "<p>"
        for (n=0; n<=8; n++){
            if (isroot()){
                str = str + "<img class=\"carouselimg\"src=\"images/icon_" + lista[(posicionActual*9)+n] + ".png\" />"
            }else{
                str = str + "<img class=\"carouselimg\"src=\"../images/icon_" + lista[(posicionActual*9)+n] + ".png\" />"
            }
        }
        str = str + "</p>"
        $imagen.innerHTML = str
    }
    // Inicio
    renderizarimagen();
    intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
} 
