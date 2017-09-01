/**************************
 Initialize the Angular App
 **************************/

var app = angular.module("app", ["ngRoute","ngResource", "ngAnimate", "ngAria", "ngMessages", "ngMaterial",
  //"easypiechart", 
  //"mgo-angular-wizard", 
  //"ngMap",
  "ngCropper",
  "angularTrix",
  //"angular-redactor",
  "app.config", "app.navigation", "app.navigation.sidenav",
  //"ui.tinymce",
  "textAngular",
  //"app.subheader", "app.tabs", "app.tooltips","app.autocomplete", "app.dialog","app.chat","app.form.material",
  //To confirm these ones make sure we need them
  "app.login","app.profile","app.user.coc","app.quotes","app.plans","app.coupon","anyLoader","app.news","app.reviews","app.viewreport",
  "app.user.hac",
  //"tw.directives.cropper",
//  "ngImgCrop",
  //"ui.tree", "app.ui.form.directives","app.ui.tree","app.form.validation",
 // "app.bottomsheet", "app.chips", "app.toast", "app.calendar", "app.fabs",
  //"app.ui.maps",
  //"app.ui.progress", "app.ui.toolbar", "app.ui.switch_colors",
  //"app.ui.form.ctrls",
  "app.user",
  "app.colorswitcher", 
  "zingchart-angularjs",
  'ngAnimate', 'ngSanitize', 
  'ui.bootstrap'
  //"app.site_autocomplete", "app.tables", 
  //"app.map", 
  //"todomvc", "app.chart.ctrls", "app.chart.directives", "countTo", "app.music"
  ])
  .run(["$rootScope", "$location", "$mdColorPalette","loginService","sessionService",
    function ($rootScope, $location, $mdColorPalette,loginService,sessionService) {
      
    //  tinyMCE.baseURL = 'bower_components/tinymce-dist';
    //  tinyMCE.suffix = '.min';
  
      
  
      var routepermission = ['/home','/dashboard',          
            // profile pages 
            '/company/changepassword','/company/editcompanydetail','/company/profile','/company/editprofile','/company/picture',
			'/company/strength',
            // plan pages
            '/plans/addshared','/plans/addwindows','/plans/addfree','/plans/addwordpress','/plans/addwindowsvps','/plans/addcloudshared','/plans/dedicatedplan','/plans/vpsplan','/plans/cloudvpsplan','/plans/cdnplan','/plans/cloudplan','/plans/plans',
            //Coupon
            '/coupon/addcoupon','/coupon/coupon',
            //quotes
			'/quote/sharedhostingquote','/quote/dedicatedhostingquote','/quote/vpshostingquote', 
                        '/quote/sharedhostingquotereplied','/quote/dedicatedhostingquotereplied','/quote/vpshostingquotereplied', 
			'/quote/detail',
			'/joinhac',
			 '/whatishac',
			 '/abouthac',
			 '/hacfaq',
			 '/hacmedproc',
			 '/hactoc',
			 '/hacprivacy',
			 '/haccompres',
			 '/quote/communications',
            // news pages
            '/news/index','/news/add','viewreport/daily','viewreport/week','viewreport/month','viewreport/year',
            
        
        ];
     
     // login permission   
     var loginpermission = ['/login','/forgotpassword'];   
      
      
      $rootScope.tinymceOptions = {
          'width':600,
          'menubar': false,          
          //'toolbar': 'styleselect | link media | bold italic'
            
      };
      
      $rootScope.loaderConfig = {
        "isLoading": true,
        "size": "3em", // optional (default = null)
        "iconClass": "fa-refresh", // optional (default = "fa-spinner")
      };
      $rootScope.$on('$routeChangeStart', function(){
		var path = $location.path().split("/");
          if(path.length>4)
          {
              path = "/"+path[1]+"/"+path[2];
          }
          else
          {
              path = $location.path();
          }
          
          ind = routepermission.indexOf(path);
			
		var  connected  = "";
          if( ind !=-1 )
          {
              
             connected = loginService.islogged();
             
             connected.then(function(result) {
                
                if(result === false)
                {
                          $location.path('/login');
                }
				else if(result === 'localsstorege')
				{
					location.reload();
				}
                else
                {
                    if(result===false)
                    {
                        sessionService.destroy('user');
                           $location.path('/login');
                    }


                  }
             });
               
          }else
          {
               //console.log("step2");
                var log = loginpermission.indexOf(path);
                if(log != -1)
                {
                        //$location.path('/home');
                        connected = loginService.islogged();
                            connected.then(function(msg){
                               // console.log(typeof(msg.data.status));    
                                if(msg===true)
                                {      
//                                    $location.path('/plans/plans');
                                    $location.path('/dashboard');
                                }
								else if(msg==='localsstorege')
								{
//									$location.path('/plans/plans');
									$location.path('/dashboard');
								}
                            });
                }
          }
         
      });
    
      $rootScope.app_name = "TwhDir";
      $rootScope.profileimg = "dist/images/logo.png";
      $rootScope.getMaterialColor = function (base, shade) {
        var color = $mdColorPalette[base][shade].value;
        return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
      };

      $rootScope.RGB2HTML = function (rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
      };

	  
    }]).config(["$routeProvider","$mdDateLocaleProvider",
    function ($routeProvider,$mdDateLocaleProvider) {
        
        $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format("DD/MM/YYYY");
    };

      var routeTasksConfig = {
        controller: 'TodoCtrl',
        templateUrl: "app/components/tasks/tasks.html",
        resolve: {
          store: function (todoStorage) {
            // Get the correct module (API or localStorage).
            return todoStorage.then(function (module) {
              module.get(); // Fetch the todo records in the background.
              return module;
            });
          }
        }
      };

      return $routeProvider.when("/", {
        redirectTo: "/editprofile"
      }).when("/dashboard", {
        templateUrl: "app/views/dashboards/dashboard.html"
      })      // additional
      .when("/login", {
        templateUrl: "app/views/login/signin.html"
      })
      .when("/lostpassword", {
        templateUrl: "app/views/login/forgot.html"
      })
      .when("/plans/plans", {
        templateUrl: "app/views/plans/plans.html"
      })
      .when("/plans/addshared/:id/:type", {
        templateUrl: "app/views/plans/sharedplan.html"
      })
      .when("/plans/addshared", {
        templateUrl: "app/views/plans/sharedplan.html"
      })
      .when("/plans/addwindows/:id/:type", {
        templateUrl: "app/views/plans/windowsplan.html"
      })
      .when("/plans/addwindows", {
        templateUrl: "app/views/plans/windowsplan.html"
      })
      .when("/plans/addfree/:id/:type", {
        templateUrl: "app/views/plans/freeplan.html"
      })
      .when("/plans/addfree", {
        templateUrl: "app/views/plans/freeplan.html"
      })
      .when("/plans/addwordpress/:id/:type", {
        templateUrl: "app/views/plans/wordpressplan.html"
      })
      .when("/plans/addwordpress", {
        templateUrl: "app/views/plans/wordpressplan.html"
      })
      .when("/plans/addwindowsvps/:id/:type", {
        templateUrl: "app/views/plans/windowsvpsplan.html"
      })
      .when("/plans/addwindowsvps", {
        templateUrl: "app/views/plans/windowsvpsplan.html"
      })
      .when("/plans/addcloudshared/:id/:type", {
        templateUrl: "app/views/plans/cloudsharedplan.html"
      })
      .when("/plans/addcloudshared", {
        templateUrl: "app/views/plans/cloudsharedplan.html"
      })
      .when("/plans/dedicatedplan/:id/:type", {
        templateUrl: "app/views/plans/dedicatedplan.html"
      })
      .when("/plans/dedicatedplan", {
        templateUrl: "app/views/plans/dedicatedplan.html"
      })
      .when("/plans/vpsplan/:id/:type", {
        templateUrl: "app/views/plans/vpsplan.html"
      })
      .when("/plans/vpsplan", {
        templateUrl: "app/views/plans/vpsplan.html"
      })
      .when("/plans/cloudvpsplan/:id/:type", {
        templateUrl: "app/views/plans/cloudvpsplan.html"
      })
      .when("/plans/cloudvpsplan", {
        templateUrl: "app/views/plans/cloudvpsplan.html"
      })
      .when("/plans/cdnplan/:id/:type", {
        templateUrl: "app/views/plans/cdnplan.html"
      })
      .when("/plans/cdnplan", {
        templateUrl: "app/views/plans/cdnplan.html"
      })
      .when("/plans/cloudplan/:id/:type", {
        templateUrl: "app/views/plans/cloudplan.html"
      })
      .when("/plans/cloudplan", {
        templateUrl: "app/views/plans/cloudplan.html"
      })
      
      //coupon
      .when("/coupon/addcoupon", {
        templateUrl: "app/views/coupon/addcoupon.html"
      })
      .when("/coupon/addcoupon/:id", {
        templateUrl: "app/views/coupon/addcoupon.html"
      })
      .when("/coupon/coupon", {
        templateUrl: "app/views/coupon/index.html"
      })
      
      //profile
      .when("/logout", {
        templateUrl: "app/views/company/logout.html"
      })
      .when("/contactsupport", {
        templateUrl: "app/views/support/contact.html"
      }) 
      .when("/company/profile", {
        templateUrl: "app/views/company/myprofile.html"
      })          
      .when("/company/editcompanydetail", {
        templateUrl: "app/views/company/editcompanydetail.html"
      })          
	  .when("/company/strength", {
        templateUrl: "app/views/company/strength.html"
      })          
      .when("/company/editprofile", {
        templateUrl: "app/views/company/editprofile.html"
      })          
      .when("/company/picture", {
        templateUrl: "app/views/company/companylogo.html"
      })          
      .when("/company/changepassword", {
        templateUrl: "app/views/company/changepassword.html"
      })          
      
      //coc
	  .when("/haccompres", {
        templateUrl: "app/views/cod/haccompres.html"
      }) 
	  .when("/quote/communications", {
        templateUrl: "app/views/quote/communications.html"
      }) 
	  .when("/joinhac", {
        templateUrl: "app/views/cod/joinhac.html"
      })     
      .when("/whatishac", {
        templateUrl: "app/views/cod/whatishac.html"
      })
	  .when("/abouthac", {
        templateUrl: "app/views/cod/abouthac.html"
      })     
      .when("/hacfaq", {
        templateUrl: "app/views/cod/hacfaq.html"
      })
	  .when("/hacmedproc", {
        templateUrl: "app/views/cod/hacmedproc.html"
      })
	   .when("/hactoc", {
        templateUrl: "app/views/cod/hactoc.html"
      })
	   .when("/hacprivacy", {
        templateUrl: "app/views/cod/hacprivacy.html"
      })
      //quote
      .when("/quote/sharedhostingquote/:page", {
        templateUrl: "app/views/quote/sharedhostingquote.html"
      })     
      .when("/quote/sharedhostingquote", {
        templateUrl: "app/views/quote/sharedhostingquote.html"
      })     
      .when("/quote/dedicatedhostingquote/:page", {
        templateUrl: "app/views/quote/dedicatedhostingquote.html"
      })     
      .when("/quote/dedicatedhostingquote", {
        templateUrl: "app/views/quote/dedicatedhostingquote.html"
      }) 
      .when("/quote/vpshostingquote/:page", {
        templateUrl: "app/views/quote/vpshostingquote.html"
      })     
      .when("/quote/vpshostingquote", {
        templateUrl: "app/views/quote/vpshostingquote.html"
      })
      .when("/quote/sharedhostingquotereplied/:page", {
        templateUrl: "app/views/quote/sharedhostingquotereplied.html"
      })     
      .when("/quote/sharedhostingquotereplied", {
        templateUrl: "app/views/quote/sharedhostingquotereplied.html"
      })     
      .when("/quote/dedicatedhostingquotereplied/:page", {
        templateUrl: "app/views/quote/dedicatedhostingquotereplied.html"
      })     
      .when("/quote/dedicatedhostingquotereplied", {
        templateUrl: "app/views/quote/dedicatedhostingquotereplied.html"
      }) 
      .when("/quote/vpshostingquotereplied/:page", {
        templateUrl: "app/views/quote/vpshostingquotereplied.html"
      })     
      .when("/quote/vpshostingquotereplied", {
        templateUrl: "app/views/quote/vpshostingquotereplied.html"
      }) 
      .when("/quote/detail/:qtp/:id", {
        templateUrl: "app/views/quote/quotedetails.html"
      })
	  
      // Review & Ratings
      .when("/review/index", {
        templateUrl: "app/views/review/index.html"
      }) 
      .when("/review/ratings", {
        templateUrl: "app/views/review/ratings.html"
      }) 
      
      //News
      .when("/news/index", {
        templateUrl: "app/views/news/index.html"
      })
      .when("/news/add/:id", {
        templateUrl: "app/views/news/add.html"
      })
      .when("/news/add", {
        templateUrl: "app/views/news/add.html"
      }) 
      .when("/viewreport/daily", {
        templateUrl: "app/views/viewreport/daily.html"
      }) 
      .when("/viewreport/week", {
        templateUrl: "app/views/viewreport/week.html"
      }) 
      .when("/viewreport/month", {
        templateUrl: "app/views/viewreport/month.html"
      }) 
      .when("/viewreport/year", {
        templateUrl: "app/views/viewreport/year.html"
      })   
        .when("/tasks", routeTasksConfig)
        .when('/tasks/:status', routeTasksConfig)
        .otherwise({
        redirectTo: "/login"
      });
    }
  ]).config(function ($mdThemingProvider, $mdGestureProvider, config) {
    
    
     
        /* plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        toolbar2: "print preview media | forecolor backcolor emoticons",
        image_advtab: true,
        height: "200px",
        width: "650px" */
    
    $mdThemingProvider.alwaysWatchTheme(true);

    $mdGestureProvider.skipClickHijack();

    $mdThemingProvider.theme('default')
      .primaryPalette(config.md_primary.base, {
        'default': config.md_primary.shade
      })
      .accentPalette(config.md_accent.base, {
        'default': config.md_accent.shade
      });
  })
  .directive('backButton', function() {
        return {
            restrict: 'A',
            link: function(scope,element,attrs) {
                element.on( 'click', function () {
                    history.back();
                    scope.$apply();
                });
            }
        };
    })
    .directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    //$("html, body").animate({ scrollTop: 0 }, "slow");
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };
    }]);
    
