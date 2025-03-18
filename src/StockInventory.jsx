import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const StockInventory = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/stock");
        // Ensure that the stock data has a valid structure before setting it
        if (Array.isArray(response.data) && response.data.length > 0) {
          setStockData(response.data);
        } else {
          throw new Error("Invalid data format or empty data received.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4 text-center">
        Error: {error}
      </Alert>
    );
  }

  return (
    <Container>
      <div className="container custom-margins" style={{ marginTop: "150px" }}>
        <h1 className="text-center my-4">Stock Inventory</h1>
        <Row>
          {stockData.map((item, index) => {
            const categoryName = Object.keys(item)[0]; // Get the category name (Iron, Cement, etc.)
            const categoryDetails = item[categoryName];

            return (
              <Col sm={12} md={6} lg={3} key={index}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>{categoryName}</Card.Title>
                    {/* Loop through the subcategories (sizes or brands) */}
                    {categoryDetails &&
                      Object.keys(categoryDetails).map((subCategory, idx) => (
                        <div key={idx}>
                          <Card.Subtitle className="mb-2" style={{ fontWeight: 'bold' }}>
                            {subCategory}
                          </Card.Subtitle>
                          <p>Quantity: {categoryDetails[subCategory] || 'N/A'}</p>
                        </div>
                      ))
                    }
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
  );
};

export default StockInventory;
