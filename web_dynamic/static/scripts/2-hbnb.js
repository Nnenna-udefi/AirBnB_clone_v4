
$(document).ready(function () {
    const amenities = {};
    //listen for changes on the input checkbox
    $('input:checkbox').change(function () {
        //get the amenity id
        const amentityId = $(this).data('id');
        if ($(this).is(':checked')) {
            //store the amenity id in the dictionary
            amenities[amentityId] = $(this).data('name');
        } else {
            //remove the amenity id from the dictionary
            delete amenities[amentityId]; 
        }

        //to update the h4 tag inside the amenities div
        // $('div.Amenities h4').text(Object.values(amenities).join(', '));
        $('div.amenities h4').html(function () {
            let checked_box = [];
            Object.keys(amenities).forEach(function (key) {
                checked_box.push(amenities[key]);
            });
            if (checked_box.length === 0) {
                return ('&nbsp');
            }
            return (checked_box.join(', '));
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
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    updateApiAvailability(data.status);
  });

});