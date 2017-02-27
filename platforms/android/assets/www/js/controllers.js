angular.module('CD.controllers', [])

.controller('pesquisaCtrl', ['$scope','$ionicScrollDelegate','$rootScope','$stateParams', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $ionicScrollDelegate, $rootScope, $stateParams, $state) {

  
// define que no inicio o vai mostrar o layout dos grupos
  $scope.show = true;

//Limpa o imput
  $scope.apagar = function () {
    $scope.search ='';
    $scope.show = true;
}

//verifica se ouve alterações no imput
  $scope.onSearchChange = function () {
    $ionicScrollDelegate.scrollTop();
    $scope.show = false;
  }


//carrega Grupos e Analises 
 var catalogoApi = JSON.parse (window.localStorage.getItem("catalogoAPI"));
 
 $scope.analises =  catalogoApi.Analises;
 $scope.grupos = catalogoApi.Grupos;
 $scope.dataAtual = catalogoApi.dataReferencia;


// Envia Id Grupos para pagina detalhes
  $scope.PassaId = function(id, grupo){
    $rootScope.show = true;
    $rootScope.numgrupo = id;
    $rootScope.nomeGrupo = grupo;
    $state.go('page1.detalhes');
  }

// Envia Id analise para pagina Detalhes
  $scope.PassaId2 = function(numanalise,grupo){

    var favoritos = JSON.parse(window.localStorage.getItem("favoritos")) || [];
      var found = false;
        for(var i = 0; i < favoritos.length; i++) {
        if (favoritos[i].numanalise == numanalise) {
            found = true; 
            $rootScope.favicon = found;
            console.log('Found ' + found);
            break;
          }
          $rootScope.favicon = found;
          console.log('Found ' + found);
        }
        $rootScope.idAnalise = numanalise;
        $rootScope.grupo = grupo;
        $rootScope.show = false;
        $state.go('page1.detalhes');
      }
  
}])

