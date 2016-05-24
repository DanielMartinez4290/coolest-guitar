import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getTwoGuitars();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleClick(guitar) {
    var winner = guitar.guitarId;
    var loser = first(without(this.state.guitars, findWhere(this.state.guitars, { guitarId: winner }))).guitarId;
    HomeActions.vote(winner, loser);
  }

  render() {
    
    var guitarNodes = this.state.guitars.map((guitar, index) => {
      return (
        <div key={guitar.guitarId} className={index === 0 ? 'col-xs-6 col-sm-6 col-md-5 col-md-offset-1' : 'col-xs-6 col-sm-6 col-md-5'}>
          <div className='thumbnail fadeInUp animated'>
            <img onClick={this.handleClick.bind(this, guitar)} src={'/public/img/'+guitar.picture}/>
            <div className='caption text-center'>
              <h4>
                <Link to={'/guitars/' + guitar.guitarId}><strong>{guitar.brand} {guitar.model}</strong></Link>
              </h4>
            </div>
          </div>
        </div>
      );
    });
  
    return (
      <div className='container'>
        <h3 className='text-center'>Click on the Guitar you think is cooler.</h3>
        <div className='row'>
          {guitarNodes}
        </div>
      </div>
    );
  }
}

export default Home;