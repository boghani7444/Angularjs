
app.factory('sessionService', ['$http', function ($http) {

        return  {
            set: function (key, value) {
                return sessionStorage.setItem(key, value);
            },
            get: function (key) {
                return sessionStorage.getItem(key);
            },
            destroy: function (key) {
                return sessionStorage.removeItem(key);

            }
        };

    }]);

app.factory('loginService', function ($http, $location, sessionService) {

    var authToken = {
        login: function (data, scope) {
            var $promise = $http.post("../user/user_Login.php", data); // send data to user.php
            $promise.then(function (msg) {
                //var uid = msg.data;
                if (msg.data.status != 'invalid') {
                    localStorage.setItem('username', msg.data.row.email);
                    localStorage.setItem('passwd', msg.data.password);
                    scope.msgtype = "spansuccess";
                    scope.msgtxt = "Login Successfully.";
                    sessionService.set('user', msg.data.row.id);
//                    $location.path('/plans/plans');
                    $location.path('/dashboard');
                } else
                { 
                    window.location = "/user/login";
                    scope.msgtype = "spanerror";
                    scope.msgtxt = msg.data.msg;
                    $location.path('/login');
                }
            });


        },
        logout: function () {
            var $promise = $http.post("../user/user_Logout.php"); // send data to user.php
            $promise.then(function (msg) {
                localStorage.removeItem('username');
                localStorage.removeItem('passwd');
                sessionService.destroy('user');
                $location.path('/login');
            });
        },
        forgot: function (data, scope) {
            //alert("test");
            var $promise = $http.post("../user/user_lostPassword.php", data); // send data to user.php
            $promise.then(function (msg) {

                if (msg.data.status != 'invalid') {
                    scope.msgtype = "alert alert-success";
                    scope.msgtxt = msg.data.msg;
                } else
                {
                    scope.msgtype = "alert alert-danger";
                    scope.msgtxt = msg.data.msg;
                }
                //$location.path('/login');
            });

        },
        autologin: function (data) {
            var $promise = $http.post("../user/user_Login.php", data); // send data to user.php
            $promise.then(function (msg) {
                //var uid = msg.data;
                //console.log(msg);
                if (msg.data.status != 'invalid') {
                    sessionService.set('user', msg.data.row.id);
                    location.reload();
                } else
                {
                    window.location = "/user/login";
                    $location.path('/login');
                }
            });


        },
        islogged: function () {
            var $promise;
            //console.log(sessionService.get('user')
            $promise = $http.post("../user/checklogin.php"); // send data to user.php
            return $promise.then(function (msg) {
                if (msg.data.status == "true")
                {
                    sessionService.set('user', msg.data.user);
                    return true;
                }else if (typeof (localStorage.getItem("username")) != 'object' && localStorage.getItem("username") != 'undefined') {
                    var data = {username: localStorage.getItem('username'), passwd: localStorage.getItem('passwd'), action: 'UserAutoLogin'};
                    authToken.autologin(data);
                    //var locrerurn = 'localsstorege';
                    //return locrerurn;

                } else if(msg.data.status == "false"){
                    window.location = "/user/login";
                }else{
                    return false;
                }
            }, function (msg) {
                return false;
            });
            /*
             $promise.then(function(msg){  
             console.log(msg);                
             });
             
             if(sessionService.get('user') && sessionService.get('user')!= "undefined") return true;
             */
        }
    };
    return authToken;


});