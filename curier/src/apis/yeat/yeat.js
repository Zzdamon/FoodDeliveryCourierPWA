export const fetchWaitingOrders= 
    ()=>
{  
    return fetch("http://localhost:5000/api/orders/waiting")
    .then(orders=> orders.json())

}