
function lastModified(){

  lastmod = document.lastModified     // get string of last modified date
  lastmoddate = Date.parse(lastmod)   // convert modified string to date
  if(lastmoddate == 0){               // unknown date (or January 1, 1970 GMT)
     document.writeln("[Updated: Unknown]")
     } else {
	 d = new Date(lastmod);
     document.writeln("[Updated: " + d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + "]")
  }

}

/*function writepics(homepage) {

	var folder;
	if (homepage==1)
	{
		folder = "images/";
	}else
	{
		str = str + "../images/";
	}

	var str;
	str = "<section class=\"slider\"><div class=\"flexslider\"><ul class=\"slides\">";	
	str = str + "<li><img src=\"" + folder + "header_01.png\" /></li>";
	str = str + "<li><img src=\"" + folder + "header_02.png\" /></li>";
	str = str + "<li><img src=\"" + folder + "header_03.png\" /></li>";
	str = str + "</ul></div></section>";	
	document.write(str);
}*/


function writemenunav(page) {

	var pressed = new Array();
	var folder;

	folder = "../";

	switch (page){
		case "home":
			folder = "/";
			pressed[1] = "pressed";
			break;
		case "icontable":
			pressed[2] = "pressed";
			break;
		case "picspam":
			pressed[3] = "pressed";
			break;
		case "profile":
			pressed[4] = "pressed";
			break;
		case "votescounter":
			pressed[5] = "pressed";
			break;
		case "art":
			pressed[6] = "pressed";
			break;
		case "about":
			folder = "/";
			pressed[7] = "pressed";
			break;
		case "feedback":
			folder = "/";
			pressed[8] = "pressed";
			break;
	}
	
	var str;
	str = "<label for=\"menuopen\">&#9776;</label><input type=\"checkbox\" name=\"menuopen\" id=\"menuopen\" checked>";
	str = str + "<ul class=\"menu\"><li><A class=\"menu " + pressed[1] + "\" href=\"" + folder + "index.htm\">Home</A></li>";	
	str = str + "<li><A class=\"" + pressed[2] + "\" href=\"" + folder + "icontable/\">Icon Table Generator</A></li>";
	str = str + "<li><A class=\"" + pressed[3] + "\" href=\"" + folder + "bannertable/\">Picspam Generator</A></li>";
	str = str + "<li><A class=\"" + pressed[4] + "\" href=\"" + folder + "profilemaker/\">Profile Generator</A></li>";
	str = str + "<li><A class=\"" + pressed[5] + "\" href=\"" + folder + "votecounter/\">Votes Counter</A></li>";
	str = str + "<li><A class=\"" + pressed[6] + "\" href=\"" + folder + "art/\">Art</A></li>";
	str = str + "<li><A class=\"" + pressed[7] + "\" href=\"" + folder + "about.htm\">About</A></li>";
	str = str + "<li><A class=\"" + pressed[8] + "\" href=\"" + folder + "feedback.htm\">Feedback</A></li></ul>";
	document.write(str);

	/*var str;
	str = "<A class=\"button btnPurple " + pressed[1] + "\" href=\"" + folder + "index.htm\">Home</A>";	
	str = str + "<A class=\"button btnOrange " + pressed[2] + "\" href=\"" + folder + "icontable/\">Icon Table Generator</A>";
	str = str + "<A class=\"button btnOrange " + pressed[3] + "\" href=\"" + folder + "bannertable/\">Picspam Generator</A>";
	str = str + "<A class=\"button btnOrange " + pressed[4] + "\" href=\"" + folder + "profilemaker/\">Profile Generator</A>";
	str = str + "<A class=\"button btnOrange " + pressed[5] + "\" href=\"" + folder + "votecounter/\">Votes Counter</A>";
	str = str + "<A class=\"button btnGreen " + pressed[6] + "\" href=\"" + folder + "art/\">Art</A>";
	str = str + "<A class=\"button btnBlue right " + pressed[7] + "\" href=\"" + folder + "about.htm\">About</A>";
	str = str + "<A class=\"button btnBlue right " + pressed[8] + "\" href=\"" + folder + "feedback.htm\">Feedback</A>";
	document.write(str);*/

}


function abouticon() {

var str;

var rand1 = Math.floor((Math.random()*7)+1);
str = "<img src=\"images/icon_" + rand1 + ".png\" />";

document.write(str);
}