import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, ListGroup, Alert, Button } from 'react-bootstrap';

const Dashboard = () => {
  const [stockSummary, setStockSummary] = useState({ iron: 0, cement: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [lowStockItems, setLowStockItems] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockRes = await axios.get('/api/dashboard/stock');
        const ordersRes = await axios.get('/api/dashboard/orders');
        const revenueRes = await axios.get('/api/dashboard/revenue');
        const lowStockRes = await axios.get('/api/dashboard/low-stock');
        
        setStockSummary(stockRes.data);
        setRecentOrders(ordersRes.data);
        setRevenue(revenueRes.data);
        setLowStockItems(lowStockRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <Row>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">Stock Summary</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>Iron: {stockSummary.iron} units</ListGroup.Item>
                <ListGroup.Item>Cement: {stockSummary.cement} units</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-success text-white">Revenue Overview</Card.Header>
            <Card.Body>
              <h3>Total Revenue: ${revenue}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-warning text-white">Recent Orders</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {recentOrders.map(order => (
                  <ListGroup.Item key={order.id} className="d-flex justify-content-between">
                    Order #{order.id} - {order.item} - ${order.total}
                    <Button variant="info" size="sm">View</Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-danger text-white">Low Stock Alerts</Card.Header>
            <Card.Body>
              {lowStockItems.length > 0 ? (
                <ListGroup variant="flush">
                  {lowStockItems.map(item => (
                    <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                      {item.name} - {item.quantity} units remaining
                      <Button variant="warning" size="sm">Restock</Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Alert variant="success">No items are low in stock!</Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
