angular.module("app.quotes", ['ngMaterial', 'ngMessages'])
        .filter('quoteservice', function ($sce) {
            return function (val) {
                var str = "";
                if (val.free_domain == 'Y')
                {
                    str += "Free Domain, ";
                }
                if (val.free_search_engine == 'Y')
                {
                    str += "Free Search Engine, ";
                }
                if (val.instant_setup == 'Y')
                {
                    str += "Instant Setup, ";
                }
                if (val.ssl_certificate == 'Y')
                {
                    str += "SSL Certificate, ";
                }
                if (val.ftp_access == 'Y')
                {
                    str += "FTP Access, ";
                }
                if (val.sub_domain == 'Y')
                {
                    str += "Sub-Domain, ";
                }
                if (val.webmail == 'Y')
                {
                    str += "Webmail, ";
                }
                if (val.website_builder == 'Y')
                {
                    str += "Website Builder, ";
                }



                return str.substring(0, str.length - 2);
            };

        })
        .filter('quoteservicecount', function ($sce) {
            return function (val) {
                var str = 0;
                if (val.free_domain == 'Y') {
                    str += 1;
                }
                if (val.free_search_engine == 'Y') {
                    str += 1;
                }
                if (val.instant_setup == 'Y') {
                    str += 1;
                }
                if (val.ssl_certificate == 'Y') {
                    str += 1;
                }
                if (val.ftp_access == 'Y') {
                    str += 1;
                }
                if (val.sub_domain == 'Y') {
                    str += 1;
                }
                if (val.webmail == 'Y') {
                    str += 1;
                }
                if (val.website_builder == 'Y') {
                    str += 1;
                }


                return str;
            };

        })
        .filter('quoteunlimited', function ($sce) {
            return function (val) {
                if (val == -1)
                    return "Unlimited";
                return val.toString() + " GB";
            };

        })
        .filter('quotenounlimited', function ($sce) {
            return function (val) {
                if (val == -1)
                    return "Unlimited";
                return val.toString() + "";
            };

        }).filter('quotecommustatus', function ($sce) {
    return function (val) {
        if (val == '1')
        {
            val = "Closed";
        } else if (val == '2')
        {
            val = "UnResolved";
        } else if (val == '3')
        {
            val = "Host Replied";
        } else if (val == '4')
        {
            val = "User Replied";
        }

        return val;
    };

}).filter('quotestatus', function ($sce) {
    return function (val) {
        if (val == 'Y')
        {
            val = "Open";
        } else if (val == 'C')
        {
            val = "Closed";
        }
        return val;
    };

}).filter('sentby', function ($sce) {
    return function (val) {
        if (val == '0')
        {
            val = "User";
        } else if (val == '1')
        {
            val = "Company";
        } else if (val == '2')
        {
            val = "TheWebHostingDir.com";
        }

        return val;
    };

}).filter('quote_type', function ($sce) {
    return function (val) {
        if (val == '0')
        {
            val = "Shared";
        } else if (val == '1')
        {
            val = "Dedicated";
        } else if (val == '2')
        {
            val = "VPS";
        }
        return val;
    };
}).filter('badDateToISO', function () {
    return function (badTime) {
        var goodTime;
        if (typeof badTime != 'undefined') {
            goodTime = badTime.replace(/(.+) (.+)/, "$1T$2Z");
        }

        return goodTime;
    };
})
        .controller("quoteCtrl", ["$scope", "$http", "$routeParams", "$location", "flash", "$mdDialog", '$route', '$rootScope',
            function ($scope, $http, $routeParams, $location, flash, $mdDialog, $route, $rootScope) {
                /*var original = $location.path;
                $location.path = function (path, reload) {
                    if (reload === false) {
                        var lastRoute = $route.current;
                        var un = $rootScope.$on('$locationChangeSuccess', function () {
                            $route.current = lastRoute;
                            un();
                        });
                    }
                    return original.apply($location, [path]);
                };*/
                $scope.quotefilter = 'All';
                $scope.oldquotefilter = 'All';
                $scope.quotelist = [];
                $scope.quotelistcls = [];
                $scope.readlist = [];
                $scope.previous = {
                    href: '',
                    class: ''
                };
                $scope.next = {
                    href: '',
                    class: ''
                };
                $scope.quotestatus = function (eve, hType, quoteId) {


                    if ($scope.quotelist[eve] === true)
                        markAs = "R";
                    else
                        markAs = "U";

                    readIds = $scope.readlist;
                    //console.log($scope.quotelist);

                    data = {'markAs': markAs, 'hType': hType, 'quoteId': quoteId, 'readIds': readIds};
                    $promise = $http.post("../markQuote.php", data); // send data to user.php
                    $promise.then(function (msg) {
                        $scope.readlist = msg.data;

                    });

                };

                $scope.getrepliedquote = function (tp) {

                };
                $scope.showAdvanced = function (ev, tousermail, quoteid, quotetitle, hosting) {
                    var pdata = '{"getallplans":1}';
                    $promise = $http.post("../user/show_Quotes.php", pdata);
                    $promise.then(function (msg) {

                        if (msg.data.status == 'success')
                        {
                            $scope.sharedplans = msg.data.sharedplans;
                            $scope.windowsplans = msg.data.windowsplans;
                            $scope.wordpressplans = msg.data.wordpressplans;
                            $scope.freeplans = msg.data.freeplans;
                            $scope.cloudsharedplans = msg.data.cloudsharedplans;
                            $scope.dedicatedplans = msg.data.dedicatedplans;
                            $scope.vpsplans = msg.data.vpsplans;
                            $scope.windowsvpsplans = msg.data.windowsvpsplans;
                            $scope.cloudvpsplans = msg.data.cloudvpsplans;
                        }

                        $mdDialog.show({
                            locals: {dataToPass: $scope},
                            controller: function ($scope, $http, $mdDialog, dataToPass) {
                                $scope.hide = function () {
                                    $mdDialog.hide(function () {

                                    });
                                };
                                $scope.cancel = function () {
                                    $mdDialog.cancel(function () {

                                    });
                                };
                                $scope.answer = function (answer) {
                                    $mdDialog.hide(answer);
                                };
                                $scope.row = {
                                    'btnQuote': '',
                                    'hosting': '',
                                    //'quotereply' : '',
                                    'toemail': ''
                                };
                                $scope.row.btnQuote = "";
                                $scope.row.hosting = hosting;
                                $scope.row.reply_from = dataToPass.user_email;
                                $scope.row.toemail = tousermail;
                                $scope.row.quote_id = quoteid;
                                $scope.row.quotetitle = quotetitle;
                                $scope.quoteid = quoteid;
                                $scope.quotetitle = quotetitle;
                                $scope.row.quotation_price = "";
                                $scope.row.suggestedplan = "";
                                $scope.sharedplans = dataToPass.sharedplans;
                                $scope.windowsplans = dataToPass.windowsplans;
                                $scope.wordpressplans = dataToPass.wordpressplans;
                                $scope.freeplans = dataToPass.freeplans;
                                $scope.cloudsharedplans = dataToPass.cloudsharedplans;
                                $scope.dedicatedplans = dataToPass.dedicatedplans;
                                $scope.vpsplans = dataToPass.vpsplans;
                                $scope.windowsvpsplans = dataToPass.windowsvpsplans;
                                $scope.cloudvpsplans = dataToPass.cloudvpsplans;

                                $scope.submitReply = function () {
                                    //alert("test");

                                    if (!$scope.row.suggestedplan)
                                    {
                                        $scope.msgtype = "alert alert-danger";
                                        $scope.msgtxt = "Please select the suggested plan for this quote.";
                                        return false;
                                    }
                                    if (!$scope.row.quotation_price)
                                    {
                                        $scope.msgtype = "alert alert-danger";
                                        $scope.msgtxt = "Please enter the quotation price.";
                                        return false;
                                    }
                                    if (!$scope.row.quotereply)
                                    {
                                        $scope.msgtype = "alert alert-danger";
                                        $scope.msgtxt = "Please enter the message.";
                                        return false;
                                    }
                                    var data = $scope.row;

                                    $promise = $http.post("../user/show_Quotes.php", data); // send data to user.php
                                    $promise.then(function (msg) {
                                        // console.log(msg);
                                        if (msg.data.status == 'success')
                                        {
                                            $scope.msgtype = "alert alert-success";
                                            $scope.msgtxt = msg.data.msg;
                                            $mdDialog.hide(msg.data);
                                        } else
                                        {
                                            $scope.msgtype = "alert alert-danger";
                                            $scope.msgtxt = msg.data.msg;
                                        }

                                    });
                                };

                                //  console.log(usermail);
                                //$scope.toemail = dataToPass.quote.quote_email;
                            },
                            //templateUrl: 'app/components/dialog/dialog1.tmpl.html',
                            templateUrl: 'app/views/quote/dialog.tmpla.html',
                            //scope: $scope,
                            //preserveScope: true,
                            targetEvent: ev
                        })
                                .then(function (answer) {

                                    //$scope.msgtype = "";
                                    //$scope.msgtxt = "";
                                    if (answer.status == 'success')
                                    {
                                        $scope.msgtype = "alert alert-success";
                                        $scope.msgtxt = answer.msg;
                                        //flash.setMessage(msg.data.msg);                        
                                        //flash.setMessageType('alert alert-success');                        
                                        //alert("test");

                                        //   $location.path('/plans/plans');
                                    } else
                                    {

                                        if (answer.status == 'invalid')
                                        {
                                            // flash.setMessage(msg.data.msg);                        
                                            // flash.setMessageType('alert-danger');                        
                                            $scope.msgtype = "alert alert-danger";
                                            $scope.msgtxt = answer.msg;
                                        }
                                    }
                                    //$scope.alert = 'You said the information was "' + answer + '".';
                                }, function () {
                                    //$scope.alert = 'You cancelled the dialog.';
                                });

                    });
                };
                /*$scope.quotefilterchanged = function (type, filt) {
                    if ($scope.oldquotefilter != filt)
                    {
                        $scope.oldquotefilter = filt;
                        $routeParams.page = 1;
                        $scope.currentpage = 1;
                        $scope.reload(type, filt);
                        $location.path('/quote/' + type + 'hostingquote/1',false);
                        
                    }
                };*/
                
                $scope.reload = function (type, filt) {

                    var $promise;
                    if ($routeParams.page)
                    {
                        $promise = $http.post("../user/show_Quotes.php?hosting=" + type + "&filt=" + filt + "&page=" + $routeParams.page); // send data to user.php
                    } else
                    {
                        $promise = $http.post("../user/show_Quotes.php?hosting=" + type + "&filt=" + filt); // send data to user.php
                    }
                    $promise.then(function (msg) {
                        $scope.type = type;
                        // console.log(msg.data);
                        $scope.quotes = msg.data.quotes.quoteslist;
                        $scope.readlist = msg.data.quotes.readlist.join(",");
                        $scope.user_email = msg.data.user_email;
                        for (var j in $scope.quotes)
                        {
                            $scope.quotelist[j] = $scope.quotes[j].read;
                            $scope.quotelistcls[j] = "quote";
                        }


                        var paging = [];
                        for (var i = 0; i < msg.data.quotes.totalpage; i++)
                        {
                            paging.push(i + 1);
                        }
                        $scope.currentpage = msg.data.quotes.page === null ? 1 : msg.data.quotes.page;

                        if ($scope.currentpage == 1 || msg.data.quotes.page === null)
                        {
                            $scope.previous.href = '';
                            $scope.previous.class = "disabled";
                        } else
                        {
                            $scope.previous.href = '#/quote/' + type + 'hostingquote/' + (parseInt($scope.currentpage) - 1);
                            $scope.previous.class = "";
                        }

                        if ($scope.currentpage == msg.data.quotes.totalpage)
                        {
                            $scope.next.href = '';
                            $scope.next.class = "disabled";
                        } else
                        {
                            $scope.next.href = '#/quote/' + type + 'hostingquote/' + (parseInt($scope.currentpage) + 1);
                            $scope.next.class = "";
                        }

                        $scope.pagination = paging;
                        //console.log($scope.pagination);
                    });
                };
                var types = "";
                var sepurl = "";
                var path = $location.path().split("/");
                if (path.indexOf("sharedhostingquote") > 0 || path.indexOf("sharedhostingquotereplied") > 0 )
                {
                    types = "shared";
                    if (path.indexOf("sharedhostingquotereplied") > 0)
                    {
                        $scope.quotefilter = 'replied';
                    }else
                    {
                        $scope.quotefilter = 'All';
                    }
                    
                } else if (path.indexOf("dedicatedhostingquote") > 0 || path.indexOf("dedicatedhostingquotereplied") > 0 )
                {
                    types = "dedicated";
                    if (path.indexOf("dedicatedhostingquotereplied") > 0)
                    {
                        $scope.quotefilter = 'replied';
                    }else
                    {
                        $scope.quotefilter = 'All';
                    }
                } else if (path.indexOf("vpshostingquote") > 0 || path.indexOf("vpshostingquotereplied") > 0 )
                {
                    types = "vps";
                    if (path.indexOf("vpshostingquotereplied") > 0)
                    {
                        $scope.quotefilter = 'replied';
                    }else
                    {
                        $scope.quotefilter = 'All';
                    }
                }
                
                
                
                $scope.reload(types,  $scope.quotefilter);

            }]).controller("quotedetailCtrl", ["$scope", "$http", "$routeParams", "$location", "flash", "$mdDialog",
    function ($scope, $http, $routeParams, $location, flash, $mdDialog) {
        $scope.qtp = $routeParams.qtp;
        $scope.quote = [];
        $scope.reload = function () {
            var data = {'id': $routeParams.id, 'qtp': $routeParams.qtp};
            var $promise = $http.post("../user/quotedetails.php", data);
            return	$promise.then(function (msg) {
                $scope.msgtxt = "";
                $scope.msgtype = "";
                $scope.quote = msg.data;
                if (!$scope.quote.quotecommu)
                {
                    $scope.quote.quotecommu = [];
                    $scope.quote.quotecommu.quotation_price = '';
                } else
                {
                    if ($scope.quote.quotecommu.quotation_price === 0 || $scope.quote.quotecommu.quotation_price === '0' || $scope.quote.quotecommu.quotation_price === '')
                    {
                        $scope.quote.quotecommu.quotation_price = '';
                    }else
                    {
                        $scope.quote.quotecommu.quotation_price = parseInt($scope.quote.quotecommu.quotation_price);
                    }
                }
                if (!$scope.quote.plandata.suggestedplan)
                {
                    $scope.quote.plandata.suggestedplan = [];
                    $scope.quote.plandata.suggestedplan.id = '';
                }
            });
        };
        $scope.back = function () {
            window.history.back();
        };
        $scope.reload();
        $scope.flash = flash;
        $scope.msgtype = flash.getType();
        $scope.msgtxt = flash.getMessage();
        $scope.quote = "";
        $scope.quote.txtreply = "";

        $scope.postreply = function (quotecommuid)
        {
            var msg = $scope.quote.txtreply;
            if (typeof msg !== 'undefined')
            {
                var type = 1;
                var data = {'id': quotecommuid, 'quote_id': $scope.quote.quotedata.id, 'qtp': $scope.qtp, 'msg': msg, 'type': type, 'suggestedplan': $scope.quote.plandata.suggestedplan.id, 'quotation_price': $scope.quote.quotecommu.quotation_price};
                var $promise = $http.post("../user/quotecommureply.php", data);
                return $promise.then(function (msg) {
                    if (msg.data.quotecommuaddreply.result == "success")
                    {
                        $scope.reload();
                        $scope.msgtype = 'alert alert-success';
                        $scope.msgtxt = msg.data.quotecommuaddreply.msg;
                    } else
                    {
                        $scope.msgtype = 'alert alert-danger';
                        $scope.msgtxt = msg.data.quotecommuaddreply.msg;
                    }
                });
            } else
            {
                var confirm = $mdDialog.confirm()
                        .title('Message is required.')
                        .content('Please enter your Message.')
                        .ariaLabel('')
                        .ok('Ok');
                $mdDialog.show(confirm);
            }
        };

    }]);