

 var perline = 15;
 var divSet = false;
 var curId; // pick1214954361
 var colorLevels = Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
 var colorArray = Array();
 var ie = false;
 var nocolor = 'none';
 if (document.all) { ie = true; nocolor = ''; }
 
 function getObj(id) {
	if (ie) { return document.all[id]; } 
	else {	return document.getElementById(id);	}
 }

 function addColor(r, g, b) {
	var red = colorLevels[r];
	var green = colorLevels[g];
	var blue = colorLevels[b];
	addColorValue(red, green, blue);
 }

 function addColorValue(r, g, b) {
	colorArray[colorArray.length] = '#' + r + r + g + g + b + b;
 }
 
 function setColor(color) {
	var link = getObj(curId);
	var field = getObj('txt' + curId);
	var picker = getObj('colorpicker');
	field.value = color;
	if (color == '') {
		link.style.background = nocolor;
		link.style.color = nocolor;
		color = nocolor;
	} else {
		link.style.background = color;
		link.style.color = color;
	}
	picker.style.display = 'none';
	eval(getObj('txt' + curId).title);
}
	
 function setDiv() {     
	if (!document.createElement) { return; }
	var elemDiv = document.createElement('div');
	if (typeof(elemDiv.innerHTML) != 'string') { return; }
	genColors();
	elemDiv.id = 'colorpicker';
	elemDiv.style.position = 'absolute';
	elemDiv.style.display = 'none';
	elemDiv.style.border = '#000000 1px solid';
	elemDiv.style.background = '#FFFFFF';
	elemDiv.innerHTML = '<span style="font-family:Verdana; font-size:11px;">'
		+ getColorTable() 
		+ 'Pick a color:  (<a href="javascript:setColor(\'\');">No color</a>)</span>';

	document.body.appendChild(elemDiv);
	divSet = true;
 }
 
 function pickColor(id) {
	if (!divSet) { setDiv(); }
	var picker = getObj('colorpicker');     	
	if (id == curId && picker.style.display == 'block') {
		picker.style.display = 'none';
		return;
	}
	curId = id;
	var thelink = getObj(id);
	picker.style.top = getAbsoluteOffsetTop(thelink) + 20;
	picker.style.left = getAbsoluteOffsetLeft(thelink);     
	picker.style.display = 'block';
 }
 
 function genColors() {
	addColorValue('0','0','0');
	addColorValue('1','1','1');
	addColorValue('2','2','2');
	addColorValue('3','3','3');
	addColorValue('4','4','4');
	addColorValue('5','5','5');
	addColorValue('6','6','6');
	//addColorValue('7','7','7');
	addColorValue('8','8','8');
	addColorValue('9','9','9');                
	addColorValue('A','A','A');
	addColorValue('B','B','B');
	addColorValue('C','C','C');
	addColorValue('D','D','D');
	addColorValue('E','E','E');
	addColorValue('F','F','F');                                
		
	for (a = 1; a < colorLevels.length; a++)
		addColor(0,0,a);

	for (a = 1; a < colorLevels.length; a++)
		addColor(0,a,0);
		
	for (a = 1; a < colorLevels.length; a++)
		addColor(a,0,0);
		
		
	for (a = 1; a < colorLevels.length; a++)
		addColor(a,a,0);
		
	for (a = 1; a < colorLevels.length; a++)
		addColor(0,a,a);

	for (a = 1; a < colorLevels.length; a++)
		addColor(a,0,a);			
		
	return colorArray;
 }
 function getColorTable() {
	 var colors = colorArray;
	 var tableCode = '';
	 tableCode += '<table border="0" cellspacing="1" cellpadding="1">';
	 for (i = 0; i < colors.length; i++) {
		  if (i % perline == 0) { tableCode += '<tr>'; }
		  tableCode += '<td bgcolor="#000000"><a style="outline: 1px solid #000000; color: ' 
			  + colors[i] + '; background: ' + colors[i] + ';font-size: 10px;" title="' 
			  + colors[i] + '" href="javascript:setColor(\'' + colors[i] + '\');">&nbsp;&nbsp;&nbsp;</a></td>';
		  if (i % perline == perline - 1) { tableCode += '</tr>'; }
	 }
	 if (i % perline != 0) { tableCode += '</tr>'; }
	 tableCode += '</table>';
	 return tableCode;
 }
 function putColor(id, color) {
	var link = getObj(id);
	if (color == '') {
		link.style.background = nocolor;
		link.style.color = nocolor;
		color = nocolor;
	} else {
		link.style.background = color;
		link.style.color = color;
	}
	eval(getObj(id + 'field').title);
 }
 function getAbsoluteOffsetTop(obj) {
	var top = obj.offsetTop;
	var parent = obj.offsetParent;
	while (parent != document.body) {
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
 }
 
 function getAbsoluteOffsetLeft(obj) {
	var left = obj.offsetLeft;
	var parent = obj.offsetParent;
	while (parent != document.body) {
		left += parent.offsetLeft;
		parent = parent.offsetParent;
	}
	return left;
 }



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

tmpStr = "<table " + tmpAlign + " cellspacing=4 bgcolor=\"" + txtBgColor.value + "\">";

var tmpCellBgColor = "bgcolor=\"" + txtCellColor.value + "\"";
var tmpFontColor = "color=\"" + txtFontColor.value + "\"";
var tmpStart = Number(txtStartNumber.value)-1;

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
