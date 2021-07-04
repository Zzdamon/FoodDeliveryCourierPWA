import React from 'react';
import OrderItem from './OrderItem';

function OrdersList(props) {
    const { orders } = props;

    return (
        <div className="container-min-max-width align-self-center d-flex flex-column my-4">
            { orders.map((order) => {
                return <OrderItem className="container-min-max-width m-2"
                user= {props.user}
                   order={order}
                    connection={props.connection}
                    key={order.orderId}
                    addTakenOrderToState={props.addTakenOrderToState}
                />
            })}
        </div>
    );
}

export default OrdersList;