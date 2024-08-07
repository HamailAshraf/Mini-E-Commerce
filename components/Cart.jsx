'use client';
import React, { useContext, useState, useEffect } from 'react';
import { BiSolidCartAlt } from "react-icons/bi";
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';           
import 'primeicons/primeicons.css';  
import { UserContext } from '@/context/UserContext';
import Axios from 'axios';

export const Cart = ({ items, setItems }) => {
    const [displayDialog, setDisplayDialog] = useState(false);
    const [id, setId] = useState(null);
    // const [data, setData] = useState({});

    const {token} = useContext(UserContext);
    useEffect(() => {
        const id = localStorage.getItem('id');
        if (id) {
          setId(id);
        }
      }, []);

    const onSubmiting = async () => {
        const orderItems = items.map(item => ({
            name: item.name,
            qty: item.qty,
            cartPrice: item.cartPrice,
        }));

        const orderData = {
            id,
            orderItems,
        };
        // setData(orderData);

        try {
        const response = await Axios.post('http://localhost:4000/items/order', orderData, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        console.log('Response', response.data);
        setItems([]);
        setDisplayDialog(false);
        } catch (error) {
        console.log("Error fetching data: ", error.message);
        }
    };

    const dialogFooter = (
        <div>
            <button onClick={() => setDisplayDialog(false)} className="p-button-text"></button>
        </div>
    );

    const totalAmount = items.reduce((total, item) => total+item.cartPrice, 0);
    

  return (
    <div className='p-6'>
      <BiSolidCartAlt size={28} onClick={() => setDisplayDialog(true)}/>
      <Dialog 
                header={<CustomUpdateHeader />} 
                visible={displayDialog} 
                style={{ width: '50vw' }} 
                footer={dialogFooter} 
                onHide={() => setDisplayDialog(false)}
            >
                <div className='p-4'>
                    {items.length === 0 ? (
                        <p>No items in cart.</p>
                    ) : (
                        items.map((item, index) => (
                            <div key={index}>
                                <p><strong>{item.name}</strong></p>
                                <p>Qty: {item.qty}</p>
                                <p>Total Price: ${item.cartPrice.toFixed(2)}</p>
                            </div>
                        ))
                    )}
                    {items.length !== 0 && (
                        <div className='flex justify-between items-end h-full w-full'>
                                    <p className='font-semibold'>Total Amount: ${totalAmount.toFixed(2)}</p>
                                    <button 
                                        className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                                        onClick={() => {
                                            onSubmiting();
                                        }}
                                    >
                                    Buy
                                    </button>
                        </div>
                    )}
                </div>
            </Dialog>
    </div>
  )
}

const CustomUpdateHeader = () => {
    return (
        <div className="font-bold text-xl text-gray-900 dark:text-gray-100">
            Add To Cart
        </div>
    );
};