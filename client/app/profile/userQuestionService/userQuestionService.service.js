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
    addFriend: addFriend,
    currentQuestion: currentQuestion,
    getUser: getUser,
    loadQuestion: loadQuestion,
    nextQuestion: nextQuestion,
    postQuestion: postQuestion,
    resetUser: resetUser,
    user: user,
    vote: vote
  };

  function addFriend(userId, friend) {
    dataService.addFriend(userId, friend.id)
    user.friends.push({
      _id: friend.id,
      name: friend.name
    })
  }

  function getUser() {
    var deferred = $q.defer();

    if (_.isEmpty(user)) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (loggedIn) {
          angular.copy(Auth.getCurrentUser(), user);
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

  function postQuestion(question) {
    dataService.post(question)
      .then(function(response) {
        user.myQuestionsActive.unshift(response.data);
      });
  }

  function resetUser() {
    user = {};
    return getUser();
  }

  function vote(question, answer, voter) {
    dataService.vote(question, answer, voter)
      .then(function(response) {
        user.friendQuestionsActive.splice(currentIndex, 1);
        user.friendQuestionsOld.unshift(response.data);    
        nextQuestion();
      });
  }
}
