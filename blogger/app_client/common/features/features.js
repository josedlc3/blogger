var app = angular.module('bloggerApp');

app.directive('features', function() {
    return {
        restrict: 'EA',
        templateUrl: '/common/features/features.html',
        controller: 'FeaturesController',
        controllerAs: 'fs'
    };
});

app.controller('FeaturesController', ['$location', 'authentication', function NavigatioController($location, authentication) {
    var fs = this;

    fs.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }
}]);