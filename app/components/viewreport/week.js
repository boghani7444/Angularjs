angular.module("app.viewreport", ['ngMaterial', 'ngMessages','zingchart-angularjs'])
        .filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
})
.controller("dailyreportCtrl", ["$scope","$http","$routeParams","$location","flash","$mdDialog",
    function ($scope,$http,$routeParams,$location,flash,$mdDialog) {   
        $scope.$on('$destroy', function() {
            zingchart.exec('myChart1', 'destroy');
            zingchart.exec('myChart2', 'destroy');
            zingchart.exec('myChart3', 'destroy');
            zingchart.exec('myChart4', 'destroy');
        });
        
        $scope.flash = flash; 
        $scope.msgtype=flash.getType();
        $scope.msgtxt=flash.getMessage();
                    
        $scope.canSubmit = function () {
            return true;
        };
        $scope.canRevert = function () {
            return 'true';
        };
        $scope.revert = function () {
            return 'true';
        };
        
        $scope.submitForm = function () { 
            console.log('Clicked');
            $scope.user.start_date = new Date(Date.parse(this.user.start_date)); 
            $scope.user.end_date = new Date(Date.parse(this.user.end_date));
            var data = $scope.user;
            var $promise = $http.post("/UserApi/viewreport", data); // send data to user.php
            $promise.then(function (msg) {
                if (msg.data.status == 'true')
                {
                    $scope.$on('$destroy', function() {
                        zingchart.exec('myChart1', 'destroy');
                        zingchart.exec('myChart2', 'destroy');
                        zingchart.exec('myChart3', 'destroy');
                        zingchart.exec('myChart4', 'destroy');
                    });
                    $scope.myJson1 = {
                        "graphset": [{
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
                            "bars-overlap": "50%",
                            "value-box": {
                              "text": "%v"
                            }
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
                } else{
                    
                }
            });
        };
        $scope.reload = function(){
            $scope.$on('$destroy', function() {
                zingchart.exec('myChart1', 'destroy');
                zingchart.exec('myChart2', 'destroy');
                zingchart.exec('myChart3', 'destroy');
                zingchart.exec('myChart4', 'destroy');
            });
            var original, $promise;
            $scope.user = {
                start_date: '',
                end_date: '',
                'action': 'add'
            };
            $scope.filter = {
                'action': 'daily'
            };
            if($routeParams.page)
            {
                $promise = $http.post("/UserApi/viewreport",$scope.filter); 
            }
            else
            {
                $promise = $http.post("/UserApi/viewreport",$scope.filter); 
            }
            $promise.then(function(msg){      
                $scope.user.start_date = new Date();
                $scope.user.end_date = new Date();
                $scope.myJson1 = {
                    "graphset": [{
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
                            "bars-overlap": "50%",
                            "value-box": {
                              "text": "%v"
                            }
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
        };
        $scope.reload();
    }
])
.controller("viewreportCtrl", ["$scope","$http","$routeParams","$location","flash","$mdDialog",
    function ($scope,$http,$routeParams,$location,flash,$mdDialog) {   
        $scope.$on('$destroy', function() {
            zingchart.exec('myChart1', 'destroy');
            zingchart.exec('myChart2', 'destroy');
            zingchart.exec('myChart3', 'destroy');
            zingchart.exec('myChart4', 'destroy');
        });
        
        $scope.flash = flash;
        $scope.msgtype=flash.getType();
        $scope.msgtxt=flash.getMessage();
                    
        $scope.canSubmit = function () {
            return true;
        };
        $scope.canRevert = function () {
            return 'true';
        };
        $scope.revert = function () {
            return 'true';
        };
        
        $scope.submitForm = function () { 
            console.log('Clicked');
            $scope.user.start_date = new Date(Date.parse(this.user.start_date)); 
            $scope.user.end_date = new Date(Date.parse(this.user.end_date));
            var data = $scope.user;
            var $promise = $http.post("/UserApi/viewreport", data); // send data to user.php
            $promise.then(function (msg) {
                if (msg.data.status == 'true')
                {
                    $scope.$on('$destroy', function() {
                        zingchart.exec('myChart1', 'destroy');
                        zingchart.exec('myChart2', 'destroy');
                        zingchart.exec('myChart3', 'destroy');
                        zingchart.exec('myChart4', 'destroy');
                    });
                    $scope.myJson2 = {
                        "graphset": [{
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
                            "bars-overlap": "50%",
                            "value-box": {
                              "text": "%v"
                            }
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
                } else{
                    
                }
            });
        };
        $scope.reload = function(){
            $scope.$on('$destroy', function() {
                zingchart.exec('myChart1', 'destroy');
                zingchart.exec('myChart2', 'destroy');
                zingchart.exec('myChart3', 'destroy');
                zingchart.exec('myChart4', 'destroy');
            });
            var original, $promise;
            $scope.user = {
                start_date: '',
                end_date: '',
                'action': 'add'
            };
            $scope.filter = {
                'action': 'week'
            }; 
            if($routeParams.page)
            {
                $promise = $http.post("/UserApi/viewreport",$scope.filter); 
            }
            else
            {
                $promise = $http.post("/UserApi/viewreport",$scope.filter); 
            }
            $promise.then(function(msg){      
                $scope.user.start_date = new Date();
                $scope.user.end_date = new Date();
                $scope.myJson2 = {
                    "graphset": [{
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
                            "bars-overlap": "50%",
                            "value-box": {
                              "text": "%v"
                            }
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
        };
        $scope.reload();
    }
])
.filter('badDateToISO', function () {
    return function (badTime) {
        var goodTime;
        if (typeof badTime != 'undefined') {
            goodTime = badTime.replace(/(.+) (.+)/, "$1T$2Z");
        }

        return goodTime;
    };
}).controller("MonthviewreportCtrl", ["$scope","$http","$routeParams","$location","flash","$mdDialog",
    function ($scope,$http,$routeParams,$location,flash,$mdDialog) {   
        $scope.$on('$destroy', function() {
            zingchart.exec('myChart1', 'destroy');
            zingchart.exec('myChart2', 'destroy');
            zingchart.exec('myChart3', 'destroy');
            zingchart.exec('myChart4', 'destroy');
        });
        
        $scope.submitForm = function () { 
            console.log('Clicked');
            var sdate = new Date();
            $scope.user.start_date = new Date(sdate.setMonth(sdate.getMonth() - 1));
            $scope.user.end_date = new Date();

            var data = $scope.user;
            var $promise = $http.post("/UserApi/viewreport", data); // send data to user.php
            $promise.then(function (msg) {
                if (msg.data.status == 'true')
                {
                    $scope.$on('$destroy', function() {
                        zingchart.exec('myChart1', 'destroy');
                        zingchart.exec('myChart2', 'destroy');
                        zingchart.exec('myChart3', 'destroy');
                        zingchart.exec('myChart4', 'destroy');
                    });
                    $scope.myJson3 = {
                        "graphset": [{
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
                            "bars-overlap": "50%",
                            "value-box": {
                              "text": "%v"
                            }
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
                } else{
                    
                }
            });
        };
        $scope.reload = function(){
            var original, $promise;
            $scope.$on('$destroy', function() {
                zingchart.exec('myChart1', 'destroy');
                zingchart.exec('myChart2', 'destroy');
                zingchart.exec('myChart3', 'destroy');
                zingchart.exec('myChart4', 'destroy');
            });
            $scope.user = {
                start_date: '',
                end_date: '',
                'action': 'add'
            };
            $scope.filter = {
                'action': 'month'
            }; 
            if($routeParams.page)
            {
                $promise = $http.post("/UserApi/viewreport",$scope.filter); 
            }
            else
            {
                $promise = $http.post("/UserApi/viewreport",$scope.filter); 
            }
            $promise.then(function(msg){    
                var sdate = new Date();
                $scope.user.start_date = new Date(sdate.setMonth(sdate.getMonth() - 1));
                $scope.user.end_date = new Date();
                
                $scope.myJson3 = {
                    "graphset": [{
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
                            "bars-overlap": "50%",
                            "value-box": {
                              "text": "%v"
                            }
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
        };
        $scope.reload();
    }
]).controller("YearviewreportCtrl", ["$scope","$http","$routeParams","$location","flash","$mdDialog",
    function ($scope,$http,$routeParams,$location,flash,$mdDialog) {   
        $scope.$on('$destroy', function() {
            zingchart.exec('myChart1', 'destroy');
            zingchart.exec('myChart2', 'destroy');
            zingchart.exec('myChart3', 'destroy');
            zingchart.exec('myChart4', 'destroy');
        });
        
        $scope.submitForm = function () { 
            console.log('Clicked');
            var sdate = new Date();
            $scope.user.start_date = new Date(sdate.setMonth(sdate.getMonth() - 1));
            $scope.user.end_date = new Date();

            var data = $scope.user;
            var $promise = $http.post("/UserApi/viewreport", data); // send data to user.php
            $promise.then(function (msg) {
                if (msg.data.status == 'true')
                {
                    $scope.$on('$destroy', function() {
                        zingchart.exec('myChart1', 'destroy');
                        zingchart.exec('myChart2', 'destroy');
                        zingchart.exec('myChart3', 'destroy');
                        zingchart.exec('myChart4', 'destroy');
                    });
                    $scope.myJson4 = {
                        "graphset": [{
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
                            "bars-overlap": "50%",
                            "value-box": {
                              "text": "%v"
                            }
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
                } else{
                    
                }
            });
        };
        $scope.reload = function(){
            var original, $promise;
            $scope.$on('$destroy', function() {
                zingchart.exec('myChart1', 'destroy');
                zingchart.exec('myChart2', 'destroy');
                zingchart.exec('myChart3', 'destroy');
                zingchart.exec('myChart4', 'destroy');
            });
            $scope.user = {
                start_date: '',
                end_date: '',
                'action': 'add'
            };
            $scope.filter = {
                'action': 'year'
            }; 
            if($routeParams.page)
            {
                $promise = $http.post("/UserApi/viewreport",$scope.filter); 
            }
            else
            {
                $promise = $http.post("/UserApi/viewreport",$scope.filter); 
            }
            $promise.then(function(msg){    
                var sdate = new Date();
                $scope.user.start_date = new Date(sdate.setMonth(sdate.getMonth() - 1));
                $scope.user.end_date = new Date();
                
                $scope.myJson4 = {
                    "graphset": [{
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
                            "bars-overlap": "50%",
                            "value-box": {
                              "text": "%v"
                            }
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
        };
        $scope.reload();
    } 
]);