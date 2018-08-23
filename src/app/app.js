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
    $scope.send = () =>{
      $http({
        method: 'POST',
        url: 'http://localhost:3000/games',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: $scope.user_number
      }).then((data) =>{
        console.log(data)
      },
      (error) =>{
        console.log(error)
      }
    )
  } 
});

export default TAKE_HOME_TEST;