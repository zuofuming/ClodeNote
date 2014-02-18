<?php
class db{
	private $conn = NULL;
	private $sql = NULL;
	private $result = NULL;
	private $rowCount = NULL;
	private $row = NULL;
	private $allRow = NULL;
	private $lastInsertId = NULL;
	
	public function __construct(){
		require dirname(realpath(__FILE__))."/mysql_connect.inc.php";
		$this->connect(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME);
	}
	
	private function connect($dbhost,$dbuser,$dbpwd,$dbname){
		$link = mysql_connect($dbhost,$dbuser,$dbpwd) or $this->halt("Can't connect!");
		mysql_select_db($dbname) or $this->halt("Can't select db!");
		$this->conn = $link;
		$this->exec("set names utf8");
	}
	
	public function exec($sql){
		$this->sql = $sql;
		$this->result = mysql_query($sql,$this->conn);
		if($this->result == false){
			$this->halt("Query Error!");
		}
		return $this;
	}
	
	public function query($sql){
		$this->sql = $sql;		
		$this->result = mysql_query($sql,$this->conn);
		if($this->result == false){
			$this->halt("Query Error!");
		}
		$this->getCount();
		return $this;
	}
	
	public function queryRowNum($sql){
		$this->sql = $sql;
		$this->result = mysql_query($sql,$this->conn);
		if($this->result == false){
			$this->halt("Query Error!");
		}
		$result = $this->getCount();
		return $result;
	}
	
	public function fetchOne(){
		if($this->result != NULL && $this->result != false && $this->rowCount!=0){
			$this->row = mysql_result($this->result,0);
			return $this->row;
		}
		else{
			return false;
		}
	}
	
	public function fetchAll(){
		if($this->result != NULL && $this->result != false && $this->rowCount!=0){
			while($data = mysql_fetch_array($this->result)){
				$allRow[] = $data;
			}
			return $allRow;
		}
		else{
			return false;			
		}
	}
	
	public function fetchRow(){
		if($this->result != NULL && $this->result != false && $this->rowCount!=0){
			$allRow = array();
			while($data = mysql_fetch_row($this->result)){
				if(count($data)==1) {
					$allRow[] = $data[0];
				}
				else{
					$allRow[] = $data;
				}
			}
			return $allRow;
		}
		else{
			return null;			
		}
	}
	
	public function getCount(){
		if($this->result != NULL || $this->result != false){
			$this->rowCount = mysql_num_rows($this->result);
		}
		return $this->rowCount;
	}
	
	public function descTable($table){
		$descSql = "desc $table";
		$colsInfo = $this->query($descSql)->fetchAll();
		for($i=0;$i<count($colsInfo);$i++){
			$cols[$i] = $colsInfo[$i][0];
		}
		return $cols;
	}
	
	public function insert($table,$data){
		$sql = "insert into $table";
		$cols = $this->descTable($table);
		$colSql = '';
		$valSql = '';
		foreach($data as $key=>$value){
			if(!(in_array($key, $cols))){
				unset($data[$key]);
			}
			$colSql .= "$key,";
			$valSql .= is_null($value)?"null,":(is_string($value)?"'$value',":"$value,");
		}
		$sql .= "(".rtrim($colSql,",").")";
		$sql .= " values(".rtrim($valSql,",").")";
		$this->exec($sql,$this->conn);
		$this->lastInsertId = mysql_insert_id($this->conn);
		return $this->lastInsertId;
	}
	
	public function update($table,$data,$where=null){
		$sql = "update $table set ";
		foreach($data as $key=>$value){
			$value = is_string($value)?"'$value'":$value;
			$sql .= $key."=".$value.",";
		}
		$sql = rtrim($sql,",");
		if(is_array($where)){
			$sql .= " where ";
			foreach($where as $key=>$value){
				$value = is_string($value)?"'$value'":$value;
				$sql .= $key."=".$value.",";
			}
			$sql = rtrim($sql,",");
		}
		else if(is_string($where)){
			$sql .= " where ".$where;
		}
		$this->exec($sql,$this->conn);
		return true;
	}
	
	public function getLastSql(){
		return $this->sql;
	}
	
	public function halt($info){
// 		echo "<h1>{$info}</h1><br />";
// 		echo "<h2>{$this->sql}</h2><br />";
// 		echo mysql_error();
// 		exit;
		return $info;
	}
	
}