import {assign} from 'underscore';
import alt from '../alt';
import StatsActions from '../actions/StatsActions';

class StatsStore {
  constructor() {
    this.bindActions(StatsActions);
    this.fenderCount = 0;
    this.gibsonCount = 0;
    this.acousticCount = 0;
    this.totalVotes = 0;
    this.totalCount = 0;
    this.coolestGuitar = 0;
    this.totalVotesGibson = 0;
    this.totalVotesFender = 0;
    this.totalVotesAcoustic = 0;
  }

  onGetStatsSuccess(data) {
      assign(this, data);
      
      var gibsonCount = this.totalVotesGibson;
      var fenderCount = this.totalVotesFender;
      var acousticCount = this.totalVotesAcoustic;
      console.log(acousticCount);
      
      var chart = new CanvasJS.Chart("chartContainer", {
        theme: "theme2",
        title:{
          text: "Guitar Votes Per Type"
        },
        animationEnabled: false,
        data: [              
        {
          type: "column",
          dataPoints: [
            { label: "Gibson",  y: gibsonCount  },
            { label: "Fender", y: fenderCount  },
            { label: "Acoustic", y: acousticCount  },
          ]
        }
        ]
      });
      chart.render();
      
    
  }

  onGetStatsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(StatsStore);