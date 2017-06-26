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
    vm.countyStat = userData;
    vm.outletList = storeData.stores


    vm.loadStats = function(county){
      console.log(county)

      //Width and height
			var w = 200;
			var h = 100;
			var barPadding = 1;

			var dataset = [ 5, 10 ];

			//Create SVG element
			var svg = d3.select("#chart")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return i * (w / dataset.length);
			   })
			   .attr("y", function(d) {
			   		return h - (d * 4);
			   })
			   .attr("width", w / dataset.length - barPadding)
			   .attr("height", function(d) {
			   		return d * 4;
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + (d * 10) + ")";
			   });

			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("x", function(d, i) {
			   		return i * (w / dataset.length) + 5;
			   })
			   .attr("y", function(d) {
			   		return h - (d * 4) + 15;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");





    }
    vm.hitMap = function(d, i) {
      vm.regionName = "Region: " + i;
      //Send click event on d3map for the county - to highlight
      $("[d='"+d+"']").d3Click();
    }
    //Respond to store filter - should load bar chart for 'store' showing Nurses and Phamacists data
    vm.changeStore = function(storeName){
      vm.loadStats(storeName)
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
