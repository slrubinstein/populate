'use strict';

angular.module('populateApp')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['Auth', 'dataService', '$state', 'highcharts',
                       'userQuestionService'];

function ProfileCtrl(Auth, dataService, $state, highcharts,
                     userQuestionService) {

  var vm = this;


  vm.loggedIn = false;
  vm.friendQuestionsCurrent = [];
  vm.friendQuestionsOld = [];
  vm.myQuestionsCurrent = [];
  vm.myQuestionsOld = [];
  vm.nextQuestion = nextQuestion;
  vm.profilePage = true;
  vm.seeMyQuestions = seeMyQuestions;
  vm.seePastQuestions = seePastQuestions;
  vm.seeQuestion = seeQuestion;
  vm.user = userQuestionService.user;

  var myIndex = 0;
  var friendIndex = 0;

  activate();

  function activate() {

    vm.user = Auth.getCurrentUser();

    userQuestionService.getAllQuestions(vm.user._id)
      .then(function() {
        vm.myQuestionsCurrent = userQuestionService.myQuestionsCurrent;
        vm.myQuestionsOld = userQuestionService.myQuestionsOld;
        vm.friendQuestionsCurrent = userQuestionService.friendQuestionsCurrent;
        vm.friendQuestionsOld = userQuestionService.friendQuestionsOld;
        console.log(vm.myQuestionsCurrent)
      }, function(err) {
        console.log(err);
      });
  }

  function nextQuestion(type) {
    if (type === 'me') {
      myIndex++;

      if (vm.myQuestions[myIndex]) {
        createChart(vm.myQuestions[myIndex]);
      }

    } else if (type === 'friend') {
      friendIndex++;
      if (vm.friendQuestionArchive[friendIndex]) {
        createChart(vm.friendQuestionArchive[friendIndex]);
      }
    }
  }

  function seeMyQuestions() {
    $state.go('profile.myquestions');
  }

  function seePastQuestions() {
    $state.go('profile.questionsanswered');
    if (vm.friendQuestionArchive[friendIndex]) {
      createChart(vm.friendQuestionArchive[friendIndex]);
    }
  }

  function seeQuestion(index) {
    $state.go('profile.myquestions', {question: vm.myQuestions[index]});
  }
}
