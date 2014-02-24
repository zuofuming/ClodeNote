function get_new_note_title(){
    var new_note_title = $('#new_note_title').val();
    return new_note_title;
}
function get_new_note_content(){
    var new_note_content = $('#new_note_content').val();
    return new_note_content;
}

function add_note(){
    var new_note_title = get_new_note_title();
    var new_note_content = get_new_note_content();
    var user_id = localStorage.user_id;
    $.post(database_host + "addNote.php",
        { title:new_note_title, content:new_note_content,user_id:user_id },
        function(data){
            deal_with_add_note(data);
        },"json");
}

function deal_with_add_note(data){
    if(data.success){
        load_note_list();
        go_to_note_list_page();
        clear_all_of_note_page_input();
    }else{
        alert('提交失败，请重试');
    }
}

function clear_all_of_note_page_input(){
    $("#new_note_title").val("");
    $("#new_note_content").val("");
}
