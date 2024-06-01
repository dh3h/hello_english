/* 	<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.9/dist/sweetalert2.all.min.js"></script>
*/
/*  --------------------------  Sweet Alert swal function Function --------------------------------------- */
function swaMsg(icon, message, bg){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: icon,
        title: message,
        color:'#fff',
        background: bg,
        
      })    
  }
  /*  xxxxxxxxxxxxxxxxxxxxxxx  Sweet Alert swal function Function xxxxxxxxxxxxxxxxxxx */

function inval(clas, color){
    $(clas).css("color",color);
  }

  /*------------  Usage Below function -------------- */
  isEmailValid("#ad_user_email", ".ad_user_email");
 isPassValid("#ad_user_pass", ".ad_user_pass");
 isNameValid("#ad_user_name", ".ad_user_name");
  /*xxxxxxxxxxxx  Usage Below function xxxxxxxxxxxxxxxxxxxxx */

/* -------------------  User Name Validation ------------------------ */
let name_input = "";
function isNameValid(id, cls){
$(document).on("input",id,function(){
      name_input =  $(this).val();
      if(name_input == ""){
        $(cls).text("Please enter your name.");
        inval(cls,"#a90228");
      }
      else if(name_input.length < 3){
        $(cls).text(" Name should be minimum 3 character.");
        inval(cls,"#a90228");
      }
      else if(!name_input.match(/^[a-zA-Z\s]*$/)){
        $(cls).text("Name should be maximum 30 character.");
        inval(cls,"#a90228");
      }
      else if(name_input.match(/^[a-zA-Z\s]*$/)){
        $(cls).text(" ");
        inval(cls,"green");
      }
      else{
        $(cls).text("");
        return name_input;
      }
  
});
}
/* --------------------  Validation For Email ------------------- */
let a_user_email;
function isEmailValid( id, cls){
 $(document).on("input",id,function(){
    a_user_email =  $(this).val();
  if(a_user_email == ""){
    $(cls).text("Please enter your email address.");
    inval(cls,"#a90228");

  }
  else if(!a_user_email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 )){
    $(cls).text("Please enter your correct email address.");
    inval(cls,"#a90228");

  }
  else{
    $(cls).text(" ");
    inval(cls,"#0F843F");
    return a_user_email;
  }
 });
}
/*------------  Valdation for Password --------------------------- */
let a_user_pass;

function isPassValid(id, cls){
 $(document).on("input",id,function(){
 a_user_pass =  $(this).val();
 if(a_user_pass == ""){
 $(cls).text("Please enter your password.");
 inval(cls,"#a90228");
 }
 else if(a_user_pass.length < 6){
 $(cls).text("minimum 6 character allowed.");
 inval(cls,"#a90228");
 }
 else if(a_user_pass.length > 15){
 $(cls).text("maximum 15 character allowed.");
 inval(cls,"#a90228");
 }
 else if(a_user_pass != "" && a_user_pass.length > 5 || a_user_pass.length > 15){
 $(cls).text(" ");
 inval(cls,"#0F843F");
 }
 else{
 $(cls).text("");
 return a_user_pass;
 }
 });
}
/* ---------------  Crud And Data Load Function for Php ------------------------*/

// $("#load_user_data").load("inc/config/load-user.php");
/* --------------  Pagination Function For php -------------- */
function loadTable(path ,page_no, table_id){
    $.ajax({
        url:path,
        type:"POST",
        data:{page_no:page_no},
        success: function(data){
            $(table_id).html(data);
        }
    });
  }
  loadTable();
  function load_pagination(pagination_id, load_url, load_table_data_id){
    $(document).on("click",pagination_id,function(e){
      
      e.preventDefault();
      let page_id = $(this).attr("id");
      loadTable(load_url ,page_id, load_table_data_id);
    });
  }
  // usage
//   load_pagination("#user_pagination .page","./inc/config/load-user.php","#load_user_data");
/*xxxxxxxxxxxxxxxxxxxxxxxxxx  Pagination Function For php xxxxxxxxxxxxxxxxxxxxx */
  /* --------------   Status Active Inactive Code  For Php  --------------- */
  function check_status(button_class, load_data_id, load_data_url , table_name){
    $(document).on("click",button_class,function(){
      if ($(this).prop("checked") == true) {
            let active = $(this).data("checkid");
           
            $.ajax({
              type:"POST",
              url:"inc/config/status.php",
              data:{active:active, table_name:table_name},
              success:function(data){
             
                let json11 = JSON.parse(data);
                if(json11.status == 1){
                 swaMsg('success',json11.msg,"#0F843F");
                  $(load_data_id).load(load_data_url);
                }
                 else if(json11.status == 2){
                  swaMsg('error',json11.msg,"#a90228");
                 }
              }
          });
        } 
        else if($(this).prop("checked") == false){
          let inactive = $(this).data("checkid");
          $.ajax({
              type:"POST",
              url:"inc/config/status.php",
              data:{inactive:inactive, table_name:table_name},
              success:function(data){
            
                let json12 = JSON.parse(data);
                if(json12.status == 3){
                 swaMsg('success',json12.msg,"#0F843F");
 
                  $(load_data_id).load(load_data_url);
                }
                 else if(json12.status == 4){
                   swaMsg('error',json12.msg,"#a90228");
                 }            }
          });
        }
    });  
  }
  // Usage
 // check_status(".user-status-check","#load_user_data","./inc/config/load-user.php", "users");
    /*xxxxxxxxxxxxxxxxxxxxx   Status Active Inactive Code  For Php  xxxxxxxxxxxxxxxxxxxxxx */
    /* -------------  Delete Function for PHP --------------------------  */
    function show_delete(del_id,table_name,table_load_data,load_data_url){
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this data!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            $.ajax({
              type:"POST",
              url:"inc/config/delete.php",
              data:{del_id:del_id, table_name:table_name},
              success:function(data){
     
                let json7 = JSON.parse(data);
               if(json7.status == 1){
                 swaMsg('success',"Data Successfully Deleted !!","#0F843F");
     
                 $(table_load_data).load(load_data_url);
               //  swaMsg('success',json7.msg,"#0F843F");
     
               }
               else if(json7.status == 2){
                 swaMsg('error',json7.msg,"#a90228");
               }
              }
            });
          
     
      
          } else {
           swaMsg('success',"You Data is safe !!.","#0F843F");
         }
        }); 
        
      }
      function delete_table(button_class, table_name, table_load_data, load_data_url ){
        $(document).on("click",button_class,function(e){
          e.preventDefault();
          let del_id = $(this).data("delid");
          show_delete(del_id,table_name, table_load_data, load_data_url);
        });
      }
      // Usage
    //   delete_table(".delete-user","users","#load_user_data","inc/config/load-user.php");
/* xxxxxxxxxxxxxxxxx  Delete Function for PHP xxxxxxxxxxxxxxxxxxxxxxxxxxx  */
