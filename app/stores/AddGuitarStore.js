import alt from '../alt';
import AddGuitarActions from '../actions/AddGuitarActions';

class AddGuitarStore {
  constructor() {
    this.bindActions(AddGuitarActions);
    this.brand = '';
    this.model = '';
    this.picture = '';
    this.helpBlock = '';
    this.successMessage = '';
    this.modelValidationState = '';
    this.brandValidationState = '';
    this.pictureValidationState = '';
  }

  onAddGuitarSuccess(successMessage) {
    this.brandValidationState = 'has-success';
    this.modelValidationState = 'has-success';
    this.pictureValidationState = 'has-success';
    this.successMessage = successMessage;
  }

  onAddGuitarFail(errorMessage) {
    this.brandValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateBrand(event) {
    this.brand = event.target.value;
    this.brandValidationState = '';
    this.helpBlock = '';
  }

  onUpdateModel(event) {
    this.model = event.target.value;
    this.modelValidationState = '';
    this.helpBlock = '';
  }
  onUpdatePicture(event) {
    this.picture = event.target.value;
    this.pictureValidationState = '';
    this.helpBlock = '';
  }

  onInvalidBrand() {
    this.brandalidationState = 'has-error';
    this.helpBlock = 'Please enter a Brand.';
  }
  onInvalidModel() {
    this.modelValidationState = 'has-error';
    this.helpBlock = 'Please enter a Model.';
  }
  onInvalidPicture() {
    this.pictureValidationState = 'has-error';
    this.helpBlock = 'Please enter a Picture.';
  }
}

export default alt.createStore(AddGuitarStore);