'use strict';

angular.module('populateApp')
  .directive('imageUploader', imageUploader);

function imageUploader() {
  return {
  	scope: {
  		picPreview: '=pic'
  	},
    templateUrl: 'app/ask/imageUploader/imageUploader.html',
    restrict: 'EA',
    link: link
  };

  function link(scope, element, attrs) {
  		
  	scope.cancelPic = function() {
  		scope.picPreview = '';
  		// clear out .files property of nearest $('.upload') ??
  	}

  	scope.picPreview = '';

		scope.uploadPic = function(element) {

			var file = element.files[0];

			if (!file) {
				return;
			}

			var reader = new FileReader();
		  reader.onload = function () {
		    scope.picPreview = this.result;
		    scope.$apply();
		  }
			reader.readAsDataURL(file);	
		}
  }
}