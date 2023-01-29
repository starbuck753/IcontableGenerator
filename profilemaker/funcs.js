function getProfiles() {

var txtFile = new XMLHttpRequest();
txtFile.open("GET", "profiles.txt", true);

txtFile.onreadystatechange = function() {
	if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
		if (txtFile.status === 200) {  // Makes sure it's found the file.
			allText = txtFile.responseText;
			lines = txtFile.responseText.split("\n"); // Will separate each line into an array
			pages = Math.ceil(lines.lenght / 6)
			
			tmpStr = "<TABLE><TR><TD colspan=3>"  + allText;
			
			tmpStr = tmpStr + "vfdvdf | </TD></TR></TABLE>";

		}
	}
}

tabProfile.innerHTML = tmpStr; 

txtFile.send();

}


function selProfiles(){

var lb = document.getElementById('lstProfiles');

for(i=0; i<lb.length; i++)  {
	if(lb.options[i].selected){
		var text = lb.options[i].value;
		var strName = text.split("|");
		lblPrev.innerHTML = "<img src=\"profiles/" + strName[1] + ".png\" width=270>";
	}
}

return preview();

}


function getFile(strUrl){

var txtFile = new XMLHttpRequest();

txtFile.open("GET", strUrl, true);
txtFile.onreadystatechange = function() {
	if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
		if (txtFile.status === 200) {  // Makes sure it's found the file.
			tmpStr = txtFile.responseText;

			if(txtTitle1.value != ""){
				tmpStr = tmpStr.replace("title#1", txtTitle1.value);
			}
			if(txtTitle2.value != ""){
				tmpStr = tmpStr.replace("title#2", txtTitle2.value);
			}
			if(txtTitle3.value != ""){
				tmpStr = tmpStr.replace("title#3", txtTitle3.value);
			}

			if(txtText1.value != ""){
				tmpStr = tmpStr.replace("text#1", txtText1.value);
			}
			if(txtText2.value != ""){
				tmpStr = tmpStr.replace("text#2", txtText2.value);
			}
			if(txtText3.value != ""){
				tmpStr = tmpStr.replace("text#3", txtText3.value);
			}

			tmpStr = tmpStr.replace(/\n/g, "<br>");

			txtCode.value = tmpStr;
			lblTable.innerHTML = tmpStr.replace(/<lj user/g, "< lj user");
			
			}
	}
}
txtFile.send();

}



function preview(){

/*var tmpStr;

var lb = document.getElementById('lstProfiles');


for(i=0; i<lb.length; i++)  {
	if(lb.options[i].selected){
		var text = lb.options[i].value;
		var strName = text.split("|");
		break;
	}
}*/


//var strUrl = "profiles/" + strName[1] + ".txt";

return getFile("profiles/" + selProfile + ".txt")


/*txtCode.value = tmpStr;
lblTable.innerHTML = tmpStr;*/

}


function pageSelect(page) {

lines = new Array();

if (PageId.value==1) {
	lines = GetLinesProf();
}
if (PageId.value==2) {
	lines = GetLinesType();
}


var pages = Math.ceil(lines.length/6);

tmpStr = "<TABLE align=center cellpadding=4 class=\"tabSelect\"><TR>";

for(i = 1; i <= pages; i++){
	if (i==page) {
		tmpColor = "bgcolor=#ffdda1"
	} else {
		tmpColor = ""
	}
	tmpStr = tmpStr + "<TD id=\"page" + i + "\" " + tmpColor + " onClick=\"return pageSelect(" + i + ")\">" + i + "</TD>";
}
tmpStr = tmpStr + "</TR></TABLE>";

inicio = lines.length - (page - 1) * 6;

tmpStr = tmpStr + "<TABLE class=\"tabSelect\"><TR>";
for(i = inicio-1; i >= inicio-6; i--){
	if (i==inicio-4) { 
		tmpStr = tmpStr + "</TR><TR>";
	}
	
	if (i>=0) {
		var strImage = lines[i].split("|");
		tmpStr = tmpStr + "<TD><IMG style=\"border: 1px #dddddd solid; padding: 3px;\" src=\"images/" + strImage[0] + "\" onClick=\"return selectProfile('" + strImage[1] + "')\"></TD>";
		//tmpStr = tmpStr + "<TD>" + strImage[0] + "</TD>";
	} else {
		tmpStr = tmpStr + "<TD></TD>";
	}
}
tmpStr = tmpStr + "</TR></TABLE>";

tabProfile.innerHTML = tmpStr;

}


function selectProfile(strProfile) {

	selProfile = strProfile;

	if (PageId.value==2){
		//Cargar Specific Settings
		
	}

	return preview();
}


function GetLinesProf(){

lines = new Array();

lines[0] = "pt_ltm_tease_pvw.png|pt_ltm_tease";
lines[1] = "pt_ltm_relax_pvw.png|pt_ltm_relax";
lines[2] = "pt_ltm_kiss_pvw.png|pt_ltm_kiss";
lines[3] = "pt_castle_cb_pvw.png|pt_castle_cb";
lines[4] = "pt_castle_kb_pvw.png|pt_castle_kb";
lines[5] = "bbif_stana_pvw.png|bbif_stana";
lines[6] = "bbif_huddy_pvw.png|bbif_huddy";
lines[7] = "bb_ban_couch_pvw.png|bb_ban_couch";
lines[8] = "bb_ban_examine_pvw.png|bb_ban_examine";
lines[9] = "2p_stanabw_pvw.png|2p_stanabw";
lines[10] = "2p_castlebw_pvw.png|2p_castlebw";
lines[11] = "2p_castle_cb1_pvw.png|2p_castle_cb1";
lines[12] = "2p_castle_cute_pvw.png|2p_castle_cute";
lines[13] = "2p_stana_sx_pvw.png|2p_stana_sx";
lines[14] = "bit_castle_bl_pvw.png|bit_castle_bl";
lines[15] = "bit_stana_pk_pvw.png|bit_stana_pk";
lines[16] = "1p_stana_cute_pvw.png|1p_stana_cute";
lines[17] = "1p_stana_smile_pvw.png|1p_stana_smile";
lines[18] = "tb_cb_kiss_pvw.png|tb_cb_kiss";
lines[19] = "tb_cb_pool_pvw.png|tb_cb_pool";
lines[20] = "tb_ns_desk_pvw.png|tb_ns_desk";
lines[21] = "tb_ns_hold_pvw.png|tb_ns_hold";
lines[22] = "tb_ns_kiss_pvw.png|tb_ns_kiss";
lines[23] = "tb_ns_cute_pvw.png|tb_ns_cute";
lines[24] = "tb_ns_phone_pvw.png|tb_ns_phone";
lines[25] = "tb_ns_bite_pvw.png|tb_ns_bite";

return lines;

}

function GetLinesType(){

lines = new Array();

lines[0] = "bbif_stana_pvw.png|bbif_stana";
lines[1] = "bb_ban_examine_pvw.png|bb_ban_examine";
lines[2] = "2p_castle_cute_pvw.png|2p_castle_cute";
lines[3] = "bit_stana_pk_pvw.png|bit_stana_pk";
lines[4] = "1p_stana_cute_pvw.png|1p_stana_cute";
lines[5] = "tb_ns_bite_pvw.png|tb_ns_bite";

return lines;

}


function txtCode_onfocus() {
	txtCode.select(txtCode.innerText);
}

function txtCode_onclick() {
	txtCode.select(txtCode.innerText);
}