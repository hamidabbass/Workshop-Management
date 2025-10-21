import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { API_BASE_URL } from '@/config/api';

const SettingsContent: React.FC = () => {
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({ registration_number: '', make: '', model: '', year: '', fuel: '', mileage: '', customer_id: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
    fetchVehicles();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers', error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/vehicles`);
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles', error);
    }
  };

  const handleEdit = (vehicle: any) => {
    setEditingVehicle(vehicle.vehicle_id);
    setFormData({ 
      registration_number: vehicle.registration_number, 
      make: vehicle.make, 
      model: vehicle.model, 
      year: vehicle.year, 
      fuel: vehicle.fuel, 
      mileage: vehicle.mileage, 
      customer_id: vehicle.customer_id 
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (vehicle_id: any) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/vehicles/${vehicle_id}`);
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle', error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/vehicles/${editingVehicle}`, formData);
      setEditingVehicle(null);
      setIsModalOpen(false);
      fetchVehicles();
    } catch (error) {
      console.error('Error updating vehicle', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between border-b-2 border-gray-300 pb-2 font-bold">
        <p className="w-1/5">Registration Number</p>
        <p className="w-1/5">Make</p>
        <p className="w-1/5">Model</p>
        <p className="w-1/5">Year</p>
        <p className="w-1/5 pl-28">Actions</p>
      </div>
      {vehicles.map((vehicle: any, index) => (
        <div
          className={`flex justify-between border-b border-gray-200 py-3 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
          key={vehicle.vehicle_id}
        >
          <p className="w-1/5">{vehicle.registration_number}</p>
          <p className="w-1/5">{vehicle.make}</p>
          <p className="w-1/5">{vehicle.model}</p>
          <p className="w-1/5">{vehicle.year}</p>
          <div className="w-1/5 flex justify-end">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              onClick={() => handleEdit(vehicle)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(vehicle.vehicle_id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Vehicle"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3 className="text-lg font-bold mb-2">Edit Vehicle</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <label className="block mb-2">
            Registration Number:
            <input
              type="text"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Make:
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Model:
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Year:
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Fuel:
            <input
              type="text"
              name="fuel"
              value={formData.fuel}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Mileage:
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Customer ID:
            <input
              type="number"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </label>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SettingsContent;
