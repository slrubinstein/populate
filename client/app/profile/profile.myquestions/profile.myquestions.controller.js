'use strict';

angular.module('populateApp')
  .controller('ProfileMyquestionsCtrl', ProfileMyquestionsCtrl);

ProfileMyquestionsCtrl.$inject = ['$stateParams', 'highcharts', 'userQuestionService', 'Auth'];

function ProfileMyquestionsCtrl($stateParams, highcharts, userQuestionService, Auth) {
	
  var vm = this;

  vm.list = $stateParams.options.list || 'myQuestionsCurrent';

  vm.index = $stateParams.options.value || 0;
  vm.next = next;
  vm.previous = previous;

  activate();

  function activate() {
    userQuestionService.getAllQuestions()
    .then(function() {
    	vm.myQuestionsCurrent = userQuestionService.myQuestionsCurrent;
      vm.myQuestionsOld = userQuestionService.myQuestionsOld;
      vm.currentQuestion = vm[vm.list][vm.index];
    })
  }
  

  function next() {
    vm.index++;
    vm.currentQuestion = vm[vm.list][vm.index];
  }

  function previous() {
    vm.index--;
    vm.currentQuestion = vm[vm.list][vm.index];
  }
}
