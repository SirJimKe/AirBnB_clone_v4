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

    $('.amenity-checkbox').change(function () {
        updateAmenitiesList();
    });
});
