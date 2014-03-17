<?php
require_once 'db.class.php';
header('Content-type:text/json');
header('Access-Control-Allow-Origin:*');

$db = new db();
$sql = "delete from CN_note where note_delete=1";
$msg = $db->exec($sql);
if ($msg=='Query Error!') $bool = false;
$bool = true;
$clearInfo = array(
    "success"=>$bool
);

echo json_encode($clearInfo);

?>