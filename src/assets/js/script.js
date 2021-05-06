// Code goes here

var app = angular.module('app', ['ngResource', 'ui.bootstrap']);

app.factory('friendsFactory', function($resource) {
  return $resource('ajax/data/friends.json');
});

app.controller('contentCtrl', function ($scope, friendsFactory) {
  $scope.friends = friendsFactory.query();

  $scope.itemsPerPage = 12
  $scope.currentPage = 1;

  $scope.pageCount = function () {
    return Math.ceil($scope.friends.length / $scope.itemsPerPage);
  };

  $scope.friends.$promise.then(function () {
    $scope.totalItems = $scope.friends.length;
    $scope.$watch('currentPage + itemsPerPage', function() {
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
        end = begin + $scope.itemsPerPage;

      $scope.filteredFriends = $scope.friends.slice(begin, end);
    });
  });
});
