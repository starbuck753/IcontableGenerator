<?php
/*
Script Name: Mail-it Now! Upload2Server
Script URI: http://www.skyminds.net/scripts-php-mysql/
Description: Easy to use form2mail with multiple-uploads functionality.
Version: 1.5.3
Author: Matt Biscay
Author URI: http://www.skyminds.net/
Licence : Copyright 2001-2004 - SkyMinds.Net. All rights reserved. This script is linkware. Contact us for commercial use or custom version.
*/
// ---------------------------------- EDIT HERE --------------------------------- //
	/* Your email where the results of the contact form will be sent to. */
	$dest = "cylongirl-fb@yahoo.com.ar";

	/* The full path to your upload directory. This will appear in the email you'll get so that you can retrieve the uploaded files easily. */
	//$up_full = "http://silvinscorner.awardspace.com/";
	
	/* The relative path to your upload directory from this script. This is an important settings : if the files are not uploaded, chances are that this is not set properly.
	Configuration example : if this file is at www.domain.net/contact.php and your upload directory is www.domain.net/upload/, the setting should be :
	$up_dir = "./upload/";
	*/
	//$up_dir = "./upload/";
	
	/* Home URI of your website */
	$home_url = "http://silvinscorner.awardspace.com/";
	
	/*  The number of upload fields you want on the form. Put 0 if you don't want any. */
	$UploadNum = "0";
	
	/*Host mail functions. Possible values are 0 or 1. See below:
	0 is for most hosts (default value). 
	1 is for Online.Net (Online). */
	$online_isp = "0";	
// --------------------------------------------------------------------------------- //

function unique_id()
{
	$taille = 6;
	$new_pass = '';
	$lettres = "abcdefghijklmnpqrstuvwxyz123456789";
	srand(time());
	for ($i=0;$i<$taille;$i++)
	{
		$new_pass.=substr($lettres,(rand()%(strlen($lettres))),1);
	}
	define("timer", $new_pass);
}
unique_id();
ini_set("sendmail_from", $dest);

