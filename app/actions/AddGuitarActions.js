import alt from '../alt';

class AddGuitarActions {
  constructor() {
    this.generateActions(
      'addGuitarSuccess',
      'addGuitarFail',
      'updateBrand',
      'updateModel',
      'updatePicture',
      'invalidBrand',
      'invalidModel',
      'invalidPicture'
    );
  }

  addGuitar(brand, model, picture) {
    $.ajax({
      type: 'POST',
      url: '/api/guitars',
      data: { brand: brand, model: model, picture: picture }
    })
      .done((data) => {
        this.actions.addGuitarSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.addGuitarFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(AddGuitarActions);