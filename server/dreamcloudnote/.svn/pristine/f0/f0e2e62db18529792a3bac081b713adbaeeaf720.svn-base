<?php
require_once 'db.class.php';
header("Content-type:text/json");
header('Access-Control-Allow-Origin:*');

$user_id = $_REQUEST['user_id'];
//$user_id = 1;

$db = new db();
$sql = "select note_id,note_title,note_content,note_time from CN_note where user_id={$user_id} and note_delete=0 order by note_time asc";
$result = $db->query($sql)->fetchAll();
$noteList = array();
$noteInfo = array();
foreach ($result as $rows)
{
    $noteInfo['id'] = $rows['note_id'];
    $noteInfo['title'] = $rows['note_title'];
    $noteInfo['time'] = $rows['note_time'];
    $noteInfo['content'] = $rows['note_content'];

    array_push($noteList,$noteInfo);

}

echo json_encode($noteList,JSON_UNESCAPED_UNICODE);
?>