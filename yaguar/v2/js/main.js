/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function NavToggle(val) {
    var x = document.getElementById("myTopnav");
    var y = document.getElementById("header-content");
    if(val==null){
	    if (x.className === "topnav") {
		x.className += " responsive";
	    } else {
		x.className = "topnav";
	    }

	    if (y.className === "responsive") {
	    	y.className="";
	    }else{
		y.className="responsive";
	    }
    }else if(val){
	x.className = "topnav responsive";
        y.className = "responsive";
    }else{
	x.className = "topnav";
	y.className = "";
    }
}

$(window).bind('scroll', function(){
	var t = $(this).scrollTop();
	var w = $(this).width();

	if (t>100){
		$('#logoBar').hide();
		
	}else{
		if(w>767)$('#logoBar').show();		
	}
	
});

window.addEventListener("resize", function() {
	var t = $(this).scrollTop();
	if($(window).width()<768){
		$('#logoBar').hide();
	}else{
		if(t<101)$('#logoBar').show();		
	}

}, false);

function fullMaskToggle(){
	if($('#fullMask').is(":visible") == true)
		$('#fullMask').hide();
	else{
		$('#fullMask').show();
		$('#fullMask').css("height",$(document).height()+"px");
	}
}

function closeDialog(e){
	e.parentElement.style.display='none';	
	fullMaskToggle();
}

function abrirConsulta(){
	$('#consulta').show();
	$(window).scrollTop(0);
}

function enviarConsulta(){
	$('#consulta').hide();
	event.preventDefault();
}

$('.buscarSubmit').click(function() { 
    console.log('Buscando: '+$('#buscar').val());
});


$.getJSON( "data/works.json", function( data ) {
	var html = "";
	$.each( data, function(index) {

		html+="<div class='w3-col m6 l6'><div class='inner-content gal_item'><div class='work-img' >";

		if(data[index]['img']!==undefined)
			html+="<img src="+data[index]['img']+" alt="+data[index]['title']+" title="+data[index]['title']+">";
		if(data[index]['video']!==undefined)
			html+="<div class='video'><iframe width='100%' src="+data[index]['video']+" frameborder='0' allowfullscreen></iframe></div>";

		html+="</div><div class='work-content'><h3><b>"+data[index]['title']+"</b></h3>"+
			"<h6><b>"+data[index]['roles']+"</b></h6>"+
			"<p>"+data[index]['desc']+"</p>"+
			"<p>Cliente: ";

		if(data[index]['clientUrl']!==undefined)
			html+="<a href='"+data[index]['clientUrl']+"'>"+data[index]['client']+"</a></p>";
		else
			html+=""+data[index]['client']+"</p>";

		html+="<p>"+data[index]['credits']+"</p>";


		html+="<div class='work-links'>";
		
		if(data[index]['playStore']!==undefined)
			html+="<a href="+data[index]['playStore']+" target='_blank'><img src='img/works/icon-google.png' alt=''  /></a>";

		if(data[index]['itunes']!==undefined)
			html+="<a href="+data[index]['itunes']+" target='_blank'><img src='img/works/icon-appstore.png' alt=''  /></a>";

		if(data[index]['link']!==undefined)
			html+= "<a href="+data[index]['link']+" target='_blank'><img src='img/works/icon-link.png' alt=''  /></a>";
		
		if(data[index]['videoLink']!==undefined)
			html+="<a href="+data[index]['videoLink']+" target='_blank'><img src='img/works/icon-video.png' alt=''  /></a>";

		html+="</div></div></div></div>";
  	});
	$("#gallery-row").html(html);
});
