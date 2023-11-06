$(document).ready(function () {
    const selectedAmenities = {};
    $('.amenity-checkbox').change(function () {
      const id = $(this).data('id');
      const name = $(this).data('name');
  
      if ($(this).is(':checked')) {
        selectedAmenities[id] = name;
      } else {
        delete selectedAmenities[id];
      }
      $('.amenities h4').text(Object.values(selectedAmenities).join(', '));
  
    });
  
 
    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/status/",
        type: "GET",
    }).done (function (response) {
        if (response.status === 'OK') {
            $('#api_status').addClass('available');
            console.log(response);
        } else {
            $('#api_status').removeClass('available');
        }
    });
});