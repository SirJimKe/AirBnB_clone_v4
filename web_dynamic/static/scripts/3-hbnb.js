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
            $("div#api_status").addClass('available');
            console.log(response.status);
        } else {
            $("div#api_status").removeClass('available');
        }
    });
});

const shortenString = (string, length = 30) => {
    if (string.length <= length) return string;
  
    return string.substring(0, length - 3) + "...";
  };

  function fetchPlaces(filter = {}) {
    const options = {
        url:  "http://0.0.0.0:5001/api/v1/places_search/",
        contentType: "application/json",
        data: JSON.stringify(filter),
        type: POST,
    };
    $.ajax(options).done (function (response) {
        $("section.places").empty();
        response.forEach((place) => {
            const placeMarkup = $(`
            <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">
                ${place.max_guest} ${place.max_guest > 1 ? "Guests" : "Guest"}
              </div>
              <div class="number_rooms">
                ${place.number_rooms} ${place.max_guest > 1 ? "Bedrooms" : "Bedroom"}
              </div>
              <div class="number_bathrooms">
              ${place.number_bathrooms} ${
                place.number_bathrooms > 1 ? "Bathrooms" : "Bathroom"
              }
              </div>
            </div>
            <div class="description">${place.description}</div>
          </article>
            `);

            $(section.places).append("placeMarkup");
        });
    });
}