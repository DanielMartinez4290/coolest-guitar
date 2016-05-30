import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange);
    
    let socket = io.connect();

    socket.on('onlineUsers', (data) => {
      NavbarActions.updateOnlineUsers(data);
    });

    $(document).ajaxStart(() => {
      NavbarActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        NavbarActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let searchQuery = this.state.searchQuery.trim();

    if (searchQuery) {
      NavbarActions.findGuitar({
        searchQuery: searchQuery,
        searchForm: this.refs.searchForm,
        history: this.props.history
      });
    }
  }

  render() {
    return (
      <div className="row">
        <nav className="navbar navbar-default">
          <div className="container-fluid">

              <div className="col-xs-12 col-sm-3 col-md-3 noPadding">
                <div className="navbar-header">
                  
                  <div className="col-xs-7 col-sm-12 noPadding">
                      <Link to='/' className='navbar-brand'>
                        <span className={'triangles animated ' + this.state.ajaxAnimationClass}>
                          <div className='tri invert'></div>
                          <div className='tri invert'></div>
                          <div className='tri'></div>
                          <div className='tri invert'></div>
                          <div className='tri invert'></div>
                          <div className='tri'></div>
                          <div className='tri invert'></div>
                          <div className='tri'></div>
                          <div className='tri invert'></div>
                        </span>
                        Coolest Guitar
                        <span className='badge badge-up badge-danger'>{this.state.onlineUsers}</span>
                      </Link>
                  </div>
                  <div className="col-xs-5">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                  </div>
                </div>
              </div>

              <div className="col-xs-12 col-sm-9 col-md-9 noPadding" id="navBar">          
                <div className="collapse navbar-collapse noPadding" id="bs-example-navbar-collapse-1">
                        
                  <ul className="nav navbar-nav navbar-right col-sm-12">
                        <li className="col-sm-3 col-md-3 searchForm">
                          <form ref='searchForm' className='navbar-form animated searchForm' onSubmit={this.handleSubmit.bind(this)}>
                            <div className='input-group navText'>
                              <input type='text' className='form-control' placeholder='Search by model' value={this.state.searchQuery} onChange={NavbarActions.updateSearchQuery} />
                              <span className='input-group-btn'>
                                <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
                              </span>
                            </div>
                          </form>
                        </li>
                        <li className="col-md-1 navText"><Link to='/'>Home</Link></li>
                        <li className="col-md-1 navText"><Link to='/stats'>Stats</Link></li>
                        <li className='dropdown col-md-1.5 navText'>
                          <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Gibson <span className='caret'></span></a>
                          <ul className='dropdown-menu'>
                              <li><Link to='guitars/1'>Les Paul</Link></li>
                              <li><Link to='guitars/2'>Firebird</Link></li>
                              <li><Link to='guitars/3'>SG</Link></li>
                              <li><Link to='guitars/4'>Flying V</Link></li>
                              <li><Link to='guitars/5'>Semi Hollow</Link></li>
                          </ul>
                        </li>
                        <li className="dropdown col-md-1.5 navText" >
                          <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Fender <span className='caret'></span></a>
                          <ul className='dropdown-menu'>
                              <li><Link to='guitars/6'>American Stratocaster</Link></li>
                              <li><Link to='guitars/7'>Relic Stratocaster</Link></li>
                              <li><Link to='guitars/8'>Telecaster</Link></li>
                              <li><Link to='guitars/9'>Jaguar</Link></li>
                              <li><Link to='guitars/10'>P Bass</Link></li>
                              <li><Link to='guitars/11'>Jazz Bass</Link></li>
                          </ul>
                        </li>
                        <li className='dropdown col-md-1.5 navText'>
                          <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Acoustic <span className='caret'></span></a>
                          <ul className='dropdown-menu'>
                              <li><Link to='guitars/12'>Martin</Link></li>
                              <li><Link to='guitars/13'>Taylor</Link></li>
                              <li><Link to='guitars/14'>Breedlove</Link></li>
                              <li><Link to='guitars/15'>Alvarez</Link></li>
                              <li><Link to='guitars/16'>Takamine</Link></li>
                          </ul>
                        </li>
                        <li className="col-sm-2.5 col-md-2 navText"><Link to='/add'>Add Guitar</Link></li>
                  </ul>
                </div>
              </div>
        </div>
      </nav>
  </div>
      
    );
  }
}

export default Navbar;