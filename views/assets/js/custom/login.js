$(document).ready(function () {
  $(".loader_btn").hide();
  function show_loader() {
    $(".loader_btn").hide();
    $(".submit_btn").show();
  }
  $(document).on('click', '.bg-pr', function () {
    $('.bg-pr').removeClass('active');
    $(this).addClass('active');
    if ($(this).data('login_type') == 'admin') {
      $("#security_login_form").removeClass("visual-hide");
      $("#faculty_login_form").addClass("visual-hide");
    }
    else {
      $("#faculty_login_form").removeClass("visual-hide");
      $("#security_login_form").addClass("visual-hide");
    }
  })
  // if ($("#staff_radio").prop("checked") == true) {
  // $("#faculty_login_form").removeClass("visual-hide");
  // $("#security_login_form").addClass("visual-hide");

  // }
  //   $(document).on("click","#admin_radio",function(){
  //       if ($(this).prop("checked") == true) {
  // 		$("#security_login_form").removeClass("visual-hide");
  // $("#faculty_login_form").addClass("visual-hide");

  // }

  // });
  // // faculty
  //   $(document).on("click","#staff_radio",function(){
  //       if ($(this).prop("checked") == true) {
  // $("#faculty_login_form").removeClass("visual-hide");
  // $("#security_login_form").addClass("visual-hide");

  // }

  // });
  //=============== Login To
  $('#feat_vid_box').hide();
  $(document).on('submit', '#security_login_form', function (e) {
    e.preventDefault();
    $(".loader_btn").show();
    $(".submit_btn").hide();
    let formdata = new FormData(this);
    $.ajax({
      url: './inc/config/login_query.php',
      type: 'POST',
      data: formdata,
      processData: false,
      caches: false,
      contentType: false,
      success: function (data) {
        let json = JSON.parse(data);
        if (json.status == 2) {
          $('#security_login_form').trigger("reset");
          setTimeout(function () {
            window.location.assign('./index.php');
          }, 1500)
          swaMsg('success', json.msg, "#0F843F");
          show_loader();
        }
        else if (json.status == 1) {
          swaMsg('error', json.msg, "#a90228");
          show_loader();
        }
        else {
          swaMsg('error', json.msg, "#a90228");
          show_loader();
        }
      }
    });
  });

  /* -------------------------------------------------------
                        Faculty Login                     
---------------------------------------------------------------- */
  $(document).on('submit', '#faculty_login_form', function (e) {
    e.preventDefault();
    $(".loader_btn").show();
    $(".submit_btn").hide();
    let formdata = new FormData(this);
    $.ajax({
      url: './inc/config/faculty-login.php',
      type: 'POST',
      data: formdata,
      processData: false,
      caches: false,
      contentType: false,
      success: function (data) {
        let json = JSON.parse(data);
        if (json.status == 2) {
          $('#faculty_login_form').trigger("reset");
          setTimeout(function () {
            window.location.assign('./index.php');
          }, 1500);
          swaMsg('success', json.msg, "#0F843F");
          show_loader();
        }
        else if (json.status == 1) {
          swaMsg('error', json.msg, "#a90228");
          show_loader();
        }
        else {
          swaMsg('error', json.msg, "#a90228");
          show_loader();
        }
      }
    });
  });
  //=============== Forgot Password Step 1
  $(document).on("submit", "#give-the-forgot-email", function (e) {
    e.preventDefault();
    $(".loader_btn").show();
    $(".submit_btn").hide();
    $.ajax({
      url: './inc/config/forgot-pass-check-and-sent-otp.php',
      method: "POST",
      data: new FormData(this),
      contentType: false,
      processData: false,
      cache: false,
      success: function (data) {
        let json = JSON.parse(data);
        if (json.status == 2) {
          $("#give-the-forgot-email").trigger("reset");
          swaMsg('success', json.msg, "#0F843F");
          setTimeout(function () {
            window.location.assign('forgot-pass-step-two.php');
          }, 1500);
          $(".forgot_email_to_sent").text("");
          show_loader();
        }
        if (json.status == 1) {
          swaMsg('error', json.msg, "#a90228");
          $(".forgot_email_to_sent").text(json.msg);
          inval(".forgot_email_to_sent", "#a90228");
          show_loader();

        }

      }
    });

  });
  //============================== Forgot Password Step 2
  $(document).on("submit", "#save-the-forgot-email", function (e) {
    e.preventDefault();
    $(".loader_btn").show();
    $(".submit_btn").hide();
    $.ajax({
      url: './inc/config/forgot-pass-verify-otp-updatte-pass.php',
      method: "POST",
      data: new FormData(this),
      contentType: false,
      processData: false,
      cache: false,
      success: function (data) {
        let json = JSON.parse(data);
        if (json.status == 100) {
          $("#save-the-forgot-email").trigger("reset");
          swaMsg('success', json.msg, "#0F843F");
          setTimeout(function () { window.location.assign("./login.php"); }, 2000);
          show_loader();
          $(".forgot_email_to_sent").text("");
        }
        if (json.status == 1) {
          swaMsg('error', json.msg, "#a90228");
          $(".after_sent_otp").text(json.msg);
          inval(".after_sent_otp", "#a90228");
          show_loader();
        }
        else if (json.status == 2) {
          swaMsg('error', json.msg, "#a90228");
          $(".after_sent_new_pass").text(json.msg);
          inval(".after_sent_new_pass", "#a90228");
          show_loader();
        }
        else if (json.status == 3) {
          swaMsg('error', json.msg, "#a90228");
          $(".after_sent_confirm_pass").text(json.msg);
          inval(".after_sent_confirm_pass", "#a90228");
          show_loader();
        }


      }
    });

  });
  //=============== End Of Jquery
});