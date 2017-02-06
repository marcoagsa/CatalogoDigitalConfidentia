angular.module('app.controllers', [])

.controller('pesquisaCtrl', ['$scope','$ionicScrollDelegate','$rootScope','$stateParams', '$state', '$ionicPopup','Api',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $ionicScrollDelegate, $rootScope, $stateParams, $state, $ionicPopup, Api) {

// define que no inicio o vai mostrar o layout dos grupos
  $scope.show = true;


//Limpa o imput
  $scope.apagar = function () {
    $scope.search ='';
    $scope.show = true;
}

//verifica se ouve alterações no imput
  $scope.onSearchChange = function () {
    $scope.show = false;
  }

// passa informação dos grupos para o pagina 
  Api.getGrupos().then(function(data) {
    $scope.grupos = data.gruposData;
    $scope.dataAtual = data.dataAtual;
    console.log("Informação da Api...");
  })

// passa informação das analises para o pagina 
  Api.getAnalises().then(function(data){
    $scope.analises = data.dataAnalises;
  })

// passa id para a Api e muda para pagina detalhes
  $scope.PassaId = function(id){
    Api.grupoId(id);
    $rootScope.show = true;
    $rootScope.grupo = id;
    $state.go('page1.detalhes');
  }

// passa id para a Api e muda para pagina detalhes
  $scope.PassaId2 = function(id){
    Api.analiseId(id);
    $rootScope.show = false;
    $state.go('page1.detalhes');
  }
  
}])

.controller('favoritosCtrl', ['$scope', '$stateParams','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {

 $scope.show=false;

// variavel dos favoritos 
var fav = JSON.parse(window.localStorage.getItem("favoritos"))||[];

// verifica se exitem favores e mostra alerta se não houver favoritos 
if (fav.length == 0) {
    $ionicPopup.alert({
      title: 'Informação...',
      template: 'Ainda não adicionou analises aos favoritos!!!'
    });
    console.log(fav);
  } else {
    $scope.favoritos = fav;
    console.log(fav);
  }


  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };

  // reordena as favoritos no scope
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.favoritos.splice(fromIndex, 1);
    $scope.favoritos.splice(toIndex, 0, item);
  };
  
  //remove os favoritos do scope e do localStorage
  $scope.onItemDelete = function(item) {
    $scope.favoritos.splice($scope.favoritos.indexOf(item), 1);
    var favoritos = JSON.parse(window.localStorage.getItem("favoritos")) || [];
    var index = favoritos.indexOf(item);
    favoritos.splice(index, 1);
    window.localStorage.setItem("favoritos", JSON.stringify(favoritos));
    $scope.show = false;
    console.log("Removi artigo", favoritos);
  };



// atualiza os dados no tab favoritos
$scope.doRefresh = function() {
  $scope.show = false;
  var fav = JSON.parse(window.localStorage.getItem("favoritos")) || [];
  if (fav.length == 0) {
    $ionicPopup.alert({
      title: 'Informação...',
      template: 'Ainda não adicionou analises aos favoritos!!!'
    });
    $scope.favoritos = JSON.parse(window.localStorage.getItem("favoritos"));
    $scope.show = false;
    console.log(fav);

  } else {
    $scope.favoritos = JSON.parse(window.localStorage.getItem("favoritos"));
    $scope.show = false;
    console.log(fav);
  }
  $scope.$broadcast("scroll.refreshComplete");
};

}])

.controller('atualizarCtrl', ['$scope', '$stateParams','$interval', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $interval) {

  $scope.progressval = 0;
  $scope.stopinterval = null;


  function startprogress()
  {
    $scope.progressval = 0;

    if ($scope.stopinterval)
    {
      $interval.cancel($scope.stopinterval);
    }

    $scope.stopinterval = $interval(function() {
      $scope.progressval = $scope.progressval + 1;
      if( $scope.progressval >= 100 ) {
        $interval.cancel($scope.stopinterval);
        //$state.go('second');
        return;
      }
    }, 100);
  }
  startprogress();


  $scope.doRefresh = function()
  {
    startprogress();
    $scope.$broadcast("scroll.refreshComplete");
  }



}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('perfilCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('sobreCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('laboratorioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('centrosDeColheitaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('detalhesCtrl', ['$scope','$rootScope','$state','$stateParams','$ionicPopup','Api',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $state, $stateParams, $ionicPopup, Api) {

// Limpa o imput da pagina 
  $scope.apagar = function () {
    $scope.search = '';
  }
  
//Seleciona o layout a mostrar na pagina detalhes  
  if ($scope.show == true) {
  //passa informação para a pagina com id
  Api.getGruposDet().then(function(data) {
      $scope.grupos = data.gruposDet;   
  });
   $scope.title = 'Grupo Cientifíco';
  }else{
  //passa informação para a pagina com id
  Api.getAnalisesDet().then(function(data) {
      $scope.analises = data.analiseDet; 
    });
    $scope.title ='Analise Clinica';
  }
 

// adiciona e remove favoritos no ficheiro JSON-Favoritos
$scope.GuardaFavorito = function(analises) {
  
  var favoritos = JSON.parse(window.localStorage.getItem("favoritos")) || [];
 
  if (!analises.added) {
    favoritos.push(analises);
    window.localStorage.setItem("favoritos", JSON.stringify(favoritos));
    console.log("Adicionei artigo", analises);
  } else {
    var index = favoritos.indexOf(analises);
    favoritos.splice(index, 1);
    window.localStorage.setItem("favoritos", JSON.stringify(favoritos));
    console.log("Removi artigo", favoritos);
  }
  analises.added = !analises.added;

}

// passa id da analise para a Api e retorna pagina detalhes
  $scope.PassaId2 = function(id){
    Api.analiseId(id);
    $scope.show = false;
    Api.getAnalisesDet().then(function(data) {
      $scope.analises = data.analiseDet;
    var favoritos = JSON.parse(window.localStorage.getItem("favoritos")) || [];
   var found = false;
    for(var i = 0; i < favoritos.length; i++) {
    if (favoritos[i].codigo == $scope.analises.codigo) {
      found = true; 
      console.log('teste ' + found);
     angular.element(i).removeClass(calm);
      
     break;
  }
    } 
    });
      $scope.title ='Analise Clinica';
      $state.go('page1.detalhes');
    }

}])

.controller('loginCtrl', ['$scope', '$stateParams',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

  $scope.Email = function() {
          if(window.plugins && window.plugins.emailComposer) {
              window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                  console.log("Response -> " + result);
              },
              "Pedido de acesso!", // Subject
              "",                      // Body
              ["suporte@confidentia.pt"],    // To
              null,                    // CC
              null,                    // BCC
              false,                   // isHTML
              null,                    // Attachments
              null);                   // Attachment Data
          }
      };

}])
