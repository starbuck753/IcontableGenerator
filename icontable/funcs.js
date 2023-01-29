
/*-----------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------*/

function btnAdd_onclick() {
	if(cmbType.selectedIndex==0){
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

	} else{

		var tmpStr = new Array();
		var str = txtMulImg.value
		
		tmpStr = str.split(";");
		
		for(i=0; i<=tmpStr.length-1; i++)  {
			if(window.event){  // IE
				var newOpt;
				newOpt = document.createElement("OPTION");
				newOpt = new Option(tmpStr[i], tmpStr[i]);
				//newOpt.id = txtImg.value;
				lstUrls.add(newOpt);
			} else {  // Netscape/Firefox/Opera
				lstUrls.innerHTML = lstUrls.innerHTML + "<OPTION>" + tmpStr[i] + "</OPTION>";
			}

		}
		txtMulImg.value = "";

	}
	return preview();
}


function Mod(X, Y) {
    return X - Math.floor(X / Y) * Y;
}

function preview(){

	var tmpAlign;
	if (cmbAlign.selectedIndex == 0)
		tmpAlign = "";
	if (cmbAlign.selectedIndex == 1)
		tmpAlign = "align=\"center\"";
	if (cmbAlign.selectedIndex == 2)
		tmpAlign = "align=\"right\"";

	var tmpStr = "<table " + tmpAlign + " cellspacing=4 bgcolor=\"" + txtBgColor.value + "\">";
	
	var tmpCellBgColor = "bgcolor=\"" + txtCellColor.value + "\"";
	var tmpFontColor = "color=\"" + txtFontColor.value + "\"";
	var tmpStart = Number(txtStartNumber.value)-1;
	var tmpColBorder = txtBorColor.value;
		
	var tmpImgStyle = "";
	if(chkBorder.checked==true)
		tmpImgStyle = " style=\"border: 1px " + tmpColBorder + " solid; padding: 2px;\" ";

	
	var lb = document.getElementById('lstUrls');
	var cols = cmbCols.options[cmbCols.selectedIndex].value

	//window.alert(cols);

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
					if(i+(j+1)<=lb.length)
						tmpStr = tmpStr + "<td align=\"center\" " + tmpCellBgColor + "><font size=1 " + tmpFontColor + ">" + txtOptText.value + (tmpStart+i+(j+1)) + "</font></td>";
				}
				tmpStr = tmpStr + "</tr>";
			}

			tmpStr = tmpStr + "<tr>";
			fin=0;
		}

		//Nro en la izquierda
		if(cmbPos.selectedIndex==1)
			tmpStr = tmpStr + "<td valign=\"bottom\" " + tmpCellBgColor + "><font size=1 " + tmpFontColor + ">" + txtOptText.value + (tmpStart+i+1) + "</font></td>";


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

		tmpStr = tmpStr + "<td>" + tmpLinkI + "<img src=\"" + lb.options[i].value + "\"" + tmpWidth + tmpImgStyle + ">" + tmpLinkF + "</td>";

		if(Mod(i+1,cols) == 0){
			tmpStr = tmpStr + "</tr>";
			fin=1;

			//Nro debajo del icono
			if(cmbPos.selectedIndex==2){
				tmpStr = tmpStr + "<tr>";
				for(j=1; j<=cols; j++)  {
					tmpStr = tmpStr + "<td align=\"center\" " + tmpCellBgColor + "><font size=1 " + tmpFontColor + ">" + txtOptText.value + (tmpStart+i-cols+1+j) + "</font></td>";
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
				tmpStr = tmpStr + "<td align=\"center\" " + tmpCellBgColor + "><font size=1 " + tmpFontColor + ">" + txtOptText.value + (tmpStart+rows*cols-cols+i+1) + "</font></td>";
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


function btnUp_onclick() {
	var lb = document.getElementById('lstUrls');
	var aux = new Array();
	var pos = 0;

	for(i=0; i<lb.length; i++)  {
		aux[i] = lb.options[i];
		
		if(pos == 0){
			if(lb.options[i].selected){
				if (i == 0) return preview();
				
				pos = i - 1;
				aux[i] = aux[i-1]
				aux[i-1] = lb.options[i];
			}
		}
	}

	for(i=0; i<lb.length; i++)  {
		lstUrls.remove(i);
		lb = document.getElementById('lstUrls');
		i=-1;
	}

	for(i=0; i<aux.length; i++)  {
		if(window.event){  // IE
			lstUrls.add(aux[i]);
			if(i == pos) lb.options[i].selected = true;
		} else {  // Netscape/Firefox/Opera
			if(i == pos){
				lstUrls.innerHTML = lstUrls.innerHTML + "<OPTION selected>" + aux[i].value  + "</OPTION>";
			}else {
				lstUrls.innerHTML = lstUrls.innerHTML + "<OPTION>" + aux[i].value  + "</OPTION>";
			}
		}
	}

	return preview();
}



function btnDown_onclick() {

	var lb = document.getElementById('lstUrls');
	var aux = new Array();
	var pos = 0;

	for(i=lb.length-1; i>=0; i--)  {
		aux[i] = lb.options[i];
		
		if(pos == 0){
			if(lb.options[i].selected){
				if (i == lb.length-1) return preview();
				
				pos = i + 1;
				aux[i] = aux[i+1]
				aux[i+1] = lb.options[i];
			}
		}
	}

	for(i=0; i<lb.length; i++)  {
		lstUrls.remove(i);
		lb = document.getElementById('lstUrls');
		i=-1;
	}

	for(i=0; i<aux.length; i++)  {
		if(window.event){  // IE
			lstUrls.add(aux[i]);
			if(i == pos) lb.options[i].selected = true;
		} else {  // Netscape/Firefox/Opera
			if(i == pos){
				lstUrls.innerHTML = lstUrls.innerHTML + "<OPTION selected>" + aux[i].value  + "</OPTION>";
			}else {
				lstUrls.innerHTML = lstUrls.innerHTML + "<OPTION>" + aux[i].value  + "</OPTION>";
			}
		}
	}

	return preview();
}


function cmbType_onchange() {
	if(cmbType.selectedIndex==0){
		lblTypeTitle.innerHTML = "Image Url:"
		lblTypeText.innerHTML = "<INPUT id=\"txtImg\" style=\"WIDTH: 377px; HEIGHT: 22px\" size=48 onkeydown=\"return enter_url(event)\">"
	} else{
		lblTypeTitle.innerHTML = "Images Urls<br>(separated by ';'):"
		lblTypeText.innerHTML = "<TEXTAREA id=\"txtMulImg\" style=\"WIDTH: 377px;\"  rows=8 cols=40></TEXTAREA>"
	}
}

function chkThumb_onclick() {
	if(chkThumb.checked){
		txtWidth.disabled=false;
		chkLink.disabled=false;
	} else{
		txtWidth.disabled=true;
		chkLink.disabled=true;
	}
}

function chkBorder_onclick() {
	if(chkBorder.checked){
		txtBorColor.disabled=false;
	} else{
		txtBorColor.disabled=true;
	}
}

function txtCode_onfocus() {
	txtCode.select(txtCode.innerText);
}

function txtCode_onclick() {
	txtCode.select(txtCode.innerText);
}