import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import Autocomplete from '@mui/material/Autocomplete';
import { CProduct } from '../components/ConsProduct.js';
import { getProducts } from '../services/ProductsService.js';
import { getCategories } from '../services/CategoryService';

export function ProductsList () {

  const [products, setProducts] = React.useState([]);
  const [cat, setCat] = React.useState('');
  const [subcat, setSubCat] = React.useState('');
  const [subcatlist, setSubCatList] = React.useState([]);

  const CATEGORIES = getCategories();
 
  React.useEffect(() => {
    const fetchfilterList = async () => {
      var PRODUCTS = await getProducts(cat,subcat)
      setProducts(PRODUCTS); 
    }
    subcat!=='' && fetchfilterList()

  },[cat,subcat]);    

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

  return (
    <div>
      {/* <div> */}
      
      <Box sx={{ p:1 ,width: '100%' }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
        <Button 
          variant="contained" 
          color="primary">Filter</Button>
      </Grid>
      </Box>
      {/* </div> */}
      
      {products.map(prod =>{
        return(
          <CProduct key={prod.data.id} item={prod.data} />
        );
      })}
    </div>
  );
}
