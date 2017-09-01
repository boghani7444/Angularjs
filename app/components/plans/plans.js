/*
 App Plans
 Controller for dynamic and other tables
 */


angular.module("app.plans", ['ngMaterial', 'ngMessages'])
        .filter('planstatus', function ($sce) {
            return function (val) {
                if (val == 'E')
                {
                    val = "Enabled";
                }else if (val == 'P'){ 
                    val = "Review Pending";
                }
                else if (val == 'D')
                {
                    val = "Disabled";
                }
                return val;
            };

        })
        .filter('hddspace', function ($sce) {
            return function (val) {
                if (val == -1)
                {
                    val = "Unlimited";
                } else
                {
                    val = val + " GB";
                }
                return val;
            };

        })
        .filter('bandwidth', function ($sce) {
            return function (val) {
                if (val == -1)
                {
                    val = "Unmetered";
                } else
                {
                    val = val + " GB";
                }
                return val;
            };

        })
        .controller("plansCtrl", ["$scope", "$http", "$location", "flash", "$mdDialog",
            function ($scope, $http, $location, flash, $mdDialog) {
                $scope.flash = flash;
                $scope.msgtype = flash.getType();
                $scope.msgtxt = flash.getMessage();

                //console.log(flash.getMessage());

                $scope.editplan = function (id, type)
                {
                    switch (type) {
                        case 'Shared':
                            $location.path('/plans/addshared/' + id + '/' + type);
                            break;
                        case 'Windows':
                            $location.path('/plans/addwindows/' + id + '/' + type);
                            break;
                        case 'Wordpress':
                            $location.path('/plans/addwordpress/' + id + '/' + type);
                            break;
                        case 'Free':
                            $location.path('/plans/addfree/' + id + '/' + type);
                            break;
                        case 'CloudShared':
                            $location.path('/plans/addcloudshared/' + id + '/' + type);
                            break;
                        case 'Dedicated':
                            $location.path('/plans/dedicatedplan/' + id + '/' + type);
                            break;
                        case 'VPS':
                            $location.path('/plans/vpsplan/' + id + '/' + type);
                            break;
                        case 'Windowsvps':
                            $location.path('/plans/addwindowsvps/' + id + '/' + type);
                            break;
                        case 'CVPS':
                            $location.path('/plans/cloudvpsplan/' + id + '/' + type);
                            break;
                        case 'CDN':
                            $location.path('/plans/cdnplan/' + id + '/' + type);
                            break;
                        case 'Cloud':
                            $location.path('/plans/cloudplan/' + id + '/' + type);
                            break;
                    }

                };
                $scope.deleteplan = function (ev, id, type) {
                    $scope.msgtype = "";
                    $scope.msgtxt = "";
                    var confirm = $mdDialog.confirm()
                            .title('Are you sure you want to delete the plan?')
                            //.content('Are you sure you want delete?')
                            .ariaLabel('Delete dialog')
                            .ok('Yes')
                            .cancel('No')
                            .targetEvent(ev);
                    $mdDialog.show(confirm).then(function () {
                        var $del;
                        switch (type) {
                            case 'Shared':
                                $del = $http.post("../user/user_AddEditShared.php?id=" + id + "&action=deleteRec");
                                break;
                            case 'Windows':
                                $del = $http.post("../user/user_AddEditWindows.php?id=" + id + "&action=deleteRec");
                                break;
                            case 'Wordpress':
                                $del = $http.post("../user/user_AddEditWordpress.php?id=" + id + "&action=deleteRec");
                                break;
                            case 'Free':
                                $del = $http.post("../user/user_AddEditFree.php?id=" + id + "&action=deleteRec");
                                break;
                            case 'CloudShared':
                                $del = $http.post("../user/user_AddEditCloudShared.php?id=" + id + "&action=deleteRec");
                                break;
                            case 'Dedicated':
                                $del = $http.post("../user/user_AddEditDedicated.php?id=" + id + "&action=deleteRec");
                                break;
                            case 'VPS':
                                $del = $http.post("../user/user_AddEditVPS.php?id=" + id + "&action=deleteRec");
                                break;
                            case 'Windowsvps':
                                $del = $http.post("../user/user_AddEditWindowsvps.php?id=" + id + "&action=deleteRec");
                                break;
                            case 'CVPS':
                                $del = $http.post("../user/user_AddEditCloudVPS.php?id=" + id + "&action=deleteRec");
                                break;
                            case 'CDN':
                                $del = $http.post("../user/user_AddEditCdnPlan.php?id=" + id + "&action=deleteRec");
                                break;
                            case 'Cloud':
                                $del = $http.post("../user/user_AddEditCloudPlan.php?id=" + id + "&action=deleteRec");
                                break;
                        }

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
                    var $promise = $http.post("../user/index.php"); // send data to user.php
                    $promise.then(function (msg) {
                        $scope.plans = msg.data.plans;
                    });
                };
                $scope.addshredplan = function ()
                {
                    $location.path("/plans/addshared");
                };
                $scope.addwindowsplan = function ()
                {
                    $location.path("/plans/addwindows");
                };
                $scope.addwordpressplan = function ()
                {
                    $location.path("/plans/addwordpress");
                };
                $scope.addfreeplan = function ()
                {
                    $location.path("/plans/addfree");
                };

                $scope.addcloudshredplan = function ()
                {
                    $location.path("/plans/addcloudshared");
                };
                $scope.adddedicatedplan = function ()
                {
                    $location.path("/plans/dedicatedplan");
                };
                $scope.addvpsplan = function ()
                {
                    $location.path("/plans/vpsplan");
                };
                $scope.addwindowsvpsplan = function ()
                {
                    $location.path("/plans/addwindowsvps");
                };
                $scope.addcloudvpsplan = function ()
                {
                    $location.path("/plans/cloudvpsplan");
                };
                $scope.addcndplan = function ()
                {
                    $location.path("/plans/cdnplan");
                };
                $scope.addcloudplan = function ()
                {
                    $location.path("/plans/cloudplan");
                };
                $scope.reload();
            }]).controller("addcloudsharedCtrl", ["$scope", "$http", "$routeParams", "$location", "flash",
    function ($scope, $http, $routeParams, $location, flash) {
        var original, $promise, action, id;

        if (typeof ($routeParams.id) == 'undefined')
        {
            $promise = $http.post("../user/user_AddEditCloudShared.php"); // send data to user.php
            action = 'add';
            id = '';
        } else
        {
            $promise = $http.post("../user/user_AddEditCloudShared.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
            action = 'edit';
            id = $routeParams.id;
        }

        $scope.user = {
            id: '',
            sname: '',
            os: '',
            hdd_space: '',
            hdd_type: '',
            data_transfer: '',
            free_domain: '',
            free_search_engine: '',
            monthly_price: '',
            quaterly_price: '',
            half_yearly_price: '',
            yearly_price: '',
            instant_setup: '',
            ssl_certificate: '',
            ftp_access: '',
            sub_domain: '',
            email_accounts: '',
            num_domains: '',
            webmail: '',
            money_back: '',
            sextras: '',
            plan_url: '',
            website_builder: '',
            'action': action,
            'scname': ''

        };
        $promise.then(function (msg) {
            angular.extend($scope.user, msg.data.share.user);
            $scope.features = msg.data.share.catlist;
        });

        $scope.submitForm = function () {

            var data = $scope.user;
            $promise = $http.post("../user/user_AddEditCloudShared.php", data); // send data to user.php
            $promise.then(function (msg) {
                if (msg.data.status == 'success')
                {
                    flash.setMessage(msg.data.msg);
                    flash.setMessageType('alert alert-success');
                    $location.path('/plans/plans');
                } else
                {
                    $scope.msgtype = "alert alert-danger";
                    $scope.msgtxt = msg.data.msg;
                }

            });
        };


        return original = angular.copy($scope.user), $scope.revert = function () {
            return $scope.form = angular.copy(original), $scope.form_constraints.$setPristine();
        }, $scope.canRevert = function () {
            // console.log("revert");
            return !angular.equals($scope.user, original) || !$scope.form_constraints.$pristine;
        }, $scope.canSubmit = function () {
            //return false;  
            return !$scope.form_constraints.$valid;
        };
    }
]).controller("addsharedCtrl", ["$scope", "$mdDialog", "$http", "$routeParams", "$location", "flash",
    function ($scope, $mdDialog, $http, $routeParams, $location, flash) {
        var original, $promise, action, id;

        if (typeof ($routeParams.id) == 'undefined')
        {
            $promise = $http.post("../user/user_AddEditShared.php"); // send data to user.php
            action = 'add';
            id = '';
        } else
        {
            $promise = $http.post("../user/user_AddEditShared.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
            action = 'edit';
            id = $routeParams.id;
        }
        $scope.selectedIndex = 0;
        $scope.user = {
            id: '',
            sname: '',
            os: 'L',
            hdd_space: '',
            hdd_type: '',
            is_cloud: false,
            data_transfer: '',
            free_domain: '',
            free_search_engine: '',
            monthly_price: '',
            quaterly_price: '',
            half_yearly_price: '',
            yearly_price: '',
            instant_setup: '',
            ssl_certificate: '',
            ftp_access: '',
            sub_domain: '',
            email_accounts: '',
            num_domains: '',
            webmail: '',
            money_back: '',
            sextras: '',
            plan_url: '',
            website_builder: '',
            control_panel:'',
            'action': action,
            'scname': ''

        };

        $promise.then(function (msg) {
            angular.extend($scope.user, msg.data.share.user);
            $scope.features = msg.data.share.catlist;
            $scope.webmailsel = $scope.user.webmail;
            $scope.website_buildersel = $scope.user.website_builder;
            $scope.control_panelsel = $scope.user.control_panel;
            $scope.user.os="L";
        });
        $scope.wmqueryprocessorSearch = function (query) {
            return $http.post("../user/user_AddEditShared.php?action=getwebmail&q=" + query)
                    .then(function (response) {
                        return response.data.items;
                    });
        };
        $scope.wmsearchTextChange = function (text) {
            if (text)
            {
                $scope.user.webmail = text;
            }
        };

        $scope.wmselectedItemChange = function (sitem) {
            if (sitem)
            {
                if (sitem.wmname)
                {
                    $scope.user.webmail = sitem.wmname;
                }
            }
        };
        $scope.wbqueryprocessorSearch = function (query) {
            return $http.post("../user/user_AddEditShared.php?action=getwebbuilder&q=" + query)
                    .then(function (response) {
                        return response.data.items;
                    });
        };
        $scope.wbsearchTextChange = function (text) {
            if (text)
            {
                $scope.user.website_builder = text;
            }
        };

        $scope.wbselectedItemChange = function (sitem) {
            if (sitem)
            {
                if (sitem.wbname)
                {
                    $scope.user.website_builder = sitem.wbname;
                }
            }
        };
        $scope.cpqueryprocessorSearch = function (query) {
            return $http.post("../user/user_AddEditShared.php?action=getcontrolpanel&q=" + query)
                    .then(function (response) {
                        return response.data.items;
                    });
        };
        $scope.cpsearchTextChange = function (text) {
            if (text)
            {
                $scope.user.control_panel = text;
            }
        };

        $scope.cpselectedItemChange = function (sitem) {
            if (sitem)
            {
                if (sitem.cpname)
                {
                    $scope.user.control_panel = sitem.cpname;
                }
            }
        };
        $scope.submitForm = function () {
            if (!$scope.user.sname)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Invalid plan name (Max 50 char., Only "Alpha-neumeric" and "dashes" are allowed)').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            /*if (!$scope.user.os)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the OS').ok("Ok")).finally(function () {
                    angular.element('#os').focus();
                });
                return false;
            }*/
            if (!$scope.user.storage_type)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the storage type').ok("Ok")).finally(function () {
                    angular.element('#storage_type').focus();
                });
                return false;
            }
            if (!$scope.user.plan_url)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the plan URL').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            if (!$scope.user.sextras)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the plan description').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            var data = $scope.user;
            $promise = $http.post("../user/user_AddEditShared.php", data); // send data to user.php
            $promise.then(function (msg) {
                if (msg.data.status == 'success')
                {
                    flash.setMessage(msg.data.msg);
                    flash.setMessageType('alert alert-success');
                    $location.path('/plans/plans');
                } else
                {
                    $scope.msgtype = "alert alert-danger";
                    $scope.msgtxt = msg.data.msg;
                }

            });
        };


        return original = angular.copy($scope.user), $scope.revert = function () {
            return $scope.form = angular.copy(original), $scope.form_constraints.$setPristine();
        }, $scope.canRevert = function () {
            // console.log("revert");
            return !angular.equals($scope.user, original) || !$scope.form_constraints.$pristine;
        }, $scope.canSubmit = function () {
            return false;
            //return !$scope.form_constraints.$valid;
        };
    }
]).controller("addwindowsCtrl", ["$scope", "$mdDialog", "$http", "$routeParams", "$location", "flash",
    function ($scope, $mdDialog, $http, $routeParams, $location, flash) {
        var original, $promise, action, id;

        if (typeof ($routeParams.id) == 'undefined')
        {
            $promise = $http.post("../user/user_AddEditWindows.php"); // send data to user.php
            action = 'add';
            id = '';
        } else
        {
            $promise = $http.post("../user/user_AddEditWindows.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
            action = 'edit';
            id = $routeParams.id;
        }
        $scope.selectedIndex = 0;
        $scope.user = {
            id: '',
            sname: '',
            os: 'W',
            hdd_space: '',
            hdd_type: '',
            is_cloud: false,
            data_transfer: '',
            free_domain: '',
            free_search_engine: '',
            monthly_price: '',
            quaterly_price: '',
            half_yearly_price: '',
            yearly_price: '',
            instant_setup: '',
            ssl_certificate: '',
            ftp_access: '',
            sub_domain: '',
            email_accounts: '',
            num_domains: '',
            webmail: '',
            money_back: '',
            sextras: '',
            plan_url: '',
            website_builder: '',
            'action': action,
            'scname': ''

        };

        $promise.then(function (msg) {
            angular.extend($scope.user, msg.data.share.user);
            $scope.features = msg.data.share.catlist;
            $scope.webmailsel = $scope.user.webmail;
            $scope.user.os = 'W';
        });
        /* $scope.wmqueryprocessorSearch = function(query){
         return $http.post("../user/user_AddEditWindows.php?action=getwebmail&q=" + query )
         .then(function(response){
         return response.data.items;
         });
         }; 
         $scope.wmsearchTextChange= function(text) {
         if(text)
         {
         $scope.user.webmail = text;
         }
         };
         
         $scope.wmselectedItemChange = function(sitem) {
         if (sitem)
         {
         if (sitem.wmname)
         {
         $scope.user.webmail = sitem.wmname;
         }
         }
         };
         $scope.wbqueryprocessorSearch = function(query){
         return $http.post("../user/user_AddEditWindows.php?action=getwebbuilder&q=" + query )
         .then(function(response){
         return response.data.items;
         });
         }; 
         $scope.wbsearchTextChange= function(text) {
         if(text)
         {
         $scope.user.website_builder = text;
         }
         };
         
         $scope.wbselectedItemChange = function(sitem) {
         if (sitem)
         {
         if (sitem.wbname)
         {
         $scope.user.website_builder = sitem.wbname;
         }
         }
         };*/
        $scope.submitForm = function () {
            if (!$scope.user.sname)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Invalid plan name (Max 50 char., Only "Alpha-neumeric" and "dashes" are allowed)').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
           /* if (!$scope.user.os)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the OS').ok("Ok")).finally(function () {
                    angular.element('#os').focus();
                });
                return false;
            }*/
            if (!$scope.user.storage_type)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the storage type').ok("Ok")).finally(function () {
                    angular.element('#storage_type').focus();
                });
                return false;
            }
            if (!$scope.user.plan_url)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the plan URL').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            if (!$scope.user.sextras)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the plan description').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            var data = $scope.user;
            $promise = $http.post("../user/user_AddEditWindows.php", data); // send data to user.php
            $promise.then(function (msg) {
                if (msg.data.status == 'success')
                {
                    flash.setMessage(msg.data.msg);
                    flash.setMessageType('alert alert-success');
                    $location.path('/plans/plans');
                } else
                {
                    $scope.msgtype = "alert alert-danger";
                    $scope.msgtxt = msg.data.msg;
                }

            });
        };


        return original = angular.copy($scope.user), $scope.revert = function () {
            return $scope.form = angular.copy(original), $scope.form_constraints.$setPristine();
        }, $scope.canRevert = function () {
            // console.log("revert");
            return !angular.equals($scope.user, original) || !$scope.form_constraints.$pristine;
        }, $scope.canSubmit = function () {
            return false;
            //return !$scope.form_constraints.$valid;
        };
    }
]).controller("addwordpressCtrl", ["$scope", "$mdDialog", "$http", "$routeParams", "$location", "flash",
    function ($scope, $mdDialog, $http, $routeParams, $location, flash) {
        var original, $promise, action, id;

        if (typeof ($routeParams.id) == 'undefined')
        {
            $promise = $http.post("../user/user_AddEditWordpress.php"); // send data to user.php
            action = 'add';
            id = '';
        } else
        {
            $promise = $http.post("../user/user_AddEditWordpress.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
            action = 'edit';
            id = $routeParams.id;
        }
        $scope.selectedIndex = 0;
        $scope.user = {
            id: '',
            sname: '',
            os: '',
            hdd_space: '',
            hdd_type: '',
            is_cloud: false,
            data_transfer: '',
            free_domain: '',
            free_search_engine: '',
            monthly_price: '',
            quaterly_price: '',
            half_yearly_price: '',
            yearly_price: '',
            instant_setup: '',
            ssl_certificate: '',
            ftp_access: '',
            sub_domain: '',
            email_accounts: '',
            num_domains: '',
            webmail: '',
            money_back: '',
            sextras: '',
            plan_url: '',
            website_builder: '',
            'action': action,
            'scname': ''

        };

        $promise.then(function (msg) {
            angular.extend($scope.user, msg.data.share.user);
            $scope.features = msg.data.share.catlist;
            $scope.webmailsel = $scope.user.webmail;

        });
        $scope.wmqueryprocessorSearch = function (query) {
            return $http.post("../user/user_AddEditWordpress.php?action=getwebmail&q=" + query)
                    .then(function (response) {
                        return response.data.items;
                    });
        };
        $scope.wmsearchTextChange = function (text) {
            if (text)
            {
                $scope.user.webmail = text;
            }
        };

        $scope.wmselectedItemChange = function (sitem) {
            if (sitem)
            {
                if (sitem.wmname)
                {
                    $scope.user.webmail = sitem.wmname;
                }
            }
        };
        $scope.wbqueryprocessorSearch = function (query) {
            return $http.post("../user/user_AddEditWordpress.php?action=getwebbuilder&q=" + query)
                    .then(function (response) {
                        return response.data.items;
                    });
        };
        $scope.wbsearchTextChange = function (text) {
            if (text)
            {
                $scope.user.website_builder = text;
            }
        };

        $scope.wbselectedItemChange = function (sitem) {
            if (sitem)
            {
                if (sitem.wbname)
                {
                    $scope.user.website_builder = sitem.wbname;
                }
            }
        };
        $scope.submitForm = function () {
            if (!$scope.user.sname)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Invalid plan name (Max 50 char., Only "Alpha-neumeric" and "dashes" are allowed)').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            if (!$scope.user.os)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the OS').ok("Ok")).finally(function () {
                    angular.element('#os').focus();
                });
                return false;
            }
            if (!$scope.user.storage_type)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the storage type').ok("Ok")).finally(function () {
                    angular.element('#storage_type').focus();
                });
                return false;
            }
            if (!$scope.user.plan_url)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the plan URL').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            if (!$scope.user.sextras)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the plan description').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            var data = $scope.user;
            $promise = $http.post("../user/user_AddEditWordpress.php", data); // send data to user.php
            $promise.then(function (msg) {
                if (msg.data.status == 'success')
                {
                    flash.setMessage(msg.data.msg);
                    flash.setMessageType('alert alert-success');
                    $location.path('/plans/plans');
                } else
                {
                    $scope.msgtype = "alert alert-danger";
                    $scope.msgtxt = msg.data.msg;
                }

            });
        };


        return original = angular.copy($scope.user), $scope.revert = function () {
            return $scope.form = angular.copy(original), $scope.form_constraints.$setPristine();
        }, $scope.canRevert = function () {
            // console.log("revert");
            return !angular.equals($scope.user, original) || !$scope.form_constraints.$pristine;
        }, $scope.canSubmit = function () {
            return false;
            //return !$scope.form_constraints.$valid;
        };
    }
]).controller("addfreeCtrl", ["$scope", "$mdDialog", "$http", "$routeParams", "$location", "flash",
    function ($scope, $mdDialog, $http, $routeParams, $location, flash) {
        var original, $promise, action, id;

        if (typeof ($routeParams.id) == 'undefined')
        {
            $promise = $http.post("../user/user_AddEditFree.php"); // send data to user.php
            action = 'add';
            id = '';
        } else
        {
            $promise = $http.post("../user/user_AddEditFree.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
            action = 'edit';
            id = $routeParams.id;
        }
        $scope.selectedIndex = 0;
        $scope.user = {
            id: '',
            sname: '',
            os: '',
            hdd_space: '',
            hdd_type: '',
            is_cloud: false,
            data_transfer: '',
            free_domain: '',
            free_search_engine: '',
            monthly_price: '',
            quaterly_price: '',
            half_yearly_price: '',
            yearly_price: '',
            instant_setup: '',
            ssl_certificate: '',
            ftp_access: '',
            sub_domain: '',
            email_accounts: '',
            num_domains: '',
            webmail: '',
            money_back: '',
            sextras: '',
            plan_url: '',
            website_builder: '',
            'action': action,
            'scname': ''

        };

        $promise.then(function (msg) {
            angular.extend($scope.user, msg.data.share.user);
            $scope.features = msg.data.share.catlist;
            $scope.webmailsel = $scope.user.webmail;

        });
        $scope.wmqueryprocessorSearch = function (query) {
            return $http.post("../user/user_AddEditFree.php?action=getwebmail&q=" + query)
                    .then(function (response) {
                        return response.data.items;
                    });
        };
        $scope.wmsearchTextChange = function (text) {
            if (text)
            {
                $scope.user.webmail = text;
            }
        };

        $scope.wmselectedItemChange = function (sitem) {
            if (sitem)
            {
                if (sitem.wmname)
                {
                    $scope.user.webmail = sitem.wmname;
                }
            }
        };
        $scope.wbqueryprocessorSearch = function (query) {
            return $http.post("../user/user_AddEditFree.php?action=getwebbuilder&q=" + query)
                    .then(function (response) {
                        return response.data.items;
                    });
        };
        $scope.wbsearchTextChange = function (text) {
            if (text)
            {
                $scope.user.website_builder = text;
            }
        };

        $scope.wbselectedItemChange = function (sitem) {
            if (sitem)
            {
                if (sitem.wbname)
                {
                    $scope.user.website_builder = sitem.wbname;
                }
            }
        };
        $scope.submitForm = function () {
            if (!$scope.user.sname)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Invalid plan name (Max 50 char., Only "Alpha-neumeric" and "dashes" are allowed)').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            if (!$scope.user.os)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the OS').ok("Ok")).finally(function () {
                    angular.element('#os').focus();
                });
                return false;
            }
            if (!$scope.user.storage_type)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the storage type').ok("Ok")).finally(function () {
                    angular.element('#storage_type').focus();
                });
                return false;
            }
            if (!$scope.user.plan_url)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the plan URL').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            if (!$scope.user.sextras)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the plan description').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            var data = $scope.user;
            $promise = $http.post("../user/user_AddEditFree.php", data); // send data to user.php
            $promise.then(function (msg) {
                if (msg.data.status == 'success')
                {
                    flash.setMessage(msg.data.msg);
                    flash.setMessageType('alert alert-success');
                    $location.path('/plans/plans');
                } else
                {
                    $scope.msgtype = "alert alert-danger";
                    $scope.msgtxt = msg.data.msg;
                }

            });
        };


        return original = angular.copy($scope.user), $scope.revert = function () {
            return $scope.form = angular.copy(original), $scope.form_constraints.$setPristine();
        }, $scope.canRevert = function () {
            // console.log("revert");
            return !angular.equals($scope.user, original) || !$scope.form_constraints.$pristine;
        }, $scope.canSubmit = function () {
            return false;
            //return !$scope.form_constraints.$valid;
        };
    }
])

        .controller("addcloudsharedCtrl", ["$scope", "$mdDialog", "$http", "$routeParams", "$location", "flash",
            function ($scope, $mdDialog, $http, $routeParams, $location, flash) {
                var original, $promise, action, id;

                if (typeof ($routeParams.id) == 'undefined')
                {
                    $promise = $http.post("../user/user_AddEditCloudShared.php"); // send data to user.php
                    action = 'add';
                    id = '';
                } else
                {
                    $promise = $http.post("../user/user_AddEditCloudShared.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
                    action = 'edit';
                    id = $routeParams.id;
                }

                $scope.user = {
                    id: '',
                    sname: '',
                    os: '',
                    hdd_space: '',
                    hdd_type: '',
                    data_transfer: '',
                    free_domain: '',
                    free_search_engine: '',
                    monthly_price: '',
                    quaterly_price: '',
                    half_yearly_price: '',
                    yearly_price: '',
                    instant_setup: '',
                    ssl_certificate: '',
                    ftp_access: '',
                    sub_domain: '',
                    email_accounts: '',
                    num_domains: '',
                    webmail: '',
                    money_back: '',
                    sextras: '',
                    plan_url: '',
                    website_builder: '',
                    'action': action,
                    'scname': ''

                };


                $promise.then(function (msg) {
                    angular.extend($scope.user, msg.data.share.user);
                    $scope.features = msg.data.share.catlist;
                });
                $scope.selectedIndex = 0;
                $scope.submitForm = function () {
                    if (!$scope.user.sname)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Invalid plan name (Max 50 char., Only "Alpha-neumeric" and "dashes" are allowed)').ok("Ok")).finally(function () {
                            angular.element('input.ng-invalid').first().focus();
                        });
                        return false;
                    }
                    if (!$scope.user.os)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the OS').ok("Ok")).finally(function () {
                            angular.element('#os').focus();
                        });
                        return false;
                    }
                    if (!$scope.user.storage_type)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the storage type').ok("Ok")).finally(function () {
                            angular.element('#storage_type').focus();
                        });
                        return false;
                    }
                    if (!$scope.user.plan_url)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the plan URL').ok("Ok")).finally(function () {
                            angular.element('input.ng-invalid').first().focus();
                        });
                        return false;
                    }
                    if (!$scope.user.sextras)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the plan description').ok("Ok")).finally(function () {
                            angular.element('input.ng-invalid').first().focus();
                        });
                        return false;
                    }
                    var data = $scope.user;
                    $promise = $http.post("../user/user_AddEditCloudShared.php", data); // send data to user.php
                    $promise.then(function (msg) {
                        if (msg.data.status == 'success')
                        {
                            flash.setMessage(msg.data.msg);
                            flash.setMessageType('alert alert-success');
                            $location.path('/plans/plans');
                        } else
                        {
                            $scope.msgtype = "alert alert-danger";
                            $scope.msgtxt = msg.data.msg;
                        }

                    });
                };


                return original = angular.copy($scope.user), $scope.revert = function () {
                    return $scope.form = angular.copy(original), $scope.form_constraints.$setPristine();
                }, $scope.canRevert = function () {
                    // console.log("revert");
                    return !angular.equals($scope.user, original) || !$scope.form_constraints.$pristine;
                }, $scope.canSubmit = function () {
                    return false;
                    //return !$scope.form_constraints.$valid;
                };
            }
        ])


        .controller("adddedicatedCtrl", ["$scope", "$mdDialog", "$http", "$routeParams", "$location", "flash",
            function ($scope, $mdDialog, $http, $routeParams, $location, flash) {
                var original, $promise, action, id;

                if (typeof ($routeParams.id) == 'undefined')
                {
                    $promise = $http.post("../user/user_AddEditDedicated.php"); // send data to user.php
                    action = 'add';
                    id = '';
                } else
                {
                    $promise = $http.post("../user/user_AddEditDedicated.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
                    action = 'edit';
                    id = $routeParams.id;
                }
                $scope.selectedIndex = 0;
                $scope.isprocessortypeDisabled = false;
                $scope.user = {
                    id: '',
                    dname: '',
                    dos: '',
                    processor_type: '',
                    processor_manufacturer: '',
                    ram: '',
                    ram_type: '',
                    type_of_ram: '',
                    hdd_capacity: '',
                    hdd_count: '',
                    hdd_rpm: '',
                    hdd_type: '',
                    bandwidth: '',
                    ip: '',
                    price: '',
                    setup: '',
                    managed: '',
                    backup: '',
                    plan_url: '',
                    plan_summary: '',
                    action: action,
                    dcname: '',
                    ipv6_support: ''
                };
                $promise.then(function (msg) {
                    angular.extend($scope.user, msg.data.dedicate.user);
                    $scope.processor_typesel = $scope.user.processor_type;
                    $scope.processor_manufacturersel = $scope.user.processor_manufacturer;
                    $scope.ram_typesel = $scope.user.ram_type;
                    $scope.hdd_typesel = $scope.user.hdd_type;
                    $scope.features = msg.data.dedicate.catlist;
                });

                
                $scope.pmqueryprocessorSearch = function (query) {
                    return $http.post("../user/user_AddEditDedicated.php?action=getprocmanu&q=" + query)
                            .then(function (response) {
                                return response.data.items;
                            });
                };
                $scope.pmsearchTextChange = function (text) {
                    if (text)
                    {
                        $scope.user.processor_type = text;
                    }
                };

                $scope.pmselectedItemChange = function (sitem) {
                    if (sitem)
                    {
                        if (sitem.pmname)
                        {
                            $scope.user.processor_type = sitem.pmname;
                        }
                    }
                };
                $scope.rtquerySearch = function (query) {
                    return $http.post("../user/user_AddEditDedicated.php?action=getramtype&q=" + query)
                            .then(function (response) {
                                return response.data.items;
                            });
                };
                $scope.rtsearchTextChange = function (text) {
                    if (text)
                    {
                        $scope.user.ram_type = text;
                    }
                };

                $scope.rtselectedItemChange = function (sitem) {
                    if (sitem)
                    {
                        if (sitem.ramtype)
                        {
                            $scope.user.ram_type = sitem.ramtype;
                        }
                    }
                };
                $scope.hddquerySearch = function (query) {
                    return $http.post("../user/user_AddEditDedicated.php?action=gethddtype&q=" + query)
                            .then(function (response) {
                                return response.data.items;
                            });
                };
                $scope.hddsearchTextChange = function (text) {
                    if (text)
                    {
                        $scope.user.hdd_type = text;
                    }
                };

                $scope.hddselectedItemChange = function (sitem) {
                    if (sitem)
                    {
                        if (sitem.hddtype)
                        {
                            $scope.user.hdd_type = sitem.hddtype;
                        }
                    }
                };
                $scope.submitForm = function () {
                    if (!$scope.user.dname)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Invalid plan name (Max 50 char., Only "Alpha-neumeric" and "dashes" are allowed)').ok("Ok")).finally(function () {
                            angular.element('input.ng-invalid').first().focus();
                        });
                        return false;
                    }
                    if (!$scope.user.dos)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the OS').ok("Ok")).finally(function () {
                            angular.element('#dos').focus();
                        });
                        return false;
                    }
                    if (!$scope.user.plan_url)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the plan URL').ok("Ok")).finally(function () {
                            angular.element('input.ng-invalid').first().focus();
                        });
                        return false;
                    }
                    if (!$scope.user.plan_summary)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the plan summary').ok("Ok")).finally(function () {
                            angular.element('input.ng-invalid').first().focus();
                        });
                        return false;
                    }
                    var data = $scope.user;
                    $promise = $http.post("../user/user_AddEditDedicated.php", data); // send data to user.php
                    $promise.then(function (msg) {
                        if (msg.data.status == 'success')
                        {
                            flash.setMessage(msg.data.msg);
                            flash.setMessageType('alert alert-success');
                            $location.path('/plans/plans');
                        } else
                        {
                            // flash.setMessage(msg.data.msg);                        
                            // flash.setMessageType('alert-danger');                        
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
                    //return !$scope.form_constraints.$valid;
                };


            }])

        .controller("addvpsCtrl", ["$scope", "$mdDialog", "$http", "$routeParams", "$location", "flash",
            function ($scope, $mdDialog, $http, $routeParams, $location, flash) {
                var original, $promise, action, id;

                if (typeof ($routeParams.id) == 'undefined')
                {
                    $promise = $http.post("../user/user_AddEditVPS.php"); // send data to user.php
                    action = 'add';
                    id = '';
                } else
                {
                    $promise = $http.post("../user/user_AddEditVPS.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
                    action = 'edit';
                    id = $routeParams.id;
                }
                $scope.selectedIndex = 0;
                $scope.user = {
                    id: '',
                    vname: '',
                    fos: '',
                    space: '',
                    transfer: '',
                    price: '',
                    managed_price: '',
                    is_cloud: '',
                    hdd_type: '',
                    setup: '',
                    vos: '',
                    managed: '',
                    dadicated_ip: '',
                    guranted_ram: '',
                    plan_url: '',
                    plan_summary: '',
                    action: action,
                    vcname: '',
                    vps_platform: '',
                    control_panel:'',
                    money_back: '',
                    ipv6_support: ''

                };
                $promise.then(function (msg) {
                    angular.extend($scope.user, msg.data.vpsdata.user);
                    $scope.features = msg.data.vpsdata.catlist;
                    $scope.vps_platformsel = $scope.user.vps_platform;
                    $scope.control_panelsel = $scope.user.control_panel;
                });
                $scope.vpqueryprocessorSearch = function (query) {
                    return $http.post("../user/user_AddEditVPS.php?action=getvpsplatform&q=" + query)
                            .then(function (response) {
                                return response.data.items;
                            });
                };
                $scope.vpsearchTextChange = function (text) {
                    if (text)
                    {
                        $scope.user.vps_platform = text;
                    }
                };

                $scope.vpselectedItemChange = function (sitem) {
                    if (sitem)
                    {
                        if (sitem.vpname)
                        {
                            $scope.user.vps_platform = sitem.vpname;
                        }
                    }
                };
                $scope.cpqueryprocessorSearch = function (query) {
                    return $http.post("../user/user_AddEditVPS.php?action=getcontrolpanel&q=" + query)
                            .then(function (response) {
                                return response.data.items;
                            });
                };
                $scope.cpsearchTextChange = function (text) {
                    if (text)
                    {
                        $scope.user.control_panel = text;
                    }
                };

                $scope.cpselectedItemChange = function (sitem) {
                    if (sitem)
                    {
                        if (sitem.cpname)
                        {
                            $scope.user.control_panel = sitem.cpname;
                        }
                    }
                };
                $scope.submitForm = function () {
                    if (!$scope.user.vname)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Invalid plan name (Max 50 char., Only "Alpha-neumeric" and "dashes" are allowed)').ok("Ok")).finally(function () {
                            angular.element('input.ng-invalid').first().focus();
                        });
                        return false;
                    }
                    if (!$scope.user.vos)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the OS').ok("Ok")).finally(function () {
                            angular.element('#vos').focus();
                        });
                        return false;
                    }
                    if (!$scope.user.plan_url)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the plan URL').ok("Ok")).finally(function () {
                            angular.element('input.ng-invalid').first().focus();
                        });
                        return false;
                    }
                    if (!$scope.user.plan_summary)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the plan summary').ok("Ok")).finally(function () {
                            angular.element('input.ng-invalid').first().focus();
                        });
                        return false;
                    }
                    var data = $scope.user;
                    $promise = $http.post("../user/user_AddEditVPS.php", data); // send data to user.php
                    $promise.then(function (msg) {
                        if (msg.data.status == 'success')
                        {
                            flash.setMessage(msg.data.msg);
                            flash.setMessageType('alert alert-success');
                            $location.path('/plans/plans');
                        } else
                        {
                            $scope.msgtype = "alert alert-danger";
                            $scope.msgtxt = msg.data.msg;
                        }

                    });
                };


                return original = angular.copy($scope.user), $scope.revert = function () {
                    return $scope.form = angular.copy(original), $scope.form_constraints.$setPristine();
                }, $scope.canRevert = function () {
                    // console.log("revert");
                    return !angular.equals($scope.user, original) || !$scope.form_constraints.$pristine;
                }, $scope.canSubmit = function () {
                    return false;
                    //return !$scope.form_constraints.$valid;
                };


            }]).controller("addwindowsvpsCtrl", ["$scope", "$mdDialog", "$http", "$routeParams", "$location", "flash",
    function ($scope, $mdDialog, $http, $routeParams, $location, flash) {
        var original, $promise, action, id;

        if (typeof ($routeParams.id) == 'undefined')
        {
            $promise = $http.post("../user/user_AddEditWindowsvps.php"); // send data to user.php
            action = 'add';
            id = '';
        } else
        {
            $promise = $http.post("../user/user_AddEditWindowsvps.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
            action = 'edit';
            id = $routeParams.id;
        }
        $scope.selectedIndex = 0;
        $scope.user = {
            id: '',
            vname: '',
            space: '',
            transfer: '',
            price: '',
            managed_price: '',
            is_cloud: '',
            hdd_type: '',
            setup: '',
            vos: 'Windows',
            managed: '',
            dadicated_ip: '',
            guranted_ram: '',
            plan_url: '',
            plan_summary: '',
            action: action,
            vcname: '',
            vps_platform: '',
            money_back: '',
            ipv6_support: '',
            port_speed: '',
            backup_option:'',
            licensing_price:''

        };
        $promise.then(function (msg) {
            angular.extend($scope.user, msg.data.windowsvpsdata.user);
            $scope.features = msg.data.windowsvpsdata.catlist;
            $scope.user.vos = 'Windows';
        });

        $scope.submitForm = function () {
            if (!$scope.user.vname)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Invalid plan name (Max 50 char., Only "Alpha-neumeric" and "dashes" are allowed)').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            /*if (!$scope.user.vos)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the OS').ok("Ok")).finally(function () {
                    angular.element('#vos').focus();
                });
                return false;
            }*/
            if (!$scope.user.plan_url)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the plan URL').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            if (!$scope.user.plan_summary)
            {
                $scope.selectedIndex = 0;
                $mdDialog.show($mdDialog.alert().title('Please enter the plan summary').ok("Ok")).finally(function () {
                    angular.element('input.ng-invalid').first().focus();
                });
                return false;
            }
            var data = $scope.user;
            $promise = $http.post("../user/user_AddEditWindowsvps.php", data); // send data to user.php
            $promise.then(function (msg) {
                if (msg.data.status == 'success')
                {
                    flash.setMessage(msg.data.msg);
                    flash.setMessageType('alert alert-success');
                    $location.path('/plans/plans');
                } else
                {
                    $scope.msgtype = "alert alert-danger";
                    $scope.msgtxt = msg.data.msg;
                }

            });
        };


        return original = angular.copy($scope.user), $scope.revert = function () {
            return $scope.form = angular.copy(original), $scope.form_constraints.$setPristine();
        }, $scope.canRevert = function () {
            // console.log("revert");
            return !angular.equals($scope.user, original) || !$scope.form_constraints.$pristine;
        }, $scope.canSubmit = function () {
            return false;
        };


    }])
        .controller("addcloudvpsCtrl", ["$scope", "$mdDialog", "$http", "$routeParams", "$location", "flash",
            function ($scope, $mdDialog, $http, $routeParams, $location, flash) {
                var original, $promise, action, id;

                if (typeof ($routeParams.id) == 'undefined')
                {
                    $promise = $http.post("../user/user_AddEditCloudVPS.php"); // send data to user.php
                    action = 'add';
                    id = '';
                } else
                {
                    $promise = $http.post("../user/user_AddEditCloudVPS.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
                    action = 'edit';
                    id = $routeParams.id;
                }

                $scope.user = {
                    id: '',
                    vname: '',
                    fos: '',
                    space: '',
                    transfer: '',
                    price: '',
                    managed_price: '',
                    is_cloud: '',
                    port_speed: '',
                    hdd_type: '',
                    setup: '',
                    vos: '',
                    number_of_domain: '',
                    managed: '',
                    dadicated_ip: '',
                    guranted_ram: '',
                    burstable_ram: '',
                    fantastico: '',
                    rvskin: '',
                    plan_url: '',
                    plan_summary: '',
                    action: action,
                    vcname: '',
                    vps_platform: '',
                    money_back: '',
                    ipv6_support: ''

                };
                $promise.then(function (msg) {

                    //  console.clear();
                    //console.log(msg.data.share.catlist);
                    //$scope.stores = msg.data.plans;     
                    angular.extend($scope.user, msg.data.vpsdata.user);
                    //$scope.user = msg.data.share.user;
                    $scope.features = msg.data.vpsdata.catlist;

                    //console.log($scope.user);
                });
                $scope.selectedIndex = 0;
                $scope.submitForm = function () {
                    if (!$scope.user.vname)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Invalid plan name (Max 50 char., Only "Alpha-neumeric" and "dashes" are allowed)').ok("Ok")).finally(function () {
                            angular.element('input.ng-invalid').first().focus();
                        });
                        return false;
                    }
                    if (!$scope.user.vos)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the OS').ok("Ok")).finally(function () {
                            angular.element('#vos').focus();
                        });
                        return false;
                    }
                    if (!$scope.user.plan_url)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the plan URL').ok("Ok")).finally(function () {
                            angular.element('input.ng-invalid').first().focus();
                        });
                        return false;
                    }
                    if (!$scope.user.plan_summary)
                    {
                        $scope.selectedIndex = 0;
                        $mdDialog.show($mdDialog.alert().title('Please enter the plan summary').ok("Ok")).finally(function () {
                            angular.element('input.ng-invalid').first().focus();
                        });
                        return false;
                    }
                    var data = $scope.user;
                    $promise = $http.post("../user/user_AddEditCloudVPS.php", data); // send data to user.php
                    $promise.then(function (msg) {
                        if (msg.data.status == 'success')
                        {
                            flash.setMessage(msg.data.msg);
                            flash.setMessageType('alert alert-success');
                            $location.path('/plans/plans');
                        } else
                        {
                            // flash.setMessage(msg.data.msg);                        
                            // flash.setMessageType('alert-danger');                        
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
                    //return !$scope.form_constraints.$valid;
                };


            }])
        .controller("addcdnCtrl", ["$scope", "$http", "$routeParams", "$location", "flash",
            function ($scope, $http, $routeParams, $location, flash) {
                var original, $promise, action, id;

                if (typeof ($routeParams.id) == 'undefined')
                {
                    $promise = $http.post("../user/user_AddEditCdnPlan.php"); // send data to user.php
                    action = 'add';
                    id = '';
                } else
                {
                    $promise = $http.post("../user/user_AddEditCdnPlan.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
                    action = 'edit';
                    id = $routeParams.id;
                }

                $scope.user = {
                    id: '',
                    plan_name: '',
                    monthly_transfer: '',
                    monthly_price: '',
                    setup_fees: '',
                    additional_price: '',
                    storage_price: '',
                    audio_video: '',
                    https: '',
                    description: '',
                    plan_url: '',
                    plan_status: '',
                    disable_message: '',
                    action: action,
                    submit: 'submit'
                };
                $promise.then(function (msg) {

                    //  console.clear();
                    //  console.log(msg.data);
                    //$scope.stores = msg.data.plans;     
                    angular.extend($scope.user, msg.data.cdndata.user);
                    $scope.arrCountry = msg.data.arrCountry;
                    //$scope.features = msg.data.cdndata.catlist;

                    //console.log($scope.user);
                });

                $scope.submitForm = function () {

                    var data = $scope.user;
                    //console.log(data);


                    if (data.audio_video != 'Y')
                        delete data.audio_video;
                    if (data.sup_https != 'Y')
                        delete data.sup_https;


                    $promise = $http.post("../user/user_AddEditCdnPlan.php", data); // send data to user.php
                    $promise.then(function (msg) {
                        if (msg.data.status == 'success')
                        {
                            flash.setMessage(msg.data.msg);
                            flash.setMessageType('alert alert-success');
                            $location.path('/plans/plans');
                        } else
                        {
                            // flash.setMessage(msg.data.msg);                        
                            // flash.setMessageType('alert-danger');                        
                            $scope.msgtype = "alert alert-danger";
                            var str = "";
                            for (var item in msg.data.msg)
                            {
                                str += msg.data.msg[item] + "<br>";
                            }
                            $scope.msgtxt = str;
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
                    //return false;            
                    return !$scope.form_constraints.$valid;
                };


            }])

        .controller("addcloudCtrl", ["$scope", "$http", "$routeParams", "$location", "flash",
            function ($scope, $http, $routeParams, $location, flash) {
                var original, $promise, action, id;

                if (typeof ($routeParams.id) == 'undefined')
                {
                    $promise = $http.post("../user/user_AddEditCloudPlan.php"); // send data to user.php
                    action = 'add';
                    id = '';
                } else
                {
                    $promise = $http.post("../user/user_AddEditCloudPlan.php?id=" + $routeParams.id + "&action=select"); // send data to user.php
                    action = 'edit';
                    id = $routeParams.id;
                }

                $scope.user = {
                    id: '',
                    plan_name: '',
                    cpu_cores: '',
                    no_of_cores: '',
                    ram: '',
                    cloud_storage: '',
                    data_transfer: '',
                    monthly_price: '',
                    description: '',
                    plan_description: '',
                    plan_url: '',
                    action: action,
                    submit: 'submit'
                };
                $promise.then(function (msg) {

                    //  console.clear();
                    //  console.log(msg.data);
                    //$scope.stores = msg.data.plans;     
                    angular.extend($scope.user, msg.data.clouddata.user);
                    //$scope.arrCountry = msg.data.arrCountry;
                    //$scope.features = msg.data.cdndata.catlist;

                    //console.log($scope.user);
                });

                $scope.submitForm = function () {

                    var data = $scope.user;
                    //console.log(data);            

                    $promise = $http.post("../user/user_AddEditCloudPlan.php", data); // send data to user.php
                    $promise.then(function (msg) {
                        if (msg.data.status == 'success')
                        {
                            flash.setMessage(msg.data.msg);
                            flash.setMessageType('alert alert-success');
                            $location.path('/plans/plans');
                        } else
                        {

                            $scope.msgtype = "alert alert-danger";
                            var str = "";
                            for (var item in msg.data.msg)
                            {
                                str += msg.data.msg[item] + "<br>";
                            }
                            $scope.msgtxt = str;
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
                    //return false;            
                    return !$scope.form_constraints.$valid;
                };


            }]);
      