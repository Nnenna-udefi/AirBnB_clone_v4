
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
});
