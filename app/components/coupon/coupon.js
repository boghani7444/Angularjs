/*
 App Plans
 Controller for dynamic and other tables
 */


angular.module("app.coupon", ['ngMaterial', 'ngMessages'])
        .controller("couponCtrl", ["$scope", "$http", "$location", "flash", "$mdDialog",
            function ($scope, $http, $location, flash, $mdDialog) {
                $scope.flash = flash;
                $scope.msgtype = flash.getType();
                $scope.msgtxt = flash.getMessage();

                //console.log(flash.getMessage());

                $scope.editplan = function (id)
                {
                    $location.path('/coupon/addcoupon/' + id);
                };
                $scope.deleteplan = function (ev, id) {
                    $scope.msgtype = "";
                    $scope.msgtxt = "";
                    var confirm = $mdDialog.confirm()
                            .title('Are you sure you want to delete coupon?')
                            //.content('Are you sure you want delete?')
                            .ariaLabel('Delete dialog')
                            .ok('Yes')
                            .cancel('No')
                            .targetEvent(ev);
                    $mdDialog.show(confirm).then(function () {
                        var $del;
                        $del = $http.post("../user/user_AddEditCoupon.php?id=" + id + "&action=deleteRec"); // send data to user.php

                        $del.then(function (msg) {
                            if (msg.data.status == 'success')
                            {
                                $scope.msgtype = 'alert alert-success';
                                $scope.msgtxt = msg.data.msg;
                                $scope.reload();
                            }
                        });
                    }, function () {

                    });
                };
                $scope.reload = function () {
                    var $promise = $http.post("../user/user_Coupon.php"); // send data to user.php
                    $promise.then(function (msg) {
                        $scope.coupons = msg.data.couponlist;
                    });
                };
                $scope.reload();
            }]).filter('badDateToISO', function () {
    return function (badTime) {
        var goodTime;
        if (typeof badTime != 'undefined') {
            goodTime = badTime.replace(/(.+) (.+)/, "$1T$2Z");
        }

        return goodTime;
    };
})
        .controller("addcouponCtrl", ["$scope", "$http", "$routeParams", "$location", "flash", "$mdDialog",
            function ($scope, $http, $routeParams, $location, flash,$mdDialog) {
                var original, $promise, action, id;
				$scope.user = [];
                if (typeof ($routeParams.id) == 'undefined')
                {
                    $promise = $http.post("../user/user_AddEditCoupon.php"); 
                    action = 'add';
                    id = '';
                } else
                {
                    $promise = $http.post("../user/user_AddEditCoupon.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
                    action = 'edit';
                    id = $routeParams.id;
                }

                $scope.user = {
                    id: '',
                    txttitle: '',
                    couponcode: '',
                    offer_value: '',
                    'plan_type': [],
                    startDate: '',
                    endDate: '',
                    type: '',
                    txtdescription: '',
                    'action': action
                };

                $promise.then(function (msg) {
					msg.data.coupon.user.action = action;
					msg.data.coupon.user.id = id;
					if (msg.data.coupon.user.plan_type)
					{
						if (msg.data.coupon.user.plan_type !== null && msg.data.coupon.user.plan_type !== "")
						{
							msg.data.coupon.user.plan_type = msg.data.coupon.user.plan_type.split(",");
						} else
						{
							msg.data.coupon.user.plan_type = [];
						}
					}
					 else
                    {
                        msg.data.coupon.user.plan_type = [];
                    }
                    
                    if (msg.data.coupon.user.start_date)
                    {
                        //msg.data.coupon.user.start_date = new Date(Date.parse(msg.data.coupon.user.start_date.replace('-','/','g')));
                        msg.data.coupon.user.start_date = new Date(Date.parse(msg.data.coupon.user.start_date));
                    }else
                    {
                            msg.data.coupon.user.start_date = new Date();
                    }
                    if (msg.data.coupon.user.end_date)
                    {
                       // console.log(msg.data.coupon.user.end_date);
                        
                        //msg.data.coupon.user.end_date = new Date(Date.parse(msg.data.coupon.user.end_date.replace('-','/','g')));
                        msg.data.coupon.user.end_date = new Date(Date.parse(msg.data.coupon.user.end_date));
                        
                       // console.log(msg.data.coupon.user.end_date);
                    }else{
						msg.data.coupon.user.end_date = new Date();
					}
                    var original = msg.data.coupon.user;
                    $scope.user = angular.copy(original);
                    angular.extend($scope.user, msg.data.coupon.user);

                });
                $scope.allplans = ['VPS','Windows VPS', 'Shared', 'Windows Hosting', 'WordPress Hosting', 'Cloud Shared', 'Dedicated', 'Cloud VPS', 'CDN', 'Free Web Hosting'];

                // toggle selection for a given fruit by name
                $scope.togglepaySelection = function togglepaySelection(plan) {
                    var idx = ($scope.user.plan_type !== null && $scope.user.plan_type !== "") ? $scope.user.plan_type.indexOf(plan) : -1;
                    // is currently selected
                    if (idx > -1) {
                        $scope.user.plan_type.splice(idx, 1);
                    }
                    else {
                        $scope.user.plan_type.push(plan);
                    }

                };

                $scope.submitForm = function () {
					if (!$scope.user.title)
					{
						$mdDialog.show($mdDialog.alert().title('Please enter the coupon title').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
						return false;
					}
					if (!$scope.user.coupon_code)
					{
						$mdDialog.show($mdDialog.alert().title('Please enter the coupon code').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
						return false;
					}
					if (!$scope.user.offer_value)
					{
						$mdDialog.show($mdDialog.alert().title('Please enter the offer value').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
						return false;
					}
					if (!$scope.user.type)
					{
						$mdDialog.show($mdDialog.alert().title('Please select the  type of discount').ok("Ok"));
						return false;
					}
					
					if ($scope.user.plan_type.length === 0)
					{
						$scope.user.plan_type = [];
						$mdDialog.show($mdDialog.alert().title('Please select the related services for the coupon').ok("Ok"));
						return false;
					}
					if ($scope.user.plan_type)
                    {
                        $scope.user.plan_type = $scope.user.plan_type.join(",");
                    }
                    var data = $scope.user;
                   $promise = $http.post("../user/user_AddEditCoupon.php", data); // send data to user.php
                    $promise.then(function (msg) {
                        if (msg.data.status == 'success')
                        {
                            flash.setMessage(msg.data.msg);
                            if ($scope.user.plan_type !== null && $scope.user.plan_type !== "")
                            {
                                $scope.user.plan_type = $scope.user.plan_type.split(",");
                            } else
                            {
                                $scope.user.plan_type = [];
                            }
                            flash.setMessageType('alert alert-success');
                            $location.path('/coupon/coupon');
                        } else
                        {
                            // flash.setMessage(msg.data.msg);                        
                            // flash.setMessageType('alert-danger');                        
							if ($scope.user.plan_type !== null && $scope.user.plan_type !== "")
                            {
                                $scope.user.plan_type = $scope.user.plan_type.split(",");
                            } else
                            {
                                $scope.user.plan_type = [];
                            }
                            $scope.msgtype = "alert alert-danger";
                            $scope.msgtxt = msg.data.msg;
                        }

                    });
                    //console.log($scope.user);
                    //$scope.user.catelist[item] = true;
                };
                return original = angular.copy($scope.user), $scope.revert = function () {
                    return $scope.form = angular.copy(original), $scope.form_constraints.$setPristine();
                }, $scope.canRevert = function () {
                    // console.log("revert");
                    return !angular.equals($scope.user, original) || !$scope.form_constraints.$pristine;
                }, $scope.canSubmit = function () {
                    return false;  
                    //return !($scope.form_constraints.$valid);
                };
            }
        ]);