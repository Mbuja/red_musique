function element(id)
{
	return document.getElementById(id);
}

function hide(id)
{
	element(id).style.display = "none";
}

function show(id)
{
	element(id).style.display = "block";
}

function message(id, text)
{
	element(id).innerHTML = text;
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

function login()
{
	ajax(
		{
			"username" : element("username").value,
			"password" : element("password").value
		},
		function(data)
		{
			if(data.success)
			{
				hide("login");
				show("logout");
				message("music", "Loading ...");
				alert(data.data.key); // store this key in DOM storage and use it for other API calls
				// for visual purposes I have just doing an ajax call on info with the parameters below.
				// This is to give you the starting point 
				ajax({
					"key": data.data.key,
					"type": "info",
					"title": "Iron+Man",
					"return": ["title", "rank"]					
				}, function(data) {
					message("music", JSON.stringify(data, undefined, 4)); // now fill this info in your template from P2
				})
				
			}
			else
			{
				show("login");
				hide("logout");
			}
			show("message");
			message("message", data.message);
		}
	);
}

function logout()
{
	// unest the DOM storage 
	// clear the session 
	// I am just refershing the page here, replace with your code;
	location.reload();
}