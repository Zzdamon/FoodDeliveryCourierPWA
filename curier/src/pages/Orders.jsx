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
      this.addTakenOrderToState=this.addTakenOrderToState.bind(this);

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
      if(!this.state.user.data)
        return;
      this.start();
      Yeat.getCurrentOrder(this.state.user.data.courierId)
      .then(order => this.setState({currentOrder:order}))

      Yeat.fetchWaitingOrders()
      .then(orders=> this.setState({orders:orders}))
    }
  
    removeOrder(orderToRemove){
      let orders= this.state.orders;
      const resultedOrders= orders.filter(order=>order.orderId!= orderToRemove.orderId);
      this.setState({orders:resultedOrders});
    }

    //method to start connection with signalR
    start=async ()=> {
      try {
          await this.state.connection.start();
          this.state.connection.on("NewOrder",(order) => this.addNewOrder(order) ) ;
          this.state.connection.on("ExpiredOrder",(order) => this.removeOrder(order) ) ;

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
     addTakenOrderToState(order,connection){
      // this.setState({currentOrder:order});
      // order.courierId= this.state.user.data.courierId;
      // // this.setState({currentOrder:order});
      //  Yeat.updateOrder(order)
      // .then(order=>{
      //   connection.invoke("TakeOrder", order)
              this.setState({currentOrder:order});
              // return order;


        // })
      // .catch(error=>console.log(error))
    }

    async resetCurrentOrder(){
      console.log(this.state.currentOrder)
      let order= this.state.currentOrder
      // await this.state.connection.invoke("FinishedOrder", this.state.currentOrder)

      this.setState({currentOrder:null});
      
      Yeat.fetchWaitingOrders()
      .then(orders=> this.setState({orders:orders}))
    }
  
    render(){
      console.log(this.state)
      if(!this.state.user.data){
        this.props.history.push('/login');
      }

      if(this.state.currentOrder){ 
        return(
          <GoogleMap order={this.state.currentOrder}
          connection={this.state.connection}
          resetCurrentOrder={()=>this.resetCurrentOrder()}
          />
        )
      }

      if( this.state.orders.length > 0 ){ 
          return (
            < Layout >
              <OrdersList orders={this.state.orders} 
              connection={this.state.connection}
              addTakenOrderToState={(order)=>this.addTakenOrderToState(order)}
              user= {this.state.user} />
            </ Layout>
          );}
        
        else {
          return (
            <Layout>
                <div className="d-flex w-100 flex-column  align-items-center">
                  <h3>There are no available orders at this moment</h3>
                </div>
          </Layout>
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