
<!DOCTYPE html>
<html>

<body>
<link rel="stylesheet" type="text/css" href="header.css">
<script type="text/javascript" src="login.js"></script>
 <div class="header">
		<div class="heading">
			<img src="COS216/Practical 1/img/Website Logo.png">
				<h1>Red Musique</h1>
		</div>
		<div class="login_corner">
			<li><a onclick= "show()" ><img height="35px" width="35px" src="COS216/Practical 1/img/login-rounded-right.png" /><span>Login<span></a></li>
		</div>
	</div>
	
	<div class="nav-container">
		<nav>
			<ul>
				<li><a href="index.php"> <img src="COS216/Practical 1/img/Home.svg" />Home</a></li>
				<li><a href="COS216/Practical 1/NewReleases.html"><img src="COS216/Practical 1/img/News.svg" />New Releases</a></li>
				<li><a href="COS216/Practical 1/Trending.html"><img src="COS216/Practical 1/img/Trending.svg" />Trending</a></li>
				<li><a href="COS216/Practical 1/TopRated.html"><img src="COS216/Practical 1/img/Top Rated.svg" />Top Rated</a></li>
				<li><a href="COS216/Practical 1/Featured.html"><img src="COS216/Practical 1/img/Featured.svg" />Featured</a></li>
				<li><a href="COS216/Practical 1/Tour.html"><img src="COS216/Practical 1/img/Tour.svg" />Tour</a></li>
				<li><a href="COS216/Practical 1/Calendar.html"><img src="COS216/Practical 1/img/Calendar.svg" />Calendar</a></li>
			</ul>
		</nav>
	</div>
	<div class="login-container" >
		<div  class="login">
			<h2>Login</h2>
			
			<label for="user"><b>Email</b></label>
			<input type="text" placeholder="Enter email" id="user" required>

			<label for="psw"><b>Password</b></label><br>
			<input type="password" placeholder="Enter Password" id="psw" required>
			
			
			

			<button type="submit" class="btn" onclick="submit()">Login</button>
			<button type="button" class="btn cancel" onclick="hide()">Close</button>
			<button type="button" class="btn signup" onclick="register()">Register</button>
		</div>
	</div>
	
	<div class="register-container" >
		<div  class="register">
			<h2>Register</h2>
			<label for="email"><b>Email</b></label>
			<input type="text" placeholder="Enter email" id="user1" required>

			
			<label for="name"><b>UserName</b></label><br>
			<input type="text" placeholder="Enter Name" id="userName1" required>
			
			<label for="psw"><b>Password</b></label><br>
			<input type="password" placeholder="Enter Password" id="psw2" required>
			<label for="psw"><b>Re-enter Password</b></label><br>
			<input type="password" placeholder="Enter Password" id="psw3" required>

			
			<button type="button" class="btn cancel" onclick="hideR()">Close</button>
			<button type="button" class="btn signup" onclick="signUp()">Register</button>
		</div>
	</div>
</body>
</html>
