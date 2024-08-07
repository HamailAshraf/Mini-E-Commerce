'use client';
import Graph from '@/components/Graph';
import NavbarAdmin from '@/components/NavbarAdmin';
import Orders from '@/components/Orders';
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <NavbarAdmin />
      <Orders />
      <Graph />
    </div>
  )
}

export default Dashboard