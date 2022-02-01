
function writepics {

var str;
var lista = new Array();

for (n=0; n<= 22; n++){
	lista[n] = n+1;
}
for (n=0; n<=22; n++){
	var rand1 = Math.floor((Math.random()*23));
	val = lista[n];
	lista[n] = lista[rand1];
	lista[rand1] = val;
}

str = "<section class=\"slider\"><div class=\"flexslider carousel\"><ul class=\"slides\">";

for (n=0; n<=22; n++){
	str = str + "<li><img src=\"http://silvinscorner.awardspace.com/tumblr/icon_" + lista[n] + ".png\" /></li>\n";
}

str = str + "</ul></div></section>";

document.write(str);
}