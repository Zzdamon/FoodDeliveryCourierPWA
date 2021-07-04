import React from 'react'
import * as Yeat from '../apis/yeat/yeat';

export default function OrderItem(props) {
    const {connection,order,addTakenOrderToState,user} = props;
    console.log(addTakenOrderToState);
    return (
        <div className=" d-flex mx-2 p-3 pb-4 mb-2 d-flex flex-column align-items-center border  rounded">
            <h5>Delivery Address:</h5>
            <h6>{order.deliveryAddress}</h6>
            <h5>Restaurant:</h5>
            <h6> {order.restaurant.name}, {order.restaurant.address}</h6>
            <h6>Items:  </h6>
            {/* {order.orderItems[0].item.name} */}
            {           
                order.orderItems.map(item => {
                    return (
                        <div>
                            <p> {item.quantity} {item.item.name}</p>
                        </div>
                    )
                })
            }
            {/* <h6>Restaurant Address:</h6> */}
            {/* <h6>{order.restaurant.address}</h6> */}

            <button  className="btn mt-2 btn-outline-primary"
             onClick={async ()=>TakeOrder(order,connection,addTakenOrderToState,user)} >Take Order</button>
        </div>
    )
}

async function TakeOrder(order,connection,addTakenOrderToState,user){
    // let orderNew=Yeat.updateOrder(order);
    try {
        
        order.courierId= user.data.courierId;
        console.log(order)
    
        await connection.invoke("TakeOrder", order)
    
        await Yeat.updateOrder(order)
    
        addTakenOrderToState(order,connection)
    } catch (error) {
    console.log(error)        
    }

}