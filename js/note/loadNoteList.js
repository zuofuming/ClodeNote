function load_note_list(){
    $.post(database_host + "loadNoteList.php",
        { user_id:localStorage.user_id },
        function(data){
            deal_with_load_note_list(data);
        },"json");
}

function deal_with_load_note_list(data){
    localStorage.note_list_info = JSON.stringify(data);
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
        var note_content_preview = preview_note_content(note_list_info[i].content);
        note_list_info[i].content=note_list_info[i].content.replace(/\n/g,"\\n");
        result_html += '<li id="' +note_list_info[i].id + '"><a onclick=\'look_note_from_note_list_page(' +
            note_list_info[i].id +',\"'+ note_list_info[i].title +'\",\"'+ note_list_info[i].content +
            '\")\'><h2 style="length=1">' + preview_note_title(note_list_info[i].title) +
            '</h2><p><strong>' + note_content_preview + '</strong></p><p class="ui-li-aside">' +
            note_list_info[i].time + '</p></a></li>'
    }
    return result_html;
}

function preview_note_title(title){
    title = title.replace( /^\s*/,"");
    title = title.substr(0,10);
    return title;
}

function preview_note_content(content){
    var content_str = ltrim(content);
    var content_array = content_str.split('\n');
    return content_array[0].substr(0,20);
}

function ltrim(str) {
    var pattern = new RegExp("^[\\s]+","gi");
    return str.replace(pattern,"");
}

function render_note_list_info_in_note_list_page(result_html){
    $('#note_list_page_list').html(result_html);
    try{
        $('#note_list_page_list').listview('refresh');
        add_swipe_action_for_deleting_note();
    }catch(e){}
}