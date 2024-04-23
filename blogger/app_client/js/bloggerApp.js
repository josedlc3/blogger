var app = angular.module('bloggerApp', ['ngRoute']);


app.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
        .when('/blogadd', {
            templateUrl: 'pages/blogAdd.html',
            controller: 'AddBlogController',
            controllerAs: 'ab'
        })
        .when('/bloglist', {
            templateUrl: 'pages/blogList.html',
            controller: 'BlogListController',
            controllerAs: 'bl'
        })
        .when('/blogedit/:id', {
            templateUrl: 'pages/blogEdit.html',
            controller: 'BlogEditController',
            controllerAs: 'eb'
        })
        .when('/blogdeletion/:id', {
            templateUrl: 'pages/blogDeletion.html',
            controller: 'BlogDeletionController',
            controllerAs: 'bd'
        })
        .when('/signup', {
            templateUrl: 'pages/signup.html',
            controller: 'SignUpController',
            controllerAs: 'su'
        })
        .when('/signin', {
            templateUrl: 'pages/signin.html',
            controller: 'SignInController',
            controllerAs: 'si'
        })
        .when('/games', {
            templateUrl: 'pages/games.html',
            controller: 'GamesController',
            controllerAs: 'pg'
        })
        .otherwise({redirectTo: '/'});
});

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

function updateBlog($http, authentication, id, data) {
    return $http.put('/api/blogs/' + id, data, {headers : { Authorization: 'Bearer ' + authentication.getToken()}})
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
}

function postBlog($http, authentication, data) {
    return $http.post('/api/blogs', data, {headers : { Authorization: 'Bearer ' + authentication.getToken()}})
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
}

function deleteBlog($http, authentication, id) {
    return $http.delete('/api/blogs/' + id, {headers : { Authorization: 'Bearer ' + authentication.getToken()}})
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
}

function createGame($http, gameStarter) {
    return $http.post('/api/games', { gameStarter: gameStarter })
    .then(function(response){
        return response.data;
    })
    .catch(function(error){
        throw error;
    });
}

function getGame($http) {
    return $http.get('/api/games')
    .then(function(response){
        return response.data;
    })
    .catch(function(error){
        throw error;
    });
}

function makeMove($http, row, col) {
    return $http.put('/api/games', {row: row, col: col})
    .then(function(response){
        return response.data;
    })
    .catch(function(error){
        throw error;
    });
}

function deleteGame($http) {
    return $http.delete('/api/games')
    .then(function(response) {
        return response.data;
    })
    .catch(function(error) {
        throw error;
    });
}

function deleteGames($http) {
    return $http.delete('/api/games')
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
        title: "Blogger"
    };
}]);

app.controller('AddBlogController', ['$scope', '$http', '$location', 'authentication', function($scope, $http, $location, authentication) {
    var ab = this;

    ab.pageHeader = {
        title: 'Blog Add'
    };

    ab.blogTitle = '';
    ab.blogEntry = '';
    ab.blogAuthor = authentication.currentUser().name;
    ab.authorEmail = authentication.currentUser().email;

    ab.submit = function() {
        var data = {
            blogTitle: ab.blogTitle,
            blogEntry: ab.blogEntry,
            blogAuthor: ab.blogAuthor,
            authorEmail: ab.authorEmail
        };

        postBlog($http, authentication, data)
            .then(function(data) {
                ab.blog = data;
                console.log('Blog Posted!');
                $location.path('bloglist');
            })
            .catch(function(error) {
                console.error('Could not post blog');
            });
    };
}]);


app.controller('BlogListController', ['$scope','$http', 'authentication', function($scope, $http, authentication) {
    var bl = this;

    bl.pageHeader = {
        title: 'Blog List'
    };

    bl.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }

    getAllBlogs($http)
        .then(function(data) {
            bl.blogs = data;
            bl.isAuthor = function(authorEmail) {
                return authentication.currentUser().email === authorEmail
            };
            console.log('Blogs Found!');
        })
        .catch(function(error) {
            console.error('Could not get list of blogs!');
        });
}]);

