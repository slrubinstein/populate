'use strict';

angular.module('populateApp')
  .factory('highcharts', highcharts);

function highcharts() {

  return {
    createChartOptions: createChartOptions
  };

  function createChartOptions(question) {
    console.log('creating chart with', question)
    var votePercents = percent(question.swipeLeft, question.swipeRight);

    var chartConfig = {
      options: {
        chart: {
          type: 'pie'
        },
          tooltip: {
            style: {
              padding: 10,
              fontWeight: 'bold'
            }
          }
      },

      //Series object (optional) - a list of series using normal highcharts series options.
      series: [{
        name: 'Votes',
        data: [[question.swipeLeft.option, votePercents.left],
              [question.swipeRight.option, votePercents.right]]
      }],

      title: {
        text: question.query
      },
      
      loading: false,

      size: {
        width: 400,
        height: 300
      },

      func: function (chart) {
        //setup some logic for the chart
      }
    };

    return chartConfig;
  }

  function percent(left, right) {
    var totalVotes = left.votes + right.votes;
    return {
      left: Math.round(left.votes / totalVotes * 100),
      right: Math.round(right.votes / totalVotes * 100)
    }
  }
}
