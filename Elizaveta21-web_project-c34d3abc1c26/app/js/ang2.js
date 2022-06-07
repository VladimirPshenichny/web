var app = angular.module('myApp', ["ngRoute"]);

app.factory("myFactory", function($http) {
  this.get = function() {
    return $http.get("http://localhost:2121/api/columns");
  }

  this.post = function(name, text, fullText) {
    return $http.post("http://localhost:2121/api/columns" , {"name" : name, "text" : text, "fullText" : fullText});
  }

  this.getId = function(id) {
    return $http.get("http://localhost:2121/api/columns/" + id);
  }

  this.put = function(id, name, text, fullText) {
    return $http.put("http://localhost:2121/api/columns/" + id, {"name" : name, "text" : text, "fullText" : fullText});
  }

  this.delete = function(id) {
    return $http.delete("http://localhost:2121/api/columns/" + id);
  }

  return this;
});

app.controller('myCtrl', function(myFactory, $scope, $http, $location) {
    myFactory.get().then(function (response) {
        $scope.columns = response.data;
    });
    //$scope.myId = ' ';
    $scope.myClick = function(id) {
        $location.path("/information");
        $scope.id = id;
    }
    $scope.edit = function(id) {
      $location.path("/del");
    }
    $scope.add = function(nm, txt, fTxt){
      myFactory.post(nm, txt, fTxt);
    }
    $scope.del = function(id){
      myFactory.delete(id);
    }
    $scope.change = function(id, nm, txt, fTxt){
      myFactory.put(id, nm, txt, fTxt);
    }
});

app.directive("dir", function(myFactory) {
    return{
        template :
        ' <img class="second-f-ctext-circle" src="app/img/001.png"/> <h3 ng-click="myClick(colum._id)" class="second-f-ctext-title"> {{colum.name}}</h3> <p class="second-f-ctext-text"> {{colum.text}}</p>',
        link: function (scope, element, attrs) {
          myFactory.getId(scope.col._id).then(function (response) {
            scope.colum = response.data;
          });
        }
      }
    });

app.directive("dirr", function(myFactory) {
    return {
      template:
      '<h1 class="second-f-ctext-title"> {{colum.name}}</h1> <h3 class="second-f-ctext-text"> {{colum.fullText}}</h3> <button style = "height: 30px; width: 180px; margin-top: 20px;"ng-click = "edit(id)"> Edit </button>',
      link: function (scope, element, attrs) {
        myFactory.getId(scope.id).then(function (response) {
          scope.colum = response.data;
        });
      }
    }
});

app.directive("dirrr", function(myFactory){
  return{
    template:
    '<h2> Name:</h2> <input type="text" ng-model="nName"/> <h2> Text:</h2> <textarea ng-model="nText"> </textarea> <h2> Full text: </h2> <textarea ng-model="nFullText"> </textarea> <br> <button style = "height: 30px; width: 180px; margin-top: 20px;"ng-click = "add(nName, nText, nFullText)"> Add </button>',
    link: function (scope, element, attrs) {
      myFactory.getId(scope.id).then(function (response) {
        scope.colum = response.data;
      });
  }
}
});

app.directive("dirrrr", function(myFactory){
  return{
    template:
    '<div><button style = "height: 30px; width: 180px; margin-top: 20px;"ng-click = "del(id)"> Delete </button></div><br> <h1>-----------------</h1>' +
    '<div><h3> Name:</h3> <input type="text" ng-model="nname"/> <h3> Text:</h3> <textarea ng-model="ntext"> </textarea> <h3> Full text: </h3> <textarea ng-model="nFulltext"> </textarea> <br> <button style = "height: 30px; width: 180px; margin-top: 20px;"ng-click = "change(id, nname, ntext, nFulltext)"> Change </button> <br></div>',
    link: function (scope, element, attrs) {
      myFactory.getId(scope.id).then(function (response) {
        scope.colum = response.data;
      });
  }
}
});


app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', { templateUrl: '../../one.html'})
    .when('/information', {templateUrl: '../../pattern_col.html'})
    .when('/add', {templateUrl: '../../new.html'})
    .when('/del', {templateUrl: '../../delete.html'})
  }]);
