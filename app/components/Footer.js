import React from 'react';
import {Link} from 'react-router';
import FooterStore from '../stores/FooterStore'
import FooterActions from '../actions/FooterActions';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = FooterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FooterStore.listen(this.onChange);
    FooterActions.getTopGuitars();
  }

  componentWillUnmount() {
    FooterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let leaderboardGuitars = this.state.guitars.map(function(guitar) {
      return (
        <li key={guitar.guitarId}>
          <Link to={'/guitars/' + guitar.guitarId}>
            <img className='thumb-md' src={guitar.picture} />
          </Link>
        </li>
      );
    });

    return (
      
      <footer>
        <div className='container'>
          <div className='row footerText'>
            <div className='col-md-5 col-xs-12 col-sm-12'>
              <h3 className='lead'><strong>Information</strong> and <strong>Copyright</strong></h3>
              <p>© 2016 Daniel Martinez.</p>
            </div>
            <div className='col-md-7 col-xs-12 col-sm-12'>
              <h3 className='lead'><strong>Leaderboard</strong> Top 5 Guitars</h3>
              <ul className='list-inline'>
                {leaderboardGuitars}
              </ul>
            </div>
          </div>
        </div>
      </footer>

    );
  }
}

export default Footer;