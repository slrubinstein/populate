'use strict';

angular.module('populateApp')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['Auth', 'dataService', '$state', '$stateParams',
                       'userQuestionService'];

function ProfileCtrl(Auth, dataService, $state, $stateParams,
                     userQuestionService) {

  var vm = this;

  vm.currentQuestion = $stateParams.question;
  vm.currentQuestions = [];
  vm.loadQuestion = loadQuestion;
  vm.open = true;
  vm.openOrClosed = 'active';
  vm.questionsByGroup = {};
  vm.typeSelection = typeSelection;
  vm.user = Auth.getCurrentUser();

  activate();

  function activate() {
    Auth.isLoggedInAsync(function(loggedIn) {
      if (loggedIn) {
        vm.questionsByGroup.active = vm.user.myQuestionsActive;
        vm.questionsByGroup.old = vm.user.myQuestionsOld;
        vm.currentQuestions = vm.questionsByGroup['active'];
        console.log(vm.user)
        console.log(vm.questionsByGroup)
        
      }
    })
  }

  function loadQuestion(index) {
    vm.currentQuestion = vm.currentQuestions[index];
    $state.go('profile.questions', {question: vm.currentQuestion})
    console.log(vm.currentQuestion)
  }

  function typeSelection(group) {
    vm.currentQuestions = vm.questionsByGroup[group];
  }

}
