var req=new XMLHttpRequest();
var t=document.getElementsByTagName("td");
var rows=document.getElementsByTagName("tr");
console.log(rows);
req.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart&output=json',true);
req.send();
req.onreadystatechange=function(){
	console.log(this.readyState);
	if(this.readyState< 4 && this.readyState> 0){
		for(var i=0;i<5;i++)
			rows[0].cells[i].children[0].src="img/Spinner-1s-200px.svg";
	}
	
	if(this.readyState==4 && this.status==200){
		var data=JSON.parse(this.responseText);
		console.log(data);
			
		for(var k=0;k<5;k++){
			rows[0].cells[k].children[0].src=data.tracks.data[k].album.cover_xl;
			rows[1].cells[k].innerHTML="Title: "+data.tracks.data[k].title;
			rows[2].cells[k].innerHTML="Artist: "+data.tracks.data[k].artist.name;
			rows[7].cells[k].innerHTML="Album: " +data.tracks.data[k].album.title;
		}
	}
	
};


