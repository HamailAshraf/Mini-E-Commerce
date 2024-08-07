'use client';
import { Card } from '@/components/Card';
import { Footer } from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios';
import { UserContext } from '@/context/UserContext';
import { Cart } from '@/components/Cart';
import { getSearch } from '@/components/GetSearch';
import { useRouter } from 'next/navigation';

const WelcomePage = () => {
  const [data, setData] = useState([]);
  const {token} = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:4000/items', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log("Response data: ", response.data);
    } catch (error) {
      console.log("Error fetching data: ", error.message);
    }
  };

  const handleSearch = async (search) => {
    try {
        // if (!search.name || search.name.length < 3) {
        //     fetchData();
        //     return;
        // }
        const userData = await getSearch(search, token);
        console.log("User Data: ", userData);
        setData(userData ? userData.map(item => ({ ...item })) : []); 
        console.log("Data at handle: ", data);
    } catch (error) {
        console.log("Error fetching user: ", error.message);
    }
};

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
  }
}, [router]);

useEffect(() => {
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function (event) {
     history.go(1);
 }
}, []);

  useEffect(() => {
    fetchData();
  }, [token, cartItems]);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  const addToCart = (cartPrice, name, qty) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.name === name);
      if (itemIndex !== -1) {
        const updatedItems = prevItems.map((item, index) => {
          if (index === itemIndex) {
            return {
              ...item,
              qty: item.qty + qty,
              cartPrice: (item.qty + qty) * item.price,
            };
          }
          return item;
        });
        return updatedItems;
      } else {
        return [
          ...prevItems,
          { cartPrice: cartPrice, name: name, qty: qty, price: cartPrice / qty },
        ];
      }
    });
};

  // console.log("Data is: ", data);

  return (
    <div>
      <Navbar setSearch={setSearch}/>
      <div className='flex justify-end'>
        <Cart items={cartItems} setItems={setCartItems}/>
      </div>
      <div className='p-6 flex flex-row gap-16 justify-start  flex-wrap'>
        {data.length > 0 ? (
          data.map((item, index) =>  (
            <div key={index} className="">
            <Card image={item.images} name={item.name} desc={item.description} qty={item.stock_quantity} price={item.price} addToCart={addToCart}/>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No data available</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default WelcomePage
