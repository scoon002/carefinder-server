document.getElementById('create-hospital-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const providerId = document.getElementById('provider_id').value;
    const hospitalName = document.getElementById('hospital_name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zipCode = document.getElementById('zip_code').value;
    const countyName = document.getElementById('county_name').value;
    const phoneNumber = document.getElementById('phone_number').value;
    const hospitalType = document.getElementById('hospital_type').value;
    const hospitalOwnership = document.getElementById('hospital_ownership').value;
    const emergencyServices = document.getElementById('emergency_services').checked;
    const location = document.getElementById('location').value;

    fetch('http://localhost:3000/api/hospitals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'your-api-key'
        },
        body: JSON.stringify({
            provider_id: providerId,
            hospital_name: hospitalName,
            address: address,
            city: city,
            state: state,
            zip_code: zipCode,
            county_name: countyName,
            phone_number: phoneNumber,
            hospital_type: hospitalType,
            hospital_ownership: hospitalOwnership,
            emergency_services: emergencyServices,
            location: location
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Poor network response.');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('message').textContent = 'Hospital created successfully!';
            // Reset form or additional actions
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Error creating hospital.';
        });
});
