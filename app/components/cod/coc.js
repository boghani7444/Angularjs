angular.module("app.user.coc", [])
        .filter('unsafe', function($sce) {

	    return function(val) {

	        return $sce.trustAsHtml(val);

	    };

	})
.controller("cocCtrl",["$scope","$mdDialog","$http",
            function($scope,$mdDialog,$http){
                var $promise = $http.post("../user/user_coc.php"); // send data to user.php
                $promise.then(function(msg){     
                    
                    $scope.chkSecureImg = false;
                    $scope.baseUrl = msg.data.baseurl;
                    $scope.comUrl = msg.data.UserCleanComUrl;
                    $scope.coc_approve =  (msg.data.userdetail.coc_approve=='Y')?true:false;
                    $scope.arrImg = msg.data.arrImg;
                    $scope.arrComText = msg.data.arrComText;
                    
                    $scope.seal_select = msg.data.cocInfo.seal_image;
                    $scope.coccomurl = msg.data.userdetail.com_name.replace(' ','-').toLowerCase();
					$scope.phone = msg.data.userdetail.phone;
					$scope.address = msg.data.userdetail.address;
                    $scope.imgNm = msg.data.cocInfo.seal_image;
                    $scope.imgSealTxt = msg.data.cocInfo.id_seal_text;
                    
                    //data.site_url
//                    $scope.htmlcode = '<a href="https://hostingassured.thewebhostingdir.com/"><img src="https://hostingassured.thewebhostingdir.com/hostingassured-seal" /></a>';
                    $scope.htmlcode = '<img src="https://hostingassured.thewebhostingdir.com/hostingassured-seal" usemap="#image-map" alt="Hosting Assured" align="middle" border="0"><map name="image-map"><area target="_blank" alt=" Hosting Assured" title=" Hosting Assured" href="https://hostingassured.thewebhostingdir.com/" coords="127,0,1,101" shape="rect"><area target="_blank" alt="TheWebHostingDir" title="TheWebHostingDir" href="https://www.thewebhostingdir.com/" coords="4,103,124,110" shape="rect"></map>';
					
                    //if(msg.data.cocInfo.seal_html_code!=="")
                    //{
                      //  $scope.htmlcode = msg.data.cocInfo.seal_html_code;
                        //$scope.preview = '<a href="'+msg.data.UserCleanComUrl+'"><img src="'+$scope.arrImg[$scope.imgNm]+'" alt="'+$scope.coccomurl+' code of compliance seal" border="0" align="middle" /></a>';
						//<div class="padding_top1">'+$scope.arrComText[$scope.imgSealTxt]+'</div>';
                    //}
                    //else
                    //{
                        //$scope.htmlcode = '&#060;div align="center" style="width:250px; border:1px solid #cde1ff; padding:10px; background:#fff;"&#062;&#060;a href="'+$scope.comUrl+'"&#062;&#060;img src="http://thewebhostingdir.com/user/coc_classic.php" alt="'+$scope.coccomurl+' Hosting Assured Company seal" border="0" align="middle" /&#062;&#060;/a&#062;';
						
						//$scope.htmlcode = '<div align="center" style="width:250px; border:1px solid #cde1ff; padding:10px; background:#fff;"><a href="'+$scope.comUrl+'"><img src="https://thewebhostingdir.com/user/coc_classic.php" border="0" align="middle" alt="test123  Hosting Assured Company Seal"></a></div>';
						
						
						//&#060;div style="padding-top:10px;"&#062;'+msg.data.arrComText[1]+'&#060;/div&#062;&#060;/div&#062;';
                       // $scope.preview = '<a href="'+msg.data.UserCleanComUrl+'"><img src="'+msg.data.arrImg.classic.toString()+'" alt="'+$scope.coccomurl+' Hosting Assured Company Seal" border="0" align="middle" /></a>';
						//<div class="padding_top1">'+msg.data.arrComText[1]+'</div>';
                        
                    //}
					
					
                    //if(msg.data.userdetail.com_url)
                    //{
                        $scope.page_url = msg.data.userdetail.com_url;
                    //}
                    //else
                    //{
                     //   $scope.site_url = '';
                    //}
                    //{if }{$cocInfo.page_url}{else}{$smarty.post.site_url}{/if}
                    
                    //{if $cocInfo.seal_html_code}{$cocInfo.seal_html_code|escape}{else}{/if}
                    
                    
                    var original = msg.data.row;                    
                    $scope.row = angular.copy(original);
                });
                
                //console.log($scope.arrComText);
                $scope.setCocSealImageAndText = function(){
                    
                     var comUrl = $scope.comUrl;                        
                     sealCode = '<a href="'+comUrl+'"><img src="http://thewebhostingdir.com/user/coc_classic.php" border="0" align="middle" alt="'+$scope.coccomurl+'  Hosting Assured Company Seal"></a>';
                     if($scope.chkSecureImg===true)
                     {
                            sealCode = sealCode.replace("<img src=\"http:", "<img src=\"https:");
                     }
                      $scope.preview = sealCode;
                      $scope.htmlcode='<div align="center" style="width:250px; border:1px solid #cde1ff; padding:10px; background:#fff;">'+sealCode+'</div>';
                      
                      //console.log(sealCode);                      
                };
                $scope.verifycoc = function(){
					
					if (!$scope.phone)
					{
						$mdDialog.show($mdDialog.alert().title('Make sure that your business has a valid Support Phone number in profile.').ok("Ok"));
						return false;
					}
					if (!$scope.address)
					{
						$mdDialog.show($mdDialog.alert().title('Make sure that your business has a valid Address on profile.').ok("Ok"));
						return false;
					}
					
		
                    var data = {
                         submit : 'submit',
                         seal_select: $scope.seal_select,
                         seal_text: $scope.imgSealTxt,
                         code_html: $scope.htmlcode,
                         page_url: $scope.page_url
                     };
                    var $promise = $http.post("../user/user_coc.php",data); // send data to user.php
                    $promise.then(function(msg){
                        
                        if(msg.data.status=='Invalid')
                        {
                         
                            $scope.msgtype = "alert alert-danger";
                            $scope.msgtxt = msg.data.error;
                        }
                        else
                        {
                            $scope.msgtype = "alert alert-success";
                            $scope.msgtxt = "Congratulations! You are now a Hosting Assured Certified Company.";
                        }
                        
                        
                    
                    });
                
                };
            }
        ]);