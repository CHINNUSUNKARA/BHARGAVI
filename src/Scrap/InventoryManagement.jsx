// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Card, ListGroup, Modal, Form, Alert, Row, Col } from 'react-bootstrap';

// const InventoryManagement = () => {
//   const [items, setItems] = useState([
//     { id: 1, name: 'Iron', quantity: 500, supplier: 'Supplier A', category: 'Metal' },
//     { id: 2, name: 'Cement', quantity: 1000, supplier: 'Supplier B', category: 'Construction' },
//   ]);
  
//   const [showModal, setShowModal] = useState(false);
//   const [newItem, setNewItem] = useState({ name: '', quantity: '', supplier: '', category: '' });
//   const [lowStockAlert, setLowStockAlert] = useState(false);

//   // Handle adding a new item
//   const handleAddItem = () => {
//     setItems([...items, { ...newItem, id: items.length + 1 }]);
//     setNewItem({ name: '', quantity: '', supplier: '', category: '' });
//     setShowModal(false);
//   };

//   // Handle removing an item
//   const handleRemoveItem = (id) => {
//     setItems(items.filter(item => item.id !== id));
//   };

//   // Handle editing an item (basic for demonstration)
//   const handleEditItem = (id) => {
//     const item = items.find(item => item.id === id);
//     setNewItem({ name: item.name, quantity: item.quantity, supplier: item.supplier, category: item.category });
//     setShowModal(true);
//     handleRemoveItem(id); // Remove item and allow re-adding after edit
//   };

//   // Handle filtering by category (example for demonstration)
//   const handleCategoryFilter = (category) => {
//     return items.filter(item => item.category === category);
//   };

//   return (
//     <div className="container mt-4">
//       <Row>
//         <Col md={6}>
//           <Card className="shadow-sm">
//             <Card.Header className="bg-primary text-white">Inventory List</Card.Header>
//             <Card.Body>
//               {items.length === 0 ? (
//                 <Alert variant="info">No items available. Please add new items.</Alert>
//               ) : (
//                 <ListGroup variant="flush">
//                   {items.map(item => (
//                     <ListGroup.Item key={item.id} className="d-flex justify-content-between">
//                       {item.name} - {item.quantity} units
//                       <div>
//                         <Button variant="warning" size="sm" className="mr-2" onClick={() => handleEditItem(item.id)}>Edit</Button>
//                         <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
//                       </div>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={6}>
//           <Card className="shadow-sm">
//             <Card.Header className="bg-success text-white">Low Stock Alerts</Card.Header>
//             <Card.Body>
//               {items.filter(item => item.quantity < 100).length > 0 ? (
//                 <ListGroup variant="flush">
//                   {items.filter(item => item.quantity < 100).map(item => (
//                     <ListGroup.Item key={item.id} className="d-flex justify-content-between">
//                       {item.name} - {item.quantity} units remaining
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               ) : (
//                 <Alert variant="success">No low-stock items!</Alert>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Modal to Add/Edit Item */}
//       <Button variant="primary" onClick={() => setShowModal(true)} className="mt-4">Add New Item</Button>
      
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add/Edit Item</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formName">
//               <Form.Label>Item Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter item name"
//                 value={newItem.name}
//                 onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group controlId="formQuantity">
//               <Form.Label>Quantity</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter quantity"
//                 value={newItem.quantity}
//                 onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group controlId="formSupplier">
//               <Form.Label>Supplier</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter supplier name"
//                 value={newItem.supplier}
//                 onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group controlId="formCategory">
//               <Form.Label>Category</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter item category"
//                 value={newItem.category}
//                 onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
//           <Button variant="primary" onClick={handleAddItem}>Save Item</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default InventoryManagement;
