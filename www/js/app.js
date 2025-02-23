var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");
var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});

// No evento de submit do signinForm
mainView.router.navigate('/index/'); // Alterar de app.views.main.router.navigate

// No evento de submit do signupForm
mainView.router.navigate('/index/'); // Alterar de app.views.main.router.navigate


function validateForm(form) {
    // Validação básica dos campos
    const inputs = form.querySelectorAll('input');
    for(let input of inputs) {
        if(!input.value.trim()) {
            app.dialog.alert('Preencha todos os campos!');
            return false;
        }
    }
    return true;
}