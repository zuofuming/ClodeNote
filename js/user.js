function get_user_name()
{
    var user_name = $('#login_name').val();
    return user_name;
}

function login(){
    var name = get_user_name();
    console.log(name);
}


function register(){
    if(if_registration_info_right()){
        $.post("http://127.0.0.1/CloudNoteServer/register.php",
            { name:$('#register_name').val() , password: $('#register_password').val() },
            function(data){
               deal_with_register(data);
            },"json");
    }
}

function deal_with_register(data){
    if(data.success == true){
        alert('注册成功！');
    }
    if(data.message == 'exist' && data.success == false){
        alert("用户名已存在，请重新注册");
        $('#register_name').val('');
    }
    if(data.message != 'exist' && data.success == false){
        $('#register_name').val('');
        $('#register_password').val('');
        $('#register_rePassword').val('');
    }
}

function if_registration_info_right(){
    if(if_register_name_right() == false || if_register_password_idenyical() == false)
    {
        return false;
    }
    return true;
}

function if_register_name_right(){
    var register_name = $('#register_name').val();
    var mail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!register_name.match(mail)){
        alert("邮箱地址错误，请重新输入");
        $('#register_name').val('');
        return false;
    }
    return true;
}

function if_register_password_idenyical(){
    var password = $('#register_password').val();
    var rePassword = $('#register_rePassword').val();
    if(password != rePassword){
        alert("密码输入不一致，请重新输入");
        $('#register_password').val('');
        $('#register_rePassword').val('');
        return false;
    }
    return true;
}