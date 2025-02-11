document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
   

    if (username === 'thiago' && password === '1234') {
        window.location.href = 'index2.html'
    } else {
        alert('Usuário ou senha incorretos.');
    }

    if (username === 'FRANCISLENE' && password === '1236') {
        window.location.href = 'dashboard.html'
    } else {
    }
});

