$(document).ready(function () {



    // USER REGISTRATION STEP-1
    $(document).on('submit', '#user_register', function (e) {
        e.preventDefault();

        $.ajax({
            url: './inc/config/user-register.php',
            type: 'POST',
            data: new FormData(this),
            processData: false,
            contentType: false,
            caches: false,
            success: function (data) {
                let json = JSON.parse(data);
                if (json.status == 100) {
                    swaMsg('success', json.msg, "#0F843F");
                    setTimeout(() => {
                        window.location.assign('sms-verification.php');
                    }, 1200);
                    $('#user_register').trigger('reset');
                }
                else if (json.status == 101) {
                    swaMsg('error', json.msg, "#a90228");
                }
            }
        });
    });




    // USER REGISTRATION TIMER

    let page_path = window.location.pathname;
    var page_name = page_path.split('/').pop();
    if(page_name == 'sms-verification.php' || page_name == 'login-otp.php' ){
        document.getElementById('timer').innerHTML = 1 + ":" + 02;
        startTimer();
    
    
        function startTimer() {
            var presentTime = document.getElementById('timer').innerHTML;
            var timeArray = presentTime.split(/[:]+/);
            var m = timeArray[0];
            var s = checkSecond((timeArray[1] - 1));
            if (s == 59) { m = m - 1 }
            if (m < 0) {
                return
            }
    
            document.getElementById('timer').innerHTML =
                m + ":" + s;
            console.log(m)
            setTimeout(startTimer, 1000);
    
        }
    
        function checkSecond(sec) {
            if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
            if (sec < 0) { sec = "59" };
            return sec;
        }
    
        const myInterval = setInterval(myTimer, 500);
    
        function myTimer() {
            if ($('#timer').text() == '0:00') {
                clearInterval(myInterval);
                $('.opt_btn').fadeIn(600);
                $('.timer_div').hide(100);
            }
        }
    
    
        // USER REGISTRATION TIMER END
    
    }



    // USER OTP VERIFICATION


    $(document).on('submit', '#otp_verification', function (e) {
        e.preventDefault();

        $.ajax({
            url: './inc/config/otp-verify.php',
            type: 'POST',
            data: new FormData(this),
            processData: false,
            contentType: false,
            caches: false,
            success: function (data) {
                let json = JSON.parse(data);
                if (json.status == 100) {
                    swaMsg('success', json.msg, "#0F843F");
                    setTimeout(() => {
                        window.location.assign('./login.php');
                    }, 1200);
                    $('#otp_verification').trigger('reset');
                }
                else if (json.status == 101) {
                    swaMsg('error', json.msg, "#a90228");
                }
                else if (json.status == 102) {
                    swaMsg('error', json.msg, "#a90228");
                    setTimeout(() => {
                        window.location.assign('./signup.php');
                    }, 1200);
                }
            }
        });
    });


    $(document).on('click', '#otp_resend', function (e) {
        e.preventDefault();

        $.ajax({
            url: './inc/config/otp-resend.php',
            type: 'POST',
            success: function (data) {
                let json = JSON.parse(data);
                if (json.status == 100) {
                    swaMsg('success', json.msg, "#0F843F");
                    setTimeout(() => {
                        window.location.assign('sms-verification.php');
                    }, 1200);
                    $('#otp_verification').trigger('reset');
                }
                else if (json.status == 101) {
                    swaMsg('error', json.msg, "#a90228");
                }
            }
        });
    });



    // OTP Resend For Login
    $(document).on('click', '#otp_resend_email', function (e) {
        e.preventDefault();

        $.ajax({
            url: './inc/config/otp-resend-email.php',
            type: 'POST',
            success: function (data) {
                let json = JSON.parse(data);
                if (json.status == 100) {
                    swaMsg('success', json.msg, "#0F843F");
                    setTimeout(() => {
                        location.reload();
                    }, 1200);
                    $('#otp_verification').trigger('reset');
                }
                else if (json.status == 101) {
                    swaMsg('error', json.msg, "#a90228");
                }
            }
        });
    });






        // USER OTP VERIFICATION


        $(document).on('submit', '#login_otp', function (e) {
            e.preventDefault();
    
            $.ajax({
                url: './inc/config/login-query.php',
                type: 'POST',
                data: new FormData(this),
                processData: false,
                contentType: false,
                caches: false,
                success: function (data) {
                    let json = JSON.parse(data);
                    if (json.status == 100) {
                        swaMsg('success', json.msg, "#0F843F");
                        setTimeout(() => {
                            window.location.assign('./');
                        }, 1200);
                        $('#login_otp').trigger('reset');
                    }
                    else if (json.status == 101) {
                        swaMsg('error', json.msg, "#a90228");
                    }
                }
            });
        });
    
});