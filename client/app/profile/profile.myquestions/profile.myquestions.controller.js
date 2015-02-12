'use strict';

angular.module('populateApp')
  .controller('ProfileMyquestionsCtrl', ProfileMyquestionsCtrl);

ProfileMyquestionsCtrl.$inject = ['$stateParams', 'highcharts', 'userQuestionService', 'Auth'];

function ProfileMyquestionsCtrl($stateParams, highcharts, userQuestionService, Auth) {
	
  var vm = this;
  
  vm.index = $stateParams.index.value || 0;
  vm.next = next;
  vm.previous = previous;

  activate();

  function activate() {
    userQuestionService.getAllQuestions()
    .then(function() {
    	vm.myQuestionsCurrent = userQuestionService.myQuestionsCurrent;
      vm.myQuestionsOld = userQuestionService.myQuestionsOld;
      vm.currentQuestion = vm.myQuestionsCurrent[vm.index];
      console.log(vm.currentQuestion)
      console.log(vm.myQuestionsCurrent)
    })
  }

  function next() {
    vm.index++;
    vm.currentQuestion = vm.myQuestionsCurrent[vm.index];
  }

  function previous() {
    vm.index--;
    vm.currentQuestion = vm.myQuestionsCurrent[vm.index];
  }
}
