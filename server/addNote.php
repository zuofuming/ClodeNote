<?php
require_once 'db.class.php';
header('Content-type:text/json');
header('Access-Control-Allow-Origin:*');
$title = $_REQUEST['title'];
$content = $_REQUEST['content'];
$userId = $_REQUEST['user_id'];
$notebook_id = $_REQUEST['notebook_id'];
$bookId = $notebook_id?$notebook_id:0;
$time = date("Y-m-d H:i:s");;
$delete = 0;
$share = 0;
$important = 0;

$db = new db();
$data = array(
    "user_id"=>$userId,
    "notebook_id"=>$bookId,
    "note_title"=>$title,
    "note_content"=>$content,
    "note_time"=>$time,
    "note_delete"=>$delete,
    "note_share"=>$share,
    "note_important"=>$important
);
$msg = $db->insert('CN_note',$data);
if ($msg=='Query Error!') $bool = false;
$bool = true;
$createInfo = array(
    "success"=>$bool,
    "note_id"=>$msg
);

echo json_encode($createInfo);

?>
