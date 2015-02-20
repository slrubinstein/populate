'use strict';

angular.module('populateApp')
  .directive('questionLayout', questionLayout);

function questionLayout() {

	return {
		scope: {
			question: '@question'
		},
		require: '^AnswerCtrl',
		restrict: 'E',
		templateUrl: function(dir, scope) {
			if (scope.$attr.question)
				return 'app/questions/question.vote.html'
			else
				return 'app/questions/question.template.html'
		}
	}

}