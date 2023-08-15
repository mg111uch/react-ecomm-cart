import React from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CartContext } from '../CartContext';
import { getCategories } from '../services/CategoryService';
import { BProduct } from '../components/BussProduct';

export function BussAddProducts () {
    const [_name, setName] = React.useState('')
    const [_price, setPrice] = React.useState('')
    const [cat, setCat] = React.useState('');
    const [subcat, setSubCat] = React.useState('');
    const [subcatlist, setSubCatList] = React.useState([]);
    const [items, setItems] = React.useState([]);

    const {auth} = React.useContext(CartContext);

    const CATEGORIES = getCategories();

    React.useEffect(() => {
      const getProducts = {
        user: auth,
      }
      axios
          .post("http://localhost:5000/getUserItems", 
                  JSON.stringify(getProducts), 
                  {headers: {'Content-Type': 'application/json'}})
          .then(res => setItems(res.data))
    },[auth])

    const handleSubmit = (e) => {
      e.preventDefault();
      const productData = {
          id: Date.now(),
          user: auth,
          cat: cat,
          subCat: subcat,
          name: _name.toString(),
          price: Number(_price)
      }
      console.log(productData)
      axios
          .post("http://localhost:5000/addItem", 
                  JSON.stringify(productData), 
                  {headers: {'Content-Type': 'application/json'}})
          .then(res => console.log(res.data))
      // setCat('')
      // setSubCat('')
      setName('')
      setPrice('')
    }

    const handleCatChange = (e,value) => {
      // e.preventDefault();
      const _item = CATEGORIES.find(item=>item.name===value)
      setCat(value)
      setSubCatList(_item.subs);
    }
    const handleSubCatChange = (e,value) => {
      // e.preventDefault();
      setSubCat(value)
    }
    
    
    return(
        <div>
        <Box sx={{ p:1 ,width: '100%' }}>
        <Grid container 
            spacing={2}
            // rowSpacing={2} 
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
        <Autocomplete size="small"
          disablePortal
          id="combo-box-demo"
          options={CATEGORIES.map((option) => option.name)}
          sx={{ width: 300 }}
          onChange={handleCatChange}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
        <Autocomplete size="small"
          disablePortal
          id="combo-box-demo2"
          options={subcatlist.map((option) => option.name)}
          sx={{ width: 300 }}
          onChange={handleSubCatChange}
          renderInput={(params) => <TextField {...params} label="Sub-Category" />}
        />
        </Grid>
        <br></br>
        <TextField 
              id="name" 
              label="Product name" 
              variant="outlined"
              size="small"
              value={_name}
              onChange={e => setName(e.target.value)}
            />
        <TextField 
              id="price" 
              label="Product price" 
              variant="outlined"
              size="small"
              value={_price}
              onChange={e => setPrice(e.target.value)}
            />
        <Box component="span" sx={{ p: 1.5}}>
            <Button 
              onClick={handleSubmit}
              variant="contained" 
              color="primary">Add</Button>
        </Box>
        </Box>
        <div>
          {items.map(prod =>{ 
            return(
              <BProduct key={prod.data.id} item={prod} />
            );
          })}
        </div>
        </div>
    )
}