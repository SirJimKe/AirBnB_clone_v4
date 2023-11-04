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
});
