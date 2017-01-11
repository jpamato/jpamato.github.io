var file;
var backer = false;
var formChange = false;
$(function(){

	if(localStorage.getItem("userType")==="backer")
		$('.backers').show();

	$("#submitButt").prop('disabled', true);

	var $inputs = $('#signForm :input');	
	$inputs.each(function() {
		//console.log(this.id+": "+reg[this.id]);
		if(this.name!="avatar"&&!$(this).hasClass("noShow")){
			$(this).val(userReg[this.id]);		
		}
	});

	if(!formChange){
		$inputs.change(function() {
			$("#submitButt").prop('disabled', false);
			formChange = true;
		});
	}

	$('#userPhoto img').attr("src",localStorage.getItem("avatar"));	


	$('#date').html(getDate(userReg['day'],Number(userReg['month'])+1,userReg['year']));

	$("#fileInput").change(function() {
		file = this.files[0];
		$('#userPhoto img').attr("src",URL.createObjectURL(file));		
	});

	$(".edit").unbind('click').click( function(){
		var id = $(this).attr('name');
		
		$("#"+id).focus();
		console.log("ACAAA");		
	});

	$(".w3-input").focusin(function(){		
		$(this).css('color','#81f15e');
	});

	$(".w3-input").focusout(function(){		
		$(this).css('color','#0169e8');
	});

	$("#contrasena").change(function() {
		$("#ccontrasena").attr('readonly',false);
		$("#ccontrasena").val("");
	});


	$( "#signForm" ).submit(function( event ) {
		// get all the inputs into an array.
		var complete = true;
		var $inputs = $('#signForm :input');

		$inputs.each(function() {
			if(!$(this).hasClass("noShow")){
				userReg[this.id] = $(this).val();
				if($(this).hasClass("required")){
					if($(this).val()==""){
						incomplete("Debes completar con tu '"+this.id+"' para finalizar tu registro");
						complete=false;
					}
				}			
				//console.log(this.id+" : "+$(this).val());
			}
		});

		userReg['avatar'] = $('#userPhoto img').attr("src");

		if(userReg['contrasena']!=userReg['ccontrasena']){
			incomplete("Tu contrase&ntilde;a y su confirmación no coinciden");
			complete=false;
		}
		
		//console.log(registro);
		
		if(complete){

			$('#logged img').attr("src",$('#userPhoto img').attr("src"));

			var reader  = new FileReader();

			reader.onloadend = function () {			
					localStorage.setItem("avatar",reader.result);
					userReg['avatar'] = reader.result;

					var users = localStorage.getItem("users");			
					users = JSON.parse(users);	
					users[userIndex]=userReg; 
					localStorage.setItem("users",JSON.stringify(users));
			};

			if (file) {
				reader.readAsDataURL(file);
			}

			//console.log(registro);		

			var users = localStorage.getItem("users");			
			users = JSON.parse(users);	
			users[userIndex]=userReg; 
			localStorage.setItem("users",JSON.stringify(users));
				
			$("#submitButt").prop('disabled', true);
			formChange = false;
		}		

		event.preventDefault();
	});

});

function getDate(day,month,year){
	var html = '<div id="day" style="width: auto;">'+day+'</div>&nbsp;/&nbsp;';	
	html+='<div id="month" style="width: auto;">'+month+'</div>&nbsp;/&nbsp;';
	html+='<div id="year" style="width: auto;">'+year+'</div>';		
	return html;
}

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
