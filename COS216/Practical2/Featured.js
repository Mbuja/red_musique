var req=new XMLHttpRequest();
	req.open('GET','http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=disco&limit=5&api_key=f1d6f0839e1c5b529519d1dcb334d422&format=json',true);
	req.send();
	console.log("Request Status= "+req.status);
	var rows=document.getElementsByTagName("tr");
	var track_id=new Array("84250821","13787885","574948072","599185732","417767182");
	var deezer=new Array("","","","","");
	var response_data=new Array("","","","","");
	for(var p=0;p<5;p++){
		deezer[p]=new XMLHttpRequest();
		deezer[p].open('GET','https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/'+track_id[p]+"&output=json",false);
		deezer[p].send();
		if(deezer[p].readyState==4 &&deezer[p].status==200){
			response_data[p]=JSON.parse(deezer[p].responseText);
		}
	}
	
	console.log(response_data);
	
	
req.onreadystatechange=function()
{
	//Loading spinner 
	if(this.readyState< 4 && this.readyState> 0){
		for(var i=0;i<5;i++)
			rows[0].cells[i].children[0].src="img/Spinner-1s-200px.svg";
	}
	
	//When response is ready
	if(req.status==200 && req.readyState==4)
	{
		//alert("Script processing");
		var obj=JSON.parse(this.responseText);
		var t=document.getElementsByTagName("td");
		console.log(obj);
		for(var i=0;i<5;i++){                                                                                                  
				
					if(i==0)
					{
						for(var j=0;j<5;j++){
						rows[0].cells[j].children[0].src=response_data[j].album.cover_xl;
						}
						
					}
					else if(i==1)
					{
						for(var j=5;j<10;j++){
						
						t[j].innerHTML="Title : ";
						
						}
						
					}	
					else if(i==2)
					{
						for(var j=10;j<15;j++){
							t[j].innerHTML="Artist: ";
						
						}
						
					}
					else if(i==3)
					{
						for(var j=15;j<20;j++){
						console.log("Release date changed");
						t[j].innerHTML="Release Date: "+response_data[j%5].release_date;
						}
						
					}
					else
					{
						for(var j=20;j<25;j++){
						console.log("Rating changed ")
						//t[j].src=obj.tracks.track[i].image[2];
						}
						
					}
			
		    }
		console.log("First batch completed");
		
	}
	/*else
	{
		console.log("Error creating request.Exiting");
		console.log(req.status)
	}*/
	console.log("End of script");
	
}