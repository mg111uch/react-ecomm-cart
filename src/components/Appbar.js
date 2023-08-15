import React from 'react';
import { CartContext } from '../CartContext';
import {useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {
  Drawer,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from "@mui/material";
import { Link } from 'react-router-dom';

const drawerData = [
  { name: 'Consumer',icon: <InboxIcon />, link:'/consumer'},
  { name: 'Bussiness', icon: <MailIcon /> ,link:'/bussiness'},
  { name: 'Delivery', icon: <MenuIcon /> ,link:'/delivery'},
  { name: 'Categories', icon: <MenuIcon /> ,link:'/categories'},
];

export default function AppBarDrawer() {
  const navigate = useNavigate();
  const [drawerOpen, setOpen] = React.useState(false);
  const [pageName, setPageName] = React.useState('SignIn');

  const {auth, setAuth} = React.useContext(CartContext);

  const styles = {
    link: {
      color: 'black',
      textDecoration: 'none',
    }
  };
  
  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {drawerData.map((item, index) => (
        <Link to={item.link} key={index} style={styles.link}>
          <ListItem >
            <ListItemButton onClick={() => setPageName(item.name)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </Link>
      ))}
    </div>
  );

  const handleLogout = () => {
    setAuth(false)
    setPageName('SignIn')
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={drawerOpen} anchor={"left"} onClose={() => setOpen(false)}>
          {getList()}
          </Drawer>
          <Typography variant='h5'>{pageName}</Typography>            
          <h1 align="center" style={{color: '#323576', flexGrow: 1, }}>Flow</h1>
          {auth && 
            <Button 
              variant='contained'
              onClick={handleLogout}
              >
                Log Out
            </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}