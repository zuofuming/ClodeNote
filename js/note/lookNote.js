function look_note_from_note_list_page(note_id,note_title,note_content){
    localStorage.note_id = note_id;
    display_note_in_note_view_page(note_title,note_content);
    go_to_note_view_page();
}

function display_note_in_note_view_page(note_title,note_content){
    $("#note_title").val(note_title);
    $("#note_content").val(note_content);
}