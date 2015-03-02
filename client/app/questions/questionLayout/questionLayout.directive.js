'use strict';

angular.module('populateApp')
  .directive('questionLayout', questionLayout);

questionLayout.$inject = ['userQuestionService'];

function questionLayout(userQuestionService) {

	return {
		scope: {
			question: '=question',
			loadNextQuestion: '&'
		},
		controller: 'QuestionCtrl as qctrl',
		restrict: 'E',
		templateUrl: function(elem, attr) {
			if (attr.context === 'answer') {
				return 'app/questions/question.vote.html';
			} else if (attr.context === 'ask') {
				return 'app/questions/question.template.html';
			}
		}
	}

}