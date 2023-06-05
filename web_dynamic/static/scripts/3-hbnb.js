
$(document).ready(function () {
  const amenities = {};
  // listen for changes on the input checkbox
  $('input:checkbox').change(function () {
    // get the amenity id
    const amentityId = $(this).data('id');
    if ($(this).is(':checked')) {
      // store the amenity id in the dictionary
      amenities[amentityId] = $(this).data('name');
    } else {
      // remove the amenity id from the dictionary
      delete amenities[amentityId];
    }

    // to update the h4 tag inside the amenities div
    // $('div.Amenities h4').text(Object.values(amenities).join(', '));
    $('div.amenities h4').html(function () {
      const checkedBox = [];
      Object.keys(amenities).forEach(function (key) {
        checkedBox.push(amenities[key]);
      });
      if (checkedBox.length === 0) {
        return ('&nbsp');
      }
      return (checkedBox.join(', '));
    });
  });
  function updateApiAvailability (status) {
    if (status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }

  // request api status at port 5001
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    updateApiAvailability(data.status);
  });

  function createPlaceArticle (place) {
    $('<article>').append($('<h2').text(place.name));
    $('<article>').append($('<div>').addClass('price_by_night').text('$' + place.price_by_night));
    const information = $('<div>').addClass('information');
    information.append($('<div>').addClass('max_guest').addClass('guest_image').html(place.max_guest));
    information.append($('<div>').addClass('number_rooms').addClass('bed_image').html(place.number_rooms));
    information.append($('<div>').addClass('number_bathrooms').addClass('bath_image').html(place.number_bathrooms));
    $('<article>').append(information);
    $('<article>').append($('<div>').addClass('description').text(place.description));
    $('.places').append($('<article>'));
  }

  // Request the places data
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      // Loop through the places data and create articles
      data.forEach(function (place) {
        createPlaceArticle(place);
      });
    }
  });
});
