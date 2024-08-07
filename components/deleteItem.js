'use client';
import Axios from 'axios';

export const deleteItem = async (id, token) => {
    try {
      const response = await Axios.delete(`http://localhost:4000/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response', response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching data: ", error.message);
      throw error;
    }
  };