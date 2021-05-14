import React from 'react';
import { HubConnection } from 'signalr-client-react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import OrdersList from '../components/OrdersList';
import Layout from '../components/Layout/Layout'
import * as Yeat from '../apis/yeat/yeat';
import { connect } from 'react-redux';
import GoogleMap, { MapContainer } from '../apis/google maps/maps';

class Orders extends React.Component {

    constructor(props){
      super(props);
  
      this.resetCurrentOrder=this.resetCurrentOrder.bind(this);

      this.state={
        currentOrder:null,
        user: props.user,
        orders:[],
        takenOrder:null,
        connection: new HubConnectionBuilder()
              .withUrl('http://localhost:5000/hubs/OrdersHub')
              .withAutomaticReconnect()
              .build()
      }
    }
  
    componentDidMount(){
      if(!this.state.user)
        return;
      this.start();
      Yeat.fetchWaitingOrders()
      .then(orders=> this.setState({orders:orders}))
    }
  
    //method to start connection with signalR
    start=async ()=> {
      try {
          await this.state.connection.start();
          this.state.connection.on("NewOrder",(order) => this.addNewOrder(order) ) ;
          console.log("SignalR Connected.");
  
          this.state.connection.invoke("JoinRoom", "couriers",this.state.user.data.courierId)
          // .catch(function (err) {
          //   return console.error(err.toString());})
          } 
    
      catch (err) {
        console.log(err);     
      }
    
    };
  
    //Add new placed order to list in state
    addNewOrder(order){
      this.setState(prevState=>
        {return {
          orders: [
            ...prevState.orders,
            order
          ]
        }});
                 
      console.log(this.state.orders)
    }

    //method to add taken order to state
    addTakenOrderToState(order){
      this.setState({currentOrder:order});
      order.courierId= this.state.user.data.courierId;
      Yeat.updateOrder(order)
      .then(data=>console.log(data))
      .catch(error=>console.log(error))
    }

    resetCurrentOrder(){
      this.setState({currentOrder:null});
      Yeat.fetchWaitingOrders()
      .then(orders=> this.setState({orders:orders}))
    }
  
    render(){
      console.log(this.state)
      if(!this.state.user.data){
        this.props.history.push('/login');
      }
    if(!this.state.currentOrder){
      return (
        < Layout >
          <OrdersList orders={this.state.orders} 
          connection={this.state.connection}
          addTakenOrderToState={(order)=>this.addTakenOrderToState(order)} />
        </ Layout>
      );}
      else {
        return(
          <GoogleMap order={this.state.currentOrder}
          connection={this.state.connection}
          resetCurrentOrder={()=>this.resetCurrentOrder()}
          />
          
        )
      }
    }
  }
  

  function mapStateToProps(state) {
    return {
        user: state.user
    }
  }


  export default connect(mapStateToProps)(Orders);  