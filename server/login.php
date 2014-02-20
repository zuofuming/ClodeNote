<?php
	require_once 'db.class.php';
	header('Content-type:text/json');
    header('Access-Control-Allow-Origin:*');
    $account= $_REQUEST['name'];
 	$password = $_REQUEST['password'];
//	$account = "2@2.c";
//	$password = "2";

	$db = new db();
	$sql = "select user_id from CN_users where user_name='{$account}' and user_password='{$password}'";
	$result = $db->query($sql)->fetchAll();
	if (!$result || !$account || !$password)
    {
        $msg = false;
    }else{
        $msg = true;
    }
	$logInfo = array(
        "success"=>$msg,
        "user_id"=>$result[0]["user_id"]
    );


	echo json_encode($logInfo);

?>