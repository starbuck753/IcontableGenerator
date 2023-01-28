window.onload = function () {
    // Variables
    const TIEMPO_INTERVALO_MILESIMAS_SEG = 3000;
    let posicionActual = 0;
    let $imagen = document.querySelector('#imagen');
    let intervalo;

    
    // Set the images list 
    let lista = new Array();

    for (n=0; n<= 79; n++){
        lista[n] = n+1;
    }
    for (n=0; n<=79; n++){
        var rand1 = Math.floor((Math.random()*80));
        val = lista[n];
        lista[n] = lista[rand1];
        lista[rand1] = val;
    }

    // Funciones
    function isroot(){
        return (document.head.id == "root");
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
        let rand = Math.floor((Math.random()*7));
        let str = "<p>"
        let n = 0
        while (n<=7){
            if (n==rand){
                if (isroot()){
                    str = str + "<img class=\"carouselimg\"src=\"images/icon.png\" />"
                }else{
                    str = str + "<img class=\"carouselimg\"src=\"../images/icon.png\" />"
                }
            }
            if (isroot()){
                str = str + "<img class=\"carouselimg\"src=\"images/icon_" + lista[(posicionActual*9)+n] + ".png\" />"
            }else{
                str = str + "<img class=\"carouselimg\"src=\"../images/icon_" + lista[(posicionActual*9)+n] + ".png\" />"
            }
            n++;
        }

        str = str + "</p>"
        $imagen.innerHTML = str
    }

    // Inicio
    renderizarimagen();
    intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
} 
