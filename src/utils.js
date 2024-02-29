export function getReport(messages) {
    return fetch('http://localhost:7860/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'history': messages})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}
