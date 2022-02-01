function window_onload() {

var randnum = Math.random();
//var inum = 9;
var rand1 = Math.floor(Math.random() * 10) * 3 + 1;
var rand2 = Math.floor(Math.random() * 10) * 3 + 2;
var rand3 = Math.floor(Math.random() * 10) * 3 + 3;

imgheader1.src = "../images/icon_" + rand1 + ".png";
imgheader2.src = "../images/icon_" + rand2 + ".png";
imgheader3.src = "../images/icon_" + rand3 + ".png";


txtCode.value = "";
lblTable.innerHTML = "";


//Carga los profiles!!
return pageSelect(1);


}



/*

var forReading = 1, forWriting = 2, forAppending = 8;

// define array to store lines. 
rline = new Array();

// Create the object 
fs = new ActiveXObject("Scripting.FileSystemObject");
f = fs.GetFile("profiles.txt");

// Open the file 
is = f.OpenAsTextStream(forReading, 0);

// start and continue to read until we hit
// the end of the file. 
var count = 0;
while(!is.AtEndOfStream ){
   rline[count] = is.ReadLine();
   count++;
}

// Close the stream 
is.Close();

*/
/*

// Place the contents of the array into a variable. 
for(i = 0; i < rline.length; i++){
	var profile = rline[i].split("|");
	if(window.event){  // IE
		var newOpt;
		newOpt = document.createElement("OPTION");
		newOpt = new Option(profile[0], profile[0]);
		//newOpt.id = txtImg.value;
		lstProfiles.add(newOpt);
	} else {  // Netscape/Firefox/Opera
		lstProfiles.innerHTML = lstProfiles.innerHTML + "<OPTION>" + profile[0] + "</OPTION>";
	}
}
*/


