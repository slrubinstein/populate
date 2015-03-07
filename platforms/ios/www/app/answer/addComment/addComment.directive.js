'use strict';

angular.module('populateApp')
  .directive('addComment', addComment);

function addComment() {
  return {
    templateUrl: 'app/answer/addComment/addComment.html',
    restrict: 'EA',
    scope: {
    	comment: '=comment',
    	addNewComment: '&'
    }
  };
}