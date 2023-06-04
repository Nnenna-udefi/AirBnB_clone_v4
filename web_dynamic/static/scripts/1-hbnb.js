$(document).ready(function () {
    const amenities = {};
    //listen for changes on the input checkbox
    $('input[type="checkbox"]').change(function () {
        //get the amenity id
        const amentityId = $(this).attr('data-id');
        if ($(this).is(':checked')) {
            //store the amenity id in the dictionary
            amenities[amentityId] = $(this).attr('data-name');
        } else {
            //remove the amenity id from the dictionary
            delete amenities[amentityId]; 
        }

        //to update the h4 tag inside the amenities div
        $('div.Amenities h4').html(Object.values(amenities).join(', '));
    })
})