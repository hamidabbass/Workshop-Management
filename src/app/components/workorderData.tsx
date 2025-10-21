import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

const AccountContent: React.FC = () => {
  const [customersWithWorkOrders, setCustomersWithWorkOrders] = useState([]);

  useEffect(() => {
    fetchCustomersWithWorkOrders();
  }, []);

  const fetchCustomersWithWorkOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/customers-with-workorders`);
      setCustomersWithWorkOrders(response.data);
    } catch (error) {
      console.error('Error fetching customers with work orders', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between border-b-2 border-gray-300 pb-2">
        <p className="w-1/6 font-bold">Customer Name</p>
        <p className="w-1/6 font-bold">Phone Number</p>
        <p className="w-1/6 font-bold">Email</p>
        <p className="w-1/6 font-bold">Work Order Code</p>
        <p className="w-1/6 font-bold">Advisory Note</p>
        <p className="w-1/6 font-bold">Work Order Time</p>
      </div>
      {customersWithWorkOrders.map((row:any, index) => (
        <div className={`py-2 flex justify-between border-b border-gray-300 py-2" ${index % 2 === 0 ? 'bg-gray-100' : ''}`} key={index} >
          <p className="w-1/6">{row.name}</p>
          <p className="w-1/6">{row.phonenumber}</p>
          <p className="w-1/6">{row.email}</p>
          <p className="w-1/6 text-center">{row.work_order_code}</p>
          <p className="w-1/6">{row.advisory_note}</p>
          <p className="w-1/6">{row.work_order_time}</p>
        </div>
      ))}
    </div>
  );
};

export default AccountContent;
