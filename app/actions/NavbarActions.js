import alt from '../alt';
import {assign} from 'underscore';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers',
      'updateAjaxAnimation',
      'updateSearchQuery',
      'findGuitarSuccess',
      'findGuitarFail'
    );
  }

  findGuitar(payload) {
    $.ajax({
      url: '/api/guitars/search',
      data: { model: payload.searchQuery }
    })
      .done((data) => {
        assign(payload, data);
        this.actions.findGuitarSuccess(payload);
      })
      .fail(() => {
        this.actions.findGuitarFail(payload);
      });
  }

}

export default alt.createActions(NavbarActions);