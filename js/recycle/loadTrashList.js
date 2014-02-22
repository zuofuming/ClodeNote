function load_trash_list(){
    $.post(database_host + "loadTrashList.php",
        { user_id:localStorage.user_id },
        function(data){
            deal_with_load_trash_list(data);
        },"json");
}

function deal_with_load_trash_list(data){
    localStorage.trash_list_info = JSON.stringify(data);
    display_trash_list_info_in_recycle_page();
}

function display_trash_list_info_in_recycle_page(){
    var trash_list_info = get_trash_list_info_from_storage();
    var result_html = translate_trash_list_info_to_html(trash_list_info);
    render_trash_list_info_in_recycle_page(result_html);
}

function get_trash_list_info_from_storage(){
    var trash_list_info = JSON.parse(localStorage.trash_list_info);
    return trash_list_info;
}

function translate_trash_list_info_to_html(trash_list_info){
    var result_html = "";
    for(var i= trash_list_info.length-1; i>=0; i-- ){
        result_html += '<li id="' +trash_list_info[i].id + '"><a href="#"><h2>' + trash_list_info[i].title +
            '</h2><p><strong>' + trash_list_info[i].content + '</strong></p><p class="ui-li-aside">' +
            trash_list_info[i].time + '</p></a></li>';
    }
    return result_html;
}

function render_trash_list_info_in_recycle_page(result_html){
    $('#recycle_page_list').html(result_html);
    try{
        $('#recycle_page_list').listview('refresh');
    }catch(e){}
}