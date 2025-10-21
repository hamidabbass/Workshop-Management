import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config/api';


const DriversContent: React.FC = () => {
  const [formData, setFormData] = useState({
    vehicleId: '',
    advisoryNote: '',
    workOrderTime: '',
    customerId: '', // Add this field
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/workorders`, formData);
      setSuccessMessage('Work order added successfully');
      setFormData({
        vehicleId: '',
        advisoryNote: '',
        workOrderTime: '',
        customerId: '', // Reset this field
      });
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000); // Hide the message after 2 seconds
    } catch (error) {
      console.error('Error adding work order', error);
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
          <div className="w-[15%] flex flex-col gap-2">
            <label className="w-full" htmlFor="vehicleId">
              Vehicle ID
            </label>
            <input
              className="w-full h-10 px-4 rounded-lg"
              type="number"
              id="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-4 w-full flex gap-5 items-center">
          <div className="w-[28%] flex flex-col gap-2">
            <label className="w-full" htmlFor="workOrderTime">
              Work Order Time
            </label>
            <input
              className="w-full h-10 px-4 rounded-lg"
              type="datetime-local"
              id="workOrderTime"
              value={formData.workOrderTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="pt-4 flex flex-col gap-2">
          <label className="w-full" htmlFor="advisoryNote">
            Advisory Note
          </label>
          <textarea
            className="px-4 py-2 rounded-lg"
            id="advisoryNote"
            rows={5}
            placeholder="Type note..."
            value={formData.advisoryNote}
            onChange={handleChange}
          />
        </div>
        <div className="pt-4 flex flex-col gap-2">
          <label className="w-full" htmlFor="customerId">
            Customer ID
          </label>
          <input
            className="w-full h-10 px-4 rounded-lg"
            type="number"
            id="customerId"
            value={formData.customerId}
            onChange={handleChange}
          />
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

export default DriversContent;
