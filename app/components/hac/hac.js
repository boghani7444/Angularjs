/*
 App Hosting Assured Company
 Controller for dynamic and other tables
 */
angular.module("app.user.hac", ['ngMaterial', 'ngMessages'])
    .filter('hacstatus', function($sce) {
	    return function(val) {
                if (val=='1')
                {
                    val = "Resolved";
                }
                else if (val=='2')
                {
                    val = "UnResolved";
                }else if (val=='3')
				{
					val = "Host Replied";
				}
				else if (val=='4')
				{
					val = "User Replied";
				}
				else if (val=='5')
				{
					val = "Hosting Assured Program";
				}
				else if (val=='6')
				{
					val = "Cancel";
				}

	        return val;
	    };

    }).filter('sentby', function($sce) {
	    return function(val) {
                if (val=='0')
                {
                    val = "User";
                }
                else if (val=='1')
                {
                    val = "Company";
                }else if (val=='2')
				{
					val = "TheWebHostingDir.com";
				}

	        return val;
	    };

    }).filter('badDateToISO', function() {
  return function(badTime) {
    var goodTime = badTime.replace(/(.+) (.+)/, "$1T$2Z");
    return goodTime;
  };
})
  .controller("hacCtrl", ["$scope","$http","$location","flash","$mdDialog",
    function ($scope,$http,$location,flash,$mdDialog) { 
        $scope.flash = flash;
		$scope.msgtype=flash.getType();
        $scope.msgtxt=flash.getMessage();
		$scope.compdata = [];
		$scope.onlyrefresh = 0;
		$scope.expandcomplaint = function(compid,$index)
		{
			var result = "";
			if (($scope.activePosition != $index) || ($scope.onlyrefresh === 1))
			{
				var data = {'id':compid};
				var $promise = $http.post("../user/complaintdetails.php",data); 
				return	$promise.then(function(msg){
					$scope.compdata[$index] = [];
					$scope.msgtxt= "";
					$scope.msgtype = "";
					$scope.complaints[$index].host_read = 1;
					$scope.compdata[$index].description = msg.data.complaintdetails.description;
					$scope.compdata[$index].ipaddress = msg.data.complaintdetails.ip_address;
					$scope.compdata[$index].email = msg.data.complaintdetails.email;
					$scope.compdata[$index].replies = msg.data.haccomunication;
					if ($scope.onlyrefresh === 0)
					{
						$scope.activePosition = $scope.activePosition == $index ? -1 : $index;
					}else
					{
						$scope.onlyrefresh = 0;
					}						
				});
			}else
			{
				$scope.compdata[$index] = [];
				$scope.activePosition = $scope.activePosition == $index ? -1 : $index;
			}
		};
		$scope.postreply = function(compid,$index)
		{
			var msg = $scope.compdata[$index].reply;
			if (typeof msg !== 'undefined')
			{
			var type = 1;
			var data = {'id':compid,'msg':msg,'type':type};
				var $promise = $http.post("../user/complaintreply.php",data); 
				return $promise.then(function(msg){
                    if (msg.data.hacaddreply.result == "Success")
					{
						$scope.onlyrefresh = 1;
						$scope.expandcomplaint(compid,$index);
						$scope.msgtype = 'alert alert-success';
                        $scope.msgtxt = msg.data.hacaddreply.msg;
					}else
					{
						$scope.msgtype = 'alert alert-danger';
                        $scope.msgtxt = msg.data.hacaddreply.msg;
					}
					$scope.activePosition = $index;
					
				});
			}
			else
			{
				var confirm = $mdDialog.confirm()
                  .title('Message is required.')
                  .content('Please enter your Message.')
                  .ariaLabel('')
                  .ok('Ok');
				$mdDialog.show(confirm);
			}
		};
        $scope.reload = function(){
            var $promise = $http.post("../user/complaints.php"); 
            $promise.then(function(msg){ 
                $scope.complaints = msg.data.complaints;                
            });
        };
        $scope.reload();
    }]).controller("addcomplaintCtrl", ["$scope","$http","$routeParams","$location","flash",
    function ($scope,$http,$routeParams,$location,flash) {
      var original,$promise,action,id;
       
       if(typeof($routeParams.id)=='undefined')
       {
            $promise = $http.post("../user/user_AddEditComplaints.php"); // send data to user.php
            action='add';
            id = '';
       }
       else
       {
           $promise = $http.post("../user/user_AddEditComplaints.php?id="+$routeParams.id+"&action=select"); 
           action='edit';
           id = $routeParams.id;
       }

       $scope.user = {
           id:'',
           sname:'',
           os:'',
           hdd_space:'',
           data_transfer:'',
           free_domain:'',
           free_search_engine:'',
           monthly_price:'',
           quaterly_price:'',
           half_yearly_price:'',
           yearly_price:'',
           instant_setup:'',
           ssl_certificate:'',
           ftp_access:'',
           sub_domain:'',
           email_accounts:'',
           num_domains:'',
           webmail:'',
           money_back:'',
           sextras:'',
           plan_url:'',
           website_builder:'',
           'action':action,
           'scname':''
                   
       };
        $promise.then(function(msg){  
                
              //  console.clear();
                //console.log(msg.data.share.catlist);
                //$scope.stores = msg.data.plans;     
                angular.extend($scope.user,msg.data.share.user);
               //$scope.user = msg.data.share.user;
               $scope.features = msg.data.share.catlist;
               
                //console.log($scope.user);
        });
        
        $scope.submitForm = function(){    
            
            var data = $scope.user;
            $promise = $http.post("../user/user_AddEditComplaints.php",data); // send data to user.php
            $promise.then(function(msg){
                    if(msg.data.status=='success')
                    {                  
                        flash.setMessage(msg.data.msg);                        
                        flash.setMessageType('alert alert-success');                        
                        $location.path('/plans/plans');
                    }
                    else
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
          //return false;  
        return !$scope.form_constraints.$valid;
      };
    }
  ]);
      