<?php

/**
 * This example shows settings to use when sending via Google's Gmail servers.
 */
//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Europe/Kiev');

//require "../vendor/PHPMailer-5.2.14/PHPMailerAutoload.php";
require "PHPMailerAutoload.php";


//Create a new PHPMailer instance
//Passing true to the constructor enables the use of exceptions for error handling

$mail = new PHPMailer(true);




// Retrieve the email template required
$message = file_get_contents('../send_template.html');

// Replace the % with the actual information
$dt = date('Y-m-d H:i:s');
$message = str_replace('%date%', $dt, $message);

try {
    //Tell PHPMailer to use SMTP
    $mail->isSMTP();

    //Use UTF-8
    $mail->CharSet = 'UTF-8';

    //Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    $mail->SMTPDebug = 2;
    //Ask for HTML-friendly debug output
    $mail->Debugoutput = 'html';
    //Set the hostname of the mail server
    $mail->Host = 'smtp.gmail.com';
    // use
    // $mail->Host = gethostbyname('smtp.gmail.com');
    // if your network does not support SMTP over IPv6
    //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
    $mail->Port = 587;
    //Set the encryption system to use - ssl (deprecated) or tls
    $mail->SMTPSecure = 'tls';
    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;
    //Username to use for SMTP authentication - use full email address for gmail
    $mail->Username = "coffeejob21@gmail.com";
    //Password to use for SMTP authentication
    $mail->Password = "Integer7_";
    //Set who the message is to be sent from
    $mail->setFrom('coffeejob21@gmail.com', 'Auto Sender');
    //Set an alternative reply-to address
    $mail->addReplyTo('maysters.report@yandex.ru', 'Auto Sender');
    //Set who the message is to be sent to
    $mail->addAddress('maysters.report@yandex.ru', 'Dispatcher');
    //Set the subject line
    $mail->Subject = 'Отчёт  ' . date('Y-m-d H:i:s');
    //Read an HTML message body from an external file, convert referenced images to embedded,
    //convert HTML into a basic plain-text alternative body
    $mail->MsgHTML($message);
    //Replace the plain text body with one created manually
    $mail->AltBody = 'This is a plain-text message body';
    //Attach an image file
//    $mail->addAttachment('../img/maysters_logo.png');
    $mail->send();

    $mail->clearAddresses();
    $mail->clearAttachments();

    $mail->addAddress('coffeejob21@gmail.com', 'Dispatcher');
    $mail->Subject = 'Отчёт  ' . date('Y-m-d H:i:s');
    $mail->msgHTML($message);
    $mail->AltBody = 'This is a plain-text message body';
//    $mail->addAttachment('../img/maysters_logo.png');
    $mail->send();

    echo "Message sent!";

} catch (phpmailerException $e) {
    echo $e->errorMessage(); //Pretty error messages from PHPMailer
} catch (Exception $e) {
    echo $e->getMessage(); //Boring error messages from anything else!
}
