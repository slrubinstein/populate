'use strict';

angular.module('populateApp')
  .controller('ProfileMyquestionsCtrl', ProfileMyquestionsCtrl);

ProfileMyquestionsCtrl.$inject = ['$stateParams', 'highcharts', 'userQuestionService', 'Auth'];

function ProfileMyquestionsCtrl($stateParams, highcharts, userQuestionService, Auth) {
	
  var vm = this;

  vm.endOfList;
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
      vm.friendQuestionsOld = userQuestionService.friendQuestionsOld;
      vm.currentQuestion = vm[vm.list][vm.index];
      vm.endOfList = vm.index === vm[vm.list].length - 1 ? true : false;
    })
  }
  

  function next() {
    vm.index++;
    vm.currentQuestion = vm[vm.list][vm.index];
    if (vm.index === vm[vm.list].length - 1) {
      vm.endOfList = true;
    }
  }

  function previous() {
    vm.index--;
    vm.currentQuestion = vm[vm.list][vm.index];
    vm.endOfList = false;
  }
}
