var app = angular.module('blogApp', ['ngRoute']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
        .when('/blogadd', {
            templateUrl: 'pages/blogAdd.html'
        })
        .when('/bloglist', {
            templateUrl: 'pages/blogList.html'
        })
        .otherwise({redirectTo: '/'});
}]);

/** API CONTROLLERS **/
function getAllBlogs($http) {
    return $http.get('/api/bloglist');
}

/** PAGE CONTROLLERS **/
app.controller('HomeController', ['$scope', function($scope) {
    var vm = this;
    vm.pageHeader = {
        title: "Jose De La Cruz's Blog Page"
    };
}]);

app.controller('BlogListController', [$scope, function($scope) {
    var vm = this;

    getAllBlogs($http)
        .success(function(data) {
            vm.blogs = data;
            compile.message('Blogs Found!');
        })
        .error(function(e){
            vm.message('Could not get list of blogs!');
        });
}]);