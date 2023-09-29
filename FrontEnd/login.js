/// AUTHENTIFICATION UTILISATEUR ///
const form = document.getElementById('login');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const data = { email: email, password: password };

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(responseData => {
            if (responseData && responseData.token) {
                localStorage.setItem('token', responseData.token);
                window.location.href = 'index.html';
            } else {
                alert("L'authentification a échoué. Vérifiez votre e-mail et votre mot de passe.");
            }
        });
});