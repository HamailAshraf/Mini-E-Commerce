'use client'
import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { UserContext } from '@/context/UserContext';
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";

const Orders = () => {
    const [data, setData] = useState([]);
    const {token} = useContext(UserContext);
    const [toggle, setToggle] = useState(false);
    const [statusDialog, setStatusDialog] = useState(false);
    const [checkReason, setCheckReason] = useState(false);
    const [value, setValue] = useState('');
    const [reason, setReason] = useState('');
    const {register, handleSubmit} = useForm();
    const [id, setId] = useState(0);

    const fetchData = async () => {
        try {
          const response = await Axios.get('http://localhost:4000/items/orders', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
          // console.log("Response data is: ", response.data);
        } catch (error) {
          console.log("Error fetching data: ", error.message);
        }
      };

      useEffect(() => {
        fetchData();
      }, [token]);

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
    };

    const CustomOrdersHeader = () => {
      return (
          <div className="p-3">
              Orders
          </div>
      );
  };

  const CustomStatesHeader = () => {
    return (
        <div className="p-3">
            States
        </div>
    );
};

const handleState = async (data) => {
  const { reason } = data;
  console.log("Reason: ", reason);
  const requestData = {
      id: id,
      state: value,
      reason: reason,
  }
  try {
      const response = await Axios.patch(`http://localhost:4000/orders/${requestData.id}`, requestData, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      console.log('Response', response.data);
      fetchData();
      setStatusDialog(false);
      setCheckReason(!checkReason);
  } catch (error) {
      console.log("Error updating order: ", error.message);
  }
};

const handleStateTwo = async () => {
  console.log('Handling state update...');
  const requestData = {
      id: id,
      state: value,
  };
  console.log('Request Data:', requestData);
  
  try {
      const response = await Axios.patch(`http://localhost:4000/orders/${requestData.id}`, requestData, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      console.log('Response', response.data);
      fetchData();
  } catch (error) {
      console.log("Error updating order:", error.response ? error.response.data : error.message);
  }
}

  return (
    <div>
      <Dialog header={<CustomOrdersHeader />} visible={toggle} style={{ width: '40vw' }} onHide={() => setToggle(false)}>
        {toggle && data.map((order) => (
          <div className='flex justify-center w-[30vw] mb-3' key={order.id}>
        <div className='max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <h1 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>Name: {order.name}</h1>
            <h1 className='mb-3 font-normal text-gray-500 dark:text-gray-400'>Order Item: {order.order_item}</h1>
            <h1 className='mb-3 font-normal text-gray-500 dark:text-gray-400'>Price: {order.price}</h1>
            <h1 className='mb-3 font-normal text-gray-500 dark:text-gray-400'>Quantity: {order.quantity}</h1>
            <h1 className='mb-3 font-normal text-gray-500 dark:text-gray-400'>Ordered Date: {formatDate(order.orderedDate)}</h1>
            <h1 className='mb-3 font-normal text-gray-500 dark:text-gray-400'>Delivery Date: {formatDate(order.deliveryDate)}</h1>
            <button className='mb-3 font-normal text-gray-500 dark:text-gray-400 hover:underline' onClick={() => {setStatusDialog(!statusDialog);
            setId(order.id)}}>Status: {order.states}</button>
            <Dialog header={<CustomStatesHeader />} visible={statusDialog} style={{ width: '35vw' }} onHide={() => setStatusDialog(false)}>
              {
                statusDialog && (
                  <div className='flex justify-around flex-wrap'>
                    <button className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                      onClick={() => {
                        setValue('In Progress');
                        handleStateTwo();
                        setStatusDialog(false);
                    }}>
                      In Progress
                    </button>
                    <button className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900'
                      onClick={() => {
                        setValue('Ready For Delivery');
                        handleStateTwo();
                        setStatusDialog(false);
                    }}>
                      Ready For Delivery
                    </button>
                    <button className='focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-blue-900'
                      onClick={() => {
                      setValue('Out For Delivery');
                      handleStateTwo();
                      setStatusDialog(false);
                    }}>
                      Out For Delivery
                    </button>
                    <button className='focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-red-900'
                      onClick={() => {
                        setValue('Cancel');
                        setCheckReason(!checkReason);
                    }}>
                      Cancel
                    </button>
                    <button className='focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-green-900'
                      onClick={() => {
                        setValue('Delivered');
                        handleStateTwo();
                        setStatusDialog(false);
                    }}>
                      Delivered
                    </button>
                    <button className='focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-red-900'
                      onClick={() => {
                        setValue('Failed');
                        setCheckReason(!checkReason);
                    }}>
                      Failed
                    </button>
                    {checkReason && (
                      <form className='flex justify-around flex-wrap' onSubmit={handleSubmit(handleState)}>
                          <input type='text' {...register('reason', { required: value === 'Canceled' || value === 'Failed' })} value={reason} onChange={(e) => setReason(e.target.value)} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'/>
                          <input type='submit' value='Submit' className='mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' />
                      </form>
                    )}
                  </div>
                )
              }
            </Dialog>
            {order.reason && order.reason.trim() !== '' && (
                <h1>Reason: {order.reason}</h1>
            )}
        </div>
        </div>
        
        ))}
      </Dialog>
        <div className="max-w-sm p-6 bg-white border ml-6 mt-6 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Check all the orders?</h5>     
            <button className="inline-flex font-medium items-center text-blue-600 hover:underline" onClick={() => setToggle(!toggle)}>
                See More
            </button>
        </div>
    </div>
  )
}

export default Orders