app.controller('BlogEditController', ['$scope', '$http', '$routeParams', '$location', 'authentication', function($scope, $http, $routeParams, $location, authentication) {
    var eb = this;
    eb.blog = {};
    eb.id = $routeParams.id;

    eb.pageHeader = {
        title: 'Edit Blog'
    };

    getABlog($http, eb.id)
        .then(function(data) {
            eb.blog = data;
            console.log('Blog Found!');
        })
        .catch(function(error){
            throw error;
        });

        eb.submit = function() {
            var data = eb.blog;
            data.blogTitle = userForm.blogTitle.value;
            data.blogEntry = userForm.blogEntry.value;

            updateBlog($http, authentication, eb.id, data)
                .then(function(data){
                    eb.blog = data;
                    console.log('Blog was successfully updated!');
                    $location.path('bloglist');
                })
                .catch(function(error) {
                    throw error;
                });
        }


}]);

app.controller('BlogDeletionController', ['$scope', '$http', '$routeParams', '$location', 'authentication', function($scope, $http, $routeParams, $location, authentication) {
    var bd = this;
    bd.id = $routeParams.id;

    bd.pageHeader = {
        title: 'Blog Deletion'
    };

    getABlog($http, bd.id)
        .then(function(data) {
            bd.blog = data;
            console.log('Blog Found!');
        })
        .catch(function(error){
            throw error;
        });

    bd.submit = function() {

        deleteBlog($http, authentication, bd.id)
            .then(function(data) {
                console.log('Blog was successfully deleted!');
                $location.path('bloglist');
            })
            .catch(function(error){
                throw error;
            });
    }
}]);

app.controller('GamesController', ['$scope', '$http', '$interval','authentication',  function($scope, $http, $interval, authentication) {
    var pg = this;
    pg.pageHeader = {
        title: "Games"
    };

    pg.grid = null;
    pg.currentPlayer = null;
    pg.winner = null;
    pg.activeGame = false;
    pg.playerLeft = false;

    pg.gameStarter = authentication.currentUser().email;

    function getGameState() {
        $http.get('/api/games')
            .then(function (response) {
                pg.grid = response.data.grid;
                pg.currentPlayer = response.data.currentPlayer;
                pg.winner = response.data.winner;
                pg.activeGame = response.data.activeGame;
                pg.playerLeft = response.data.playerLeft;
                pg.gameStarter = response.data.gameStarter;
                console.log(pg.gameStarter);
            })
            .catch(function (error) {
                pg.playerLeft = true;
                console.error('Error fetching game state:', error);
            });
    }

    pg.createGame = function() {
        createGame($http, { gameStarter: pg.gameStarter}) 
            .then(function (response) {
                pg.grid = response.grid;
                pg.currentPlayer = 'X';
                pg.winner = response.winner;
                pg.activeGame = true;
            })
            .catch(function (error) {

            });
    };


    pg.makeMove = function(row, col) {
    if ((pg.currentPlayer === 'X' && pg.gameStarter.gameStarter !== authentication.currentUser().email) || 
        (pg.currentPlayer === 'O' && pg.gameStarter.gameStarter === authentication.currentUser().email)) {
        return;
    }
        makeMove($http, row, col)
        .then(function (response) {
            var index = row * 3 + col;
            pg.grid[index] = response;
        })
        .catch(function (error) {

        });
    };

    
    pg.delete = function() {
        deleteGame($http)
            .then(function(response) {
                
            })
            .catch(function(error) {
                console.error('Error deleting game:', error);
            });
    };

    var intervalPromise = $interval(getGameState, 200);
    
    $scope.$on('$destroy', function(){
        if (angular.isDefined(intervalPromise)) {
            $interval.cancel(intervalPromise);
            intervalPromise = undefined;
        }
        if (pg.activeGame) {
            deleteGame($http)
                .then(function(response) {

                })
                .catch(function(error) {
                    console.error('Error deleting game:', error);
                });
        }
    });

}]);
