import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Switch, Route } from "react-router-dom";
// import { HubConnection } from 'signalr-client-react';
// import { HubConnectionBuilder } from '@microsoft/signalr';
// import OrdersList from './components/OrdersList';
// import * as Yeat from './apis/yeat/yeat';
import Orders from './pages/Orders';
import Login from './pages/Login/Login';
import Page404 from './pages/Page404';
import MyAccount from './pages/MyAccount';


// let connection = new HubConnection('/chat');
 
// connection.on('NewOrder', data => {
//     console.log(data);
// });

//TO SEND ORDER FROM CLIENT :
// connection.invoke("AddOrder", order).catch(function (err) {
  // return console.error(err.toString());
 
// connection.start();
export default function App(){
  return(
    <div className="app">
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/my-account" component={MyAccount}/>
        <Route exact path="/" component={Orders}/>
        <Route path="*" component={Page404}/>
      </Switch>
    </div>
  );
}
