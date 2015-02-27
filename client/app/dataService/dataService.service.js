'use strict';

angular.module('populateApp')
  .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {

  return {
  //   addFriend: addFriend,
  //   getAllQuestions: getAllQuestions,
  //   getFriendsFromDB: getFriendsFromDB,
  //   getUserFriends: getUserFriends,
  //   loadQuestionQueue: loadQuestionQueue,
    post: post,
    // seePastQuestions: seePastQuestions,
    vote: vote
  }

  function post(newQuestion, selectedFriends) {
    return $http.post('/api/questions', newQuestion)
      // .then(function(result) {
      //   $http.put('/api/users/' + newQuestion.askerId +
      //     '/addquestion', {questionId: result.data._id,
      //                      selectedFriends: selectedFriends})
      // });
  }

  // function seePastQuestions(userId) {
  //   return $http.get('/api/users/' + userId + '/pastquestions');
  // }

  function vote(question, answer, voterId) {
    $http.put('/api/questions/' + question._id, {questionId: question._id,
                                                answer: answer,
                                                voterId: voterId})
    // $http.put('/api/questions/' + question._id, question);
    // $http.put('/api/users/' + userId + '/vote/' + question._id);
  }
}