.controller('detalhesCtrl', ['$scope','$rootScope','$state','$stateParams','$ionicPopup','$ionicScrollDelegate','Api',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $state, $stateParams, $ionicPopup, $ionicScrollDelegate, Api) {

var catalogoApi = JSON.parse (window.localStorage.getItem("catalogoAPI"));

  //verifica se ouve alterações no imput
  $scope.onSearchChange = function () {
    $scope.show = false;
  }

  // Limpa o imput da pagina 
  $scope.apagar = function () {
    $scope.search = '';
  }
  

//Seleciona o layout a mostrar na pagina detalhes  
if ($scope.show == true) {
  
  var todasAnalises = catalogoApi.Analises;
  var analisesGrupo = [];
  var found = false;
  
  for(var i = 0; i < todasAnalises.length; i++) {
    if (todasAnalises[i].numgrupo == $rootScope.numgrupo) {
      found = true;
      analisesGrupo.push(todasAnalises[i]);
      $scope.grupos = analisesGrupo;
    }
  }
  $scope.title = 'Grupo Cientifíco';
}else{
  
  var todasInfo = catalogoApi.Informacoes;
  var found = false;
    
  for(var i = 0; i < todasInfo.length; i++) {
    if (todasInfo[i].numanalise == $rootScope.idAnalise) {
      found = true;
      $scope.analises = todasInfo[i];
      break;
    }
   
  }
  $scope.title ='Analise Clinica';
}



// adiciona e remove favoritos no ficheiro JSON-Favoritos
$scope.GuardaFavorito = function(analises) {
  
  var favoritos = JSON.parse(window.localStorage.getItem("favoritos")) || [];

//verifica se existe favoritos
    var found = false;
    for(var i = 0; i < favoritos.length; i++) {
      if (favoritos[i].codigo == analises.codigo) {
          found = true; 
          console.log('Found ' + found);
          break;
          }
          console.log('Found ' + found);
        }
      
//adiciona ou remove favorito  
  if (!analises.added && found == false) {
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

// Envia Id analise para pagina Detalhes
  $scope.PassaId2 = function(numanalise, grupo){
    
    var favoritos = JSON.parse(window.localStorage.getItem("favoritos")) || [];
    var found = false;
    
    for(var i = 0; i < favoritos.length; i++) {
      if (favoritos[i].numanalise == numanalise) {
        found = true; 
        $scope.favicon = found;
        console.log('Found ' + found);
        break;
      }
      $rootScope.favicon = found;
      console.log('Found ' + found);
    }
    var todasAnalises = catalogoApi.Informacoes;
    var found = false;
    
    for(var i = 0; i < todasAnalises.length; i++) {
      if (todasAnalises[i].numanalise == numanalise) {
        found = true;
        $scope.analises = todasAnalises[i];
        break;
      }
    
    }
    $scope.idAnalise = numanalise;
    $scope.grupo = $rootScope.grupo;
    $scope.show = false;
    $ionicScrollDelegate.scrollTop();
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

// verifica se exitem favoritos e mostra alerta se não houver favoritos 
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


// adiciona e remove favoritos no ficheiro JSON-Favoritos
$scope.GuardaFavorito = function(item) {
  
  var favoritos = JSON.parse(window.localStorage.getItem("favoritos")) || [];
      
//adiciona ou remove favorito  
  if (!item.added) {
   $scope.favoritos.splice($scope.favoritos.indexOf(item), 1);
    var favoritos = JSON.parse(window.localStorage.getItem("favoritos")) || [];
    var index = favoritos.indexOf(item);
    favoritos.splice(index, 1);
    window.localStorage.setItem("favoritos", JSON.stringify(favoritos));
    $scope.show = false;
    console.log("Removi artigo", favoritos);
  } else {
    favoritos.push(item);
    window.localStorage.setItem("favoritos", JSON.stringify(favoritos));
    console.log("Adicionei artigo", item);
  }
  item.added = !item.added;
}


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

.controller('atualizarCtrl', ['$scope', '$stateParams','$interval','Api', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $interva, Api) {

    var catalogoApi = JSON.parse (window.localStorage.getItem("catalogoAPI"));

    $scope.catVersao = catalogoApi;

    $scope.doRefresh = function() {
       //carrega Grupos e Analises 
    Api.getData().then(function(data) {
      $scope.catVersao = data;
    });
    $scope.$broadcast("scroll.refreshComplete");
  };

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

.controller('laboratorioCtrl', ['$scope', '$stateParams','Api',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Api) {

  // carrega dados laboratório localStorage
  var dadosLab = JSON.parse (window.localStorage.getItem("dadosLab"));


  var lat = dadosLab.latitude;
  var lng = dadosLab.longitude;
  var zoom = 17;
  var defaults = {
        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        tileLayerOptions: {
        detectRetina: true,
        reuseTiles: true
        }};
  var mapLab = {
    lat:lat,
    lng:lng,
    zoom:zoom,
  };
  var mainMarker = {lat:lat,lng:lng};

  $scope.Lab = dadosLab;

  $scope.mapLab = mapLab;

  $scope.markers = {mainMarker: mainMarker};
  $scope.defaults = defaults;

  console.log("lat e Lng", lat, lng, zoom); 

}])

.controller('centrosDeColheitaCtrl', ['$scope', '$state','$stateParams','$rootScope', 'Api',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $rootScope, Api) {

// carrega dados centro colheita localStorage
  var dadosCc = JSON.parse (window.localStorage.getItem("dadosCc"));

  $scope.cc = dadosCc;
 
  $scope.mostramapa = function(latitude, longitude){
    $rootScope.lat = latitude;
    $rootScope.lng = longitude;
    $state.go('detalhesmapa');
  }
 

}])

.controller('detmapaCtrl', ['$scope', '$stateParams', '$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope) {

  var lat = $rootScope.lat;
  var lng = $rootScope.lng;
  var zoom = 17;
  var mainMarker = {lat:lat,lng:lng};
  var defaults = {
        tileLayer:"http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
        maxZoom: 20,
        scrollWheelZoom: false,
        tileLayerOptions: {
          detectRetina: true,
          reuseTiles: true
        }
      };
  
  var cc = {
    lat:lat,
    lng:lng,
    zoom:zoom
  };

  $scope.cc = cc;
  $scope.markers = {mainMarker: mainMarker};
  $scope.defaults = defaults;

  console.log("lat e Lng", lat, lng, zoom);      
}])


.controller('loginCtrl', ['$scope', '$rootScope', '$stateParams','Api',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, Api) {

  //carrega Grupos e Analises 
  Api.getData().then(function(data) {
  });

  //carrega info do laboratório
  Api.getLabInfo().then(function(data) {   
  });

   //carrega info dos centro colheita
  Api.getCcInfo().then(function(data) {
  });



 $rootScope.slideSideMenu = false;

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
