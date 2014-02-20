function go_to_register_page(){
    $.mobile.changePage('#register_page',{transition:"slide"});
}

function go_to_login_page(){
    $.mobile.changePage('#login_page',{transition:"slide"});
}

function go_to_note_list_page(){
    $.mobile.changePage("#note_list_page",{transition:"slidedown"})
}