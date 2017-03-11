$(function () {
	var socket = io();
	socket.on('person entered', function(user){
		var str = JSON.stringify(user);
	//$('#user').text(str);

		$('.userinstore-wrapper').append('<div class="user-wrapper active"> <div style="height: 100px;"> <div class="user-foto-wrapper"> <img src="./img/user/1.png"> </div> <div class="user-description-wrapper"> Eric Almquist </div> </div> <div class="user-details-wrapper">Last Visit: 14.3.2017 14:30</div> </div>');

	});
});



