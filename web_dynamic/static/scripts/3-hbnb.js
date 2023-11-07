$(document).ready(function () {
    function updateAmenitiesList() {
        const selectedAmenities = {};
        $('.amenity-checkbox').each(function () {
            const id = $(this).data('id');
            const name = $(this).data('name');
            if ($(this).is(':checked')) {
                selectedAmenities[id] = name;
            }
        });
        $('.amenities h4').text(Object.values(selectedAmenities).join(', '));
    }

    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            // Loop through the places data and create article tags
            for (const place of data) {
                const article = $('<article></article>');
                article.append($('<div class="title_box"></div>')
			       .append($('<h2></h2>').text(place.name),
				       $('<div class="price_by_night"></div>').text('$' + place.price_by_night)),
			       $('<div class="information"></div>')
			       .append($('<div class="max_guest"></div>').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')),
				       $('<div class="number_rooms"></div>').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')),
				       $('<div class="number_bathrooms"></div>').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''))),
			       $('<div class="description"></div>').text(place.description));
                $('.places').append(article);
            }
        }
    });

    $('.amenity-checkbox').change(function () {
        updateAmenitiesList();
    });
});
