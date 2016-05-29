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
  }

  onGetStatsSuccess(data) {
    assign(this, data);
  }

  onGetStatsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(StatsStore);