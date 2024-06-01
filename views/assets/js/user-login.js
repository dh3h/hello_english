
    // USER OLOGIN


    $(document).on('submit', '#user_login', function (e) {
        e.preventDefault();

        $.ajax({
            url: './inc/config/user-login.php',
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
                        window.location.assign('./login-otp.php');
                    }, 1200);
                    $('#user_login').trigger('reset');
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

