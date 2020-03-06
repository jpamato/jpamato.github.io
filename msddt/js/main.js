// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player1;
var player2;
var isFullscreen = false;
function onYouTubeIframeAPIReady() {
	player1 = new YT.Player('player1', {
height: '540',
width: '960',
//height: '180',
//width: '320',
videoId: 'yuIBVYtztAU',
playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo': 0 },
events: {
'onReady': onPlayer1Ready,
'onStateChange': onPlayer1StateChange
}
});
player2 = new YT.Player('player2', {
height: '540',
width: '960',
//height: '180',
//width: '320',
videoId: 'B7Ez3KUxnKA',
playerVars: { 'controls': 0, 'showinfo': 0 },
events: {
'onReady': onPlayer2Ready,
'onStateChange': onPlayer2StateChange
}
});
}

var player1Ready = false;
var player2Ready = false;

var preloading1 = false;
var preloading2 = false;
// 4. The API will call this function when the video player is ready.
function onPlayer1Ready(event) {
	player1Ready = true;
	preloading1 = true;
	player1.mute();
	$( "#player1" ).hide();
	player1.seekTo(1);

}

function onPlayer2Ready(event) {
	player2Ready = true;
	/*
	   preloading2 = true;
	   player2.mute();
	//$( "#player2" ).hide();
	player2.seekTo(1,true);*/
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayer1StateChange(event) {
	if (event.data == YT.PlayerState.PLAYING ) {
		if(preloading1)
		{
			//alert("Para ver los 2 canales de video sincronizados presione 'play' 2 veces. Press 'play' button twice for sync the videos");
			player1.pauseVideo();
			player1.seekTo(0);
			//player1.unMute(); // Comment this after test
			$( "#player1" ).show();
			preloading1 = false;

			player2Ready = true;
			preloading2 = true;
			player2.mute();
			//$( "#player2" ).hide();
			player2.seekTo(1);
		}
		else
			player2.playVideo();

	}

	else if (event.data == YT.PlayerState.PAUSED ) {
		if(!preloading1)
			player2.pauseVideo();
	}
	else if (event.data == YT.PlayerState.BUFFERING ) {
		if(!preloading1)
		{
			player2.pauseVideo();
		}

	}
	else if (event.data == YT.PlayerState.CUED ) {
		if(!preloading1)
			player2.pauseVideo();

	}
	else if (event.data == YT.PlayerState.ENDED ) {
		player2.stopVideo();

	}
}

function onPlayer2StateChange(event) {
	if (event.data == YT.PlayerState.PLAYING ) {
		$( "#play" ).hide();
		$( "#pause" ).show();
		if(preloading2)
		{
			//prompt("2");
			player2.pauseVideo();
			player2.seekTo(0);
			player2.unMute();
			preloading2 = false;
			$( "#player2" ).show(50, function() {
					//player2.playVideo();
					});
		}
		else
			player1.playVideo();
	}
	else if (event.data == YT.PlayerState.PAUSED ) {
		$( "#play" ).show();
		$( "#pause" ).hide();
		if(/*!preloading1 &&*/ !preloading2)
			player1.pauseVideo();
	}

	else if (event.data == YT.PlayerState.BUFFERING ) {
		if(!preloading2)
		{
			player1.pauseVideo();
			//player1.seekTo(... // Correct the offset here
		}

	}

	else if (event.data == YT.PlayerState.CUED ) {
		if(!preloading2)
			player1.pauseVideo();

	}
	else if (event.data == YT.PlayerState.ENDED ) {
		player1.stopVideo();

	}

}
function stopVideo() {
	player1.stopVideo();
	player2.stopVideo();
}

function toggleFullScreen() {
	if (!document.fullscreenElement &&    // alternative standard method
			!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
}

$( "#play" ).unbind('click').click( function(){
		player2.playVideo();
		$( "#play" ).hide();
		$( "#pause" ).show();
		if(!isFullscreen){
			toggleFullScreen();
			isFullscreen = true;
		}    
});

$( "#pause" ).unbind('click').click( function(){
		player2.pauseVideo();
		$( "#pause" ).hide();
		$( "#play" ).show();
		});
