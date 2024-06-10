document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchInput').addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            fetchAndFilterHospitals();
        }
    });
});

function fetchAndFilterHospitals() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    const searchOption = document.getElementById('searchOption').value;

    let url = 'http://localhost:3000/api/hospitals';

    if (searchTerm) {
        if (searchOption === 'citystate') {
            const [city, state] = searchTerm.split(' ');
            url += `?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}`;
        } else if (searchOption === 'type') {
            url += `?hospital_type=${encodeURIComponent(searchTerm)}`;
        } else if (searchOption === 'ownership') {
            url += `?hospital_ownership=${encodeURIComponent(searchTerm)}`;
        } else if (searchOption === 'emergency') {
            url += `?emergency_services=${searchTerm.toLowerCase() === 'yes' ? 'true' : 'false'}`;
        } else {
            url += `?${searchOption}=${encodeURIComponent(searchTerm)}`;
        }
    }

    fetch(url)
        .then(response => response.json())
        .then(data => displayHospitals(data.data))
        .catch(error => {
            console.error('Error fetching data:', error);
            const container = document.getElementById('hospitals-container');
            container.innerHTML = '<div class="no-results">Error loading data.</div>';
        });
}

function displayHospitals(hospitals) {
    const container = document.getElementById('hospitals-container');
    container.innerHTML = '';

    if (hospitals.length > 0) {
        hospitals.forEach(hospital => {
            const div = document.createElement('div');
            div.className = 'results-container';
            div.innerHTML = `
                <h3>${hospital.hospital_name} - ${hospital.provider_id}</h3>
                <div class="address">${hospital.address} <br>
                    ${hospital.city}, ${hospital.state} - ${hospital.county_name} COUNTY</div>
                <div class="hospital-type">${hospital.hospital_type}<br>
                ${hospital.hospital_ownership}</div>
                <div class="emergency-services">Emergency Services: ${hospital.emergency_services ? 'Yes' : 'No'}</div>
            `;
            container.appendChild(div);
        });
    } else {
        container.innerHTML = '<div class="no-results">No hospitals found.</div>';
    }
}


// incomplete
function deleteHospital(hospitalId) {
    fetch(`http://localhost:3000/api/hospitals/${hospitalId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('Hospital deleted successfully');
                fetchAndFilterHospitals(); // Refresh the list
            } else {
                alert('Error deleting hospital');
            }
        })
        .catch(error => {
            console.error('Error deleting hospital:', error);
        });
}
