function confirm_recover_note(note_id){
    localStorage.note_id = note_id;
    $('#recover_note').popup();
    $('#recover_note').popup('open');
}

function recover_note(note_id){
    $.post(database_host + "recoverNote.php",
        {note_id:note_id},
        function(data){
            deal_with_recover_note(data);
        },"json");
}

function deal_with_recover_note(data){
    if(data.success){
        load_trash_list();
        load_note_list();
    }else{
        alert("还原失败，请重试");
    }
}