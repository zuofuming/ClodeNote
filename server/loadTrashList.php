<?php
require_once 'db.class.php';
header("Content-type:text/json");
header('Access-Control-Allow-Origin:*');

//$user_id = $_REQUEST['user_id'];
$user_id = 1;
$db = new db();
$sql = "select note_id,note_title,note_content,note_time from CN_note where user_id={$user_id} and note_delete=1 order by note_time asc";
$result = $db->query($sql)->fetchAll();

$trashNoteList = array();
if (!$result){
    echo json_encode($trashNoteList);
}
else {
    $trashNoteInfo = array();

    foreach ($result as $rows)
    {
        $trashNoteInfo['id'] = $rows['note_id'];
        $trashNoteInfo['title'] = $rows['note_title'];
        $trashNoteInfo['time'] = $rows['note_time'];
        $trashNoteInfo['content'] = $rows['note_content'];

        array_push($trashNoteList,$trashNoteInfo);
    }

    echo json_encode($trashNoteList,JSON_UNESCAPED_UNICODE);
}

?>