<?php
	require_once 'db.class.php';
	header('Content-type:text/json');
    header('Access-Control-Allow-Origin:*');
    $account= $_REQUEST['name'];
 	$password = $_REQUEST['password'];
//	$account = "1547806333@qq.com";
//	$password = "12345";

	$db = new db();
	$sql = "select * from CN_users where user_name='{$account}' and user_password='{$password}'";
	$result = $db->queryRowNum($sql);
	if (!$result || !$account || !$password)
    {
        $msg = false;
    }else{
        $msg = true;
    }
	$logInfo = array(
        "success"=>$msg,
    );


	echo json_encode($logInfo);

?>