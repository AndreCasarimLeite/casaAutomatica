//INICIALIZAÇÃO DO F7 QUANDO DISPOSITIVO ESTÁ PRONTO
document.addEventListener('deviceready', onDeviceReady, false);
var app = new Framework7({
  // App root element
  el: '#app',
  // App Name
  name: 'Casa Automatica',
  // App id
  id: 'com.casaAutomatica.teste',
  // Enable swipe panel
  panel: {
    swipe: true,
  },
  dialog: {
    buttonOk: 'Sim',
    buttonCancel: 'Cancelar',
  },

  // Add default routes
  routes: [  
    {
      path: '/login/',
      url: 'login.html',
	    on: {
		    pageBeforeIn: function (event, page) {
		      // fazer algo antes da página ser exibida
		    },
		    pageAfterIn: function (event, page) {
		      // fazer algo depois da página ser exibida
		    },
		    pageInit: function (event, page) {
		      // fazer algo quando a página for inicializada
		    },
		    pageBeforeRemove: function (event, page) {
		        // fazer algo antes da página ser removida do DOM
		    },
	    }
    },
    {
      path: '/index/',
      url: 'index.html',
	  on: {
		    pageBeforeIn: function (event, page) {
		      // fazer algo antes da página ser exibida
		    },
		    pageAfterIn: function (event, page) {
		      // fazer algo depois da página ser exibida
		    },
		    pageInit: function (event, page) {
		      // fazer algo quando a página for inicializada
		    },
		    pageBeforeRemove: function (event, page) {
		      // fazer algo antes da página ser removida do DOM
		    },
	    }
    },
    {
      path: '/dispositivo/',
      url: 'dispositivo.html',
	    on: {
		    pageBeforeIn: function (event, page) {
		      // fazer algo antes da página ser exibida
		    },
		    pageAfterIn: function (event, page) {
		      // fazer algo depois da página ser exibida
		    },
		    pageInit: function (event, page) {
		      // fazer algo quando a página for inicializada
		    },
		    pageBeforeRemove: function (event, page) {
		        // fazer algo antes da página ser removida do DOM
		    },
	    }
    },
    {
        path: '/add/',
        url: 'add.html',
        on: {
          pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
          },
          pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
          },
          pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
          },
          pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
          },
        }
    },
    {
      path: '/conta/',
      url: 'conta.html',
	    on: {
		    pageBeforeIn: function (event, page) {
		      // fazer algo antes da página ser exibida
		    },
		    pageAfterIn: function (event, page) {
		      // fazer algo depois da página ser exibida
		    },
		    pageInit: function (event, page) {
		      // fazer algo quando a página for inicializada
            page.el.querySelector('#signinForm').addEventListener('submit', function(event) {
                event.preventDefault();
                if(validateForm(this)) {
                    app.dialog.alert('Login bem-sucedido!', () => {
                        app.views.main.router.navigate('/index/');
                    });
                }
            });
      
            page.el.querySelector('#signupForm').addEventListener('submit', function(event) {
                e.preventDefault();
                if(validateForm(this)) {
                    app.dialog.alert('Cadastro realizado!', () => {
                        app.views.main.router.navigate('/index/');
                    });
                }
            });
		    },
		    pageBeforeRemove: function (event, page) {
		        // fazer algo antes da página ser removida do DOM
		    },
	    }
    },
  ],
  
});

//Para testes direto no navegador
//var mainView = app.views.create('.view-main', { url: '/index/' });

//EVENTO PARA SABER O ITEM DO MENU ATUAL
app.on('routeChange', function (route) {
  var currentRoute = route.url;
  console.log(currentRoute);
  document.querySelectorAll('.tab-link').forEach(function (el) {
    el.classList.remove('active');
  });
  var targetEl = document.querySelector('.tab-link[href="' + currentRoute + '"]');
  if (targetEl) {
    targetEl.classList.add('active');
  }
});


function onDeviceReady() {
  //Quando estiver rodando no celular
  var mainView = app.views.create('.view-main', { url: '/index/' });

  //COMANDO PARA "OUVIR" O BOTAO VOLTAR NATIVO DO ANDROID 	
  document.addEventListener("backbutton", function (e) {

    if (mainView.router.currentRoute.path === '/index/') {
      e.preventDefault();
      app.dialog.confirm('Deseja sair do aplicativo?', function () {
        navigator.app.exitApp();
      });
    } else {
      e.preventDefault();
      mainView.router.back({ force: true });
    }
  }, false);
}