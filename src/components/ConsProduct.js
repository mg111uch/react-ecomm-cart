import React from 'react';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import CardMedia from '@mui/material/CardMedia';
import Zoom from '@mui/material/Zoom';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CartContext } from '../CartContext';
import { ChangeQuantity } from './CartMgmt';

export function CProduct({item}) {

  const { items,addItemToCart } = React.useContext(CartContext);

  const [added, setAdded] = React.useState()
  const [itemprop, setItemprop] = React.useState(item)

  React.useEffect(()=>{
    const has_item = items.find((item_) => (item_.id === item.id));
    has_item ? setAdded(true) : setAdded(false)
    has_item && setItemprop({...item, qty:has_item.qty}) 
  },[items,item])

  const handleSubmit = e => {
    e.preventDefault();
    addItemToCart(item.id);
    setAdded(state => !state)
  }

  return (
    <div>
    <Card sx={{ display: 'flex', bgcolor:'lightgrey' }} >
      {/* <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="./assets/products/car-101.jpg"
        alt="Live from space album cover"
      /> */}
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" component="div">
            Price: Rs {item.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip 
              title="Add to favorites" 
              placement="top" 
              TransitionComponent={Zoom} 
              arrow>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          {!added ? (
            <Tooltip 
              title="Add to Cart" 
              placement="top" 
              TransitionComponent={Zoom} 
              arrow>
                <Button 
                  variant='contained' 
                  endIcon={<AddShoppingCartIcon />}
                  onClick={handleSubmit}>Add</Button>
            </Tooltip>
          ) : (
            <ChangeQuantity _item={itemprop}/>
          )}
          
        </CardActions>
    </Card>
    <br></br>
    </div>
  );
}
 