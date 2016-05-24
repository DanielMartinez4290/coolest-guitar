import React from 'react';
import GuitarStore from '../stores/GuitarStore';
import GuitarActions from '../actions/GuitarActions';

class Guitar extends React.Component {
  constructor(props) {
    super(props);
    this.state = GuitarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    GuitarStore.listen(this.onChange);
    GuitarActions.getGuitar(this.props.params.id);
  }

  componentWillUnmount() {
    GuitarStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      GuitarActions.getGuitar(this.props.params.id);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
        <div className='profile-img'>
            <img src={'/public/img/'+this.state.picture} height="250" />
        </div>
        <div className='profile-info clearfix'>
          <h2><strong>{this.state.name}</strong></h2>
          <h4 className='lead profileText'><strong>Brand:</strong> {this.state.brand}</h4>
          <h4 className='lead profileText'><strong>Model:</strong> {this.state.model}</h4>
          <h4 className='lead profileText'><strong>Wins:</strong> {this.state.wins}</h4>
          <h4 className='lead profileText'><strong>Losses:</strong> {this.state.losses}</h4>
          <h4 className='lead profileText'><strong>Winning Percentage:</strong> {this.state.winLossRatio}</h4>
        </div>
      </div>
    );
  }
}

export default Guitar;