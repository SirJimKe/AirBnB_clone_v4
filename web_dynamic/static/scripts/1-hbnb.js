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
  
        updatedAmenitiesList();
    });
  });
  