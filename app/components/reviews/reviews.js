angular.module("app.reviews", ['twhAngularRatingStars','ngMaterial', 'ngMessages'])
 .filter('round', function($sce) {
	    return function(val) {                
	        return Math.round(val);
	    };

    }).filter('reviewstatus', function ($sce) {
            return function (val) {
                if (val == 'E')
                {
                    val = "Enabled";
                } else if(val == 'D')
                {
                    val = "Disabled";
                }else if(val == 'P')
				{
					val = "Pending";
				}
                return val;
            };

        })
.controller("reviewsCtrl", ["$scope","$http","$routeParams","$location","flash","$mdDialog",
    function ($scope,$http,$routeParams,$location,flash,$mdDialog) {   
			$scope.did = 0;
            var $promise;
            $promise = $http.post("../user/user_Review.php"); 
            $promise.then(function(msg){      
                
               // console.log(msg.data);
                $scope.reviews = msg.data.userReviews;   
                $scope.enabled_reviews = msg.data.enabled_reviews;   
                $scope.disabled_reviews = msg.data.disabled_reviews;   
                $scope.pending_reviews = msg.data.pending_reviews;
				$scope.companyname = msg.data.companyname;				
				$scope.subttl = "All Reviews";
                
            });
			
			$scope.showreviews = function(stat)
			{
				data = {'status':stat};
				$promise = $http.post("../user/user_Review.php",data); 
				$promise.then(function(msg){      
                if (stat === 'All')
				{
					$scope.subttl = "All Reviews";
				}else if(stat === 'E')
				{
					$scope.subttl = "Enabled Reviews";
					
				}else if(stat === 'D')
				{
					$scope.subttl = "Disabled Reviews";
					
				}else if(stat === 'P')
				{
					$scope.subttl = "Pending Reviews";
					
				}
				$scope.reviews = msg.data.userReviews;   
				
				});
			};
			
			$scope.requestfordisable = function(ev,id){
				$scope.did = id;
				var confirm = $mdDialog.confirm()
				.title('Are you sure you want to disable this review?')
				.ok('Yes')
				.cancel('No')
				.targetEvent(ev);
			  $mdDialog.show(confirm).then(function () {
					data = {'action':'requestfordisable','review_id':$scope.did};
					$promise = $http.post("../user/user_Review.php",data); 
					$promise.then(function(msg){
						if (msg.data.result === true)
						{
							$scope.msgtype = "alert alert-success";
                            $scope.msgtxt = "Your request to disable the review is successfully sent. Your review will be disabled after approval.";
						}
					});
			  }, function () {
			  });
			};
        
        
       
        
    }])
.controller("ratingsCtrl", ["$scope","$http","$routeParams","$location","flash","$mdDialog",
    function ($scope,$http,$routeParams,$location,flash,$mdDialog) {   
       
            var $promise;
            $promise = $http.post("../user/user_Ratings.php"); // send data to user.php            
            $promise.then(function(msg){      
                $enabled_reviews = msg.data.ratings.enabled_reviews;
                if($enabled_reviews <= 10)
                    score_rate = 0.92;
                else if ($enabled_reviews <= 20 && $enabled_reviews >= 10)
                    score_rate = 0.94;                    
                else if ($enabled_reviews <= 30 && $enabled_reviews >= 20)
                    score_rate = 0.96;                    
                else if ($enabled_reviews <= 40 && $enabled_reviews >= 30)
                    score_rate = 0.98;                    
                else
                    score_rate = 1;                    
                
                $scope.ratings = msg.data.ratings;                                        
                $scope.ratings.score_rate = score_rate;
                
                
                $scope.review = msg.data.review;
                console.log(msg.data.review);
//                $scope.reviews = msg.data.userReviews;   
//                $scope.enabled_reviews = msg.data.enabled_reviews;   
//                $scope.disabled_reviews = msg.data.disabled_reviews;   
//                $scope.pending_reviews = msg.data.pending_reviews;   
                
            });
        
        
        
       
        
    }]);