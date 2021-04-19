import React from 'react'
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
// import * as googleMaps from 'google-maps-react';
import * as googleApi from '../../configs/googleApi'
// import moduleName from '../../assets/icons/home'
// ... 

 class MapContainer extends React.Component {
   constructor(props){
     super(props);
     this.state={
       order:props.order,
       connection:props.connection,
       currentLat:null,
       currentLng:null
     }
   }
  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((position)=>
      {
        this.setState({currentLat:position.coords.latitude,
          currentLng:position.coords.longitude})
          this.state.connection.invoke("SendLocation", position.coords.latitude,position.coords.longitude,this.state.order);
        })
    }
  }
  render() {
    return (
      <Map google={this.props.google} zoom={14}
                initialCenter={{ lat: this.props.order.deliveryLat, lng: this.props.order.deliveryLng }}
      >
        <Marker position={{  lat: this.props.order.deliveryLat, lng: this.props.order.deliveryLng }}
        title="Home"
          // icon={{
          //   url: '../../assets/images/home.png'  ,
          //   anchor: new window.google.maps.Point(36,36),
          //   scaledSize: new window.google.maps.Size(64,64)
          // }}  
        />

<Marker position={{  lat: this.props.order.restaurant.restaurantLat, lng:  this.props.order.restaurant.restaurantLng }}
  />

<Marker position={{  lat: this.state.currentLat , lng:  this.state.currentLng }} //courier address
        />
      </Map>
    );
  }
}

 
const GoogleMap=GoogleApiWrapper({
  apiKey: (googleApi.GOOGLE_API_KEY)
})(MapContainer);
export default GoogleMap;
