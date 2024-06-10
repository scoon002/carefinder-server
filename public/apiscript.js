function createApiKey() {
    const username = document.getElementById('username').value;
    const level = document.getElementById('level').value;

    fetch('http://localhost:3000/api/apikey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, level })
    })
        .then(response => response.json())
        .then(data => {
            console.log('API Key Created:', data);
            getAllApiKeys();
        })
        .catch(error => console.error('Error:', error));
}


function getAllApiKeys() {
    fetch('http://localhost:3000/api/apikey')
        .then(response => response.json())
        .then(apiKeys => {
            const listContainer = document.getElementById('apiKeysList');
            listContainer.innerHTML = '';
            apiKeys.forEach(key => {
                const div = document.createElement('div');
                div.innerHTML = `Key ID: ${key.keyId} <br> Username: ${key.username} <br> Level: ${key.level}`;


                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.onclick = () => deleteApiKey(key.keyId);
                div.appendChild(deleteButton);

                listContainer.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}

function deleteApiKey(keyId) {
    fetch(`http://localhost:3000/api/apikey/${keyId}`, {
        method: 'DELETE'
    })
        .then(() => {
            console.log(`API Key with ID ${keyId} deleted`);
            getAllApiKeys(); // Refresh the list
        })
        .catch(error => console.error('Error:', error));
}


document.addEventListener('DOMContentLoaded', getAllApiKeys);
