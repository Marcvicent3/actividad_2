const form = document.querySelector('#add-url');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlOriginal = document.querySelector('#urlOriginal').value;

    const response = await fetch(e.target.action, {
        method: e.target.method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({urlOriginal})
    });

    const data = await response.json();

    const alerts = document.querySelector('.url-message');

    if (alerts){
        document.querySelector('.url-message').remove();
    }

    
    if (data.status === 201) {
        const message = document.createElement('div');
        message.classList.add('url-message');
        message.innerHTML = `<p>Your url has been successfully shortened: <a target="_blank" rel="noopener noreferrer" href="${data.data}">${data.data}</a></p>`;
        const container = document.querySelector('main');
        container.appendChild(message);
    }else{
        const message = document.createElement('div');
        message.classList.add('url-message', 'error');
        message.innerHTML = `<p>${data.message}</p>`;

        const container = document.querySelector('main');
        container.appendChild(message);

    }
});

// Error in querystring: SyntaxError: Unexpected url

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('error')) {
    const message = document.createElement('div');
    message.classList.add('url-message', 'error');
    message.innerHTML = `<p>URL not valid</p>`;

    const container = document.querySelector('main');
    container.appendChild(message);
}