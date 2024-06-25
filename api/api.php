<?php

session_start();
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);
//var_dump($data);
/***************************************************************************************************************************
 SINGLETON
***************************************************************************************************************************/

Class API {
	public static function instance() {
		static $instance = null; // remember this only ever gets called once, why
		if($instance === null)
			$instance = new API();
		return $instance; 
	}
	private function __construct() { /* Connect to the database */ }
	public function __destruct() { /* Disconnect from the database */ }
	
	public function login($username, $password){ /* Validate */ 
		// This function is for demo purposes only.
	// In reality you would connect to a database to check the details.
	// perform your own DB validation, prevent XSS and SQL injection, and get the API key
		if ($username == 'satoshi' && $password == 'nakamoto')
			return "APIKEY@&^T^G@UHB@JSMNAD)I()UADNSD";
		else return "";
	}
	public function getInfo($data){ 
	/* Retrieve data from API, I am doing a deezer example */
		// From URL to get webpage contents. 
		$url = "https://api.deezer.com/search?q="; 
		  
		// Initialize a CURL session. 
		$ch = curl_init();  
		  
		// Return Page contents. don't forget to add the proxy for Wheatley
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
		 
		//grab URL and pass it to the variable. 
		if (isset($data))
			if (isset($data->title))
			{
				$url = $url."title:'".$data->title."'";
				 
				curl_setopt($ch, CURLOPT_URL, $url); 
				$result = curl_exec($ch); 
				$result = json_decode($result);
				
				if (isset($data->return)) {
					$tmp = [];
					foreach ($result->data as $r){
 
						array_push($tmp, array("title" => "$r->title", "rank" => $r->rank));
					}
					return $tmp;
				}
			}
		curl_close($ch);  
		
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
	
}

/***************************************************************************************************************************
 REQUESTS
***************************************************************************************************************************/
 
$api = API::instance();

// If not logged in, check if there is a login request from the form
 
if (isset($data->username) && isset($data->password))
{
	$key = $api->login($data->username, $data->password);
	if ($key == ""){
		$api->response(false, "You are not who you say you are");
	}
	else {
		$api->response(true, "Log in Success", array("key" => "$key"));
	}
}
if (isset($data->key) && $data->key == "APIKEY@&^T^G@UHB@JSMNAD)I()UADNSD")
{
	if (isset($data->type) && $data->type == "info")
		$api->response(true, "Success", $api->getInfo($data));
}

// Invalid request
/*
else
{
	header("HTTP/1.1 401 Unauthroized");
	header("Content-Type: application/json");
	echo json_encode([
		"success" => "false",
		"message" => "Invalid API Key",
	]); 
}
*/
?>