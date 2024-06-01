<?php
    require_once('../../admin/inc/config/class/load.php');
    include("../../admin/phpmailer/vendor/autoload.php");

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    $mail = new PHPMailer(true);


    $json = array();
    $new_otp = rand(100000, 999999);




    ## Validation For Email
    if (isset($_POST['loginemail']) && !empty($action->db->test_input($_POST['loginemail']))) {
        if(filter_var($_POST['loginemail'] , FILTER_VALIDATE_EMAIL)){
            $email = $action->db->test_input($_POST['loginemail']);
        } else {
            $json['status'] = 101;
            $json['msg'] = 'Email is not Valid';
        }
    } else {
        $json['status'] = 101;
        $json['msg'] = 'Email Required';
    }



    ## DB Actions
    if(isset($email)){
        $user = $action->db->sql("SELECT * FROM tbl_users WHERE email = '{$email}'");
        
        if($user){

            
            $html = '<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    *{
                        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
                    }
                </style>
            </head>
            <body>
                <div style="border-radius: 20px;margin:0;align-items: center;background:rgba(250,235,215);padding:2rem 0;">
                    <div style="margin:auto;width:85%;border-radius: 8px;
        background: #fff !important;text-align:center;
        box-shadow:  2px 2px 3px #c9c9c9,
        -2px -2px 3px #ffffff !important;padding: 2rem 0;">
                        <img style="width: 80%;margin:0 auto;height:auto;" src="http://localhost/signup.php" alt="">
                        <br>
                        <div style="margin:0;padding: 0.5rem 0;text-align:center;" class="">
                            <h2 style="font-size:18px;color: #333;padding: 0.6rem;
                           padding: .5rem 0;"><b>Email - </b>'.$new_otp.'</h2>
                            <h2 style="font-size:18px;color: #333;padding: 0.6rem;
    
                        </div>
                        <h3 style="text-align:center;"><b>Your <i style="color: rgb(0, 170, 0);">Email and Password</i> for Login.</b></h3>
                        <h3 style="background: rgb(255, 30, 30);margin-top: 2rem;color: #fff;padding:1.5rem;letter-spacing: 3px;"><b>Please , Do Not Share Your Password With Anyone.</b></h3>
                    </div>
                </div>
            </body>
        </html>';
                    $mail_subject = 'Credentials Sended By XYZ';








            $json['status'] = 100;
            $json['msg'] = 'OTP Sent Successfully';
        }
        else{
            $json['status'] = 101;
            $json['msg'] = 'User Not Found';
        }
    }