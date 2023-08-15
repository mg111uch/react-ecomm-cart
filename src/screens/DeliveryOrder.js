import React from 'react';
import axios from "axios";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';

export function DeliveryOrder () {
  const [order, setOrder] = React.useState([])
  const [accept, setAccept] = React.useState(false)
  const [deliver, setDeliver] = React.useState(false)

  const customConfig = {
    headers: {
    'Content-Type': 'application/json'
    } 
  };

  React.useEffect(() => {
    const fetchDelivery = async () => {
      var ORDER = await fetch("http://localhost:5000/getDelivery")
        .then(res => res.json())
      setOrder(ORDER); 
      console.log(ORDER);
    }
    fetchDelivery();
  },[]); 
  
  const OrderComponent = (_order) => {
    // console.log('Component:',_order)
    if(_order.value.length !== 0 ){
      return(
        <div>
          <Typography variant="h5" align="center">New Delivery Order</Typography>
          <ul>
            <li>
              <Typography variant="h6">
                OrderID: {_order.value.OrderID}
              </Typography>
            </li>
            <li>
              <Typography variant="h6">
                Location: {_order.value.Location}
              </Typography>
            </li>
            <li>
              <Typography variant="h6">
                Amount: {_order.value.Amount}
              </Typography>
            </li>
          </ul>
        </div>
      )
    } else {
      return(
        <Typography variant="h6" align="center">No Order</Typography>
      )
    }
  }

  return (
    <div>
      <OrderComponent value={order}/>
      {(order.length!==0 && !accept) && (
        <Stack direction="row" spacing={2}>
          <Button 
          onClick={function(e){
            e.preventDefault();
            const orderData = {
              orderID: Number(order.OrderID),
              orderStatus: 'isAccepted'
            } 
            axios
                .post("http://localhost:5000/orderAccepted", 
                        JSON.stringify(orderData), 
                        customConfig)
                .then(res => console.log(res.data))
            setAccept(true)
            setDeliver(false)
          }}
          variant="contained" 
          size="large"
          color="success">Accept</Button>
          <Button 
            onClick={function(e){
              e.preventDefault();
              const orderData = {
                orderID: Number(order.OrderID),
                orderStatus: 'isRejected'
              } 
              axios
                  .post("http://localhost:5000/orderRejected", 
                          JSON.stringify(orderData), 
                          customConfig)
                  .then(res => console.log(res.data))
              setOrder([])
            }}
            variant="contained" 
            size="large"
            color="error">Reject</Button>
      </Stack>
      )}
      {(accept && !deliver) && (
        <div>
          <Button 
          onClick={function(e){
            e.preventDefault();
            const orderData = {
              orderID: Number(order.OrderID),
              orderStatus: 'isDelivered'
            } 
            axios
                .post("http://localhost:5000/orderDelivered", 
                        JSON.stringify(orderData), 
                        customConfig)
                .then(res => console.log(res.data))
            setDeliver(true)
            setAccept(false)
            setOrder([])
          }}
          variant="contained" 
          size="large"
          color="primary">Delivered</Button>
      </div>
      )}
      
    </div>
  );
}