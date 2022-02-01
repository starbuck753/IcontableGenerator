
var getbanner = (function(){

	$.get( "pics.txt", function( data ) {

		var str;
		allText = data;
		lines = data.split("\n"); // Will separate each line into an array	

		var total = lines.length;
		var rand1 = Math.floor((Math.random()*total));
		do{
			var rand2 = Math.floor((Math.random()*total));
		}while(rand2==rand1);
		do{
			var rand3 = Math.floor((Math.random()*total));
		}while(rand3==rand2 || rand3==rand1);
		
		str = "<a href=\"" + lines[rand1] + "\"><img height=180 src=\"images/banner_0" + (rand1+1)+ ".png\" /></a><br>";
		str = str + "<a href=\"" + lines[rand2] + "\"><img height=180 src=\"images/banner_0" + (rand2+1) + ".png\" /></a><br>";
		str = str + "<a href=\"" + lines[rand3] + "\"><img height=180 src=\"images/banner_0" + (rand3+1) + ".png\" /></a>";

		$("#banners").html(str);
    });
});
