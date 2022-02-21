import React, {useState, useEffect, useReducer} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';

import { ProductsContext} from './components/contexts/ProductsContext';

function App() {
  const [products, setProducts] = useState()
  // const cart = []

  useEffect(() => {
    const fetchProducts = async () => {
      const payload = await axios.get('https://fakestoreapi.com/products')
      setProducts(payload.data)
    }

    fetchProducts()
  }, [])

  // const addToCart = (id) => {
  //   const addedItem = products.find(product => product.id == id)
  //   addedItem.count = 1
  //   setCart(cart => [...cart, addedItem])
  // }

  function reducer(cart, action){
    switch(action.type){
      case 'addToCart':
        const foundItem = cart.findIndex(found => found.id === action.payload)
          if(foundItem != -1){
            console.log(cart[foundItem].quantity)
            cart[foundItem].quantity = cart[foundItem].quantity + 1
          }else{
            const addedItem = products.find(product => product.id === action.payload)
            addedItem.quantity = 1
            cart = [...cart, addedItem]
          }
          return cart

      case 'removeFromCart':
        return cart.filter(item => item.id !== action.payload)

      case 'emptyCart':
        return []
        
      default:
        return cart
    }
  }
  const [cart, dispatch] = useReducer(reducer, [])

  return (
    <div className="App">
      <BrowserRouter>
        <ProductsContext.Provider value={{products, cart, dispatch}}>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
        </ProductsContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
