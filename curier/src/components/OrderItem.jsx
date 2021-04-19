import React from 'react'

export default function OrderItem(props) {
    const {connection,order,addTakenOrderToState} = props;
    console.log(addTakenOrderToState);
    return (
        <div>
            <h5>Delivery: {order.deliveryAddress}</h5>
            <h5>Restaurant: {order.restaurant.name}</h5>
            <h6>Address: {order.restaurant.address}</h6>

            <button onClick={()=>TakeOrder(order,connection,addTakenOrderToState)} >Take Order</button>
        </div>
    )
}

function TakeOrder(order,connection,addTakenOrderToState){
    connection.invoke("TakeOrder", order);
    addTakenOrderToState(order);
}