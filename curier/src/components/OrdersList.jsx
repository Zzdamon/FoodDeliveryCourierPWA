import React from 'react';
import OrderItem from './OrderItem';

function OrdersList(props) {
    const { orders } = props;

    return (
        <div className="container-fluid align-items-center d-flex flex-column my-4">
            { orders.map((order) => {
                return <OrderItem
                   order={order}
                    connection={props.connection}
                    key={order.id}
                />
            })}
        </div>
    );
}

export default OrdersList;