angular.module('app.services', [])

.factory('Api', ['$http','$q','$ionicLoading','$ionicPopup','$rootScope','$interval',

function($http, $q, $ionicLoading, $ionicPopup, $rootScope, $interval){

  var grupoId;
  var analiseId;
  var url ='http://rds.confidentia.pt:8585/CatalogoAPI/rest/v1/analises/';
  var url2 ='http://rds.confidentia.pt:8585/CatalogoAPI/rest/v1/grupos/';

  function getAnalises(){
    var deferred =$q.defer();
    $ionicLoading.show({ templateUrl: 'templates/loading.html'});
    $http.get(url).success(function(data){
      var dataAnalises = {'dataAnalises': data, 'dataAtual': new Date()};
      window.localStorage.setItem("dataAnalises", JSON.stringify(dataAnalises));
      $ionicLoading.hide();
      deferred.resolve(dataAnalises);
      console.log("Serviço Http com sucesso..." + dataAnalises);
    }).error(function(data){
      $ionicLoading.hide();
      // An alert dialog
      $ionicPopup.alert({ title: 'Erro!!!', template: 'Verifique a ligação à Internet.'});
      if(window.localStorage.getItem("dataAnalises") !== undefined) {
        data = JSON.parse(window.localStorage.getItem("dataAnalises"));
      }
      //deferred.reject(data); para regeitar a data usar sem LocalStorage
      deferred.resolve(data);
      console.log("Serviço Http com Erro..." + data);
    });
    return deferred.promise;
  }

  function getGrupos(){
    var deferred =$q.defer();
    $ionicLoading.show({ templateUrl: 'templates/loading.html'});
    $http.get(url2).success(function(data){
      var gruposData = {'gruposData': data, 'dataAtual': new Date()};
      window.localStorage.setItem("gruposData", JSON.stringify(gruposData));
      $ionicLoading.hide();
      deferred.resolve(gruposData);
      console.log("Serviço Http com sucesso...");
    }).error(function(data){
      $ionicLoading.hide();
      // An alert dialog
      $ionicPopup.alert({ title: 'Erro!!!', template: 'Verifique a ligação à Internet.'});
      if(window.localStorage.getItem("gruposData") !== undefined) {
          data = JSON.parse(window.localStorage.getItem("gruposData"));
        }
        //deferred.reject(data); para regeitar a data usar sem LocalStorage
        deferred.resolve(data);
        console.log("Serviço Http com Erro...");
      });
      return deferred.promise;
    }

  function getGruposDet() {
    $ionicLoading.show({ templateUrl: 'templates/loading.html'});
    var deferred =$q.defer();
    $http.get(url2 + grupoId + '/analises').success(function(data, status){
      var gruposDet = {'gruposDet': data, 'dataAtual': new Date()};
      window.localStorage.setItem("gruposDet", JSON.stringify(gruposDet, status));
      $ionicLoading.hide();
      deferred.resolve(gruposDet);
      console.log("Serviço Http detalhes Com Sucesso....");
    }).error(function(data){
      $ionicLoading.hide();
      // An alert dialog
      $ionicPopup.alert({ title: 'Erro!!!', template: 'Verifique a ligação à Internet.'});
      if(window.localStorage.getItem("gruposDet") !== undefined) {
        data = JSON.parse(window.localStorage.getItem("gruposDet"));
      }
      //deferred.reject(data); //para regeitar a data usar sem LocalStorage
      deferred.resolve(data);
      console.log("Serviço Http detalhes Com Erro....");
    });
    return deferred.promise;
  };
  
  function getAnalisesDet() {
    $ionicLoading.show({ templateUrl: 'templates/loading.html'});
    var deferred =$q.defer();
    $http.get(url + analiseId + '/info').success(function(data, status){
      var analiseDet = {'analiseDet': data, 'dataAtual': new Date()};
      window.localStorage.setItem("analiseDet", JSON.stringify(analiseDet, status));
      $ionicLoading.hide();
      deferred.resolve(analiseDet);
      console.log("Serviço Http detalhes Com Sucesso....");
    }).error(function(data){
      $ionicLoading.hide();
      // An alert dialog
      $ionicPopup.alert({ title: 'Erro!!!', template: 'Verifique a ligação à Internet.'});
      if(window.localStorage.getItem("analiseDet") !== undefined) {
        data = JSON.parse(window.localStorage.getItem("analiseDet"));
      }
      //deferred.reject(data); //para regeitar a data usar sem LocalStorage
      deferred.resolve(data);
      console.log("Serviço Http detalhes Com Erro....");
    });
    return deferred.promise;
  };

  function grupoId(Id) {
      grupoId = Id;
    }

  function analiseId(Id) {
      analiseId = Id;
    }

return{
      getAnalises :getAnalises,
      getGrupos: getGrupos,
      getGruposDet: getGruposDet,
      getAnalisesDet: getAnalisesDet,
      grupoId: grupoId,
      analiseId: analiseId
    };
}])

