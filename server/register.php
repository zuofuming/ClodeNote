<?php
require_once 'db.class.php';
header('Content-type:text/json');
header('Access-Control-Allow-Origin:*');
$email = $_REQUEST['name'];
$password = $_REQUEST['password'];

//	$email = "1547806333@qq.com";
//	$password = "12345";


$db = new db();
$sql = "select user_name from CN_users where user_name='{$email}'";
$data = array(
    "user_name"=>$email,
    "user_password"=>$password
);
$result = $db->queryRowNum($sql);

if ($result==null)
{
    $msg = $db->insert('CN_users',$data);
    if ($msg=='Query Error!') $bool = false;
    $bool = true;
}
else {
    if ($result == 'Query Error!') $msg = $result;
    else $msg = "exist";
    $bool = false;
}
$regInfo = array(
    "success"=>$bool,
    "message"=>$msg
);
echo json_encode($regInfo);
?>