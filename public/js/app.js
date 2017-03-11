$(function () {
	var socket = io();
	socket.on('person entered', function(users){
		var str = JSON.stringify(user);
	//$('#user').text(str);

		for ( i = 0; i<users.length; i++) {


			var isNewCustomer = false;
			if(users[0].visits.length == 0) {
				isNewCustomer = true;
			}
			$('.userinstore-wrapper').append('<div class="user-wrapper"> <div style="height: 100px;"> <div class="user-foto-wrapper"> <img src="./img/user/1.png"> </div> <div class="user-description-wrapper">'+ users[0].prename +' '+ users[0].lastname +'</div> </div> <div class="user-details-wrapper">Last Visit: 14.3.2017 14:30</div> </div>');
			
			if (users[0].isNew = true) {
				$('.user-wrapper').addClass('active');
			}

			if (isNewCustomer = true) {
				$('.badge-newcustomer').show();
			}
		}

	});
});



