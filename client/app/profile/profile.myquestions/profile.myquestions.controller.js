'use strict';

angular.module('populateApp')
  .controller('ProfileMyquestionsCtrl', ProfileMyquestionsCtrl);

ProfileMyquestionsCtrl.$inject = ['$stateParams', 'highcharts', 'userQuestionService', 'Auth'];

function ProfileMyquestionsCtrl($stateParams, highcharts, userQuestionService, Auth) {
	
  var vm = this;
  var index = $stateParams.index.value || 0;
  console.log($stateParams.index)
  vm.next = next;
  vm.previous = previous;

  activate();

  function activate() {
    userQuestionService.getAllQuestions()
    .then(function() {
    	vm.myQuestionsCurrent = userQuestionService.myQuestionsCurrent;
      vm.myQuestionsOld = userQuestionService.myQuestionsOld;
      vm.currentQuestion = vm.myQuestionsCurrent[index];
      console.log(vm.currentQuestion)
    })
  }

  function next() {
    vm.currentQuestion = vm.myQuestionsCurrent[index++];
  }

  function previous() {
    vm.currentQuestion = vm.myQuestionsCurrent[index--];
  }
}
