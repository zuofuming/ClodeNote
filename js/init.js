var database_host = "http://127.0.0.1/CloudNoteServer/";
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

    display_note_list_info_in_note_list_page();
});

