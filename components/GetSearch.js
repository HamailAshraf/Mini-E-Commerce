import Axios from 'axios';

export const getSearch = async (name, token) => {
    try {
      const response = await Axios.get(`http://localhost:4000/items/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response at getseach: ', response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching data: ", error.message);
     
       throw error;
    }
};