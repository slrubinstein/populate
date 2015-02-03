'use strict';

angular.module('populateApp')
  .controller('ProfileMyquestionsCtrl', ProfileMyquestionsCtrl);

ProfileMyquestionsCtrl.$inject = ['$stateParams', 'highcharts', 'userQuestionService', 'Auth'];

function ProfileMyquestionsCtrl($stateParams, highcharts, userQuestionService, Auth) {
	var vm = this;

	vm.chartConfig;
	vm.createChart = createChart;
	vm.myQuestions = userQuestionService.myQuestions;

activate()
  function activate() {

    vm.user = Auth.getCurrentUser();

    Auth.isLoggedInAsync(function(loggedIn) {
      
      if (loggedIn) {
        vm.loggedIn = true;
        vm.profilePic = 'https://graph.facebook.com/' +
                         vm.user.facebook.id + '/picture';
      }
    });

    userQuestionService.getQuestions(vm.user._id, vm)
      .then(function(result) {
        vm.myQuestions = result.myQuestions;
        // vm.myQuestionsActive = result.myQuestionsActive;
        // vm.myQuestionsInactive = result.myQuestionsInactive;
        // vm.friendQuestionArchive = result.friendQuestionArchive;
      });
  }


	function createChart(index) {
    vm.chartConfig = highcharts.createChartOptions(vm.myQuestions[index]);
  }
}
