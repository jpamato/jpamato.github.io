// JavaScript Document

<!--
// -----------------------------------------------------------------------------
// Globals
// Major version of Flash required
var requiredMajorVersion = 8;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Minor version of Flash required
var requiredRevision = 0;

// -----------------------------------------------------------------------------

var audioFolder = "http://dl.dropbox.com/u/58838894/audio/"

function audioplayer(){

	//miAudio = window.open("","JPA_" + window.name,"status=yes,resizable=yes, width=500,height=450")
	//miAudio.document.open()
	//miAudio.document.bgColor="FFFFFF"
	//miAudio.document.write("<HEAD><TITLE>"+ name +"</TITLE></HEAD><BODY><CENTER>")
	
		//var miAudio = entradas.getElementsById('audiop');
		//var	name = miAudio.title;
		//alert(name);		
	if(supports_audio()){
		var entradas = document.getElementsByClassName('audiop'); //Objeto del applet embebido en la pagina		
		for (i=0;i<entradas.length;i++){
			entradas[i].innerHTML = "<audio id='audioplayer' controls> <source src='"+audioFolder+entradas[i].id+".mp3' type='audio/mp3'/> <source src='"+audioFolder+entradas[i].id+".ogg' type='audio/ogg' /> </audio>";
		}
	}else if(supports_flash()){
		var divs = document.getElementsByTagName("div");		
		for (i=0;i<divs.length;i++){			
			 if (divs[i].className == "audiop") {				
				divs[i].innerHTML = "<object type='application/x-shockwave-flash' data='http://dl.dropbox.com/u/58838894/audio/player.swf' id='audioplayer1' height='24' width='290'> <param name='movie' value='http://dl.dropbox.com/u/58838894/audio/player.swf'> <param name='FlashVars' value='playerID=1&amp;soundFile="+audioFolder+divs[i].id+".mp3'> <param name='quality' value='high'> <param name='menu' value='false'> <param name='wmode' value='transparent'> </object>";
			 }
		}
	}else{
	flash_required();
	}	
}

function flickrslideshow(){

	if(supports_flash()){
		var divs = document.getElementsByTagName("div");		
		for (i=0;i<divs.length;i++){			
			 if (divs[i].className == "flckrshw") {				
				divs[i].innerHTML = "<object width='400' height='300'> <param name='flashvars' value='offsite=true&lang=es-us&page_show_url=%2Fphotos%2Fjpamato%2Fsets%2F"+divs[i].id+"%2Fshow%2F&page_show_back_url=%2Fphotos%2Fjpamato%2Fsets%2F"+divs[i].id+"%2F&set_id="+divs[i].id+"&jump_to='></param> <param name='movie' value='http://www.flickr.com/apps/slideshow/show.swf?v=71649'></param> <param name='allowFullScreen' value='true'></param><embed type='application/x-shockwave-flash' src='http://www.flickr.com/apps/slideshow/show.swf?v=71649' allowFullScreen='true' flashvars='offsite=true&lang=es-us&page_show_url=%2Fphotos%2Fjpamato%2Fsets%2F"+divs[i].id+"%2Fshow%2F&page_show_back_url=%2Fphotos%2Fjpamato%2Fsets%2F"+divs[i].id+"%2F&set_id="+divs[i].id+"&jump_to=' width='400' height='300'></embed></object>";				
			 }
		}
	}else {
		var entradas = document.getElementsByClassName('flckrshw'); //Objeto del applet embebido en la pagina		
		for (i=0;i<entradas.length;i++){	
			entradas[i] = new flickrshow(entradas[i].id, {
		    'set':entradas[i].id,
			'autoplay':false,
            'hide_buttons':false,
            'interval':3000,
			'speed':1,        
			//'transparent':true,		
			//'transform' :'fade',
			//'theme':'green'
			});
		}
	}
}

function supports_flash() {
	// Version check based upon the values entered above in "Globals"
	var hasReqestedVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);
	// Check to see if the version meets the requirements for playback
	if (hasReqestedVersion) {
		return true;
	} else {  // flash is too old or we can't detect the plugin
		return false;	
	}
}

function flash_required(){
	if(!supports_flash()){
		var alternateContent = 'Alternate HTML content should be placed here.<BR>'
		+ 'This content requires the Adobe Flash Player. '
		+ '<a href=http://www.adobe.com/go/getflash/>Get Flash</a>';
		document.write(alternateContent);  // insert non-flash content
	}
}

function supports_canvas() {
	  return !!document.createElement('canvas').getContext;
}

function supports_audio() {	
	return !!(document.createElement('audio').canPlayType);
}
	
// Flash Player Version Detection - Rev 1.6
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
			//alert("flashVer="+flashVer);
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

        	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
  if (src.indexOf('?') != -1)
    return src.replace(/\?/, ext+'?'); 
  else
    return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
    var str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (var i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		for (var i in params)
  			str += '><param name="' + i + '" value="' + params[i] + '" /> ';
  		str += '></object>';
    } else {
  		str += '<embed ';
  		for (var i in embedAttrs)
  			str += i + '="' + embedAttrs[i] + '" ';
  		str += '> </embed>';
    }

    document.write(str);
}

function AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
  var ret = new Object();
  ret.embedAttrs = new Object();
  ret.params = new Object();
  ret.objAttrs = new Object();
  for (var i=0; i < args.length; i=i+2){
    var currArg = args[i].toLowerCase();    

    switch (currArg){	
      case "classid":
        break;
      case "pluginspage":
        ret.embedAttrs[args[i]] = args[i+1];
        break;
      case "src":
      case "movie":	
        args[i+1] = AC_AddExtension(args[i+1], ext);
        ret.embedAttrs["src"] = args[i+1];
        ret.params[srcParamName] = args[i+1];
        break;
      case "onafterupdate":
      case "onbeforeupdate":
      case "onblur":
      case "oncellchange":
      case "onclick":
      case "ondblClick":
      case "ondrag":
      case "ondragend":
      case "ondragenter":
      case "ondragleave":
      case "ondragover":
      case "ondrop":
      case "onfinish":
      case "onfocus":
      case "onhelp":
      case "onmousedown":
      case "onmouseup":
      case "onmouseover":
      case "onmousemove":
      case "onmouseout":
      case "onkeypress":
      case "onkeydown":
      case "onkeyup":
      case "onload":
      case "onlosecapture":
      case "onpropertychange":
      case "onreadystatechange":
      case "onrowsdelete":
      case "onrowenter":
      case "onrowexit":
      case "onrowsinserted":
      case "onstart":
      case "onscroll":
      case "onbeforeeditfocus":
      case "onactivate":
      case "onbeforedeactivate":
      case "ondeactivate":
      case "type":
      case "codebase":
        ret.objAttrs[args[i]] = args[i+1];
        break;
      case "id":
      case "width":
      case "height":
      case "align":
      case "vspace": 
      case "hspace":
      case "class":
      case "title":
      case "accesskey":
      case "name":
      case "tabindex":
        ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
        break;
      default:
        ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
    }
  }
  ret.objAttrs["classid"] = classid;
  if (mimeType) ret.embedAttrs["type"] = mimeType;
  return ret;
}


function loadApplet(name,code,src)
{
	
br = BrowserDetect.browser;
if ((window.name == null) || (window.name == "") || (window.name == "main"))
{
    window.name = name;
}
if(navigator.javaEnabled()){

if(br=='Explorer'){
miApplet = window.open("","JPA_" + window.name,"status=yes,resizable=yes, width=500,height=450")
miApplet.document.open()
miApplet.document.bgColor="FFFFFF"
miApplet.document.write("<HEAD><TITLE>"+ name +"</TITLE></HEAD><BODY><CENTER>")
miApplet.document.write("<OBJECT classid='clsid:8AD9C840-044E-11D1-B3E9-00805F499D93' codebase='http://java.sun.com/update/1.5.0/jinstall-1_5_0_15-windows-i586.cab' standby='Loading...' WIDTH='100%' HEIGHT='100%'>")
miApplet.document.write("<PARAM NAME='CODE' VALUE='"+code+"'>")
miApplet.document.write("<PARAM NAME='ARCHIVE' VALUE='"+src+"'>")
miApplet.document.write("<PARAM NAME='mayscript' VALUE='true'>")
miApplet.document.write("<PARAM NAME='scriptable' VALUE='true'>")
miApplet.document.write("<PARAM NAME='image' VALUE='http://dl.dropbox.com/u/58838894/mg2/loading.gif'>")
miApplet.document.write("<PARAM NAME='boxmessage' VALUE='Loading...'>")
miApplet.document.write("<PARAM NAME='boxbgcolor' VALUE='FFFFFF'>")
miApplet.document.write("<PARAM NAME='test_string' VALUE='inner'>")
miApplet.document.write("<p><strong>This browser does not have a Java Plug-in.<a href='http://java.sun.com/products/plugin/downloads/index.html' title='Download Java Plug-in'>Get the latest Java Plug-in here.</a></strong></p>");
miApplet.document.write("</OBJECT></CENTER></BODY>")
miApplet.document.close();

}else{


miApplet = window.open("","JPA " + window.name,"status=yes,resizable=yes, width=500,height=450")
miApplet.document.open()
miApplet.document.bgColor="FFFFFF"
miApplet.document.write("<HEAD><TITLE>"+ name +"</TITLE></HEAD><BODY><CENTER>")
miApplet.document.write("<OBJECT classid='java:"+code+".class' type='application/x-java-applet' archive='http://dl.dropbox.com/u/58838894/mg2/C5_.jar' standby='Loading...' WIDTH='100%' HEIGHT='100%' CODE='"+code+"'>")
miApplet.document.write("<PARAM NAME='ARCHIVE' VALUE='"+src+"'>")
miApplet.document.write("<PARAM NAME='mayscript' VALUE='true'>")
miApplet.document.write("<PARAM NAME='scriptable' VALUE='true'>")
miApplet.document.write("<PARAM NAME='image' VALUE='http://dl.dropbox.com/u/58838894/mg2/loading.gif'>")
miApplet.document.write("<PARAM NAME='boxmessage' VALUE='Loading...'>")
miApplet.document.write("<PARAM NAME='boxbgcolor' VALUE='FFFFFF'>")
miApplet.document.write("<PARAM NAME='test_string' VALUE='outer'>")
miApplet.document.write("</OBJECT></CENTER></BODY>")
miApplet.document.close();
}
}else{

miApplet = window.open("","JPA_" + window.name,"status=yes,resizable=yes, width=500,height=450")
miApplet.document.open()
miApplet.document.bgColor="FFFFFF"
miApplet.document.write("<HEAD><TITLE>"+ name +"</TITLE></HEAD><BODY><CENTER>")
miApplet.document.write("<p><strong>This browser does not have a Java Plug-in.<br><a href='http://java.sun.com/products/plugin/downloads/index.html' title='Download Java Plug-in'>Get the latest Java Plug-in here.</a></strong></p>");
miApplet.document.write("</CENTER></BODY>")
}
}

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();