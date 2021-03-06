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
       viewItems:false
     }
   }

   async  updateOrder(){
    // navigator.geolocation.clearWatch(this.positionWatcher);
    
     await this.state.connection.invoke("FinishedOrder" , this.state.order);
     let orderToUpdate=
     { ...this.state.order,
       stage:"INACTIVE" } ;

     await Yeat.updateOrder(orderToUpdate);
  
     this.props.resetCurrentOrder();
  
      
   }


  componentDidMount() {
    console.log(this.state)
    // this.state.connection.invoke("TakeOrder", this.state.order)

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
            url: "https://i.imgur.com/VACWIpX.png" ,
            anchor: new window.google.maps.Point(36,36),
            scaledSize: new window.google.maps.Size(34,34)
          }}  
        />

        <Marker position={{  lat: this.props.order.restaurant.restaurantLat, lng:  this.props.order.restaurant.restaurantLng }}
        />

        <Marker position={{  lat: this.state.currentLat , lng:  this.state.currentLng }} //courier address
         icon={{
          url: "https://i.imgur.com/qkHG3BF.png",
          anchor: new window.google.maps.Point(36,36),
          scaledSize: new window.google.maps.Size(34,34)
        }}  
      
        />

        <button id="deliverOrderButton" className="mapsButton"
        onClick={ async ()=>this.updateOrder()}>ORDER DELIVERED</button>

      {this.state.viewItems
      ? <div id="mapsItemsMenu">
      {this.state.order.orderItems.map(orderItem=>{
        return <div >
                <p>{orderItem.quantity} {orderItem.item.name}</p>
                
              </div>
        }
        )}
        <button id="ExitShowItems" className="mapsButton"
        onClick={()=>this.setState({viewItems:false})}>Exit</button>

        </div>
      : <button id="showItems" className="mapsButton"
      onClick={()=>this.setState({viewItems:true})}>Show Items</button>
      }

      </Map>
        
    );
  }
}


 
const GoogleMap=GoogleApiWrapper({
  apiKey: (googleApi.GOOGLE_API_KEY)
})(MapContainer);
export default GoogleMap;

