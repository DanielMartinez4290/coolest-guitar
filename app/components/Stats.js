import React from 'react';
import StatsStore from '../stores/StatsStore'
import StatsActions from '../actions/StatsActions';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = StatsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    StatsStore.listen(this.onChange);
    StatsActions.getStats();
  }

  componentWillUnmount() {
    StatsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container statsPage'>
        <div className='panel panel-default'>
          <table className='table table-striped'>
            <thead>
            <tr>
              <th colSpan='2' className="statsPageHeader">Statistics</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td className="statsHeader">Coolest Guitar</td>
              <td className="statsData">{this.state.coolestGuitar}</td>
            </tr>
            <tr>
              <td className="statsHeader">Fender Guitars</td>
              <td className="statsData">{this.state.fenderCount}</td>
            </tr>
            <tr>
              <td className="statsHeader">Gibson Guitars</td>
              <td className="statsData">{this.state.gibsonCount}</td>
            </tr>
            <tr>
              <td className="statsHeader">Acoustic Guitars</td>
              <td className="statsData">{this.state.acousticCount}</td>
            </tr>
            <tr>
              <td className="statsHeader">Total votes cast</td>
              <td className="statsData">{this.state.totalVotes}</td>
            </tr>
            <tr>
              <td className="statsHeader">Total number of Guitars</td>
              <td className="statsData">{this.state.totalCount}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Stats;