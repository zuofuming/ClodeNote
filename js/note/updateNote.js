function update_note(){
    var note_id = localStorage.note_id;
    var title = get_note_title();
    var content = get_note_content();
    if(title == ''&& content ==''){
        delete_note_if_update_blank_note(note_id);
    }else{
        upload_updated_note(note_id,title,content,0);
    }
}

function get_note_title(){
    var note_title = $('#note_title').val();
    return note_title;
}
function  get_note_content(){
    var note_content = $('#note_content').val();
    return note_content;
}

function upload_updated_note(note_id,note_title,note_content,notebook_id){
    $.post(database_host + "updateNote.php",
        {note_id:note_id,title:note_title,content:note_content,notebook_id:notebook_id},
        function(data){
            deal_with_update_note(data);
        },"json");
}

function deal_with_update_note(data){
    if(data.success){
        load_note_list();
        go_to_note_list_page();
    } else{
        alert('更新失败，请重试');
    }
}

function delete_note_if_update_blank_note(id){
    $.post(database_host + "deleteNote.php",
        { note_id:id},
        function(data){
            deal_with_delete_note(data);
        },"json");
}