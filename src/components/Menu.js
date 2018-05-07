import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import classNames from 'classnames';

import {toggle_menu, show_maps} from '../actions/actions';

import 'font-awesome/css/font-awesome.min.css';

const mapStateToProps = state => ({
    show_menu: state.show_menu,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  toggle_menu, show_maps
}, dispatch);

class Menu extends Component {

  render() {
    return (
      <div className={
          classNames("menu", {"open": this.props.show_menu})}>
        <i
          onClick={() => this.props.toggle_menu(!this.props.show_menu)}
          className="fa fa-bars"/>
        <div className={
          classNames("menu-content", {"open": this.props.show_menu})}>
          <div className="layout-wrapper">
            <h4>Layout:</h4>
            <div
              className="layout show-2h"
              onClick={() => this.props.show_maps("2h")}
            >
              <div className="block"/>
              <div className="block"/>
            </div>
            <div
              className="layout show-2v"
              onClick={() => this.props.show_maps("2v")}
            >
              <div className="block"/>
              <div className="block"/>
            </div>
            <div
              className="layout show-3h"
              onClick={() => this.props.show_maps("3h")}
            >
              <div className="block"/>
              <div className="block"/>
              <div className="block"/>
            </div>
            <div
              className="layout show-3v"
              onClick={() => this.props.show_maps("3v")}
            >
              <div className="block"/>
              <div className="block"/>
              <div className="block"/>
            </div>
            <div
              className="layout show-4"
              onClick={() => this.props.show_maps("4")}
            >
              <div className="block"/>
              <div className="block"/>
              <div className="block"/>
              <div className="block"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  show_menu: PropTypes.bool,
  toggle_menu: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);