/*
app.config(function(ngJcropConfigProvider){
    
    ngJcropConfigProvider.setJcropConfig({
        bgColor: 'black',
        bgOpacity: 0.4,
        aspectRatio: 4 / 3,
        maxWidth: 400,
        maxHeight: 300
    });

});
 
app.directive('simpleChange', function simpleChangeDirective() {
        return {
            restrict: 'A',
            link: function(scope, el, attrs) {
              if (!attrs.simpleChange) {
                return;
              }

              el.on('change', function(e) {
                scope.$apply(function() {
                  scope.$eval(attrs.simpleChange, {
                    $event: e
                  });
                });
              });
            }
          };
        }) ; */
app.factory("flash", function($rootScope,$timeout) {
  var queue = [];
  var msgtype = [];
  var currentMessage = "";
  var currentMessageType = "";

  $rootScope.$on("$routeChangeSuccess", function() {
    
    currentMessage = queue.shift() || "";
    currentMessageType = msgtype.shift() || "";
    //$timeout(function () { console.log("test"); $rootScope.loginAlertMessage = true; }, 3000);
    //console.log("route=>"+$rootScope.currentMessage);
  });

  return {
    setMessage: function(message) {
      //console.log(message);
      queue.push(message);
    },
    setMessageType:function(type){
       msgtype.push(type);
    },
    getMessage: function() {           
      return currentMessage;
    },
    getType: function(){
      return currentMessageType;
    }
  };
});  
