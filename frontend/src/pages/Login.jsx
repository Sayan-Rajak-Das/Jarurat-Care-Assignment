import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      await login(data, navigate); 
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={5}>
          <div className="p-4 shadow rounded bg-light">
            <h3 className="text-center mb-3">User Login</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={isLoggingIn}
                className="w-100"
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
