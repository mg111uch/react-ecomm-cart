import React from 'react';
import { getProduct } from './services/ProductsService.js';

export const CartContext = React.createContext();

export function CartProvider(props) {
  const [items, setItems] = React.useState([]);
  const [auth, setAuth] = React.useState('')

  function addItemToCart(id) { 
    const product = getProduct(id);
    setItems((prevItems) => {
      const item = prevItems.find((item) => (item.id === id));
      if(!item) {
        console.log('Added item: ',product)
        return [...prevItems, {
            id,
            qty: 1, 
            product: product.data.name,
            totalPrice: product.data.price 
        }];
      }
      else { 
        alert('This item is already in cart!!')
        return [...prevItems];
      }
    });
  }

  function increaseQuantity(id) {
    const product = getProduct(id);
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if(item.id === id) {
          item.qty++;
          item.totalPrice += product.data.price;
        }
        return item;
      });
    });
  }

  function decreaseQuantity(id) {
    const product = getProduct(id);
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if(item.id === id) {
          if(item.qty > 1){
            item.qty--;
            item.totalPrice -= product.data.price;
          }
        }
        return item;
      });
    });
  }

  function removeCartItem(id) {
    setItems((prevItems) => {
      const _item = prevItems.find((item) => (item.id === id));
      return prevItems.filter((item) => item !== _item);
    });
  }

  function getItemsCount() {
    return items.reduce((sum, item) => (sum + item.qty), 0);
  }
  
  function getTotalPrice() {
    return items.reduce((sum, item) => (sum + item.totalPrice), 0);
  }  
  
  return (
    <CartContext.Provider 
      value={{items, setItems, 
              auth, setAuth,
              getItemsCount, 
              addItemToCart,
              increaseQuantity, 
              decreaseQuantity, 
              removeCartItem,
              getTotalPrice}}>
      {props.children}
    </CartContext.Provider>
  );
}