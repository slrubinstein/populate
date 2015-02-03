'use strict';

angular.module('populateApp')
  .controller('ProfileMyquestionsCtrl', ProfileMyquestionsCtrl);

ProfileMyquestionsCtrl.$inject = ['$stateParams', 'highcharts', 'userQuestionService', 'Auth'];

function ProfileMyquestionsCtrl($stateParams, highcharts, userQuestionService, Auth) {
	var vm = this;

	vm.chartConfig;
	vm.createChart = createChart;
	vm.myQuestions = userQuestionService.myQuestions;
  vm.currentQuestion = $stateParams.question || vm.myQuestions[0];

  activate();

  function activate() {

    vm.user = Auth.getCurrentUser();

    userQuestionService.getQuestions(vm.user._id)
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
