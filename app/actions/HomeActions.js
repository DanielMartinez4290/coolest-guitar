import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getTwoGuitarsSuccess',
      'getTwoGuitarsFail',
      'voteFail'
    );
  }

  getTwoGuitars() {
    $.ajax({ url: '/api/guitars' })
      .done(data => {
        this.actions.getTwoGuitarsSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getTwoGuitarsFail(jqXhr.responseJSON.message);
      });
  }

  vote(winner, loser) {
    $.ajax({
      type: 'PUT',
      url: '/api/guitars' ,
      data: { winner: winner, loser: loser }
    })
      .done(() => {
        this.actions.getTwoGuitars();
      })
      .fail((jqXhr) => {
        this.actions.voteFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(HomeActions);