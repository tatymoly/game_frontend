import angular from 'angular';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

const TAKE_HOME_TEST  = 'app';

angular.module(TAKE_HOME_TEST, [])
  .directive('app', app)
  .controller('AppCtrl', ($scope, $http) =>{
    $http({
      method: 'GET',
      url: 'http://localhost:3000/games'
    }).then((data) => {
      if(data.status === 200){
        $scope.score = data;
      }
    },
    (error) =>{
      console.log('there was an error')
    });
    $scope.send = (form) =>{
      $scope.error = false;
      if( $scope.user_number > 100 || $scope.user_number < 1 || $scope.user_number === null){
        $scope.error = true;
        return;
      }
      $scope.user_number = form;
      console.log($scope.user_number)
      $http({
        method: 'POST',
        url: 'http://localhost:3000/games?user_number=' + $scope.user_number,
        data:'',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((data) =>{
        if(data.status === 200){
          $scope.computer = data;
          console.log(data)
          $http({
            method: 'GET',
            url: 'http://localhost:3000/games'
          }).then((data) => {
            if(data.status === 200){
              $scope.score = data;
              console.log(data)
            }
          },
          (error) =>{
            console.log('there was an error')
          });
        }
      },
      (error) =>{
        console.log(error)
      }
    )
  } 
});

export default TAKE_HOME_TEST;