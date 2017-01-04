$(function(){


	var users = localStorage.getItem("users");	
	users = JSON.parse(users);
	var backers = $.grep(users, function(e){ return e.userType == "backer"; });
	//console.log(backers);

	$("#filter").keyup(function(){

		// Retrieve the input field text and reset the count to zero
		var filter = $(this).val(), count = 0;
		filter = filter.toLowerCase();

		var backersSel = $.grep(backers, function(e){
			return e.nombre.toLowerCase().startsWith(filter)&&filter!="";
		});

		var html = "";
		for(var i=0;i<backersSel.length;i++){
			html+= '<li class="destItem" name="'+backersSel[i]["userID"]+'"><img class="w3-circle" style="width:30px;height:30px;" src="'+backersSel[i]["avatar"]+'"/><span style="font-size:24px;">'+backersSel[i]["nombre"]+'</span></li>';
		}		
		$("#destSel").html(html);

		$(".destItem").unbind('click').click( function(){
			//console.log($(this).attr('name'));
			$( "#destinatario" ).show();
			var html = '<div id="destinatario"></div>';
			$( "#messageTo" ).append(html);
			$(this).children().appendTo( "#destinatario" );
			html = '<span onclick="delDest(this)" class="w3-closebtn">&times;</span>';
			$( "#destinatario" ).append(html);
			$(".lineInput").hide();
			$( "#destSel" ).html("");
		});
	});

		



	
});

function delDest(e){
	$(".lineInput").show();
	e.parentElement.parentElement.removeChild(e.parentElement);
	$("#filter").val("");
}

function GetUrlValue(varsearch){
	var searchstring = window.location.search.substring(1);
	var variablearray = searchstring.split('&');
	for(var i = 0; i < variablearray.length; i++){
		var keyvaluepair = variablearray[i].split('=');
		if(keyvaluepair[0] == varsearch){
			return keyvaluepair[1];
		}
	}
}

function getDate(day,month,year){
	var html = '<div id="day" style="width: auto;">'+day+'</div>/';	
	html+='<div id="month" style="width: auto;">'+month+'</div>/';
	html+='<div id="year" style="width: auto;">'+year+'</div>';		
	return html;
}
