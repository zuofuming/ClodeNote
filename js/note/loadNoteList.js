function load_note_list(){
    $.post("http://127.0.0.1/CloudNoteServer/loadNoteList.php",
        { user_id:localStorage.user_id },
        function(data){
            deal_with_load_note_list(data);
        },"json");
}

function deal_with_load_note_list(data){
    localStorage.note_list_info = JSON.stringify(data);
    alert(localStorage.note_list_info);
    display_note_list_info_in_note_list_page();
}

function display_note_list_info_in_note_list_page(){
    var note_list_info = get_note_list_info_from_storage();
    var result_html = translate_note_list_info_to_html(note_list_info);
    render_note_list_info_in_note_list_page(result_html);
}

function get_note_list_info_from_storage(){
    var note_list_info = JSON.parse(localStorage.note_list_info);
    return note_list_info;
}

function translate_note_list_info_to_html(note_list_info){
    var result_html = "";
    for(var i = note_list_info.length-1;i >= 0; i--){
        result_html += '<li id="' +note_list_info[i].id + '"><a href="#"><h2>' + note_list_info[i].title +
            '</h2><p><strong>' + note_list_info[i].content + '</strong></p><p class="ui-li-aside">' +
            note_list_info[i].time + '</p></a></li>'
    }
    return result_html;
}

function render_note_list_info_in_note_list_page(result_html){
    $('#note_list_page_list').html(result_html);
    try{
        $('#note_list_page_list').listview('refresh');
    }catch(e){}
}