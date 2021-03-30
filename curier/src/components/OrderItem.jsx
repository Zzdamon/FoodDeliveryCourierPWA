import React from 'react'

export default function OrderItem(props) {
    const {connection,order} = props;
    return (
        <div>
            <h5>{order.deliveryAddress}</h5>
            <button onClick={()=>TakeOrder(order,connection)} >Take Order</button>
        </div>
    )
}

function TakeOrder(order,connection){
    connection.invoke("TakeOrder", order);
}