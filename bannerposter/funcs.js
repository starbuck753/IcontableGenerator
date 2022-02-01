
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
	//txtImgText.value = "";

} else{

	var tmpStr = new Array();
	var str;
	
	str = txtMulImg.value
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

function btnAddTxt_onclick() {

	var str = txtImgText.value;
	str = "[Text]" + str;
	str = str.replace("<","< ");
	
	
	if(window.event){  // IE
		var newOpt;
		newOpt = document.createElement("OPTION");
		newOpt = new Option(str, str);
		//newOpt.id = txtImg.value;
		lstUrls.add(newOpt);
	} else {  // Netscape/Firefox/Opera
		lstUrls.innerHTML = lstUrls.innerHTML + "<OPTION>" + str + "</OPTION>";
	}
	
	txtImgText.value = "";
 
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


var tmpAlignText;
if (cmbTextAlign.selectedIndex == 0)
	tmpAlignText = " ";
if (cmbTextAlign.selectedIndex == 1)
	tmpAlignText = "align=\"center\" ";
if (cmbTextAlign.selectedIndex == 2)
	tmpAlignText = "align=\"right\" ";

tmpPre = "<table " + tmpAlign + " cellspacing=4 bgcolor=\"" + txtBgColor.value + "\">";
tmpStr = "<table " + tmpAlign + " cellspacing=4 bgcolor=\"" + txtBgColor.value + "\">";

var tmpCellBgColor = "bgcolor=\"" + txtCellColor.value + "\"";
var tmpFontColor = "color=\"" + txtFontColor.value + "\"";

var tmpImgStyle = "";
var tmpColBorder;

if(txtBorColor.value==""){
	tmpColBorder = "#dddddd";
}else{
	tmpColBorder = txtBorColor.value;
}
	
if(chkBorder.checked==true)
	tmpImgStyle = " style=\"border: 1px " + tmpColBorder + " solid; padding: 2px;\" ";


var lb = document.getElementById('lstUrls');
//var cb = document.getElementById('cmbCols');

//cols = cmbCols.options[cmbCols.selectedIndex].value


//window.alert(cols);

//if(lb.length % cols == 0){
//if(Mod(lb.length,cols) == 0){
//	rows = lb.length / cols;
//}else {
//	rows = (lb.length -(lb.length % cols)) / cols + 1;
//}

var tmpLinkI = "";
var tmpLinkF = "";
var tmpWidth = "";

var fin=0;

for(i=0; i<lb.length; i++)  {

	var tmpOptStr = new Array();
	var str;
	var strSpa = "";
	
	str = lb.options[i].value;
	
	if(i > 0){
		strSpa = "<br>";
	}
	
	//Texto sobre el icono
	//if(cmbPos.selectedIndex==3){
	if(str.substr(0,6)=="[Text]"){
		tmpPre = tmpPre + "<tr><td " + tmpAlignText + tmpCellBgColor + ">" + strSpa + "<font size=1 " + tmpFontColor + ">" + str.substr(6,str.length) + "</font></td></tr>";

		str = str.replace("< ","<");
		tmpStr = tmpStr + "<tr><td " + tmpAlignText + tmpCellBgColor + ">" + strSpa + "<font size=1 " + tmpFontColor + ">" + str.substr(6,str.length) + "</font></td></tr>";
	}else {
		//Si lleva link
		if(chkThumb.checked==true){
			if(chkLink.checked==true){
				tmpLinkI = "<a href=\"" + str + "\" target=blank_>";
				tmpLinkF = "</a>";
			}
	
			if(txtWidth.value==""){
				tmpWidth = " width=230";
			}else {
				tmpWidth = " width=" + txtWidth.value;
			}
		}
		tmpPre = tmpPre + "<tr><td>" + tmpLinkI + "<img src=\"" + str + "\"" + tmpWidth + tmpImgStyle + ">" + tmpLinkF + "</td></tr>";
		tmpStr = tmpStr + "<tr><td>" + tmpLinkI + "<img src=\"" + str + "\"" + tmpWidth + tmpImgStyle + ">" + tmpLinkF + "</td></tr>";
	}
}

tmpPre =  tmpPre + "</table>";
tmpStr =  tmpStr + "</table>";

txtCode.value = tmpStr;
lblTable.innerHTML = tmpPre;

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


function enter_txt(pKey) {

var keynum

if(window.event){  // IE
	keynum = pKey.keyCode
} else if(pKey.which) {  // Netscape/Firefox/Opera
	keynum = pKey.which
}

if(keynum == 13){
	return btnAddTxt_onclick();
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
