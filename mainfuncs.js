
function lastModified(){

  lastmod = document.lastModified     // get string of last modified date
  lastmoddate = Date.parse(lastmod)   // convert modified string to date
  if(lastmoddate == 0){               // unknown date (or January 1, 1970 GMT)
     document.writeln("(Updated: Unknown)")
     } else {
	 d = new Date(lastmod);
     document.writeln("(Updated: " + d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + ")")
  }

}

function writepics(homepage) {

var str;
var lista = new Array();

for (n=0; n<= 76; n++){
	lista[n] = n+1;
}
for (n=0; n<=76; n++){
	var rand1 = Math.floor((Math.random()*77));
	val = lista[n];
	lista[n] = lista[rand1];
	lista[rand1] = val;
}

str = "<section class=\"slider\"><div class=\"flexslider carousel\"><ul class=\"slides\">";

for (n=0; n<=76; n++){
	if (homepage==1)
	{
		str = str + "<li><img src=\"images/icon_" + lista[n] + ".png\" /></li>\n";
	}else
	{
		str = str + "<li><img src=\"../images/icon_" + lista[n] + ".png\" /></li>\n";
	}
}

str = str + "</ul></div></section>";

document.write(str);
}