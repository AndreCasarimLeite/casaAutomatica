//INICIALIZAÇÃO DO F7 QUANDO DISPOSITIVO ESTÁ PRONTO
document.addEventListener('deviceready', onDeviceReady, false);
window.app = new Framework7({
  // App root element
  el: '#app',
  // App Name
  name: 'Casa Automática',
  // App id
  id: 'com.casaAutomatica.test',
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
      path: 'login',
      url: 'login.html',
      animate: false,
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
      path: 'index',
      url: 'index.html',
      animate: false,
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
      path: 'add',
      url: 'add.html',
      animate: false,
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
      animate: false,
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
  ],
  // ... other parameters
});
window.mainView = window.app.views.create('.view-main', {
  url: 'login', // Define a página inicial como login
});
//Para testes direto no navegador
//var mainView = app.views.create('.view-main', { url: 'login' });

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
  var mainView = app.views.create('.view-main', { url: 'login' });

  //COMANDO PARA "OUVIR" O BOTAO VOLTAR NATIVO DO ANDROID 	
  document.addEventListener("backbutton", function (e) {

    if (mainView.router.currentRoute.path === 'index' || mainView.router.currentRoute.path === 'login') {
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

function initApp() {
  // Configuração comum
  window.mainView = window.app.views.create('.view-main', {
      url: isMobileApp() ? 'login' : getInitialWebRoute()
  });

  app.on('routeChange', function (route) {
      const currentRoute = route.url;
      document.querySelectorAll('.tab-link').forEach(el => el.classList.remove('active'));
      const targetEl = document.querySelector(`.tab-link[href="${currentRoute}"]`);
      if (targetEl) targetEl.classList.add('active');
  });
}

function initMobileFeatures() {
  // Configurações específicas para mobile
  document.addEventListener("backbutton", function (e) {
      const currentPath = mainView.router.currentRoute.path;
      if (['index', 'login'].includes(currentPath)) {
          e.preventDefault();
          app.dialog.confirm('Deseja sair do aplicativo?', () => navigator.app.exitApp());
      } else {
          e.preventDefault();
          mainView.router.back({ force: true });
      }
  }, false);
}

function initWebFeatures() {
  // Configurações específicas para web
  const isAuthenticated = localStorage.getItem('usuarioAutenticado');
  if (!isAuthenticated && window.location.pathname !== 'login') {
      app.views.main.router.navigate('login');
  }
}

function getInitialWebRoute() {
  return localStorage.getItem('token') ? 'index' : 'login';
}

function logout() {
  localStorage.removeItem('token');
  window.app.views.main.router.navigate('login');
}