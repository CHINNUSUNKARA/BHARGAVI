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
import Reports from "./Reports";
import InvoiceManagement from "./InvoiceManagement";


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
        <Route path="/Reports" element={<Reports />} />        
        <Route path="/Invoice" element={<InvoiceManagement />} />        
      </Routes>
    </Router>
    </>
    
  );
};

export default App;
