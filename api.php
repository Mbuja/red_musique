<?php

session_start();
include("config.php");
//Used to recieve JSO data as string
$json=file_get_contents('php://input');
$data=json_decode($json);

//Singelton
Class API {
	public static function instance(){
		static $instance=null;
		if($instance===null)
			$instance=new API();
		return $instance;
	}
	private function __construct(){
		$conn= new mysqli($host,$username,$password);
	
		if($conn->connect_error){
			die("Connection failure: ".$conn.connect_error);
		}
		else{
			$conn->select_db("cos_216");
		}
	}
	
	public function __destruct(){
		$conn->close();
	}
	
	public function login($username,$password){
		$sql="SELECT * FROM users WHERE name ="+$username+";";
		$result=$conn->query($sql);
		if($$result->num_rows>0){
			$row =$result->fetch_assoc();
			if($row["password"]==$password){
				echo"Succesful"; 
				return $row["api_key"];
			}
			else{
				return "";
			}
		}
		else{
			return "";
		}
	}
	
	function response($success, $message = "", $data="")
	{
		header("HTTP/1.1 200 OK");
		header("Content-Type: application/json");
		
		echo json_encode([
			"success" => $success,
			"message" => $message,
			"data" => $data
		]);
	}
	
	//REQUESTS
	$api =API ::instance();
	if(isset($data->username) && isset($data->password)){
		$key = $api->login($data->username, $data->password);
		if ($key == ""){
			$api->response(false, "Invalid login details");
		}
		else {
			$api->response(true, "Log in Success", array("key" => "$key"));
		}
	}
	
	else
	{
		header("HTTP/1.1 401 Unauthroized");
		header("Content-Type: application/json");
		echo json_encode([
			"success" => "false",
			"message" => "Invalid API Key",
		]); 
	}
	
}
?>