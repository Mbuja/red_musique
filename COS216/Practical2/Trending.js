var req=new XMLHttpRequest();
	req.open('GET','http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=disco&limit=5&api_key=f1d6f0839e1c5b529519d1dcb334d422&format=json',true);
	req.send();
	/*console.log("Request Status= "+req.status);*/
	var rows=document.getElementsByTagName("tr");
	/*console.log(rows);*/
	var track_id=new Array("763664272","922414942","1101108","756303","866940482");
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
	
	/*console.log(response_data);*/
	
req.onreadystatechange=function(){
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
		/*console.log(obj);*/
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
						//console.log(obj.tracks.track[j%5].name);
						t[j].innerHTML="Title : "+response_data[j%5].title
						
						}
						
					}	
					else if(i==2)
					{
						for(var j=10;j<15;j++){
						/*console.log("Artist Name:"+obj.tracks.track[i].artist.name);*/
						t[j].innerHTML="Artist: "+response_data[j%5].artist.name;
						
						}
						
					}
					else if(i==3)
					{
						for(var j=15;j<20;j++){
						/*console.log("Release date changed");*/
						t[j].innerHTML="Release Date: "+response_data[j%5].release_date;
						}
						
					}
					else
					{
						for(var j=35;j<40;j++){
						/*console.log("Rating changed ")*/
						t[j].innerHTML="Album: "+response_data[j%5].album.title;
						}
						
					}
			
		    }
	}
}


function Search(){

	var load=document.querySelectorAll("div.contain");
	load[0].style.visibility='visible';
	
	var input=document.getElementsByTagName('input');
	lookUp(input[0].value);
	setTimeout(function(){load[0].style.visibility='hidden';},12000);
}

function byYear(value){
	if(value=='prev'){
		var drop =document.getElementsByClassName("dropdown-content");
		/*console.log(drop);*/
		for(var index=1;index<5;index++){
			drop[0].children[index].innerText-=4;
			drop[0].children[index].setAttribute('onclick','byYear('+drop[0].children[index].innerText+')');
		//	console.log(drop[0].children[index].onclick);
		}
	}
	
	else if(value=='next'){
		var drop =document.getElementsByClassName("dropdown-content");
		/*console.log(drop);*/
		for(var index=1;index<5;index++)
			for(var i=0;i<4;i++){
			drop[0].children[index].innerText++;
			drop[0].children[index].setAttribute('onclick','byYear('+drop[0].children[index].innerText+')');
			}
			
	}
	else{
		var hide=new Array(rows[3].cells.length);
		for(var ab=0;ab<rows[3].cells.length;ab++){
			hide[ab]="false";
			if(rows[3].cells[ab].innerHTML.includes(value))
				hide[ab]="true";
		}
	
		/*console.log(hide);
		/*traverse by row*/
		for(var a=0;a<8;a++){
			for(b=0;b<rows[3].cells.length;b++){
				/*console.log(rows[a].cells[b].style.display);*/
				if(hide[b]=="true"){

				}
				else{
					rows[a].cells[b].style.visibility='hidden';
				}
			}
		}
	}	
}

function genre(val){
	var load=document.querySelectorAll("div.contain");
	load[0].style.visibility='visible';
	/*console.log("Value= "+val);*/
	var q=new XMLHttpRequest();
		q.open('GET','https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/'+val+"/artists&output=json",false);
		q.send();
		if(q.status==200 && q.readyState==4 ){
			var re=JSON.parse(q.responseText);
			var artist_IDz=[];
			for(var i=0;i<5;i++){
				artist_IDz.push(re.data[i].id);
			}	
		}
	var track_idz=[];
	var a_id =new XMLHttpRequest();
		for(var k=0;k<artist_IDz.length;k++){
			a_id.open('GET','https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/' + artist_IDz[k]+ '/top?limit=1',false);
			a_id.send();
			if(a_id.status=200 && a_id.readyState==4){
				track_idz.push(JSON.parse(a_id.responseText).data[0].id);
				/*console.log(track_idz[k]);*/
			}
		}
	displayResults(track_idz);
	setTimeout(function(){load[0].style.visibility='hidden';},12000);
		
}


/* Helper Functions*/
function loading(){
	var load=document.querySelectorAll("div.contain");
	load[0].style.visibility='visible';
}

function doneLoading(){
	var load=document.querySelectorAll("div.contain");
	load[0].style.visibility='hidden';
}

function lookUp(searchValue){
	
	var query=new XMLHttpRequest();
		query.open('GET','https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q='+searchValue+"&output=json",false);
		query.send();
	if(query.status==200 && query.readyState==4 ){
		var result=JSON.parse(query.responseText);
		
		try{
			var result_length=Object.keys(result.data).length;
			
			if(result_length==0){
				
				throw"";
			}
			var ID=[];
			if(result_length<=5){
				for(var i=0;i<result_length;i++){
					ID.push(result.data[i].id);
				}	
			}
			else{
				for(var i=0;i<5;i++){
					ID.push(result.data[i].id);
				}
			}
		/*	console.log("Point Reached");*/
			displayResults(ID);
			/*console.log("Point Passed");*/
		}
		catch
		{	
				var loader=document.querySelectorAll("div.contain1");
				loader[0].style.visibility='visible';
				setTimeout(function(){loader[0].style.visibility='hidden';},12000)
			
		}
		finally{
			;
		}
	}		
}
		
	

//Takes track ID's as parameter
function displayResults(track_i){
	var d=new Array(track_i.length);
	/*console.log("TRack I length: "+track_i.length);*/
	var rowz=document.getElementsByTagName("tr");
	var td=document.getElementsByTagName("td");
	var resp=new Array(track_i.length);
	for(var p=0;p<track_i.length;p++){
		d[p]=new XMLHttpRequest();
		d[p].open('GET','https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/'+track_i[p]+"&output=json",false);
		d[p].send();
		
		
		if(d[p].readyState==4 &&d[p].status==200){
			resp[p]=JSON.parse(d[p].responseText);
			/*console.log(resp[p]);*/
		}
	}
	
	for(var i=0;i<5;i++){                                                                                                  
				
					if(i==0)
					{
						for(var j=0;j<track_i.length;j++)
						{
						
						/*console.log(rows[0].cells[j].children[0].src);
						/*console.log("Data to be changed: "+resp[j%5].album.cover_xl);*/
						rows[0].cells[j].children[0].src=resp[j].album.cover_xl;
						
						}
						
					}
					else if(i==1)
					{	/*console.log("Execution point 1");*/
						for(var j=5;j<10-(5-track_i.length);j++){
							/*console.log(td[j].innerHTML)*/
						td[j].innerHTML="Title : "+resp[j%5].title;
						
						}
						/*console.log("Execution point 2");*/
					}	
					else if(i==2)
					{
						for(var j=10;j<15-(5-track_i.length);j++){
						td[j].innerHTML="Artist: "+resp[j%5].artist.name;
						
						}
						
					}
					else if(i==3)
					{
						for(var j=15;j<20-(5-track_i.length);j++){
					/*	console.log("Release date 2changed");*/
						td[j].innerHTML="Release Date: "+resp[j%5].release_date;
						}
						
					}
					else
					{
						for(var j=35;j<40-(5-track_i.length);j++){
						/*console.log("Rating changed ")*/
						td[j].innerHTML="Album: "+resp[j%5].album.title;
						}
						
					}
			
		    }

}