import React from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

export function BussOrdersPage () {
  const [orders, setOrders] = React.useState([])
  const [ready, setReady] = React.useState([])

  const customConfig = {
    headers: {
    'Content-Type': 'application/json'
    } 
  };

  React.useEffect(() => {
    const fetchOrders = async () => {
      var ORDERS = await fetch("http://localhost:5000/orders")
        .then(res => res.json())
      setOrders(ORDERS); 
    }
    fetchOrders();

    // const ws = new WebSocket("ws://localhost:8080");
    // const client_msg = {msg: "Client says connected !!"};
    // ws.onopen = () => {
    //     ws.send(JSON.stringify(client_msg));
    // };
    // ws.onmessage = (e) =>{
    //     const received_msg = JSON.parse(e.data);
    //     // console.log(received_msg);
    //     setOrders(received_msg);
    // };
    // return () => ws.close();  //clean up function
  },[])
  
  
  function createTableData(name, qty) {
    return { name, qty };
  }

  function DrawTables (propData) {
    const rows = propData.value.map(item =>{
        return(createTableData(item.product, item.qty))
    })
    return(
      <TableContainer sx={{ width: '95%',bgcolor: "lightgrey"}} component={Paper}>
        <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
          <TableHead> 
            <TableRow sx={{bgcolor: "yellow"}}>
              <TableCell>
                <Typography component="div" sx={{textDecoration: 'underline'}}>
                  <Box sx={{ fontWeight: 'bold' }}>ItemName</Box>
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="div" sx={{textDecoration: 'underline'}}>
                  <Box sx={{ fontWeight: 'bold' }}>Quantity</Box>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )
  }

  return (
    <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" align="center">
              {orders.length!==0 ? ('Waiting Orders: '+orders.length) : 'No Orders'}
            </Typography>
            <br></br>
            <div>
              {orders ? orders.map(order =>{
                  return(
                    <div key={order.id}>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <Typography variant="h6">
                            OrderSize: Rs {order.data.TotalPrice}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Button 
                            onClick={function(e){
                              e.preventDefault();
                              const orderData = {
                                OrderID: Number(order.id),
                                orderStatus: 'isReady',
                                Location: 'Restaurant Location'
                              } 
                              axios
                                  .post("http://localhost:5000/orderReady", 
                                          JSON.stringify(orderData), 
                                          customConfig)
                                  .then(res => console.log(res.data))
                              const _ready = orders.find((_order) => (_order.id === order.id))
                              setOrders(orders.filter(e => e !== _ready))
                              setReady(() =>{
                                const new_ready = [...ready,_ready]
                                return new_ready
                              })
                            }}
                            variant="contained" 
                            size="small"
                            color="primary">Ready</Button>
                        </Grid>
                      </Grid>
                      
                      <DrawTables key={order.id} value={order.data.CartItems}/>
                      <br></br>
                    </div>
                  ) 
                })
              : ''}
            </div>
          </Grid>
          <Divider orientation="vertical" flexItem></Divider>
          <Grid item xs>
            <Typography variant="h5" align="center">
              {ready.length!==0 ?('Ready Orders: '+ready.length):'No Ready Orders'}
            </Typography>
            <br></br>
            <div>
              {ready ? ready.map(order =>{
                  return(
                    <div key={order.id}>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <Typography variant="h6">
                            OrderID: {order.id}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Button 
                            onClick={function(e){
                              e.preventDefault();
                              const orderData = {
                                OrderID: Number(order.id),
                                orderStatus: 'isPicked'
                              } 
                              axios
                                  .post("http://localhost:5000/orderPicked", 
                                          JSON.stringify(orderData), 
                                          customConfig)
                                  .then(res => console.log(res.data))
                              const _picked = ready.find((_order) => (_order.id === order.id))
                              setReady(ready.filter(e => e !== _picked))
                            }}
                            variant="contained" 
                            size="small"
                            color="primary">Picked</Button>
                        </Grid>
                      </Grid>
                      <DrawTables key={order.id} value={order.data.CartItems}/>
                      <br></br>
                    </div>
                  ) 
                })
              : ''}
            </div>
          </Grid>
        </Grid>
    </div>
  );
}