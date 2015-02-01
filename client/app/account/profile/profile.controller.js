'use strict';

angular.module('populateApp')
  .controller('ProfileCtrl', ProfileCtrl);

ProfileCtrl.$inject = ['Auth', 'dataService', '$state'];

function ProfileCtrl(Auth, dataService, $state) {

  var vm = this;

  vm.loggedIn = false;
  vm.myQuestions = [];
  vm.myQuestionsActive = [];
  vm.myQuestionsInactive = [];
  vm.pastQuestions = [];
  vm.profilePage = true;
  vm.seeMyQuestions = seeMyQuestions;
  vm.seePastQuestions = seePastQuestions;
  vm.user;

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

    dataService.seePastQuestions(vm.user._id)
      .then(function(result) {
        console.log(result.data)
        vm.myQuestions = result.data.myQuestions;
        vm.questionsAnswered = result.data.questionsAnswered;
        vm.myQuestionsActive = _.filter(vm.myQuestions, function(q) {
          return q.isActive;
        });
        vm.myQuestionsInactive = _.filter(vm.myQuestions, function(q) {
          return !q.isActive;
        });
      })
  }

  function seeMyQuestions() {
    $state.go('profile.myquestions', {myQuestions: vm.myQuestions});
  }

  function seePastQuestions() {
    $state.go('profile.questionsanswered', {pastQuestions: vm.pastQuestions});
  }
}
