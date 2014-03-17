function get_user_name()
{
    var user_name = $('#login_name').val();
    return user_name;
}

function get_user_password(){
    var user_password = $('#login_password').val();
    return user_password;
}

function login(){
    var name = get_user_name();
    var password = get_user_password();
    $.post(database_host + "login.php",
        { name:name, password:password },
        function(data){
            deal_with_login(data,name,password);
        },"json");
}

function deal_with_login(data,name,password){
    if(data.success){
        localStorage.user_id = data.user_id;
        localStorage.user_name = name;
        localStorage.user_password = password;
        load_note_list();
        go_to_note_list_page();
    }else{
        alert("登陆失败，请重新登陆");
        clear_all_of_login_page_input();
    }
}

function clear_all_of_login_page_input(){
    $('#login_name').val('');
    $('#login_password').val('');
}



function register(){
    if(if_registration_info_right()){
        $.post(database_host + "register.php",
            { name:$('#register_name').val() , password: $('#register_password').val() },
            function(data){
               deal_with_register(data);
            },"json");
    }
}

function deal_with_register(data){
    if(data.success == true){
        alert('注册成功！');
        clear_all_of_register_page_input();
    }
    if(data.message == 'exist' && data.success == false){
        alert("用户名已存在，请重新注册");
        $('#register_name').val('');
    }
    if(data.message != 'exist' && data.success == false){
        clear_all_of_register_page_input();
    }
}

function clear_all_of_register_page_input(){
    $('#register_name').val('');
    $('#register_password').val('');
    $('#register_rePassword').val('');
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

function cancellation(){
    clear_all_of_login_page_input();
    go_to_login_page();
    localStorage.clear();
    render_note_list_info_in_note_list_page('');
    render_trash_list_info_in_recycle_page('');
}