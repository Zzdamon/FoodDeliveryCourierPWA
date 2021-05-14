import React from 'react'
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';
// import * as googleMaps from 'google-maps-react';
import * as googleApi from '../../configs/googleApi'
import * as Yeat from "../yeat/yeat";
// import moduleName from '../../assets/icons/home'
// ... 

 class MapContainer extends React.Component {
   constructor(props){
     super(props);
     this._isMounted=false;
     this.positionWatcher=null;
     this.state={
       order:props.order,
       connection:props.connection,
       currentLat:null,
       currentLng:null,
     }
   }

   updateOrder(){
     let order = this.state.order;
     order.stage= "INACTIVE";
     console.log(order);
     Yeat.updateOrder(order);
     this.props.resetCurrentOrder();
   }


  componentDidMount() {
    this._isMounted =true;
    if ("geolocation" in navigator && this._isMounted) {
     this.positionWatcher= navigator.geolocation.watchPosition((position)=>
      {
        this.setState({currentLat:position.coords.latitude,
          currentLng:position.coords.longitude})
          this.state.connection.invoke("SendLocation", position.coords.latitude,position.coords.longitude,this.state.order);
        })
    }
  }
  componentWillUnmount(){
    this._isMounted=false;
    navigator.geolocation.clearWatch(this.positionWatcher);
  }
  render() {
    return (
      <Map google={this.props.google} zoom={14}
                initialCenter={{ lat: this.props.order.deliveryLat, lng: this.props.order.deliveryLng }}
      >
        <Marker position={{  lat: this.props.order.deliveryLat, lng: this.props.order.deliveryLng }}
        title="Delivery Address"
        
          icon={{
            url: "https://lh3.googleusercontent.com/proxy/IYlpwf47okoP6DpZgAtP59To7etUoN5uFsfsOf7g8KQZebDalmXQw6U_qKeIFrhtrUZ2DHM9TiZrCJ20FpWLf0osC5WBYP_NNcLS7AtYPaN_FjQij-Ky9-fNwA" ,
            anchor: new window.google.maps.Point(36,36),
            scaledSize: new window.google.maps.Size(34,34)
          }}  
        />

        <Marker position={{  lat: this.props.order.restaurant.restaurantLat, lng:  this.props.order.restaurant.restaurantLng }}
        />

        <Marker position={{  lat: this.state.currentLat , lng:  this.state.currentLng }} //courier address
         icon={{
          url: "https://lh3.googleusercontent.com/proxy/HraTW0qVX4g_oYRYIx-voq93tlcKBtEZ9qnaISzNeMO3zNe4MZtnYRbVL02cVeXOO3CguaNiFF2AuQ2uLeeKErLqhKgKYXxe_CET_pY",
          anchor: new window.google.maps.Point(36,36),
          scaledSize: new window.google.maps.Size(34,34)
        }}  
      
        />

        <button id="deliverOrderButton"
        onClick={()=>this.updateOrder()}>ORDER DELIVERED</button>
        
      </Map>
    );
  }
}

 
const GoogleMap=GoogleApiWrapper({
  apiKey: (googleApi.GOOGLE_API_KEY)
})(MapContainer);
export default GoogleMap;
