import React from 'react';
import { CartContext } from '../CartContext';
import { ProceedToPay } from '../services/Payments';
import { Typography } from '@mui/material';
import { ChangeQuantity } from '../components/CartMgmt';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

export function CartPage () {

  const {items,
        getTotalPrice} = React.useContext(CartContext);
  
  function Totals() {
    let [total, setTotal] = React.useState(0);
    React.useEffect(() => {
      setTotal(getTotalPrice());
    },[]);
    return (
      <div>
        <Typography variant="h4">Total: Rs {total}</Typography>
        <br></br>
        {total>0 && (<ProceedToPay totalAmount={total}/>)}
      </div>
    );
  }

  function CartItems() {
    console.log('Cart item: ',items)
    return (
      <div>
        {items.map(item =>{ 
          return(
            <div key={item.id}>
              <Card sx={{ display: 'flex', bgcolor:'lightgrey' }} >
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {item.product}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" component="div">
                    Price: Rs {item.totalPrice}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <ChangeQuantity _item={item}/>
                  </CardActions>
              </Card>
              <br></br>
            </div>
          );
        })}
      </div>
    )
  }

  return (
    <div>
      <CartItems />
      <Totals />
    </div>
  );
}