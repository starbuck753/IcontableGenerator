function btnCount_onclick() {

var str = txtVotes.value;
var lineas = str.split("\n");
var aIcons = new Array();
var aOrden = new Array();

var cant = txtCant.value;


for (i = 1; i <= cant; i++) {
	aIcons[i] = 0;
}


for (i = 0; i < lineas.length; i++) {
	str = lineas[i];
	
	var pp = str.search(".")
	while (pp > 0) {
		str = str.replace(".",",");
		pp = str.search(".");
	}
	
	pp = str.search(";")
	while (pp > 0) {
		str = str.replace(";",",");
		pp = str.search(";");
	}

    var numeros = str.split(",");
	
	
	str = txtValues.value;
	if (str == ""){
		str = "3,2,1";
	}
	var valores = str.split(",");
	
	for (n = 0; n < numeros.length; n++) {
		str = numeros[n];
		var icon = parseInt(str,10);

		//document.getElementById("resultado").innerHTML += aIcons[icon] + "<br>";

		aIcons[icon] = aIcons[icon] + parseInt(valores[n],10);

		/*if (n == 0){
			aIcons[icon] = aIcons[icon] + parseInt(valores[0],10);//3;
		}
		if (n == 1){		
			aIcons[icon] = aIcons[icon] + parseInt(valores[1],10);//2;
		}
		if (n == 2){		
			aIcons[icon] = aIcons[icon] + parseInt(valores[2],10);//1;
		}*/
		
	}
	//document.getElementById("resultado").innerHTML = aIcons[23];

}

document.getElementById("resultado").innerHTML = ""


for (n = 1; n < aIcons.length; n++) {
    aOrden[n] = n
}

for (n = 1; n < aIcons.length - 1; n++) {
	for (m = (n+1); m < aIcons.length; m++) {
		if (aIcons[m] > aIcons[n]) {
            var a = aIcons[n]
            aIcons[n] = aIcons[m]
            aIcons[m] = a
            
            a = aOrden[n]
            aOrden[n] = aOrden[m]
            aOrden[m] = a
		}
	}
}

var oB, cB;

for (n = 1; n < aIcons.length; n++) {
	oB = "";
	cB = "";
	
	if (n <= 3) {
		oB = "<b>";
		cB = "</b>";
	}
	
	document.getElementById("resultado").innerHTML += oB + "Item: " + aOrden[n] + " - Votes: " + aIcons[n] + cB + "<br>";
}

}



function btnClean_onclick() {

var str = txtVotes.value;
var lineas = str.split("\n");
var nLineas = new Array();


txtVotes.value = ""

for (i = 0; i < lineas.length; i++) {
	str = lineas[i];
	var valores = str.split(" -- ");
	
	nLineas[i] = valores[1];

	txtVotes.value = txtVotes.value + valores[1] + "\n";
}




}
