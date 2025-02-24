var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})

// Validação para Registro
function validateSignup(e) {
    e.preventDefault(); // Previne o envio do formulário
    const form = document.getElementById('signupForm');
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]'); // Seleciona apenas inputs relevantes
    
    for (let input of inputs) {
        if (!input.value.trim()) {
            app.dialog.alert('Preencha todos os campos!');
            return false; // Interrompe a função se algum campo estiver vazio
        }
    }
    app.dialog.alert('loop');
    // Validações adicionais (email, senha, etc.)
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (!/\S+@\S+\.\S+/.test(email)) {
        app.dialog.alert('Email inválido!');
        return false;
    }

    if (password.length < 6) {
        app.dialog.alert('A senha deve ter pelo menos 6 caracteres!');
        return false;
    }

    // Se tudo estiver válido, redireciona para a página index
    window.app.dialog.alert('Registro bem-sucedido! Redirecionando...', function () {
        localStorage.setItem('usuarioAutenticado', 'true');
        window.location.href = "index.html";
        window.app.views.main.router.navigate('/index/');
    });
    return true;
}
//Validação para login
function validateLogin(e) {
    e.preventDefault();

    // Verifica se o app está definido
    if (!window.app) {
        console.error("Framework7 não foi inicializado.");
        return false;
    }

    const form = document.getElementById('loginForm');
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (!email || !password) {
        window.app.dialog.alert('Preencha todos os campos!'); // Usa window.app
        return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        window.app.dialog.alert('Email inválido!');
        return false;
    }

    window.app.dialog.alert('Login bem-sucedido! Redirecionando...', function () {
        window.location.href = "index.html";
        window.app.views.main.router.navigate('/index/');
    });
    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', validateLogin);
    }
});