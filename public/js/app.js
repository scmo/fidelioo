
function loadCustomersInStore(customers) {
  var str = JSON.stringify(customers);
		$('.userinstore-wrapper').empty();
		console.log(str);
	//$('#user').text(str);

		for ( i = 0; i<customers.length; i++) {


			var isNewCustomer = false;
			if(customers[i].visits.length == 0) {
				isNewCustomer = true;
			}
			$('.userinstore-wrapper').append('<div class="user-wrapper"> <div style="position: relative; z-index:1;"> <div class="user-foto-wrapper"> <img src="./img/user/1.png"> </div> <div class="user-description-wrapper">'+ customers[i].prename +' '+ customers[i].lastname +'<div class="badge-newcustomer"><span class="badge badge-success firsttimeuserbadge">First Time Visitor</span><span class="last-visit">Last Visit: '+ moment.unix((customers[i].arrivedAt)).format('MM/DD/YYYY') +'</span></div></div><br style="clear: left;" /> </div> <div class="user-details-wrapper">Number of past visits: '+ customers[i].visits.length +'<br>Arrived: '+ moment.unix((customers[i].arrivedAt)).format('MM/DD/YYYY') +'</div> </div>');
			
			if (customers[i].isNew == true) {
				console.log("new");
				$('.user-wrapper').last().addClass('active');
			} else {
				console.log("not new");
				$('.user-wrapper').last().removeClass('active');
			}
			
			if (isNewCustomer == true) {
				$('.last-visit').last().hide();
				$('.firsttimeuserbadge').last().show();
			} else {
				$('.last-visit').last().show();
				$('.firsttimeuserbadge').last().hide();
			}


			
		}
}

$( document ).ready(function() {
	$.get( "/customers/", function( customers ) {
		console.log(customers);
		loadCustomersInStore(customers);
	});


	$(document).on('click', '.user-wrapper', function(){
		$(this).find(".user-details-wrapper").toggle();
	});
});


$(function () {
	var socket = io();
	socket.on('person entered', function(customers){
		loadCustomersInStore(customers);
	});
});



