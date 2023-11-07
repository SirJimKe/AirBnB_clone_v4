$(document).ready(function () {
    function createPlaceArticle(place) {
        const article = $('<article></article>');
        return article;
    }

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
        return selectedAmenities;
    }

    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    $('.amenity-checkbox').change(function () {
        updateAmenitiesList();
    });

    $('button').click(function () {
        const selectedAmenities = updateAmenitiesList();
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.keys(selectedAmenities) }),
            success: function (data) {
                $('.places').empty();
                for (const place of data) {
                    const placeArticle = createPlaceArticle(place);
                    $('.places').append(placeArticle);
                }
            }
        });
    });
});
