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
            templateUrl: 'pages/blogList.html',
            controller: 'BlogListController',
            controllerAs: 'vm'
        })
        .otherwise({redirectTo: '/'});
}]);

/** API CONTROLLERS **/
function getAllBlogs($http) {
    return $http.get('/api/blogs')
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            // Handle error if necessary
            throw error;
        });
}


/** PAGE CONTROLLERS **/
app.controller('HomeController', ['$scope', function($scope) {
    var vm = this;
    vm.pageHeader = {
        title: "Jose De La Cruz's Blog Page"
    };
}]);

app.controller('BlogListController', ['$scope','$http', function($scope, $http) {
    var vm = this;

    getAllBlogs($http)
        .then(function(data) {
            vm.blogs = data;
            console.log('Blogs Found!', data);
        })
        .catch(function(error) {
            console.error('Could not get list of blogs!', error);
        });
}]);