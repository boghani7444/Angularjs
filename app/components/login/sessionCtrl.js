
angular.module("app.login", [])
.controller("loginCtrl", ["$scope","loginService",
    function ($scope,loginService) {        
      var original;
      return $scope.user = {
        username: "",
        passwd: ""
      }, $scope.showInfoOnSubmit = !1, original = angular.copy($scope.username), $scope.revert = function () {
        return $scope.user = angular.copy(original), $scope.form_signin.$setPristine();
      }, $scope.canRevert = function () {
        return !angular.equals($scope.username, original) || !$scope.form_signin.$pristine;
      }, $scope.canSubmit = function () {
        return $scope.form_signin.$valid && !angular.equals($scope.username, original);
      }, $scope.submitForm = function () {
         $scope.user.action = "UserLogin";
         loginService.login($scope.user,$scope);
         
        
      };
    }
  ])
.controller("forgotCtrl", ["$scope","loginService",
    function ($scope,loginService) {        
      var original;
      return $scope.user = {
        email: ""
      }, $scope.showInfoOnSubmit = !1, original = angular.copy($scope.user), $scope.revert = function () {
        return $scope.user = angular.copy(original), $scope.form_signin.$setPristine();
      }, $scope.canRevert = function () {
        return !angular.equals($scope.user, original) || !$scope.form_signin.$pristine;
      }, $scope.canSubmit = function () {
        return $scope.form_signin.$valid && !angular.equals($scope.user, original);
      }, $scope.submitForm = function () {
         $scope.user.action = "UserLogin";
         loginService.forgot($scope.user,$scope);
      };
    }
  ])  ;