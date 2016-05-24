import alt from '../alt';

class GuitarActions {
  constructor() {
    this.generateActions(
      'getGuitarSuccess',
      'getGuitarFail'
    );
  }

  getGuitar(guitarId) {
    $.ajax({ url: '/api/guitars/' + guitarId })
      .done((data) => {
        this.actions.getGuitarSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getGuitarFail(jqXhr);
      });
  }
}

export default alt.createActions(GuitarActions);