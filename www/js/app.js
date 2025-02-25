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
document.addEventListener('DOMContentLoaded', async function() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const btnRegistrar = document.getElementById('btnsignup');
            const originalBtnText = btnRegistrar.textContent;
            try {
                // Desativar botão durante a requisição
                btnRegistrar.disabled = true;
                btnRegistrar.textContent = 'Registrando...';
                
                // Coletar dados
                const userData = {
                    nome: document.getElementById('signUp-id').value,
                    email: document.getElementById('signUp-email').value,
                    senha: document.getElementById('signUp-pass').value
                };

                // Validação
                if (!userData.nome || !userData.email || !userData.senha) {
                    throw new Error('Preencha todos os campos!');
                }

                if (!/\S+@\S+\.\S+/.test(userData.email)) {
                    throw new Error('Email inválido!');
                }

                if (userData.senha.length < 6) {
                    throw new Error('A senha deve ter pelo menos 6 caracteres!');
                }
                console.log("pos dados");
                // Chamada à API
                const response = await fetchAPI('/user', 'POST', userData);
                console.log("pos API");
                if (!response.id) {
                    throw new Error('Erro no registro: ' + (response.message || 'Tente novamente'));
                }

                // Sucesso
                window.app.dialog.alert('Cadastro realizado!', () => {
                    localStorage.setItem('token', response.token);
                    window.location.href = "index.html";
                    window.app.views.main.router.navigate('/index/');
                });

            } catch (error) {
                
                window.app.dialog.alert(error.message);
            } finally {
                // Restaurar botão
                btnRegistrar.disabled = false;
                btnRegistrar.textContent = originalBtnText;
            }
        });
    }
});

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
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', validateLogin);
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