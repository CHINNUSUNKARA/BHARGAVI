// src/services/suppliersApi.js

import axios from 'axios';

// Base URL for your API
const API_URL = "http://localhost:5000/api/dashboard/suppliers";

// Get all suppliers
export const getSuppliers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers", error);
    throw error;
  }
};

// Add a new supplier
export const addSupplier = async (supplierDetails) => {
  try {
    const response = await axios.post(API_URL, supplierDetails);
    return response.data;
  } catch (error) {
    console.error("Error adding supplier", error);
    throw error;
  }
};

// Update an existing supplier
export const updateSupplier = async (id, supplierDetails) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, supplierDetails);
    return response.data;
  } catch (error) {
    console.error("Error updating supplier", error);
    throw error;
  }
};

// Delete a supplier
export const deleteSupplier = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting supplier", error);
    throw error;
  }
};
