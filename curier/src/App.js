import logo from './logo.svg';
import './App.css';
import React from 'react';
import { HubConnection } from 'signalr-client-react';
import { HubConnectionBuilder } from '@microsoft/signalr';

// let connection = new HubConnection('/chat');
 
// connection.on('NewOrder', data => {
//     console.log(data);
// });

//TO SEND ORDER FROM CLIENT :
// connection.invoke("AddOrder", order).catch(function (err) {
  // return console.error(err.toString());
 
// connection.start();

class App extends React.Component {

  constructor(props){
    super(props);

    this.state={
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
  }

  start=async ()=> {
    try {
        await this.state.connection.start();
        this.state.connection.on("NewOrder",(order) => this.addNewOrder(order) ) ;
        console.log("SignalR Connected.");

        this.state.connection.invoke("JoinRoom", "couriers")
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
    return (
      <div className="App">
      
      </div>
    );
  }

  

}

export default App;
