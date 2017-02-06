angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

.state('page1', {
      url: '/page1',
      templateUrl: 'templates/page1.html',
      abstract:true
    })

.state('page1.pesquisa', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/pesquisa.html',
        controller: 'pesquisaCtrl'
      }
    }
  })

.state('page1.detalhes', {
    url: '/page9',
    views: {
      'tab1': {
        templateUrl: 'templates/detalhes.html',
        controller: 'detalhesCtrl'
    }}
  })

.state('page1.favoritos', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/favoritos.html',
        controller: 'favoritosCtrl'
      }
    }
  })

.state('page1.atualizar', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/atualizar.html',
        controller: 'atualizarCtrl'
      }
    }
  })

.state('page1.perfil', {
    url: '/page6',
    views: {
      'tab4': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

.state('sobre', {
    url: '/page7',
    templateUrl: 'templates/sobre.html',
    controller: 'sobreCtrl'
  })

.state('laboratorio', {
    url: '/page8',
    templateUrl: 'templates/laboratorio.html',
    controller: 'laboratorioCtrl'
  })

.state('centrosDeColheita', {
    url: '/page10',
    templateUrl: 'templates/centrosDeColheita.html',
    controller: 'centrosDeColheitaCtrl'
  })
   
.state('login', {
    url: '/page11',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

$urlRouterProvider.otherwise('page11')

});
