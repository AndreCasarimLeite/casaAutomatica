var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");

var form = true;

btnSignin.addEventListener("click", function () {
    form = false;
    body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    form = true;
    body.className = "sign-up-js";
})

// Validação para Registro
async function validateSignup(e) {
    
    e.preventDefault();
    const form = document.getElementById('signupForm');
    
    const name = document.getElementById('signUp-id').value;
    const email = document.getElementById('signUp-email').value;
    const password = document.getElementById('signUp-pass').value;

    // Validação básica
    if (!name || !email || !password) {
        window.app.dialog.alert('Preencha todos os campos!');
        return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        window.app.dialog.alert('Email inválido!');
        return false;
    }

    if (password.length < 6) {
        window.app.dialog.alert('A senha deve ter pelo menos 6 caracteres!');
        return false;
    }

    // Chamada à API
    try {
        const response = await fetchAPI('/user', 'POST', {
            nome: name,
            email,
            senha: password
        });

        if (response.id) {
            window.app.dialog.alert('Cadastro realizado! Redirecionando...', () => {
                localStorage.setItem('token', response.token);
                window.location.href = "index.html";
                window.app.views.main.router.navigate('index');
            });
            return true;
        }

    } catch (error) {
        window.app.dialog.alert(error.message || 'Erro no cadastro');
        return false;
    }
}
//Validação para login
async function validateLogin(e) {
    e.preventDefault();
    const form = document.getElementById('loginForm');
    const email = form.querySelector('input[type="email"]').value;
    const senha = form.querySelector('input[type="password"]').value;
    // Requisição para o endpoint de login
    const response = await fetchAPI('/auth/login', 'POST', { email, senha });

    if (response?.access_token) {
        localStorage.setItem('token', response.token);
        window.location.href = "index.html"; // Armazena o token JWT
        app.views.main.router.navigate('index'); // Redireciona após login
    }
}

document.addEventListener('DOMContentLoaded', function () {
    
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    if (!form) {
        console.log("qualquer");
        loginForm.addEventListener('submit', validateLogin);
    }
    else{
        loginForm.addEventListener('submit', validateSignup);
    }
});

const API_BASE_URL = 'https://casa-automatica-back-end-production.up.railway.app';

async function fetchAPI(endpoint, method = 'GET', data = null) {
    try {
        const url = API_BASE_URL + endpoint;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (data) options.body = JSON.stringify(data);
        
        const response = await fetch(url, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `Erro HTTP: ${response.status}`);
        }

        return result;

    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

/*async function carregarDispositivos() {
    const dispositivos = await fetchAPI('/device');
    if (dispositivos) {
        // Atualize a UI com os dispositivos
        console.log('Dispositivos:', dispositivos);
    }
}*/

// Em index.html
//document.addEventListener('DOMContentLoaded', carregarDispositivos);