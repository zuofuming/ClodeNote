<?php
require_once 'db.class.php';
header('Content-type:text/javascript');
header('Access-Control-Allow-Origin:*');

// 	$noteId = 8;
$noteId = $_REQUEST['note_id'];

$db = new db();
$where = "note_id={$noteId}";
$data = array(
    "note_delete"=>1
);
$msg = $db->update('CN_note',$data,$where);
if ($msg=='Query Error!') $bool = false;
$bool = true;
$deleteNoteInfo = array(
    "success"=>$bool,
    "msg"=>$noteId
);

echo json_encode($deleteNoteInfo);

?>