var database_host = "http://127.0.0.1/CloudNoteServer/";
//var database_host = "http://192.168.1.101/CloudNoteServer/";
$( function() {
    $( "#user_set" ).enhanceWithin().popup();

    if(!localStorage.user_id){
        localStorage.user_id = "";
    }
    if(!localStorage.user_name){
        localStorage.user_name = "";
    }

    if(!localStorage.user_password){
        localStorage.user_password = "";
    }

    if(!localStorage.note_list_info){
        localStorage.note_list_info = " ";
    }

    if(!localStorage.trash_list_info){
        localStorage.trash_list_info = " ";
    }

    display_note_list_info_in_note_list_page();
    display_trash_list_info_in_recycle_page();
});

