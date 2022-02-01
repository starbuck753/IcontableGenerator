
&parsedata;
&sendemail;
&printthanks;

sub parsedata
{
 read(STDIN, $in, $ENV{'CONTENT_LENGTH'});
 @in = split(/&/, $in);

 foreach $i (0 .. $#in)
 {
  $in[$i] =~ s/\+/ /g;
  $in[$i] =~ s/%(..)/pack("c",hex($1))/ge;
  ($key, $val) = split(/=/,$in[$i],2);
  $in{$key} .= '\0' if (defined($in{$key}));
  $in{$key} .= $val;
 }
} 


sub sendemail
{
 open (SENDMAIL, "| /usr/bin/sendmail -t -n");
 print SENDMAIL <<EOM

From: sql_girl86@yahoo.com.ar
To: sql_girl86@yahoo.com.ar
Subject: $in{'subject'}

Name: $in{'name'}
Email: $in{'email'}

$in{'message'}

EOM

} 