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
        .when('/blogedit/:id', {
            templateUrl: 'pages/blogEdit.html',
            controller: 'BlogEditController',
            contollerAs: 'vm'
        })
        .when('/blogdeletion/:id', {
            templateUrl: 'pages/blogDeletion.html',
            controller: 'BlogDeletionController',
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
            throw error;
        });
}

function getABlog($http, id) {
    return $http.get('/api/blogs/' + id)
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
} 

function updateBlog($http, id, data) {
    return $http.put('/api/blogs/' + id)
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
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
            console.log('Blogs Found!');
        })
        .catch(function(error) {
            console.error('Could not get list of blogs!');
        });
}]);

app.controller('BlogEditController', ['$scope', '$http', '$routeParams', '$state', function($scope, $http, $routeParams, $state) {

    var vm = this;
    vm.blog = {};
    vm.id = $routeParams.id;
    vm.pageHeader = {
        title: 'Blog Edit'
    };

    getABlog($http, vm.id)
        .then(function(data) {
            vm.blog = data;
            console.log('Blog Found!');
        })
        .catch(function(error) {
            console.error('Could not find blog!');
        });
    
    vm.submit = function() {
        var data = vm.blog;
        data.blogTitle = userForm.blogTitle.value;
        data.blogEntry = userForm.blogEntry.value;

        updateBlog($http, vm.id, data)
            .then(function(data) {
                vm.message = "Blog data updated!";
                $state.go('bloglist');
            })
            .error(function(e) {
                vm.message('Could not update blog');
            });
    }
}]);