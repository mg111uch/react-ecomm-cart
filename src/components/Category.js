import React from 'react';
import {useNavigate} from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export function CategoryComponent({item}){
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(item.link)
    }

    return(
        <Grid item xs={6}>
            <Item>
                <Button fullWidth
                variant='outlined'
                onClick={handleClick}
                >                       
                <Typography component="div" variant="h5">
                    {item.name}
                </Typography>
                </Button>
            </Item>
        </Grid>
    )
}