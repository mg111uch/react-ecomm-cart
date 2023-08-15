import React from 'react';
import TabsComponent from './components/Tabs.js';
import { SignInPage } from './screens/SignIn.js'; 
import { CartProvider } from './CartContext.js';
import { BrowserRouter as Router, 
  Routes, Route} from "react-router-dom";
import AppBarDrawer from './components/Appbar.js';
import { Categories } from './screens/CategoryList.js';

function App() {
  return (
    <CartProvider>
      <Router>
        <AppBarDrawer /> 
        <Routes>
          <Route exact path='/' element={<SignInPage />}></Route>
          <Route exact path='/consumer' element={<TabsComponent pageSelect={'Consumer'}/>}></Route>
          <Route exact path='/bussiness' element={<TabsComponent pageSelect={'Bussiness'}/>}></Route>
          <Route exact path='/delivery' element={<TabsComponent pageSelect={'Delivery'}/>}></Route>
          <Route exact path='/categories' element={<Categories/>}></Route>
        </Routes> 
      </Router> 
    </CartProvider>
  );
}

export default App; 