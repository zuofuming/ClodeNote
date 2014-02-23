<?php
require_once 'db.class.php';
header('Content-type:text/json');
header('Access-Control-Allow-Origin:*');
$noteId = $_REQUEST['note_id'];
$title = $_REQUEST['title'];
$content = $_REQUEST['content'];
$bookId = $_REQUEST['notebook_id'];
//$title = "update";
//$content = "note content";
//$noteId = 14;
//$bookId = 0;
//$bookId = $notebook_id?$notebook_id:0;
$time = date("Y-m-d H:i:s");
$delete = 0;
$share = 0;
$important = 0;


$db = new db();
$where = "note_id={$noteId}";
$data = array(
    "notebook_id"=>$bookId,
    "note_title"=>$title,
    "note_content"=>$content,
    "note_time"=>$time,
    "note_delete"=>$delete,
    "note_share"=>$share,
    "note_important"=>$important
);

$msg = $db->update('CN_note',$data,$where);
if ($msg=='Query Error!') $bool = false;
$bool = true;
$updateNoteInfo = array(
    "success"=>$bool
);

echo json_encode($updateNoteInfo);

?>