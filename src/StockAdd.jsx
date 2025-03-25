import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import NavBar from './NavBar';

const StockAdd = () => {
  const [formData, setFormData] = useState({
    Iron: {
      "24mm": "",
      "16mm": "",
      "12mm": "",
      "10mm": "",
      "8mm": "",
    },
    Cement: {
      Nagarjuna: "",
      Ramco: "",
      Ambuja: "",
      Sagar: "",
      UltraTech: "",
    },
    Pipes: {
      GpPipes: "",
      KalaiPipes: "",
      RoundPipes: "",
      StraightPipes: "",
    },
    Sheets: {
      "24g": "",
      "22g": "",
      "20g": "",
      "18g": "",
      "16g": "",
    },
  });

  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (category, subCategory, value) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [subCategory]: value,
      },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send stock data for each category separately and merge with the previous stock data
      await Promise.all(
        Object.keys(formData).map(async (category) => {
          try {
            // Fetch current stock data from the backend
            const response = await axios.get(`http://localhost:5000/api/dashboard/stock/${category}`);
            const currentStockData = response.data;  // Current stock data for the category

            // Merge current stock data with the new data from the form
            const updatedStockData = {
              ...currentStockData,
              ...formData[category],
            };

            // Send the updated stock data back to the server
            await axios.put(`http://localhost:5000/api/dashboard/stock/${category}`, updatedStockData);
          } catch (error) {
            console.error(`Error updating stock for ${category}:`, error);
            throw new Error(`Error updating stock for ${category}`);
          }
        })
      );

      setMessage({ text: "Stock added successfully!", variant: "success" });

      // Reset form data after submission
      setFormData({
        Iron: { "24mm": "", "16mm": "", "12mm": "", "10mm": "", "8mm": "" },
        Cement: { Nagarjuna: "", Ramco: "", Ambuja: "", Sagar: "", UltraTech: "" },
        Pipes: { GpPipes: "", KalaiPipes: "", RoundPipes: "", StraightPipes: "" },
        Sheets: { "24g": "", "22g": "", "20g": "", "18g": "", "16g": "" },
      });
    } catch (err) {
      console.error(err);
      setMessage({ text: "Error adding stock. Please try again.", variant: "danger" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <NavBar />
      <Container className="container custom-margins"  style={{
          marginLeft: '250px',
          padding: '20px',
          width: 'auto',
          overflow: 'hidden',
          height: '100vh',
        }}>
        <h1 className="my-4 text-center text-primary ">Add Stock</h1>

        {message && <Alert variant={message.variant} className="text-center">{message.text}</Alert>}

        <Card className="p-4 shadow-lg rounded">
          <Form onSubmit={handleSubmit}>
            {/* Row 1: Iron and Cement */}
            <Row className="mb-4">
              <Col md={6}>
                <h5 className="text-info">Iron</h5>
                {Object.keys(formData.Iron).map((size) => (
                  <Form.Group key={size}>
                    <Form.Label>{size}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`Enter quantity for ${size}`}
                      value={formData.Iron[size]}
                      onChange={(e) => handleInputChange('Iron', size, e.target.value)}
                    />
                  </Form.Group>
                ))}
              </Col>

              <Col md={6}>
                <h5 className="text-info">Cement</h5>
                {Object.keys(formData.Cement).map((brand) => (
                  <Form.Group key={brand}>
                    <Form.Label>{brand}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`Enter quantity for ${brand}`}
                      value={formData.Cement[brand]}
                      onChange={(e) => handleInputChange('Cement', brand, e.target.value)}
                    />
                  </Form.Group>
                ))}
              </Col>
            </Row>

            {/* Row 2: Pipes and Sheets */}
            <Row className="mb-4">
              <Col md={6}>
                <h5 className="text-info">Pipes</h5>
                {Object.keys(formData.Pipes).map((pipeType) => (
                  <Form.Group key={pipeType}>
                    <Form.Label>{pipeType}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`Enter quantity for ${pipeType}`}
                      value={formData.Pipes[pipeType]}
                      onChange={(e) => handleInputChange('Pipes', pipeType, e.target.value)}
                    />
                  </Form.Group>
                ))}
              </Col>

              <Col md={6}>
                <h5 className="text-info">Sheets</h5>
                {Object.keys(formData.Sheets).map((sheetType) => (
                  <Form.Group key={sheetType}>
                    <Form.Label>{sheetType}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`Enter quantity for ${sheetType}`}
                      value={formData.Sheets[sheetType]}
                      onChange={(e) => handleInputChange('Sheets', sheetType, e.target.value)}
                    />
                  </Form.Group>
                ))}
              </Col>
            </Row>

            {/* Submit Button */}
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" disabled={isSubmitting} className="w-50">
                {isSubmitting ? 'Submitting...' : 'Add Stock'}
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default StockAdd;
