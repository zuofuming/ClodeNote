var deleted_note_id = 0;
function add_swipe_action_for_deleting_note(){
    $("li").on("swipe",function(){
        deleted_note_id = this.id;
        open_dialog_to_confirm_delete();
    });
}

function open_dialog_to_confirm_delete(){
    $('#confirm_delete_note').popup();
    $('#confirm_delete_note').popup("open");
}

function cancel_delete_note(){
    go_to_note_list_page();
}

function delete_note(){
    $.post(database_host + "deleteNote.php",
        { note_id:deleted_note_id },
        function(data){
            deal_with_delete_note(data);
        },"json");
}

function deal_with_delete_note(data){
    if(data.success){
        load_note_list();
        load_trash_list();
        go_to_note_list_page();
    }else{
        alert("删除失败,请重试");
    }
}