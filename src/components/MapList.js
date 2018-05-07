import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {maps_active: state.maps_active,}
};

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);

class MapList extends Component {
  
  googleMaps = [];
  initialCoords = [
    {lat: 40.7485722, lng: -74.0068633},
    {lat: 43.6543186, lng: -79.3910326},
    {lat: 37.757815, lng: -122.5076402},
    {lat: 49.2578263, lng: -123.1939438}
  ];
  mapsInitialized = false;  
  zoomChangedBy = -1;
  centerChangedBy = -1;

  initializeMaps(){
    for(var i=0; i<4; i++){

      const node = ReactDOM.findDOMNode(this.refs["map"+i]);
      console.log(node);
      const config = Object.assign({}, {
        center: {lat: this.initialCoords[i].lat, lng: this.initialCoords[i].lng}, 
        zoom: 11,
      });

      const googleMap = new this.props.google.maps.Map(node, config);
      googleMap.number = i;
      googleMap.lastCenter = googleMap.getCenter();

      this.attachGMapsListeners(googleMap);
      this.googleMaps.push(googleMap);
    }
  }

  attachGMapsListeners(googleMap){
    var component = this;
    googleMap.addListener('zoom_changed', 
      function(){
        if(component.zoomChangedBy === -1){
          component.zoomChangedBy = this.number;
          component.googleMaps.forEach(
            g => {
              if(g !== this){
                g.setZoom(this.getZoom());
              }
            }
          );
        }
        else if(this.number === 3 || 
          (component.zoomChangedBy === 3 && this.number === 2)){
          component.zoomChangedBy = -1;
        }
      }
    );

    googleMap.addListener('center_changed', 
      function(){
        if(component.centerChangedBy === -1){
          component.centerChangedBy = this.number;
          var center = this.getCenter();
          var diff = {
            'lat': this.lastCenter.lat() - center.lat(), 
            'lng': this.lastCenter.lng() - center.lng()
          }
          this.lastCenter = center;
          component.googleMaps.forEach(
            g => {
              if(g !== this){

                g.lastCenter = g.getCenter();
                g.setCenter({
                  lat: g.lastCenter.lat() - diff.lat,
                  lng: g.lastCenter.lng() - diff.lng
                })
              }
            }
          );
        }
        else if(this.number === 3 || 
          (component.centerChangedBy === 3 && this.number === 2)){
          component.centerChangedBy = -1;
        }
      }
    );
  }

  componentDidUpdate(prevProps) {
    if(this.props && this.props.google && !this.mapsInitialized){
      this.initializeMaps();
      this.mapsInitialized = true;
    }
    if(this.props.maps_active !== prevProps.maps_active
        && this.props.google && this.mapsInitialized){
      this.googleMaps.forEach(map =>
        this.props.google.maps.event.trigger(map, 'resize')
      );
    }
  }

  render() {
    return (
      <div className={"mapContainer show-"+this.props.maps_active}>
        <div className="mapWrapper">
          <div className="mapControls">
            <div className="placeSearch">
              <input type="text"/>
            </div>
            <div className="mapLock">
              <i className="fa fa-unlock"/>
            </div>
          </div>
          <div className="map" id="map0" ref="map0"/>
        </div>
        <div className="mapWrapper">
          <div className="map" id="map1" ref="map1"/>
        </div>
        <div className="mapWrapper">
          <div className="map" id="map2" ref="map2"/>
        </div>
        <div className="mapWrapper">
          <div className="map" id="map3" ref="map3"/>
        </div>
      </div>
    );
  }
}

MapList.propTypes = {
  google: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(MapList);
