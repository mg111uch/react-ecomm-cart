import React from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Zoom from '@mui/material/Zoom';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

export function BProduct({item}) {

  const handleRemove = (e) => {
    e.preventDefault();
    const removeData = {
      id: item.id,
    }
    axios
        .post("http://localhost:5000/deleteItem", 
                JSON.stringify(removeData), 
                {headers: {'Content-Type': 'application/json'}})
        .then(res => console.log(res.data))
  }

  return (
    <div>
    <Card sx={{ display: 'flex', bgcolor:'lightgrey' }} >
        <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
            {item.data.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" component="div">
            Price: Rs {item.data.price}
            </Typography>
            <Typography variant="h6" color="text.secondary" component="div">
            ID: {item.data.id}
            </Typography>
            <Typography variant="h6" color="text.secondary" component="div">
            Category: {item.data.cat} / {item.data.subCat}
            </Typography>
            
        </CardContent>
        <CardActions disableSpacing>
            <Tooltip 
            title="Remove Item" 
            placement="top" 
            TransitionComponent={Zoom} 
            arrow>
            <IconButton onClick={handleRemove} 
                    size="small" 
                    color="error">
                <DeleteIcon fontSize="large"/>
            </IconButton>
            </Tooltip>
        </CardActions>
    </Card>
    <br></br>
    </div>
  );
}
 