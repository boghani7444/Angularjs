angular.module("app.profile", ['textAngular', 'ngCropper'])
        
        .directive('simpleChange', function simpleChangeDirective() {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    if (!attrs.simpleChange) {
                        return;
                    }

                    el.on('change', function (e) {
                        scope.$apply(function () {
                            scope.$eval(attrs.simpleChange, {
                                $event: e
                            });
                        });
                    });
                }
            };
        })
        .filter('ystatfilter', function ($sce) {
    return function (val) {
        if (val == 1)
        {
            val = "Verified";
        } else
        {
            val = "Unverified";
        }
        return val;
    };
}).controller("logoutCtrl", ["$scope", "$http", "$rootScope", "$location", "loginService",
    function ($scope, $http, $rootScope, $location, loginService) {


        loginService.logout();
    }])
    .controller("companylogoCtrl", ["$scope", "$http", "$rootScope", "$location",'Cropper', '$timeout',
            function ($scope, $http, $rootScope, $location, Cropper, $timeout) {
                
                $scope.myImage = '';
                $scope.myCroppedImage = '';

				$scope.dataUrl = '';
				$scope.odataUrl = '';
                $scope.obj = {};

                // The url or the data64 for the image
                //$scope.obj.src = 'http://www.imgion.com/images/01/beautiful-village-home.jpg';

                // Must be [x, y, x2, y2, w, h]
                $scope.obj.coords = null; //[100, 100, 200, 200, 100, 100];

                // You can add a thumbnail if you want
                $scope.obj.thumbnail = false;
                
                
                ///======================
                var file, data;

  /**
   * Method is called every time file input's value changes.
   * Because of Angular has not ng-change for file inputs a hack is needed -
   * call `angular.element(this).scope().onFile(this.files[0])`
   * when input's event is fired.
   */
  $scope.onFile = function(blob) {
    Cropper.encode((file = blob)).then(function(dataUrl) {
      $scope.dataUrl = dataUrl;
	  $scope.odataUrl = dataUrl;
      $timeout(showCropper);  // wait for $digest to set image's src
    });
  };

  /**
   * Croppers container object should be created in controller's scope
   * for updates by directive via prototypal inheritance.
   * Pass a full proxy name to the `ng-cropper-proxy` directive attribute to
   * enable proxing.
   */
  $scope.cropper = {};
  $scope.cropperProxy = 'cropper.first';

  /**
   * When there is a cropped image to show encode it to base64 string and
   * use as a source for an image element.
   */
  $scope.preview = function() {
    if (!file || !data) return;
    /*Cropper.crop(file, data).then(Cropper.encode).then(function(dataUrl) {
      ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
    });*/
    $scope.scale(300);
  };

  /**
   * Use cropper function proxy to call methods of the plugin.
   * See https://github.com/fengyuanchen/cropper#methods
   */
  $scope.clear = function(degrees) {
    if (!$scope.cropper.first) return;
    $scope.cropper.first('clear');
  };

  $scope.scale = function(width) {
    Cropper.crop(file, data)
      .then(function(blob) {
        return Cropper.scale(blob, {width: width});
      })
      .then(Cropper.encode).then(function(dataUrl) {
        ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
      });
  };

  /**
   * Object is used to pass options to initalize a cropper.
   * More on options - https://github.com/fengyuanchen/cropper#options
   */
  $scope.options = {
    maximize: true,
    aspectRatio: 2 / 1,
    crop: function(dataNew) {
      data = dataNew;
    }
  };

  /**
   * Showing (initializing) and hiding (destroying) of a cropper are started by
   * events. The scope of the `ng-cropper` directive is derived from the scope of
   * the controller. When initializing the `ng-cropper` directive adds two handlers
   * listening to events passed by `ng-cropper-show` & `ng-cropper-hide` attributes.
   * To show or hide a cropper `$broadcast` a proper event.
   */
  $scope.showEvent = 'show';
  $scope.hideEvent = 'hide';

  function showCropper() { $scope.$broadcast($scope.showEvent); }
  function hideCropper() { $scope.$broadcast($scope.hideEvent); }

                //===============
                

                $scope.fileChanged = function (event) {
                    $scope.file = event.target.files[0];
                };
                $scope.cancel = function () {
                    $location.path('/company/editcompanydetail');
                };
                $scope.handle = function (dataURL,odataURL) {
                    // Do your uploading here
                    $scope.msgtype = "";
                    $scope.msgtxt = "";
                    var fd = new FormData();
                    var imgBlob = dataURItoBlob(dataURL);
					var oimgBlob = dataURItoBlob(odataURL);
					fd.append('ologo', oimgBlob);
                    fd.append('clogo', imgBlob);
                    fd.append('actionfile', 'editimage');
                    $http.post(
                            '../user/user_EditCompany.php',
                            fd, {
                                transformRequest: angular.identity,
                                headers: {
                                    'Content-Type': undefined
                                }
                            }
                    )
                            .success(function (response) {
                                // console.log(response);
                                if (response.status == 'success')
                                {
                                    //alert($rootScope.profileimg);
                                    d = new Date();
                                    $rootScope.profileimg = response.imgurl + "?" + d.getTime();
                                    //$rootScope.$broadcast('profileimg');
                                    $rootScope.$emit('profileimg', $rootScope.profileimg);
                                    $("#profileimg").attr('src', $rootScope.profileimg);
                                    //alert("test");
                                    var elem = document.querySelector("#profileimg");
                                    elem.setAttribute('src', $rootScope.profileimg);
                                    //alert($rootScope.profileimg);
                                    // $scope.msgtype = "alert alert-success";
                                    // $scope.msgtxt = response.msg;
                                    $location.path('/company/editcompanydetail');
                                } else
                                {
                                    $scope.hide = false;
                                    $scope.msgtype = "alert alert-danger fade in";
                                    $scope.msgtxt = response.msg;
                                }


                            })
                            .error(function (response) {
                                console.log('error', response);
                            });


                };

                var handleFileSelect = function (evt) {
                    var file = evt.currentTarget.files[0];
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            $scope.myImage = evt.target.result;
                        });
                    };
                    reader.readAsDataURL(file);
                };
                angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

                $scope.uploadImage = function () {

                    if ($scope.myCroppedImage === '')
                    {

                    }
                    $scope.msgtype = "";
                    $scope.msgtxt = "";
                    var fd = new FormData();
                    var imgBlob = dataURItoBlob($scope.myCroppedImage);
                    fd.append('clogo', imgBlob);
                    fd.append('actionfile', 'editimage');
                    $http.post(
                            '../user/user_EditCompany.php',
                            fd, {
                                transformRequest: angular.identity,
                                headers: {
                                    'Content-Type': undefined
                                }
                            }
                    )
                            .success(function (response) {
                                // console.log(response);
                                if (response.status == 'success')
                                {
                                    //alert($rootScope.profileimg);
                                    d = new Date();
                                    $rootScope.profileimg = response.imgurl + "?" + d.getTime();
                                    //$rootScope.$broadcast('profileimg');
                                    $rootScope.$emit('profileimg', $rootScope.profileimg);
                                    $("#profileimg").attr('src', $rootScope.profileimg);
                                    //alert("test");
                                    var elem = document.querySelector("#profileimg");
                                    elem.setAttribute('src', $rootScope.profileimg);
                                    //alert($rootScope.profileimg);
                                    // $scope.msgtype = "alert alert-success";
                                    // $scope.msgtxt = response.msg;
                                    $location.path('/company/editcompanydetail');
                                } else
                                {
                                    $scope.hide = false;
                                    $scope.msgtype = "alert alert-danger fade in";
                                    $scope.msgtxt = response.msg;
                                }


                            })
                            .error(function (response) {
                                console.log('error', response);
                            });
                };


                //you need this function to convert the dataURI
                function dataURItoBlob(dataURI) {
                    var binary = atob(dataURI.split(',')[1]);
                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                    var array = [];
                    for (var i = 0; i < binary.length; i++) {
                        array.push(binary.charCodeAt(i));
                    }
                    return new Blob([new Uint8Array(array)], {
                        type: mimeString
                    });
                }
            }
        ])
        .controller("contactCtrl", ["$scope", "$http",
            function ($scope, $http) {
                // alert("test");
                $scope.user =
                        {
                            'submit': "send",
                            'quesType': '',
                            'txtQuery': ''
                        };
                $scope.canSubmit = function () {
                    return !$scope.form_constraints.$valid;
                };
                $scope.submitForm = function () {

                    data = $scope.user;
                    var $promise = $http.post("../user/user_postHelpQuery.php", data); // send data to user.php
                    $promise.then(function (msg) {
                        //data = msg.data.data;
                        if (msg.data.status == 'success')
                        {


                            $scope.msgtype = "alert alert-success";
                            $scope.msgtxt = msg.data.msg;
                        } else
                        {
                            $scope.hide = false;
                            $scope.msgtype = "alert alert-danger fade in";
                            $scope.msgtxt = msg.data.msg;
                        }


                    });
                };

            }
        ])
        .controller("myprofileCtrl", ["$scope", "$http",
            function ($scope, $http) {
                var $promise = $http.post("../user/user_Profile.php"); // send data to user.php
                $promise.then(function (msg) {
                    data = msg.data.data;
                    $scope.firstname = data.first_name;
                    $scope.lastname = data.last_name;
                    $scope.cemail = data.email;
                    $scope.companyName = data.com_name;
                    $scope.companyUrl = data.com_url;
                    $scope.message = data.message;
                });

            }
        ])
        .controller("editprofileCtrl", ["$scope", "$mdDialog","$http",
            function ($scope, $mdDialog, $http) {
                var $promise = $http.post("../user/user_Register.php"); // send data to user.php
                $promise.then(function (msg) {
                    var original = msg.data.row;
                    $scope.row = angular.copy(original);

                });

                return $scope.row = {
                    'fname': '',
                    'lname': '',
                    'comname': '',
                    'cemail': '',
                    'comurl': '',
                    'message': '',
                    'action': 'edit'
                }, original = angular.copy($scope.row),
                        $scope.canSubmit = function () {
                            return true;
							//return $scope.form_constraints.$valid && !angular.equals($scope.row, original);
                        },
                        $scope.canRevert = function () {
                            return !angular.equals($scope.row, original) || !$scope.form_constraints.$pristine;
                        },
                        $scope.revert = function () {
                            return $scope.row = angular.copy(original), $scope.form_constraints.$setPristine();
                        },
                        $scope.submitForm = function () {
							if (!$scope.row.comname)
							{
								$scope.selectedIndex = 0;
								$mdDialog.show($mdDialog.alert().title('Please enter the valid company name').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.row.fname)
							{
								$scope.selectedIndex = 0;
								$mdDialog.show($mdDialog.alert().title('Please enter your first name').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
                            var $promise = $http.post("../user/user_Register.php", $scope.row); // send data to user.php
                            $promise.then(function (msg) {
                                //console.log(msg);
                                if (msg.data.status == 'success')
                                {
                                    $scope.msgtype = "alert alert-success";
                                    $scope.msgtxt = msg.data.msg;
                                } else
                                {
                                    $scope.hide = false;
                                    $scope.msgtype = "alert alert-danger fade in";
                                    $scope.msgtxt = msg.data.msg;
                                }

                            });
                        };

            }
        ])
        .controller("editcompanydetailCtrl", ["$scope", "$mdDialog", "$http",
            function ($scope, $mdDialog, $http) {
                var year = new Date().getFullYear();
                var yrange = [];
                yrange.push(year);
                for (var i = 1; i < 50; i++) {
                    yrange.push(year - i);
                }
                $scope.years = yrange;
                $scope.isVerified = function (value) {
                    if (value == 1)
                        return true;
                    else
                        return false;
                };
                var $promise = $http.post("../user/user_EditCompany.php"); // send data to user.php
                $promise.then(function (msg) {
                    if (msg.data.comdetail.payment_methods !== null && msg.data.comdetail.payment_methods !== "")
                    {
                        msg.data.comdetail.payment_methods = msg.data.comdetail.payment_methods.split(",");
                    } else
                    {
                        msg.data.comdetail.payment_methods = [];
                    }
                    var original = msg.data.comdetail;
                    var country = msg.data.country;
                    var states = msg.data.states;
                    $scope.comdetail = angular.copy(original);
                    $scope.country = angular.copy(country);
                    $scope.states = angular.copy(states);
                    $scope.dstates = [];
                    $scope.dstates[1] = angular.copy(msg.data.states1);
                    $scope.dstates[2] = angular.copy(msg.data.states2);
                    $scope.dstates[3] = angular.copy(msg.data.states3);
                });

                $scope.selectChanged = function (countryid, stat) {
                    var tp = stat;
                    var $promise = $http.post("../stateList.php", {country_id: countryid});
                    $promise.then(function (msg) {
						if (tp > 0 )
						{
							if ($scope.comdetail.arrDataLoc[tp-1].id_state)
							{
								$scope.comdetail.arrDataLoc[tp-1].id_state = "";
								$scope.comdetail.arrDataLoc[tp-1].datacenter_location = "";
							}
						}
						
                        if (tp === 0)
                        {
                            $scope.states = angular.copy(msg.data.state);
                        } else if (tp === 1)
                        {
							
                            $scope.dstates[1] = angular.copy(msg.data.state);
                        } else if (tp === 2)
                        {
                            $scope.dstates[2] = angular.copy(msg.data.state);
                        } else if (tp === 3)
                        {
                            $scope.dstates[3] = angular.copy(msg.data.state);
                        }
                    });

                };

                $scope.allpayment_methods = ['PayPal', 'CreditCard', 'NetBanking',  'Bitcoin', 'Mail-in-Payment', 'Cash', 'Other'];

                // toggle selection for a given fruit by name
                $scope.togglepaySelection = function togglepaySelection(payment_method) {

                    var idx = ($scope.comdetail.payment_methods !== null && $scope.comdetail.payment_methods !== "") ? $scope.comdetail.payment_methods.indexOf(payment_method) : -1;
                    // is currently selected
                    if (idx > -1) {
                        $scope.comdetail.payment_methods.splice(idx, 1);
                    }

                    // is newly selected
                    else {
                        $scope.comdetail.payment_methods.push(payment_method);
                    }
                };
				$scope.selectedIndex = 0;
                return $scope.comdetail = {
                    'cname': '',
                    'brief': '',
                    'summary': '',
                    'datacenter': '',
                    'payment_methods': '',
                    'url': '',
                    'help': '',
                    'cemail': '',
                    'cphone': '',
                    'caddress': '',
                    'ccity': '',
                    'state': '',
                    'ccountry': '',
                    'action': 'edit'
                }, original = angular.copy($scope.comdetail),
                        $scope.canSubmit = function () {
							return false;
                            //return !$scope.form_constraints.$valid && !angular.equals($scope.comdetail, original);
                        },
                        $scope.canRevert = function () {
                            return !angular.equals($scope.comdetail, original) || !$scope.form_constraints.$pristine;
                        },
                        $scope.revert = function () {
                            return $scope.comdetail = angular.copy(original), $scope.form_constraints.$setPristine();
                        },
                        $scope.submitForm = function () {
							
							if (!$scope.comdetail.cname)
							{
								$scope.selectedIndex = 0;
								$mdDialog.show($mdDialog.alert().title('Please enter the valid company name (Max 30 char.)').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							/*if (!$scope.comdetail.since_year)
							{
								$scope.selectedIndex = 0;
								$mdDialog.show($mdDialog.alert().title('Please enter the year of establishment').ok("Ok")).finally(function() {angular.element('#since_year').focus();});
								return false;
							}*/
							if (!$scope.comdetail.summary)
							{
								$scope.selectedIndex = 0;
								$mdDialog.show($mdDialog.alert().title('Please Enter Briff Summary').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							/*if (!$scope.comdetail.brief)
							{
								$scope.selectedIndex = 0;
								$mdDialog.show($mdDialog.alert().title('Please Enter features').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}*/
							if ($scope.comdetail.arrDataLoc[0].id_country)
							{
								if ((!$scope.comdetail.arrDataLoc[0].id_state) || (parseInt($scope.comdetail.arrDataLoc[0].id_state) === 0))
								{
									$scope.selectedIndex = 1;	
									$mdDialog.show($mdDialog.alert().title('Please enter the state for data center location 1').ok("Ok")).finally(function() {angular.element('#state_0').focus();});
									return false;
								}
								
								if (!$scope.comdetail.arrDataLoc[0].datacenter_location)
								{
									$scope.selectedIndex = 1;	
									$mdDialog.show($mdDialog.alert().title('Please enter the city for data center location 1').ok("Ok")).finally(function() {angular.element('#city_0').focus();});
									return false;
								}
							}
							if ($scope.comdetail.arrDataLoc[1].id_country)
							{
								if ((!$scope.comdetail.arrDataLoc[1].id_state) || (parseInt($scope.comdetail.arrDataLoc[1].id_state) === 0))
								{
									$scope.selectedIndex = 1;	
									$mdDialog.show($mdDialog.alert().title('Please enter the state for data center location 2').ok("Ok")).finally(function() {angular.element('#state_1').focus();});
									return false;
								}
								
								if (!$scope.comdetail.arrDataLoc[1].datacenter_location)
								{
									$scope.selectedIndex = 1;	
									$mdDialog.show($mdDialog.alert().title('Please enter the city for data center location 2').ok("Ok")).finally(function() {angular.element('#city_1').focus();});
									return false;
								}
							}
							
							if ($scope.comdetail.arrDataLoc[2].id_country)
							{
								if ((!$scope.comdetail.arrDataLoc[2].id_state) || (parseInt($scope.comdetail.arrDataLoc[2].id_state) === 0))
								{
									$scope.selectedIndex = 1;	
									$mdDialog.show($mdDialog.alert().title('Please enter the state for data center location 3').ok("Ok")).finally(function() {angular.element('#state_2').focus();});
									return false;
								}
								
								if (!$scope.comdetail.arrDataLoc[2].datacenter_location)
								{
									$scope.selectedIndex = 1;	
									$mdDialog.show($mdDialog.alert().title('Please enter the city for data center location 3').ok("Ok")).finally(function() {angular.element('#city_2').focus();});
									return false;
								}
							}
							/*if (!$scope.comdetail.datacenter)
							{
								$scope.selectedIndex = 1;
								$mdDialog.show($mdDialog.alert().title('Please Enter Datacenter Information').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}*/
							
							if (!$scope.comdetail.help)
							{
								$scope.selectedIndex = 2;
								$mdDialog.show($mdDialog.alert().title('Please Enter Your Help Desk URL').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.comdetail.caddress)
							{
								$scope.selectedIndex = 2;
								$mdDialog.show($mdDialog.alert().title('Please Enter Your Address ').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.comdetail.cemail)
							{
								$scope.selectedIndex = 2;
								$mdDialog.show($mdDialog.alert().title('Please Enter Support Email Address').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.comdetail.ccity)
							{
								$scope.selectedIndex = 2;
								$mdDialog.show($mdDialog.alert().title('Please Enter City').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.comdetail.ccountry)
							{
								$scope.selectedIndex = 2;
								$mdDialog.show($mdDialog.alert().title('Please Enter Country').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.comdetail.state)
							{
								$scope.selectedIndex = 2;
								$mdDialog.show($mdDialog.alert().title('Please Enter State').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.comdetail.payment_methods)
							{
								$scope.selectedIndex = 3;
								$mdDialog.show($mdDialog.alert().title('Please Enter State').ok("Ok"));
								return false;
							}
							
                            if ($scope.comdetail.payment_methods)
                            {
								try {
									 $scope.comdetail.payment_methods = $scope.comdetail.payment_methods.join(",");
								}
								catch(err) {
								}
								
                            }
                            var $promise = $http.post("../user/user_EditCompany.php", $scope.comdetail); // send data to user.php
                            $promise.then(function (msg) {
                                //console.log(msg);
                                if (msg.data.status == 'success')
                                {
                                    $scope.msgtype = "alert alert-success";
                                    $scope.msgtxt = msg.data.msg;
                                    //location.reload();
                                    if ($scope.comdetail.payment_methods !== null && $scope.comdetail.payment_methods !== "")
                                    {
                                        $scope.comdetail.payment_methods = $scope.comdetail.payment_methods.split(",");
                                    } else
                                    {
                                        $scope.comdetail.payment_methods = [];
                                    }
                                } else
                                {
                                    $scope.hide = false;
                                    $scope.msgtype = "alert alert-danger fade in";
									if ($scope.comdetail.payment_methods !== null && $scope.comdetail.payment_methods !== "")
                                    {
                                        $scope.comdetail.payment_methods = $scope.comdetail.payment_methods.split(",");
                                    } else
                                    {
                                        $scope.comdetail.payment_methods = [];
                                    }
                                    $scope.msgtxt = msg.data.msg;
                                }

                            });
                        };

            }
        ]).controller("strengthCtrl", ["$scope", "$mdDialog", "$http",
            function ($scope, $mdDialog, $http) {
                var $promise = $http.post("../user/user_EditCompanystrength.php");
                $promise.then(function (msg) {
					$scope.selectedItem = [];
					if (msg.data.comdetail.locations !== null && msg.data.comdetail.locations !== "")
                    {
						msg.data.comdetail.locations = msg.data.comdetail.locations.split(",");
						$.each( msg.data.comdetail.locations, function( key, value ) {
								$scope.selectedItem.push({'id':key,'country_name':value});
						});
                    } else
                    {
                        msg.data.comdetail.slocations = [];
                    }
					msg.data.comdetail.slocations = $scope.selectedItem;
                    var original = msg.data.comdetail;
					var country = msg.data.country;
                    
					$scope.comdetail = angular.copy(original);
                    $scope.country = angular.copy(country);
					
				$scope.selectedItem = null;
				$scope.selectedLocations = null;
				$scope.searchText = null;
				$scope.countries = loadCountry();
				$scope.selectedCountries = msg.data.comdetail.locations;
				/**
				 * Return the proper object when the append is called.
				 */
				$scope.transformChip = function(chip) {
				  // If it is an object, it's already a known chip
				  if (angular.isObject(chip)) {
					return chip;
				  }
				  // Otherwise, create a new one
				  return { name: chip, type: 'new' };
				};
				/**
				 * Search for Country.
				 */
				$scope.querySearch = function (query) {
				  var results = query ? $scope.country.filter(createFilterFor(query)) : [];
				  return results;
				};
				/**
				 * Create filter function for a query string
				 */
				function createFilterFor(query) {
				  var lowercaseQuery = angular.lowercase(query);
				  return function filterFn(country) {
					return (country._lowername.indexOf(lowercaseQuery) === 0);
				  };
				}
				function loadCountry() {
				  return $scope.country.map(function (country) {
					country._lowername = country.country_name.toLowerCase();
					return country;
				  });
				}
  			});
                return $scope.comdetail = {
                    'turnover': '',
                    'totemp': '',
                    'locations': '',
                    'totaccount': '',
                    'totsharedaccount': '',
                    'tothostingaccount': '',
                    'totvpsaccount': '',
                    'totwinvpsaccount': '',
                    'totdedicatedservers': '',
                    'totcloudhostingaccount': '',
                    'totcloudvps': '',
                    'totwordpressaccount': '',
                    'totfreeaccounts': '',
					'livesupport': '',
                    'action': 'edit'
                }, original = angular.copy($scope.comdetail),
                        $scope.canSubmit = function () {
							return false;
                            //return !$scope.form_constraints.$valid && !angular.equals($scope.comdetail, original);
                        },
                        $scope.canRevert = function () {
                            return !angular.equals($scope.comdetail, original) || !$scope.form_constraints.$pristine;
                        },
                        $scope.revert = function () {
                            return $scope.comdetail = angular.copy(original), $scope.form_constraints.$setPristine();
                        },
                        $scope.submitForm = function () {
							$scope.selectedLocations = null;
							$.each( $scope.comdetail.slocations, function( key, obj ) {
								$scope.selectedLocations = $scope.selectedLocations + ',' + obj.country_name;
							});
							if ($scope.selectedLocations !== null && $scope.selectedLocations !== "")
							{
								$scope.comdetail.locations = $scope.selectedLocations.replace("null,","");
							}else
							{
								$scope.comdetail.locations = null;
							}
							//console.log($scope.comdetail.locations);
							/*if (!$scope.comdetail.cname)
							{
								$scope.selectedIndex = 0;
								$mdDialog.show($mdDialog.alert().title('Please enter the company name').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							
							if (!$scope.comdetail.summary)
							{
								$scope.selectedIndex = 0;
								$mdDialog.show($mdDialog.alert().title('Please Enter Briff Summary').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							
							
							if (!$scope.comdetail.help)
							{
								$scope.selectedIndex = 2;
								$mdDialog.show($mdDialog.alert().title('Please Enter Your Help Desk URL').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.comdetail.caddress)
							{
								$scope.selectedIndex = 2;
								$mdDialog.show($mdDialog.alert().title('Please Enter Your Address ').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.comdetail.cemail)
							{
								$scope.selectedIndex = 2;
								$mdDialog.show($mdDialog.alert().title('Please Enter Support Email Address').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.comdetail.ccity)
							{
								$scope.selectedIndex = 2;
								$mdDialog.show($mdDialog.alert().title('Please Enter City').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.comdetail.ccountry)
							{
								$scope.selectedIndex = 2;
								$mdDialog.show($mdDialog.alert().title('Please Enter Country').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.comdetail.state)
							{
								$scope.selectedIndex = 2;
								$mdDialog.show($mdDialog.alert().title('Please Enter State').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.comdetail.payment_methods)
							{
								$scope.selectedIndex = 3;
								$mdDialog.show($mdDialog.alert().title('Please Enter State').ok("Ok"));
								return false;
							}
							
                            if ($scope.comdetail.payment_methods)
                            {
								try {
									 $scope.comdetail.payment_methods = $scope.comdetail.payment_methods.join(",");
								}
								catch(err) {
								}
								
                            }*/
                            var $promise = $http.post("../user/user_EditCompanystrength.php", $scope.comdetail); 
                            $promise.then(function (msg) {
								
								/*$scope.comdetail.locations = $scope.comdetail.locations.split(",");
								$scope.selectedpostItem = [];
								$.each( $scope.comdetail.locations, function( key, value ) {
										$scope.selectedpostItem.push({'id':key,'country_name':value});
								});
								$scope.comdetail.locations = null;
								$scope.comdetail.locations = $scope.selectedpostItem;
								$scope.selectedCountries = $scope.comdetail.locations;
								$scope.selectedItem = null;
								$scope.selectedLocations = null;
								$scope.searchText = null;*/
                                if (msg.data.status == 'success')
                                {
                                    $scope.msgtype = "alert alert-success";
                                    $scope.msgtxt = msg.data.msg;
                                } else
                                {
                                    $scope.hide = false;
                                    $scope.msgtype = "alert alert-danger fade in";
                                }

                            });
                        };

            }
        ])
        .controller("changepasswordCtrl", ["$scope", "$mdDialog","$http",
            function ($scope, $mdDialog, $http) {
                var original;
                $scope.hide = true;
                return $scope.user = {
                    'username': '',
                    'oldpass': '',
                    'newpass': '',
                    'connewpass': ''
                }, original = angular.copy($scope.user),
                        $scope.canSubmit = function () {
                            return true;
							//return $scope.form_constraints.$valid && !angular.equals($scope.user, original);
                        },
                        $scope.canRevert = function () {
                            return !angular.equals($scope.user, original) || !$scope.form_constraints.$pristine;
                        },
                        $scope.revert = function () {
                            return $scope.user = angular.copy(original), $scope.form_constraints.$setPristine();
                        },
                        $scope.submitForm = function () {
                            if (!$scope.user.oldpass)
							{
								
								$mdDialog.show($mdDialog.alert().title('Please enter the old password').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.user.newpass)
							{
								
								$mdDialog.show($mdDialog.alert().title('Please enter the new password with minimum 8 characters').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							if (!$scope.user.connewpass)
							{
								
								$mdDialog.show($mdDialog.alert().title('Please confirm the new password with minimum 8 characters').ok("Ok")).finally(function() {angular.element('input.ng-invalid').first().focus();});
								return false;
							}
							
							if ($scope.user.connewpass !== $scope.user.newpass)
							{
								
								$mdDialog.show($mdDialog.alert().title('Password does not match!!!').ok("Ok")).finally(function() {angular.element('#confpassword').focus();});
								return false;
							}
							
							
							var $promise = $http.post("../user/user_changePass.php", $scope.user); // send data to user.php
                            $promise.then(function (msg) {
                                console.log(msg);
                                if (msg.data.status == 'success')
                                {

                                    $scope.revert();
                                    $scope.hide = false;
                                    $scope.msgtype = "alert alert-success";
                                    $scope.msgtxt = msg.data.msg;

                                } else
                                {
                                    $scope.hide = false;
                                    $scope.msgtype = "alert alert-danger fade in";
                                    $scope.msgtxt = msg.data.msg;
                                }

                            });
                        };
            }
        ]);
function base64ToBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);
    for (var sliceIndex = 0;
            sliceIndex <
            slicesCount;
            ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);
        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0;
                offset <
                end;
                ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, {
        type: contentType});
}
