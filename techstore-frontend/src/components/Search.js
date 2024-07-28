import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/products/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <h2 className="text-center">Search Products</h2>
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="query">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        {results.map((product) => (
          <Col key={product._id} md={4} className="mb-3">
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Search;
