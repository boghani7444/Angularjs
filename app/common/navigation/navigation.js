/*
 Application navigation controllers
 */

angular.module("app.navigation", []).controller("NavCtrl", ["$scope", "$timeout", "$mdSidenav", "$mdUtil", "$log", "$location","$mdMedia","config",
  function ($scope, $timeout, $mdSidenav, $mdUtil, $log, $location, $mdMedia, config) {

    this.toggleLeft = buildToggler('left');
	
	this.sidebar_opened = $mdMedia('gt-sm') && config.sidebar_default_open;
	
	this.checkIfOwnPage = function () {
       return _.contains(["/404", "/pages/500", "/login","/pages/login", "/pages/signin", "/pages/signin1", "/pages/signin2", "/pages/signup", "/pages/signup1", "/pages/signup2", "/lostpassword", "/pages/lock-screen"], $location.path()); 
      //return _.contains(["/404", "/pages/500", "/pages/login", "/pages/signin", "/pages/signin1", "/pages/signin2", "/pages/signup", "/pages/signup1", "/pages/signup2", "/pages/forgot", "/pages/lock-screen"], $location.path());
    };

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
       $(".view-container").toggleClass("slided-right");
        $(".header__menu-button").toggleClass("toggled");
        $mdSidenav(navID)
          .toggle()
          .then(function () {
			
          });
      },200);
      return debounceFn;
    }
  }
]).controller("MenuCtrl",['$location','$scope',
  function($location,$scope){
    //console.log($location);
    this.goToUrl = function(url) {
      $location.path(url);
    };
    
    this.menu_sections = [
      {
        name: 'Dashboard',
        is_toggle:true,
        toggled: false,
        icon: 'dist/img/icons/ic_dashboard_24px.svg',
        menu_items: [
          {
            name: 'Dashboard',
            url: 'dashboard'
          }
        ]
      },
//      {
//        name: 'My Account',
//        is_toggle:true,
//        toggled: false,
//        icon: 'dist/img/icons/ic_account_box_24px.svg',
//        menu_items: [
//          {
//            name: 'My Profile',
//            url: 'company/editprofile'
//          },
//          {
//            name: 'Change Password',
//            url: 'company/changepassword'
//          },
//          {
//            name: 'Logout',
//            url: 'logout'
//          }          
//        ]
//      },
      {
        name: 'My Company',
        is_toggle:true,
        toggled: false,
        icon: 'dist/img/icons/ic_web_24px.svg',
        menu_items: [
          {
            name: 'Company Details',
            url: 'company/editcompanydetail'
          },
		  {
			  name: 'Company Strength',
			  url: 'company/strength'
		  }
        ]
      },
      {
        name: 'Hosting Assured',
        is_toggle:true,
        icon: 'dist/img/icons/ic_verified_user_24px.svg',
        menu_items: [
			{
            name: 'What is Hosting Assured?',
            url: 'whatishac'
          },
		  {
            name: 'How to Join?',
            url: 'joinhac'
          },{
            name: 'HA Complaints & Resoulution',
            url: 'haccompres'
          },
          {
            name: 'HA Mediation Process',
            url: 'hacmedproc'
          },
		  {
            name: 'Hosting Assured FAQ',
            url: 'hacfaq'
          },{
            name: 'HA Terms of Use',
            url: 'hactoc'
          },{
            name: 'HA Privacy Policy',
            url: 'hacprivacy'
          },
		  {
            name: 'HA Trust Mark Seal',
            url: 'abouthac'
          }
		  ]
      },
      {
        name: 'My Hosting Plans',
        is_toggle:true,
        toggled: false,
        icon: 'dist/img/icons/ic_view_module_24px.svg',
        menu_items: [
          {
            name: 'My Plans',
            url: 'plans/plans',
          },
          {
            name: '+ Shared Hosting Plan',
            url: 'plans/addshared'
          },
          {
            name: '+ Windows Hosting Plan',
            url: 'plans/addwindows'
          },
          {
            name: '+ Wordpress Hosting Plan',
            url: 'plans/addwordpress'
          },
          {
            name: '+ Free Hosting Plan',
            url: 'plans/addfree'
          },
          {
            name: '+ Cloud Shared Plan',
            url: 'plans/addcloudshared'
          },
          {
            name: '+ Dedicated Server',
            url: 'plans/dedicatedplan'
          },
          {
            name: '+ VPS Hosting Plan',
            url: 'plans/vpsplan'
          },
          {
            name: '+ Windows VPS Plan',
            url: 'plans/addwindowsvps'
          },
          {
            name: '+ Cloud VPS Plan',
            url: 'plans/cloudvpsplan'
          }
       ]
      },
      {
        name: 'Coupons',
        is_toggle:true,
        toggled: false,
        icon: 'dist/img/icons/ic_code_24px.svg',
        menu_items: [
            {
            name: 'My Coupons',
            url: 'coupon/coupon'
          },
          {
            name: 'Add Coupon',
            url: 'coupon/addcoupon'
          },
          
        ]
      },
      {
        name: 'Quotes',
        is_toggle:true,
        toggled: false,
        icon: 'dist/img/icons/ic_question_answer_24px.svg',
        menu_items: [
		  {
            name: 'Shared Hosting Quotes',
            url: 'quote/sharedhostingquote'
          },
          {
            name: 'Dedicated Hosting Quotes',
            url: 'quote/dedicatedhostingquote'
          },
          {
            name: 'VPS Hosting Quotes',
            url: 'quote/vpshostingquote'
          }/*,{
            name: 'Messages',
            url: 'quote/communications'
          }*/
        ]
      },
      {
        name : 'Reviews & Ratings',
        is_toggle:true,
        toggled: false,
        icon: 'dist/img/icons/ic_star_24px.svg',
        menu_items: [
          {
            name: 'View Reviews',
            url: 'review/index'
          },
          {
            name: 'Rating Details',
            url: 'review/ratings'
          }
        ]
      },
      {
        name: 'News',
        is_toggle:true,
        toggled: false,
        icon: 'dist/img/icons/ic_new_releases_24px.svg',
        menu_items: [
          {
            name: 'Your Company News',
            url: 'news/index'
          },
          {
            name: 'Add News',
            url: 'news/add'
          }
        ]
      },
	  {
        name: 'Contact US',
        is_toggle:false,
        toggled: false,
        icon: 'dist/img/icons/ic_help_24px.svg',
		url:'/contactsupport'
      }
    ];

    this.getClass = function(url) {

      if('/' + url == $location.path()){
        return "active";
      }
      else {
        return "";
      }

    };

    this.getActiveParent = function(items) {
      return _.find(items, function(value){
        return '/' + value.url == $location.path();
      });
    };

    this.toggle = function(index){
      var $this = this;
      this.menu_sections.map(function(ix, position) {          
        var toggle = $this.menu_sections[index].toggled ? false : true;
        $this.menu_sections[position].toggled = position !== index ?  false : toggle;
      });
      $(".main-menu").children("li:nth-child(" + (index + 1) + ")").toggleClass("open").find("ul").stop().slideToggle(function(){
        $(".main-menu").children("li:nth-child(" + (index + 1) + ")").siblings().removeClass("open").find("ul").stop().slideUp();
      });
    };
  }
]).controller('HeaderNavMenu',["$mdDialog","loginService","$location",
  function HeaderNavMenu($mdDialog,loginService,$location) {
    var originatorEv;
    this.openMenu = function($mdOpenMenu, ev) {
        
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    this.notificationsEnabled = true;
    this.toggleNotifications = function() {
      this.notificationsEnabled = !this.notificationsEnabled;
    };
    this.logout = function() {
        loginService.logout();
    };
    this.changepass = function() {
        $location.path("/company/changepassword");
    };
    this.contactsupport = function() {
        $location.path("/contactsupport");
    };
    this.checkVoicemail = function() {
      // This never happens.
    };
  }])
.controller('profileimgCtrl',["$scope","$mdDialog","loginService","$rootScope","$http", 
 function  profileimgCtrl($scope,$mdDialog,loginService,$rootScope,$http){
     var $promise = $http.post("../user/user_EditCompany.php",{'action':'getimage'}); // send data to user.php
    $promise.then(function(msg){                  
         d = new Date();
        $rootScope.profileimg = msg.data.imgurl+ "?"+ d.getTime();
    });
     $rootScope.profileimg = "dist/images/logo.png";
     
     $scope.imagecropfun = function (ev){
         
         
          $mdDialog.show({
        controller: function ($scope, $mdDialog) {
          $scope.hide = function () {
            $mdDialog.hide(function(){

            });
          };
          $scope.cancel = function () {
            $mdDialog.cancel(function(){

            });
          };
          $scope.answer = function (answer) {
            $mdDialog.hide(answer);
          };
        },
        templateUrl: 'app/views/company/companylogo.html',
        targetEvent: ev
      })
        .then(function (answer) {
          $scope.alert = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.alert = 'You cancelled the dialog.';
        });
         
     };
 }]).controller('companylinkCtrl',["$scope","$mdDialog","loginService","$rootScope","$http", 
 function  companylinkCtrl($scope,$mdDialog,loginService,$rootScope,$http){
    var $promise = $http.post("../user/user_EditCompany.php",{'action':'getcompanylink'});
    $promise.then(function(msg){                  
        $scope.companyname = msg.data.companyname;
		$scope.companyslug = msg.data.companyslug;
    });
 }]).controller('notificationCtrl',["$scope","$mdDialog","loginService","$rootScope","$http", 
 function  companylinkCtrl($scope,$mdDialog,loginService,$rootScope,$http){
    var $promise = $http.post("../user/user_notifications.php",{'action':'gettotalnotifications'});
    $promise.then(function(msg){                  
        $scope.totalnotifications = msg.data.totnotifications;
    });
 }]).controller('dashboardCtrl',["$scope","$mdDialog","loginService","$rootScope","$http", 
 function  dashboardCtrl($scope,$mdDialog,loginService,$rootScope,$http){
    var $promise = $http.post("../user/user_notifications.php",{'action':'getdashboardnotificaitons'});
    $promise.then(function(msg){                  
        $scope.sharedquoteunread = msg.data.sharedquoteunread;
        $scope.dedicatedquoteunread= msg.data.dedicatedquoteunread;
        $scope.vpsquoteunread = msg.data.vpsquoteunread;
        $scope.sharedquote = msg.data.sharedquote;
        $scope.dedicatedquote= msg.data.dedicatedquote;
        $scope.vpsquote = msg.data.vpsquote;
        $scope.quotemessages = msg.data.quotemessages;
        $scope.tothaccompres = msg.data.tothaccompres;
        $scope.totreviews = msg.data.totreviews;
        $scope.totsharedplanpending = msg.data.totsharedplanpending;
        $scope.totcloudsharedplanpending = msg.data.totcloudsharedplanpending;
        $scope.totdedicatedplanpending = msg.data.totdedicatedplanpending;
        $scope.totvpsplanpending = msg.data.totvpsplanpending;
        $scope.totcloudvpsplanpending = msg.data.totcloudvpsplanpending;
        $scope.totsharedplan = msg.data.totsharedplan;
        $scope.totcloudsharedplan = msg.data.totcloudsharedplan;
        $scope.totdedicatedplan = msg.data.totdedicatedplan;
        $scope.totvpsplan = msg.data.totvpsplan;
        $scope.totcloudvpsplan = msg.data.totcloudvpsplan;
        $scope.totquoteunreadmsg = msg.data.totquoteunreadmsg;
        $scope.totunreadhaccomp = msg.data.totunreadhaccomp;
        
        $scope.$on('$destroy', function() {
            zingchart.exec('myChart', 'destroy');
        });
        
        $scope.total = msg.data.company_total.total;
        
        $scope.Plan_adding = msg.data.company_total.Plan_adding;
        $scope.Data_Center = msg.data.company_total.Data_Center_Information;
        $scope.Support = msg.data.company_total.Support;
        $scope.Hosting_Assured = msg.data.company_total.Hosting_Assured;
        
        
        var Plan_adding = msg.data.company_total.Plan_adding;
        var Plan_adding_remain = 100 - msg.data.company_total.Plan_adding;
        
        var Data_Center = msg.data.company_total.Data_Center_Information;
        var Data_Center_remain = 100 - msg.data.company_total.Data_Center_Information;
        
        var Support = msg.data.company_total.Support;
        var Support_remain = parseFloat(100 - msg.data.company_total.Support);
        
        var Hosting_Assured = msg.data.company_total.Hosting_Assured;
        var Hosting_Assured_remain = 100 - msg.data.company_total.Hosting_Assured;
        
        if(Hosting_Assured === 0)
        {
            $scope.color = "#CF2E2E";
            $scope.text = "Inactive";
            $scope.text_css = "margin-left: 7%;";
            $scope.assured_seal = "fa fa-times-circle fa-4x text-danger";
            $scope.assured_text = "Become a Hosting Assured Company";
        }else{
            $scope.color = "#5CB85C";
            $scope.text = "Active";
            $scope.text_css = "margin-left: 9%;";
            $scope.assured_seal = "fa  fa-check-circle fa-4x text-success";
            $scope.assured_text = "Hosting Assured Certified";
        }
        
        if(Plan_adding_remain === 0){
            $scope.Progress1 = {
                type: "pie",
                backgroundColor: "#fff",
                title: {
                  textAlign: 'center',
                  fontSize: 14,
                  text: "Plans Completeness"
                },
                tooltip: {
                    text: "%v% %t"
                },
                plot: {
                    refAngle: "-90",
                    valueBox: {
                        placement: "in",
                        fontSize: "12px",
                    }
                },
                series: 
                [
                    {
                        text:"Completed",
                        values: [Plan_adding],
                        backgroundColor: "#5CB85C",
                    }
                ]
            };
        } else if(Plan_adding === 0){
            $scope.Progress1 = {
                type: "pie",
                backgroundColor: "#fff",
                title: {
                  textAlign: 'center',
                  fontSize: 14,
                  text: "Plans Completeness"
                },
                tooltip: {
                    text: "%v% %t"
                },
                plot: {
                    refAngle: "-90",
                    valueBox: {
                        placement: "in",
                        fontSize: "12px",
                    }
                },
                series: 
                [
                    {
                        text:"Padding",
                        values: [Plan_adding_remain],
                        backgroundColor: "#c3c3c3",
                    }
                ]
            };
        }else{
            $scope.Progress1 = {
                type: "pie",
                backgroundColor: "#fff",
                title: {
                  textAlign: 'center',
                  fontSize: 14,
                  text: "Plans Completeness"
                },
                tooltip: {
                    text: "%v% %t"
                },
                plot: {
                    refAngle: "-90",
                    valueBox: {
                        placement: "in",
                        fontSize: "12px",
                    }
                },
                series: 
                [
                    {
                        text:"Completed",
                        values: [Plan_adding],
                        backgroundColor: "#5CB85C",
                    }, 
                    {
                        text:"Padding",
                        values: [Plan_adding_remain],
                        backgroundColor: "#c3c3c3"
                    }
                ]
            };
        }
        
        if(Data_Center_remain === 0){
            $scope.Progress2 = {
                type: "pie",
                title: {
                  textAlign: 'center',
                  fontSize: 14,
                  text: "Data Center Locations"
                },
                tooltip: {
                    text: "%v% %t"
                },
                plot: {
                    refAngle: "-90",
                    valueBox: {
                        placement: "in",
                        fontSize: "12px",
                    }
                },
                series: [{
                    text:"Completed",
                    values: [Data_Center],
                    backgroundColor: "#5CB85C",
                }]
            };
        }else if(Data_Center === 0){
            $scope.Progress2 = {
                type: "pie",
                title: {
                  textAlign: 'center',
                  fontSize: 14,
                  text: "Data Center Locations"
                },
                tooltip: {
                    text: "%v% %t"
                },
                plot: {
                    refAngle: "-90",
                    valueBox: {
                        placement: "in",
                        fontSize: "12px",
                    }
                },
                series: [{
                    text:"Padding",
                    values: [Data_Center_remain],
                    backgroundColor: "#c3c3c3",
                }]
            };
        }else{
            $scope.Progress2 = {
                type: "pie",
                title: {
                  textAlign: 'center',
                  fontSize: 14,
                  text: "Data Center Locations"
                },
                tooltip: {
                    text: "%v% %t"
                },
                plot: {
                    refAngle: "-90",
                    valueBox: {
                        placement: "in",
                        fontSize: "12px",
                    }
                },
                series: [{
                    text:"Completed",
                    values: [Data_Center],
                    backgroundColor: "#5CB85C",
                }, {
                    text:"Padding",
                    values: [Data_Center_remain],
                    backgroundColor: "#c3c3c3"
                }]
            };
        }
        
        if(Support_remain === 0){
            $scope.Progress3 = {
                type: "pie",
                title: {
                  textAlign: 'center',
                  fontSize: 14,
                  text: "Support Sphere"
                },
                tooltip: {
                    text: "%v% %t"
                },
                plot: {
                    refAngle: "-90",
                    valueBox: {
                        placement: "in",
                        fontSize: "12px",
                    }
                },
                series: [{
                    text:"Completed",
                    values: [Support],
                    backgroundColor: "#5CB85C",
                }]
            };
        }else if(Support === 0){
            $scope.Progress3 = {
                type: "pie",
                title: {
                  textAlign: 'center',
                  fontSize: 14,
                  text: "Support Sphere"
                },
                tooltip: {
                    text: "%v% %t"
                },
                plot: {
                    refAngle: "-90",
                    valueBox: {
                        placement: "in",
                        fontSize: "12px",
                    }
                },
                series: [{
                    text:"Padding",
                    values: [Support_remain],
                    backgroundColor: "#c3c3c3",
                }]
            };
        }else{
            $scope.Progress3 = {
                type: "pie",
                title: {
                  textAlign: 'center',
                  fontSize: 14,
                  text: "Support Sphere"
                },
                tooltip: {
                    text: "%v% %t"
                },
                plot: {
                    refAngle: "-90",
                    valueBox: {
                        placement: "in",
                        fontSize: "12px",
                    }
                },
                series: [{
                    text:"Completed",
                    values: [Support],
                    backgroundColor: "#5CB85C",
                }, {
                    text:"Padding",
                    values: [Support_remain],
                    backgroundColor: "#c3c3c3"
                }]
            };
        }
        
        $scope.myJson = {
            "graphset": [{
            "title": {
                "text": "Profile Views & Website Visits Report",
            },
            "type": "bar",
            "legend":{
                "layout":"float",
                "item":{
                    "font-color":"#333"
                },
                "x":"80%",
                "y":"1%",
                "width":"15%",
                "shadow":0
            },
            "plot": {
                "value-box": {
                  "text": "%v"
                },
                "bars-overlap": "50%"
            },
            "plotarea": {
              "margin": "45 40 90 60"
            },
            "scale-x": {
              "values": msg.data.chartXData,
              "line-color": "#000",
            },
            "scale-y": {
              "line-color": "#000",
            },
            "series": [{
              "values": msg.data.chartValue,
              "text": "Views",
              "background-color": "#D81B60",
            }, {
              "values": msg.data.chartClickValue,
              "text": "Visits",
              "background-color": "#1A237E",
            }],
            "tooltip": {
              "text": "%v %t",
              "shadow": false,
              "border-radius": 4
            }
          }]
            
        };
    });
 }]);