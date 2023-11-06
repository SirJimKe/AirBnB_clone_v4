$(document).ready(function () {
    const selectedAmenities = {};
    fetchPlaces();
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
    $('section.filters button').click(() => {
        const data = { amenities: Object.keys(amenities) };
        fetchPlaces(data);
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
function fetchPlaces(filter={}) {
    const options = {
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: application/json,
        data: JSON.stringify({filter}),
    };
    $.ajax(options).done(function (response) {
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
            $("section.places").append(placeMarkup);
        });
    });
}