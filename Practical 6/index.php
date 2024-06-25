<!DOCTYPE>
<html>
	<head>
		<title>CoronaVirus Dashboard</title>
		<meta charset="UTF-8">
		<meta name="Description" content="CoronaVirus Dashboard">
		<meta name ="author" content="Mbulelo Marambana">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="css/index.css">
	</head>
<body>
	<script type="text/javascript" src="api.js" ></script>
	<div class="sidebar-container" >
		<div class ="navbar">
			<ul>
				<li><a  ><img />Home</a></li><br>
				<li onclick="report()"><a  ><img />Report</a></li><br>
				<li><a onclick="#default" ><img />Stats</a></li><br>
				<li><a onclick="#default" ><img />Other</a></li>
			</ul>
		</div>
	</div> 
	
	<div class="header">
		CoronaVirus Dashboard
	</div>
	
	<div class="main-body">
		<div class="report">

			<form method ="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
			
				<label for="age" >Age: </label><br>
				<input type="text" id="age" name="age"><br>
				
				<label for="area" >Location: </label><br>
				<input type="text" id="area" name="area"><br>
				<button type="button" onclick="showPosition()" style="float=right">Get Location</button>
				
				<h4>Gender</h4>
				
				<input type="radio" id="male" name="gender" value="Male">
				<label for="male" >Male</label><br>
				
				<input type="radio" id="female" name="gender" value="Female">
				<label for="female">Female</label><br>
				
				<input type="radio" id="other" name="gender" value="Other">
				<label for="other" >Other</label>
				
				<h4>Status</h4>
				
				<input type="radio" id="untested" name="status" value="untested" >
				<label for="untested" >Untested</label><br>
				
				<input type="radio" id="testing" name="status" value="testing" >
				<label for="testing" >Testing</label><br>
				
				<input type="radio" id="positive" name="status" value="positive" >
				<label for="positive" >Positive</label><br>
				
				<input type="radio" id="negative" name="status" value="negative" >
				<label for="Negative" >Negative</label><br><br>
				
				<input type="submit" id="submit" name="submit">
				<button type="btn" onclick="close()" style="float=right">Close</button>	

				<div id="map">
				</div>
			</form>
			
		</div>
		
	</div>
	
	<div class="footer" >
	</div>

</body>
</html>

<?php
?>
