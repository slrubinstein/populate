'use strict';

angular.module('populateApp')
  .factory('userQuestionService', userQuestionService);

userQuestionService.$inject = ['$q', 'dataService'];

function userQuestionService($q, dataService) {

  var myQuestions = [],
      myQuestionsActive = [],
      myQuestionsInactive = [],
      friendQuestionArchive = [],
      currentQuestion,
      myIndex = 0,
      friendIndex = 0;

  return {
    getQuestions: getQuestions,
    myQuestions: myQuestions,
    myQuestionsActive: myQuestionsActive,
    myQuestionsInactive: myQuestionsInactive,
    friendQuestionArchive: friendQuestionArchive,
    currentQuestion: currentQuestion,
    myIndex: myIndex,
    friendIndex: friendIndex
  };

  function getQuestions(userId, ctrl) {

    var deferred = $q.defer();

    dataService.seePastQuestions(userId)
      .then(function(result) {
        var organizedQs = organizeMyQuestions(result.data);

          myQuestions = organizedQs.myQuestions
          myQuestionsActive = organizedQs.myQuestionsActive
          myQuestionsInactive = organizedQs.myQuestionsInactive
          friendQuestionArchive = organizedQs.friendQuestionArchive

        deferred.resolve(organizedQs);
      });

    return deferred.promise;
  }

  function organizeMyQuestions(user) {
    var myQuestions = user.myQuestions,
        friendQuestionArchive = user.questionsAnswered,
        myQuestionsActive = _.filter(myQuestions, function(q) {
      return q.isActive;
    }),
        myQuestionsInactive = _.filter(myQuestions, function(q) {
      return !q.isActive;
    });
    
    return {
          myQuestions: myQuestions,
          myQuestionsActive: myQuestionsActive,
          myQuestionsInactive: myQuestionsInactive,
          friendQuestionArchive: friendQuestionArchive,
    }
  }
}
