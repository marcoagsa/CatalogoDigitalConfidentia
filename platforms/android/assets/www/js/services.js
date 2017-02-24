angular.module('CD.services', [])

.factory('Api', ['$http','$q','$ionicLoading','$ionicPopup','$rootScope','$interval',

  function($http, $q, $ionicLoading, $ionicPopup, $rootScope, $interval){

 
  var url ='http://rds.confidentia.pt:8585/CatalogoAPI/rest/v1/catalogo/15';
  var url2 ='http://rds.confidentia.pt:8585/CatalogoAPI/rest/v1/laboratorio';
  var url3 ='http://rds.confidentia.pt:8585/CatalogoAPI/rest/v1/centroscolheita';

  
   function getData(){

      var deferred =$q.defer();

      $ionicLoading.show({ templateUrl: 'templates/loading.html'});

      $http.get(url).success(function(data){

        var catalogoAPI = {'catalogoAPI': data, 'dataAtual': new Date()};

        window.localStorage.setItem("catalogoAPI", JSON.stringify(data));

        $ionicLoading.hide();

        deferred.resolve(data);

        console.log("Serviço Http com sucesso...", data);

      }).error(function(){

        $ionicLoading.hide();
      
        // An alert dialog
        $ionicPopup.alert({ title: 'Erro!!!', template: 'Verifique a ligação à Internet.'});

        if(window.localStorage.getItem("catalogoAPI") !== undefined) {

          data = JSON.parse(window.localStorage.getItem("catalogoAPI"));

        }

        //deferred.reject(data); para regeitar a data usar sem LocalStorage

        deferred.resolve(data);

        console.log("Serviço Http com Erro...");

      });

      return deferred.promise;
    }

  function getLabInfo(){

      var deferred =$q.defer();

      $ionicLoading.show({ templateUrl: 'templates/loading.html'});

      $http.get(url2).success(function(data){

        var dadosLab = {'dadosLab': data, 'dataAtual': new Date()};

        window.localStorage.setItem("dadosLab", JSON.stringify(data));

        $ionicLoading.hide();

        deferred.resolve(data);

        console.log("Serviço Http com sucesso...", data);

      }).error(function(){

        $ionicLoading.hide();
      
        // An alert dialog
       // $ionicPopup.alert({ title: 'Erro!!!', template: 'Verifique a ligação à Internet.'});

        if(window.localStorage.getItem("dadosLab") !== undefined) {

          data = JSON.parse(window.localStorage.getItem("dadosLab"));

        }

        //deferred.reject(data); para regeitar a data usar sem LocalStorage

        deferred.resolve(data);

        console.log("Serviço Http com Erro...");

      });

      return deferred.promise;
    }

    function getCcInfo(){

      var deferred =$q.defer();

      $ionicLoading.show({ templateUrl: 'templates/loading.html'});

      $http.get(url3).success(function(data){

        var dadosCc = {'dadosCc': data, 'dataAtual': new Date()};

        window.localStorage.setItem("dadosCc", JSON.stringify(data));

        $ionicLoading.hide();

        deferred.resolve(data);

        console.log("Serviço Http com sucesso...", data);

      }).error(function(){

        $ionicLoading.hide();
      
        // An alert dialog
       // $ionicPopup.alert({ title: 'Erro!!!', template: 'Verifique a ligação à Internet.'});

        if(window.localStorage.getItem("dadosCc") !== undefined) {

          data = JSON.parse(window.localStorage.getItem("dadosCc"));

        }

        //deferred.reject(data); para regeitar a data usar sem LocalStorage

        deferred.resolve(data);

        console.log("Serviço Http com Erro...");

      });

      return deferred.promise;
    }
  

return{
      getData: getData,
      getLabInfo: getLabInfo,
      getCcInfo: getCcInfo
    };
}])
