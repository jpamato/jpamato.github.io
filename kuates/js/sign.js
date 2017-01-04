var registro = {};
var file;
var backer = false
$(function(){
	/*$('#date').combodate({
		firstItem: 'name', //show 'hour' and 'minute' string at first item of dropdown        
	});*/	

	$('#date').html(getDateSelector(1970,2016));

	$("#submitButt").prop('disabled', true);

	$( "#year" ).change(function() {
		console.log($( "select#year" ).val());
 		if($( "select#year" ).val()<2000){
			$( "#backers" ).show();
			$('#toCrear').hide();
			$('#base1').hide();
			$( "#base1 input:checkbox:checked" ).prop('checked', false);
			$( "#base2 input:checkbox:checked" ).prop('checked', false);
			$("#submitButt").prop('disabled', true);
			backer = true;
		}else{
			$( "#backers" ).hide();
			$('#toCrear').show();
			$('#base1').show();
			$( "#base1 input:checkbox:checked" ).prop('checked', false);
			$( "#base2 input:checkbox:checked" ).prop('checked', false);
			$("#submitButt").prop('disabled', true);
			backer = false;
		}
	});

	$( "#base1 input" ).change(function() {
		console.log('base1 change: '+$( "#base1 input:checkbox:checked" ).val());
		if($( "#base1 input:checkbox:checked" ).val())
			$("#submitButt").prop('disabled', false);
		else
			$("#submitButt").prop('disabled', true);
	});

	$( "#base2 input" ).change(function() {
		console.log('base2 change: '+$( "#base2 input:checkbox:checked" ).val());
		if($( "#base2 input:checkbox:checked" ).val())
			$("#submitButt").prop('disabled', false);
		else
			$("#submitButt").prop('disabled', true);
	});

	$( "#signForm" ).submit(function( event ) {
		// get all the inputs into an array.
		var complete = true;
		var $inputs = $('#signForm :input');

		$inputs.each(function() {
			registro[this.name] = $(this).val();
			if($(this).hasClass("required")){
				if($(this).val()==""){
					incomplete("Debes completar con tu '"+this.name+"' para finalizar tu registro");
					registro = {};
					complete=false;
				}
			}			
			//console.log(this.name+" : "+$(this).val());
		});

		registro['avatar'] = $('#userPhoto img').attr("src");

		if(registro['contraseña']!=registro['ccontraseña']){
			incomplete("Tu contraseña y su confirmación no coinciden");
			registro = {};
			complete=false;
		}
		
		console.log(registro);
		
		if(complete){
			$('.campos').hide();
			$('#backers').hide();
			$('#submitButt').hide();
			$('#signDone').show();
			$('.user').html(registro['nombre'].toUpperCase());
		}
		event.preventDefault();
	});	

	$("#fileInput").change(function() {
		file = this.files[0];
		$('#userPhoto img').attr("src",URL.createObjectURL(file));		
	});
});

function getDateSelector(minYear,maxYear){
	var html = '<select id="day" name="day" style="width: auto;"><option value="">DÍA</option>';
	for(var i=1;i<32;i++)
		html+='<option value="'+i+'">'+i+'</option>';
	
	html+='</select>&nbsp;<select id="month" name="month" style="width: auto;"><option value="">MES</option><option value="0">Ene</option><option value="1">Feb</option><option value="2">Mar</option><option value="3">Abr</option><option value="4">May</option><option value="5">Jun</option><option value="6">Jul</option><option value="7">Ago</option><option value="8">Sep</option><option value="9">Oct</option><option value="10">Nov</option><option value="11">Dic</option></select>&nbsp;<select id="year" name="year" style="width: auto;"><option value="">AÑO</option>';
		
	for(var i=maxYear;i>minYear-1;i--)
		html+='<option value="'+i+'">'+i+'</option>';
	
	html+='</select>';
	return html;
}



$("#signDone").unbind('click').click( function(){
	$("#signDone").hide();	
	$('#toLog').hide();
	$('#logged').show();
	$('#logged img').attr("src",registro['avatar']);
	$('#logged H6').html(registro['nombre']);
	localStorage.setItem("user",registro['nombre']);
	var userID = generateID();
	localStorage.setItem("userID",userID);
	registro['userID'] = userID;
	if(backer){
		registro['userType'] = "backer";
		localStorage.setItem("userType","backer");
	}else{
		registro['userType'] = "kuate";
		localStorage.setItem("userType","kuate");
	}

	var users = localStorage.getItem("users");			
	if(users==null){
		users = [];
	}else{
		users = JSON.parse(users);	
	}
	users.push(registro);
	localStorage.setItem("users",JSON.stringify(users));
	userIndex = users.length-1;
	localStorage.setItem("userIndex",userIndex);

	var reader  = new FileReader();

  	reader.onloadend = function () {			
			localStorage.setItem("avatar",reader.result);
			registro['avatar'] = reader.result;

			var users = localStorage.getItem("users");			
			users = JSON.parse(users);	
			users[userIndex]=registro; 
			localStorage.setItem("users",JSON.stringify(users));	
	};

	if (file) {
    		reader.readAsDataURL(file);
	}

	//localStorage.setItem("avatar",registro['avatar']);
	console.log("ACA");
	console.log(registro);		
	localStorage.setItem("logged",1);
	app.log = 1;
	$("#signActivated").show();
	$('.user').html(registro['nombre'].toUpperCase());
});

function incomplete(mess){
	$('#dialog').css("left","35%");
	$('#dialog').css("width","30%");
	$('#dialog').css("height","150px");
	var html = "<H4>ERROR DE REGISTRO</H4>"+
		"<p style='text-align:left'>"+mess+"</p>";
	$('#dialogContent').html(html);
	$('#dialog').show();
	fullMaskToggle();
}
