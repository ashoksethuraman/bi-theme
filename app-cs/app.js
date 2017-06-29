var app = angular.module('business', ['ui.router', 'ngStorage', 'ui.bootstrap','rzModule','ngDialog','ngFileUpload', 'mgcrea.ngStrap']);




app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    
// $locationProvider.html5Mode(true);
   // $locationProvider.hthttp://127.0.0.1:5678ml5Mode(true);
    $stateProvider
     .state('common', {
            templateUrl: 'app-cs/views/common/common.html',
            abstract: true,
            controller: 'commonController'
        })
        .state('home',{
        	templateUrl: 'app-cs/views/dashbord.html',
          controller: 'dashboardctl',
        	parent:"common",
          url:"/home" 
        
        });


        
      $urlRouterProvider.otherwise('/home');

      

        
}]);



app.directive('leftMenu', function() {
  return {
      restrict: 'AE',
      templateUrl:'app-cs/views/common/left_menu.html',
      replace: 'true',
       scope: { 
            menu: '=menu',    
            htest: '&htest'           
        },
            
  };
});

app.directive('topNavigation', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'app-cs/views/common/top_navigation.html',
      scope: {
        logout: '&logout',
        menu :'=menu'

      },
  };
});


















