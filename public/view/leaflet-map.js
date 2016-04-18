import React, { Component } from 'react'
import './leaflet-map.css'

export default class LeafletMap extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <div id="leaflet-map"></div>
  }

  componentDidMount() {
    let leaflet_map = document.getElementById("leaflet-map");
    this.props.controller.initialize(leaflet_map);
  }

}
