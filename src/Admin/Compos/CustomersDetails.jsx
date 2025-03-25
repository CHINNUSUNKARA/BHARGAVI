import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Nav from '../Nav';

const CustomersDetails = () => {
  const [customers, setCustomers] = useState([]); // State to store customer data

  // Fetch customers data when the component mounts
  useEffect(() => {
    const handleFetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/customers');
        const data = await response.json();
        setCustomers(data); // Store the fetched data in state
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    handleFetchCustomers(); // Call the function to fetch customers
  }, []);

  return (
    <div>
      <Sidebar />
      <Nav />
      <h1 className="text-center mt-3">Customers Details</h1>

      <div
        className="container mt-4 p-4 border border-dark rounded shadow bg-light"
        style={{ width: '1000px', marginLeft: '300px', marginTop: '50px' }}
      >
        <table className="table table-bordered table-striped text-center">
          <thead>
            <tr className="text-capitalize">
              <th>Customer Name</th>
              <th>Customer Address</th>
              <th>Customer Phone</th>
              <th>Customer Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersDetails;
