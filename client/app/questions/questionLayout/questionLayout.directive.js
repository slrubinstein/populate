'use strict';

angular.module('populateApp')
  .directive('questionLayout', questionLayout);

function questionLayout() {

	return {
		scope: {
			question: '=question'
		},
		controller: 'AnswerCtrl as answer',
		restrict: 'E',
		link: function(scope, elem, attr) {
			scope.$watch(attr.question, function(newQuestion) {
				scope.question = newQuestion;
			})
		},
		templateUrl: function(elem, attr) {
			if (attr.question)
				return 'app/questions/question.vote.html'
			else
				return 'app/questions/question.template.html'
		}
	}

}