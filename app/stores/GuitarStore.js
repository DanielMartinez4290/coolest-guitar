import {assign, contains} from 'underscore';
import alt from '../alt';
import GuitarActions from '../actions/GuitarActions';

class GuitarStore {
  constructor() {
    this.bindActions(GuitarActions);
    this.guitarId = 0;
    this.brand = 'TBD';
    this.model = 'TBD';
    this.wins = 0;
    this.losses = 0;
    this.picture = '';
    this.winLossRatio = 0;
  }

  onGetGuitarSuccess(data) {
    assign(this, data);
    this.winLossRatio = ((this.wins / (this.wins + this.losses) * 100) || 0).toFixed(1);
  }

  onGetGuitarFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

}

export default alt.createStore(GuitarStore);