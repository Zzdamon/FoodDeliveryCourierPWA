import React from 'react';
import { HubConnection } from 'signalr-client-react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import OrdersList from '../components/OrdersList';
import Layout from '../components/Layout/Layout'
import * as Yeat from '../apis/yeat/yeat';
import { connect } from 'react-redux';

class Orders extends React.Component {

    constructor(props){
      super(props);
  
      this.state={
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
      this.start();
      Yeat.fetchWaitingOrders()
      .then(orders=> this.setState({orders:orders}))
    }
  
    start=async ()=> {
      try {
          await this.state.connection.start();
          this.state.connection.on("NewOrder",(order) => this.addNewOrder(order) ) ;
          console.log("SignalR Connected.");
  
          this.state.connection.invoke("JoinRoom", "couriers",1232)
          // .catch(function (err) {
          //   return console.error(err.toString());})
          } 
    
      catch (err) {
        console.log(err);     
      }
    
    };
  
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
  
    render(){
      console.log(this.state)
      if(!this.state.user){
        this.props.history.push('/login');
      }
      return (
        < Layout >
          <OrdersList orders={this.state.orders} connection={this.state.connection} />
        </ Layout>
      );
    }
  
    
  
  }
  function mapStateToProps(state) {
    return {
        user: state.user.data
    }
}


  export default connect(mapStateToProps)(Orders);  