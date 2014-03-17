<?php
require_once 'db.class.php';
header('Content-type:text/json');
header('Access-Control-Allow-Origin:*');

// 	$noteId = 15;
$noteId = $_REQUEST['note_id'];
$time = date("Y-m-d H:i:s");
$db = new db();
$where = "note_id={$noteId}";
$data = array(
    "note_time"=>$time,
    "note_delete"=>0
);
$msg = $db->update('CN_note',$data,$where);
if ($msg=='Query Error!') $bool = false;
$bool = true;
$recoverInfo = array(
    "success"=>$bool,
    "msg"=>$noteId
);

echo json_encode($recoverInfo);

?>