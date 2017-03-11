
function loadCustomersInStore(customers) {
  var str = JSON.stringify(customers);
		console.log(str);
	//$('#user').text(str);

		for ( i = 0; i<customers.length; i++) {


			var isNewCustomer = false;
			if(customers[0].visits.length == 0) {
				isNewCustomer = true;
			}
			$('.userinstore-wrapper').append('<div class="user-wrapper"> <div> <div class="user-foto-wrapper"> <img src="./img/user/1.png"> </div> <div class="user-description-wrapper">'+ customers[0].prename +' '+ customers[0].lastname +'</div><div class="badge-newcustomer"><img src="./img/new_badge.png"></div> <br style="clear: left;" /> </div> <div class="user-details-wrapper">Last Visit: 14.3.2017 14:30</div> </div>');
			
			if (customers[0].isNew = true) {
				$('.user-wrapper').addClass('active');
			}

			if (isNewCustomer = true) {
				$('.badge-newcustomer').show();
			}
		}
}

$( document ).ready(function() {
	$.get( "/customers/", function( customers ) {
		loadCustomersInStore(customers);
	});
});


$(function () {
	var socket = io();
	socket.on('person entered', function(customers){
		loadCustomersInStore(customers);
	});
});



