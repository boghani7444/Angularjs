angular.module("app.news", ['ngMaterial', 'ngMessages'])
        .filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  })
.controller("newsCtrl", ["$scope","$http","$routeParams","$location","flash","$mdDialog",
    function ($scope,$http,$routeParams,$location,flash,$mdDialog) {   
         
        $scope.flash = flash;
        $scope.msgtype=flash.getType();
        $scope.msgtxt=flash.getMessage();
        
        //console.log(flash.getMessage());
        
        $scope.editplan = function(id)
        {  
            $location.path('/news/add/'+id);
        }; 
        $scope.deleteplan = function (ev,id,type) {
                    $scope.msgtype = "";
                    $scope.msgtxt = "";
                var confirm = $mdDialog.confirm()
                  .title('Are you sure you want to delete the news?')
                  //.content('Are you sure you want to delete?')
                  .ariaLabel('Delete dialog')
                  .ok('Yes')
                  .cancel('No')
                  .targetEvent(ev);
                $mdDialog.show(confirm).then(function () {
                    var $del;
                    $del = $http.post("../user/user_AddEditNews.php?newsId="+id+"&action=delete"); // send data to user.php
                        
                    
                    
                    $del.then(function(msg){                
                        if(msg.data.status=='success')
                        {
                            $scope.msgtype = 'alert alert-success';
                            $scope.msgtxt = msg.data.msg;
                            $scope.reload();
                        }
                    });
                }, function () {
                  
                });
        };
         $scope.reload = function(){
             var $promise;
             if($routeParams.page)
             {
                $promise = $http.post("../user/user_News.php?page="+$routeParams.page); // send data to user.php
            }
            else
            {
                $promise = $http.post("../user/user_News.php"); // send data to user.php
            }
            $promise.then(function(msg){      
                $scope.newslist = msg.data.newslist;                   
            });
        };
        $scope.reload();
        
    }])
.filter('badDateToISO', function () {
    return function (badTime) {
        var goodTime;
        if (typeof badTime != 'undefined') {
            goodTime = badTime.replace(/(.+) (.+)/, "$1T$2Z");
        }

        return goodTime;
    };
})
.controller("newaddCtrl", ["$scope","$http","$routeParams","$location","flash",'Cropper',"$timeout","$mdDialog",
    function ($scope,$http,$routeParams,$location,flash,Cropper,$timeout,$mdDialog) {   
         
        $scope.flash = flash;
        $scope.msgtype=flash.getType();
        $scope.msgtxt=flash.getMessage();
        
        $scope.myImage = '';
        $scope.myCroppedImage = '';

        $scope.dataUrl = '';
        $scope.odataUrl = '';
        $scope.obj = {};

        // Must be [x, y, x2, y2, w, h]
        $scope.obj.coords = null; //[100, 100, 200, 200, 100, 100];

        // You can add a thumbnail if you want
        $scope.obj.thumbnail = false;

        ///======================
        var file, data;
        
        $scope.onFile = function(blob) {
            Cropper.encode((file = blob)).then(function(dataUrl) {
              $scope.dataUrl = dataUrl;
                  $scope.odataUrl = dataUrl;
              $timeout(showCropper);  // wait for $digest to set image's src
            });
        };
        
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
        
        $scope.showEvent = 'show';
        $scope.hideEvent = 'hide';

        function showCropper() { $scope.$broadcast($scope.showEvent); }
        function hideCropper() { $scope.$broadcast($scope.hideEvent); }
        
        if(typeof($routeParams.id)=='undefined')
       {
            $promise = $http.post("../user/user_AddEditNews.php"); // send data to user.php
            action='add';
            id = '';
       }
       else
       {
           $promise = $http.post("../user/user_AddEditNews.php?newsId="+$routeParams.id+"&action=edit"); // send data to user.php
           action='edit';
           id = $routeParams.id;
       }
       
       $scope.user = {
           news_id:'',
           txttitle:'',
           txtdescription:'',
           image:'',
           actionfrm:action,
           newspost:'submit'
                   
       };
        
        $promise.then(function(msg){  
                angular.extend($scope.user,msg.data.newsDetails);
               
                //console.log($scope.user);
        });
        $scope.fileChanged = function (event) {
            $scope.file = event.target.files[0];
        };
        $scope.submitForm = function(dataURL,odataURL){    
            
            var fd = new FormData();
            var imgBlob = dataURItoBlob(dataURL);
            var oimgBlob = dataURItoBlob(odataURL);
            fd.append('ologo', oimgBlob);
            fd.append('clogo', imgBlob);
            
            fd.append("news_id", $scope.user.news_id); 
            fd.append('txttitle', $scope.user.txttitle);
            fd.append('txtdescription', $scope.user.txtdescription);
            fd.append('actionfrm', $scope.user.actionfrm);
            fd.append('newspost', $scope.user.newspost);
            fd.append('id', $scope.user.id);
            fd.append('title', $scope.user.title); 
            fd.append('url', $scope.user.url);
            fd.append('description', $scope.user.description);
            fd.append('newsurl', $scope.user.newsurl);
            
//            $promise = $http.post(
//                    "../user/user_AddEditNews.php",
//                    fd, {
//                        transformRequest: angular.identity,
//                        headers: {
//                            'Content-Type': undefined
//                        }
//                    } 
//            );
            $promise = $http.post("../user/user_AddEditNews.php",fd); // send data to user.php
            $promise.then(function(msg){
                    if(msg.data.status=='success')
                    {                  
                        flash.setMessage(msg.data.msg);                        
                        flash.setMessageType('alert alert-success');                        
                        $location.path('/news/index');
                    }
                    else
                    {
                        $scope.msgtype = "alert alert-danger";
                         var str = "";
                        for(var item in msg.data.msg)
                        {
                            str += msg.data.msg[item]+"<br>";
                        }
                        $scope.msgtxt = str;
                        
                    }
                    
            });
            //console.log($scope.user);
            //$scope.user.catelist[item] = true;
        };
        
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