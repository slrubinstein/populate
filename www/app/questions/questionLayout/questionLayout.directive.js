'use strict';

angular.module('populateApp')
  .directive('questionLayout', questionLayout);

function questionLayout() {

	return {
		scope: {
			question: '@question'
		},
		controller: 'QuestionCtrl as qctrl',
		restrict: 'E',
		link: function(scope, elem, attr) {
			// do i want to use $observe here instead?
			scope.$watch(attr.question, function(newQuestion) {
				scope.question = newQuestion;
			});
		},
		templateUrl: function(elem, attr) {
			if (attr.question)
				return 'app/questions/question.vote.html';
			else
				return 'app/questions/question.template.html';
		}
	}

}