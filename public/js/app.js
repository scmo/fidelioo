
function loadCustomersInStore(customers) {
  var str = JSON.stringify(customers);
		$('.user-wrapper').remove();
		console.log(str);
	//$('#user').text(str);

		for ( i = 0; i<customers.length; i++) {


			var isNewCustomer = false;
			if(customers[i].visits.length == 0) {
				isNewCustomer = true;
			}

			$('.userinstore-wrapper').append('<div class="user-wrapper"> <div style="position: relative; z-index:1;"> <div class="user-foto-wrapper"> <img src="./img/user/'+ customers[i].uid +'.png"> </div> <div class="user-description-wrapper">'+ customers[i].prename +' '+ customers[i].lastname +'<div class="badge-newcustomer"><span class="badge badge-success firsttimeuserbadge">First Time Visitor</span><span class="last-visit">Last Visit: '+ moment.unix((customers[i].visits[0])).format('MM.DD.YYYY') +'</span></div></div><br style="clear: left;" /> </div> <div class="user-details-wrapper">Arrived: '+ moment.unix((customers[i].arrivedAt)).format('HH:mm') +'<br>Number of past visits: '+ customers[i].visits.length +'<br>Birthday '+ moment.unix((customers[i].birthdate)).format('MM.DD.YYYY') +'<br></div> </div>');
			
			if (customers[i].isNew == true) {
				console.log("new");
				$('.user-wrapper').last().addClass('active');
			} else {
				console.log("not new");
				$('.user-wrapper').last().removeClass('active');
			}
			
			// check if customers birthday
			if (isNewCustomer == true) {
				$('.last-visit').last().hide();
				$('.firsttimeuserbadge').last().show();
			} else {
				$('.last-visit').last().show();
				$('.firsttimeuserbadge').last().hide();
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

	$(document).on('click', '.paybutton-wrapper', function(){
		$('.overlay-background').show();
	});

	$(document).on('click', '.continuewithoutvoucherbutton', function(){
		$('.overlay-background').hide();
		$('#bill-image').hide();
		$('#paybutton-image').hide();
	});

	$(document).on('click', '.popup-wrapper table td', function(){
		$(this).find('.img2').show();
		setTimeout(function(){
			$('.overlay-background').hide();
			$('.img2').hide();
			$('#bill-image').hide();
			$('#paybutton-image').hide();
	}, 800);
		
	});
});


$(function () {
	var socket = io();
	socket.on('person entered', function(customers){
		loadCustomersInStore(customers);
	});
});



