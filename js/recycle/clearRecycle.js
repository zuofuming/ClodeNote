function clear_recycle(){
    $.post(database_host + "clearRecycle.php",
        function(data){
            deal_with_clear_recycle(data);
        },"json");
}

function deal_with_clear_recycle(data){
    if(data.success){
        load_trash_list();
    }else{
        alert("未能清空回收站，请重试");
    }
}