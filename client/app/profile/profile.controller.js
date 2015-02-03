'use strict';

angular.module('populateApp')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['Auth', 'dataService', '$state', 'highcharts',
                       'userQuestionService', 'facebookFriends'];

function ProfileCtrl(Auth, dataService, $state, highcharts,
                     userQuestionService, fb) {

  var vm = this;

  vm.myCurrentQuestion;
  vm.friendCurrentQuestion;
  vm.loggedIn = false;
  vm.friendQuestionArchive = [];
  vm.myQuestions = [];
  vm.myQuestionsActive = [];
  vm.myQuestionsInactive = [];
  vm.nextQuestion = nextQuestion;
  vm.profilePage = true;
  vm.seeMyQuestions = seeMyQuestions;
  vm.seePastQuestions = seePastQuestions;
  vm.seeQuestion = seeQuestion;
  vm.user;

  var myIndex = 0;
  var friendIndex = 0;

  activate();

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
        vm.myQuestionsActive = result.myQuestionsActive;
        vm.myQuestionsInactive = result.myQuestionsInactive;
        vm.friendQuestionArchive = result.friendQuestionArchive;
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
    // createChart(vm.myQuestions[userQuestionService.myIndex])
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

  // function createChart(question) {
  //   vm.chartConfig = highcharts.createChartOptions(question);
  // }

}
