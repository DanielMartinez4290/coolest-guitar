import alt from '../alt';

class FooterActions {
  constructor() {
    this.generateActions(
      'getTopGuitarsSuccess',
      'getTopGuitarsFail'
    );
  }

  getTopGuitars() {
    $.ajax({ url: '/api/guitars/top' })
      .done((data) => {
        this.actions.getTopGuitarsSuccess(data)
      })
      .fail((jqXhr) => {
        this.actions.getTopGuitarsFail(jqXhr)
      });
  }
}

export default alt.createActions(FooterActions);