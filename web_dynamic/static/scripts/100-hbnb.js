
$(document).ready(function () {
  const amenities = {};
  const states = {};
  const cities = {};
  // listen for changes on the input checkbox
  $('input:checkbox').change(function () {
    // get the amenity, city and state id
    const amentityId = $(this).data('id');
    const stateId = $(this).data('id');
    const cityId = $(this).data('id');
    if ($(this).is(':checked')) {
      // store the amenity id in the dictionary
      amenities[amentityId] = $(this).data('name');
      states[stateId] = $(this).data('name');
      cities[cityId] = $(this).data('name');
    } else {
      // remove the amenity id from the dictionary
      delete amenities[amentityId];
      delete states[stateId];
      delete cities[cityId];
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

    $('div.locations h4').html(function () {
      const stateCheckboxes = document.querySelectorAll('.state-checkbox');
      const cityCheckboxes = document.querySelectorAll('.city-checkbox');
      let selectedStates = [];
      let selectedCities = [];

      if (selectedStates.length > 0) {
        return (selectedStates.join(', '));
      }
    

      if (selectedCities.length > 0) {
        return (selectedCities.join(', '));
      }
      
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

  // Function to request the places, states and city data
  function requestAllData (amenitiesObj, citiesObj, statesObj) {
    const requestData = {
      amenitiesObj: Object.keys(amenitiesObj);
      citiesObj = Object.keys(citiesObj);
      statesObj = Object.keys(statesObj);
    };

    // Send the POST request
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestData),
      success: function (data) {
        // Clear the existing places
        $('.places').empty();

        // Loop through the places data and create articles
        data.forEach(function (place) {
          createPlaceArticle(place);
        });
      }
    });
  }

  // Listen for click on the button
  $('button').click(function () {
    requestAllData(amenities);
  });
});
