import React from 'react';
import Box from '@mui/material/Box';
import { Tab,Tabs } from "@mui/material";
import { ProductsList } from '../screens/ProductsList.js';
import { CartPage } from '../screens/Cart.js'; 
import { BussAddProducts } from '../screens/AddProduct.js';
import { BussOrdersPage } from '../screens/OrdersPage.js';
import { DeliveryOrder } from '../screens/DeliveryOrder.js';
import { DeliveryPnL } from '../screens/DeliveryPnL.js';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


export default function TabsComponent({pageSelect}) {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
      };

    return(pageSelect!=='SignIn' && (
            <Box sx={{ flexGrow: 1 }}>
                <Tabs 
                    value={tabIndex} 
                    onChange={handleTabChange}
                    variant="fullWidth"
                    textColor="secondary"
                    indicatorColor="secondary">
                    <Tab icon={<InboxIcon />} iconPosition="start" label="Product List" />
                    <Tab icon={<MailIcon />} iconPosition="start" label="Cart / Orders" />
                </Tabs>
                <Box sx={{ padding: 2 }}>
                    {(tabIndex === 0 && pageSelect==='Consumer') && (<ProductsList />)}
                    {(tabIndex === 1 && pageSelect==='Consumer') && (<CartPage />)}
                    {(tabIndex === 0 && pageSelect==='Bussiness') && (<BussAddProducts />)}
                    {(tabIndex === 1 && pageSelect==='Bussiness') && (<BussOrdersPage />)}
                    {(tabIndex === 0 && pageSelect==='Delivery') && (<DeliveryPnL />)}
                    {(tabIndex === 1 && pageSelect==='Delivery') && (<DeliveryOrder />)}
                </Box>
            </Box>
        )
    )
}