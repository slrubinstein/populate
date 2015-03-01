'use strict';

angular.module('populateApp')
  .factory('userQuestionService', userQuestionService);

userQuestionService.$inject = ['$q', 'dataService', 'Auth'];

function userQuestionService($q, dataService, Auth) {

  var currentQuestion = {},
      currentGroup,
      currentIndex,
      user = {};

  return {
    currentQuestion: currentQuestion,
    getUser: getUser,
    // index: index,
    loadQuestion: loadQuestion,
    nextQuestion: nextQuestion,
    user: user
  };

  function getUser() {
    var deferred = $q.defer();

    if (_.isEmpty(user)) {
      user = Auth.isLoggedInAsync(function(loggedIn) {
        if (loggedIn) {
          user = Auth.getCurrentUser();
          user.friendQuestionsActive = _.sortBy(user.friendQuestionsActive, function(q) {
            return q.closesat;
          });
          user.friendQuestionsOld = _.sortBy(user.friendQuestionsOld, function(q) {
            return q.closesat;
          });

          deferred.resolve(user);
        }
        else {
          console.log('user is not logged in');
        }
      })
    } else {
      deferred.resolve(user);
    }
    return deferred.promise;
  }

  function loadQuestion(index, group) {
    currentIndex = index;
    currentGroup = group;
    angular.copy(user[group][index], currentQuestion);
  }

  function nextQuestion() {
    currentIndex++;
    if (user[currentGroup][currentIndex]) {
      loadQuestion(currentIndex, currentGroup);
      return true;
    } else {
      return false;
    }
  }
}
