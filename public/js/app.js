
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


      var userWrapper = $('<div/>', {class: 'user-wrapper'});
      userWrapper.append('<div style="position: relative; z-index:1;"> <div class="user-foto-wrapper"> <img src="./img/user/'+ customers[i].uid +'.png"> </div> <div class="user-description-wrapper">'+ customers[i].prename +' '+ customers[i].lastname +'<span class="badge badge-primary brithdaybadge" style="float:right;">Birthday</span><div class="badge-newcustomer"><span class="badge badge-success firsttimeuserbadge">First Time Visitor</span><span class="last-visit">Last Visit: '+ moment.unix((customers[i].visits[0])).format('MM.DD.YYYY') +'</span></div></div><br style="clear: left;" /> </div> <div class="user-details-wrapper">Arrived: '+ moment.unix((customers[i].arrivedAt)).format('HH:mm') +'<br>Number of past visits: '+ customers[i].visits.length +'<br>Birthday '+ moment.unix((customers[i].birthdate)).format('MM.DD.YYYY') +'<br></div>');


       $('.userinstore-wrapper').append(userWrapper);
       
       if (customers[i].justEntered){
         userWrapper.addClass( "just-entered" );
          userWrapper.find(".user-details-wrapper").show();
      
      }
     
     
      $('div.just-entered').css("display", "none");
      $('div.just-entered').slideDown();




			if (customers[i].isNew == true) {
				console.log("new");
				$('.user-wrapper').last().addClass('active');
			} else {
				console.log("not new");
				$('.user-wrapper').last().removeClass('active');
			}
			
			// check if customers birthday
			var birthday = new Date(moment.unix((customers[i].birthdate)).format("MM/DD/YYYY"));
			var today = new Date();
			console.log(birthday)

			var hasBirthday = false;
			birthday.setYear(2017);
			today.setYear(2017);
			if(birthday.setHours(0,0,0,0) == today.setHours(0,0,0,0)) {
				hasBirthday = true;
			 }

			if (hasBirthday == true) {

				$('.brithdaybadge').last().show();
			} else {

				$('.brithdaybadge').last().hide();
			}


			//check if customer new
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



