import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Menu from './Menu';
import MapList from './MapList';
import '../styles/App.css';
import '../styles/maps.css'

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <div className="App">
            <Menu/>
            <MapList
              google={this.props.google}
            />
          </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  google: PropTypes.object,
}

const GoogleWrappedApp =  GoogleApiWrapper({
    apiKey: 'AIzaSyClziNq0P0zsj3hhnN1uo4etZ_0IvkzvfE',
  })(App)

export default connect(mapStateToProps, mapDispatchToProps)(GoogleWrappedApp);