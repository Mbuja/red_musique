console.log(getClass("report"));

var area ="";
function getClass(name){
	return document.getElementsByClassName(name);
}

function report(){
	var x=document.getElementsByClassName("report");
	x[0].style.visibility="visible";
	
	
}

function show(name){
	getClass(name)[0].style.visibility="visible";
	vry[0].style.visibility="visible";
	console.log("reporting...");
}

function close(){
	var x=document.getElementsByClassName("report");
	x[0].style.visibility="hidden";
}

function submit(){
	
}

function validate(){
	var a=false;
	var l=false;
	var s=false;
	var g=false;
	var age=getElementById("age").value;
	if(age<0 || age >130){
		a=true;
	}
	
	var status=document.getElementsByName("status");
	var status_value="";
	for(var index=0;index<4;index++){
		if(status[index].checked){
			status_value=status[index].value;
			break;
		}
	}
	
	if(status!=""){
		s=true;
	}
	
	var gender=document.getElementsByName("gender");
	var gender_value="";
	for(var k=0;k<3;k++){
		if(gender[k].checked){
			gender_value=gender[k].value;
			break;
		}
	}
	
	if(gender_value!=""){
		g=true;
	}
	var place=getElementById("area");
	
	if((area==null && place.value!=null) || (area!=null && place.value==null)){
		l=true;
	}
	
	if(a && s && g && l){
		submit();
	}
}



function showPosition(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showMap,errorCallback);
		console.log("Location acquired");
	}
	/*else{
		alert("Cannot access location,Please enter location");
	}*/
};


function showMap(position) {
	
  var latlon = position.coords.latitude + "," + position.coords.longitude;
  area=latlon;
	//link for embedding map
  var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
   +latlon+ "&zoom=14&size=400x300&output=embed&key=AIzaSyC7A_kji94nK9gDxQZ_OwDOo53FbtEwIZU";

  setMap(img_url);
 
}
function setMap(url){
	document.getElementById("map").innerHTML = "<img src='"+url+"'>";
}

function errorCallback(){
	 switch(error.code) {
    case error.PERMISSION_DENIED:
      alert( "User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      alert( "An unknown error occurred.")
      break;
  }
}

/*
var result;
function showPosition(position){
	position=
}*/

//AIzaSyC7A_kji94nK9gDxQZ_OwDOo53FbtEwIZU