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
		// require: ['^?ProfileCtrl', '^?AnswerCtrl'],
		controller: 'QuestionCtrl as qctrl',
		restrict: 'E',
		link: function(scope, elem, attr, ctrl) {
			// do i want to use $observe here instead?
			// scope.$watch(attr.question, function(newQuestion) {
			// 	scope.question = newQuestion;
			// });
			// console.log('scope question', scope.question)
			// scope.vote = qctrl.vote;

		},

		templateUrl: function(elem, attr) {
			if (attr.context = 'answer')
				return 'app/questions/question.vote.html';
			else
				return 'app/questions/question.template.html';
		}
	}

}