'use strict';

angular.module('populateApp')
  .directive('imageUploader', imageUploader);

function imageUploader() {
  return {
    templateUrl: 'app/ask/imageUploader/imageUploader.html',
    restrict: 'EA',
    link: link
  };

  function link(scope, element, attrs) {
  		
  	scope.cancelPic = function() {
  		scope.picPreview = '';
  	}

  	scope.fileInput;

  	scope.picPreview = '';

		scope.uploadPic = function() {

			var file = $('.upload')[0].files[0];

			if (!file) {
				return;
			}
			
			var reader = new FileReader();
		  reader.onload = function () {
		    // vm.question.answer1.image = this.result;
		    var newPicData = this.result;
		    scope.picPreview = this.result;
		    scope.$apply();
		  }
			reader.readAsDataURL(file);	
		}
  }
}