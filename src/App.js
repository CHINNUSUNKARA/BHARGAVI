import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import HomePage from "./Homepage";
import OrderPage from "./OrderPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome
import SupplierManagement from "./SupplierManagement";
import CustomerManagement from "./CustomerManagement";
import InvoiceManagement from "./components/InvoiceManagement";
import StockReport from "./StockReport";
import StockInventory from "./StockInventory";
import StockAdd from "./StockAdd";
import AdminDashboard from "./Admin/AdminDashboard";
import Price from "./Admin/Compos/Price";
import CustomersDetails from "./Admin/Compos/CustomersDetails";
import Inventory from "./Admin/Compos/Inventory";
// import ItemForm from "./ItemForm";


const App = () => {



  return (
    
    <><Router>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/OrderPage" element={<OrderPage />} />        
        <Route path="/Supplier" element={<SupplierManagement />} />        
        <Route path="/Customer" element={<CustomerManagement />} />        
        <Route path="/StockInventory" element={<StockInventory />} />        
        <Route path="/Invoice" element={<InvoiceManagement />} />   
        <Route path="/Stock" element={<StockReport />} />   
        {/* <Route path="/Items" element={<ItemForm />} />      */}
        <Route path="/StockAdd" element={<StockAdd />} />    
        <Route path="/AdminPage" element={<AdminDashboard />} />
        <Route path="/AdminInventory" element={<Inventory />} />
        <Route path="/AdminCustomer" element={<CustomersDetails />} />
        <Route path="/AdminPrice" element={<Price />} />


      </Routes>
    </Router>
    </>
    
  );
};

export default App;
