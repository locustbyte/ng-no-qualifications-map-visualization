(function() {
  'use strict';

  angular
    .module('angularVersion')
    .controller('MainController', MainController)
    .filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
    })

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $scope) {
    var vm = $scope;

    vm.hitMap = function(d, i) {
      $("[d='"+d+"']").d3Click();
    }

    angular.element(document).ready(function() {
      var body = d3.select("body");
      ts.choropleth.draw(body);

      jQuery.fn.d3Click = function() {
        this.each(function(i, e) {
          var evt = new MouseEvent("click");
          e.dispatchEvent(evt);
        });
      };

      var mapRegions = [];
      var mapRegionss = [];
      var dropItems = d3.selectAll('path')[0];
      //clear first as it's not an actual county
      dropItems.shift();

      var i = 0;
      for (i = 0; i < dropItems.length; ++i) {
          var front = dropItems[i].outerHTML.split('<path d="')[1]
          var complete = front.split('"></path>')[0]
          mapRegions.push({"url": complete, "label": boundaries.objects.GBR_adm2.geometries[i].properties.NAME_2});
          i++;
      }
      //set ng scope var for ng-repeat
      vm.mapRegionss = mapRegions;

    });
  }
})();
