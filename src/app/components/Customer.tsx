import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

const OrdersContent: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNo: '',
    address: '',
    state: '',
    country: '',
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/customers`, formData);
      setSuccessMessage('Data added successfully');
      setFormData({
        firstName: '',
        lastName: '',
        phoneNo: '',
        address: '',
        state: '',
        country: '',
      });
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (error) {
      console.error('Error adding customer', error);
    }
  };

  return (
    <div className="px-4 pt-14 max-w-[1400px] mx-auto">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="w-full flex gap-5 items-center">
          <div className="w-1/2 flex flex-col gap-2">
            <label className="w-full" htmlFor="firstName">
              First Name
            </label>
            <input
              className="w-full h-10 pl-4 rounded-lg"
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <label className="w-full" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="w-full h-10 pl-4 rounded-lg"
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="pt-4 w-1/2 flex flex-col gap-2">
          <label className="w-full" htmlFor="phoneNo">
            Phone No
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
          />
        </div>
        <div className="pt-4 flex flex-col gap-2">
          <label className="w-full" htmlFor="address">
            Address
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="pt-4 w-full flex gap-5 items-center">
          <div className="w-1/2 flex flex-col gap-2">
            <label className="w-full" htmlFor="state">
              State
            </label>
            <input
              className="w-full h-10 pl-4 rounded-lg"
              type="text"
              id="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <label className="w-full" htmlFor="country">
              Country
            </label>
            <input
              className="w-full h-10 pl-4 rounded-lg"
              type="text"
              id="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-6 px-5 py-2 rounded-xl font-semibold text-white bg-[#ff5801]"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrdersContent;
