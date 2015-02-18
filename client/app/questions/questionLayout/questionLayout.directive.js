'use strict';

angular.module('populateApp')
  .directive('questionLayout', questionLayout);

function questionLayout() {

	return {
		restrict: 'E',
		templateUrl: 'app/questions/question.template.html',

	}

}