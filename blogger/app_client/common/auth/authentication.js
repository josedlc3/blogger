var app = angular.module('bloggerApp');

app.service('authentication', authentication);
authentication.$inject = ['$window', '$http'];

function authentication ($window, $http) {
    
    var saveToken = function (token) {
        $window.localStorage['blog-token'] = token;
    };

    var getToken = function () {
        return $window.localStorage['blog-token'];
    }

    var register = function(user) {
        console.log('Registering user' + user.email + ' ' + user.password);
        return $http.post('/api/register', user).success(function(data){
            saveToken(data.token);
        });  
    };

    var login = function(user) {
        console.log('Attempting to login user' + user.email + ' ' + user.password);
        return $http.post('/api/login', user).success(function(data){
            saveToken(data.token);
        });
    };

    var logout = function() {
        $window.localStorage.removeItem('blog-token');
    }

    var isLoggedIn = function() {
        var token = getToken(); 

        if(token) {
            var payload = JSON.parse($window.atob(token.split('.') [1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    var currentUser = function() {
        if(isLoggedIn()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
                email : payload.email, 
                name : payload.name
            };
        }
    };

    return {
        saveToken : saveToken, 
        getToken : getToken,
        register : register,
        login : login, 
        logout : logout, 
        isLoggedIn : isLoggedIn,
        currentUser : currentUser
    };
}

app.controller('SignInController', ['$http', '$location', 'authentication', function SignInController($http, $location, authentication) {
    var si = this;
    si.pageHeader = {
        title: 'Sign In'
    }

    si.credentials = {
        email : "",
        password : ""
    };

    si.returnPage = $location.search().page || '/';

    si.onSubmit = function() {
        si.formError = "";

        if(si.credentials.email || si.credentials.password) {
            si.formError = "All fields required, please try again.";
            return false;
        } else {
            si.doLogin();
        }
    };

    si.doLogin = function() {
        si.formError = "";
        authentication
        .login(si.credentials)
        .error(function(err){
            var obj = err;
            si.formError = obj.message;
        })
        .then(function(){
            $location.search('page', null);
            $location.path(si.returnPage);
        });
    };
}]);

app.controller('SignUpController', ['$http', '$location', 'authentication', function SignUpController($http, $location, authentication) {
    var su = this;
    su.pageHeader = {
        title: 'Sign Up'
    }

    su.credentials = {
        name : "",
        email : "",
        password : ""
    };

    su.returnPage = $location.search().page || '/';

    su.onSubmit = function() {
        su.formError = "";
        if(!su.credentials.name || !su.credentials.email || !su.credentials.password) {
            su.formError = "All fields are required, please try again.";
            return false;
        } else {
            su.doRegister();
        }
    };

    su.doRegister = function() {
        su.formError = "";
        authentication
        .register(su.credentials)
        .error(function(err){
            su.formError = "Error signing up. Try again with a different email address.";
        })
        .then(function(){
            $location.search('page', null);
            $location.path(su.returnPage);
        });
    };

}]);

