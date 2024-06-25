
function show(){
	document.getElementsByClassName("login-container")[0].style.display="block";
}
function hide(){
document.getElementsByClassName("login-container")[0].style.display="none";
//console.log(document.getElementsByClassName("login-container")[0]);
element("user").value="";
}

function hideR(){
document.getElementsByClassName("register-container")[0].style.display="none";
//console.log(document.getElementsByClassName("login-container")[0]);
element("user1").value="";
}
function login(){
	
}

function register(){
	var reg=document.getElementsByClassName("register-container");
	reg[0].style.display="block";
	hide();
}
	
function signUp(){
	
	var ml=false,psw=false,name=false;
	var el=element('user1');
	//console.log(validateMail(el.value));
	if(validateMail(el.value)){
		//console.log(el.style);
		el.style.backgroundColor='rgba(0, 230, 64, 1)';
		ml=true;
	}
	else{
		el.style.backgroundColor='rgba(217, 30, 24,1)';
	}
	
	//password match
	var p1=element("psw2");
	var p2=element("psw3");
	if(p1.value==p2.value && p1.value!=""){
		p2.style.backgroundColor='rgba(0, 230, 64, 1)';
		psw=true;
	}
	else{
		p2.style.backgroundColor='rgba(217, 30, 24,1)';
	}
	var user=element("userName1");
	if(user.value!=""){
		user.style.backgroundColor="rgba(0,230,64,1)";
		name=true;
	}
	else{
		user.style.backgroundColor='rgba(217, 30, 24,1)';
	}
	
	if(ml&&psw&&name){
			ajax({"username: "user.value,"password: "+p1.value},);
	}
}
//Gets element by ID
function element(id){
	return document.getElementById(id);
}

function validateMail(email){
	var regex=	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}

function ajax(data, callback)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if(req.readyState == 4 && req.status == 200)
		{
			var json = JSON.parse(req.responseText);
			callback(json);
		}
	};
	
	req.open("POST", "api.php", true);
	
	// This is important for POST requests with data that is not submitted via a form.
	req.setRequestHeader("Content-type", "application/json");
	req.send(JSON.stringify(data));
}
