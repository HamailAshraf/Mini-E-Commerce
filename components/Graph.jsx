'use client';
import React, {useState, useEffect, useContext} from 'react';
import Axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { UserContext } from '@/context/UserContext';
import {
    Chart as ChartJS,
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
  } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  
  // Register Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    ChartDataLabels
  );
  
  const Graph = () => {
    const [chart, setChart] = useState([]);
    const { token } = useContext(UserContext); 
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState('In Progress');
  
    const fetchData = async () => {
      try {
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await Axios.get(`http://localhost:4000/orders/${state}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Graph: ', response.data);
        setChart(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error.message);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [token, state]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!chart || chart.length === 0) {
      return <div>No data available</div>;
    }
  
    const data = {
      labels: chart.map(user => user.userName),
      datasets: [{
        label: 'Order Count',
        data: chart.map(user => user.orderCount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };
  
    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 16,
            },
          },
        },
        datalabels: {
          formatter: (value) => value,
          color: '#fff',
          font: {
            weight: 'bold',
          }
        }
      }
    };
  
    return (
      <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <div className='h-[10vh] w-[80%] border-solid border-2 mt-3 flex justify-center gap-8 bg-slate-100'>
        <button className='hover:underline'
        onClick={() => setState('In Progress')}>
            In Progress
        </button>
        <button className='hover:underline'
        onClick={() => setState('Out For Delivery')}>
            Out For Delivery
        </button>
        <button className='hover:underline'
        onClick={() => setState('Cancel')}>
            Canceled
        </button>
      </div>
        <div className='w-[50%] max-w-4xl'>
          <Bar
            data={data}
            options={options}
          />
        </div>
      </div>
    );
  };
  
  export default Graph;