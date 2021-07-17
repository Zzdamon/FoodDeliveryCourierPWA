export const fetchWaitingOrders= 
    ()=>
{  
    return fetch("http://localhost:5000/api/orders/waiting")
    .then(orders=> orders.json())

}

export const updateOrder= 
  async  (order)=>
{  
    await fetch(`http://localhost:5000/api/orders/${order.orderId}`,
        {
            method: 'PUT', // or 'PUT'
            headers: {
                        'Content-Type': 'application/json',
                     },
            body: JSON.stringify(order),
        })
//   .then(response => response.json())
// return response

}




export const auth=(email, password)=>{
    const auth= {email, password};
    
    return fetch('http://localhost:5000/api/Couriers/auth',
        {
            method: 'POST', // or 'PUT'
            headers: {
                        'Content-Type': 'application/json',
                     },
            body: JSON.stringify(auth),
        })
  .then(response => response.json())
  
}

export const register=(email, password,firstName,lastName)=>{
    const user= {email, password,firstName,lastName};
    
    return fetch('http://localhost:5000/api/Couriers',
        {
            method: 'POST', // or 'PUT'
            headers: {
                        'Content-Type': 'application/json',
                     },
            body: JSON.stringify(user),
        })
  .then(response => response.json())
  
}

export const getCurrentOrder=(courierId)=>{
    // const auth= {email, password};
    
    return fetch(`http://localhost:5000/api/Orders/ActiveByCourier/${courierId}`)
    .then(response => response.json())
  
}
