import React from 'react';
import AddGuitarStore from '../stores/AddGuitarStore';
import AddGuitarActions from '../actions/AddGuitarActions';

class AddGuitar extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddGuitarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddGuitarStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddGuitarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var brand = this.state.brand;
    var model = this.state.model;
    var picture = this.state.picture;


    if (!brand) {
      AddGuitarActions.invalidBrand();
      this.refs.brandTextField.getDOMNode().focus();
    }

    if (!model) {
      AddGuitarActions.invalidModel();
      this.refs.modelTextField.getDOMNode().focus();
    }

    if (!picture) {
      AddGuitarActions.invalidPicture();
      this.refs.pictureTextField.getDOMNode().focus();
    }

    if (brand && model && picture) {
      AddGuitarActions.addGuitar(brand, model, picture);
    }
    
  }



  render() {
    return (
      <div className='container addGuitarPage'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Guitar</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>

                  <div className={'form-group ' + this.state.brandValidationState}>
                    <label className='control-label'>Guitar Brand</label>
                    <input type='text' className='form-control' ref='brandTextField' value={this.state.brand}
                           onChange={AddGuitarActions.updateBrand} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>

                  <div className={'form-group ' + this.state.modelValidationState}>
                    <label className='control-label'>Guitar Model</label>
                    <input type='text' className='form-control' ref='modelTextField' value={this.state.model}
                           onChange={AddGuitarActions.updateModel} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  
                  <div className={'form-group ' + this.state.pictureValidationState}>
                    <label className='control-label'>Guitar Image URL</label>
                    <input type='text' className='form-control' ref='pictureImageField' value={this.state.picture}
                           onChange={AddGuitarActions.updatePicture} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <span className='help-block'>{this.state.successMessage}</span>
                  
                  
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
  
}

export default AddGuitar;