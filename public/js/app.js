function loadCustomersInStore(customers) {
  var str = JSON.stringify(customers);

  $('.user-wrapper').remove();

  console.log(str);
  //$('#user').text(str);

  for (i = 0; i < customers.length; i++) {

    var isNewCustomer = false;
    if (customers[i].visits.length == 0) {
      isNewCustomer = true;
    }

    var userWrapper = $('<div/>', {class: 'user-wrapper'});

    // var descList = $('<dl/>');
    // var dt1 = $('<dt/>').text('Arrived:');
    // var dd1 = $('<dd/>').text(moment.unix((customers[i].arrivedAt)).format('HH:mm'));
    //
    // var dt2 = $('<dt/>').text('Number of past visits:');
    // var dd2 = $('<dd/>').text(customers[i].visits.length);
    // var dt3 = $('<dt/>').text('Birthday:');
    // var dd3 = $('<dd/>').text(moment.unix((customers[i].birthdate)).format('MM.DD.YYYY'));
    // descList.append(dt1);
    // descList.append(dd1);
    // descList.append(dt2);
    // descList.append(dd2);
    // descList.append(dt3);
    // descList.append(dd3);
    userWrapper.append(
        '<div style="position: relative; z-index:1;"> <div class="user-foto-wrapper"> <img src="./img/user/'
        + customers[i].uid
        + '.png"> </div> <div class="user-description-wrapper">'
        + customers[i].prename + ' ' + customers[i].lastname
        + '<span class="badge badge-primary brithdaybadge" style="float:right;">Birthday</span><div class="badge-newcustomer"><span class="badge badge-success firsttimeuserbadge">First Time Visitor</span><span class="last-visit">Last Visit: '
        + moment.unix((customers[i].visits[0])).format('MM.DD.YYYY')
        + '</span></div></div><br style="clear: left;" /> </div> <div class="user-details-wrapper"><dl class="row"> <dt class="col-sm-8">Arrived:</dt> <dd class="col-sm-4">'
        + moment.unix((customers[i].arrivedAt)).format('HH:mm')
        + '</dd> <dt class="col-sm-8">Number of past visits:</dt> <dd class="col-sm-4">'
        + customers[i].visits.length + '</dd> <dt class="col-sm-8">Birthday:</dt> <dd class="col-sm-4">'
        + moment.unix((customers[i].birthdate)).format('MM.DD.YYYY')
        + '</dd> </dl></div>');
    console.log('find');
    console.log($('.user-details-wrapper'));

    $('.userinstore-wrapper').append(userWrapper);

    if (customers[i].justEntered) {
      userWrapper.addClass("just-entered");
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
    var birthday = new Date(moment.unix((customers[i].birthdate)).format(
        "MM/DD/YYYY"));
    var today = new Date();
    console.log(birthday)

    var hasBirthday = false;
    birthday.setYear(2017);
    today.setYear(2017);
    if (birthday.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
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

$(document).ready(function () {
  $.get("/customers/", function (customers) {
    console.log(customers);
    loadCustomersInStore(customers);
  });

  $(document).on('click', '.user-wrapper', function () {
    $(this).find(".user-details-wrapper").toggle();
  });

  $(document).on('click', '.paybutton-wrapper', function () {
    $('.overlay-background').show();
  });

  $(document).on('click', '.continuewithoutvoucherbutton', function () {
    $('.overlay-background').hide();
    $('#bill-image').hide();
    $('#paybutton-image').hide();
  });

  $(document).on('click', '.popup-wrapper table td', function () {
    $(this).find('.img2').show();
    setTimeout(function () {
      $('.overlay-background').hide();
      $('.img2').hide();
      $('#bill-image').hide();
      $('#paybutton-image').hide();
    }, 800);

  });
});

$(function () {
  var socket = io();
  socket.on('person entered', function (customers) {
    loadCustomersInStore(customers);
  });
});