if(isset($_POST["submit"]))
{
// ------------------------ Fields Verification Process ------------------------- //

	$From = preg_replace("/\r/", "", $_POST['From']); 
	$From = preg_replace("/\n/", "", $From);
	$Name = preg_replace("/\r/", "", $_POST['Name']); 
	$Name = preg_replace("/\n/", "", $Name);
	$Msg  = $_POST['Msg'];
	$Nada = '';
	
	if(empty($From))
	{                 
    		$Nada.="Email field is empty !<br>";
	}
	if(empty($Msg))
	{
    		$Nada.="Message field is empty !<br>";
	}
	$noway = "$Nada" ;
	
	if(empty($Nada) && 
	eregi("^[a-z0-9]+([_.-][a-z0-9]+)*@([a-z0-9]+([.-][a-z0-9]+)*)+\\.[a-z]{2,4}$",$From))
	{
		$ok = TRUE;
	}
	elseif(!empty($Nada) && 
	eregi("^[a-z0-9]+([_.-][a-z0-9]+)*@([a-z0-9]+([.-][a-z0-9]+)*)+\\.[a-z]{2,4}$",$From))
	{
		$ok = FALSE;
	}
	else
	{
		$ml = "Your email address is invalid !<br>";
		$ok = FALSE;
	}
// ------------------------------------------------------------------------- //

// ----------------------------- Upload Files ------------------------------ //
/*	$status    = '';
	$new_name  = '';
	$get_files = '';
	$all_names = '';
	
	for($i=0;$i<count($_FILES["fileup"]["tmp_name"]);$i++)
	{
		$name=$_FILES["fileup"]["name"][$i];
		$temp=$_FILES["fileup"]["tmp_name"][$i];
		$size=$_FILES["fileup"]["size"][$i];
		$type=$_FILES["fileup"]["type"][$i];
		$h = time();
		if($size > 0)
		{
			global $up_dir, $all_names;
			
			$new_name = $h .'-'. constant('timer') . '-' . $name;
			$new_name = strtr($new_name, " ‡‰ÂÈËÍÎÔÓÙˆ˘¸˚Ò()[]'~$&%*@Á!?;,:/^?{}|+",  "_aaaeeeeiioouuun____________________E____"); 
			@move_uploaded_file($temp, $up_dir . $new_name);
			$all_names.= "$new_name\n";
		}
	}*/
// ------------------------------------------------------------------------- //

// ----------------------------- Upload Messages --------------------------- //
/*	if(empty($all_names))
	{
		$status   = "No files uploaded.";
	}
	else
	{
		$status    = "File(s) successfully uploaded.";
		$get_files = "\nGet the file(s): $up_full";
	}*/
//--------------------------------------------------------------------------- //

// ----------------------------- Mail Builder ------------------------------ //
	if($ok == "TRUE")
	{
		$referer = $_SERVER["HTTP_REFERER"];
 		$subject = "Feedback";
 		$body    = "Origin: $referer\n";
 		$body.="\n***** Results *****\n\n";

		if(count($_POST))
 		{
			while(list($key, $val) = each($_POST))
			{
				$body.="$key : $val\n";
    		}  
 		}

 		$body.="\n\n";
		$body.="Upload: $status\n";
		$body.="$all_names\n";
		$body.="$get_files\n";
 		$body.="*************************\n";
		
        $body = stripslashes($body);
  
 		if($online_isp == "1")
 		{
			if(!email("feedback",$dest,$sujet,$body))
			{
				print "An error occured during mail delivery <br>";
			}
 		}
 		else
		{
			$header  = '';
			$header.= 'From: "' . $Name . '" <' . $From . ">\r\n";
			$header.= 'Reply-To: "' . $Name . '" <' . $From . ">\r\n";
			$header.= "X-Mailer: PHP/" . phpversion();

			if(!mail($dest, $subject, $body, $header ))
			{
				print "An error occured during mail delivery <br>";
			}
		}
// ------------------------------------------------------------------------- //

// ---------------------------- Success Message ---------------------------- //
?>
<html><head><title>Success !</title></head><body bgcolor="white">
<center><table width="450" border="0" cellspacing="0" cellpadding="0"><tr>
<td width="100%" bgcolor="#000000">
<table width="550" border="0" cellspacing="1" cellpadding="2"><tr>
<td colspan="2" bgcolor="#ffffff"><div align="center"><br>
Thank you !<br><br>Your message has been successfully sent to the webmaster and should receive an answer shortly.<br><br>
<?php echo $status; ?>
<br><p>&nbsp;</p><p>&nbsp;</p>
<p><a href="<?php echo $home_url; ?>">Back to the main page</a></p><br></div>
<font size="-2"><a href="http://www.skyminds.net/scripts-php-mysql/" target="_blank">Mail-it Now!</a></font> 
</tr></table>
</td></tr></table></center></body>
<!--This script sources from SkyMinds.Net (http://www.skyminds.net/) -->
</html>
<?php
	}
// ------------------------------------------------------------------------- //
	else
	{
// ----------------------------- Error Message ----------------------------- //
?>
<html><head><title>Error !</title></head><body bgcolor="white">
<center><table width="450" border="0" cellspacing="0" cellpadding="0"><tr>
<td width="100%" bgcolor="#000000">
<table width="550" border="0" cellspacing="1" cellpadding="2"><tr>
<td colspan="2" bgcolor="#ffffff"><div align="center"><br><b>
<?php 
echo $noway;
echo $ml;
?>
</b><p><br><br>Your message could not be processed properly. Please note the error messages above and press the back button to try again.<br> If the problem still remains <a href="http://www.skyminds.net/contact/">contact the webmaster</a> to fix the problem.</p>
<p>&nbsp;</p><p>&nbsp;</p>
<p><a href='Javascript:history.go(-1)'>BACK</a></p><br></div>
<font size="-2"><a href="http://www.skyminds.net/scripts-php-mysql/" target="_blank">Mail-it Now!</a></font>
</tr></table>
</td></tr></table></center></body>
<!--This script sources from SkyMinds.Net (http://www.skyminds.net/) -->
</html>
<?php
// ------------------------------------------------------------------------- //
	} 
}
else
{
	//$num = 0;
	//$upload_box = '';
	//while($num < $UploadNum)
	//{
	//	$num++;
	//	$upload_box.= "<tr><td><font size='-1' face='verdana'>&nbsp;&nbsp;&nbsp;File $num:</font></td><td><input name='fileup[]' type='file'></td>";
	//}
?>
<html>
<head>
<title>Contact form</title>
<STYLE>

body {
	background-color: #fafaf1;
}

H2{
	FONT-FAMILY: monospace;
	//border-bottom: 1px solid #b0e6f5;
	padding-left: 8px;
	color: #03627d;
}

H3{
	color: #03627d;
	border-bottom: 1px solid #b0e6f5;
	font: 11pt "trebuchet ms", arial, georgia, verdana, sans-serif;
	padding: 5px 0 4px 0;
	margin-bottom: 5px;
	//margin: 0;
}

P.header {
	color: #03627d;
	font: 13pt "trebuchet ms", arial, georgia, verdana, sans-serif;
	padding: 5px 0 4px 0;
	margin-bottom: 5px;
	//margin: 0;
	//text-align:right;
	//float:right;
	border-bottom: 2px solid #b0e6f5;
}

P.header img {
	border: 1px solid #397687;
	padding: 6px;
}
P.header img:hover{
	opacity:0.7;
}

blockquote {
	margin: 0 8px 0 8px; 
	padding: 8px;
	border: 1px double #ddd; 
	background-color: #fafafa;
	color: #808080;
	font: 7pt/15px verdana, arial, sans-serif;
	text-align: justify;
}


a, a:link, a:visited, a:active {
	color: #1ea4ca;
	text-decoration: none;
}

a:hover {
	color: #03627d;
	text-decoration: none;
}


DIV.main{
	width: 800px;
	border-left: 1px dotted #CCCCCC;
	font-family: verdana, sans-serif;
	font-size: 11px;
	margin: 0 auto;
	border: 0px;   
	padding: 0px;
}

DIV.content{
	float:right;
	width:73%;
	//margin-top:20px;
	margin-bottom:20px;
	padding: 0 10px;
	//margin-right:20px;
	//border-right: 1px dotted #CCCCCC;
	border-left: 1px dotted #CCCCCC;
	//border-left:1px solid;
}

DIV.header{
	float:right;
	text-align:right;
	width:98%;
	margin-top:10px;
	//margin-bottom:20px;
	padding: 0 10px;
	//border-right: 1px dotted #CCCCCC;
	//border-left: 1px dotted #CCCCCC;
}

DIV.sidebar{
	float:left;
	width:20%;
	margin-top:10px;
	margin-bottom:18px;
	//margin-left:10px;
	padding: 0 8px;
	color:#048cb2;
	FONT-FAMILY: tahoma, verdana;
	font-size: 10px;
	//font-weight:bold;
	text-align:right;
}

DIV.result{
	//height: 200px;
	padding: 15px;
}

INPUT, SELECT, TABLE{
	font-family: verdana, sans-serif;
	font-size: 11px;
}

A.menu{
	font-family: century gothic, arial, sans-serif;
	font-size: 7pt;
	line-height: 14px;
	border: none;
	//border-bottom: 1px dotted #CCCCCC;
	display: block;
	padding: 0 0 0 13px;
	text-transform: lowercase;
}

A.menu:hover{
	text-decoration: none;
	//border-bottom: 1px dotted #CCCCCC;
	//background: #fafae3;
	color:#03627d;
}


P.menutitle {
	padding-bottom: 6px;
	list-style: none;
	border: 0;
	margin: 10px 0 8px 0;
	color: #03627d;
	padding-top: 12px;
	font: 8pt arial, verdana, sans-serif;
	text-transform: uppercase;
	//font-weight:bold;
	border-bottom: 1px solid #b0e6f5;
}


P.sep{
	border-top: 1px solid;
}


</STYLE>
</head>
<body bgcolor=#fafae1 LANGUAGE=javascript onLoad="reset()"><DIV class="main">
<!--
/*
Script Name: Mail-it Now! Upload2Server
Script URI: http://www.skyminds.net/scripts-php-mysql/
Description: Easy to use form2mail with multiple-uploads functionality.
Version: 1.5.3
Author: Matt Biscay
Author URI: http://www.skyminds.net/
Licence : Copyright 2001-2024 - SkyMinds.Net. All rights reserved. This script is linkware. Contact us for commercial use or custom version.
*/
-->
<DIV class="header">
<P class="header" align="right">
<table cellspacing="5">
	<tr><td valign="bottom"><img style="border:0px;" src="images/sql_girl_site.png"></td>
	<td><img id="imgheader1" src="images/icon_01.png" width="80px"></td>
	<td><img id="imgheader2" src="images/icon_04.png" width="80px"></td>
    <td><img id="imgheader3" src="images/icon_07.png" width="80px"></td></tr>
</table></P></DIV>
<DIV class="sidebar">
<p class=menutitle>About sql_girl</p>
<p align=right><A class=menu href="http://sql-girl.livejournal.com/" target=blank_>sql_girl @ livejournal</A></p>
<p align=right><A class=menu href="http://community.livejournal.com/nutty_musings/" target=blank_>nutty musings @ livejournal</A></p>
<p class=menutitle>Navigation</p>
<p align=right><A class=menu href="http://silvinscorner.awardspace.com/">Home	</A></p>
<p align=right><A class=menu href="http://silvinscorner.awardspace.com/icontable/">Icon Table Generator</A></p>
<p align=right><A class=menu href="http://silvinscorner.awardspace.com/bannertable/">Banner Table Generator</A></p>
<p align=right><A class=menu href="http://silvinscorner.awardspace.com/votecounter/">Votes Counter</A></p>
<p class=menutitle>Feedback</p>
<!--<p align=right>Any suggestion, question or comment are always welcome.</p><p>So feel free to leave me some feedback <a href="feedback.htm">here</a> :) </p>-->
<p align=right>Any suggestion, question or comment are always welcome.</p><p>So feel free to leave me some feedback here :)</p>
<p class=menutitle>Credits</p>
<p align=right>I have to thank <a href="http://geekluvinskater.livejournal.com" target=blank_>geekluvinskater@livejournal</a> for the amazing graphics and icons!!</p>
<p class=menutitle></p><p><font size=1>(Updated 03/01/2009)</font></p>
</DIV>
<DIV class="content" id=DIV1>
<p>If you have any suggestions or new ideas about any of the generators.<br>
Or if you need some help, have some questions or find some bug.<br>
Or if you just wanna say Hi.<br>
Then this is the place!! :)<br><br>
In any case, feedback and comments are always welcome :)</p><br>
<p id='success' style="display:none;">Your email is sent! Thanks!</p>
<p id='bademail' style="display:none;">Please enter a valid email.</p>
<p id='badserver' style="display:none;">Your email failed. Try again later.</p>
<p><form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data">
	<input type=hidden name=to value="cylongirl-fb@yahoo.com.ar">
    <table border="0" cellspacing="1" cellpadding="4" width="450">
      <tr><td colspan="2"><b><font size="2" face="Verdana, Arial, Helvetica, sans-serif">Send a message:</font></b></td>
      <!--</tr><tr> 
      <td width="100">Subject:</td>
        <td width="350" ><input name="subject" maxlength="64" size=40></td>-->
      </tr><tr>
        <td width="100" for="nameinput">* Name:</td>
        <td width="350" ><input name="Name" maxlength="64" size=40></td>
      </tr><tr> 
        <td width="100" for="emailinput">* E-mail:</td>
        <td width="350" ><input name="From" maxlength="255" size=40></td>
      </tr><tr> 
        <td width="100" for="commentinput">* Message:</td>
        <td width="350"><TEXTAREA name="Msg" rows=9 cols=40></TEXTAREA></td>
      </tr><tr> 
        <td width="100" valign=top></td>
        <td width="350" align="right"><input type="submit" name="Submit" value="Send">
        	<input type="reset" name="reset" value="Clear"></td>
      </tr></table>       
</form></p>
<font size="-2"><a href="http://www.skyminds.net/scripts-php-mysql/" target="_blank">Mail-it Now!</a></font>
<p>Important: In case you are asking for some help, please be sure to write correctly you email adress so i can get back to you.</p>
<DIV></DIV>
<P></P>
</DIV></DIV></BODY>
</HTML>
<!--This script sources from SkyMinds.Net (http://www.skyminds.net/)  -->
<?php } ?>