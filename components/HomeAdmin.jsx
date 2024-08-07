'use client';
import React, {useContext, useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog } from "primereact/dialog";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import { UserContext } from '@/context/UserContext';
import Axios from 'axios';
import { deleteItem } from './deleteItem';

const HomeAdmin = () => {
    const [data, setData] = useState([]);
    const {token} = useContext(UserContext);
    const [selectedItem, setSelectedItem] = useState(null);
    const [displayDelete, setDisplayDelete] = useState(false);
    const [displayAddItem, setDisplayAddItem] = useState(false);
    const {register, handleSubmit, control, setValue} = useForm();
    const [image, setImage] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);

    const fetchData = async () => {
        try {
          const response = await Axios.get('http://localhost:4000/items', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
          console.log("Response data is: ", response.data);
        } catch (error) {
          console.log("Error fetching data: ", error.message);
        }
      };

      useEffect(() => {
        fetchData();
      }, [token]);

      const handleDelete = async (id) => {
        try {
            await deleteItem(id, token);
            fetchData();
        } catch (error) {
            console.log("Error deleting user: ", error.message);
        }
    };

    const handleBulkDelete = async () => {
      try {
        await Promise.all(selectedItems.map(id => deleteItem(id, token)));
        fetchData();
        setSelectedItems([]);
      }
      catch (error){
        console.log("Error deleting items: ", error.message);
      }
    };

    const handleCheckboxChange = (id) => {
      setSelectedItems(prev => {
        if(prev.includes(id)){
          return prev.filter(itemId => itemId !== id);
        }
        else {
          return [...prev, id];
        }
      });
    };

    const handleSelectAll = (e) => {
      if(e.target.checked) {
        setSelectedItems(data.map(item => item.id));
      }
      else {
        setSelectedItems([]);
      }
    };

    const convertToBase64 = (e) => {
      console.log(e);
      const file = e.target.files[0]; 
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = () => {
          console.log(reader.result);
          setImage(reader.result);
        };
        reader.onerror = (error) => {
          console.log("Error: ", error);
        };
      }
    };

    const onSubmiting = async (data) => {
      try {
        console.log("Data: ", data);
        const formData = {
          ...data,
          images: image,
        };
        const response = await Axios.post('http://localhost:4000/items', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDisplayAddItem(false);
        fetchData();
        console.log('Response', response.data);
      } catch (error) {
        console.log("Error fetching data: ", error.message);
      }
    }

    const actionBodyTemplate = (rowData) => {
          return (
              <div>
                  <input
                  type='checkbox'
                      checked={selectedItems.includes(rowData.id)}
                      onChange={() => {
                          handleCheckboxChange(rowData.id)
                          }}
                  > 
                  </input>
              </div>
          );
      };

      const headerCheckboxTemplate = () => {
        return (
            <div>
                <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedItems.length === data.length}
                />
                <button
                    className="ml-2 hover:underline"
                    onClick={handleBulkDelete}
                >
                    Delete
                </button>
            </div>
        );
    };

    const CustomDeleteHeader = () => {
      return (
          <div className="p-3">
              Delete Item
          </div>
      );
  };

  const CustomAddHeader = () => {
    return (
        <div className="p-3">
            Add an Item
        </div>
    );
};

  return (
    <div className="datatableContainer">
      <DataTable className="custom-datatable"
        value={data} sortMode="multiple" tableStyle={{ minWidth: '50rem' }}
        >
          <Column className="col" field="name" header="Product Name"/>
          <Column className="col" field="description" header="DESCRIPTION"/>
          <Column className="col" field='price' header="PRICE"/>
          <Column className="col" field="stock_quantity" header="QUANTITY"/>
          <Column className='col' header={headerCheckboxTemplate()} body={actionBodyTemplate}/>
      </DataTable>
      <Dialog header={<CustomDeleteHeader />} visible={displayDelete} style={{ width: '30vw' }} onHide={() => setDisplayDelete(false)}>
          {selectedItem && (<>
              <h1 className="text-lg mt-1 mb-1 ml-2">Are you sure you want to Delete this Item?</h1>
              <div className="mt-1 flex justify-center">
              <button className="text-white bg-red-600 py-1 px-2 w-16 rounded-md mr-1" onClick={() => {
                  handleDelete(selectedItem.id);
                  setSelectedItem(null);
                  setDisplayDelete(false);                
              }}>Yes</button>
              <button className="text-white bg-green-600 py-1 px-2 w-16 rounded-md ml-1" onClick={() => {
                  setSelectedItem(null);
                  setDisplayDelete(false);
              }}>No</button>
              </div>
          </>)}
       </Dialog>
       <button className='py-2.5 px-5 ml-[65px] me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
       onClick={() => setDisplayAddItem(true)}>
        Add an Item
       </button>
       <Dialog header={<CustomAddHeader />} visible={displayAddItem} style={{ width: '30vw' }} onHide={() => setDisplayAddItem(false)}>
            <form className ='max-w-md mx-auto mt-20' onSubmit={handleSubmit(onSubmiting)}>
              <div className='relative z-0 w-full mb-5 group'>
                <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type='text' {...register("name")}/>
                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Product Name</label>
              </div>
              <div className='relative z-0 w-full mb-5 group'>
                <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type='text' {...register("description")}/>
                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Product Description</label>
              </div>
              <div className='relative z-0 w-full mb-5 group'>
                <div className='relative'>
                  <input
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer pl-8'
                    type='number'
                    step='0.01'
                    min='0'
                    {...register("price")}
                  />
                  <span className='absolute left-2 top-2 text-gray-500'>$</span>
                </div>
                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Product Price</label>
              </div>
              <div className='relative z-0 w-full mb-5 group'>
                <input className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer' type='number' {...register("stock_quantity")}/>
                <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Quantity</label>
              </div>
              <Controller
  name="images"
  control={control}
  render={({ field }) => (
    <div className='relative z-0 w-full mb-5 group'>
      <input
        type='file'
        accept='image/*'
        onChange={(e) => {
          convertToBase64(e);
          field.onChange(e);
        }}
        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
      />
      <label className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
        Image
      </label>
    </div>
  )}
/>
              <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type='submit'/>
            </form>
       </Dialog>
    </div>
  )
}

export default HomeAdmin
