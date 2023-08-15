import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { CategoryComponent } from '../components/Category';
import { getCategories } from '../services/CategoryService';

export function Categories(){

    const catList = getCategories();

    return(
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {catList.map((item, index) => (
                    <CategoryComponent key={index} item={item}/>
                ))} 
            </Grid>
        </Box>
    )
}