'use strict';

angular.module('populateApp')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['Auth', 'dataService', '$state', '$stateParams',
                       'userQuestionService'];

function ProfileCtrl(Auth, dataService, $state, $stateParams,
                     userQuestionService) {

  var vm = this;

  vm.currentQuestions = [];
  vm.loadQuestion = loadQuestion;
  vm.group = 'myQuestionsActive';
  vm.questionsByGroup = {};
  vm.typeSelection = typeSelection;
  vm.user = {};

  activate();

  function activate() {
    userQuestionService.getUser()
      .then(function(user) {
        vm.user = user;
        vm.currentQuestions = vm.user.myQuestionsActive;
      });
  }

  function loadQuestion(index) {
    userQuestionService.loadQuestion(index, vm.group);
    $state.go('profile.questionsanswered')
  }

  function typeSelection(group) {
    vm.group = group;
    userQuestionService.getUser()
      .then(function(user) {
        vm.currentQuestions = user[group];
      })
    $('.selected').removeClass('selected');
    event.target.classList.add('selected');
  }

}
