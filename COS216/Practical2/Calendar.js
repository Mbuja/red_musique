//Spotify authorisation
/*var request=new XMLHttpRequest();
	request.open('GET','https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=9d1a7f0fbf284cb7bb34d1dda365a17b&redirect_uri=callback&response_type=token',true);
	request.send();
	alert("Processed");*/
	
	//Getting Tracks from API
var track;
window.onload=function(){
	
 
var req=new XMLHttpRequest();
	req.open('GET','https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart&format=json',false);
	req.send();
	
	if(req.status==200 && req.readyState==4){
		var resp=JSON.parse(req.responseText);
		
		
		
		
		
		var track_id=[];
		for(var i=0; i<10;i++){
				track_id.push(resp.tracks.data[i].id);
		}
		var tracks=[]
		var xmr=new XMLHttpRequest();
		for(var k=0;k<10;k++){
			xmr.open('GET','https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/'+track_id[k],false);
			xmr.send();
			if(xmr.readyState==4 && xmr.status==200){
				tracks.push(JSON.parse(xmr.responseText));
			}
		}
		
		track=tracks;
		
	}
	
	
	
	
	document.getElementsByClassName("loader")[0].style.visibility="hidden";
	var d=new Date(tracks[0].release_date);
	setDaysOfMonth();
	loadTrack();
}

function loadTrack(){
		var banner=document.getElementsByClassName('banner');
		var currentDate=new Date(banner[0].childNodes[1].data);
		var li=document.getElementsByClassName("link");
		
		if(li.length>0){
			for(var p=li.length-1;p>=0;p--)
				li[p].parentNode.removeChild(li[p]);
		}
		
		var td=document.getElementsByTagName("td");
		
		for(var i=0;i<10;i++){
			var date=new Date(track[i].release_date);
			if(currentDate.getFullYear()==date.getFullYear()){
				if(currentDate.getMonth()==date.getMonth()){
					var td=document.getElementsByTagName("td");
					td[date.getDate()-1].innerHTML += "<li class='link'>"+track[i].title_short +"</li>";
				}
					
			}
		}
}
/*
******************************
*	Formatting Calendar		 *
*	Dynamically				 *
******************************
*/

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function setDaysOfMonth(){
		
	var banner=document.getElementsByClassName('banner');
	var currentDate=new Date(banner[0].childNodes[1].data);
	var numDays=getDaysOfMonth(currentDate);

	
	var day=document.getElementsByTagName("td");
	if(numDays<31){
		for(var k=27;k<numDays;k++)
			day[k].style.visibility="visible";
		for(;k<31;k++)
			day[k].style.visibility="hidden";
		}
	else{
		for(var k=27;k<31;k++)
			day[k].style.visibility="visible";
	}
		
}

 function getDaysOfMonth(d) {
	date=new Date(d);
  //Day 0 is the last day in the previous month
 return new Date(d.getYear(), d.getMonth()+1, 0).getDate();
}

//to change current month
function change(m){
	var banner=document.getElementsByClassName('banner');
	var currentDate=new Date(banner[0].childNodes[1].data);
	var newDate;
	if(m=='prev'){
		if(currentDate.getMonth()==0){
		banner[0].childNodes[1].data=months[11]+" " + (currentDate.getFullYear()-1);
		setDaysOfMonth();
		}
		else{
			banner[0].childNodes[1].data=months[currentDate.getMonth()-1]+ " "+(currentDate.getFullYear());
			setDaysOfMonth();
		}
	}
	
	else{
		if(currentDate.getMonth()==11){
			banner[0].childNodes[1].data=months[0]+" " + (currentDate.getFullYear()+1);
			setDaysOfMonth();
			}
		else{
			banner[0].childNodes[1].data=months[currentDate.getMonth()+1]+ " "+(currentDate.getFullYear());
			setDaysOfMonth();	
		}
	}

	loadTrack();
}

function today(){
	var today=new Date();
	document.getElementsByClassName('banner')[0].childNodes[1].data=months[today.getMonth()]+" "+ today.getFullYear();
	var td=document.getElementsByTagName("td");

	td[today.getDate()-1].style.border="2px solid red";
	loadTrack();
}



