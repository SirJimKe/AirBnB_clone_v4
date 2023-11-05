$(document).ready(function () {
    const selectedAmenities = {};
    $('.amenity-checkbox').change(function () {
      const amenityId = $(this).closest('li').data('id');
      const amenityName = $(this).closet('li').data('name');
  
      if ($(this).prop('checked')) {
        selectedAmenities[amenityId] = amenityName;
      } else {
        delete selectedAmenities[amenityId];
      }
  
      const amenitiesList = Object.values(selectedAmenities).join(', ');
      $('.amenities h4').text('Amenities: ' + amenitiesList);
    });
 
    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/status/",
        type: "GET",
    }).done (function (response) {
        if (response.status === 'OK') {
            $("#api_status").addClass('available');
            console.log(response.status);
        } else {
            $("#api_status").removeClass('available');
        }
    });
});