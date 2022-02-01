function btnAdd_onclick() {

var tmpStr;
var i;

if(window.event){  // IE
	var newOpt;
	newOpt = document.createElement("OPTION");
	newOpt = new Option(txtImg.value, txtImg.value);
	//newOpt.id = txtImg.value;
	lstUrls.add(newOpt);
} else {  // Netscape/Firefox/Opera
	lstUrls.innerHTML = lstUrls.innerHTML + "<OPTION>" + txtImg.value + "</OPTION>";
}

txtImg.value = "";

return preview();
  
}

function Mod(X, Y) {
    return X - Math.floor(X / Y) * Y;
}

function preview(){

tmpStr = "<table cellspacing=4 bgcolor=\"" + txtBgColor.value + "\">";

var tmpCellBgColor = "bgcolor=\"" + txtCellColor.value + "\"";
var tmpFontColor = "color=\"" + txtFontColor.value + "\"";

var lb = document.getElementById('lstUrls');
var cb = document.getElementById('cmbCols');

cols = cmbCols.options[cmbCols.selectedIndex].value


//window.alert(cols);

//if(lb.length % cols == 0){
if(Mod(lb.length,cols) == 0){
	rows = lb.length / cols;
}else {
	rows = (lb.length -(lb.length % cols)) / cols + 1;
}


var tmpLinkI = "";
var tmpLinkF = "";
var tmpWidth = "";

var fin=0;

for(i=0; i<lb.length; i++)  {
	if(Mod(i+1,cols) == 1 || cols==1){

		//Nro sobre el icono
		if(cmbPos.selectedIndex==3){
			tmpStr = tmpStr + "<tr>";
			for(j=0; j<cols; j++)  {
				if(i+(j+1)<=lb.length){
					if (lb.options[i].value=="--"){
						tmpStr = tmpStr + "<td align=\"center\" " + tmpCellBgColor + "><font size=1 " + tmpFontColor + ">--</font></td>";
					}
					else{
						tmpStr = tmpStr + "<td align=\"center\" " + tmpCellBgColor + "><font size=1 " + tmpFontColor + ">" + (i+(j+1)) + "</font></td>";
					}
				}
			}
			tmpStr = tmpStr + "</tr>";
		}

		tmpStr = tmpStr + "<tr>";
		fin=0;
	}

	//Nro en la izquierda
	if(cmbPos.selectedIndex==1){
		if (lb.options[i].value=="--"){
			tmpStr = tmpStr + "<td valign=\"bottom\" " + tmpCellBgColor + "><font size=1 " + tmpFontColor + ">--</font></td>";
		}
		else{
			tmpStr = tmpStr + "<td valign=\"bottom\" " + tmpCellBgColor + "><font size=1 " + tmpFontColor + ">" + (i+1) + "</font></td>";
		}
	}

	//Si lleva link
	if(chkThumb.checked==true){
		if(chkLink.checked==true){
			tmpLinkI = "<a href=\"" + lb.options[i].value + "\" target=blank_>";
			tmpLinkF = "</a>";
		}

		if(txtWidth.value==""){
			tmpWidth = " width=230";
		}else {
			tmpWidth = " width=" + txtWidth.value;
		}
	}

	if (lb.options[i].value=="--"){
		tmpStr = tmpStr + "<td>--</td>";
	}
	else{
		tmpStr = tmpStr + "<td>" + tmpLinkI + "<img src=\"" + lb.options[i].value + "\"" + tmpWidth + ">" + tmpLinkF + "</td>";
	}
	
	if(Mod(i+1,cols) == 0){
		tmpStr = tmpStr + "</tr>";
		fin=1;

		//Nro debajo del icono
		if(cmbPos.selectedIndex==2){
			tmpStr = tmpStr + "<tr>";
			for(j=1; j<=cols; j++)  {
				tmpStr = tmpStr + "<td align=\"center\" " + tmpCellBgColor + "><font size=1 " + tmpFontColor + ">" + (i-cols+1+j) + "</font></td>";
				tmpStr = tmpStr + "<td align=\"center\" " + tmpCellBgColor + "><font size=1 " + tmpFontColor + ">" + (i-cols+1+j) + "</font></td>";
			}
			tmpStr =  tmpStr + "</tr>";
		}
	}
}


if(fin==0){
	tmpStr =  tmpStr + "</tr>";

	//Nro debajo del icono
	if(cmbPos.selectedIndex==2){
		tmpStr =  tmpStr + "<tr>";

		var cant = lb.length % cols;
		for(i=0; i<cant; i++)  {
			tmpStr = tmpStr + "<td align=\"center\" " + tmpCellBgColor + "><font size=1 " + tmpFontColor + ">" + (rows*cols-cols+i+1) + "</font></td>";
		}
		tmpStr =  tmpStr + "</tr>";
	}
}

tmpStr =  tmpStr + "</table>";

txtCode.value = tmpStr;
lblTable.innerHTML = tmpStr;

}

function btnDelete_onclick() {

var lb = document.getElementById('lstUrls');

for(i=0; i<lb.length; i++)  {
	if(lb.options[i].selected){
		lstUrls.remove(i);
		lb = document.getElementById('lstUrls');
		i=-1;
	}

}

return preview();

}

function elimina(pKey) {

var keynum
var lb

if(window.event){  // IE
	keynum = pKey.keyCode
} else if(pKey.which) {  // Netscape/Firefox/Opera
	keynum = pKey.which
}

lb = document.getElementById('lstUrls');

if(keynum == 46){
	for(i=0; i<lb.length; i++)  {
		if(lb.options[i].selected){
			lstUrls.remove(i);
			lb = document.getElementById('lstUrls');
			i=-1;
		}
	}
}

return preview();

}

function enter_url(pKey) {

var keynum

if(window.event){  // IE
	keynum = pKey.keyCode
} else if(pKey.which) {  // Netscape/Firefox/Opera
	keynum = pKey.which
}

if(keynum == 13){
	return btnAdd_onclick();
}

}

function btnClear_onclick() {

txtCode.value = "";
lblTable.innerHTML = "";

}
