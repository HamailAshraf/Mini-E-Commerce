'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-blue/theme.css';  
import 'primereact/resources/primereact.min.css';           
import 'primeicons/primeicons.css';                       

export const Card = ({ image, name, desc, qty, price, addToCart}) => {
    const [displayDialog, setDisplayDialog] = useState(false);
    const [buyed, setBuyed] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const value = Math.max(0, Math.min(qty, parseInt(e.target.value) || 0));
        setBuyed(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(buyed === 0){
            setErrorMessage('Please select an acceptable Quantity!');
            setDisplayDialog(true);
        }
        else {
            addToCart(price * buyed, name, buyed);
            setDisplayDialog(false);
            setBuyed(0);
        }
    };

    const dialogFooter = (
        <div>
            <button onClick={() => setDisplayDialog(false)} className="p-button-text"></button>
        </div>
    );

    console.log("Buyed in handleSubmit: ", buyed);

    return (
        <div className='w-[24rem] h-[25rem] bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col card-hover-delay'>
            <div className='relative w-full h-48 group'>
                <Image
                    src={image}
                    alt='card image'
                    layout='fill'
                    objectFit='cover'
                    className='rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:z-10'
                />
            </div>
            <div className='p-4 flex flex-col flex-grow'>
                <h2 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>{name}</h2>
                <p className='text-sm text-gray-700 dark:text-gray-400 mb-4 flex-grow'>{desc}</p>
                <div className='flex justify-between items-center mb-4'>
                    <span className='text-sm font-semibold text-gray-900 dark:text-white'>Qty: {qty}</span>
                    <span className='text-sm font-semibold text-gray-900 dark:text-white'>${price}</span>
                </div>
            </div>
            <div className='p-4'>
                <button 
                    onClick={() => setDisplayDialog(true)}
                    className='w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Add to Cart
                </button>
            </div>
            <Dialog 
                header={<CustomUpdateHeader />} 
                visible={displayDialog} 
                style={{ width: '50vw' }} 
                footer={dialogFooter} 
                onHide={() => {
                    setDisplayDialog(false);
                    setErrorMessage('');
                    }}
            >
                <div className='p-4'>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label className='font-semibold'>Qty. </label>
                            <input 
                                type="number" 
                                name="quantity" 
                                min="0" 
                                max={qty} 
                                value={buyed} 
                                onChange={handleInputChange}
                                className="p-inputtext p-component"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-semibold text-gray-700 dark:text-gray-300'>Total Price: </label>
                            <span className='text-lg font-bold text-gray-900 dark:text-gray-100'>${(price * buyed).toFixed(2)}</span>
                        </div>
                        {errorMessage !== '' && (
                            <div>
                            <p>{errorMessage}</p>
                        </div>
                        )}
                        <div className='flex justify-end'>
                            <input 
                                type='submit' 
                                value='Submit' 
                                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                />
                        </div>
                    </form>
                </div>
            </Dialog>
        </div>
    );
}

const CustomUpdateHeader = () => {
    return (
        <div className="font-bold text-xl text-gray-900 dark:text-gray-100">
            Add To Cart
        </div>
    );
};
