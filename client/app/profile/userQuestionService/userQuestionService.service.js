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

  var userFromDB = {},
      myQuestionsCurrent = [],
      myQuestionsOld = [],
      friendQuestionsCurrent = [],
      friendQuestionsOld = [];

  return {
    getQuestions: getQuestions,
    getAllQuestions: getAllQuestions,
    myQuestions: myQuestions,
    myQuestionsActive: myQuestionsActive,
    myQuestionsInactive: myQuestionsInactive,
    friendQuestionArchive: friendQuestionArchive,
    currentQuestion: currentQuestion,
    myIndex: myIndex,
    friendIndex: friendIndex,

    myQuestionsCurrent: myQuestionsCurrent,
    myQuestionsOld: myQuestionsOld,
    friendQuestionsCurrent: friendQuestionsCurrent,
    friendQuestionsOld: friendQuestionsOld
  };


  function getAllQuestions(userId) {

    var deferred = $q.defer();

    dataService.getAllQuestions(userId)
      .then(function(result) {

          angular.copy(result.data.myQuestionsCurrent, myQuestionsCurrent);
          angular.copy(result.data.myQuestionsOld, myQuestionsOld);
          angular.copy(result.data.friendQuestionsCurrent, friendQuestionsCurrent);
          angular.copy(result.data.friendQuestionsOld, friendQuestionsOld);
          angular.copy(result.data, userFromDB);
        deferred.resolve(result.datadata);
      });

    return deferred.promise;
  }


  function getQuestions(userId) {

    var deferred = $q.defer();

    dataService.seePastQuestions(userId)
      .then(function(result) {
        var organizedQs = organizeMyQuestions(result.data);

          angular.copy(organizedQs.myQuestions, myQuestions);
          angular.copy(organizedQs.myQuestionsActive, myQuestionsActive);
          angular.copy(organizedQs.myQuestionsInactive, myQuestionsInactive);
          angular.copy(organizedQs.friendQuestionArchive, friendQuestionArchive);

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
