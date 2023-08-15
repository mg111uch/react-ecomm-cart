import React from 'react';
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartContext } from '../CartContext';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

export function ChangeQuantity ({_item}) {
    const {
        increaseQuantity, 
        decreaseQuantity, 
        removeCartItem,} = React.useContext(CartContext);

    const handleIncrease = e => {
        e.preventDefault();
        increaseQuantity(_item.id);
    }
    const handleDecrease = e => {
        e.preventDefault();
        decreaseQuantity(_item.id);
    }
    const handleRemove = e => {
        e.preventDefault();
        removeCartItem(_item.id);
    }
    return(
        <Stack direction="row" spacing={2}>
            <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
            <Tooltip 
                title="Decrease Qty" 
                placement="top" 
                TransitionComponent={Zoom} 
                arrow>
                <Button onClick={handleDecrease}>-</Button>
            </Tooltip>
            <Tooltip 
                title="Quantity" 
                placement="top" 
                TransitionComponent={Zoom} 
                arrow>
                <Button >{_item.qty}</Button>
            </Tooltip>
            <Tooltip 
                title="Increase Qty" 
                placement="top" 
                TransitionComponent={Zoom} 
                arrow>
                <Button onClick={handleIncrease}>+</Button>
            </Tooltip>
            </ButtonGroup>
            <Tooltip 
                title="Remove from cart" 
                placement="top" 
                TransitionComponent={Zoom} 
                arrow>
            <IconButton onClick={handleRemove} 
                    size="small" 
                    color="error">
                <DeleteIcon fontSize="large"/>
            </IconButton>
            </Tooltip>
        </Stack>
    )
}