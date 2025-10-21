import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

const CompanyContent: React.FC = () => {
  const [formData, setFormData] = useState({
    registrationNo: '',
    year: '',
    make: '',
    model: '',
    fuel: '',
    mileage: '',
    customerId: '',  
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/vehicles`, formData);
      setSuccessMessage('Vehicle added successfully');
      setFormData({
        registrationNo: '',
        year: '',
        make: '',
        model: '',
        fuel: '',
        mileage: '',
        customerId: '', 
      });
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (error) {
      console.error('Error adding vehicle', error);
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
          <div className="w-[40%] flex flex-col gap-2">
            <label className="w-full" htmlFor="registrationNo">
              Registration No
            </label>
            <input
              className="w-full h-10 pl-4 rounded-lg"
              type="text"
              id="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
            />
          </div>
          <div className="w-[40%] flex flex-col gap-2">
            <label className="w-full" htmlFor="year">
              Year
            </label>
            <input
              className="w-full h-10 px-4 rounded-lg"
              type="number"
              id="year"
              value={formData.year}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-4 w-full flex gap-5 items-center">
          <div className="w-[28%] flex flex-col gap-2">
            <label className="w-full" htmlFor="make">
              Make
            </label>
            <input
              className="w-full h-10 pl-4 rounded-lg"
              type="text"
              id="make"
              value={formData.make}
              onChange={handleChange}
            />
          </div>
          <div className="w-[20%] flex flex-col gap-2">
            <label className="w-full" htmlFor="model">
              Model
            </label>
            <input
              className="w-full h-10 pl-4 rounded-lg"
              type="text"
              id="model"
              value={formData.model}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="pt-4 w-full flex gap-5 items-center">
          <div className="w-1/2 flex flex-col gap-2">
            <label className="w-full" htmlFor="fuel">
              Fuel
            </label>
            <input
              className="w-full h-10 pl-4 rounded-lg"
              type="text"
              id="fuel"
              value={formData.fuel}
              onChange={handleChange}
            />
          </div>
          <div className="w-[10%] flex flex-col gap-2">
            <label className="w-full" htmlFor="mileage">
              Mileage
            </label>
            <input
              className="w-full h-10 px-4 rounded-lg"
              type="number"
              min={6}
              max={25}
              defaultValue={8}
              id="mileage"
              value={formData.mileage}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="pt-4 w-full flex gap-5 items-center">
          <div className="w-1/2 flex flex-col gap-2">
            <label className="w-full" htmlFor="customerId">
              Customer ID
            </label>
            <input
              className="w-full h-10 pl-4 rounded-lg"
              type="text"
              id="customerId"
              value={formData.customerId}
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

export default CompanyContent;
