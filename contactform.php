<?php

if (isset($_POST['submit'])) {
	$mailTo = 'info@elinacharalampous.gr';
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$message = $_POST['message'];
	$mailFrom = $_POST['mail'];

	$subject = 'New message from: '.$name;

	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

	$text = '<html><body><p>';
	$text .= 'Elina you received a new message from <b>'.$name.'</b>.<br><br><u>Contact Information</u><br><b>Phone:</b> '.$phone.'<br><b>E-mail:</b> '.$mailFrom.'<br><br><u>Message</u><br>'.$message;
	$text .= '</p></body></html>';

	// Sending email
	$retval = mail ($mailTo, $subject, $text, $headers);

  if ( $retval == true ) {
    header("Location: index?mailsend#contact");
  } else {
    header("Location: index?mailnotsend#contact");
  }

}
?>
