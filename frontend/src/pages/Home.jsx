import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useAuthStore } from "../store/useAuthStore";

function Home() {
  const { authUser, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload(); // Reload to reflect the logged-out state
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Container className="text-center mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h1 className="mb-4">Welcome to the User Management Dashboard</h1>

              {!authUser ? (
                <>
                  <p className="text-muted">
                    This platform helps administrators and users manage their profiles efficiently.
                  </p>
                  <p className="text-muted">
                    Please{" "}
                    <Link to="/login" style={{ fontWeight: "bold" }}>
                      log in
                    </Link>{" "}
                    to access the dashboard.
                  </p>
                  <Link to="/login">
                    <Button variant="primary" size="lg" className="mt-3">
                      Login
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-success">
                    Hello, <strong>{authUser.fullName}</strong>. You are logged in as a{" "}
                    <strong>{authUser.role === "admin" ? "Admin" : "User"}</strong>.
                  </p>

                  {authUser.role === "admin" ? (
                    <div>
                      <Alert variant="info" className="mt-3">
                        As an admin, you can manage users and their roles. Access the{" "}
                        <Link to="/dashboard">Dashboard</Link> to start managing users.
                      </Alert>
                      <Link to="/dashboard">
                        <Button variant="primary" size="lg" className="mt-3">
                          Go to Dashboard
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Alert variant="info" className="mt-3">
                        As a regular user, you can view all the records available in the system.
                      </Alert>
                      <Link to="/dashboard">
                        <Button variant="primary" size="lg" className="mt-3">
                          Go to Dashboard
                        </Button>
                      </Link>
                    </div>
                  )}

                  <Button
                    variant="danger"
                    size="lg"
                    className="mt-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
