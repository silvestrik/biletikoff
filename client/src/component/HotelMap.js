import React, { Component } from 'react'
//leafet map
import Leaflet from 'leaflet'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
Leaflet.Icon.Default.imagePath ='../node_modules/leaflet'
delete Leaflet.Icon.Default.prototype._getIconUrl
Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class HotelMap extends Component {

    constructor(props) {
        super(props)
        this.state = {           
            zoom: 13
        }   
    }     

    render() {
        const position = [this.props.lat, this.props.lon]
        return (
          <Map center={position} zoom={this.state.zoom} style={{width: '100%',height: '400px'}}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                {this.props.hotelName}
              </Popup>
            </Marker>
          </Map>
        )
    }
}

export default HotelMap
